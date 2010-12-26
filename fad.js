(function(global, doc, undefined) {
  
  var fad = function ( adList ) {

  };

  fad.options = {
    frameLocation : '/fadframe.html',
    forceSingle   : false
  };

  // This is a shallow extend on the options object
  fad.configure = function ( options ) {
    var i;

    // NOTE :: if you intend on supporting browsers that don't have hasOwnProperty, you'll need a shim for it
    for ( i in options ) {
      if ( options.hasOwnProperty(i) ) {
        fad.options[i] = options[i];
      }
    }
  };

  global.fad = fad;
})(this, this.document);
