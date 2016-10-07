( function() {

    $( function() {

        $( '.case__inner img' ).each( function(){

            new RetinaImages( $(this) );

        } );

    } );

    var RetinaImages = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj;

        //private methods
        var _sizeImages = function(){

                var width = _obj.attr('width'),
                    height = _obj.attr('height');

                _obj.attr('width', width/2);
                _obj.attr('height', height/2);

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _sizeImages();

            };

        _init();
    };

} )();

