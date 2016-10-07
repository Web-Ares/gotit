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
            _curAction = $('body').data( 'action' );

        var _addEvents = function () {

                _servicesBtns.on( {
                    click: function() {
                   
                        _addContent( $(this) );
                        return false;

                    }
                } );

            },
            _addContent = function ( elem ) {

                var curId = elem.data( 'id' );

                // _request.abort();

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

                        _servicesWrap.html( '' );
                        _servicesWrap.html( newContent )

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
