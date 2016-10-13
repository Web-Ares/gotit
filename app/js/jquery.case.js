"use strict";
( function() {

    $( function() {

        $.each( $('.case__hero-btn-down'), function () {

            new ScrollDown( $(this) );

        } );

        $.each( $('.case__hero'), function () {

            new CaseHero( $(this) );

        } );

        $.each( $('.featured-products__items'), function () {

            new FeaturedProductsSlider( $(this) );
            new FeaturedProductsAnimation( $(this) );

        } );


    } );

    var CaseHero = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _header = $( '.site__header'),
            _step1 = 15,
            _step2 = 10,
            _step3 = 5,
            _step4 = 20,
            _step5 = 25,
            _globalWidth = 0;

        var _addEvents = function () {

                _obj.on( {
                    mousemove: function ( e ) {

                        e = e || window.event;

                        var slide = $(this),
                            _img1 = slide.find('.move1:not(.not_move)'),
                            _img2 = slide.find('.move2:not(.not_move)'),
                            _img3 = slide.find('.move3:not(.not_move)'),
                            _img4 = slide.find('.move4:not(.not_move)'),
                            _img5 = slide.find('.move5:not(.not_move)');

                        if ( _window.width() > 1024 && !( _header.hasClass('opened') ) && !( $(document).find('.move').hasClass('animated_moves') ) ) {

                            var pageX = e.clientX,
                                pageY = e.clientY,
                                halfWidth = _obj.width() / 2,
                                halfHeight = _obj.height() / 2,
                                percentFromCenterX = ( pageX - halfWidth ) / halfWidth,
                                percentFromCenterY = ( pageY - halfHeight ) / halfHeight;

                            if (_window.outerWidth() > 1024) {

                                _moveBottom(percentFromCenterX, percentFromCenterY, _step1,_img1);
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step1, $(document).find('.copy_1'));
                                _moveTop(percentFromCenterX, percentFromCenterY, _step2,_img2);
                                _moveTop(percentFromCenterX, percentFromCenterY, _step2, $(document).find('.copy_2'));
                                _moveTop(percentFromCenterX, percentFromCenterY, _step3,_img3);
                                _moveTop(percentFromCenterX, percentFromCenterY, _step3, $(document).find('.copy_3'));
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step4,_img4);
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step4, $(document).find('.copy_4'));
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step5,_img5);
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step5, $(document).find('.copy_5'));

                            }

                        }

                    }
                } );

                _window.on( {
                    load: function () {

                        _globalWidth = _window.width();

                    },
                    resize: function() {

                        if( _globalWidth != _window.width() ) {

                            _globalWidth = _window.width()+1;


                            if( _window.width() < 1024 ) {

                                _setHeight();

                            }

                        }

                        if( _window.width() >= 1024 && screen.width >= 1024 ) {

                            _obj.css( {
                                height: ''
                            } );

                            _obj.parents('.case').css( {
                                'padding-top': ''
                            } );


                        }

                        _addPictures();
                    },
                    scroll: function () {

                        // _animateElems();

                    }
                } );

                window.addEventListener("orientationchange", function() {

                    setTimeout( function() {

                        if( screen.width < 1024 ) {

                            _setHeight();

                        }

                    }, 500 );


                }, false);

            },
            _animateElems = function () {

                var scrollTop = _window.scrollTop(),
                    objHeight = _obj.height(),
                    elems = $('.move');

                if ( scrollTop > objHeight/1.5 ) {

                    elems.addClass('animated_moves');

                    setTimeout(function () {

                        elems.addClass('moves_up');

                    }, 100);

                    $('.case__hero-btn-down').trigger('click')

                }else{

                    elems.removeClass('moves_up');

                    setTimeout(function () {

                        elems.removeClass('animated_moves');

                    }, 400)

                }

            },
            _moveBottom = function( xPercent, yPercent, step, image ) {

                image.css( {
                    '-webkit-transform': 'translate( ' + -( xPercent * step ) + 'px,' + -( yPercent * step ) + 'px )',
                    'transform': 'translate( ' + -( xPercent * step ) + 'px, ' + -( yPercent * step ) + 'px  )'
                } );

            },
            _moveTop = function( xPercent, yPercent, step, image ) {

                image.css( {
                    '-webkit-transform': 'translate( ' + ( xPercent * step ) + 'px ,' + ( yPercent * step ) + 'px  )',
                    'transform': 'translate( ' + ( xPercent * step ) + 'px , ' + ( yPercent * step ) + 'px  )'
                } );

            },
            _setHeight = function() {

                var height = _window.height();

                if( height >= 450 ) {

                    _obj.css( {
                        height: height
                    } );

                    _obj.parents('.case').css( {
                        'padding-top': height + 20
                    } );

                } else {

                    _obj.css( {
                        height: '450px'
                    } );

                    _obj.parents('.case').css( {
                        'padding-top': '470px'
                    } );

                }



            },
            _addPictures = function() {

                _obj.find('.move').each(function(){

                    var curItem = $(this),
                        dataView = curItem.data('views');


                    if( dataView != undefined ) {

                        for( var i = 0; i < dataView.length; i++ ) {

                            var needView;

                            if( _window.width() >= 1024 ) {

                                needView = dataView[2];

                            } else if( _window.width() < 1024 && _window.width() >=768 ) {

                                needView = dataView[1];

                            } else if( _window.width() < 768 ) {

                                needView = dataView[0];

                            }

                        }

                        if( needView.url.length ) {

                            curItem.css( {
                                'background-image': 'url("'+ needView.url +'")',
                                top: 'auto',
                                right: 'auto',
                                bottom: 'auto',
                                left: 'auto'
                            } );

                        }

                        for (var key in needView.positions) {

                            curItem.css( key, needView.positions[key]/100 + 'em' );

                        }

                    }


                } );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
                _addPictures();

                if( _window.width() < 1024 ) {

                    _setHeight();

                }

            };

        _init();
    };

    var ScrollDown = function ( obj ) {

        var _self = this,
            _obj = obj,
            _scroller = $( 'html, body' ),
            _heroPic = $('.case__hero');

        var _addEvents = function () {

                _obj.on( {
                    click: function() {

                        _scroller.animate( { scrollTop: _heroPic.innerHeight() }, 300 );

                        return false;
                    }
                } );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
            };

        _init();
    };

    var FeaturedProductsSlider = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _swiperInit = false,
            _swiper,
            _squad = $('.featured-products'),
            _squadDisk = $('.featured-products__disk');

        var _addEvents = function () {

                _window.on( {
                    load: function() {

                        if( _window.width() >= 768 ) {

                            _setDiskSize();

                        }


                    },
                    resize: function() {

                        if( _window.width() < 1024 ) {

                            if( !_swiperInit ) {

                                _initSwiper();
                                _swiperInit = true;

                            }


                        } else {

                            if( _swiperInit ) {

                                _destroySwiper();
                                _swiperInit = false;
                            }

                            _setDiskSize();

                        }

                        if( _window.width() < 768 ) {

                            _squadDisk.attr('style','')


                        } else {

                            _setDiskSize();

                        }

                    }
                } );

            },
            _initSwiper = function() {

                _swiper = new Swiper( _obj.find( '.swiper-container' ), {
                    slidesPerView: 1,
                    nextButton: _obj.find('.swiper-button-next')[0],
                    prevButton: _obj.find('.swiper-button-prev')[0]
                } );

            },
            _destroySwiper = function() {

                _swiper.destroy( true, true);

            },
            _setDiskSize = function() {

                var height = _squad.innerHeight(),
                    width = _squad.innerWidth(),
                    newSize;

                if( height > width ) {

                    newSize  = width

                } else {

                    newSize  = height

                }

                _squadDisk.width( newSize );
                _squadDisk.height( newSize );
                _squadDisk.css( {

                    'margin-top': '-' +newSize/2+ 'px',
                    'margin-left': '-' +newSize/2+ 'px'

                } );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

                if( _window.width() < 1024 ) {

                    if( !_swiperInit ) {

                        _initSwiper();
                        _swiperInit = true;
                    }

                }

            };

        _init();
    };

    var FeaturedProductsAnimation = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find('.swiper-slide'),
            _window = $(window),
            _globalWidth = _window.width();

        //private methods
        var _addEvents = function () {

                _window.on( {
                    resize: function() {

                        if( _globalWidth != _window.width() ) {

                            _globalWidth = _window.width()+1;


                            if( _window.width() < 1024 ) {

                                _items.css( {
                                    '-weblit-transform': 'none',
                                    'transform': 'none'
                                } );

                            }

                        }


                    },
                    load: function() {

                        if( _window.width() >= 1024 ) {

                            _checkScroll();

                        }

                    },
                    scroll: function () {

                        if (_window.width() >= 1024) {

                            _checkScroll();

                        }

                    }
                } );

            },
            _checkScroll = function(){

                var windowH = _window.height(),
                    topPos = _obj.offset().top,
                    start = topPos - windowH/2.5,
                    end = topPos - windowH/15,
                    scrollPoint;

                var x = ( end - _window.scrollTop() ) / ( end -  start );

                if ( x > 1 ) {

                    scrollPoint = 0;


                } else if ( x < 0 ) {

                    scrollPoint = 1;

                }

                if( ( x < 1 ) && ( x > 0 ) ){

                    scrollPoint = 1 - x;

                }

                _animationElems( start, end, scrollPoint );

            },
            _animationElems = function ( startPoint, endPoint, scrollPoint ) {

                var segment = endPoint - startPoint,
                    radius = ( _obj.height() ) / 2;

                _items.each( function () {

                    var curElem = $( this ),
                        pointStart = curElem.data('start'),
                        pointFinish = curElem.data('finish'),
                        scaleStart = 0,
                        scaleFinish = 1,
                        kof = ( ( pointFinish - pointStart ) * scrollPoint ) + pointStart,
                        kofScale = scaleStart + ( scaleFinish - scaleStart ) / segment * ( _window.scrollTop() - startPoint );

                    var x,
                        y;


                    if ( scrollPoint == 1 ) {

                            x = Math.cos( pointFinish/57.2 ) * radius;
                            y = Math.sin( pointFinish/57.2 ) * radius;

                        if( pointFinish < 90 && pointFinish > 270 ) {

                            x = -x;

                        }

                        if( pointStart === undefined ) {

                            x = 0;
                            y = 0;

                        }

                        curElem.css( {
                            '-webkit-transform': 'translateX(' + x + 'px) translateY(' + y + 'px) scale( '+ scaleFinish +' )',
                            'transform': 'translateX(' + x + 'px) translateY(' + y + 'px) scale( '+ scaleFinish +' )'
                        } );

                    } else if ( scrollPoint == 0 ) {

                        x = Math.cos( ( pointFinish - pointStart )/57.2 ) * radius;
                        y = Math.sin( ( pointFinish - pointStart )/57.2 ) * radius;


                        if( pointStart <= 180 ) {

                            y = -y;

                        }

                        if( pointFinish <= 180 ) {

                            x = -x;

                        }

                        if( pointStart === undefined ) {

                            x = 0;
                            y = 0;

                        }

                        curElem.css( {
                            '-webkit-transform': 'translateX('  + x + 'px) translateY(' + y + 'px) scale( '+ scaleStart +' )',
                            'transform': 'translateX(' + x + 'px) translateY(' + y + 'px) scale( '+ scaleStart +' )'
                        } );


                    } else {

                            x = Math.cos( ( pointFinish - kof )/57.2 ) * radius;
                            y = Math.sin( ( pointFinish - kof )/57.2 ) * radius;

                        if( pointStart <= 180 ) {

                            y = -y;

                        }

                        if( pointFinish <= 180 ) {

                            x = -x;

                        }

                        if( pointStart === undefined ) {

                            x = 0;
                            y = 0;

                        }


                        curElem.css( {
                            '-webkit-transform': 'translateX(' + x + 'px) translateY(' + y + 'px) scale( '+ kofScale +' )',
                            'transform': 'translateX(' + x + 'px) translateY(' + y + 'px) scale( '+ kofScale +' )'
                        } );

                    }
                } );

            },
            _init = function () {

                _obj[0].obj = _self;
                _addEvents();

            };

        _init();
    };


} )();
