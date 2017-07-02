/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	skel.breakpoints({
		xxlarge: '(max-width: 1920px)',
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 1000px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
	});

	$(function () {

		var $window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$all = $body.add($header);

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 0);
		});

		// Touch mode.
		skel.on('change', function () {

			if (skel.vars.mobile || skel.breakpoint('small').active)
				$body.addClass('is-touch');
			else
				$body.removeClass('is-touch');

		});

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Fix: IE flexbox fix.
		if (skel.vars.IEVersion <= 11
			&& skel.vars.IEVersion >= 10) {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function () {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function () {

						var wh = $window.height();

						$main.each(function () {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

		// Prioritize "important" elements on small.
		skel.on('+small -small', function () {
			$.prioritize(
				'.important\\28 small\\29',
				skel.breakpoint('small').active
			);
		});

		// Gallery.
		$window.on('load', function () {

			var $gallery = $('.gallery');

			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true
			});

			// Hack: Adjust margins when 'small' activates.
			skel
				.on('-small', function () {
					$gallery.each(function () {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				})
				.on('+small', function () {
					$gallery.each(function () {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

		// Section transitions.
		if (skel.canUse('transition')) {

			var on = function () {

				// Galleries.
				$('.gallery')
					.scrollex({
						top: '30vh',
						bottom: '30vh',
						delay: 50,
						initialize: function () { $(this).addClass('inactive'); },
						terminate: function () { $(this).removeClass('inactive'); },
						enter: function () { $(this).removeClass('inactive'); },
						leave: function () { $(this).addClass('inactive'); }
					});

				// Generic sections.
				$('.main.style1')
					.scrollex({
						mode: 'middle',
						delay: 100,
						initialize: function () { $(this).addClass('inactive'); },
						terminate: function () { $(this).removeClass('inactive'); },
						enter: function () { $(this).removeClass('inactive'); },
						leave: function () { $(this).addClass('inactive'); }
					});

				$('.main.style2')
					.scrollex({
						mode: 'middle',
						delay: 100,
						initialize: function () { $(this).addClass('inactive'); },
						terminate: function () { $(this).removeClass('inactive'); },
						enter: function () { $(this).removeClass('inactive'); },
						leave: function () { $(this).addClass('inactive'); }
					});

				// Contact.
				$('#contact')
					.scrollex({
						top: '50%',
						delay: 50,
						initialize: function () { $(this).addClass('inactive'); },
						terminate: function () { $(this).removeClass('inactive'); },
						enter: function () { $(this).removeClass('inactive'); },
						leave: function () { $(this).addClass('inactive'); }
					});

			};

			var off = function () {

				// Galleries.
				$('.gallery')
					.unscrollex();

				// Generic sections.
				$('.main.style1')
					.unscrollex();

				$('.main.style2')
					.unscrollex();

				// Contact.
				$('#contact')
					.unscrollex();

			};

			skel.on('change', function () {

				if (skel.breakpoint('small').active)
					(off)();
				else
						(on)();

			});

		}

		// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.resize(function () {

				// Disable animations/transitions.
				$body.addClass('is-resizing');

				window.clearTimeout(resizeTimeout);

				resizeTimeout = window.setTimeout(function () {

					// Update scrolly links.
					$('a[href^="#"]').scrolly({
						speed: 1500,
						offset: $header.outerHeight() - 1
					});

					// Re-enable animations/transitions.
					window.setTimeout(function () {
						$body.removeClass('is-resizing');
						$window.trigger('scroll');
					}, 0);

				}, 100);

			})
			.load(function () {
				$window.trigger('resize');
			});

	});

	$('#reservation #submit').on('click', function () {
		$('#reservation').validate({ // initialize the plugin

			submitHandler: function (form) {

				// save form values
				var nameVal = $('#reservation #name').val();
				var emailVal = $('#reservation #email').val();
				var messageVal = $('#reservation #message').val();

				// get input rsvp code and rsvp code from firebase
				var inputId = $('#reservation #rsvp').val();
				var reservationCodeRef = firebase.database().ref("reservationCode");

				// get reference to guests object from firebase
				var guestRef = firebase.database().ref("guests");

				reservationCodeRef.once("value")
					.then(function (snapshot) {

						// validate reservation code
						if (snapshot.val() === inputId) {
							// if valid, return response
							console.log("VALID")

							var boxDiv = document.getElementById("box1");
							boxDiv.innerHTML = boxDiv.innerHTML + '<div class="overlay" id="overlay"><p>text center</p></div>';

							var div = document.getElementById('overlay');
							div.innerHTML = "";
							div.innerHTML = '<div class="txt"><i class="fa fa-check-circle-o" aria-hidden="true"></i><p><strong>Success!</strong></p></div>';

							// event.preventDefault();
							$("div.overlay").fadeOut(5000);

							// save data to firebase
							guestRef.push({
								name: {
									email: emailVal,
									message: messageVal,
									name: nameVal
								}
							});

							form.submit();
						}

						console.log("NOT VALID!");

						var boxDiv = document.getElementById("box1");
						boxDiv.innerHTML = boxDiv.innerHTML + '<div class="overlay" id="overlay"><p>text center</p></div>';

						var div = document.getElementById('overlay');
						div.innerHTML = "";
						div.innerHTML = '<div class="txt"><i class="fa fa-exclamation-circle txt" aria-hidden="true"></i><p><strong>Invalid Code<strong></p></div>'

						// event.preventDefault();
						$("div.overlay").fadeOut(5000);
						form.reload();
					});

			}

		});
	})
})(jQuery);


