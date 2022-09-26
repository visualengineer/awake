function strict() {
  'use strict';
}





//// Journeys slider //////


var bg = document.querySelector('.item-bg');
var items = document.querySelectorAll('.news__item');
var item = document.querySelector('.news__item');

function cLog(content) {
    console.log(content)
}

if($(window).width() > 800) {
    $(document).on("mouseover", ".news__item", function (_event, _element) {

        var newsItem = document.querySelectorAll('.news__item');
        newsItem.forEach(function (element, index) {
            element.addEventListener('mouseover', function () {
                var x = this.getBoundingClientRect().left;
                var y = this.getBoundingClientRect().top;
                var width = this.getBoundingClientRect().width;
                var height = this.getBoundingClientRect().height;

                $('.item-bg').addClass('active');
                $('.news__item').removeClass('active');
                // $('.news__item').removeClass('active');


                bg.style.width = width + 'px';
                bg.style.height = height + 'px';
                bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
            });

            element.addEventListener('mouseleave', function () {
                $('.item-bg').removeClass('active');
                $('.news__item').removeClass('active');
            });

        });

    });
}


var swiper = new Swiper('.news-slider', {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    keyboard: true,
    spaceBetween: 0,
    slidesPerView: 'auto',
    speed: 300,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 3,
        slideShadows: false
    },
    breakpoints: {
        480: {
            spaceBetween: 0,
            centeredSlides: true
        }
    },
    simulateTouch: true,
    navigation: {
        nextEl: '.news-slider-next',
        prevEl: '.news-slider-prev'
    },
    pagination: {
        el: '.news-slider__pagination',
        clickable: true
    },
    on: {
        init: function () {
            var activeItem = document.querySelector('.swiper-slide-active');

            var sliderItem = activeItem.querySelector('.news__item');

            $('.swiper-slide-active .news__item').addClass('active');

            var x = sliderItem.getBoundingClientRect().left;
            var y = sliderItem.getBoundingClientRect().top;
            var width = sliderItem.getBoundingClientRect().width;
            var height = sliderItem.getBoundingClientRect().height;


            $('.item-bg').addClass('active');

            bg.style.width = width + 'px';
            bg.style.height = height + 'px';
            bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
        }
    }
});

swiper.on('touchEnd', function () {
    $('.news__item').removeClass('active');
    $('.swiper-slide-active .news__item').addClass('active');
});

swiper.on('slideChange', function () {
    $('.news__item').removeClass('active');
});

swiper.on('slideChangeTransitionEnd', function () {
    $('.news__item').removeClass('active');
    var activeItem = document.querySelector('.swiper-slide-active');

    var sliderItem = activeItem.querySelector('.news__item');

    $('.swiper-slide-active .news__item').addClass('active');

    var x = sliderItem.getBoundingClientRect().left;
    var y = sliderItem.getBoundingClientRect().top;
    var width = sliderItem.getBoundingClientRect().width;
    var height = sliderItem.getBoundingClientRect().height;


    $('.item-bg').addClass('active');

    bg.style.width = width + 'px';
    bg.style.height = height + 'px';
    bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
});





//// end journeys slider //////











/////////////////////////////////////////////////////////////////////////////////////////SHARE /////////////////////
/////////////////////
const shareButton = document.querySelector('.share-button');
const shareDialog = document.querySelector('.share-dialog');
const closeButton = document.querySelector('.close-button');

