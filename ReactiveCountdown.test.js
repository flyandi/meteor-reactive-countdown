
Tinytest.add('5 second countdown', function (test) {

	var collect = 0,

		countdown = new ReactiveCountdown(5, {

			tick: function() {

				collect += 1;

			},

			completed: function() {

				test.equal(5, collect, 'Countdown was not completed successfully');

			}

		});

	countdown.start();

});
