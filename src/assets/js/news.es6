import '../css/base.scss'
import '../css/news.scss'

import browser from './lib/service/browser-plugin.js'
import $ from './lib/jquery/jquery-1.8.2.js'

import MainFrame from './component/mainFrame.es6'
import Header from './component/header.es6'

import HoverSupport from './component/hoverSupport.es6'
import Footer from './component/footer.es6'
import LoginSupport from './component/loginSupport.es6'


console.log('index.page')


$(function () {
  // Header
  Header.init();
  LoginSupport.init();
  MainFrame.init();
  HoverSupport.init({
    top: 50,
    selector: '#J_hover'
  })

  // Footer
  Footer.init();
})

