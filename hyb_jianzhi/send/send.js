var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        f_id: "",
        openid: "",
        userAge: "",
        index: 0,
        toggle: true,
        worktime:[],
        checkworktime:[]
    },
    onLoad: function(a) {
        var n = this;
        app.util.request({
            url: "entry/wxapp/User",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                var e = a.data.data.u_chusheng, t = new Date().getFullYear() - e.split("-")[0];
                n.setData({
                    user: a.data.data,
                    userAge: t
                });
            }
        });
        var e = a.f_id;

        n.getWorkDate(e)

        n.setData({
            f_id: e,
            openid: wx.getStorageSync("openid")
        });
    },
    inputClick: function(a) {
        var e = a.detail.cursor;
        this.setData({
            index: e
        });
    },
    subClick: function(a) {
        var e = a.detail.value;

        // console.log(e)

        // return;
        var _this = this;
        var worktime = _this.data.checkworktime
        if (worktime.length <=0 ){
          wx.showToast({
            title: "请选择工作日期",
            image: "/hyb_jianzhi/images/errors.png"
          })
          return;
        }

        e.worktime = worktime;

        "" == e.youdian ? wx.showToast({
            title: "请输入优点",
            image: "/hyb_jianzhi/images/errors.png"
        }) : (this.setData({
            toggle: true
        }), app.util.request({
            url: "entry/wxapp/Userbaiming",
            data: {
                openid: wx.getStorageSync("openid"),
                f_id: this.data.f_id,
                worktime:worktime
            },
            success: function(a) {
                console.log(a)
                // return;
                if ("false" != a.data.data.baoming || "0" != a.data.data.money && "" != a.data.data.money) "false" != a.data.data.baoming || "0" == a.data.data.money && "" == a.data.data.money ? "true" == a.data.data.baoming && wx.showToast({
                    title: a.data.data.message,
                    icon:'none'
                }) : app.util.request({
                    url: "entry/wxapp/Pay",
                    data: {
                        openid: wx.getStorageSync("openid"),
                        zhiding_money: a.data.data.money
                    },
                    header: {
                        "Content-Type": "application/json"
                    },
                    success: function(a) {
                        console.log(a);
                        wx.requestPayment({
                            timeStamp: a.data.timeStamp,
                            nonceStr: a.data.nonceStr,
                            package: a.data.package,
                            signType: a.data.signType,
                            paySign: a.data.paySign,
                            success: function(a) {
                                console.log(a)
                                util.formatTime(new Date());
                                app.util.request({
                                    url: "entry/wxapp/Baoming",
                                    data: e,
                                    success: function(a) {
                                        console.log(a), wx.showToast({
                                            title: "报名成功!",
                                            success: function(a) {
                                                console.log(a), setTimeout(function() {
                                                    wx.reLaunch({
                                                        url: "/hyb_jianzhi/success/success"
                                                    });
                                                }, 1e3);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }); else {
                    util.formatTime(new Date());
                    app.util.request({
                        url: "entry/wxapp/Baoming",
                        data: e,
                        success: function(a) {
                            console.log(a), wx.showToast({
                                title: "报名成功!",
                                success: function(a) {
                                    console.log(a), setTimeout(function() {
                                        wx.reLaunch({
                                            url: "/hyb_jianzhi/success/success"
                                        });
                                    }, 1e3);
                                }
                            });
                        }
                    });
                }
            }
        }));
    },
    onShareAppMessage: function() {},
    getWorkDate(f_id){
      var _this = this;
      app.util.request({
        url: "entry/wxapp/GetWorkDate",
        data: {
          f_id:f_id
        },
        success: function (a) {
          console.log(a);
          _this.setData({
            worktime:a.data.data
          })
        }
      });
    },
    selectWorkDate(e){
      var _this = this;
      _this.setData({
        checkworktime: e.detail.value
      })
      console.log(_this.data.checkworktime)
    }
});