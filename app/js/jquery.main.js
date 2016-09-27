"use strict";
( function() {

    $( function() {

        new Preloader( $('.preloader') );

        $.each( $('.site__index-page' ), function () {

            new Page( $(this) );

        } );

        $.each( $('body'), function () {

            new ZoomSite( $(this) );

        } );

        $.each( $('.site__header'), function () {

            new Menu( $(this) );

        } );

        $.each( $('.main-slider'), function () {

            new MainSlider( $(this) );

        } );

        $.each( $('.expertise__items'), function () {

            new ExpertiseSlider( $(this) );

        } );

        $.each( $('.squad__items'), function () {

            new SquadSlider( $(this) );

        } );

        $.each( $('.our-clients__items'), function () {

            new ClientsSlider( $(this) );

        } );

        $.each( $('.reviews'), function () {

            new ReviewsSlider( $(this) );

        } );

        $.each( $('.contacts__map'), function () {

            new Location( $(this) );

        } );


    } );

    var Preloader = function (obj) {

        //private properties
        var _self = this,
            _window = $( window ),
            _preloader = obj,
            _body = $('body');

        //private methods
        var _addEvents = function () {

                _window.on( {
                    load: function(){

                        _showSite();

                    }
                } );

            },
            _init = function () {

                _body[0].preloader = _self;
                _addEvents();

            },
            _showSite = function() {

                _preloader.addClass( 'preloader_loaded' );

                setTimeout(function(){
                    _preloader.remove();
                    $('.site').addClass( 'site__loaded' );

                },500);
            };

        //public properties

        //public methods


        _init();
    };

    var Page = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _dom = $( 'html, body' ),
            _actionScroll = false,
            _actionScrollTop = false,
            _actionScrollBottom = false,
            _direction = 0,
            _swiperInit = false,
            _swiper,
            _swiperContent = _obj.find('.swiper-slide__content'),
            _mainSlider = $('.main-slider'),
            _btnDown = _mainSlider.find('.main-slider__btn-down');

        var _addEvents = function () {

                _swiperContent.on( {
                    scroll: function() {

                        if( _swiperInit ) {

                            var actSlide = _obj.find('.site__index-swiper .swiper-slide-active'),
                                actSlideContent = actSlide.find('.swiper-slide__content'),
                                actSlideContentInner = actSlideContent.find('>div');

                            _checkActionScrollTop( actSlideContent );
                            _checkActionScrollBottom( actSlideContent, actSlideContentInner );

                            if( _actionScrollTop && !_actionScrollBottom && _direction < 0 ) {

                                _swiper.unlockSwipeToPrev();
                                _swiper.enableMousewheelControl();


                            }

                            if( _actionScrollBottom && !_actionScrollTop && _direction > 0 ) {

                                _swiper.unlockSwipeToNext();
                                _swiper.enableMousewheelControl();

                            }

                            if( !_actionScrollBottom && !_actionScrollTop ) {

                                _swiper.lockSwipes();
                                _swiper.disableMousewheelControl();

                            }

                        }

                    }
                } );
                _window.on( {
                    resize: function() {

                        if( _window.width() >= 1024 ) {

                            if( !_swiperInit  && !device.mobile() && !device.tablet() ) {

                                _initSwiper();
                                _swiperInit = true;

                            }


                        } else {

                            if( _swiperInit ) {

                                _destroySwiper();
                                _swiperInit = false;
                            }

                        }

                        if( _swiperInit ) {

                            var actSlide = _obj.find('.site__index-swiper .swiper-slide-active'),
                                actSlideContent = actSlide.find('.swiper-slide__content'),
                                actSlideContentInner = actSlideContent.find('>div');

                            _checkActionScroll( actSlideContentInner );
                            _centerContent();

                        }

                    }
                } );
                _swiperContent.on( {
                    'DOMMouseScroll': function ( e ) {

                        var delta = e.originalEvent.detail;

                        if ( delta ) {

                            _direction = ( delta > 0 ) ? 1 : -1;

                            _checkScroll( _direction );

                        }

                        if( _actionScrollTop && !_actionScrollBottom && _direction > 0 ) {

                            _swiper.lockSwipeToPrev();
                            _swiper.disableMousewheelControl();


                        }

                        if( _actionScrollBottom && !_actionScrollTop && _direction < 0 ) {

                            _swiper.lockSwipeToNext();
                            _swiper.disableMousewheelControl();

                        }

                        if( _actionScrollTop && !_actionScrollBottom && _direction < 0 ) {

                            _swiper.unlockSwipeToPrev();
                            _swiper.enableMousewheelControl();


                        }

                        if( _actionScrollBottom && !_actionScrollTop && _direction > 0 ) {

                            _swiper.unlockSwipeToNext();
                            _swiper.enableMousewheelControl();

                        }


                    },
                    'mousewheel': function ( e ) {

                        var delta = e.originalEvent.wheelDelta;

                        if ( delta ) {

                            _direction = ( delta > 0 ) ? -1 : 1;

                            _checkScroll( _direction );

                        }

                        if( _actionScrollTop && !_actionScrollBottom && _direction > 0 ) {

                            _swiper.lockSwipeToPrev();
                            _swiper.disableMousewheelControl();


                        }

                        if( _actionScrollBottom && !_actionScrollTop && _direction < 0 ) {

                            _swiper.lockSwipeToNext();
                            _swiper.disableMousewheelControl();

                        }

                        if( _actionScrollTop && !_actionScrollBottom && _direction < 0 ) {

                            _swiper.unlockSwipeToPrev();
                            _swiper.enableMousewheelControl();


                        }

                        if( _actionScrollBottom && !_actionScrollTop && _direction > 0 ) {

                            _swiper.unlockSwipeToNext();
                            _swiper.enableMousewheelControl();

                        }

                    }

                } );
                _btnDown.on( {
                    click: function() {

                        if( _window.width() >= 1024 ) {

                            _swiper.slideNext( true, 600);

                        } else {

                            _dom.stop( true, false );
                            _dom.animate( { scrollTop: _mainSlider.innerHeight() }, 300 );

                        }

                        return false;
                    }
                } );

            },
            _checkScroll = function( direction ) {

                if( direction < 0 && _actionScrollTop && _swiperInit ) {

                    _swiper.unlockSwipeToPrev();
                    _swiper.enableMousewheelControl();

                }
            },
            _checkActionScroll = function( elem ) {

                _actionScroll = ( _window.scrollTop() + _window.height() ) >= elem.innerHeight();

            },
            _checkActionScrollTop = function( elem ) {

                _actionScrollTop = elem.scrollTop() <= 0;

            },
            _checkActionScrollBottom = function( elem, elemInner ) {

                _actionScrollBottom = ( elem.scrollTop() + _window.height() ) >= elemInner.innerHeight();

            },
            _initSwiper = function() {

                _swiper = new Swiper('.site__index-swiper', {
                    direction: 'vertical',
                    spaceBetween: 0,
                    speed: 700,
                    slidesPerView: 1,
                    simulateTouch: false,
                    autoHeight: 'auto',
                    mousewheelControl: true,
                    onInit: function( swiper ) {

                        var actSlide = _obj.find('.site__index-swiper .swiper-slide-active'),
                            actSlideContent = actSlide.find('.swiper-slide__content'),
                            actSlideContentInner = actSlide.find('.swiper-slide__content>div');

                        _direction = 0;

                        _checkActionScroll( actSlideContentInner );
                        _checkActionScrollTop( actSlideContent );
                        _checkActionScrollBottom( actSlideContent, actSlideContentInner );

                        if( _actionScroll ) {

                            swiper.unlockSwipes();
                            swiper.enableMousewheelControl();

                        } else {

                            swiper.lockSwipes();
                            swiper.disableMousewheelControl();
                            swiper.disableKeyboardControl();

                            _checkScroll( _direction );

                        }

                    },
                    onSlideChangeStart: function( swiper ) {

                        //_swiperContent.css( {
                        //    'overflow-y': 'hidden'
                        //} );

                        var index = swiper.activeIndex;

                        if( index > 0 ) {

                            $('.logo_index').hide();

                        } else {

                            $('.logo_index').show();

                        }


                    },
                    onSlideChangeEnd: function(swiper) {

                        var actSlide = _obj.find('.site__index-swiper .swiper-slide-active'),
                            actSlideContent = actSlide.find('.swiper-slide__content'),
                            actSlideContentInner = actSlide.find('.swiper-slide__content>div');

                        _direction = 0;

                        _checkActionScroll( actSlideContentInner );
                        _checkActionScrollTop( actSlideContent );
                        _checkActionScrollBottom( actSlideContent, actSlideContentInner );

                        if( _actionScroll ) {

                            swiper.unlockSwipes();
                            swiper.enableMousewheelControl();

                        } else {

                            swiper.lockSwipes();
                            swiper.disableMousewheelControl();
                            swiper.disableKeyboardControl();

                            _checkScroll( _direction );

                        }

                        //setTimeout( function() {
                        //
                        //    _swiperContent.css( {
                        //        'overflow-y': 'auto'
                        //    } );
                        //
                        //}, 600 );

                    }
                } );

            },
            _destroySwiper = function() {

                _swiper.destroy( true, true);

            },
            _centerContent = function() {
                _swiperContent.each( function() {

                    var curContent = $(this),
                        curContentInner = curContent.find('>div');

                    if( curContent.innerHeight() > curContentInner.innerHeight() ) {

                        curContent.addClass('centered');

                    } else {

                        curContent.removeClass('centered');

                    }

                } );
            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

                if( _window.width() >= 1024 && !device.mobile() && !device.tablet() ) {

                    if( !_swiperInit ) {

                        _initSwiper();
                        _centerContent();
                        _swiperInit = true;

                    }

                }

                if( device.mobile() || device.tablet() ) {

                    _obj.addClass('mob_view');

                }

            };

        _init();
    };

    var ZoomSite = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _body = $( 'body' );

        //private methods
        var _onEvents = function () {

                _window.on( {

                    resize: function () {

                        if( _window.width() >= 1024 ) {

                            _setSize();

                        } else {

                            _body.css( {
                                'font-size': '75px'
                            } );

                        }

                    }

                } );

            },
            _init = function () {

                _onEvents();

                if( _window.width() >= 1024 ) {

                    _setSize();

                }

                _obj[0].obj = _self;

            },
            _setSize = function () {

                var newSize;

                if( _window.height() > 500 ) {

                    newSize = ( 100 * ( window.innerHeight / 900 ) ) + 'px';


                } else {

                    newSize = ( 100 * ( 500 / 900 ) ) + 'px';

                }

                _body.css( {
                    'font-size': newSize
                } );

            };


        _init();
    };

    var Menu = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window),
            _menuBtn = _obj.find('.site__header__btn'),
            _menuItems = _obj.find('.site__header-menu'),
            _html = $('html'),
            _body = $('body');

        //private methods
        var _closeMenu = function() {

                _obj.removeClass( 'opened' );
                _html.css( {
                    'overflow-y': 'auto'
                } );
                _body.css( {
                    'overflow-y': 'auto'
                } );
                _menuItems.attr( 'style', '' );

            },
            _onEvents = function () {

                _window.on( {

                    resize: function () {

                        if( _obj.hasClass( 'opened' ) ) {

                            _closeMenu();

                        }

                    }

                } );

                _menuBtn.on( {

                    click: function () {

                        if( _obj.hasClass( 'opened' ) ) {

                            _closeMenu();


                        } else {

                            _openMenu();

                        }

                        return false;

                    }

                } );

            },
            _openMenu = function() {

                _obj.addClass( 'opened' );
                _html.css( {
                    'overflow-y': 'hidden'
                } );
                _body.css( {
                    'overflow-y': 'hidden'
                } );

            },
            _init = function () {

                _onEvents();
                _obj[0].obj = _self;

            };


        _init();
    };

    var MainSlider = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _header = $( '.site__header'),
            _img1 = _obj.find('.swiper-slide').find( '.move1' ),
            _img2 = _obj.find('.swiper-slide').find( '.move2'),
            _img3 = _obj.find('.swiper-slide').find( '.move3'),
            _img4 = _obj.find('.swiper-slide').find( '.move4'),
            _img5 = _obj.find('.swiper-slide').find( '.move5'),
            _step1 = 15,
            _step2 = 10,
            _step3 = 5,
            _step4 = 20,
            _step5 = 25,
            _swiper1;

        var _addEvents = function () {


                _obj.find('.swiper-slide').on( {
                    mousemove: function( e ) {

                        if (_window.width() > 1024 && !( _header.hasClass('opened') ) ) {

                            var pageX = e.pageX,
                                pageY = e.pageY,
                                halfWidth = _obj.width() / 2,
                                halfHeight = _obj.height() / 2,
                                percentFromCenterX = ( pageX - halfWidth ) / halfWidth,
                                percentFromCenterY = ( pageY - halfHeight ) / halfHeight;

                            if (_window.outerWidth() > 1024) {

                                _moveBottom(percentFromCenterX, percentFromCenterY, _step1,_img1);
                                _moveTop(percentFromCenterX, percentFromCenterY, _step2,_img2);
                                _moveTop(percentFromCenterX, percentFromCenterY, _step3,_img3);
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step4,_img4);
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step5,_img5);

                            }

                        }
                    }
                } );

            },
            _initSwiper = function() {

                _swiper1 = new Swiper( _obj.find( '.swiper-container' ), {
                    spaceBetween: 0,
                    slidesPerView: 1,
                    loop: true,
                    autoplay: 5000,
                    speed: 600,
                    autoplayDisableOnInteraction: false,
                    nextButton: _obj.find('.swiper-button-next')[0],
                    prevButton: _obj.find('.swiper-button-prev')[0]
                } );

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
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
                _initSwiper();

            };

        _init();
    };

    var ExpertiseSlider = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _swiperInit = false,
            _swiper;

        var _addEvents = function () {

                _window.on( {
                    resize: function() {

                        if( _window.width() < 768 ) {

                            if( !_swiperInit ) {

                                _initSwiper();
                                _swiperInit = true;

                            }


                        } else {

                            if( _swiperInit ) {

                                _destroySwiper();
                                _swiperInit = false;
                            }

                        }

                    }
                } );

            },
            _initSwiper = function() {

                _swiper = new Swiper( _obj.find( '.swiper-container' ), {
                    slidesPerView: 1.9,
                    centeredSlides: true
                } );

            },
            _destroySwiper = function() {

                _swiper.destroy( true, true);

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

                if( _window.width() < 768 ) {

                    if( !_swiperInit ) {

                        _initSwiper();
                        _swiperInit = true;
                    }

                }

            };

        _init();
    };

    var SquadSlider = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _swiperInit = false,
            _swiper,
            _squad = $('.squad'),
            _squadDisk = $('.squad__disk');

        var _addEvents = function () {

                _window.on( {
                    load: function() {

                        if( _window.width() >= 768 ) {

                            _setDiskSize();

                        }


                    },
                    resize: function() {

                        if( _window.width() < 768 ) {

                            if( !_swiperInit ) {

                                _initSwiper();
                                _swiperInit = true;

                            }

                            _squadDisk.attr('style','')


                        } else {

                            if( _swiperInit ) {

                                _destroySwiper();
                                _swiperInit = false;
                            }

                            _setDiskSize();

                        }


                    }
                } );

            },
            _initSwiper = function() {

                _swiper = new Swiper( _obj.find( '.swiper-container' ), {
                    slidesPerView: 1.75,
                    centeredSlides: true
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

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

                if( _window.width() < 768 ) {

                    if( !_swiperInit ) {

                        _initSwiper();
                        _swiperInit = true;
                    }

                }

            };

        _init();
    };

    var ClientsSlider = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _swiper;

        var _addEvents = function () {

                _window.on( {
                    resize: function() {



                    }
                } );

            },
            _initSwiper = function() {

                _swiper = new Swiper( _obj.find( '.swiper-container' ), {
                    slidesPerView: 5,
                    nextButton: _obj.find('.swiper-button-next')[0],
                    prevButton: _obj.find('.swiper-button-prev')[0],
                    breakpoints: {
                        1024: {
                            slidesPerView: 3
                        },
                        768: {
                            slidesPerView: 1,
                            loop: true,
                            autoplay: 7000,
                            autoplayDisableOnInteraction: false
                        }
                    }
                } );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
                _initSwiper();

            };

        _init();
    };

    var ReviewsSlider = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _swiper;

        var _addEvents = function () {

                _window.on( {
                    resize: function() {



                    }
                } );

            },
            _initSwiper = function() {

                _swiper = new Swiper( _obj.find( '.swiper-container' ), {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    loop: true,
                    autoplay: 7000,
                    speed: 500,
                    autoplayDisableOnInteraction: false,
                    nextButton: _obj.find('.swiper-button-next')[0],
                    prevButton: _obj.find('.swiper-button-prev')[0]
                } );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
                _initSwiper();

            };

        _init();
    };

    var Location = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _map = _obj.find('#contact-google-map'),
            _mapLat = _map.data('map-lat'),
            _mapLng = _map.data('map-lng'),
            _mapZoom = _map.data('map-zoom'),
            _btn = $('.contacts__cities .btn'),
            _window = $( window ),
            map,
            marker;

        //private methods
        var _addEvents = function () {

                _window.on( {
                    load: function() {
                        _map.height( $('.contacts__inner').innerHeight() )
                    },
                    resize: function() {
                        _map.height( $('.contacts__inner').innerHeight() )
                    }
                } );



                google.maps.event.addDomListener( window, 'resize', function() {

                    var myLatLng = {lat: _btn.filter('.active').data('map-lat'), lng: _btn.filter('.active').data('map-lng')};

                    map.setCenter( myLatLng );

                    _offsetCenter( map.getCenter(), 0, 0);

                } );
                _btn.on( {
                    click: function () {

                        var curItem = $(this);

                        if( !(curItem.hasClass('active')) ) {

                            _btn.removeClass('active');
                            curItem.addClass('active');

                            var myLatLng = {lat: $(this).data('map-lat'), lng: $(this).data('map-lng')};
                            marker.setPosition(myLatLng);

                            setTimeout( function() {
                                google.maps.event.trigger(map, 'resize');
                                map.setCenter(myLatLng);
                            }, 300 );

                        }

                        return false;

                    }
                } );

            },
            _offsetCenter = function ( latlng, offsetx, offsety ) {

                var scale = Math.pow( 2, map.getZoom() ),
                    worldCoordinateCenter = map.getProjection().fromLatLngToPoint( latlng ),
                    pixelOffset = new google.maps.Point( ( offsetx/scale ) || 0, ( offsety/scale ) || 0 ),
                    worldCoordinateNewCenter = new google.maps.Point(

                        worldCoordinateCenter.x - pixelOffset.x,
                        worldCoordinateCenter.y + pixelOffset.y

                    ),

                    newCenter = map.getProjection().fromPointToLatLng( worldCoordinateNewCenter );

                map.setCenter( newCenter );

            },
            _initMap = function () {
                var customMapType = new google.maps.StyledMapType([
                    {
                        "stylers": [
                            {
                                "hue": "#b00040"
                            },
                            {
                                "saturation": 60
                            },
                            {
                                "lightness": -40
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#ff6fa4"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "stylers": [
                            {
                                "color": "#B61530"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "stylers": [
                            {
                                "color": "#B61530"
                            },
                            {}
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "stylers": [
                            {
                                "color": "#B61530"
                            },
                            {
                                "lightness": 6
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "stylers": [
                            {
                                "color": "#B61530"
                            },
                            {
                                "lightness": -25
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "stylers": [
                            {
                                "color": "#B61530"
                            },
                            {
                                "lightness": -10
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [
                            {
                                "color": "#B61530"
                            },
                            {
                                "lightness": 70
                            }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "stylers": [
                            {
                                "color": "#B61530"
                            },
                            {
                                "lightness": 90
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#ff6fa4"
                            }
                        ]
                    }
                ], {
                    name: 'Custom Style'
                });
                var customMapTypeId = 'custom_style';

                map = new google.maps.Map( _map[0], {
                    zoom: _mapZoom,
                    center: {lat: _mapLat, lng: _mapLng},
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
                    }
                });

                marker = new google.maps.Marker({
                    position: {lat: _mapLat, lng: _mapLng},
                    map: map
                });

                map.mapTypes.set(customMapTypeId, customMapType);
                map.setMapTypeId(customMapTypeId);

                google.maps.event.addListenerOnce(map, 'idle', function() {

                    var myLatLng = {lat: _btn.filter('.active').data('map-lat'), lng: _btn.filter('.active').data('map-lng')};

                    map.setCenter( myLatLng );

                    _offsetCenter( map.getCenter(), 0, 0);

                } );

            },
            _init = function () {
                google.maps.event.addDomListener(window, 'load', _initMap);
                _addEvents();
            };

        _init();
    };

} )();