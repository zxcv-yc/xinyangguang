var app = getApp();

Page({
    data: {
        openid: "",
        start: "1900-01-01",
        end: "2040-12-31",
        array: [ "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190以上" ],
        index: 0,
        cursor: 0,
        i: 0,
        display: "none",
        sex: 0,
        userDate: "请选择出生日期",
        userHeight: "请选择身高",
        phoneNum: "",
        code: "",
        smscode: "",
        otherInfo: "",
        send: !0,
        phone: "",
        alreadySend: !1,
        second: 60,
        region: [],
        userImg: "",
        uniacid: "",
        url: "",
        types1: 0,
        u_tel: "",
        u_jiankang: "",
        xueshengzheng: "/hyb_jianzhi/images/upload.png",
        u_content: "",
        u_contentss: 0,
        focusziwo: !1,
        checked:true
    },
    onLoad: function(a) {
        var e = this, t = wx.getStorageSync("openid");
        console.log(t);
        app.util.request({
            url: "entry/wxapp/url",
            success: function(a) {
                e.setData({
                    url: a.data
                });
            }
        }), e.setData({
            openid: t,
            uniacid: app.siteInfo.uniacid
        }), e.getUser(t);
    },
    onShow:function(){
      var _this = this;
      wx.login({
        success:function(a){
          _this.setData({
            code:a.code
          })
        }
      })
    },
    getUser: function(a) {
        var n = this;
        app.util.request({
            url: "entry/wxapp/User",
            data: {
                openid: a
            },
            success: function(a) {
                if (console.log(a.data.data), null != a.data.data) {
                    if (null != a.data.data.u_xueshengzheng && n.setData({
                        xueshengzheng: a.data.data.u_xueshengzheng
                    }), null != a.data.data.u_jiankang) var e = "有"; else e = "无";
                    if (n.setData({
                        u_jiankang: e
                    }), null != a.data.data.u_address && "" != a.data.data.u_address) {
                        var t = a.data.data.u_address.split("-");
                        n.setData({
                            region: t
                        });
                    }
                    console.log(t), n.setData({
                        user: a.data.data,
                        u_tel: a.data.data.u_tel,
                        userImg: a.data.data.u_thumb,
                        phoneNum: a.data.data.u_tel,
                        u_content: a.data.data.u_content
                    }), a.data.data.u_content && n.setData({
                        cursor: a.data.data.u_content.length
                    }), null != a.data.data.u_shengao && "" != a.data.data.u_shengao ? n.setData({
                        userHeight: a.data.data.u_shengao
                    }) : n.setData({
                        userHeight: "请选择身高"
                    }), null != a.data.data.u_chusheng && "" != a.data.data.u_chusheng ? n.setData({
                        userDate: a.data.data.u_chusheng
                    }) : n.setData({
                        userDate: "请选择出生日期"
                    }), "在读" == a.data.data.u_jiaoyu ? n.setData({
                        userJiaoYu: a.data.data.u_jiaoyu,
                        i: 0
                    }) : "已毕业" == a.data.data.u_jiaoyu && n.setData({
                        userJiaoYu: a.data.data.u_jiaoyu,
                        i: 1
                    }), "男" == a.data.data.u_sex ? n.setData({
                        sex: 0
                    }) : "女" == a.data.data.u_sex && n.setData({
                        sex: 1
                    });
                }
            }
        });
    },
    getPhoneNumber: function(a) {
        var t = this, e = (a.detail.errMsg, a.detail.iv), n = a.detail.encryptedData;
      // n = encodeURIComponent(n);
      console.log(e)
      console.log(n)
        wx.login({
            success: function(a) {
                console.log(a),
                 app.util.request({
                    url: "entry/wxapp/Mdpwd",
                    method: "POST",
                    data: {
                        iv: e,
                        code: a.code,
                        encryptedData: n
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(a) {
                        if (console.log(a), "1" == a.data.data.gstage) {
                            var e = JSON.parse(a.data.data.rdata);
                            console.log(e.phoneNumber), t.setData({
                                u_tel: e.phoneNumber
                            });
                        }
                    }
                });
            }
        });
    },
    inputPhoneNum: function(a) {
        var e = a.detail.value;
        console.log(a.detail.value), this.setData({
            phoneNum: e
        });
    },
    timer: function() {
        var n = this;
        new Promise(function(a, e) {
            var t = setInterval(function() {
                n.setData({
                    second: n.data.second - 1
                }), n.data.second <= 0 && (n.setData({
                    second: 60,
                    alreadySend: !1,
                    send: !0
                }), a(t));
            }, 1e3);
        }).then(function(a) {
            clearInterval(a);
        });
    },
    choosePhotos: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths[0];
                wx.uploadFile({
                    url: t.data.url + "app/index.php?i=" + t.data.uniacid + "&c=entry&a=wxapp&do=upload&m=hyb_jianzhi",
                    filePath: e,
                    name: "upfile",
                    formData: {},
                    success: function(a) {
                        t.setData({
                            xueshengzheng: a.data
                        });
                    }
                });
            }
        });
    },
    choosePhoto: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths[0];
                wx.uploadFile({
                    url: t.data.url + "app/index.php?i=" + t.data.uniacid + "&c=entry&a=wxapp&do=upload&m=hyb_jianzhi",
                    filePath: e,
                    name: "upfile",
                    formData: {},
                    success: function(a) {
                        t.setData({
                            userImg: a.data
                        });
                    }
                });
            }
        });
    },
    bindRegionChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            region: a.detail.value
        });
    },
    dateChange: function(a) {
        var e = a.detail.value;
        this.setData({
            userDate: e
        });
    },
    indexChange: function(a) {
        var e = a.detail.value, t = this.data.array;
        this.setData({
            userHeight: t[e]
        });
    },
    numInp: function(a) {
        var e = a.detail.cursor;
        this.setData({
            cursor: e
        });
    },
    submitClick: function(a) {
        var e = this;
        console.log("send" + e.data.send, "alreadySend" + e.data.alreadySend);
        var t = a.detail.value;
        console.log(t), t.xueshengzheng = e.data.xueshengzheng, t.thumb = e.data.userImg, 
        t.userDate = e.data.userDate, t.address = e.data.region[0] + "-" + e.data.region[1] + "-" + e.data.region[2], 
        t.userIntroduce = e.data.u_content;
        new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$", "g");
        var n = new RegExp("^[一-龥豈-鶴·s]{2,20}$", "g");
        
      // "" == t.userMajor ? wx.showToast({
      //   title: "请输入毕业专业",
      //   image: "/hyb_jianzhi/images/errors.png"
      // })
        
        "" == t.userName ? wx.showToast({
            title: "请输入姓名",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == t.userName || n.test(t.userName) ? "请选择出生日期" == t.userDate ? wx.showToast({
            title: "请选择出生日期",
            image: "/hyb_jianzhi/images/errors.png"
          }) : "" == t.idCard ? wx.showToast({
            title: "请输入身份证号",
            image: "/hyb_jianzhi/images/errors.png"
          }) 
        //   : "" == t.u_school ? wx.showToast({
        //     title: "请输入毕业学校",
        //     image: "/hyb_jianzhi/images/errors.png"
        // }) 
        : 11 != t.telphone.length ? wx.showToast({
            title: "请输入手机号",
            image: "/hyb_jianzhi/images/errors.png"
        }) : /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(t.telphone) ? (console.log(t), app.util.request({
            url: "entry/wxapp/Userxin",
            data: t,
            success: function(a) {

                console.log(t);
                console.log(a);

                wx.showToast({
                    title: a.data.message,
                    image: "/hyb_jianzhi/images/errors.png",
                    success: function(a) {
                        setTimeout(function() {
                            // wx.reLaunch({
                            //     url: "/hyb_jianzhi/my/my"
                            // });
                            wx.navigateBack({
                              delta:1
                            })
                        }, 1e3);
                    }
                });
            }
        })) : wx.showToast({
            title: "格式不正确",
            image: "/hyb_jianzhi/images/errors.png"
        }) : wx.showToast({
            title: "请输入正确姓名",
            image: "/hyb_jianzhi/images/errors.png"
        });
    },
    yanzhengma: function(a) {
        a.detail.value != this.data.smscode && wx.showToast({
            title: "验证码输入错误",
            image: "/hyb_jianzhi/images/errors.png"
        });
    },
    emailReg: function(a) {
        var e = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$", "g"), t = a.detail.value;
        e.test(t) || wx.showToast({
            title: "请输入正确邮箱",
            image: "/hyb_jianzhi/images/errors.png"
        });
    },
    qqReg: function(a) {
        a.detail.value;
    },
    change: function() {
        this.setData({
            u_content: this.data.user.u_content,
            u_contentss: 1,
            focusziwo: !0
        });
    },
    contentChange: function(a) {
        var e = a.detail.value;
        this.setData({
            u_content: e
        });
    },
    onShareAppMessage: function() {},
    checkboxChange:function(e){
      // console.log(e)
      this.setData({
        checked:e.detail.value.length > 0 ? true : false
      })
      // console.log(this.data.checked);
    },
    xieyi:function(){
      wx.navigateTo({
        url: '/hyb_jianzhi/xieyi/xieyi',
      })
    }
});