var app = getApp();

Page({
    data: {
        none: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无评论"
        } ]
    },
    onLoad: function(n) {
        this.getUserpinglun();
    },
    getUserpinglun: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Userpinglun",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(n) {
                t.setData({
                    list: n.data.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});