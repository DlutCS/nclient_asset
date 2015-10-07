import '../css/base.scss'
import '../css/index.scss'

import browser from './lib/service/browser-plugin.js'
import $ from './lib/jquery/jquery-1.8.2.js'

import Header from './component/header.es6'
import Slide from './component/slide.es6'

console.log('index.page1')


$(function () {
  // Header
  Header.init();

})

