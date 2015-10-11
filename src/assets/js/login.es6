import '../css/base.scss'


import browser from './lib/service/browser-plugin.js'
import $ from './lib/jquery/jquery-1.8.2.js'

import LoginSupport from './component/loginSupport.es6'



console.log('login.page')


$(function () {
  LoginSupport.init();

})

