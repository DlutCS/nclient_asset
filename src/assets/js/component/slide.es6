import "../../css/component/slide.scss";

import $ from '../lib/jquery/jquery-1.8.2.js'

//import { Promise } from 'es6-promise'

//需要的功能时
//1. 定时option.time 循环播放
//2. 如果在定时中， 鼠标突然插入，则强制打断当前thandle


//维护一个列表
var params = [];
/*
 * dir: up, right, down, left
 */
var dirsIn = {
  0: {'left': 0, 'top': '-100%'},
  1: {'left': '100%', 'top': 0},
  2: {'left': 0, 'top': '100%'},
  3: {'left': '-100%', 'top': 0}
};
var dirsNormal = {
  0: {'left': 0, 'top': 0},
  1: {'left': 0, 'top': 0},
  2: {'left': 0, 'top': 0},
  3: {'left': 0, 'top': 0}
}
var dirsOut = {
  0: dirsIn[2],
  1: dirsIn[3],
  2: dirsIn[0],
  3: dirsIn[1]
};

function init(_option) {

  var cid = params.length;
  var param = {};   //current config
  params.push(param);

  var option = $.extend({
    selector: '#J_slide .slide-element-child>.slide-clip-source',
    activeClass: 'slide-focus-child',
    animatingClass: 'slide-animating',
    panelSelector: '.slide-panel',
    delay: 1500,
    eles: null,
    paths: null,
    cur: 0,
    data: null,
    thandle: [],
    stop: false
  }, _option);

  param.option = option;

  initConfig(cid);
  bindEvent(cid);
  initAction(cid);
}

function initConfig(cid) {
  var param = params[cid],
      option = param.option;

  // .clip-source
  option.eles = $(option.selector);
  option.panels = option.eles.find(option.panelSelector)
  option.data = (function(){
    var ret =[];
    while(ret.push({})<option.eles.length);
    return ret;
  })
  option.paths = option.paths || (function () {
    var ret = [];
    while(ret.push(ret.length)<option.eles.length);
    return ret;
  })()
  console.log(option.paths)
}

/*
 * when mouse entered, trigger the animation.
 */
function bindEvent(cid) {
  var param = params[cid],
      option = param.option;

  
  var eles = option.eles;
  eles.on('mouseenter mouseleave', function(_e){
    var e = window.event || _e;
    var ele = $(this);
    // this is 'clip-source'
    
    var mask = ele.find(option.panelSelector);

    var id = ele.data('slide-id')

    if ( e.type === 'mouseout' ) {
      option.stop = false
      option.thandle.push( setTimeout(option.loop,1) )
      sweep(cid, id, 3, 1, function(){
        mask.data('sync', 0)

      }, {
        ignoreSync: true,
        isLeave: true
      })
    }
    else {
      
      clear();
      option.stop = true
      sweep(cid, id, 3, 0, null, {
        setSync: true,
        isEnter: true
      })
      
    }
    
  })

  function clear() {
    var len = option.thandle.length;
    while(len--) {
      clearTimeout(option.thandle[len]);
      option.thandle.pop()
    }
  }
}

function initAction(cid) {
  var param = params[cid],
      option = param.option;
  var cnt = option.cur;
  var panels = option.panels;
  var paths = option.paths;
  var cur = option.cur, next;

  function loop() {
    console.log('loop')
    next = (cur+1) % panels.length;
    var cbcnt = 0;
    function cb() {

      cbcnt++;
      if (cbcnt == 2)
      if ( !option.stop )
        option.thandle.push( setTimeout(option.loop, option.delay) )
    }

    sweep(cid, cur, 3, 1, cb);
    sweep(cid, next,3, 0, cb);

    cur = next;

    
  }
  option.loop = loop;
  option.thandle.push( setTimeout(option.loop,1) )
}

function sweep(cid, id, dir, type, callback, op) {
  var param = params[cid],
      option = param.option;
  var dirsBegin,
      dirsEnd;
  var ele = option.panels.eq(id);
  switch(type) {
    // dir -> center
    case 0: dirsBegin = dirsIn; dirsEnd = dirsNormal; break;
    // center -> dir
    case 1: dirsBegin = dirsNormal; dirsEnd = dirsOut; break;
    // dir -> opposite
    case 2: dirsBegin = dirsIn; dirsEnd = dirsOut; break;
    // opposite -> dir
    case 3: dirsBegin = dirsOut; dirsEnd = dirsIn; break;
  }
  op = $.extend({
    setSync: false,
    ignoreSync: false,
    notBegin: false,
    isEnter: false,
    isLeave: false
  }, op)

  var sync = ele.data('sync');


  if ( sync && !op.ignoreSync ) return cb();
  if ( op.setSync ) ele.data('sync', 1)

  // 进入时 如果跟当前运动一致则回避
  if ( option.data[id] && 
    (op.isEnter||op.isLeave) && 
    option.data[id].left == dirsEnd[dir].left ) return cb();
  
  // 如果action调用，且跟当前运动一致则回避
  if ( option.data[id] && 
    (!op.isLeave && !op.isEnter) && 
    option.data[id].left == dirsEnd[dir].left ) return cb();
  

  op.isLeave || ele.removeClass(option.animatingClass);
  setTimeout(function () {
    op.isLeave || ele.css('-ms-transform', 'translate('+dirsBegin[dir].left+','+dirsBegin[dir].top+')');
    op.isLeave || ele.css('-webkit-transform', 'translate('+dirsBegin[dir].left+','+dirsBegin[dir].top+')');
    op.isLeave || ele.css('transform', 'translate('+dirsBegin[dir].left+','+dirsBegin[dir].top+')');
    option.data[id] = dirsBegin[dir];

    setTimeout(function(){
      ele.addClass(option.animatingClass);
      setTimeout(function() {
        ele.css('-ms-transform', 'translate('+dirsEnd[dir].left+','+dirsEnd[dir].top+')');
        ele.css('-webkit-transform', 'translate('+dirsEnd[dir].left+','+dirsEnd[dir].top+')');
        ele.css('transform', 'translate('+dirsEnd[dir].left+','+dirsEnd[dir].top+')');
        option.data[id] = dirsEnd[dir];
        cb();
      },32)
    },32)
  },32)
  
  function cb() {
    setTimeout(function(){
      callback && callback();
    },1);
  }
}

module.exports = {
  init: init
}