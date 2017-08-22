/**
 * Created by charlie on 2017/2/13 0013.
 */
+ function($){
  //默认全局配置
  var defaults = {};
  $.xdmConfig = $.extend(defaults, $.config);
  $.device= {
    XDM:function(){return navigator.userAgent.match(/xdm/i) ? true : false;},
    android: function(){return navigator.userAgent.match(/Android|Linux/i) ? true : false},
    BlackBerry: function(){return navigator.userAgent.match(/BlackBerry/i) ? true : false},
    ios: function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false},
    Windows: function(){return navigator.userAgent.match(/IEMobile/i) ? true : false},
    any: function(){return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Windows() || isMobile.XDM())},
    isWeixin:function(){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=='micromessenger')return true;
      else return false;
    },
    Alipay:function(){return navigator.userAgent.match(/AlipayClient/i) ? true : false},
    AlipayVersion:function(){
      var arr = navigator.userAgent.split(' ');
      var v = 'unknown-version';
      for(var i in arr){
        var e = arr[i];
        if(e.indexOf('AlipayClient/')>-1){
          v = e.substr(e.indexOf('/')+1);
          break;
        }
      }
      return v;
    },
    QQ:function(){
      if (navigator.userAgent.match(/MQQBrowser/i) )return false;
      return navigator.userAgent.match(/QQ/i) ? true : false;
    },
    Android23:function(){return navigator.userAgent.match(/Android 2.3/i) ? true : false},
    AppVersion :function(){
      var ua = navigator.userAgent.split(',');
      var version=-1;
      for(var i in ua) {
        var val = ua[i].split('=');
        if(val[0]=='version'){
          version = val[1];
          return false;
        }
      }
      return version;
    },
  };
}(Zepto);