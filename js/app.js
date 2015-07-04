 
jQuery(document).ready(function($) {
	$('#cn-button').removeClass('ui-btn ui-shadow');

	    $('#home .ui-content').css('height',$(window).height());


	    var homeGallery = new Swiper('.gallery-top', {
	        autoplay: 5000,
	        speed: 1000,
	        spaceBetween: 10
		    });
	    //photoswiper



	    $('#floor .map').height($(window).height());
	    //map click event

	    	     

  	$("map[name=map] area").on('click', function () {
	   				var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
        {
            src: $(this).attr('data'),
            w: 1024,
            h: 768
        }
    ];
    
    // define options (if needed)
    var options = {
             // history & focus options are disabled on CodePen        
        history: false,
        focus: false,
        maxSpreadZoom:6,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
        
    };
    
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
	   });

    	$('#video .btn').click(function(event) {
    		/* Act on the event */
    		alert('asdd');
    	});
})
