var app = getApp();

Page({
    data: {
        myListArr: [ {
            img: "../images/icon_09.png",
            con: "我的钱包",
            btn: "walletClick"
        }, {
            img: "../images/icon_14.png",
            con: "发布兼职",
            btn: "shopReleaseClick"
        }, {
            img: "../images/icon_15.png",
            con: "我的评价",
            btn: "pinglunClick"
        }, {
            img: "../images/addvip.png",
            con: "VIP特权申请",
            btn: "addvip"
        } ],
        userinfo: [],
        s_id: "",
        close: !1,
        shopinfo: ""
    },
    addvip: function(a) {
        this.getform(a.detail.formId), wx.navigateTo({
            url: "../addvip/addvip"
        });
    },
    onLoad: function(a) {
        var t = this;
        t.getShangjiainfo(), app.util.request({
            url: "entry/wxapp/User",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                t.setData({
                    userinfo: a.data.data
                });
            }
        });
    },
    getShangjiainfo: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Shangjiainfo",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                console.log(a), t.setData({
                    is_hy: a.data.data.hy,
                    s_id: a.data.data.s_id,
                    shopinfo: a.data.data
                }), 0 == a.data.data.s_status ? t.setData({
                    close: !0
                }) : null == a.data.data.s_address ? wx.showModal({
                    title: "提示",
                    content: "您还未入驻商家",
                    success: function(a) {
                        a.confirm ? wx.reLaunch({
                            url: "/hyb_jianzhi/shop_edit/shop_edit?typs=ruzhu"
                        }) : wx.reLaunch({
                            url: "/hyb_jianzhi/my/my"
                        });
                    }
                }) : "待审核" == a.data.data.s_typs ? wx.showModal({
                    title: "提示",
                    content: "商家审核中",
                    success: function(a) {
                        a.confirm, wx.reLaunch({
                            url: "/hyb_jianzhi/index/index"
                        });
                    }
                }) : a.data.data.jiezhi <= 0 ? wx.showModal({
                    title: "提示",
                    content: "商家入驻到期",
                    success: function(a) {
                        a.confirm, wx.reLaunch({
                            url: "/hyb_jianzhi/my/my"
                        });
                    }
                }) : t.setData({
                    shangjiainfo: a.data.data
                });
            }
        });
    },
    getform: function(a) {
        console.log(a), app.util.request({
            url: "entry/wxapp/Formid",
            data: {
                openid: wx.getStorageSync("openid"),
                formid: a
            },
            success: function(a) {}
        });
    },
    payClick: function(a) {
        this.getform(a.detail.formId), app.util.request({
            url: "entry/wxapp/Base",
            success: function(a) {
                0 < a.data.data.dp_money ? app.util.request({
                    url: "entry/wxapp/Pay",
                    data: {
                        openid: wx.getStorageSync("openid"),
                        zhiding_money: a.data.data.dp_money
                    },
                    header: {
                        "Content-Type": "application/json"
                    },
                    success: function(a) {
                        wx.requestPayment({
                            timeStamp: a.data.timeStamp,
                            nonceStr: a.data.nonceStr,
                            package: a.data.package,
                            signType: a.data.signType,
                            paySign: a.data.paySign,
                            success: function(a) {
                                app.util.request({
                                    url: "entry/wxapp/Rusave",
                                    data: {
                                        openid: wx.getStorageSync("openid"),
                                        zhiding_money: a.data.data.dp_money
                                    },
                                    success: function(a) {
                                        wx.showToast({
                                            title: "续费成功"
                                        });
                                    }
                                });
                            }
                        });
                    }
                }) : app.util.request({
                    url: "entry/wxapp/Rusave",
                    data: {
                        openid: wx.getStorageSync("openid"),
                        zhiding_money: a.data.data.dp_money
                    },
                    success: function(a) {
                        wx.showToast({
                            title: "续费成功"
                        });
                    }
                });
            }
        });
    },
    pinglunClick: function(a) {
        this.getform(a.detail.formId), wx.navigateTo({
            url: "/hyb_jianzhi/pinglun/pinglun"
        });
    },
    editClick: function(a) {
        this.getform(a.detail.formId), wx.navigateTo({
            url: "/hyb_jianzhi/shop_edit/shop_edit?typs=xiugai"
        });
    },
    applyClick: function(a) {
        this.getform(a.detail.formId);
        var t = a.currentTarget.dataset.index;
        wx.navigateTo({
            url: "/hyb_jianzhi/shop_apply/shop_apply?index=" + t
        });
    },
    walletClick: function(a) {
        this.getform(a.detail.formId), wx.navigateTo({
            url: "/hyb_jianzhi/shop_wallet/shop_wallet"
        });
    },
    shopReleaseClick: function(a) {
        this.getform(a.detail.formId), wx.navigateTo({
            url: "/hyb_jianzhi/shop_release/shop_release?typs=发布"
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getShangjiainfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});