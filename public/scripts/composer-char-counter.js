$(document).ready(function() {
    // --- our code goes here ---
    $('.new-tweet textarea').on('keyup', function(event) {
        const counter = $('#counter-container');
        let totalCharacters = 140 - event.target.value.length;
        // let charCounter = 140 - $(this).val().length;
        // const counter = $(this).parent().find(".counter");
        counter.text(totalCharacters);
        if (totalCharacters < 0){
            counter.addClass("countOver");
        } else {
            counter.removeClass("countOver");
        }
    })
  });
  