/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//     {  
//       "user": {
//         "name": "Doggo",
//         "avatars": {
//           "small":   "https://www.guidedogs.org/wp-content/uploads/2018/01/Mobile.jpg"
//         },
//         "handle": "@dog"
//       },
//       "content": {
//         "text": "woof"
//       },
//       "created_at": 146111623222
//     },
//     { 
//       "user": {
//         "name": "Newton",
//         "avatars": {
//           "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//           "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//           "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//         },
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": {
//           "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//           "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//           "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//         },
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     },
//     {
//       "user": {
//         "name": "Johann von Goethe",
//         "avatars": {
//           "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//           "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//           "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//         },
//         "handle": "@johann49"
//       },
//       "content": {
//         "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//       },
//       "created_at": 1461113796368
//     }
//   ]

$(document).ready(function(){

  loadTweets();

    function renderTweets(tweets) {
        for (let item in tweets) {
          // console.log(item);
            let tweet = tweets[item];
  
            let newObj = {
                name: tweet.user.name,
                avatar: tweet.user.avatars.small,
                handle: tweet.user.handle,
                content: tweet.content.text,
                time: Math.round(tweet.created_at / 86400000000)
                // try using momentjs
            }
            let result = createTweetElement(newObj);
            $('.tweet-container').prepend(result);
        }
        return;
    }
    function createTweetElement(tweeterObj){
        let HTMLObj = `
          <article class="tweet"> 
            <header> 
              <img class="userIcon" src=${tweeterObj.avatar}>
              <h1> ${tweeterObj.name}</h1>
              <h4> ${tweeterObj.handle}</h4>
            </header>
            <p> ${tweeterObj.content} </p> 
            <footer> ${tweeterObj.time} days ago
                <span class="footerIcons">
                  <i class="fa fa-flag"></i>
                  <i class="fa fa-retweet"></i>
                  <i class="fa fa-heart"></i>
                </span>
            </footer>
          </article>`;

        return HTMLObj;
    }

    // $.ajax('/products').done(function(products) {
    //   // 1. Iterate through the products
    //   $.each(products, function(productId, product) {
    //     // 2. Create the li tag according to the product we are currently on
    //     let $liElement = productLiElement(product);
  
    function loadTweets(){
      $.ajax('/tweets').done(function(data){
        $('.tweet-container').html('');
        renderTweets(data);
      })
    }

    function validation(dataValue){
      if (dataValue === null || dataValue === ""){
        return false;
      }
      return true;
    }

    function validLength(dataLength){
      if (dataLength > 140){
        return false;
      }
      return true;
    }

    //using jQuery to prevent default events and submit form using AJAX
    $('.new-tweet form').on('submit', function(e) {
      e.preventDefault();
      // 1. Get the data from the form
      let dataValue = $('.new-tweet textarea').val();
      let dataLength = dataValue.length;
      let data = $('.new-tweet form').serialize();
      //Check data validity
      let validDataLength = validLength(dataLength);
      let validData = validation(dataValue);
      // console.log(validData);
      if (validData && validDataLength){
        // 2. Make a AJAX request using that data
        $.ajax('/tweets', {
          method: 'POST',
          data: data
        }).done(function(data) {
          loadTweets();
          // $('.tweet-container').prepend(result);
          // 2. Clear the form
          $('textarea').val('');
          })
        } 
      if (!validData){
        alert("No tweet entered!");
        //$.toast('No tweet entered!')
      }
      if (!validDataLength){
        alert("Tweet is too long!");
        //$.toast('Tweet is too long!')
      }
    });   
});








  

