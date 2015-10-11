import '../css/base.scss'
import '../css/index.scss'

import browser from './lib/service/browser-plugin.js'
import $ from './lib/jquery/jquery-1.8.2.js'

import Header from './component/header.es6'
import Slide from './component/slide.es6'
import HoverSupport from './component/hoverSupport.es6'
import Footer from './component/footer.es6'
import LoginSupport from './component/loginSupport.es6'

console.log('index.page')


$(function () {
  // Header
  Header.init();
  LoginSupport.init();
  // Slide
  Slide.init({
    paths:[0,1,2,3,4,5]
  });

  HoverSupport.init({
    top: 50,
    selector: '#J_hover'
  })

  // Footer
  Footer.init();
})

