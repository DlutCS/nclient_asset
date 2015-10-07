import '../css/base.scss'
import '../css/news.scss'

import browser from './lib/service/browser-plugin.js'
import $ from './lib/jquery/jquery-1.8.2.js'

import Header from './component/header.es6'


console.log('news.page')


$(function () {
  // Header
  Header.init();

})

