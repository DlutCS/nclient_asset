import "../../css/component/header.scss";

import $ from '../lib/jquery/jquery-1.8.2.js'

var init = function () {
  
  // Header moving listener
  var navItem = $('#J_header_content .header-navitem-wrap')
  var moving = $('#J_header_moving')
  var timeInterval = null;
  var eventAction = function (ele) {
    if ( !ele ) return; 
    moving.css({'left': ele.offsetLeft, 'width': ele.clientWidth})
  }

  eventAction( navItem[0] )
  moving.addClass('active')
  navItem.on('mouseenter mouseleave', function (_e) {
    var e = window.event || _e
    var target = e.target || e.srcElement

    if ( target.nodeName.toLowerCase() === 'a' ) {
      //理论上 内层元素的访问都应该禁止
      return;
    }

    if ( timeInterval ) {
      clearTimeout(timeInterval);
      timeInterval = null;
    }

    eventAction( target);
    if ( e.type === 'mouseout' ) {
      timeInterval = setTimeout(function () {
        eventAction( navItem[0] )
      }, 1000)
    }
  })
}

export default {
	init: init
}
