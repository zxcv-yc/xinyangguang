var app = getApp();

Page({
    data: {
        id: "",
        vipnames: "地方士大夫但是",
        prices: 0,
        vip: [ {
            types: "月会员",
            price: "1100",
            renzheng: !1,
            shuoming: [ "优惠发布", "免费刷新置顶", "信息免审核" ]
        }, {
            types: "年会员",
            price: "2100",
            renzheng: !1,
            shuoming: [ "优惠发布", "免费刷新置顶", "信息免审核" ]
        } ]
    },
    selvip: function(t) {
        for (var e = this.data.list, n = t.currentTarget.dataset.dex, a = 0; a < e.length; a++) e[a].renzheng = !1;
        e[n].renzheng = !0, this.setData({
            list: e,
            vipnames: e[n].title,
            prices: e[n].money,
            id: t.currentTarget.dataset.id
        });
    },
    getform: function(t) {
        console.log(t), app.util.request({
            url: "entry/wxapp/Formid",
            data: {
                openid: wx.getStorageSync("openid"),
                formid: t
            },
            success: function(t) {}
        });
    },
    submitVIP: function(t) {
        var e = this;
        e.getform(t.detail.formId);
        var n = e.data.prices, a = e.data.id;
        null != a && "" != a ? 0 < n ? app.util.request({
            url: "entry/wxapp/Pay",
            data: {
                openid: wx.getStorageSync("openid"),
                zhiding_money: n
            },
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: t.data.signType,
                    paySign: t.data.paySign,
                    success: function(t) {
                        app.util.request({
                            url: "entry/wxapp/Hyyhbl",
                            data: {
                                openid: wx.getStorageSync("openid"),
                                id: a
                            },
                            success: function(t) {
                                wx.showToast({
                                    title: "办理成功"
                                }), setTimeout(function() {
                                    wx.navigateTo({
                                        url: "/hyb_jianzhi/my/my"
                                    });
                                }, 1e3);
                            }
                        });
                    }
                });
            }
        }) : app.util.request({
            url: "entry/wxapp/Hyyhbl",
            data: {
                openid: wx.getStorageSync("openid"),
                id: a
            },
            success: function(t) {
                wx.showToast({
                    title: "办理成功"
                }), setTimeout(function() {
                    wx.navigateTo({
                        url: "/hyb_jianzhi/my/my"
                    });
                }, 1e3);
            }
        }) : wx.showToast({
            title: "请选择会员类型",
            image: "/hyb_jianzhi/images/errors.png"
        });
    },
    onLoad: function(t) {
        this.getHuiyuan();
    },
    getHuiyuan: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Huiyuan",
            data: {
                type: "用户会员"
            },
            success: function(t) {
                for (var e = t.data.data, n = 0; n < e.length; n++) e[n].renzheng = !1;
                console.log(e), a.setData({
                    list: t.data.data
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