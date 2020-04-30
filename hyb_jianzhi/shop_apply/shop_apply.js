var app = getApp();

Page({
    data: {
        navArr: [ {
            con: "待审核"
        }, {
            con: "已发布"
        }, {
            con: "待录用"
        }, {
            con: "待到岗"
        }, {
            con: "已到岗"
        }, {
            con: "已结算"
        } ],
        current: 0,
        none: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无待审核信息"
        } ],
        none1: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无已发布信息"
        } ],
        none2: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无待录用信息"
        } ],
        none3: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无待到岗信息"
        } ],
        none4: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无已到岗信息"
        } ],
        none5: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无已结算信息"
        } ],
        list: []
    },
    onLoad: function(a) {
        var t = a.index;
        this.setData({
            current: t
        }), this.getShangjiajianzhi(t);
    },
    navTab: function(a) {
        var t = this;
        t.getform(a.detail.formId);
        var e = a.currentTarget.dataset.index;
        t.setData({
            current: e
        }), console.log(1), t.getShangjiajianzhi(e);
    },
    getShangjiajianzhi: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Shangjiajianzhi",
            data: {
                openid: wx.getStorageSync("openid"),
                current: a
            },
            success: function(a) {
                console.log(a.data.data), t.setData({
                    list: a.data.data
                });
            }
        });
    },
    Save: function(a) {
        this.getform(a.detail.formId);
        var t = a.currentTarget.dataset.f_id;
        wx.navigateTo({
            url: "/hyb_jianzhi/shop_release/shop_release?f_id=" + t + "&typs=编辑"
        });
    },
    Update: function(a) {
        var t = this;
        t.getform(a.detail.formId);
        var e = a.currentTarget.dataset.f_issj, n = a.currentTarget.dataset.f_id;
        app.util.request({
            url: "entry/wxapp/Jianzhi_update",
            data: {
                f_id: n,
                status: e
            },
            success: function() {
                t.getShangjiajianzhi(t.data.current);
            }
        });
    },
    Del: function(a) {
        var t = this;
        t.getform(a.detail.formId);
        var e = a.currentTarget.dataset.f_id;
        app.util.request({
            url: "entry/wxapp/Jianzhi_del",
            data: {
                f_id: e
            },
            success: function() {
                t.getShangjiajianzhi(t.data.current);
            }
        });
    },
    zhi: function(a) {
        var r = this;
        r.getform(a.detail.formId);
        var s = a.currentTarget.dataset.f_id;
        app.util.request({
            url: "entry/wxapp/Shangjiainfo",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                console.log(a);
                var i = a.data.data.hy, o = a.data.data;
                app.util.request({
                    url: "entry/wxapp/Base",
                    success: function(a) {
                        var t = a.data.data.zd_money;
                        console.log(t);
                        var e = a.data.data.pt_zd;
                        if (0 != i && "false" != i || 1 != e) if (0 != i && "false" != i || 0 != e && "" != e) {
                            var n = t * parseFloat(o.zd_zk) / 100;
                            wx.showModal({
                                title: "提示",
                                content: "是否将此兼职置顶一天",
                                success: function(a) {
                                    a.confirm && (0 != n ? app.util.request({
                                        url: "entry/wxapp/Pay",
                                        data: {
                                            openid: wx.getStorageSync("openid"),
                                            zhiding_money: n
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
                                                        url: "entry/wxapp/Jianzhi_zhi",
                                                        data: {
                                                            f_id: s
                                                        },
                                                        success: function() {
                                                            wx.showToast({
                                                                title: "置顶成功"
                                                            }), setTimeout(function() {
                                                                r.getShangjiajianzhi(r.data.current);
                                                            }, 1e3);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }) : app.util.request({
                                        url: "entry/wxapp/Jianzhi_zhi",
                                        data: {
                                            f_id: s
                                        },
                                        success: function() {
                                            wx.showToast({
                                                title: "置顶成功"
                                            }), setTimeout(function() {
                                                r.getShangjiajianzhi(r.data.current);
                                            }, 1e3);
                                        }
                                    }));
                                }
                            });
                        } else wx.showModal({
                            title: "提示",
                            content: "会员才可置顶，是否立即办理",
                            success: function(a) {
                                a.confirm && wx.navigateTo({
                                    url: "/hyb_jianzhi/addvip/addvip"
                                });
                            }
                        }); else wx.showModal({
                            title: "提示",
                            content: "是否将此兼职置顶一天",
                            success: function(a) {
                                a.confirm && (0 != t ? app.util.request({
                                    url: "entry/wxapp/Pay",
                                    data: {
                                        openid: wx.getStorageSync("openid"),
                                        zhiding_money: t
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
                                                    url: "entry/wxapp/Jianzhi_zhi",
                                                    data: {
                                                        f_id: s
                                                    },
                                                    success: function() {
                                                        wx.showToast({
                                                            title: "置顶成功"
                                                        }), setTimeout(function() {
                                                            r.getShangjiajianzhi(r.data.current);
                                                        }, 1e3);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }) : app.util.request({
                                    url: "entry/wxapp/Jianzhi_zhi",
                                    data: {
                                        f_id: s
                                    },
                                    success: function() {
                                        wx.showToast({
                                            title: "置顶成功"
                                        }), setTimeout(function() {
                                            r.getShangjiajianzhi(r.data.current);
                                        }, 1e3);
                                    }
                                }));
                            }
                        });
                    }
                });
            }
        });
    },
    qzhi: function(a) {
        var t = this;
        t.getform(a.detail.formId);
        var e = a.currentTarget.dataset.f_id;
        app.util.request({
            url: "entry/wxapp/Jianzhi_qzhi",
            data: {
                f_id: e
            },
            success: function() {
                t.getShangjiajianzhi(t.data.current);
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
    applyDetailClick: function(a) {
        this.getform(a.detail.formId);
        var t = a.currentTarget.dataset.f_id, e = a.currentTarget.dataset.state;
        wx.navigateTo({
            url: "/hyb_jianzhi/shop_apply_detail/shop_apply_detail?f_id=" + t + "&state=" + e
        });
    },
    onShow: function() {
        this.getShangjiajianzhi(this.data.current);
    },
    onShareAppMessage: function() {}
});