shareButton.addEventListener('click', event => {
  if (navigator.share) { 
   navigator.share({
      title: 'Awake. A gym for the soul.',
      url: 'https://https://awakespace.co'
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
    } else if (shareDialog.classList.contains('is-open')) {
    shareDialog.classList.remove('is-open');
    console.log('closing from share button');
    } else {
      shareDialog.classList.add('is-open');
    }

});

closeButton.addEventListener('click', event => {
  shareDialog.classList.remove('is-open');
  console.log('closing from panel');
});




/////////////////////////////////////////////////////////////////////////////////////////ACCORDION /////////////////////
/////////////////////



/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */
( function( window ) {
  'use strict';
  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }
  var hasClass, addClass, removeClass;
  
  if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
      return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    hasClass = function( elem, c ) {
      return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }
  
  function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
  }
  var classie = {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };
  if ( typeof define === 'function' && define.amd ) {
    define( classie );
  } else {
    window.classie = classie;
  }
  })( window );
  var $ = function(selector){
    return document.querySelector(selector);
  }
  var accordion = $('.accordion');
  accordion.addEventListener("click",function(e) {
    e.stopPropagation();
    e.preventDefault();
    if(e.target && e.target.nodeName == "A") {
      var classes = e.target.className.split(" ");
      if(classes) {
        for(var x = 0; x < classes.length; x++) {
          if(classes[x] == "accordionTitle") {
            var title = e.target;
            var content = e.target.parentNode.nextElementSibling;
            classie.toggle(title, 'accordionTitleActive');
            if(classie.has(content, 'accordionItemCollapsed')) {
              if(classie.has(content, 'animateOut')){
                classie.remove(content, 'animateOut');
              }
              classie.add(content, 'animateIn');
            }else{
               classie.remove(content, 'animateIn');
               classie.add(content, 'animateOut');
            }
            classie.toggle(content, 'accordionItemCollapsed');      
          }
        }
      }  
    }
  });

/*
  window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      //need to replace animateIn with accordionItemCollapsed
    } else {
      false;
    }
  })
*/






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////  A D D  S H A D O W   T O   N A V   B O T T O M   O N   S C R O L L  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
const menuDesk = document.getElementsByTagName('header')[0] || false;
if (menuDesk !== false)
  window.onscroll = function () {
    addShadow();
  };
function addShadow() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    menuDesk.classList.add('active');
  } else {
    menuDesk.classList.remove('active');
  }
}
*/
////////////////////////////////////////////////////////
/////////////// SMOOTH SCROLLING ///////////////////////
////////////////////////////////////////////////////////
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});


//////////////// J S   C O P Y   O N   C O D E   S N I P P E T   /////////////////

const $copyBut = document.querySelector('.copy-link');
const $snippetArea = document.querySelector('.pen-url');
if ($copyBut) {
  $copyBut.addEventListener('click', copyBorder);
  let borderShowing = false;
  //
  function copyBorder() {
    if (!borderShowing) {
      $snippetArea.classList.add('copied');
      console.log('weewee');
      borderShowing = true;
    } else {
      $snippetArea.classList.remove('copied');
      borderShowing = false;
    }
  }

  function copy() {
    var copyText = $snippetArea;
    copyText.select();
    document.execCommand('copy');
    console.log('copied');
  }

  $copyBut.addEventListener('click', copy);
}

//////// B A C K  B U T T O N  ////////////
/*
document.querySelectorAll('.go-back').forEach((item) => {
  item.addEventListener('click', (event) => {
    history.back();
  });
});
*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////// M A I N   N A V   ////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Menu show hide
// create a variable, use document property
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.primary');
const menuNav = document.querySelector('.menu-nav');
//
const menuTwo = document.querySelector('.secondary');
///const menuNavTwo = document.querySelector('.menu-navTwo');
// maybe kkep this????
///const menuNavThree = document.querySelector('.menu-navThree');
//
//set initial state of menu
let showMenu = false;
//
// need event listener to listen for click event
menuBtn.addEventListener('click', toggleMenu);
//
function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    ///menuTwo.classList.add('show');
    menuNav.classList.add('show');
    ///menuNavTwo.classList.add('show');
    ///menuNavThree.classList.add('show');
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    ///menuTwo.classList.remove('show');
    menuNav.classList.remove('show');
    ///menuNavTwo.classList.remove('show');
    ///menuNavThree.classList.remove('show');
    showMenu = false;
  }
}
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////  N A V  B A R   M I N I M I S E R  ////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
const $mainHeader = document.getElementsByTagName('header')[0];
//console.log($mainHeader);
// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function () {
  scrollFunction();
};
//create variables and apply classes
function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    $mainHeader.classList.add('minimise');
  } else {
    $mainHeader.classList.remove('minimise');
  }
}

