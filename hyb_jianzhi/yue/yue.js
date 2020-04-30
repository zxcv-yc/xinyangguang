var app = getApp(), WxParse = require("../wxParse/wxParse.js");

Page({
    data: {},
    onLoad: function(n) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/base",
            success: function(n) {
                WxParse.wxParse("article", "html", n.data.data.xuzhi, a, 5);
            }
        });
    },
    fanhui: function() {
        wx.navigateBack({
            delta: 1
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