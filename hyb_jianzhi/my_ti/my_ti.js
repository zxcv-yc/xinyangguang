var app = getApp();

Page({
    data: {
        yonghu: "",
        checked: !1,
        zffs: [ "微信" ],
        sel: "微信",
        disabled: !0
    },
    radioChange: function(e) {
        console.log(e.detail.value), this.setData({
            sel: e.detail.value
        });
    },
    onLoad: function(e) {
        var t = this, a = e.yonghu;
        t.setData({
            yonghu: a
        }), "用户" == a ? t.getUser() : "商家" == a && t.getShangjiainfo();
    },
    getUser: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/User",
            data: {
                openid: wx.getStorageSync("openid"),
                yonghu: t.data.yonghu
            },
            success: function(e) {
                t.setData({
                    userinfo: e.data.data
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
            success: function(e) {
                t.setData({
                    shangjiainfo: e.data.data
                });
            }
        });
    },
    mingClick: function() {
        wx.navigateTo({
            url: "/hyb_jianzhi/mingxi/mingxi"
        });
    },
    xuzhi: function() {
        wx.navigateTo({
            url: "/hyb_jianzhi/xuzhi/xuzhi"
        });
    },
    getform: function(e) {
        console.log(e), app.util.request({
            url: "entry/wxapp/Formid",
            data: {
                openid: wx.getStorageSync("openid"),
                formid: e
            },
            success: function(e) {}
        });
    },
    subClick: function(e) {
        var t = this;
        t.getform(e.detail.formId);
        var a = e.detail.value;
        a.openid = wx.getStorageSync("openid"), "用户" == a.yonghu ? "" == a.money ? wx.showToast({
            title: "请输入提现金额",
            image: "/hyb_jianzhi/images/errors.png"
        }) : a.u_money - a.money < 0 ? wx.showToast({
            title: "提现金额过大",
            image: "/hyb_jianzhi/images/errors.png"
        }) : a.money < 2 ? wx.showModal({
            title: "提示",
            content: "最低提现金额为2元"
        }) : "支付宝" == a.typs ? "" == a.zfb_name ? wx.showToast({
            title: "请输入支付宝姓名",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == a.zfb_zhanghao ? wx.showToast({
            title: "请输入支付宝账号",
            image: "/hyb_jianzhi/images/errors.png"
        }) : (t.setData({
            disabled: !1
        }), app.util.request({
            url: "entry/wxapp/Usertixian",
            data: a,
            success: function(e) {
                wx.showToast({
                    title: "提现成功!请等待"
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "/hyb_jianzhi/my/my"
                    });
                }, 1e3);
            }
        })) : "微信" == a.typs && (t.setData({
            disabled: !1
        }), app.util.request({
            url: "entry/wxapp/Usertixian",
            data: a,
            success: function(e) {
                wx.showToast({
                    title: "提现成功"
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "/hyb_jianzhi/my/my"
                    });
                }, 1e3);
            }
        })) : "商家" == a.yonghu && ("" == a.money ? wx.showToast({
            title: "请输入提现金额",
            image: "/hyb_jianzhi/images/errors.png"
        }) : a.s_money - a.money < 0 ? wx.showToast({
            title: "提现金额过大",
            image: "/hyb_jianzhi/images/errors.png"
        }) : a.money < 2 ? wx.showModal({
            title: "提示",
            content: "最低提现金额为2元"
        }) : "支付宝" == a.typs ? "" == a.zfb_name ? wx.showToast({
            title: "请输入支付宝姓名",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == a.zfb_zhanghao ? wx.showToast({
            title: "请输入支付宝账号",
            image: "/hyb_jianzhi/images/errors.png"
        }) : (t.setData({
            disabled: !1
        }), app.util.request({
            url: "entry/wxapp/Usertixian",
            data: a,
            success: function(e) {
                wx.showToast({
                    title: "提现成功!请等待"
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "/hyb_jianzhi/my/my"
                    });
                }, 1e3);
            }
        })) : "微信" == a.typs && (t.setData({
            disabled: !1
        }), app.util.request({
            url: "entry/wxapp/Usertixian",
            data: a,
            success: function(e) {
                wx.showToast({
                    title: "提现成功"
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "/hyb_jianzhi/my/my"
                    });
                }, 1e3);
            }
        })));
    },
    onShareAppMessage: function() {}
});