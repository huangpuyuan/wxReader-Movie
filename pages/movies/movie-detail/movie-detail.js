//ES6 让JavaScript重新焕发青春
import {Movie} from 'class/Movie.js';
var app =getApp();
//var util = require('../../../utils/util.js');
Page({
  data:{},
  onLoad:function(options){
     var movieId = options.id;
     var url = app.globalData.doubanBase +"/v2/movie/subject/" + movieId;
     //util.http(url,this.processDoubanData);
    var movie =new Movie(url);
    //var movieData =movie.getMovieData();错误！！这是一个异步的操作 必须使用回调函数的形式调用
    //var that = this;
    /*movie.getMovieData(function(movie){
      that.setData({
        movie:movie
      })
    })*/
    //使用箭头函数替换回调函数,箭头函数方法的当前环境
    movie.getMovieData( (movie) => {
      //箭头函数里面的this。类似C#、java、python。lambda表达式
      this.setData({
        movie:movie
      })
    })

  },

  viewMoviePostImg:function(e){
    var src = e.currentTarget.dataset.src;
    console.log(src);
      wx.previewImage({
        current:src,//当前显示图片的http链接
        urls:[src],//需要预览图片的http链接列表
        
      })

    
  }
})