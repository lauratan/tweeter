$(document).ready(function() {
    $('.new-tweet textarea').on('keyup', function(event) {
        const counter = $('#counter-container');
        let totalCharacters = 140 - event.target.value.length;
        counter.text(totalCharacters);
        if (totalCharacters < 0){
            counter.addClass("countOver");
        } 
        else {
            counter.removeClass("countOver");
        }
    });
});
  