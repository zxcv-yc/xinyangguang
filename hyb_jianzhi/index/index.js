var app = getApp(), appkey = require("../../utils/ald-stat-conf.js"), bmap = require("../../libs/bmap-wx.js");

Page({
    data: {
        ps: !1,
        lunboimgs: [ "/hyb_jianzhi/images/lunbo1.jpg", "/hyb_jianzhi/images/lunbo2.jpg", "/hyb_jianzhi/images/lunbo3.jpg", "/hyb_jianzhi/images/lunbo4.jpg" ],
        padbot: 0,
        fx_popenid: "",
        city: "",
        keArr: [],
        pageWrapCount: [],
        keArrs: [],
        pageWrapCounts: [],
        none: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无兼职"
        } ],
        page: 0,
        pagesize: 8,
        scrollTop: 0,
        is_hy: 0,
        scrollHeight: 0,
        getUseInfo: false,
        u_id: "",
        close: !1,
        userinfo: "",
        H: 20,
        H2: 40,
        H3: 25,
        H4: 30,
        base: "",
        weatherData: "",
        fx:false
    },
    getTx: function () {
      var that = this;
      
    //  var tx_ok =  wx.getStorageSync('tx_ok') != '' ? (
    //    that.setData({
    //      'tx.tx_ok':tx_ok
    //    })
    //   ) : 
     app.util.request({
        url: 'entry/wxapp/Tixiantime',
        data:{
          'openid':wx.getStorageSync("openid")
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res);
          that.setData({
            tx:res.data.data
          })
        }
      })
    },
    getFx(){
      var _this = this;
      app.util.request({
        url: 'entry/wxapp/Fxyj',
        data: {
          'openid': wx.getStorageSync("openid")
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res);
          _this.setData({
            fx:res.data.data,
            fxmessage:res.data.message
          })
          console.log(_this.data.fx);
        }
      })
    },
    onLoad: function(a) {
        var r = this, t = a.a_id;
        r.getGetUid();
        if (app.util.request({
            url: "entry/wxapp/Key",
            success: function(a) {
                console.log(a.data.data);
                var t = a.data.data;
                appkey.app_key = t.app_key, appkey.appid = t.appid, appkey.appsecret = t.appsecret;
            }
        }), null == t) var e = ""; else e = wx.getStorageSync("city");
        wx.getStorageSync("openid");
        if (r.getUsers(), "" != e ? (app.util.request({
            url: "entry/wxapp/Base",
            success: function(a) {
                r.setData({
                    base: a.data.data,
                    city: e
                });
                var n = a.data.data;
                console.log(n), wx.setNavigationBarTitle({
                    title: a.data.data.name
                }), "1" == a.data.data.p_type ? (r.setData({
                    ps: !0
                }), r.getPiandaohang()) : (r.setData({
                    ps: !1
                }), r.getDaohang()), "0" == n.is_xn ? app.util.request({
                    url: "entry/wxapp/Huizong",
                    success: function(a) {
                        console.log(a);
                        for (var t = [ {
                            title: "入驻企业",
                            number: a.data.data.shop
                        }, {
                            title: "职位",
                            number: a.data.data.work
                        }, {
                            title: "简历",
                            number: a.data.data.jianli
                        }, {
                            title: "访问",
                            number: a.data.data.fanwen
                        } ], e = 0; e < t.length; e++) 5 == t[e].number.length ? 0 == t[e].number[1] ? t[e].number = t[e].number.substring(0, 1) + "万" : t[e].number = t[e].number.substring(0, 1) + "." + t[e].number.substring(1, 2) + "万" : 6 == t[e].number.length ? 0 == t[e].number[2] ? t[e].number = t[e].number.substring(0, 2) + "万" : t[e].number = t[e].number.substring(0, 2) + "." + t[e].number.substring(3, 4) + "万" : 7 == t[e].number.length && (0 == t[e].number[3] ? t[e].number = t[e].number.substring(0, 3) + "万" : t[e].number = t[e].number.substring(0, 3) + "." + t[e].number.substring(3, 4) + "万");
                        r.setData({
                            summary: t
                        });
                    }
                }) : app.util.request({
                    url: "entry/wxapp/Huizong",
                    success: function(a) {
                        console.log(a);
                        for (var t = [ {
                            title: "入驻企业",
                            number: String(parseInt(a.data.data.shop) + parseInt(n.rz_qy))
                        }, {
                            title: "职位",
                            number: String(parseInt(a.data.data.work) + parseInt(n.job))
                        }, {
                            title: "简历",
                            number: String(parseInt(a.data.data.jianli) + parseInt(n.infos))
                        }, {
                            title: "访问",
                            number: String(parseInt(a.data.data.fanwen) + parseInt(n.avtives))
                        } ], e = 0; e < t.length; e++) 5 == t[e].number.length ? 0 == t[e].number[1] ? t[e].number = t[e].number.substring(0, 1) + "万" : t[e].number = t[e].number.substring(0, 1) + "." + t[e].number.substring(1, 2) + "万" : 6 == t[e].number.length ? 0 == t[e].number[2] ? t[e].number = t[e].number.substring(0, 2) + "万" : t[e].number = t[e].number.substring(0, 2) + "." + t[e].number.substring(3, 4) + "万" : 7 == t[e].number.length && (0 == t[e].number[3] ? t[e].number = t[e].number.substring(0, 3) + "万" : t[e].number = t[e].number.substring(0, 3) + "." + t[e].number.substring(3, 4) + "万");
                        r.setData({
                            summary: t
                        });
                    }
                });
            }
        }), r.getJianzhi_show(), wx.getLocation({
            type: "wgs84",
            success: function(a) {
                var t = a.longitude, e = a.latitude, n = a.speed, i = a.accuracy;
                app.util.request({
                    url: "entry/wxapp/Weizhi",
                    cachetime: "30",
                    data: {
                        latitude: e,
                        longitude: t,
                        openid: wx.getStorageSync("openid"),
                        speed: n,
                        accuracy: i
                    }
                });
            }
        })) : app.util.request({
            url: "entry/wxapp/Base",
            success: function(a) {
                a.data.data;
                r.setData({
                    base: a.data.data
                }), "1" == a.data.data.p_type ? (r.setData({
                    ps: !0
                }), r.getPiandaohang()) : (r.setData({
                    ps: !1
                }), r.getDaohang()), wx.setNavigationBarTitle({
                    title: a.data.data.name
                });
                var s = a.data.data.baidukey;
                wx.getLocation({
                    type: "wgs84",
                    success: function(a) {
                        var t = a.longitude, e = a.latitude, n = a.speed, i = a.accuracy;
                        app.util.request({
                            url: "entry/wxapp/Weizhi",
                            cachetime: "30",
                            data: {
                                latitude: e,
                                longitude: t,
                                openid: wx.getStorageSync("openid"),
                                speed: n,
                                accuracy: i
                            }
                        }), wx.request({
                            url: "https://api.map.baidu.com/geocoder/v2/?ak=" + s + "&location=" + e + "," + t + "&output=json",
                            data: {},
                            header: {
                                "Content-Type": "application/json"
                            },
                            success: function(a) {
                                var t = a.data.result.addressComponent.city;
                                console.log(t), wx.setStorageSync("city", a.data.result.addressComponent.city), 
                                r.setData({
                                    city: t
                                }), r.getJianzhi_show();
                            }
                        });
                    }
                });
            }
        }), console.log(wx.getStorageSync("useInfo")), r.setData({
            fx_popenid: a.fx_popenid
        }), "" != wx.getStorageSync("useInfo")) {
            var n = false;
            r.setData({
                getUseInfo: n
            });
        } else {
            n = false;
            r.setData({
                getUseInfo: n
            });
        }
        r.getJianzhi_type(), r.getPianlist(), r.getHuandengpian();
        setInterval(function() {
            var a = r.data.H;
            r.data.H2, r.data.H3, r.data.H4;
            20 == a ? r.setData({
                H: 30,
                H2: 25,
                H3: 35,
                H4: 20
            }) : r.setData({
                H: 20,
                H2: 40,
                H3: 25,
                H4: 30
            });
        }, 1e3);
        r.gethuizong();

        //获取提现时间
        r.getTx();
        r.getFx();

    },
    link_detail_ps: function(a) {
        wx.navigateTo({
            url: "/hyb_jianzhi/about_us/about_us?id=" + a.currentTarget.dataset.id
        });
    },
    getUsers: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/User",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                console.log(a.data.data.u_hy), t.setData({
                    is_hy: a.data.data.u_hy,
                    u_id: a.data.data.u_id,
                    userinfo: a.data.data
                }), 0 == a.data.data.u_status && t.setData({
                    close: !0
                });
            }
        });
    },
    getHuandengpian: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Huandengpian",
            success: function(a) {
                console.log(a), t.setData({
                    broadcast: a.data.data
                });
            }
        });
    },
    getPianlist: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Pianlist",
            success: function(a) {
                t.setData({
                    pianlist: a.data.data
                });
            }
        });
    },
    getPiandaohang: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Piandaohang",
            success: function(a) {
                console.log(a), t.setData({
                    daohang1: a.data.data
                }), console.log(t.data.daohang1);
            }
        });
    },
    onGotUserInfo: function(a) {
        console.log(a), "getUserInfo:ok" == a.detail.errMsg ? (wx.setStorageSync("useInfo", "true"), 
        this.getGetUid(a.detail.userInfo), this.setData({
            getUseInfo: !1
        })) : this.setData({
            getUseInfo: !0
        });
    },
    getGetUid: function(t) {
        var e = this;
        wx.login({
            success: function(a) {
                a.code && app.util.request({
                    url: "entry/wxapp/GetUid",
                    data: {
                        code: a.code,
                        fx_uid:wx.getStorageSync("fx_uid")
                    },
                    success: function(s) {
                        console.log(a.code)
                        s.data.errno || (wx.setStorageSync("openid", s.data.data.openid), console.log(s.data.data.openid), 
                        console.log(t), t != null ? app.util.request({
                            url: "entry/wxapp/TyMember",
                            data: {
                                u_name: t.nickName,
                                u_thumb: t.avatarUrl,
                                u_sex: t.gender,
                                openid: s.data.data.openid
                            }
                        }) : ''), wx.getLocation({
                            type: "wgs84",
                            success: function(a) {
                                var t = a.longitude, e = a.latitude, n = a.speed, i = a.accuracy;
                                app.util.request({
                                    url: "entry/wxapp/Weizhi",
                                    cachetime: "30",
                                    data: {
                                        latitude: e,
                                        longitude: t,
                                        openid: s.data.data.openid,
                                        speed: n,
                                        accuracy: i
                                    }
                                });
                            }
                        }), null != e.data.fx_popenid && "" != e.data.fx_popenid && "undefined" != e.data.fx_popenid && app.util.request({
                            url: "entry/wxapp/Fenxiaoaddxj",
                            data: {
                                fx_popenid: e.data.fx_popenid,
                                openid: s.data.data.openid,
                                fx_name: t.nickName,
                                fx_thumb: t.avatarUrl
                            }
                        }), app.util.request({
                            url: "entry/wxapp/User",
                            data: {
                                openid: s.data.data.openid
                            },
                            success: function(a) {
                                e.setData({
                                    is_hy: a.data.data.u_hy
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    getJianzhi_type: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Jianzhi_types",
            success: function(a) {
                a.data.data[0].length <= 5 ? t.setData({
                    jianzhi_types: 1
                }) : t.setData({
                    jianzhi_types: 2
                }), t.setData({
                    jianzhi_type: a.data.data
                });
            }
        });
    },
    getDaohang: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Daohang",
            success: function(a) {
                console.log(a), t.setData({
                    daohang: a.data.data
                });
            }
        });
    },
    getJianzhi_show: function(refresh = false) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Jianzhi_show",
            data: {
                city: wx.getStorageSync("city"),
                page: e.data.page,
                pagesize: e.data.pagesize,
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                "0" != a.data.data.length && 0 < e.data.page && wx.showToast({
                    title: "加载中...",
                    icon: "none",
                    duration: 500
                }), app.globalData.keArr = a.data.data;
                var t = e.data.page + 1;
                e.setData({
                    pageWrapCount: e.data.pageWrapCount.concat([ 1 ]),
                    page: t
                });
            },
            complate(){

            }
        }), app.util.request({
            url: "entry/wxapp/Jianzhi_shows",
            data: {
                city: wx.getStorageSync("city"),
                page: e.data.page,
                pagesize: e.data.pagesize,
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                console.log(a);
                console.log(e.data.pagesize)
                console.log(wx.getStorageSync("city"))
                console.log(a.data.data), "0" != a.data.data.length && 0 < e.data.page && wx.showToast({
                    title: "加载中...",
                    icon: "none",
                    duration: 500
                });
                var t = e.data.page + 1;
                e.setData({
                  keArrs: refresh ? a.data.data : e.data.keArrs.concat(a.data.data),
                    page: t
                });
              // wx.startPullDownRefresh();
              
            },
            complete(){
              wx.stopPullDownRefresh();
            }
        });
    },
    sort: function(a, t) {
        for (var e = 0; e < a.length; e++) if (t - a[e].juli < 0) {
            var n = a.splice(e, 1);
            a.push(n[0]);
        }
    },
    timeJobDetailClick: function(a) {
        var t = a.detail.id;
        wx.navigateTo({
            url: "/hyb_jianzhi/job_detail/job_detail?j_id=" + t + "&typs=tiao"
        });
    },
    timeJobDetailClicks: function(a) {
        if ("1" == a.currentTarget.dataset.gq) wx.showToast({
            title: "此职位已过期",
            image: "/hyb_jianzhi/images/errors.png"
        }); else {
            var t = a.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/hyb_jianzhi/job_detail/job_detail?j_id=" + t + "&typs=tiao"
            });
        }
    },
    choiceClick: function(a) {
        this.getform(a.detail.formId), wx.navigateTo({
            url: "/hyb_jianzhi/position/position"
        });
    },
    searchClick: function(a) {
        this.getform(a.detail.formId), console.log(a), wx.navigateTo({
            url: "/hyb_jianzhi/search/search?city=" + this.data.a_id
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
    timeJobListClick: function(a) {
        this.getform(a.detail.formId);
        var t = a.currentTarget.dataset.title;
        wx.navigateTo({
            url: "/hyb_jianzhi/time_job_list/time_job_list?title=" + t
        });
    },
    timeJobMore: function() {
        wx.reLaunch({
            url: "/hyb_jianzhi/time_job_more/time_job_more"
        });
    },
    gethuizong: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Base",
            success: function(a) {
                var n = a.data.data;
                "0" == n.is_xn || "" == n.is_xn ? app.util.request({
                    url: "entry/wxapp/Huizong",
                    success: function(a) {
                        console.log(a);
                        for (var t = [ {
                            title: "入驻企业",
                            number: a.data.data.shop
                        }, {
                            title: "职位",
                            number: a.data.data.work
                        }, {
                            title: "简历",
                            number: a.data.data.jianli
                        }, {
                            title: "访问",
                            number: a.data.data.fanwen
                        } ], e = 0; e < t.length; e++) 5 == t[e].number.length ? 0 == t[e].number[1] ? t[e].number = t[e].number.substring(0, 1) + "万" : t[e].number = t[e].number.substring(0, 1) + "." + t[e].number.substring(1, 2) + "万" : 6 == t[e].number.length ? 0 == t[e].number[2] ? t[e].number = t[e].number.substring(0, 2) + "万" : t[e].number = t[e].number.substring(0, 2) + "." + t[e].number.substring(3, 4) + "万" : 7 == t[e].number.length && (0 == t[e].number[3] ? t[e].number = t[e].number.substring(0, 3) + "万" : t[e].number = t[e].number.substring(0, 3) + "." + t[e].number.substring(3, 4) + "万");
                        i.setData({
                            summary: t
                        });
                    }
                }) : app.util.request({
                    url: "entry/wxapp/Huizong",
                    success: function(a) {
                        console.log(a);
                        for (var t = [ {
                            title: "入驻企业",
                            number: String(parseInt(a.data.data.shop) + parseInt(n.rz_qy))
                        }, {
                            title: "职位",
                            number: String(parseInt(a.data.data.work) + parseInt(n.job))
                        }, {
                            title: "简历",
                            number: String(parseInt(a.data.data.jianli) + parseInt(n.infos))
                        }, {
                            title: "访问",
                            number: String(parseInt(a.data.data.fanwen) + parseInt(n.avtives))
                        } ], e = 0; e < t.length; e++) 5 == t[e].number.length ? 0 == t[e].number[1] ? t[e].number = t[e].number.substring(0, 1) + "万" : t[e].number = t[e].number.substring(0, 1) + "." + t[e].number.substring(1, 2) + "万" : 6 == t[e].number.length ? 0 == t[e].number[2] ? t[e].number = t[e].number.substring(0, 2) + "万" : t[e].number = t[e].number.substring(0, 2) + "." + t[e].number.substring(3, 4) + "万" : 7 == t[e].number.length && (0 == t[e].number[3] ? t[e].number = t[e].number.substring(0, 3) + "万" : t[e].number = t[e].number.substring(0, 3) + "." + t[e].number.substring(3, 4) + "万");
                        i.setData({
                            summary: t
                        });
                    }
                });
            }
        });
    },
    onReachBottom: function() {
        this.getJianzhi_show();
    },
    scroll: function(a) {
        this.setData({
            scrollTop: a.detail.scrollTop
        });
    },
    // onShareAppMessage: function() {},
    //跳转到待结算界面
    goWallet(){
      // wx.setStorageSync('tx_ok', 'false');
      wx.navigateTo({
        url: '/hyb_jianzhi/apply/apply?index=2',
      })
    },
    //隐藏显示
    hidenNotice(){
      // wx.setStorageSync('tx_ok', 'false');
      this.setData({
        'tx.tx_ok':false
      })
    },
    hidenFx() {
      // wx.setStorageSync('tx_ok', 'false');
      this.setData({
        'fx': false
      })
    },
    goFx(e){
      var _this = this;
      var f_id = e.currentTarget.dataset.id;
      console.log(f_id);
      app.util.request({
        url:'entry/wxapp/Gofx',
        data:{
          'openid':wx.getStorageSync('openid'),
          'fx_id':f_id,
        },
        success:function(res){
          console.log(res)
          _this.setData({
            fx:false
          })
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
          
        }
      })
    },
    //下拉刷新
    onPullDownRefresh(){
      this.getJianzhi_type();
      this.setData({
        page: 0, 
        pagesize: 8
      })
      this.getJianzhi_show(true);
      // setTimeout(function(){
      //   stopPullDownRefresh()
      // },3000)
    }
});