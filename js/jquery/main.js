/*
Template Name: Corpboot
Template URI: http://www.templatespremium.net/corpboot/
Description: Corporate HTML5 Template based on Twitter Bootstrap.
Version: 2.1
Author: Rafael Memmel
Author URI: http://www.rafamemmel.com
*/
//===========================================================================================
//Get IE Version Function
//===========================================================================================
function getInternetExplorerVersion() {
    var rv = -1;
    var ua = navigator.userAgent;
    var re = '';
    if (navigator.appName == 'Microsoft Internet Explorer') {
        re  = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
        if (re.exec(ua) !== null) {
            rv = parseFloat(RegExp.$1);
        } 
    } else if (navigator.appName == 'Netscape') {
        re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');
        if (re.exec(ua) !== null) {
            rv = parseFloat(RegExp.$1);
        }
    }
  return rv;
}

//Window and Document variables
var $window = $(window);
var $document = $(document);

//===========================================================================================
//Window Load Function
//===========================================================================================
$window.on('load', function() {
    //---------------------------------------------------------------------------------------
    //Preloader
    //---------------------------------------------------------------------------------------
    var $preloader = $('#preloader');
    if ($preloader.length) {
        var ie = getInternetExplorerVersion();
        if (ie == '-1' || ie == '11') {
            //Good Browsers
            $preloader.fadeOut('slow', function() {
                $(this).remove();
            });
            if(window.complete){
                $window.trigger('load');
            }
        } else {
            //Older versions of Internet Explorer
            var myPreloader = document.querySelector('#preloader');
            myPreloader.style.display = 'none';
        }
    }
});

