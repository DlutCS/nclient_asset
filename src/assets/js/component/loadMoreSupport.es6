import $ from '../lib/jquery/jquery-1.8.2.js'

var params = [];

function init(_option) {

  var cid = params.length;
  var param = {};   //current config
  params.push(param);

  var option = $.extend({
    containerSelector: '#J_news_list',
    moreButtonSelector: '#J_news_load_more',
    sync: false,
    bottomLoading: true
  }, _option);

  param.option = option;

  initConfig(cid);
  bindEvent(cid);
}

function initConfig(cid) {
  var param = params[cid],
      option = param.option;
  var container = $(option.containerSelector);

  if ( !container.data('news-offset') )
    container.data('news-offset', 0)
  option.offset = container.children().length + container.data('news-offset');

}


function bindEvent(cid) {
  var param = params[cid],
      option = param.option;

  var container = $(option.containerSelector);
  var button = $(option.moreButtonSelector);
  

  //console.log(start, container.data('news-offset'))
  if ( option.bottomLoading )
    $(document).on('scroll', function () {
      // Listen when gota bottom
    })


  button.on('click', function() {
    if ( option.sync ) {
      // Show loading
      return
    }

    beforeAjax(cid);

    var start = container.data('news-offset') ;
    option.sync = true;
    try {
      $.ajax({
        url: '/api/newslist/latest/',
        type: 'GET',
        dataType: 'json',
        data: {
          start: option.offset,
          template: true
        },
        success: function (data) {
          //console.log(data)
          container.append(data.template);
          option.offset += data.count
          afterAjax(cid)
        },
        error: function (err) {
          console.log(err);
          afterAjax(cid)
        }
      });
    }
    catch (exception ){
      console.log(exception)
      afterAjax(cid)
    }
  })


}

function beforeAjax(cid) {
  var param = params[cid],
      option = param.option;
}

function afterAjax(cid) {
  var param = params[cid],
      option = param.option;
  option.sync = false;
}
export default {
  init: init
}