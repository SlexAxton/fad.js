(function( global, doc, undefined ) {
  // Eventually global fad function.
  // Call this for a good time.
  var fad = function ( adList ) {
    for ( var i = 0, length = adList.length; i < length; i++ ) {
      boom( adList[i] );
    }
  };
  
  var iframes = {};
  
  // Hot dom ready implementation.
  var alReady = function( n, t, ready ) {
    ready = function(){ for ( t = 0; ready && t < n; ) ready[ t++ ](); ready = 0 }
    doc.addEventListener && doc.addEventListener( "DOMContentLoaded", ready, false )
    !function check() {
      ready && setTimeout( /^u|g$/.test( doc.readyState ) ? check : ready, t *= 2 )
    }()
    return function( fn ){ ready ? ready[ n++ ] = fn : fn() }
  }( 0, 1 );
  
  // Load an ad in an iframe.
  var boom = function ( ad ) {
    alReady(function() {
      var iframe = doc.createElement( 'iframe' ),
          container = doc.getElementById( ad.id ),
          script = container && container.children.length && container.children[0];
      iframe.style.display = 'none';
      iframe.src = fad.options.frameLocation;
      iframe.onload = function() {
        var content = iframe.contentWindow || iframe.contentDocument.defaultView;
        if ( script && content.loadAd ) {
          content.loadAd( ad, script );
        }
      };
      iframes[ ad.id ] = iframe;
      doc.body.appendChild( iframe );
    });
  };
  
  // Let an iframe inject an ad back into the dom.
  fad.hollaback = function ( ad, html ) {
    var element = document.getElementById( ad.id ),
        iframe;
    if ( element ) {
      element.innerHTML = html;
      // Cleanup iframes.
      if ( (iframe = iframes[ ad.id ]) && iframe.parentNode ) {
      	iframe.parentNode.removeChild( iframe );
      }
    }
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
})( this, this.document );
