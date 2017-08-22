/**
 * Created by qiangxl on 2017/3/9.
 */
+ function($){
  $.fn.dialog=function (params) {


    /**
     * 对话框默认配置
     * @param closeBtn {boolean} 是否需要右上角的关闭按钮,
     * @param closeBtnCallback {function} 关闭按钮的回調,
     * @param title {string} 標題的文本,
     * @param txt {string} 内容的文本,
     * @param btn {int} 按钮个数,
     *             0  无按钮，
     *             1  一个按钮，
     *             2  两个按钮
     * @param cancelTxt {string} 左下角取消按钮的文本,
     * @param cancelCallback {function} 取消按钮回调,
     * @param confirmTxt {string} 确定按钮文本,
     * @param confirmCallback {function} 确定按钮回调
     **/

    var defaults={
      closeBtn:true,
      closeBtnCallback:function () {
      },
      title:'',
      txt:'',
      btn:2,
      cancelTxt:'取消',
      cancelCallback:function () {
      },
      confirmTxt:'确定',
      confirmCallback:function () {
      }
    };
    var config = $.extend(defaults, params);

    var modalBox= $("#modal-box");
    if(!modalBox.length){
      $("body").append("<div class='modal-box' id='modal-box'><div class='dialog-box'></div></div>");
    }else{
      modalBox.show();
    }

    var dialog = $(".dialog-box");

    //是否需要关闭按钮
    if(config.closeBtn){
      var closeBtn=$(".close-btn");
      if(!closeBtn.length){
        dialog.append("<i class='close-btn'></i>");
      }else {
        closeBtn.show();
      }
      $(".close-btn").click(function () {
        config.closeBtnCallback();
        $("#modal-box").hide();
      })
    }else{
      $(".close-btn").hide();
    }

    var txtBox = $(".txt-box");
    if(!txtBox.length){
      dialog.append("<div class='txt-box'></div>");
    }

    //是否有标题
    if(config.title!=='') {
      if($(".dialog-title").length){
        $(".dialog-title").text(config.title);
      }else{
        $(".txt-box").append("<h3 class='dialog-title'>"+config.title+"</h3>");
      }
    }else {
      $(".dialog-title").text(config.title);
    }

    //是否有内容
    if(config.txt!==''){
      if($(".dialog-txt").length) {
        $(".dialog-txt").text(config.txt);
      }else{
        $(".txt-box").append("<div class='dialog-txt'>" + config.txt + "</div>");
      }
    }else {
      $(".dialog-txt").text(config.txt);
    }

    var btnBox=$(".btn-box");
    if(!btnBox.length){
      dialog.append("<div class='btn-box'></div>");
    }

    //按钮个数
    if(config.btn==0){
      $(".btn-box").children().remove();
    }else if(config.btn==1) {
      $(".btn-box").children().remove();
      $(".btn-box").append("<a href='javascript:void(0)' class='oneBtn' >"+config.confirmTxt+"</a>");

      //单按钮确认回调
      $(".oneBtn").click(function () {
        config.confirmCallback();
        $("#modal-box").hide();
      });
    }else if(config.btn==2){
      $(".btn-box").children().remove();
      $(".btn-box").append("<a href='javascript:void(0)' class='cancelBtn'>"+config.cancelTxt+"</a> <a href='javascript:void(0)' class='confirmBtn'>"+config.confirmTxt+"</a>");

      //取消按钮回调
      $(".cancelBtn").click(function () {
        config.cancelCallback();
        $("#modal-box").hide();
      });
      //确认按钮回调
      $(".confirmBtn").click(function () {
        config.confirmCallback();
        $("#modal-box").hide();
      });
    }

  }
}(Zepto);