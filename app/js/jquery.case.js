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
            new SliderFormats( $(this) );

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
                            _img1 = slide.find('.move1'),
                            _img2 = slide.find('.move2'),
                            _img3 = slide.find('.move3'),
                            _img4 = slide.find('.move4'),
                            _img5 = slide.find('.move5');

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

                _obj.css( {
                    height: height
                } );

                _obj.parents('.case').css( {
                    'padding-top': height + 20
                } );

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

    var SliderFormats = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _objInner = _obj.find('.featured-products__disk'),
            _items = _obj.find('.swiper-slide_animated'),
            _distance = 0,
            _window = $(window),
            _globalWidth = _window.width();

        //private methods
        var _addEvents = function () {

                _window.on( {
                    resize: function () {

                        if( _globalWidth != _window.width() && _window.width()>=1024 ) {

                            _globalWidth = _window.width() + 1;

                            _positionItems();

                        }


                    },
                    load: function() {

                        if( _window.width()>=1024 ) {

                            _positionItems();
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

                    scrollPoint = 1;

                } else if ( x < 0 ) {

                    scrollPoint = 0;

                }

                if( ( x < 1 ) && ( x > 0 ) ){

                    scrollPoint = 1 - x;

                }

                _animationElems( start, end, scrollPoint );

            },
            _animationElems = function ( startPoint, endPoint, scrollPoint ) {

                var segment = endPoint - startPoint;


                _items.each(function (i) {

                    var curElem = $( this ),
                        rotateStart = 0,
                        scaleStart = 0.4,
                        rotateEnd = 90,
                        scaleEnd = 1,
                        pointStart = curElem.data('start'),
                        pointFinish = curElem.data('finish'),
                        k1 = ( ( pointFinish - pointStart ) * scrollPoint ) + pointStart,
                        koofRotate = ( rotateEnd - rotateStart ) / segment * ( _window.scrollTop() - startPoint ),
                        koofScale = scaleStart + ( scaleEnd - scaleStart ) / segment * ( _window.scrollTop() - startPoint );

                    console.log( k1 )

                    var rotate = curElem.data('rotate'),
                        rotateReverse = curElem.data('rotate-reverse'),
                        translate = curElem.data('translate'),
                        scale = curElem.data('scale');


                    if ( scrollPoint == 0 ) {

                        curElem.css( {
                            '-webkit-transform': 'rotate(' + rotate + 'deg) translate(' + translate + ') rotate(' + rotateReverse + 'deg)',
                            'transform': 'rotate(' + rotate + 'deg) translate(' + translate + ') rotate(' + rotateReverse + 'deg)'
                        } );

                    } else if ( scrollPoint == 1 ) {

                        curElem.css( {
                            '-webkit-transform': 'rotate(' + (rotate + ( -rotateEnd )) + 'deg) translate(' + translate + ') rotate(' + (rotateReverse + rotateEnd) + 'deg)',
                            'transform': 'rotate(' + (rotate + ( -rotateEnd )) + 'deg) translate(' + translate + ') rotate(' + (rotateReverse + rotateEnd) + 'deg)'
                        } );

                    } else {

                        curElem.css( {
                            '-webkit-transform': 'rotate(' + (rotate + ( -koofRotate )) + 'deg) translate(' + translate + ') rotate(' + ( rotateReverse + koofRotate ) + 'deg)',
                            'transform': 'rotate(' + (rotate + ( -koofRotate )) + 'deg) translate(' + translate + ') rotate(' + ( rotateReverse + koofRotate ) + 'deg)'
                        } );

                    }
                })

            },
            _positionItems = function () {

                if (_window.width() < 550) {

                    _distance = 20;

                } else if (_window.width() >= 550 && _window.width() < 1200) {

                    _distance = 70;

                } else {

                    _distance = 54;

                }

                var radius = ( _obj.height() + _distance) / 2 + 'px',
                    start = -90,
                    numberOfElements = _items.length,
                    slice = 360 / numberOfElements;

                _items.each( function (i) {

                    var curItem = $(this),
                        rotate = slice * i + start,
                        rotateReverse = rotate * -1;

                    curItem.css( {
                        '-webkit-transform': 'rotate(' + rotate + 'deg) scale(' + 0.4 + ')  translate(' + radius + ') rotate(' + rotateReverse + 'deg)',
                        'transform': 'rotate(' + rotate + 'deg)  scale(' + 0.4 + ') translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
                    } );

                    curItem.attr( 'data-rotate', rotate );
                    curItem.attr( 'data-rotate-reverse', rotateReverse );
                    curItem.attr( 'data-translate', radius );
                    curItem.attr( 'data-scale', '0.4' );

                } );
            },
            _init = function () {

                _obj[0].obj = _self;
                _addEvents();



            };

        _init();
    };


} )();
