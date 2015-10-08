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
    $(doc).bind('scroll', function (e) {
      var docTop = $doc.scrollTop();
      if ( eleTop - docTop < option.top ) {
        ele.addClass('active')
      }
      else {
        ele.removeClass('active')
      }
    })
  }
})(window)

export default {
  init: init
}

