"use strict";
( function() {

    $( function() {

        $.each( $('.squad__items'), function () {

            new SquadSlider( $(this) );

        } );

        $.each( $('.our-clients__items'), function () {

            new ClientsSlider( $(this) );

        } );


    } );

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
                _squadDisk.css( {

                    'margin-top': '-' +newSize/2+ 'px',
                    'margin-left': '-' +newSize/2+ 'px'

                } );

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
            _swiperInit = false,
            _swiper;

        var _addEvents = function () {

                _window.on( {
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

                        }

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
                            autoplayDisableOnInteraction: false
                        }
                    }
                } );

            },
            _destroySwiper = function() {

                _swiper.destroy( true, true);

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

} )();
