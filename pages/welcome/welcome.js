Page({
    onContainerTap:function(){

    	// wx.navigateTo({
        //     url:"../posts/post"
        // });
        
        wx.switchTab({
            url: "../posts/post"
        });

       //console.log("Execute onContainerTap");
    }
})