+function($){
  var regionId={};
  $.fn.multiRegionPicker=function(){
    var regionData=$.xdmConfig.multiRegionData;
    for(i=0;i<regionData.length;i++){
      $(this).find(".province").append("<li data-regionId="+regionData[i].id+">"+regionData[i].text+"</li>");
    }
    var $province =$(this).find(".province");
    var provinceLength =$province.children().length;
    var $city=$(this).find(".city");
    var cityLength =$city.children().length;
    var $area=$(this).find(".area");
    var areaLength =$area.children().length;
    var maxLength=(provinceLength>cityLength?(provinceLength>areaLength?provinceLength:areaLength):(cityLength>areaLength?cityLength:areaLength));
    $province.scrollList(maxLength,function(regionId){
      $city.loadList(regionId);
      $city.scrollList(maxLength,function(regionId){
        $area.loadList(regionId);
        $area.scrollList(maxLength);
      });
    });
    //点击取消
    $(".cancel").click(function () {
      $(".region-modal-mask").hide();
      $(".region-multiple-picker-modal").css("transform","translate(0,18rem)");
    });
    //点击确定
    $(".confirm").click(function () {
      $(".region-modal-mask").hide();
      $(".region-multiple-picker-modal").css("transform","translate(0,18rem)");
      //弹出地区编号
      console.log(regionId);
    });
  };
  $.fn.scrollList=function(maxLength,callback){
    var start=0;
    var end=0;
    var lineHeight=3;                                                   //一格选项的行高
    var List=this;
    var regionLevel=List.attr("data-region");
    var listChildren=List.children();
    var listLength=listChildren.length;                                 //滚动项目的子元素的长度
    var rem = parseInt($("html").css("font-size"));
    var position=(listLength-maxLength+2)*lineHeight;
    listChildren.eq(0).addClass("selected");                            //默认首个选项选中
    regionId[regionLevel]=listChildren.eq(0).attr("data-regionId");
    List.css("transform","translate(0,"+position+"rem)");
    if(callback){
      callback(regionId);
    }
    List.bind("touchstart",function (event) {
      var touch=event.changedTouches[0];
      start = touch.pageY;
    });
    List.bind("touchmove",function (event) {
      var touch = event.changedTouches[0];
      end = touch.pageY;
      //根据touch移动距离，translate <ul> (除2为滑动灵敏度)
      var moving = position-(start-end)/rem/2;
      List.css("transform","translate(0,"+moving+"rem)");
      //去除选中项样式
      List.find(".selected").removeClass("selected");
    });
    List.bind("touchend",function (event) {
      //若有移动
      if(end!=0){
        //移动距离取整(除2为滑动灵敏度)
        position -= Math.floor((start-end)/rem/2/lineHeight)*lineHeight;
        List.css("transform","translate(0,"+position+"rem)");
        //如果移动后，位置大于最后一个选项的位置，回到最后一个的位置
        if(position<-(maxLength-3)*lineHeight){
          List.css("transform","translate(0,-"+(maxLength-3)*lineHeight+"rem)");
          position = -(maxLength-3)*lineHeight;
          listChildren.eq(listLength-1).addClass("selected");
          regionId[regionLevel]=listChildren.eq(listLength-1).attr("data-regionId");
        }
        //如果移动后，位置小于第一个的位置，回到第一个
        else if(position>(listLength-maxLength+2)*lineHeight){
          List.css("transform","translate(0,"+(listLength-maxLength+2)*lineHeight+"rem)");
          position = (listLength-maxLength+2)*lineHeight;
          listChildren.eq(0).addClass("selected");
          regionId[regionLevel]=listChildren.eq(0).attr("data-regionId");
        }else{
          listChildren.eq((listLength-maxLength)-position/lineHeight+2).addClass("selected");
          regionId[regionLevel]=listChildren.eq((listLength-maxLength)-position/lineHeight+2).attr("data-regionId");
        }
        if(callback) {
          callback(regionId);
        }
      }
      //touch結束清零
      start=0;
      end=0;
    });
  };
  $.fn.loadList=function (region) {
    var regionData=$.xdmConfig.multiRegionData;
    var regionLevel=$(this).attr("data-region");
    $(this).empty();
    if(regionLevel=="province"){
      for(i=0;i<regionData.length;i++){
        $(this).append("<li data-regionId="+regionData[i].id+">"+regionData[i].text+"</li>");
      }
    }else if($(this).attr("data-region")=="city") {
      var proId=region.province;
      for(i=0;i<regionData.length;i++){
        if(regionData[i].id==proId){
          for (j=0;j<regionData[i].sub.length;j++){
            $(this).append("<li data-regionId="+regionData[i].sub[j].id+">"+regionData[i].sub[j].text+"</li>");
          }
          break;
        }
      }
    }else if($(this).attr("data-region")=="area") {
      var proId=region.province;
      var cityId=region.city;
      for(i=0;i<regionData.length;i++){
        if(regionData[i].id==proId){
          for (j=0;j<regionData[i].sub.length;j++){
            if(regionData[i].sub[j].id==cityId){
              for (k=0;k<regionData[i].sub[j].sub.length;k++){
                $(this).append("<li data-regionId="+regionData[i].sub[j].sub[k].id+">"+regionData[i].sub[j].sub[k].text+"</li>");
              }
            }
          }
        }
      }
    }
  };


}(Zepto);