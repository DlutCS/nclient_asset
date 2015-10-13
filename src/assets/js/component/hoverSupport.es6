import '../../css/component/hoverSupport.scss'
import $ from '../lib/jquery/jquery-1.8.2.js'

var init = (function (win, undefined) {
  var getOffset = function (ele) {
    var par = ele.offsetParent;
    return par ? getOffset(par) + ele.offsetTop : ele.offsetTop;
  }
  var initOffsetTop = undefined;

  return function (_option) {
    var option = $.extend({
      top: 0,
      selector: '.hover_support'
    }, _option);

    var doc = window.document;
    var $doc = $(doc);
    var ele = $( option.selector );
    var eleTop = initOffsetTop || (initOffsetTop = getOffset( ele[0] ));
    var state = false;
    var slide = $('.slide-element-child')
    $(doc).bind('scroll', function (e) {
      var docTop = $doc.scrollTop();
      if ( eleTop - docTop < option.top ) {
        if (state === false ) {
          ele.addClass('active');
          state = true;
          slide.fadeOut(1);
        }
        
      }
      else {
        if ( state === true ) {
          ele.removeClass('active')
          state = false;
          slide.fadeIn(200);
        }
        
      }
    })
  }
})(window)

export default {
  init: init
}

