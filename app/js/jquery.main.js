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

        $.each( $('.reviews'), function () {

            new ReviewsSlider( $(this) );

        } );

        $.each( $('.contacts__map'), function () {

            new Location( $(this) );

        } );

        $.each( $('.case .main-slider__btn-down'), function () {

            new ScrollDown( $(this) );

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
            _swiperInit = false,
            _swiper,
            _slideContent = _obj.find('.slide__content'),
            _mainSlider = $('.main-slider'),
            _btnDown = _mainSlider.find('.main-slider__btn-down');

        var _addEvents = function () {

                _window.on( {
                    load: function() {
                        if( _window.width() >= 1024) {

                            if( !_swiperInit ) {

                                _initFullPage();
                                _centerContent();
                                _swiperInit = true;

                            }

                        }


                    },
                    resize: function() {

                        if( _window.width() >= 1024 ) {

                            if( !_swiperInit ) {

                                _initFullPage();
                                _swiperInit = true;

                            }

                            _centerContent();


                        } else {

                            if( _swiperInit ) {

                                _destroyFullPage();
                                _swiperInit = false;
                            }

                            //_slideContent.find('.slide__content-inner').attr( 'style','' );

                        }
                    }
                } );
                _btnDown.on( {
                    click: function() {

                        if( _window.width() >= 1024 ) {

                            console.log(300);

                            if ( $( this ).parents( '.case' ).length ) {

                                console.log('case');

                                _dom.stop( true, false );
                                _dom.animate( { scrollTop: _mainSlider.innerHeight() }, 300 );

                            }else{

                                $.fn.fullpage.moveTo(2);

                            }

                        } else {

                            _dom.stop( true, false );
                            _dom.animate( { scrollTop: _mainSlider.innerHeight() }, 300 );

                        }

                        return false;
                    }
                } );

            },
            _initFullPage = function() {

                $('#fullpage').fullpage( {

                    scrollOverflow: true,
                    sectionSelector: '.slide__content',
                    onLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex ) {

                        if( index > 1 ) {

                            $('.logo_index').hide();

                        } else {

                            $('.logo_index').show();

                        }

                        var block = $('.slide__content').eq( index-1).find('.slide__content-inner>div>div');

                        if( block.hasClass('reviews') ) {

                            block.find('.reviews__item').addClass('animation');

                        }

                    }

                } );

            },
            _destroyFullPage = function() {

                $.fn.fullpage.destroy('all');

            },
            _centerContent = function() {
                //_slideContent.each( function() {
                //
                //    var curContent = $(this),
                //        curContentInner = curContent.find('.slide__content-inner');
                //
                //    curContentInner.css( {
                //        'min-height': _window.height()
                //    } );
                //
                //    if( curContentInner.find('>div').height() < _window.height() ) {
                //
                //        if( curContent.find('.contacts').length ) {
                //
                //            if( curContent.find('.contacts__map').height() < curContentInner.find('>div').height() ) {
                //
                //                curContentInner.addClass('centered');
                //
                //            } else {
                //
                //                curContentInner.removeClass('centered');
                //            }
                //
                //        } else {
                //            curContentInner.addClass('centered');
                //        }
                //
                //
                //    } else {
                //
                //        curContentInner.removeClass('centered');
                //
                //    }
                //
                //} );
            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();



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

                        if( _window.width() >= 768 ) {

                            _setSize();

                        } else {

                            _body.css( {
                                'font-size': '20px'
                            } );

                        }

                    }

                } );

            },
            _init = function () {

                _onEvents();

                if( _window.width() >= 768 ) {

                    _setSize();

                }

                _obj[0].obj = _self;

            },
            _setSize = function () {

                var newSize;

                if( _window.height() > 500 ) {

                    newSize = (( 100 * ( window.innerHeight / 900 ) )/5) + 'px';


                } else {

                    newSize = (( 100 * ( 500 / 900 ) )/5) + 'px';

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

                if( _window.width() < 1024 ) {

                    _html.css( {
                        'overflow-y': 'auto'
                    } );
                    _body.css( {
                        'overflow-y': 'auto'
                    } );

                }

                _menuItems.attr( 'style', '' );

            },
            _onEvents = function () {

                _window.on( {
                    scroll: function () {

                        if( _window.scrollTop() > 0 ) {

                            _obj.addClass('fixed');

                        } else {

                            _obj.removeClass('fixed');

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

                if( _window.width() < 1024 ) {

                    _html.css( {
                        'overflow-y': 'hidden'
                    } );
                    _body.css( {
                        'overflow-y': 'hidden'
                    } );

                }


            },
            _init = function () {

                _onEvents();
                _obj[0].obj = _self;

                if( _window.scrollTop() > _obj.innerHeight() ) {

                    _obj.addClass('fixed');

                } else {

                    _obj.removeClass('fixed');

                }

            };


        _init();
    };

    var MainSlider = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _header = $( '.site__header'),
            _step1 = 15,
            _step2 = 10,
            _step3 = 5,
            _step4 = 20,
            _step5 = 25,
            _swiper1;

        var _addEvents = function () {

                $(document).on(
                    'mousemove',
                    '.main-slider .swiper-slide',
                    function( e ) {

                        e = e || window.event;

                        var slide = $(this),
                            _img1 = slide.find('.move1'),
                            _img2 = slide.find('.move2'),
                            _img3 = slide.find('.move3'),
                            _img4 = slide.find('.move4'),
                            _img5 = slide.find('.move5');

                        if (_window.width() > 1024 && !( _header.hasClass('opened') ) ) {

                            var pageX = e.pageX,
                                pageY = e.pageY,
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
                );

                _window.on( {
                    load: function () {
                        _initSwiper();
                    },
                    resize: function() {

                        if( _window.width() >= 1024 && screen.width >= 1024 ) {

                            _obj.attr('style', '');
                            $('.vegetables').attr('style', '');

                        }

                        if( _obj.hasClass('main-slider_index') ) {

                            var nextSection = _obj.parents('.slide__content').next().find('.slide__content-inner'),
                                height = _obj.find('.swiper-slide-active').innerHeight();


                            setTimeout( function() {

                                _obj.find('.swiper-slide-active .vegetables').each(function(){

                                    var vegetable = $(this),
                                        pos = vegetable.position().top,
                                        heightVeg = vegetable.height();

                                    if( pos + heightVeg > height ) {

                                        var num = vegetable.attr('class').replace( /(^.+\D)(\d+)(\D.+$)/i,'$2'),
                                            diff = 0;

                                        if( $('.copy_move.copy_'+num+'').length ) {

                                            var oldImg =  $('.copy_move.copy_'+num+'');

                                            if( $('.slide__content').innerHeight() < $('.main-slider').innerHeight() ) {

                                                diff = $('.main-slider').innerHeight()-$('.slide__content').innerHeight()

                                            }

                                            oldImg.offset( {
                                                top: vegetable.offset().top-diff,
                                                left: vegetable.offset().left
                                            } );

                                            oldImg.css( {
                                                bottom: 'auto',
                                                right: 'auto'
                                            } );

                                        } else {

                                            var newImg = vegetable.clone(true);

                                            newImg.addClass('copy_move copy_'+num+'');
                                            nextSection.prepend(newImg);

                                            if( $('.slide__content').innerHeight() < $('.main-slider').innerHeight() ) {

                                                diff = $('.main-slider').innerHeight()-$('.slide__content').innerHeight()

                                            }

                                            newImg.offset( {
                                                top: vegetable.offset().top-diff,
                                                left: vegetable.offset().left
                                            } );

                                            newImg.css( {
                                                bottom: 'auto',
                                                right: 'auto'
                                            } );


                                        }

                                    } else {

                                        var num = vegetable.attr('class').replace( /(^.+\D)(\d+)(\D.+$)/i,'$2');

                                        $('copy_move copy_'+num+'').remove();

                                    }

                                } );

                            }, 1500 );

                        }

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
            _initSwiper = function() {

                _swiper1 = new Swiper( _obj.find( '.swiper-container' ), {
                    spaceBetween: 0,
                    slidesPerView: 1,
                    loop: true,
                    speed: 700,
                    effect: 'fade',
                    fade: {
                        crossFade: true
                    },
                    autoplayDisableOnInteraction: false,
                    nextButton: _obj.find('.swiper-button-next')[0],
                    prevButton: _obj.find('.swiper-button-prev')[0],
                    onInit: function( swiper ) {

                        var actSlide = swiper.slides.filter('.swiper-slide-active'),
                            sectionIndex = actSlide.parents('.slide__content').index(),
                            nextSection = $('.slide__content').eq(sectionIndex+1);

                        if( _obj.hasClass('main-slider_index') ) {

                            var height = actSlide.innerHeight();

                            actSlide.find('.vegetables').each(function(){

                                var vegetable = $(this),
                                    pos = vegetable.position().top,
                                    heightVeg = vegetable.height();

                                if( pos + heightVeg > height ) {

                                    var num = vegetable.attr('class').replace( /(^.+\D)(\d+)(\D.+$)/i,'$2'),
                                        diff = 0;

                                    var newImg = vegetable.clone(true);

                                    newImg.addClass('copy_move copy_'+num+'');
                                    nextSection.prepend(newImg);

                                    if( $('.slide__content').innerHeight() < $('.main-slider').innerHeight() ) {

                                        diff = $('.main-slider').innerHeight()-$('.slide__content').innerHeight()

                                    }

                                    newImg.offset( {
                                        top: vegetable.offset().top-diff,
                                        left: vegetable.offset().left
                                    } );

                                    newImg.css( {
                                        bottom: 'auto',
                                        right: 'auto'
                                    } );

                                }

                            } );

                        }


                    },
                    onSlideChangeStart: function( swiper ) {

                        var actSlide = swiper.slides.filter('.swiper-slide-active'),
                            sectionIndex = actSlide.parents('.slide__content').index(),
                            nextSection = $('.slide__content').eq(sectionIndex+1).find('.slide__content-inner');

                        $('.copy_move').remove();

                    },
                    onSlideChangeEnd: function( swiper ) {

                        var actSlide = swiper.slides.filter('.swiper-slide-active'),
                            sectionIndex = actSlide.parents('.slide__content').index(),
                            nextSection = $('.slide__content').eq(sectionIndex+1).find('.slide__content-inner');


                        if( _obj.hasClass('main-slider_index') ) {

                            var height = actSlide.innerHeight();


                            actSlide.find('.vegetables').each(function(){

                                var vegetable = $(this),
                                    pos = vegetable.position().top,
                                    heightVeg = vegetable.height();

                                if( pos + heightVeg > height ) {

                                    var num = vegetable.attr('class').replace( /(^.+\D)(\d+)(\D.+$)/i,'$2'),
                                        diff = 0;

                                    var newImg = vegetable.clone(true);

                                    newImg.addClass('copy_move copy_'+num+'');
                                    nextSection.prepend(newImg);

                                    if( $('.slide__content').innerHeight() < $('.main-slider').innerHeight() ) {

                                        diff = $('.main-slider').innerHeight()-$('.slide__content').innerHeight()

                                    }

                                    newImg.offset( {
                                        top: vegetable.offset().top-diff,
                                        left: vegetable.offset().left
                                    } );

                                    newImg.css( {
                                        bottom: 'auto',
                                        right: 'auto'
                                    } );

                                }

                            } );

                        }


                    }
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
            _setHeight = function() {

                var height = _window.height();

                _obj.innerHeight( height );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();


                if( _window.width() < 1024 ) {

                    _setHeight();

                }

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

    var ScrollDown = function ( obj ) {

        var _self = this,
            _obj = obj,
            _scroller = $( 'html, body' ),
            _mainSliderPic = $('.main-slider__inner-pic');

        var _addEvents = function () {

                _obj.on( {
                    click: function() {

                        console.log(300);

                        _scroller.animate( { scrollTop: _mainSliderPic.innerHeight() }, 300 );

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
                    speed: 500,
                    effect: 'fade',
                    fade: {
                        crossFade: true
                    },
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
                        _setHeight();
                    },
                    resize: function() {
                        _setHeight();
                    }
                } );



                google.maps.event.addDomListener( window, 'resize', function() {

                    if ( !_obj.parents('.contacts_services').length ) {

                        var myLatLng = {lat: _btn.filter('.active').data('map-lat'), lng: _btn.filter('.active').data('map-lng')};

                        map.setCenter( myLatLng );

                        _offsetCenter( map.getCenter(), 0, 50);

                    }

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
                                _offsetCenter( map.getCenter(), 0, 50);
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
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
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

                    if ( !_obj.parents('.contacts_services').length ) {

                        var myLatLng = {lat: _btn.filter('.active').data('map-lat'), lng: _btn.filter('.active').data('map-lng')};

                        map.setCenter( myLatLng );

                        _offsetCenter( map.getCenter(), 0, 50);

                    }

                } );

            },
            _init = function () {
                google.maps.event.addDomListener(window, 'load', _initMap);
                _addEvents();
                _setHeight();
            },
            _setHeight = function() {

                var content = $('.contacts__info');

                if( _window.width() >= 768 ) {

                    if( content.innerHeight() > content.innerWidth()) {
                        _obj.height( content.innerHeight()+(content.innerHeight()*0.3) );
                        _obj.width( content.innerHeight()+(content.innerHeight()*0.3) );
                    } else {
                        _obj.height( content.innerWidth()+(content.innerWidth()*0.3) );
                        _obj.width( content.innerWidth()+(content.innerWidth()*0.3) );
                    }



                } else {

                    _obj.attr('style','');

                }


            };

        _init();
    };

} )();
