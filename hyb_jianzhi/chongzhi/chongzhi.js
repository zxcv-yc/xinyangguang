var app = getApp();

Page({
    data: {},
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
    subClick: function(n) {
        this.getform(n.detail.formId);
        var t = n.detail.value.chongzhi;
        "0" == t || "" == t ? wx.showToast({
            title: "请输入充值金额",
            image: "/hyb_jianzhi/images/errors.png"
        }) : app.util.request({
            url: "entry/wxapp/Pay",
            data: {
                openid: wx.getStorageSync("openid"),
                zhiding_money: t
            },
            header: {
                "Content-Type": "application/json"
            },
            success: function(n) {
                wx.requestPayment({
                    timeStamp: n.data.timeStamp,
                    nonceStr: n.data.nonceStr,
                    package: n.data.package,
                    signType: n.data.signType,
                    paySign: n.data.paySign,
                    success: function(n) {
                        app.util.request({
                            url: "entry/wxapp/Sjcz",
                            data: {
                                openid: wx.getStorageSync("openid"),
                                money: t
                            },
                            success: function(n) {
                                wx.showToast({
                                    title: "充值成功"
                                }), setTimeout(function() {
                                    wx.navigateTo({
                                        url: "/hyb_jianzhi/shop/shop"
                                    });
                                }, 1e3);
                            }
                        });
                    }
                });
            }
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});