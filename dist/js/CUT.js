

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// O V E R L A Y ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function trapFocus(element) {
  var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];
  var KEYCODE_TAB = 9;

  element.addEventListener('keydown', function (e) {
    var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } /* tab */ else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}

/*
    onclick functions to launch the overlay, toggle the required classes and grab the current scroll position of the page
*/

const circleFill = document.querySelector('circle');

document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('nav-overlay');
  var scrollPos = document.querySelector('body').scrollTop;
  //open overlay
  document.querySelector('.c-nav-toggle--opener').addEventListener('click', function () {
    //setPieChart('start');
    //pie.style.strokeDasharray = 0;
    circleFill.classList.add('trans');
    document.querySelector('.c-nav-overlay').classList.toggle('c-nav-overlay--open');
    document.querySelector('body').classList.toggle('is-overlay-open');
    document.getElementById('nav-overlay').setAttribute('aria-expanded', 'true');
    document.getElementById('nav-closer').focus();
    //setPieChart('finish');
    //pie.style.strokeDasharray = 158;
    document.querySelector('.slow').classList.add('active');
    trapFocus(overlay);
  });
  //close overlay
  document.querySelector('.c-nav-toggle--closer').addEventListener('click', function () {
    circleFill.classList.remove('trans');
    document.querySelector('.c-nav-overlay').classList.toggle('c-nav-overlay--open');
    document.querySelector('body').classList.toggle('is-overlay-open');
    document.getElementById('nav-overlay').setAttribute('aria-expanded', 'false');
    document.getElementById('overlayOpener').focus();
    document.querySelector('body').scrollTop = scrollPos; // [1]
    //pie.style.strokeDasharray = 0;
    //setPieChart('start');
    document.querySelector('.slow').classList.remove('active');
  });
});

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// L O A D I N G   P I E ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

var total = 158,
  buttons = document.querySelector('.buttons'),
  pie = document.querySelector('.pie'); //,
//activeClass = 'active';

var continents = {
  start: 0,
  finish: 100,
};

// work out percentage as a result of total
var numberFixer = function (num) {
  var result = (num * total) / 100;
  return result;
};
/*
// create a button for each country
for (property in continents) {
  var newEl = document.createElement('button');
  newEl.innerText = property;
  newEl.setAttribute('data-name', property);
  buttons.appendChild(newEl);
}
*/
/*
// when you click a button setPieChart and setActiveClass
buttons.addEventListener('click', function (e) {
  if (e.target != e.currentTarget) {
    var el = e.target,
      name = el.getAttribute('data-name');
    setPieChart(name);
    setActiveClass(el);
  }
  e.stopPropagation();
});
*/
var setPieChart = function (name) {
  var number = continents[name],
    fixedNumber = numberFixer(number),
    result = fixedNumber + ' ' + total;

  pie.style.strokeDasharray = result;
  console.log('result = ' + result);
};
/*
var setActiveClass = function (el) {
  for (var i = 0; i < buttons.children.length; i++) {
    buttons.children[i].classList.remove(activeClass);
    el.classList.add(activeClass);
  }

};
*/
// Set up default settings

//setPieChart('northAmerica');

//setActiveClass(buttons.children[0]);

//close the overlay when
var doneTheStuff;

circleFill.addEventListener('transitionend', () => {
  // if (!doneTheStuff) {
  var overlay = document.getElementById('nav-overlay');
  var scrollPos = document.querySelector('body').scrollTop;

  //pie.style.strokeDasharray = 0;
  console.log('Transition ended');
  circleFill.classList.remove('trans');
  document.querySelector('.c-nav-overlay').classList.toggle('c-nav-overlay--open');
  document.querySelector('body').classList.toggle('is-overlay-open');
  document.getElementById('nav-overlay').setAttribute('aria-expanded', 'false');
  document.getElementById('overlayOpener').focus();
  document.querySelector('body').scrollTop = scrollPos; // [1]
  document.querySelector('.slow').classList.remove('active');
  //setPieChart('start');
  // doneTheStuff = true;
  //console.log('circleFill.style.strokeDasharray = ' + circleFill.style.strokeDasharray);
  /*
    //console.log('result = ' + result);
    console.log('total = ' + total);
    total = 0;
    console.log('total = ' + total);
    console.log('circleFill.style.strokeDasharray = ' + circleFill.style.strokeDasharray);
    circleFill.style.strokeDasharray = 0;
    console.log('circleFill.style.strokeDasharray = ' + circleFill.style.strokeDasharray);
    //pie.style.strokeDasharray = 0;
    // do the stuff
    */
  //}
});

//////////////////////////////////////////////////////////
///////// M E S S A G E   C L O S E   S C R I P T ////////
//////////////////////////////////////////////////////////
// Listen for click events
document.addEventListener(
  'click',
  function (event) {
    // Make sure clicked element is our toggle
    if (!event.target.classList.contains('closeMes')) return;

    // Prevent default link behavior
    event.preventDefault();

    // Get the content
    var content = document.querySelector('.message');
    //var elem = document.querySelector('#some-element');
    //var closestParent = elem.closest('.pick-me');

    //var content = document.querySelector(event.target.hash);
    if (!content) return;

    // Toggle the content
    //toggle(content);
    //remove content from DOM
    content.remove();
  },
  false
);
