    //close app event
    document.addEventListener("backbutton", function(e){
        navigator.app.exitApp();
  }, false);
    //close app event

    //close app on back button
   $.mobile.defaultPageTransition = 'slidedown';    
 //gallery init code

         var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('#gallery .pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');
 //gallery init code
    
//floor page gallery init
var openPhotoSwipe = function(id) {

    var pswpElement = document.querySelectorAll('#floor .pswp')[0];

      if(id == 0){

      var items = [
        {
            src: 'img/layouts/top-view.jpg',
            w: 1024,
            h: 727
        }
    ];      
    }else if(id == 1){
       var items = [
        {
            src: 'img/layouts/a-shop.jpg',
            w: 1024,
            h: 542
        },
        {
             src: 'img/layouts/a-off.jpg',
            w: 1024,
            h: 542
        }
    ];  
    }else if(id == 2){
        var items = [
        {
            src: 'img/layouts/b-shop.jpg',
            w: 1024,
            h: 542
        },
        {
             src: 'img/layouts/b-off.jpg',
            w: 1024,
            h: 542
        }
    ];  
    }else if(id == 3){
        var items = [
       
        {
             src: 'img/layouts/a-g-tower.jpg',
            w: 1024,
            h: 1087
        }
    ];  
    }else if(id == 4){
        var items = [
        {
             src: 'img/layouts/j-n-tower.jpg',
            w: 1024,
            h: 1087
        }
    ];  
    }else{
           var items = [
        {
             src: 'img/layouts/HI-tower.jpg',
            w: 1024,
            h: 542
        }
    ];
    }
  
    
    // define options (if needed)
    var options = {
             // history & focus options are disabled on CodePen        
        history: false,
        focus: false,

        showAnimationDuration: 0,
        hideAnimationDuration: 0
        
    };
    
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};

// document.getElementById('btn').onclick = openPhotoSwipe;
//floor page gallery init

jQuery(document).ready(function($) {
    
        //localstorage code
            if(localStorage.getItem('number') && localStorage.getItem('name')){

                $('#popup').hide();
            }
    //localstorage code

	$('#cn-button').removeClass('ui-btn ui-shadow');

	    $('#home .ui-content , #aminities .ui-content').css('height',$(window).height());
        $('#myPanel .ui-panel-inner').css('height',$(window).height());
         $("#aminities-slider").owlCarousel({
 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
        });
 // gallery

 //for closing navigation menu
 $( window ).hashchange(function(){
    $('.cn-wrapper').removeClass('opened-nav');
        $('.cn-overlay').removeClass('on-overlay');
         $('#myPopup').popup('open');
 });
 //for closing navigation menu

$(document).on("pagebeforeshow","#pagetwo",function(){
 $('#bgvid').play();
});

//form validation
$('.form form #btn').click(function(event) {
     var phoneno = /^\d{10}$/;
     name = $('.form #fname').val();
     phoneNumber = $('.form #phoneNumber').val()
    /* Act on the event */
    event.preventDefault();
    if(name == "" &&  phoneNumber== "" ){
        $('.form .name .error').html('required');
            $('.form .number .error').html('required');
            return false
    }
    if(name == ""){
        $('.form .name .error').html('required');
        return false
    }
    if(phoneNumber== ""){
            $('.form .number .error').html('required');
        return false
    }

    if(!phoneno.test(phoneNumber)){
                $('.form .number .error').html('not a valid number');
                return false;
    }
     $('.form #fname').val('');
      $('.form #phoneNumber').val('');
    localStorage.setItem('name',name);
    localStorage.setItem('number',phoneNumber);
    $('#popup').hide();
}); 

$('.form form input').focus(function(event) {
    $(this).parent('div').find('.error').html('');
});
//form validation

$('.inquiry').click(function(event) {
    /* Act on the event */
    $.ajax({
          type: "POST",
          url: "http://mandrillapp.com/api/1.0/messages/send.json",
          data: {
            'key': 'B6bSMmQ85PvY1CIAOws09Q' ,
            'message': {
                'from_email': 'kishan_jobanputra@yahoo.in',
              'to': [
                  {
                    'email': "kishanj918@gmail.com",
                    'name': '',
                    'type': 'to'
                  }
                ],
              'autotext' : 'true',
              'subject' : 'Earth mobile application',
              'html' : 'name: '+localStorage.getItem('name')+'<br>Contact number: '+localStorage.getItem('number')
              }
            },
            success:function(result){
                if(result[0].status == "sent"){
                    alert('we will get back to you soon');
                }
            },
            error:function(error){
                alert('Please check your internet connection');
            }
        });
});

})
