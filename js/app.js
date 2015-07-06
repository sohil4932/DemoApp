

jQuery(document).ready(function($) {
	$('#cn-button').removeClass('ui-btn ui-shadow');

	    $('#home .ui-content , #aminities .ui-content').css('height',$(window).height());
    
	   $( '.swipebox' ).swipebox();

         $("#owl-demo,#aminities-slider").owlCarousel({
 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
        });

})
