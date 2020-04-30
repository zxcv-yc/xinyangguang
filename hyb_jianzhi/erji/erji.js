var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var o = n.id;
        console.log(o), this.getUserfenxiaoerji(o);
    },
    getUserfenxiaoerji: function(n) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Userfenxiaoerji",
            data: {
                id: n
            },
            success: function(n) {
                o.setData({
                    Userfenxiao: n.data.data
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