/**
 * Created by qiangxl on 2017/3/9.
 */

+ function($){
  $.fn.toast=function (txt,callback,noClose) {
    if(!$(".toast-box").length){
      $("body").append('<div class="toast-box"><div class="toast-body"><div class="toast-tips "> <div class="showToastCon"></div> </div> </div> </div>');
    }

    $(".toast-box").css("display","block");

    $(".toast-box .showToastCon").text(txt);

    if(!noClose){
      setTimeout(function () {
        $(".toast-box").css("display","none");
        if(callback){
          callback();
        }
      },2000);
    }else{
      if(callback){
        callback();
      }
    }



  }
}(Zepto);