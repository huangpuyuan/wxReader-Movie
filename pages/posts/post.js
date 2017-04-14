var postsData = require('../../data/posts-data.js')

Page({
  data: { 
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
  },
  onLoad: function (options) {

    // this.data.postList = postsData.postList
    // 如果异步操作的时候一定得用setData
    this.setData({
       postList:postsData.postlist
      });
  },

  onPostTap:function(event){
    //event的方式
    var postId = event.currentTarget.dataset.postid;
    //console.log("postId",postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+ postId
      
    })
  },

  /*onSwiperItemTap:function(event){
    var postId = event.currentTarget.dataset.postid;    
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+ postId
      
    })
  },*/

  onSwiperTap:function(event){
    //target 和currentTarget
    //target指的是当前点击的组件 和currentTarget事情捕获的组件
    //target是image ，currentTarget指的是swiper组件
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+ postId
      
    })
  }

})