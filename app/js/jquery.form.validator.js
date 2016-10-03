( function() {

    $( function() {
        'use strict';

        $.each( $('.contacts__form'), function () {

            new FormValidator( $(this) );

        } );


    } );

    var FormValidator = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _form =  _obj.find('form'),
            _fields = _obj.find('input:required, textarea:required, input[aria-required="true"], textarea[aria-required="true"]'),
            _errorMessage = _obj.find('.contacts__fields-error'),
            _textareaField =  _obj.find('.contacts__fields-textarea'),
            _textareaHeight =  _obj.find('.contacts__fields-textarea-height'),
            _btnSuccess = $('.contacts__success .btn'),
            _inputName = _obj.find('input#name'),
            _inputContact = _obj.find('input#contact'),
            _inputMessage = _obj.find('textarea#message'),
            _request = new XMLHttpRequest();

        //private methods
        var _constructor = function () {
                _onEvents();
                _addAttributesError();
                _obj[0].obj = _self;
            },
            _addNotTouchedClass = function () {

                _fields.each( function() {

                    if( $(this).val() === '' ){

                        $(this).addClass( 'not-touched' );

                    }

                } );
                _fields.each( function () {

                    _validateField( $( this ) );

                } );

            },
            _addAttributesError = function() {

                _inputName.attr('data-error','please add your name');
                _inputContact.attr('data-error','please add your phone or email');
                _inputMessage.attr('data-error','please add your message');

            },
            _onEvents = function () {

                $(document).on( 'mailsent.wpcf7', function()  {
                    _obj.addClass('hidden');
                    _fields.val('');
                    _textareaField.attr('style','');
                    _textareaHeight.html('');

                });

                _form.on( {
                    submit: function( ) {

                        _addNotTouchedClass();

                        if( _fields.hasClass('not-touched') ) {

                            _obj.find('.not-touched:first').focus();
                            _errorMessage.text( _obj.find('.not-touched:first').data('error') );
                            _errorMessage.addClass('visible');

                        } else {

                            _errorMessage.removeClass('visible');

                        }


                        //return false;

                    }

                } );
                _fields.on( {
                    keypress: function() {

                        $(this).removeClass( 'not-touched' );
                        _errorMessage.removeClass('visible');


                    },
                    keyup: function() {

                        _validateField( $( this ) );
                    }
                } );
                _btnSuccess.on( {
                    click: function() {

                        _obj.removeClass('hidden');
                        return false;

                    }
                } );
                _textareaField.on( {
                    keyup: function() {

                        var value = $(this).find('textarea').val();

                        _textareaHeight.html(value);
                        _textareaField.css( 'height', _textareaHeight.innerHeight());

                        return false;

                    }
                } );
            },
            _makeNotValid = function ( field ) {
                field.addClass( 'not-valid' );
                field.removeClass( 'valid' );
            },
            _makeValid = function ( field ) {
                field.removeClass( 'not-valid' );
                field.addClass( 'valid' );
            },
            _validateEmail = function ( email ) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            _validateField = function ( field, e ) {

                var type = field.attr( 'type');

                if( type === 'email' || type === 'text' ){

                    if( field.val() === '' ){
                        _makeNotValid( field );
                        return false;
                    }

                }

                if( type === 'email' ){
                    if( !_validateEmail( field.val() ) ){
                        _makeNotValid( field );
                        return false;
                    }
                }

                _makeValid( field );

            };

        //public properties

        //public methods
        _self.checkValid = function () {
            var valid = true;

            _fields.each( function () {
                $( this ).removeClass( 'not-touched' );
                if( $( this ).hasClass( 'not-valid' ) ){
                    valid = false;

                }
            } );

            return valid;
        };

        _constructor();
    };

} )();


