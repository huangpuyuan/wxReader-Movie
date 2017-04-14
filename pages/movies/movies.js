var util = require('../../utils/util.js');

var app = getApp();

Page({
	data: {
		//这是一个坑一定要初始化空值
		inTheathers: {},
		coming_soon: {},
		top250: {},
		searchResult: {},
		containerShow:true,
		searchPanelShow:false,
	},
	onLoad: function (event) {
		//正在热映，即将上映，Top250
		var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
		var coming_soonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
		var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

		this.getMovieListData(inTheatersUrl, "inTheathers", "正在热映");
		this.getMovieListData(coming_soonUrl, "coming_soon", "即将上映");
		this.getMovieListData(top250Url, "top250", "豆瓣Top250");
	},

	onMoreTap: function (event) {
		
		var category = event.currentTarget.dataset.category;
		wx.navigateTo({
			url: 'more-movie/more-movie?category=' + category

		})
	},

	onMovieTap:function(event){
		var movieId = event.currentTarget.dataset.movieid;
		wx.navigateTo({
			url: 'movie-detail/movie-detail?id=' + movieId

		})
	},

	getMovieListData: function (url, settedKey, categoryTitle) {
		var that = this;

		wx.request({
			url: url,
			method: 'GET',
			header: {
				//暂不能填入application/json 未知错误
				"Content-Type": "json"
			},
			success: function (res) {
				//console.log(res);
				that.processDoubanData(res.data, settedKey, categoryTitle);
			},
			fail: function (error) {
				console.log(error);
			}
		})
	},

	onCancelImgTap:function(){
		this.setData({
			containerShow:true,
			searchPanelShow:false,
			searchResult:{}
		})
	},
	onBindFoucs:function(event){
		this.setData({
			containerShow:false,
			searchPanelShow:true
		})
	},

	onBindBlur:function(event){
		//console.log(event);
		var text = event.detail.value;
		if(!text){
			this.onCancelImgTap();
		}else{		
		var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
		this.getMovieListData(searchUrl,"searchResult","");
		}
	},

	 onBindConfirm:function(event){
	 	this.onBindBlur(event);
	 },

	processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
		var movies = [];
		for (var idx in moviesDouban.subjects) {
			var subject = moviesDouban.subjects[idx];
			var title = subject.title;
			if (title.length > 7) {
				title = title.substring(0, 7) + "...";
			}
			//[1,1,1,1,1][1,1,1,2,0][1,1,1,0,0]			
			var temp = {
				title: title,
				average: subject.rating.average,
				coverageUrl: subject.images.large,
				movieId: subject.id,
				stars: util.convertToStarsArray(subject.rating.stars)
			}

			movies.push(temp);
		}
		//考验Js基本功的时候 动态属性赋值
		var readyData = {};
		readyData[settedKey] = {
			categoryTitle: categoryTitle,
			movies: movies
		};
		/*this.setData({
			movies:movies
		})*/
		this.setData(readyData);
	}


})