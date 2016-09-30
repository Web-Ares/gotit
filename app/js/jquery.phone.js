( function() {

    $( function() {

        $( '.phone' ).each( function(){

            new Phone( $(this) );

        } );

    } );

    var Phone = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window );

        //private methods
        var _onEvents = function()  {

                _window.on({
                    scroll: function () {

                        _checkScroll();

                    }
                });

            },
            _checkScroll = function(){

                var windowH = _window.height(),
                    curItems = _obj.find( '.pnone__part' ),
                    topPos = _obj.offset().top;

                if( _window.scrollTop() > ( topPos - windowH/2) && !( _window.scrollTop() > ( topPos - windowH/3) ) ){

                    console.log('tut');
                    curItems.addClass('animation')

                }

            },
            _init = function() {

                _obj[ 0 ].obj = _self;
                _checkScroll();
                _onEvents();
            };

        _init();
    };

} )();

