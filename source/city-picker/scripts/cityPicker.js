/**
 * Created by charlie on 2017/2/13 0013.
 */

+ function($) {

  if($.xdmConfig.regionData){
    var regionData = $.xdmConfig.regionData;

    var citys = null;//按首字母分组的城市列表
    if(localStorage && localStorage.getItem("city-picker-data")){
      citys = JSON.parse(localStorage.getItem("city-picker-data"));
    }else {

      citys = {
        'hot': [], //热门地区
        'A': [],
        'B': [],
        'C': [],
        'D': [],
        'E': [],
        'F': [],
        'G': [],
        'H': [],
        //'I':[],
        'J': [],
        'K': [],
        'L': [],
        'M': [],
        'N': [],
        //'O':[],
        'P': [],
        'Q': [],
        'R': [],
        'S': [],
        'T': [],
        'U': [],
        //'V':[],
        'W': [],
        'X': [],
        'Y': [],
        'Z': []
      };
      $.xdmConfig.regionData.forEach(function (v, i, arr) {
        if (v.grade == 1) {         //省
                                    //provinces[value.shortSpelling[0].toUpperCase()].push(value);
        } else if (v.grade == 2) {  //市
          citys[v.shortSpelling.charAt(0).toUpperCase()].push(v);
          if (v.hot && v.hot != '0')citys.hot.push(v);
        }
      })
      localStorage.setItem("city-picker-data", JSON.stringify(citys));
    }
    /**
     * zepto扩展
     * @param callback  选中城市后的回调
     */
    $.fn.cityPicker = function(callback){
      var listHtml = '';  //所有区域列表dom
      var hotHtml = '';   //热门地区dom
      var quickIndex='';  //快速索引
      for(var j in citys){
        if(citys.hasOwnProperty(j)){
          quickIndex+='<li><a href="#city-group-'+j+'">'+ (j=='hot' ? '热门' : j) +'</a></li>';

          var letterGroupHtml = '';//按首字母分组生成的dom
          if(j!='hot'){
            letterGroupHtml+= '<dd>'+j+'</dd>';
          }else{
            hotHtml+= '<dd>热门城市</dd>';
          }
          citys[j].forEach(function(v, k , arr){
            if(j!='hot'){
              letterGroupHtml+= '<dt data-city-id="'+ v.id +'">'+ v.name +'</dt>';
            }else{
              hotHtml+= '<dt data-city-id="'+ v.id +'">'+ v.name +'</dt>';
            }
          });

          if(j!='hot'){
            listHtml+='<dl id="city-group-'+ j +'">'+ letterGroupHtml +'</dl>';
          }else{
            hotHtml='<dl id="city-group-'+ j +'">'+ hotHtml +'</dl>';
          }
        }
      }
      quickIndex = '<ul class="city-picker-index">'+ quickIndex +'</ul>';
      $(this).find('#all-city').html( listHtml );
      $(this).find('#hot-city').html( hotHtml );
      $(quickIndex).appendTo('body');

      //页面插入dom后绑定点击事件
      $(this).on("click", "dt", function(){
        if(callback)callback($(this).attr('data-city-id'), $(this).html());
      })
    };

  }else{
    alert("未获取到区域数据");
  }

}(Zepto);
