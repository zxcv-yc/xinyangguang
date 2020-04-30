var app = getApp();

Page({
    data: {
        jscode: "",
        jsonData: "",
        isShowtip: !1,
        tip: "",
        idDisb: !0,
        user_code: ""
    },
    onLoad: function(t) {
        this.setData({
            user_code: t.scene ? t.scene : "0"
        });
    },
    formSubmit: function(e) {
        var s = this;
        s.data.idDisb && (s.setData({
            idDisb: !1
        }), wx.showNavigationBarLoading(), wx.login({
            success: function(t) {
                t.code ? (s.setData({
                    jscode: t.code
                }), wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] && wx.getUserInfo({
                            success: function(t) {
                                var a = {
                                    appkey: wx.getStorageSync("t_appkey"),
                                    wx_code: s.data.jscode,
                                    iv: t.iv,
                                    jsondata: t.encryptedData,
                                    uuid: wx.getStorageSync("t_uuid"),
                                    formid: e.detail.formId,
                                    user_code: s.data.user_code,
                                    rawdata: t.rawData
                                };
                                wx.request({
                                    url: "https://openapi.xiaoshentui.com/Main/action/Pushmsg/Pushmsg/form_id",
                                    data: a,
                                    method: "POST",
                                    header: {
                                        "content-type": "application/json"
                                    },
                                    success: function(t) {
                                        200 == t.data.code ? (s.setData({
                                            idDisb: !0
                                        }), s.setData({
                                            isShowtip: !0,
                                            tip: t.data.message || "获取成功，请关闭小程序继续体验推送吧！"
                                        })) : s.setData({
                                            isShowtip: !0,
                                            idDisb: !0,
                                            tip: t.data.message
                                        }), setTimeout(function() {
                                            s.setData({
                                                tip: "",
                                                isShowtip: !1
                                            });
                                        }, 1500), wx.hideNavigationBarLoading();
                                    }
                                });
                            },
                            fail: function() {
                                s.setData({
                                    idDisb: !0
                                });
                            }
                        });
                    }
                })) : s.setData({
                    jscode: ""
                });
            }
        }));
    }
});