var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        console.log("yyyyy");
        this.getUsertx();
    },
    getUsertx: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Usertx",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(o) {
                console.log(o), o.data.data.u_money || (o.data.data.u_money = 0), o.data.data.shouyimoney || (o.data.data.shouyimoney = 0), 
                t.setData({
                    list: o.data.data
                });
            }
        });
    },
    getform: function(o) {
        console.log(o), app.util.request({
            url: "entry/wxapp/Formid",
            data: {
                openid: wx.getStorageSync("openid"),
                formid: o
            },
            success: function(o) {}
        });
    },
    tiClick: function(o) {
        this.getform(o.detail.formId), wx.navigateTo({
            url: "/hyb_jianzhi/my_ti/my_ti?yonghu=用户"
        });
    },
    onReady: function() {
        console.log("yyyyy");
    },
    onShow: function() {
        console.log("yyyyy");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});