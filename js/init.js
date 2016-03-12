(function($){
  $(function(){

    $( '.button-collapse' ).sideNav();
    $( '.parallax' ).parallax();

	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$( '.modal-trigger' ).leanModal();

	$( ".alexis, .misfit" ).hide().fadeIn( 5000 );
  }); // end of document ready
})(jQuery); // end of jQuery name space