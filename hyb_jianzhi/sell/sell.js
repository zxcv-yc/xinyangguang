var app = getApp(), until = require("../../utils/util.js");

Page({
    data: {
        people: 9,
        erweima: "",
        haibaobj: "",
        t_status: !1,
        current: 0,
        none: [ {
            img: "/hyb_jianzhi/images/none_03.png",
            con: "暂无下级人脉"
        } ],
        none1: [ {
            img: "/hyb_jianzhi/images/none_02.png",
            con: "暂无收益明细"
        } ],
        titVal: 0
    },
    openerji: function(t) {
        this.getform(t.detail.formId), wx.navigateTo({
            url: "/hyb_jianzhi/erji/erji?id=" + t.currentTarget.dataset.id
        });
    },
    TabClick: function(t) {
        this.getform(t.detail.formId), this.setData({
            current: t.currentTarget.dataset.index
        });
    },
    switch_tab: function(t) {
        this.setData({
            cur: t.currentTarget.dataset.index
        });
    },
    changeTit: function(t) {
        this.setData({
            titVal: t.target.dataset.id
        });
    },
    closeModal: function(t) {
        this.getform(t.detail.formId), this.setData({
            t_status: !1,
            t_status2: !1
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
    erweima: function(t) {
        var i = this;
        i.getform(t.detail.formId);
        var a = i.data.erweima;
        console.log(a), i.setData({
            t_status2: !1
        }), wx.showLoading({
            title: "请等待"
        }), wx.getImageInfo({
            src: a,
            success: function(t) {
                var a = t.path;
                wx.getSystemInfo({
                    success: function(t) {
                        i.setData({
                            windowWidth: t.screenWidth,
                            windowHeight: t.screenHeight
                        });
                    }
                });
                var e = wx.createCanvasContext("mycanvas");
                e.drawImage(a, 0, 0, .5 * i.data.windowWidth, .5 * i.data.windowWidth), wx.hideLoading(), 
                i.setData({
                    t_status: !0
                }), setTimeout(function() {
                    e.draw();
                }, 100);
            }
        });
    },
    haibao: function(t) {
        var n = this;
        n.getform(t.detail.formId);
        var a = n.data.erweima, e = n.data.haibaobj;
        n.setData({
            t_status: !1
        }), wx.showLoading({
            title: "请等待"
        }), wx.getSystemInfo({
            success: function(t) {
                n.setData({
                    windowWidth: t.screenWidth,
                    windowHeight: t.screenHeight
                });
            }
        }), wx.getImageInfo({
            src: e,
            success: function(t) {
                var e = t.path, i = wx.createCanvasContext("canvass");
                wx.getImageInfo({
                    src: a,
                    success: function(t) {
                        var a = t.path;
                        i.drawImage(e, 0, 0, .7 * n.data.windowWidth, .7 * n.data.windowHeight), i.drawImage(a, (.7 * n.data.windowWidth - .5 * n.data.windowWidth) / 2, (.7 * n.data.windowHeight - .5 * n.data.windowWidth) / 2, .5 * n.data.windowWidth, .5 * n.data.windowWidth), 
                        wx.hideLoading(), n.setData({
                            t_status2: !0
                        }), setTimeout(function() {
                            i.draw();
                        }, 100);
                    }
                });
            }
        });
    },
    saveimg: function(t) {
        var e = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: t,
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: "确定保存该图片",
                    success: function(t) {
                        t.confirm && wx.saveImageToPhotosAlbum({
                            filePath: a.tempFilePath,
                            success: function(t) {
                                wx.showToast({
                                    title: "保存成功"
                                }), setTimeout(function() {
                                    e.setData({
                                        t_status: !1,
                                        t_status2: !1
                                    });
                                }, 1e3);
                            }
                        });
                    }
                });
            }
        });
    },
    sc1: function() {
        this.saveimg("mycanvas");
    },
    sc2: function() {
        this.saveimg("canvass");
    },
    onLoad: function(t) {
        var a = this, e = until.formatNumber(a.data.people);
        a.setData({
            people: e
        }), a.getUserfenxiao();
    },
    getUserfenxiao: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Userfenxiao",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                a.setData({
                    Userfenxiao: t.data.data,
                    erweima: t.data.data.fenxiaoma,
                    haibaobj: t.data.data.haibaobj
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
    // onShareAppMessage: function() {}
});