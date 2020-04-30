var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        this.getShangjiainfo();
    },
    getShangjiainfo: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Shangjiainfo",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(n) {
                t.setData({
                    shangjiainfo: n.data.data
                });
            }
        });
    },
    tiClick: function(n) {
        this.getform(n.detail.formId), wx.navigateTo({
            url: "/hyb_jianzhi/my_ti/my_ti?yonghu=商家"
        });
    },
    chongzhi: function(n) {
        this.getform(n.detail.formId), wx.navigateTo({
            url: "../chongzhi/chongzhi"
        });
    },
    getform: function(n) {
        console.log(n), app.util.request({
            url: "entry/wxapp/Formid",
            data: {
                openid: wx.getStorageSync("openid"),
                formid: n
            },
            success: function(n) {}
        });
    },
    jiedong: function(n) {
        this.getform(n.detail.formId), 0 == n.currentTarget.dataset.money ? wx.showModal({
            title: "提示",
            content: "您的可解冻金额为0"
        }) : app.util.request({
            url: "entry/wxapp/Jiedong",
            data: {
                openid: wx.getStorageSync("openid"),
                money: n.currentTarget.dataset.money
            },
            success: function(n) {
                wx.showToast({
                    title: "解冻成功审核中"
                }), setTimeout(function() {
                    wx.navigateTo({
                        url: "/hyb_jianzhi/shop/shop"
                    });
                }, 1e3);
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