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
            _textareaWrap = _obj.find('.gfield_textarea');

        //private methods
        var _constructor = function () {
                _onEvents();
                _pasteHeightDiv();
                _pasteErrorWrap();
                _obj[0].obj = _self;
            },
            _pasteHeightDiv = function() {

                _textareaWrap.append('<div class="contacts__fields-textarea-height"></div>')

            },
            _pasteErrorWrap = function() {

                _formBody.append('<span class="contacts__fields-error"></span>');

                _addErrorText();

            },
            _addErrorText = function() {



            },
            _onEvents = function () {
                //_form.on( {
                //    submit: function( ) {
                //
                //        if( _fields.hasClass('not-touched') ) {
                //
                //            _obj.find('.not-touched:first').focus();
                //            _errorMessage.text( _obj.find('.not-touched:first').data('error') );
                //            _errorMessage.addClass('visible');
                //
                //        } else {
                //
                //            _errorMessage.removeClass('visible');
                //
                //        }
                //
                //    }
                //
                //} );
                //_fields.on( {
                //    keypress: function() {
                //
                //        $(this).removeClass( 'not-touched' );
                //        _errorMessage.removeClass('visible');
                //
                //
                //    }
                //} );
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
            };

        //public properties

        _constructor();
    };

} )();


