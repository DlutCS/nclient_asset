import '../../css/component/loginSupport.scss'
import $ from '../lib/jquery/jquery-1.8.2.js'

var init = function (_option) {
 
  var option = $.extend({
    enterButton: '.J_enter_user_panel',
    cancelButton: '.J_cancel_user_panel',
    panelClass: {
      login: '.J_login_panel',
      register: '.J_register_panel'
    },
    buttonClass: {
      login: '.login',
      register: '.register'
    }
  }, _option)

  var $doc = $(document);

  ;[ 'login', 'register' ].map(function(type){

    console.log(option.enterButton + option.buttonClass[type])
    console.log(option.panelClass[type])
    $(option.enterButton + option.buttonClass[type]).on('click', function() {
      $(option.panelClass[type]).fadeIn(500);
      $doc.on('mousewheel DOMMouseScroll', preventMousewheel);
    })
  });

  ;[ 'login', 'register' ].map(function(type){
    $(option.cancelButton + option.buttonClass[type]).on('click', function() {
      $(option.panelClass[type]).fadeOut(500);
      $doc.off('mousewheel DOMMouseScroll', preventMousewheel);
    })
  });


  function preventMousewheel(_e){
    var e = window.event || _e;
    e.preventDefault();
  }
}

export default {
  init: init
}