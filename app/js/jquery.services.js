"use strict";
( function() {

    $( function() {

        $.each( $('.sevices'), function () {

            new ServicesPages( $(this) );

        } );

    } );


    var ServicesPages = function ( obj ) {

        var _self = this,
            _obj = obj,
            _servicesWrap = _obj.find('.sevices__wrap'),
            _servicesBtns = $('.expertise__item'),
            _request = new XMLHttpRequest(),
            _curAction = $('body').data( 'action' ),
            _servicesTitle = $('.site__header-title'),
            _servicesInnerTitle = $('.site__main-title_inner'),
            _window = $( window );

        var _addEvents = function () {

                _servicesBtns.on( {
                    click: function() {

                        _addContent( $(this) );

                        return false;

                    }
                } );
                _window.on( {
                    resize: function() {

                        _obj.css({
                            height: 'auto'
                        })

                    }
                } );

            },
            _addContent = function ( elem ) {

                var curId = elem.data( 'id' ),
                    curUrlArr = elem.data( 'name' ),
                    title = elem.text(),
                    padding = parseFloat( _obj.css('padding-bottom') ),
                    name;

                if ( elem.hasClass( 'active' ) ) {

                    return false

                }

                _servicesBtns.removeClass('active');
                elem.addClass('active');

                _obj.css({
                    height: _servicesWrap.innerHeight() + padding,
                    opacity: 0
                });

                _request = $.ajax( {

                    url: _curAction,
                    data:{
                        action: "get_post_single",
                        id: curId
                    },
                    dataType: 'html',
                    timeout: 20000,
                    type: "GET",
                    success: function( msg ){

                        var newContent = $( msg );

                        history.replaceState( 2, '', ' '+curUrlArr+' ' );

                        _servicesWrap.html( '' );
                        _servicesWrap.html( newContent );

                        _servicesTitle.addClass('fade');
                        _servicesInnerTitle.addClass('fade');

                        setTimeout(function () {

                            _obj.css({
                                height: _servicesWrap.innerHeight() + padding,
                                opacity: 1
                            });

                            _servicesTitle.text(title);
                            _servicesInnerTitle.text(title);
                            _servicesTitle.removeClass('fade');
                            _servicesInnerTitle.removeClass('fade');

                        }, 300);

                        return false

                    },
                    error: function( XMLHttpRequest ){
                        if( XMLHttpRequest.statusText != "abort" ){
                            alert( XMLHttpRequest.statusText );
                        }
                    }
                } );

            },
            // _centerSlide = function (elem) {
            //
            //     var curSlide = elem.parents('.swiper-slide'),
            //         slides = $('.swiper-slide');
            //
            //     // slides.removeClass('swiper-slide-next');
            //     // slides.removeClass('swiper-slide-prev');
            //     curSlide.addClass( 'swiper-slide-active' );
            //
            //     // if (curSlide.prev().length) {
            //     //     curSlide.prev().addClass('swiper-slide-prev')
            //     // }
            //     //
            //     // if (curSlide.next().length) {
            //     //     curSlide.next().addClass('swiper-slide-next')
            //     // }
            //
            //     // $('.swiper-container').updateClasses();
            //
            // },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
            };

        _init();
    };

} )();
