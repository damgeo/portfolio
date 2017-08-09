// ***********************************************
// JavaScript for multiple response question (MRQ)
// ***********************************************

$(document).ready(function () {

  $('.invalid-feedback').hide();
  $('.correct-feedback').hide();
  $('.tryagain-feedback').hide();
  $('.incorrect-feedback').hide();

  $('.taskAnswers li a').click(function () {
    $(this).toggleClass("selected-response");
    $('.submit-ans, .group-work-submit-ans').addClass('active-state');
  });

  var numClicks = 0;

  $('.submit-ans').click(function () {

    // FIND FEEDBACK RELATED TO THIS SECTION
    var feedback = $(this).parents('.sl-slide-inner').find('.feedback-wrapper').addClass('open-feedback');

    numClicks++;
    var IsChecked = $('.taskAnswers li a').hasClass('selected-response');


    if (IsChecked == false) {
      $('.invalid-feedback').show();
      numClicks = 0;
    }

    else {

      // Replace id numbers with correct answers
      if ($('#1').hasClass('selected-response') && $('#3').hasClass('selected-response') && $('#5').hasClass('selected-response')) {

        // Replace id numbers with incorrect answers
        if ($('#2').hasClass('selected-response') || $('#4').hasClass('selected-response')) {

          if (numClicks >= 2) {
            $('.incorrect-feedback').show();
          }
          else {
            $('.tryagain-feedback').show();
          }
        }

        else {
          $('.correct-feedback').show();
          $('.submit-ans').hide();
        }
      }
      else {
        if (numClicks >= 2) {
          $('.incorrect-feedback').show();
        }
        else {
          $('.tryagain-feedback').show();
        }
      }
    }
  });

  $('.group-work-submit-ans').click(function () {

    // FIND FEEDBACK RELATED TO THIS SECTION
    var feedback = $(this).parents('.sl-slide-inner').find('.feedback-wrapper').addClass('open-feedback');

    numClicks++;
    var IsChecked = $('.taskAnswers li a').hasClass('selected-response');


    if (IsChecked == false) {
      $('.invalid-feedback').show();
      numClicks = 0;
      return;
    }

    var tryAgainFeedback = $('.tryagain-feedback');

    function incorrectFeedback() {
      $('.incorrect-feedback').show();
    }

    // Replace id numbers with correct answers
    if ($('#1').hasClass('selected-response') && $('#2').hasClass('selected-response') && $('#3').hasClass('selected-response') && $('#5').hasClass('selected-response')) {

      // Replace id numbers with incorrect answers
      if ($('#4').hasClass('selected-response') || $('#6').hasClass('selected-response')) {
        incorrectFeedback();
        return;
      }

      $('.correct-feedback').show();
      $('.group-work-submit-ans').hide();

      return;
    }
    incorrectFeedback();
  });

  // RETRY BUTTON
  $('.retry-btn').on('click', function () {
    // FIND FEEDBACK RELATED TO THIS SECTION
    var feedback = $(this).parents('.sl-slide-inner').find('.feedback-wrapper');

    feedback.removeClass('open-feedback');
    feedback.children().fadeOut(300);
  });

});