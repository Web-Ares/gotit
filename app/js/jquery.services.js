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

                var curAction = elem.data( 'action' ),
                    curId = elem.data( 'id' ),
                    curName = elem.data( 'name' ),
                    padding = parseFloat( _obj.css('padding-bottom') ),
                    url = window.location.pathname;

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

                    url: curAction,
                    data: [ curId ],
                    dataType: 'html',
                    timeout: 20000,
                    type: "GET",
                    success: function( msg ){

                        var newContent = $( msg );

                        url = [];
                        url.push( curName );

                        history.pushState( 2, '', ' '+url+'/' );

                        _servicesWrap.html( '' );
                        _servicesWrap.html( newContent );

                        setTimeout(function () {

                            _obj.css({
                                height: _servicesWrap.innerHeight() + padding,
                                opacity: 1
                            });

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
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
            };

        _init();
    };

} )();
