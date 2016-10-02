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
            _phoneElems = _obj.find('.phone__elem'),
            _window = $( window );

        //private methods
        var _onEvents = function()  {

                _window.on({
                    scroll: function () {

                        if (_window.width() >= 768) {

                            _checkScroll();

                        }

                    }
                });

            },
            _checkScroll = function(){

                var windowH = _window.height(),
                    curItems = _obj.find( '.pnone__part' ),
                    topPos = _obj.offset().top,
                    start = topPos - windowH/2.5,
                    end = topPos - windowH/15,
                    scrollPoint;

                if ( _window.scrollTop() < start ) {

                    scrollPoint = 0;

                } else if ( _window.scrollTop() > end ) {

                    scrollPoint = 1;

                }

                if( _window.scrollTop() > start && !( _window.scrollTop() > end ) ){

                    scrollPoint = 'animation';

                }

                _animationElems( start, end, scrollPoint );

            },
            _animationElems = function (startPoint, endPoint, scrollPoint) {

                var segment = endPoint - startPoint;

                _phoneElems.each(function () {

                    var curElem = $( this ),
                        translateStart = 0,
                        scaleStart = 1,
                        translateEnd = curElem.data('translate'),
                        scaleEnd = curElem.data('scale'),
                        koofTranslate = ( translateEnd - translateStart ) / segment * ( _window.scrollTop() - startPoint ),
                        koofScale = scaleStart + ( scaleEnd - scaleStart ) / segment * ( _window.scrollTop() - startPoint );


                    if ( scrollPoint == 0 ) {

                        curElem.css( {

                            '-webkit-transform': 'translateY(' +translateStart+ '%) scale( '+scaleStart+' )',
                            'transform': 'translateY(' +translateStart+ '%) scale( '+scaleStart+' )'

                        } );

                    } else if ( scrollPoint == 1 ) {

                        curElem.css( {

                            '-webkit-transform': 'translateY(' +translateEnd+ '%) scale( '+scaleEnd+' )',
                            'transform': 'translateY(' +translateEnd+ '%) scale( '+scaleEnd+' )'

                        } );

                    } else {

                        curElem.css( {

                            '-webkit-transform': 'translateY(' +koofTranslate+ '%) scale( '+koofScale+' )',
                            'transform': 'translateY(' +koofTranslate+ '%) scale( '+koofScale+' )'

                        } );

                    }
                })

            },
            _init = function() {

                _obj[ 0 ].obj = _self;
                _checkScroll();
                _onEvents();
            };

        _init();
    };

} )();

