"use strict";
( function() {

	$( function() {

		$.each( $('.bubbles'), function () {

			new Bubbles( $(this) );

		} );


	} );

	var Bubbles = function ( obj ) {

		var _self = this,
			_obj = obj,
			_window = $( window),
			_winHeight;

		var _addEvents = function () {

				_window.on( {
					resize: function() {

						_winHeight = _window.height();
						_obj.height( _winHeight );

					}
				} );

			},
			_addBubbles = function() {

				var items = 30;

				for (var i = 0; i <= items; i++) {

					var move = Math.ceil( Math.random()*50 );
					var pos = Math.ceil( Math.random()*50 );
					var scale = Math.ceil( Math.random()*10 );
					var stretch = Math.ceil( Math.random()*5 );
					var shake = Math.ceil( Math.random()*5 );
					_obj.append('<div class="bubble moving'+move+' pos'+pos+'"><div class="scale'+scale+'"><div class="shake'+shake+'"><span class="item stretch'+stretch+'"></span></div></div>');

				}

			},
			_setHeight = function() {

				_winHeight = _window.height();
				_obj.height( _winHeight );

			},
			_init = function() {
				_obj[0].obj = _self;
				_addEvents();
				_addBubbles();
				_setHeight();

			};

		_init();
	};

} )();
