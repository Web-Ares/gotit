( function() {

    $( function() {
        'use strict';

        $.each( $('.contacts__form'), function () {

            new ContactForm( $(this) );

        } );


    } );

    var ContactForm = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _formBody = _obj.find('.gform_body'),
            _btnSuccess = $('.contacts__success .btn'),
            _textareaWrap = _obj.find('.gfield_textarea');

        //private methods
        var _constructor = function () {
                _onEvents();
                _pasteHeightDiv();
                _pasteErrorWrap();
                _obj[0].obj = _self;

            },
            _pasteHeightDiv = function() {

                _textareaWrap.append('<div class="contacts__fields-textarea-height"></div>');

            },
            _pasteErrorWrap = function() {

                _formBody.append('<span class="contacts__fields-error"></span>');

            },

            _addErrorText = function() {

                if( _obj.find('.gfield').hasClass('gfield_error') ) {

                    _formBody.find('.contacts__fields-error').text( _obj.find('.gfield_error:first .validation_message').text() );
                    _obj.find('.gfield_error:first input, .gfield_error:first textarea').focus();
                    _formBody.find('.contacts__fields-error').addClass('visible');

                } else {

                    _formBody.find('.contacts__fields-error').removeClass('visible');

                }


            },
            _onEvents = function () {

                $(document).on('gform_confirmation_loaded', function(){

                    _obj.addClass('hidden');
                } );

                $(document).bind('gform_post_render', function(){

                    _addErrorText();

                } );


                _textareaWrap.on( {
                    keyup: function( e ) {

                        var value = $(this).find('textarea').val(),
                            heightWrap = $('.contacts__fields-textarea-height');

                        heightWrap.html(value);
                        _textareaWrap.css( 'height', heightWrap.innerHeight());

                        if( e.keyCode == 13 ) {
                            _textareaWrap.css( 'height', heightWrap.innerHeight());
                        }

                        return false;

                    }
                } );
                _btnSuccess.on( {
                    click: function() {

                        _obj.removeClass('hidden');

                        return false;

                    }
                } );
            };

        //public properties

        _constructor();
    };

} )();


