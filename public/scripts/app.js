//Client-side JS logic goes here

$(document).ready(function(){

  loadTweets();
  $(".new-tweet").slideToggle();

  function renderTweets(tweets) {
      for (let item in tweets) {
          let tweet = tweets[item];

          let newObj = {
              name: tweet.user.name,
              avatar: tweet.user.avatars.small,
              handle: tweet.user.handle,
              content: tweet.content.text,
              time: moment(tweet.created_at).startOf('minute').fromNow() //Math.round(tweet.created_at / 86400000000)
              // try using momentjs
          }
          let result = createTweetElement(newObj);
          $('.tweet-container').prepend(result);
      }
      return;
  }

  //escape function for cross-site scripting
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweeterObj){
      let HTMLObj = `
        <article class="tweet"> 
          <header> 
            <img class="userIcon" src=${escape(tweeterObj.avatar)}>
            <h1> ${escape(tweeterObj.name)}</h1>
            <h4> ${escape(tweeterObj.handle)}</h4>
          </header>
          <p> ${escape(tweeterObj.content)} </p> 
          <footer> ${escape(tweeterObj.time)}
              <span class="footerIcons">
                <i class="fa fa-flag"></i>
                <i class="fa fa-retweet"></i>
                <i class="fa fa-heart"></i>
              </span>
          </footer>
        </article>`;

      return HTMLObj;
  }

    function loadTweets(){
      $.ajax('/tweets').done(function(data){
        $('.tweet-container').html('');
        renderTweets(data);
      })
    }

  //check data value 
  function validation(dataValue){
    if (dataValue === null || dataValue === ""){
      return false;
    }
    return true;
  }

  //check data length
  function validLength(dataLength){
    if (dataLength > 140){
      return false;
    }
    return true;
  }

  //using jQuery to prevent default events and submit form using AJAX
  $('.new-tweet form').on('submit', function(e) {
    e.preventDefault();
    let dataValue = $('.new-tweet textarea').val();
    let dataLength = dataValue.length;
    let data = $('.new-tweet form').serialize();
    //Check data validity
    let validDataLength = validLength(dataLength);
    let validData = validation(dataValue);
    
    if (validData && validDataLength){
      $.ajax('/tweets', {
        method: 'POST',
        data: data
      }).done(function(data) {
        loadTweets();
        $('textarea').val('');
        $('.counter').text('140');
        })
    } 
    if (!validData){
      // alert("No tweet entered!");
      $.toast({
        text: "No tweet entered!",
        heading: 'Error!',
        showHideTransition : 'slide',
        bgColor : 'red',
        icon: 'warning',
      })
    };
    if (!validDataLength){
      //alert("Tweet is too long!");
      // $.toast('Toast message to be shown')
      $.toast({
        text: "Tweet is too long!",
        heading: 'Error!',
        showHideTransition : 'slide',
        bgColor : 'red',
        icon: 'warning',

      })
    }
  }); 
  
  $('.compose').click(function(){
    $('.new-tweet').slideToggle();
    $('textarea').focus();
  })
});








  

