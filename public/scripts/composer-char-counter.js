$(document).ready(function() {
    // --- our code goes here ---
    $('.new-tweet textarea').on('keyup', function() {
        let charCounter = 140 - $(this).val().length;
        const counter = $(this).parent().find(".counter");
        counter.text(charCounter);
        if (charCounter < 0){
            counter.addClass("countOver");
        } else {
            counter.removeClass("countOver");
        }
    })
  });
  