//===========================================================================================
//Document Ready Function
//===========================================================================================
$document.on('ready', function() {
    //---------------------------------------------------------------------------------------
    //CSS Animations
    //---------------------------------------------------------------------------------------
    ie = getInternetExplorerVersion();
    if (ie == '-1' || ie == '11') {
        var wow = new WOW({
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       100,         // distance to the element when triggering the animation (default is 0)
            mobile: false             // trigger animations on mobile devices (true is default)
        });
        wow.init();
    }
    //---------------------------------------------------------------------------------------
    //Placeholder for IE old versions
    //---------------------------------------------------------------------------------------
    var ie = getInternetExplorerVersion();
    if (ie == '8' || ie == '9'  || ie == '10') {
        $('input, textarea').placeholder();
    }
    //---------------------------------------------------------------------------------------
    //Header Shrink
    //---------------------------------------------------------------------------------------
    if ($window.width() > 840) {
        $window.on('scroll', function() {
            if ($document.scrollTop() < 120) {
                $('.navbar').removeClass('tiny');
            } else {
                $('.navbar').addClass('tiny');
            }
        });
    }
    //---------------------------------------------------------------------------------------
    //Scroll to Top
    //---------------------------------------------------------------------------------------
    var $scrollToTop = $('#scrollToTop');
    if ($scrollToTop.length) {
        //Check to see if the window is top if not then display button
        $window.scroll(function(){
            if ($(this).scrollTop() > 800) {
                $scrollToTop.fadeIn();
            } else {
                $scrollToTop.fadeOut();
            }
        });
        //Click event to scroll to top
        $scrollToTop.on('click', function(){
            $('html, body').animate({scrollTop : 0},800);
            return false;
        });
    }
    //---------------------------------------------------------------------------------------
    //Parallax
    //---------------------------------------------------------------------------------------
    $window.stellar({
        horizontalScrolling: false,
        responsive: true/*,
        horizontalOffset: 0,
        verticalOffset: 0*/
    });
    //---------------------------------------------------------------------------------------
    //Flexslider
    //---------------------------------------------------------------------------------------
    var $bgSlider = $('#bg-slider');
    if ($bgSlider.length) {
        /* Ref: https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties */
        $bgSlider.flexslider({
            animation: "fade",
            slideshow: true,
            animationLoop: true,
            directionNav: false, //remove the default direction-nav
            controlNav: false, //remove the default control-nav
            slideshowSpeed: 6000
        });
    }
    var $mainSlider = $('#main-slider');
    if ($mainSlider.length) {
        /* Ref: https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties */
        $mainSlider.flexslider({
            animation: "fade",
            slideshow: true,
            animationLoop: true,
            directionNav: true, //remove the default direction-nav
            controlNav: true, //remove the default control-nav
            slideshowSpeed: 6000
        });
    }
    //---------------------------------------------------------------------------------------
    //Slick Carousel
    //---------------------------------------------------------------------------------------
    var $news = $('#news');
    if ($news.length) {
        $news.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            dots: true,
            arrows: false,
            autoplaySpeed: 8000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    var $clients = $('#clients');
    if ($clients.length) {
        $clients.slick({
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        arrows: false,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    var $team = $('#team');
    if ($team.length) {
        $team.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 10000,
            dots: true,
            arrows: false,
            pauseOnHover: true
        });
    }
    
    //Slick Carousel for RTL layouts
    var $newsRtl = $('#news-rtl');
    if ($newsRtl.length) {
        $newsRtl.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            dots: true,
            arrows: false,
            autoplaySpeed: 8000,
            pauseOnHover: true,
            rtl: true,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    var $clientsRtl = $('#clients-rtl');
    if ($clientsRtl.length) {
        $clientsRtl.slick({
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            rtl: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        arrows: false,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    var $teamRtl = $('#team-rtl');
    if ($teamRtl.length) {
        $teamRtl.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 10000,
            dots: true,
            arrows: false,
            pauseOnHover: true,
            rtl: true
        });
    }
    //---------------------------------------------------------------------------------------
    //About Carousel
    //---------------------------------------------------------------------------------------
    var aboutCarouselClick = false;
    var $aboutCarousel = $('#aboutCarousel');
    var $navAboutCarouselA = $('#navAboutCarousel a');

    $aboutCarousel.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 10000,
        pauseOnHover: true,
        arrows: false,
        waitForAnimate: false,
        speed: 600,
        fade: true,
        centerPadding: 0
    }).on('beforeChange', function(e, slick, currentSlide, nextSlide){
        if(!aboutCarouselClick){
            $navAboutCarouselA.eq(nextSlide).trigger('click.bs');
        }
        else {
            aboutCarouselClick = false;
        }
    });

    $navAboutCarouselA.on('click.slick', function(e){
        aboutCarouselClick = true;
        var index = $(this).index('#navAboutCarousel a');
        $aboutCarousel.slick('slickGoTo', index);
        $(this).blur();
    });
    //---------------------------------------------------------------------------------------
    //Our history Carousel
    //---------------------------------------------------------------------------------------
    var historyCarouselClick = false;
    var $historyCarousel = $('#historyCarousel');
    var $navHistoryCarouselA = $('#navHistoryCarousel a');
    
    $historyCarousel.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true,
        arrows: false,
        waitForAnimate: false,
        speed: 600,
        fade: true
    }).on('beforeChange', function(e, slick, currentSlide, nextSlide){
        if(!historyCarouselClick){
            $navHistoryCarouselA.eq(nextSlide).trigger('click.bs');
        }
        else {
            historyCarouselClick = false;
        }
    });
    $navHistoryCarouselA.on('click.slick', function(e){
        historyCarouselClick = true;
        var index = $(this).index('#navHistoryCarousel a');
        $historyCarousel.slick('slickGoTo', index);
        $(this).blur();
    });
    //---------------------------------------------------------------------------------------
    //About Carousel RTL
    //---------------------------------------------------------------------------------------
    var aboutCarouselClick = false;
    var $aboutCarouselRtl = $('#aboutCarousel-rtl');
    var $navAboutCarouselRtlA = $('#navAboutCarousel-rtl a');

    $aboutCarouselRtl.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 10000,
        pauseOnHover: true,
        arrows: false,
        waitForAnimate: false,
        speed: 600,
        fade: true,
        rtl: true,
        centerPadding: 0
    }).on('beforeChange', function(e, slick, currentSlide, nextSlide){
        if(!aboutCarouselClick){
            $navAboutCarouselRtlA.eq(nextSlide).trigger('click.bs');
        }
        else {
            aboutCarouselClick = false;
        }
    });

    $navAboutCarouselRtlA.on('click.slick', function(e){
        aboutCarouselClick = true;
        var index = $(this).index('#navAboutCarousel-rtl a');
        $aboutCarouselRtl.slick('slickGoTo', index);
        $(this).blur();
    });
    //---------------------------------------------------------------------------------------
    //Our history Carousel RTL
    //---------------------------------------------------------------------------------------
    var historyCarouselClick = false;
    var $historyCarouselRtl = $('#historyCarousel-rtl');
    var $navHistoryCarouselRtlA = $('#navHistoryCarousel-rtl a');
    
    $historyCarouselRtl.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true,
        arrows: false,
        waitForAnimate: false,
        speed: 600,
        fade: true,
        rtl: true
    }).on('beforeChange', function(e, slick, currentSlide, nextSlide){
        if(!historyCarouselClick){
            $navHistoryCarouselRtlA.eq(nextSlide).trigger('click.bs');
        }
        else {
            historyCarouselClick = false;
        }
    });
    $navHistoryCarouselRtlA.on('click.slick', function(e){
        historyCarouselClick = true;
        var index = $(this).index('#navHistoryCarousel-rtl a');
        $historyCarouselRtl.slick('slickGoTo', index);
        $(this).blur();
    });
    //---------------------------------------------------------------------------------------
    //Vanillabox
    //---------------------------------------------------------------------------------------
    /* Ref: http://cocopon.me/app/vanillabox/demo.html */
    // Array of Vanillabox instances
    var boxes = [];
    var $gallery = $('.gallery');
    var $lightbox = $('.lightbox');
    var $webpage = $('.webpage');

    if (($gallery.length)) {
        boxes.push($gallery.vanillabox({
            closeButton: true,
            keyboard: true
        }));
    }

    if (($lightbox.length)) {
        boxes.push($lightbox.vanillabox({
            closeButton: true,
            keyboard: true
        }));
    }

    if (($webpage.length)) {
        boxes.push($webpage.vanillabox({
            type: 'iframe',
            closeButton: true,
            keyboard: true
        }));
    }

    $window.on('scroll', function(){
        var $vnbxFrame = $('.vnbx-frame');
        if (($vnbxFrame.length)) {
            $vnbxFrame.css('top', ( $window.height() - $vnbxFrame.height() ) / 3.2+$window.scrollTop() + 'px');
        }
    });

    $document.on('click', '.vnbx-mask', function() {
        boxes.forEach(function(box) {
            box.hide();
        });
    });
    //---------------------------------------------------------------------------------------
    //Video
    //---------------------------------------------------------------------------------------
    var $iframe = $('iframe');
    if ($iframe.length) {
        $iframe.each(function(){
            var ifr_source = $(this).attr('src');
            var wmode = '?wmode=transparent';
            $(this).attr('src',ifr_source+wmode);
        });
    }
    //---------------------------------------------------------------------------------------
    //Counter Up
    //---------------------------------------------------------------------------------------
    var $count = $('.count');
    if ($count.length) {
        var countFlag = false;
        $window.scroll(function(){
            var counterOffset = $('#counterUp').offset().top - 500;
            if ($(this).scrollTop() > counterOffset) {
                if(!countFlag) {
                    countFlag = true;
                    $count.each(function () {
                        $(this).prop('Counter',0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 3000,
                            easing: 'swing',
                            step: function (now) {
                                $(this).text(Math.ceil(now));
                            }
                        });
                    });
                }
            }
        });
    }
    //---------------------------------------------------------------------------------------
    //Portfolio
    //---------------------------------------------------------------------------------------
    var $grid = $('#grid');
    if ($grid.length) {
        $grid.mixitup();
    }
    //---------------------------------------------------------------------------------------
    //Select
    //---------------------------------------------------------------------------------------
    var $selectpicker = $('.selectpicker');
    if ($selectpicker.length) {
        $selectpicker.selectpicker({
            style: 'selectcorp'
        });
    }
    //---------------------------------------------------------------------------------------
    //Contact Form
    //---------------------------------------------------------------------------------------
    $('#contactform').on('submit', function() {
        if (!$(this).validate($('#alertform'))) {
            return false;
        }
    });
    //---------------------------------------------------------------------------------------
    //Google Maps
    //---------------------------------------------------------------------------------------
    if ($('#map-canvas').length) {
        var myLatLng = {lat: 40.7060555, lng: -74.0090263}; // Wall Street

        //Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: myLatLng,
            scrollwheel: false,
            zoom: 16,
            styles: [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#b5cbe4"}]},{"featureType":"landscape","stylers":[{"color":"#efefef"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#83a5b0"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#bdcdd3"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e3eed3"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
        });

        //The Window it show after press click in marker icon
        var contentString = '<div id="mapcontent">'+'<h4 class="m0 color6">Hello!</h4><p>We are here...</p></div>';
        var infowindow = new google.maps.InfoWindow({
                maxWidth: 320,
                content: contentString
        });

        //The icon market
        var mapElement = document.getElementById('map-canvas');
            map = new google.maps.Map(mapElement, map);
        var image = new google.maps.MarkerImage('assets/img/map.png',
            null, null, null, new google.maps.Size(32,32));

        //Create a marker and set its position.
        var marker = new google.maps.Marker({
            map: map,
            position: myLatLng,
            icon: image,
            title: 'Corpboot'
        });

        google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
        });
    }
    //---------------------------------------------------------------------------------------
    //Bootstrap Tooltip
    //---------------------------------------------------------------------------------------
    $('[data-toggle="tooltip"]').tooltip();
});