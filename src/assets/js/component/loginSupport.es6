import '../../css/component/loginSupport.scss'
import $ from '../lib/jquery/jquery-1.8.2.js'

var init = function (_option) {
  var option = $.extend({
    loginButton: '#J_header_login',
    loginPageWrap: '.login-wrap',
    loginCancel: '#J_login_cancel'
  }, _option)

  $(option.loginButton).on('click', function() {
    $(option.loginPageWrap).fadeIn(500);
    $(document).on('mousewheel DOMMouseScroll', preventMousewheel)
  })

  $(option.loginCancel).on('click', function(){
    $(option.loginPageWrap).fadeOut(500);
    $(document).off('mousewheel DOMMouseScroll', preventMousewheel)
  })

  function preventMousewheel(_e){
    var e = window.event || _e;
    e.preventDefault();
  }
}

export default {
  init: init
}