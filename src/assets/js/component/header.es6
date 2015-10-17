import "../../css/component/header.scss";

import $ from '../lib/jquery/jquery-1.8.2.js'

var init = function () {
  
  // Header moving listener
  var navItem = $('#J_header_content .header-navitem-wrap')
  var moving = $('#J_header_moving');
  var selectedIndex = 0;
  var timeInterval = null;
  var sync = false;
  var eventAction = function (ele) {
    if ( !ele ) return; 
    moving.css({'left': ele.offsetLeft, 'width': ele.clientWidth})
  }

  //ventAction( navItem[0] )
  navItem.map(function(k,v) {
    if(navItem.eq(k).hasClass('selected')) {
      selectedIndex = k;
      eventAction( navItem[selectedIndex] )
    }
  })
  moving.addClass('active')

  navItem.on('click', function(_e) {
    var e = window.event || _e
    var target = e.target || e.srcElement

    // when click , lock the moving-block
    sync = true;
  })

  navItem.on('mouseenter mouseleave', function (_e) {
    var e = window.event || _e
    var target = e.target || e.srcElement

    if ( timeInterval ) {
      clearTimeout(timeInterval);
      timeInterval = null;
    }

    eventAction( target);
    if ( e.type === 'mouseout' ) {
      // if sync === true means user clicked
      if ( sync === false ) {
        timeInterval = setTimeout(function () {
          eventAction( navItem[selectedIndex] )
        }, 1000)
      }
    }
    else {
      //whenever entered a new item, unlock
      sync = false;
    }
  })
}

module.exports = {
	init: init
}
