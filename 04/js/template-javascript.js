// *****************************************
// JavaScript for Queen's University Belfast
// *****************************************


// Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
  //$('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
})

// Skip navigation
$( document ).ready(function() {
    // bind a click event to the 'skip' link
    $(".skip").click(function(event){

        // strip the leading hash and declare
        // the content we're skipping to
        var skipTo="#"+this.href.split('#')[1];

        // Setting 'tabindex' to -1 takes an element out of normal 
        // tab flow but allows it to be focused via javascript
        $(skipTo).attr('tabindex', -1).on('blur focusout', function () {

            // when focus leaves this element, 
            // remove the tabindex attribute
            $(this).removeAttr('tabindex');

        }).focus(); // focus on the content container
    });
});



// Pause video when user moves to next or previous slide
$(document).ready(function() {
    $('video').bind('play', function (e) {
        $('#audio-player')[0].pause();
        $('.volume-adjust').addClass('stop-audio');
    });
    
   $(".nav-arrow-prev").on('click', function (e) {
        $('.video-js').each(function () {
          videojs(this.id).ready(function () {
            myPlayer = this;
            myPlayer.pause();
          });
        });
   });
});



// Main JavaScript for build functionality
$(function() {

	var Page = (function() {

		var $nav = $( '#nav-dots > span' ),
			slitslider = $( '#slider' ).slitslider(),

			init = function(evt) {

				initEvents();
			},
			initEvents = function() {

				// add navigation events
				$('#first-slide, .nav-arrow-next, .start-btn, .more-btn, .rect-btn').on( 'click touchstart touch', function() {

					slitslider.next();

					$('.sl-slide').on('inview', function(event, isInView) {

						var slide = $(this).find('.mask');
					  if (isInView) {
					    $(slide).each(function(x) {
					    $(this).children().delay(x * 150).queue(function() {
					      $(this).css({
					        '-webkit-transition': '.5s ease',
					        '-moz-transition': '.5s ease',
					        '-o-transition': '.5s ease',
					        'transition': '.5s ease',
					        '-webkit-transform': 'translate(0,0)',
					        '-moz-transform': 'translate(0,0)',
					        '-o-transform': 'translate(0,0)',
					        '-ms-transform': 'translate(0,0)',
					        'transform': 'translate(0,0)'
					      });
					    });
					  });

                
					    // CHANGE AUDIO
					    if (!$(this).data('audio')) {
					    	$('.volume-adjust').addClass('no-audio');
					    } else {
					    	$('.volume-adjust').removeClass('no-audio');
					    	$('.volume-adjust').removeClass('stop-audio');
					    }
                          
					    var filename = $(this).data('audio');
					    $('#audio-player').attr('src','media/audio/'+filename+'.mp3');

					    // SHOW/HIDE ARROW BUTTONS
					    if ($(isInView).hasClass('hide-nav')) {
					    	$('#nav-arrows').removeClass('nav-btns-active');
					    } else {
					    	$('#nav-arrows').addClass('nav-btns-active');
					    }

					    // HIDE NEXT / PREV BUTTONS ON LAST SLIDE
					    if (!$(this).is(':last-child')) {
					    	$('.nav-arrow-next').addClass('next-btn-active');
					    } else {
					    	$('.nav-arrow-next').removeClass('next-btn-active');
                            $('.nav-arrow-prev').removeClass('prev-btn-active');
					    }

					    // HIDE NEXT / PREV BUTTONS ON FIRST SLIDE
					    if (!$(this).is(':first-child')) {
					    	$('.nav-arrow-prev').addClass('prev-btn-active');
                            // fix tab index
                            $('.prev-btn').attr('tabindex','0');
					    	$('.next-btn').attr('tabindex','1');
					    } else {
					    	$('.nav-arrow-next').removeClass('next-btn-active');
					    	$('.nav-arrow-prev').removeClass('prev-btn-active');
                            $('.prev-btn').attr('tabindex','-1');
                            $('.next-btn').attr('tabindex','-1');
					    }
					    
					    // HIDE NEXT ON QUESTION AND TEXT INPUT SLIDES
					    if ($(this).find('.text-input, .question-wrapper').length > 0) {
					    	$('.nav-arrow-next').removeClass('next-btn-active');
					    }
					    
					  }
					  
					});
				} );

				$('.nav-arrow-prev').on( 'click', function() {
					
					slitslider.previous();

				} );

			};

			return { init : init };

	})();

	Page.init();

	$(window).load(function() {

		// LOAD BACKGROUND IMAGES
		var currentPath = window.location.pathname.split('/').pop().split('.html')[0];

		$('.sl-slide').each(function() {
			var slideBG = $(this).data('slide-bg');
			$(this).find('.sl-slide-inner, .feedback-wrapper').css({
				"background-image":"url('images/bg/" + currentPath + "-" + slideBG + ".jpg')",
				"background-position":"center",
				"background-size":"cover",
				"background-repeat":"no-repeat"
			});
		});

		// HIDE LOADING ANIMATION
		$('#loader-wrapper').fadeOut(500);
        
        $('.next-btn').attr('tabindex', '-1');
        $('.prev-btn').attr('tabindex', '-1');
	});

	//Quiz
	$('.quiz .option').on('click', function() {
		$('.quiz .option').removeClass('selected');
		$(this).addClass('selected');

		if ($('.quiz .option.selected').length > 0) {
			$(this).parents('.quiz').find('.submit-btn').addClass('active-state');
		} else {
			$(this).parents('.quiz').find('.submit-btn').removeClass('active-state');
		}
	});

	// SUBMIT QUESTION
	$('.submit-btn').on('click', function() {
		
		// FIND FEEDBACK RELATED TO THIS SECTION
		var feedback = $(this).parents('.sl-slide-inner').find('.feedback-wrapper').addClass('open-feedback');

		// CHECK IF OPTIONS SELECTED ARE CORRECT
		if ($(this).parent().find('.selected').hasClass('correct')) {
			feedback.children('.correct-feedback').show();

		} else {
			if ($(this).parent().find('.selected').data('error') == '1') {
				return feedback.children('.incorrect-feedback[data-error="1"]').show();
			}

			if ($(this).parent().find('.selected').data('error') == '2') {
				return feedback.children('.incorrect-feedback[data-error="2"]').show();
			}
			
			if ($(this).parent().find('.selected').data('error') == '3') {
				return feedback.children('.incorrect-feedback[data-error="3"]').show();
			}
			
			if ($(this).parent().find('.selected').data('error') == '4') {
				return feedback.children('.incorrect-feedback[data-error="4"]').show();
			}
		}
	});

	// RETRY BUTTON
	$('.retry-btn').on('click', function() {
		// FIND FEEDBACK RELATED TO THIS SECTION
		var feedback = $(this).parents('.sl-slide-inner').find('.feedback-wrapper');

		feedback.removeClass('open-feedback');
		feedback.children().fadeOut(300);
	});

	// VOLUME ADJUST
	$('.volume-adjust').on('click', function() {
		if ($('#audio-player')[0].paused) {
			$('#audio-player')[0].play();
			$(this).removeClass('stop-audio');
		} else {
			$('#audio-player')[0].pause();
			$(this).addClass('stop-audio');
		}
	});

	$('.inc-popup a').on('click', function() {
		var findReveal = $(this).parents('.sl-slide-inner').children('.popup-reveal'),
			findContent = $(this).attr('href');

			$('.popup-reveal').children().hide();

			$(findReveal).addClass('slide-up');
			$('.nav-arrow-next').removeClass('next-btn-active');
	    	$('.nav-arrow-prev').removeClass('prev-btn-active');
			$('#'+findContent).show();
			$('.close-btn').show();
			return false;
			
	});

	$('.close-btn').on('click', function() {
		$(this).parents('.popup-reveal').removeClass('slide-up');
		$(this).parents('.popup-reveal').children('div').fadeOut(300);
		$('.nav-arrow-next').addClass('next-btn-active');
    	$('.nav-arrow-prev').addClass('prev-btn-active');
	});

	$('.submit-input').on('click', function() {
		var findInput = $(this).parents('.sl-slide-inner').find('.text-input'),
			inputVal = findInput.val();

		$('.user-input').text(inputVal);
	});

	/**
	 * Notes: 
	 * 
	 * example how to add items:
	 */

	/*
	
	var $items  = $('<div class="sl-slide sl-slide-color-2" data-orientation="horizontal" data-slice1-rotation="-5" data-slice2-rotation="10" data-slice1-scale="2" data-slice2-scale="1"><div class="sl-slide-inner bg-1"><div class="sl-deco" data-icon="t"></div><h2>some text</h2><blockquote><p>bla bla</p><cite>Margi Clarke</cite></blockquote></div></div>');
	
	// call the plugin's add method
	ss.add($items);

	*/

});