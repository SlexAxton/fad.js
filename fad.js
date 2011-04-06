/**
 * fad.js
 * version 0.0.0.0.o_O.1
 *
 * complain to @AaronForsander
 *
 * https://github.com/SlexAxton/fad.js/
 *
 * Tri-license - WTFPL | MIT | BSD
 *
 */
(function( global, doc, undefined ) {
  // Hot DOM ready implementation.
  var alReady = function( n, t, ready ) {
    ready = function(){ for ( t = 0; ready && t < n; ) ready[ t++ ](); ready = 0 }
    doc.addEventListener && doc.addEventListener( "DOMContentLoaded", ready, false )
    !function check() {
      ready && setTimeout( /^u|g$/.test( doc.readyState ) ? check : ready, t *= 2 )
    }()
    return function( fn ){ ready ? ready[ n++ ] = fn : fn() }
  }( 0, 1 );
  
  alReady(function() {
    var fads = document.querySelectorAll
      ? document.querySelectorAll( "script[type='script/fad']" )
      : document.getElementsByTagName('script');
    
    for ( var i = 0, length = fads.length; i < length; i++ ) {
      // Make sure we only grab fad blocks in case we couldn't use qSA.
      if ( fads[i] && ( fads[i].type === 'script/fad' ) ) {
        var script = fads[i],
            iframe = doc.createElement( 'iframe' ),
            div = doc.createElement( 'div' );
        
        // Hide iframe and add it to the DOM.
        iframe.style.display = 'none';
        doc.body.appendChild( iframe );

        // Shove the add code into the frame and let it 
        // doc.write its little heart out.
        var iwin = iframe.contentWindow || iframe.contentDocument.defaultView;
        iwin.document.write( '<scr' + 'ipt>' + script.innerHTML + '</scr' + 'ipt>' );

        // Needed for Safari.
        iwin.document.close();

        // Grab the ad output and put it back into the DOM.
        div.innerHTML = iwin.document.body.innerHTML;
        if (script.id)
          div.id = script.id;
          
        script.parentNode.insertBefore( div, script );

        // Clean up.  Can we reuse the iframe?
        // script.parentNode.removeChild( script ); Need to clone document.scripts for this to work in IE
        iframe.parentNode.removeChild( iframe ); 
      }
    }
  });
})( this, this.document );
