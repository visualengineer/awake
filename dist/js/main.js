function strict() {
  'use strict';
}

self.addEventListener('fetch', (event) => {
  let request = event.request;

  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request);
    })
  );
});

//hide the whole page initially so that there are no flashes of hidden content before page load - see body tag in page plus mini script on page
let domReady = (cb) => {
  document.readyState === 'interactive' || document.readyState === 'complete' ? cb() : document.addEventListener('DOMContentLoaded', cb);
};

domReady(() => {
  // Display body when DOM is loaded
  document.body.style.visibility = 'visible';
  // Hide entity button strip

  if (document.querySelector('.entityNavOptions')) {
    $entityNavOptions.style.visibility = 'hidden';
  }
  /*
  //set active menu item - will need tweaking when on live server
  (function () {
    var nav = document.querySelector('.menu-nav'),
      anchor = nav.querySelectorAll('li a'),
      current = window.location.pathname.split('/dist/')[1];
    for (var i = 0; i < anchor.length; i++) {
      console.log(anchor[i].href);
      if (anchor[i].href.split('/dist/')[1] === current) {
        console.log(anchor[i].href.split('/dist/')[1]);
        anchor[i].className = 'nav-link active';
        //anchor[i].classList.add = 'active';
      }
    }
  })();
  */
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//// M A K E   E N T I T Y  P A N E LS    C L I C K A B L E   ////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
if (document.querySelector('.entity')) {
  const ent = document.querySelector('.entity');
  const entName = ent.querySelector('.entityName');
  const clickableElements = Array.from(ent.querySelectorAll('a')); //using 'a' here for simplicity but should consider a class like 'clickable' on every clicable element inside entity(a, button) and use that in query selector

  clickableElements.forEach((ele) => ele.addEventListener('click', (e) => e.stopPropagation()));

  function handleClick(event) {
    const noTextSelected = !window.getSelection().toString();

    if (noTextSelected) {
      entName.click();
    }
  }

  ent.addEventListener('click', handleClick);
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//// S W I P E  C L I C K E R  ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const swipeClicker = document.querySelectorAll('.clicker');
const swipeBlockOne = document.querySelectorAll('.swipeOne');
const swipeBlockTwo = document.querySelectorAll('.swipeTwo');
const swipeBlock = document.querySelectorAll('.swipe-view');
//swipeClicker.addEventListener('click', doSomething);
//swipeClicker.forEach((n) => n.classList.remove('active'));
/*
function doSomething(event) {
  //
  dropButChild.forEach((n) => n.classList.remove('active'));
  console('weewee');
  swipeBlock.classList.add('swiped');
  //
}
*/

for (let i = 0; i < swipeClicker.length; i++) {
  swipeClicker[i].addEventListener('click', (event) => {
    if (!swipeBlockOne[i].classList.contains('swiped')) {
      //console.log('weewee');
      //swipeClicker[i].classList.add('clicked');
      swipeBlock[i].classList.add('swiped');
      swipeBlockOne[i].classList.add('swiped');
      swipeBlockTwo[i].classList.add('swiped');
      //swipeBlock[i].scrollLeft -= 300;
      //event.preventDefault();
    } else {
      //console.log('poopoo');
      //swipeClicker[i].classList.remove('clicked');
      swipeBlock[i].classList.remove('swiped');
      swipeBlockOne[i].classList.remove('swiped');
      swipeBlockTwo[i].classList.remove('swiped');
      //swipeBlock[i].scrollLeft += 300;
      //event.preventDefault();
    }
  });
}

/*
    if (!swipeBlock[0].classList.contains('swiped')) {
      //gaugeBut clicked
      console.log('weewee');
      //console.log(swipeBlock);
      swipeBlock[0].classList.add('swiped');
      console.log(swipeBlock[0]);
    } else {
      swipeBlock[0].classList.remove('swiped');
      console.log('weewee');
    }
*/

/*
swipeClicker.forEach((swipeClick) => {
  for (var i = 0; i < swipeClick.length; i++) {
    swipeClick.addEventListener('click', (event) => {
      if (!swipeBlock[i].classList.contains('swiped')) {
        //gaugeBut clicked
        console.log('weewee');
        //console.log(swipeBlock);
        swipeBlock[i].classList.add('swiped');
        console.log(swipeBlock[i]);
      } else {
        swipeBlock[i].classList.remove('swiped');
        console.log('weewee');
      }
    });
  }
});
*/

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//// D R O P   D O W N   F O R   T H E   G A U G E S  /////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const dropBut = document.querySelector('.clickButton');
const dropButChild = document.querySelectorAll('.clickButton a');
const dropper = document.querySelector('.slidePanel');
const sliderBut = document.querySelector('.sliderBut');
const clickStrip = document.querySelector('.clickStrip');
//const contPanel = document.querySelector('.content');
const iconBut = document.querySelector('.icons a');

//set initial state of menu
let dropStatus = false;
//
// need event listener to listen for click event
if (dropBut) {
  //dropBut.addEventListener('click', toggleDrop);
  sliderBut.addEventListener('click', toggleDrop);
  clickStrip.addEventListener('click', toggleDrop);
}
//
function toggleDrop() {
  if (dropBut.classList.contains('stateBot')) {
    dropStatus = true; //on single entity page, slider starts at the bottom - this detacts it
  }

  if (!dropStatus) {
    dropper.classList.add('slide-down');
    //dropButChild.forEach((item) => item.classList.add('show')); //show buttons
    //contPanel.classList.add('slide-down');
    //console.log('slide-down-added');
    dropper.classList.remove('slide-up');
    //contPanel.classList.remove('slide-up');
    //console.log('slide-up-removed');
    //dropButChild.forEach((item) => (item.pointerEvents = 'auto'));
    //dropBut.style.pointerEvents = 'none';
    //sliderBut.style.pointerEvents = 'auto';
    dropBut.classList.add('stateBot');
    //dropButChild.style.pointerEvents = 'auto';
    //dropBut.style.pointerEvents = 'none';
    // add pointer-events: auto; for each of the a buttons
    dropStatus = true;
  } else {
    //console.log('slide-up-added');
    dropper.classList.add('slide-up');
    //contPanel.classList.add('slide-up');
    dropper.classList.remove('slide-down');
    dropBut.classList.remove('stateBot');
    //contPanel.classList.remove('slide-down');
    //dropButChild.forEach((item) => (item.style.pointerEvents = 'auto'));
    //dropBut.style.pointerEvents = 'none';
    dropStatus = false;
  }
}

//show all clicks for any object
/*
dropBut.addEventListener('click', function (e) {
  e = window.event || e;
  if (this === e.target) {
    // put your code here
  }
});
*/
//buttons on mobile to scroll guages
const entityDash = document.querySelector('.entityDash');

//position of entityDash
/*
function myMove() {
  var pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      entityDash.style.transform = 'translateX(' + pos1 + ')';
    }
  }
}
*/

//const pos1 = 'translateX(-20%)'; //margin-left: -20% //'0%';
//const pos2 = 'translateX(-33.8%)'; //'-33%';
//const pos3 = 'translateX(-67%)'; //'-66.6%';

//1 =

dropButChild.forEach((item) => {
  item.addEventListener('click', (event) => {
    //gaugeBut clicked

    if (item.classList.contains('gaugeBut') && !item.classList.contains('active')) {
      entityDash.style.transform = 'translateX(0%)';
      //entityDash.classList.add('gaugePos');
      //entityDash.style.marginLeft = pos1;
      //entityDash.style.transform = pos1;
      if (sliderBut.classList.contains('active')) {
        sliderBut.classList.remove('active');
      }
    } else if (item.classList.contains('breakBut') && !item.classList.contains('active')) {
      entityDash.style.transform = 'translateX(-33%)';
      sliderBut.classList.add('active');
      //entityDash.classList.add('breakPos');
      //entityDash.style.marginLeft = pos2;
      //entityDash.style.transform = pos2;
    } else if (item.classList.contains('graphBut') && !item.classList.contains('active')) {
      entityDash.style.transform = 'translateX(-66%)';
      //entityDash.classList.add('graphPos');
      //entityDash.style.marginLeft = pos3;
      //entityDash.style.transform = pos3;
      if (sliderBut.classList.contains('active')) {
        sliderBut.classList.remove('active');
      }
    }

    dropButChild.forEach((n) => n.classList.remove('active'));
    item.classList.add('active');
    /*
    if (window.innerWidth >= 1024) {
      entityDash.style.transform = 'translate(0%, 0)';
    }
    */
  });
});
/*
window.onclick = (poo) => {
  console.log(poo.target); // to get the element
  console.log(poo.target.tagName); // to get the element tag name alone
};
*/
/*
const btns = document.querySelector('.clickButton a');
const images = document.querySelector('.grid-item');
const imageWidth = images.clientWidth;
const IMAGE_CHANGE_DELAY = 3000;
let imageIndex = 0;

for (let i = 0; i < btns.children.length; i++) {
  const btn = btns.children[i];
  btn.addEventListener('click', function () {
    unCheckAllBtns();
    btn.classList.add('active');
    changeImage(i);
  });
}

function unCheckAllBtns() {
  for (const btn of btns.children) {
    btn.classList.remove('active');
  }
}

function changeImage(index) {
  let pos = imageWidth * imageIndex;
  const interval = setInterval(slide, 1);

  function slide() {
    if (pos === imageWidth * index) {
      imageIndex = index;
      clearInterval(interval);
    } else {
      if (index > imageIndex) {
        pos += 10;
      } else if (index < imageIndex) {
        pos -= 10;
      }
      images.style.left = '-' + pos + 'px';
    }
  }
}

function nextSlide() {
  unCheckAllBtns();

  let index = imageIndex + 1;

  if (index === btns.children.length) {
    index = 0;
  }

  btns.children[index].classList.add('active');
  changeImage(index);
}

setInterval(() => !document.hidden && nextSlide(), IMAGE_CHANGE_DELAY);
*/
//////////////// J S   C O P Y   O N   C O D E   S N I P P E T   /////////////////
const $copyBut = document.querySelector('.copyBut');
const $snippetArea = document.querySelector('.snippetArea');
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

document.querySelectorAll('.go-back').forEach((item) => {
  item.addEventListener('click', (event) => {
    history.back();
  });
});

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
const menuNavTwo = document.querySelector('.menu-navTwo');
// maybe kkep this????
const menuNavThree = document.querySelector('.menu-navThree');
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
    menuTwo.classList.add('show');
    menuNav.classList.add('show');
    menuNavTwo.classList.add('show');
    menuNavThree.classList.add('show');
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuTwo.classList.remove('show');
    menuNav.classList.remove('show');
    menuNavTwo.classList.remove('show');
    menuNavThree.classList.remove('show');
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

