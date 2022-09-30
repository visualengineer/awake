function strict() {
  'use strict';
}





//// Journeys slider //////







//// end journeys slider //////




///// link drop down

var dropDownValue = document.getElementById("dropDown");

dropDownValue.onchange = function() {
  if (this.selectedIndex !== 0) {
    window.location.href = this.value;
  }
};

//// end link drop down


/// drop down 2 ///

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
/// end drop down 2 ////



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


// Create a condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(min-width: 768px)')

function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    console.log('Media Query Matched!')
    let a = document.getElementsByClassName( 'accordionTitleActive' );
    [...a].forEach( x => x.className += '' );
    [...a].forEach( x => x.classList.remove('accordionTitleActive') );
    let b = document.getElementsByClassName( 'animateOut' );
    [...b].forEach( x => x.className += ' accordionItemCollapsed' );
    [...b].forEach( x => x.classList.remove('animateOut') );
    let c = document.getElementsByClassName( 'animateIn' );
    [...c].forEach( x => x.className += ' accordionItemCollapsed' );
    [...c].forEach( x => x.classList.remove('animateIn') );
  }
}

// Register event listener
mediaQuery.addListener(handleTabletChange)

// Initial check
handleTabletChange(mediaQuery)



/*
  window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      //need to replace animateIn with accordionItemCollapsed
    } else {
      false;
    }
  })

 if (window.matchMedia("(min-width: 768px)").matches) {
        classie.remove(content, 'animateOut');
        classie.remove(content, 'animateIn');
        if(classie.has(content, 'accordionItemActive')) {
          classie.remove(content, 'accordionItemActive');
          classie.add(content, 'accordionItemCollapsed');
        } else {
          false;
        }
      } else {
        false;
      }



@ 768 remove all instances of .animateOut and .animateIn and replace .accordianTitle Active with .accordionItemCollapsed




*/


/////////////////////////////////////////////////////////////////////////////////////////ANIMATE ELEMNTS ON SCROLL /////////////////////
/////////////////////

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});














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
///////////////////////////////////////////////////////
/*
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
*/

// Smooth Scroll to #links | with Off-Set ==================================== //

//get all # links in the document
let links = document.querySelectorAll('a[href*="#"]');
// console.log(links);

//assign a click event to all the # links
for(let l = 0; l < links.length; l++) {
    links[l].addEventListener('click', scrollMe, false);
}

function scrollMe(e) {
    e.preventDefault(); //needed in order for the scroll to work

    // get hash property
    let hash = e.target.hash;

    //check for empty hash
    if(hash) {

        // remove the # from the hash string
        // so we can use it to reference the element by its ID.
        let elemId = hash.replace('#', '');

        // Get Element we will be scrolling to
        let element = document.getElementById(elemId);

        // Set top off-set. Adjust as needed.
        let headerOffset = 100;

        // Get element's position relative to the viewport.
        let elementPos = element.getBoundingClientRect().top;
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

        // Get final position we will scroll to
        let offsetPos = elementPos + window.pageYOffset - headerOffset;
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset
        
        // Scroll to that element
        window.scrollTo({
            top: offsetPos,
            behavior: 'smooth'
        });
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
    }
}


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

/*
document.getElementById("navbar").style.top = "0";

let scroll_position = 0;
let scroll_direction;

window.addEventListener('scroll', function(e){
    scroll_direction = (document.body.getBoundingClientRect()).top > scroll_position ? 'up' : 'down';
    scroll_position = (document.body.getBoundingClientRect()).top;
    console.log(scroll_direction);

  if (scroll_direction == 'up') {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
   
});

*/


