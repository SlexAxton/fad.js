(function(global, doc, undefined) {
  // Eventually global fad function.
  // Call this for a good time.
  var fad = function ( adList ) {
    for ( var i = 0, length = adList.length; i < length; i++ ) {
      boom( adList[i] );
    }
  };
  
  // Hot dom ready implementation.
  var alReady = function( n, t, ready ) {
    ready = function(){ for ( t = 0; ready && t < n; ) ready[ t++ ](); ready = 0 }

    document.addEventListener && document.addEventListener( "DOMContentLoaded", ready, false )

    !function check() {
      ready && setTimeout( /^u|g$/.test( document.readyState ) ? check : ready, t *= 2 )
    }()

    return function( fn ){ ready ? ready[ n++ ] = fn : fn() }
  }( 0, 1 );
  
  var boom = function ( ad ) {
    alReady(function() {
      var iframe = doc.createElement( 'iframe' );
      iframe.src = fad.options.frameLocation;
      iframe.style.display = 'none';
      doc.body.appendChild( iframe );
      iframe.onload = function() {
        var container = doc.getElementById( ad.id );
        var script = container && container.children.length && container.children[0];
        if ( script ) {
          if ( iframe.contentWindow.loadAd ) {
            iframe.contentWindow.loadAd( ad, script );
          } else {
            console.log( this, iframe, iframe.contentDocument, iframe.contentWindow );          
          }
        }
      }
    });
  };
  
  fad.hollaback = function ( ad, html ) {
    var element = document.getElementById( ad.id );
    if (element )
      element.innerHTML = html;
  };

  // Default options
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
