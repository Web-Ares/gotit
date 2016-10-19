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
            _formClone = $('.gform_wrapper'),
            _contactForm = $('.contacts__form'),
            _textareaWrap = _obj.find('.gfield_textarea');
 
        //private methods
        var _constructor = function () {
                _onEvents();
                _pasteHeightDiv();
                _getCLoneForm();
                // _pasteErrorWrap();
                _obj[0].obj = _self;

            },
            _pasteHeightDiv = function() {

                _obj.find('.gform_body .gfield_textarea').append('<div class="contacts__fields-textarea-height"></div>');

                var value = _obj.find('.gform_body .gfield_textarea').find('textarea').val(),
                    heightWrap = _obj.find('.gform_body .contacts__fields-textarea-height');

                heightWrap.html(value);
                _obj.find('.gform_body .gfield_textarea').css( 'height', heightWrap.innerHeight());

            },
            _pasteErrorWrap = function() {


                // _obj.find('.gform_body').append('<span class="contacts__fields-error"></span>');

            },
            _getCLoneForm = function() {
                _formClone = _formClone.clone(true);
            },

            _addErrorText = function() {
                _obj.find('.gform_body').append('<span class="contacts__fields-error"></span>');
                if( _obj.find('.gfield').hasClass('gfield_error') ) {

                    _obj.find('.gform_body').find('.contacts__fields-error').text( _obj.find('.gfield_error:first .validation_message').text() );
                    _obj.find('.gfield_error:first input, .gfield_error:first textarea').focus();
                    _obj.find('.gform_body').find('.contacts__fields-error').addClass('visible');

                } else {

                    _obj.find('.gform_body').find('.contacts__fields-error').removeClass('visible');

                }


            },
            _onEvents = function () {

                $(document).bind('gform_confirmation_loaded', function(){

                    _obj.addClass('hidden');
                    _contactForm.find('div:first').append(_formClone);

                    $('.gform_wrapper').find('form')[0].reset();
                } );

                $(document).bind('gform_post_render', function(){
                    _pasteErrorWrap();
                    _pasteHeightDiv();
                    _addErrorText();

                    _obj.find('.gform_body .gfield_textarea').on( {
                        keyup: function( e ) {

                            var value = $(this).find('textarea').val(),
                                heightWrap = _obj.find('.gform_body .contacts__fields-textarea-height');

                            heightWrap.html(value);
                            _obj.find('.gform_body .gfield_textarea').css( 'height', heightWrap.innerHeight());

                            if( e.keyCode == 13 ) {
                                _obj.find('.gform_body .gfield_textarea').css( 'height', heightWrap.innerHeight());
                            }

                            return false;

                        }
                    } );

                } );


                _obj.find('.gform_body .gfield_textarea').on( {
                    keyup: function( e ) {

                        var value = $(this).find('textarea').val(),
                            heightWrap = _obj.find('.gform_body .contacts__fields-textarea-height');

                        heightWrap.html(value);
                        _obj.find('.gform_body .gfield_textarea').css( 'height', heightWrap.innerHeight());

                        if( e.keyCode == 13 ) {
                            _obj.find('.gform_body .gfield_textarea').css( 'height', heightWrap.innerHeight());
                        }

                        console.log(value)

                        return false;

                    }
                } );
                _btnSuccess.on( {
                    click: function() {
                        $('.gform_wrapper').find('form')[0].reset();
                        _getCLoneForm();
                        _obj.removeClass('hidden');

                        return false;

                    }
                } );
            };

        //public properties

        _constructor();
    };

} )();


