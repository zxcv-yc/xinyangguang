var app = getApp();

Page({
    data: {
        sc: !0,
        widths: 300,
        heigths: 400,
        haibao: !0,
        shengchengewm: !0,
        loading: !0,
        getUseInfo: !0,
        is_hy: 0,
        uid: "",
        f_id: "",
        deposit: "",
        u_id: "",
        close: !1,
        list: [],
        showGzh:false
    },
    sc2: function() {
        this.saveimg("mycanvas");
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
    onLoad: function(t) {
      console.log(t);
        var a = this, e = t.j_id;
        if(t.fx_uid){
          wx.setStorageSync("fx_uid", t.fx_uid)
        }
        if ("" == t.fx_uid && null == t.fx_uid || (a.setData({
            fx_uid: t.fx_uid,
            f_id: e
        }), a.getUserfenxiao(t.fx_uid)), a.getUsers(), a.getJianzhixq(e), app.util.request({
            url: "entry/wxapp/Jianzhi_liulan",
            data: {
                f_id: e
            }
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    widths: .8 * t.windowWidth,
                    heigths: .8 * t.windowHeight
                });
            }
        }), "" != wx.getStorageSync("useInfo")) {
            var i = !1;
            a.setData({
                getUseInfo: i
            });
        } else {
            i = !0;
            a.setData({
                getUseInfo: i
            });
        }
    },
    getUserfenxiao: function(t) {
      console.log(t);
        app.util.request({
            url: "entry/wxapp/Addfenxiao",
            data: {
                openid: wx.getStorageSync("openid"),
                fx_uid: t
            }
        });
    },
    onGotUserInfo: function(t) {
        console.log(t), "getUserInfo:ok" == t.detail.errMsg ? (wx.setStorageSync("useInfo", "true"), 
        this.getGetUid(t.detail.userInfo), this.setData({
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
                    success: function(o) {
                        o.data.errno || (wx.setStorageSync("openid", o.data.data.openid), console.log(o.data.data.openid), 
                        console.log(t), app.util.request({
                            url: "entry/wxapp/TyMember",
                            data: {
                                u_name: t.nickName,
                                u_thumb: t.avatarUrl,
                                u_sex: t.gender,
                                openid: o.data.data.openid
                            }
                        })), wx.getLocation({
                            type: "wgs84",
                            success: function(t) {
                                var a = t.longitude, e = t.latitude, i = t.speed, n = t.accuracy;
                                app.util.request({
                                    url: "entry/wxapp/Weizhi",
                                    cachetime: "30",
                                    data: {
                                        latitude: e,
                                        longitude: a,
                                        openid: o.data.data.openid,
                                        speed: i,
                                        accuracy: n
                                    }
                                });
                            }
                        }), null != e.data.fx_popenid && "" != e.data.fx_popenid && "undefined" != e.data.fx_popenid && app.util.request({
                            url: "entry/wxapp/Addfenxiao",
                            data: {
                                fx_uid: e.data.fx_uid,
                                openid: o.data.data.openid,
                                fx_name: t.nickName,
                                fx_thumb: t.avatarUrl
                            }
                        }), app.util.request({
                            url: "entry/wxapp/User",
                            data: {
                                openid: o.data.data.openid
                            },
                            success: function(t) {
                                e.setData({
                                    uid: a.data.data.u_id,
                                    is_hy: t.data.data.u_hy
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    getUsers: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/User",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                console.log(t.data.data.u_hy), a.setData({
                    is_hy: t.data.data.u_hy,
                    u_id: t.data.data.u_id
                }), 0 == t.data.data.u_status && a.setData({
                    close: !0
                });
            }
        });
    },
    backindex: function(t) {
        this.getform(t.detail.formId), wx.reLaunch({
            url: "../index/index"
        });
    },
    disscroll: function() {},
    closemodal: function(t) {
        this.setData({
            haibao: !0,
            shengchengewm: !0
        });
        this.getform(t.detail.formId);
    },
    haibaosc: function(t) {
        this.getform(t.detail.formId), this.setData({
            haibao: !1
        });
    },
    copyBtn: function(t) {
        var a = t.currentTarget.dataset.title;
        wx.setClipboardData({
            data: a,
            success: function(t) {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    baocunhaibao: function(t) {
        var a = this;
        a.getform(t.detail.formId), wx.showModal({
            title: "提示",
            content: "是否保存该海报",
            success: function(t) {
                t.confirm && wx.canvasToTempFilePath({
                    canvasId: "mycanvas",
                    success: function(t) {
                        console.log(t.tempFilePath);
                        t.tempFilePath;
                        wx.saveImageToPhotosAlbum({
                            filePath: t.tempFilePath,
                            success: function(t) {
                                wx.showToast({
                                    title: "保存成功"
                                }), a.setData({
                                    haibao: !0
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    ewmshare: function(t) {
        this.setData({
            haibao: !1,
            shengchengewm: !1
        }), this.getform(t.detail.formId);
    },
    getJianzhixq: function(t) {
        var h = this;
        app.util.request({
            url: "entry/wxapp/Jianzhi_infoxq",
            data: {
                openid: wx.getStorageSync("openid"),
                f_id: t
            },
            success: function(a) {
                if (console.log(a.data.data), null == a) loading = !0; else {
                    h.setData({
                        thumb: a.data.data.thumb,
                        jianzhi_infoxq: a.data.data,
                        loading: !1
                    }), h.getshopjianzhi(a.data.data.f_openid);
                    var t = a.data.data.f_id;
                    // app.util.request({
                    //     url: "entry/wxapp/Userbaiming",
                    //     data: {
                    //         openid: wx.getStorageSync("openid"),
                    //         f_id: t
                    //     },
                    //     success: function(t) {
                    //         console.log(t), h.setData({
                    //             deposit: t.data.data.money
                    //         });
                    //     }
                    // }),
                     console.log(a.data.data.erweima), wx.getImageInfo({
                        src: a.data.data.erweima,
                        success: function(t) {
                            var g = t.path;
                            wx.getImageInfo({
                                src: a.data.data.haibao,
                                success: function(f) {
                                    wx.getImageInfo({
                                        src: a.data.data.u_thumb,
                                        success: function(t) {
                                            var a = f.path, e = wx.createCanvasContext("mycanvas"), i = h.data.widths, n = h.data.heigths, o = h.data.jianzhi_infoxq.gongsi, s = h.data.jianzhi_infoxq.f_jianzhistyle, d = h.data.jianzhi_infoxq.f_jiesuan, r = "薪资：" + h.data.jianzhi_infoxq.f_xinzi + h.data.jianzhi_infoxq.f_danwei, u = h.data.jianzhi_infoxq.f_renshu, c = h.data.jianzhi_infoxq.f_name, l = s + "|" + d + "|" + u + "人";
                                            e.rect(0, 0, 1 * i, 1 * n), e.drawImage(a, 0, 0, 1 * i, 1 * n), e.drawImage(t.path, .38 * i, .18 * n, .24 * i, .24 * i), 
                                            e.setFontSize(.08 * i), e.setFillStyle("#000"), e.fillText(o, (i - e.measureText(o).width) / 2, .42 * n), 
                                            e.setFontSize(.05 * i), e.setFillStyle("#000"), e.fillText(c, .16 * i, .56 * n), 
                                            e.setFontSize(.04 * i), e.setFillStyle("red"), e.fillText(r, .6 * i, .63 * n), e.setFontSize(.04 * i), 
                                            e.setFillStyle("#000"), e.fillText(l, .16 * i, .63 * n), e.drawImage(g, .34 * i, .7 * n, .32 * i, .32 * i), 
                                            e.draw();
                                        }
                                    });
                                }
                            });
                        }
                    }), "true" == a.data.data.shoucang && h.setData({
                        sc: !1
                    });
                }
            }
        });
    },
    getshopjianzhi: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Xqlist",
            data: {
                f_id: a.data.f_id,
                f_openid: t,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                console.log(t), console.log("111"), a.setData({
                    list: t.data.data
                });
            }
        });
    },
    timeJobDetailClick: function(t) {
        if ("1" == t.currentTarget.dataset.gq) wx.showToast({
            title: "此职位已过期",
            image: "/hyb_jianzhi/images/errors.png"
        }); else {
            var a = t.currentTarget.dataset.j_id;
            console.log(a);
            wx.navigateTo({
                url: "/hyb_jianzhi/job_detail/job_detail?j_id=" + a + "&typs=tiao"
            });
        }
    },
    sendClick: function(a) {
      var _this = this;
      var jianzhi_infoxq = _this.data.jianzhi_infoxq;

        this.getform(a.detail.formId), app.util.request({
            url: "entry/wxapp/User",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
              
              //检测是否为发布者
              // wx.getStorageSync("openid") == a.currentTarget.dataset.f_openid
                false ? wx.showToast({
                    title: "您是发布者",
                    image: "/hyb_jianzhi/images/errors.png"
                }) :  null == t.data.data.u_bname ? wx.showModal({
                    title: "提示",
                    content: "请先完善信息",
                    success: function(t) {
                        t.confirm && wx.navigateTo({
                            url: "/hyb_jianzhi/edit/edit"
                        });
                    }
                }) : "待审核" == t.data.data.u_typs ? wx.showToast({
                    title: "请等待审核",
                    image: "/hyb_jianzhi/images/errors.png"
                }) : (
                      
                        
                        wx.showModal({
                          title: "提示",
                          content: jianzhi_infoxq.f_byajin > 0 ? "报名需要缴纳" + jianzhi_infoxq.f_byajin + "元押金，工作结束后与工资一同领取,取消报名退20%押金,是否确定报名" : "报名需要缴纳0元押金，工作结束后与工资一同领取,取消报名退20%押金,是否确定报名",
                          success: function (t) {
                            t.confirm && wx.navigateTo({
                              url: "/hyb_jianzhi/send/send?f_id=" + a.currentTarget.dataset.f_id
                            });
                          }
                        })
                )
                // : app.util.request({
                //     url: "entry/wxapp/Userbaiming",
                //     data: {
                //         openid: wx.getStorageSync("openid"),
                //         f_id: a.currentTarget.dataset.f_id
                //     },
                //     success: function(t) {



                //         console.log(t), "false" == t.data.data.baoming ?  : "true" == t.data.data.baoming && wx.showToast({
                //             title: "您已报名",
                //             image: "/hyb_jianzhi/images/errors.png"
                //         });
                //     }
                // });
            }
        });
    },
    callPhone: function(t) {
        var a = t.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    seeLoaction: function(t) {
        console.log(t), this.getform(t.detail.formId), wx.openLocation({
            latitude: parseFloat(t.detail.target.dataset.latitude),
            longitude: parseFloat(t.detail.target.dataset.longitude),
            address: t.detail.target.dataset.address,
            scale: 22
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
    timeJobMore: function() {
        wx.reLaunch({
            url: "/hyb_jianzhi/time_job_more/time_job_more"
        });
    },
    onReady: function() {},
    collect: function(t) {
        this.getform(t.detail.formId), this.data.sc ? (wx.showToast({
            title: "已收藏",
            image: "../images/success_02.png"
        }), app.util.request({
            url: "entry/wxapp/Jianzhi_shoucang",
            data: {
                openid: wx.getStorageSync("openid"),
                f_id: t.currentTarget.dataset.f_id,
                typs: "shou"
            }
        })) : (wx.showToast({
            title: "已取消收藏",
            image: "../images/errors.png"
        }), app.util.request({
            url: "entry/wxapp/Jianzhi_shoucang",
            data: {
                openid: wx.getStorageSync("openid"),
                f_id: t.currentTarget.dataset.f_id,
                typs: "quxiao"
            }
        })), this.setData({
            sc: !this.data.sc
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = this;
      console.log(wx.getStorageSync("openid"))
        return {
            title: "快来与我做兼职",
            path: "/hyb_jianzhi/job_detail/job_detail?j_id=" + a.data.f_id + "&fx_uid=" + wx.getStorageSync("openid"),
            success: function(t) {
                a.setData({
                    haibao: !0
                });
            },
            fail: function(t) {}
        };
    },
    offload:function(e){
      console.log(e);
      this.setData({
        showGzh:true
      })
    },
    offerror:function(e){
      console.log(e);
      this.setData({
        showGzh: false
      })
    },
  cancel(){
      this.setData({
        getUseInfo:!1
      })
    }
});