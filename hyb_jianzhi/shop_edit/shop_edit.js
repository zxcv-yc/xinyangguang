var app = getApp();

Page({
    data: {
        typs: "",
        uniacid: "",
        url: "",
        imglist: [],
        obj: {
            logoImg: "",
            zhizhao: "",
            zhengshu: "",
            zhengmian: "",
            fanmian: "",
            position: ""
        },
        latitude: "",
        longitude: "",
        disabled: !1
    },
    onLoad: function(a) {
        var i = this, s = i.data.obj;
        i.getBase();
        var o = "";
        app.util.request({
            url: "entry/wxapp/User",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                var t = a.data.data.shangjia;
                0 == t ? (o = "ruzhu", i.setData({
                    typs: o
                })) : 1 == t ? (o = "xiugai", i.setData({
                    typs: o
                })) : 2 == t && (o = "xiugai", i.setData({
                    typs: o
                })), "xiugai" == o && app.util.request({
                    url: "entry/wxapp/Shangjiainfo",
                    data: {
                        openid: wx.getStorageSync("openid")
                    },
                    success: function(a) {
                        s.logoImg = a.data.data.s_thumb, s.zhizhao = a.data.data.s_yinye, s.zhengshu = a.data.data.s_zhengshu, 
                        s.zhengmian = a.data.data.s_imagepath1, s.fanmian = a.data.data.s_imagepath2, s.position = a.data.data.s_address, 
                        0 == a.data.data.s_imgpath ? i.setData({
                            imglist: [],
                            obj: s,
                            shangjiainfo: a.data.data,
                            latitude: a.data.data.s_lat,
                            longitude: a.data.data.s_lon
                        }) : i.setData({
                            obj: s,
                            shangjiainfo: a.data.data,
                            imglist: a.data.data.s_imgpath,
                            latitude: a.data.data.s_lat,
                            longitude: a.data.data.s_lon
                        });
                    }
                });
                var e = app.siteInfo.uniacid;
                i.setData({
                    uniacid: e
                }), app.util.request({
                    url: "entry/wxapp/url",
                    success: function(a) {
                        i.setData({
                            url: a.data
                        });
                    }
                });
            }
        });
    },
    getBase: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Base",
            success: function(a) {
                t.setData({
                    base: a.data.data
                });
            }
        });
    },
    delPic: function(a) {
        var e = this, i = a.currentTarget.dataset.index;
        wx.showModal({
            title: "提示",
            content: "是否删除该图片",
            success: function(a) {
                if (a.confirm) {
                    var t = e.data.imglist;
                    t.splice(i, 1), e.setData({
                        imglist: t
                    });
                }
            }
        });
    },
    choosePosition: function() {
        var t = this;
        wx.chooseLocation({
            success: function(a) {
                console.log(a), a.address ? t.setData({
                    "obj.position": a.address,
                    latitude: a.latitude,
                    longitude: a.longitude
                }) : t.setData({
                    "obj.position": "",
                    latitude: "",
                    longitude: ""
                });
            }
        });
    },
    choosePhoto: function() {
        var e = this;
        wx.chooseImage({
            count: 6 - e.data.imglist.length,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                a.tempFilePaths;
                var t = a.tempFilePaths.length;
                e.uploadDIY(a.tempFilePaths, 0, 0, 0, t), console.log(e.data.imglist);
            }
        });
    },
    uploadDIY: function(a, t, e, i, s) {
        var o = this, n = this, u = n.data.uniacid, c = n.data.imglist;
        wx.uploadFile({
            url: n.data.url + "app/index.php?i=" + u + "&c=entry&a=wxapp&do=upload&m=hyb_jianzhi",
            filePath: a[i],
            name: "upfile",
            formData: {
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                console.log(a.data), console.log(c), t++, c.push(a.data), n.setData({
                    imglist: c
                });
            },
            fail: function(a) {
                e++;
            },
            complete: function() {
                ++i == s ? (wx.hideLoading(), console.log("总共" + t + "张上传成功," + e + "张上传失败！")) : o.uploadDIY(a, t, e, i, s);
            }
        });
    },
    choosePhoto1: function() {
        var e = this, i = e.data.uniacid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = a.tempFilePaths[0];
                e.setData({
                    upvimage: t
                }), wx.uploadFile({
                    url: e.data.url + "app/index.php?i=" + i + "&c=entry&a=wxapp&do=upload&m=hyb_jianzhi",
                    filePath: t,
                    name: "upfile",
                    formData: {},
                    success: function(a) {
                        console.log(a.data), e.setData({
                            "obj.logoImg": a.data
                        });
                    }
                });
            }
        });
    },
    choosePhoto2: function() {
        var e = this, i = e.data.uniacid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = a.tempFilePaths[0];
                e.setData({
                    upvimage: t
                }), wx.uploadFile({
                    url: e.data.url + "app/index.php?i=" + i + "&c=entry&a=wxapp&do=upload&m=hyb_jianzhi",
                    filePath: t,
                    name: "upfile",
                    formData: {},
                    success: function(a) {
                        console.log(a.data), e.setData({
                            "obj.zhizhao": a.data
                        });
                    }
                });
            }
        });
    },
    choosePhoto3: function() {
        var e = this, i = e.data.uniacid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = a.tempFilePaths[0];
                e.setData({
                    upvimage: t
                }), wx.uploadFile({
                    url: e.data.url + "app/index.php?i=" + i + "&c=entry&a=wxapp&do=upload&m=hyb_jianzhi",
                    filePath: t,
                    name: "upfile",
                    formData: {},
                    success: function(a) {
                        console.log(a.data), e.setData({
                            "obj.zhengshu": a.data
                        });
                    }
                });
            }
        });
    },
    choosePhoto4: function() {
        var e = this, i = e.data.uniacid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = a.tempFilePaths[0];
                e.setData({
                    upvimage: t
                }), wx.uploadFile({
                    url: e.data.url + "app/index.php?i=" + i + "&c=entry&a=wxapp&do=upload&m=hyb_jianzhi",
                    filePath: t,
                    name: "upfile",
                    formData: {},
                    success: function(a) {
                        console.log(a.data), e.setData({
                            "obj.zhengmian": a.data
                        });
                    }
                });
            }
        });
    },
    choosePhoto5: function() {
        var e = this, i = e.data.uniacid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = a.tempFilePaths[0];
                e.setData({
                    upvimage: t
                }), wx.uploadFile({
                    url: e.data.url + "app/index.php?i=" + i + "&c=entry&a=wxapp&do=upload&m=hyb_jianzhi",
                    filePath: t,
                    name: "upfile",
                    formData: {},
                    success: function(a) {
                        console.log(a.data), e.setData({
                            "obj.fanmian": a.data
                        });
                    }
                });
            }
        });
    },
    subClick: function(a) {
        var t = this, e = a.detail.value;
        e.imgpath = t.data.imglist, e.openid = wx.getStorageSync("openid");
        var i = t.data.base;
        if ("" != e.thumb && "https://test.webstrongtech.com/attachment/" != e.thumb || "1" != i.is_logo) if ("" === e.shopNames) wx.showToast({
            title: "请填写商铺名称",
            image: "/hyb_jianzhi/images/errors.png"
        }); else if ("" === e.s_fzname) wx.showToast({
            title: "请填写负责人名称",
            image: "/hyb_jianzhi/images/errors.png"
        }); else if ("" === e.shopPhone) wx.showToast({
            title: "请填写电话",
            image: "/hyb_jianzhi/images/errors.png"
        }); else if (11 != e.shopPhone.length) wx.showToast({
            title: "手机号格式错误",
            image: "../../resource/images/error.png"
        }); else if (/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(e.shopPhone)) if ("" === e.loc_address) wx.showToast({
            title: "请选择商家地址",
            image: "/hyb_jianzhi/images/errors.png"
        }); else if ("" !== e.yingyezhizhao && "https://test.webstrongtech.com/attachment/" !== e.yingyezhizhao || 1 != i.is_yyzz) if ("" !== e.zhengshu && "https://test.webstrongtech.com/attachment/" !== e.zhengshu || 1 != i.is_yyzz) if ("" !== e.imagepath1 && "https://test.webstrongtech.com/attachment/" !== e.imagepath1 || 1 != i.is_idcard) if ("" !== e.imagepath2 && "https://test.webstrongtech.com/attachment/" !== e.imagepath2 || 1 != i.is_idcard) if ("" === e.shopIntroduce) wx.showToast({
            title: "请填写商家介绍",
            image: "/hyb_jianzhi/images/errors.png"
        }); else if (0 !== e.imgpath.length && "false" !== e.imgpath || 1 != i.is_jieshao) {
            var s = e.ruzhu;
            "ruzhu" == e.typs ? 0 == e.ruzhu ? app.util.request({
                url: "entry/wxapp/Shopruzhu",
                data: e,
                success: function(a) {
                    wx.showToast({
                        title: "入驻成功!"
                    }), t.setData({
                        disabled: !0
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "/hyb_jianzhi/my/my"
                        });
                    }, 1e3);
                }
            }) : app.util.request({
                url: "entry/wxapp/Pay",
                data: {
                    openid: e.openid,
                    zhiding_money: s
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
                                url: "entry/wxapp/Shopruzhu",
                                data: e,
                                success: function(a) {
                                    wx.showToast({
                                        title: "请等待审核!"
                                    }), t.setData({
                                        disabled: !0
                                    }), setTimeout(function() {
                                        wx.redirectTo({
                                            url: "/hyb_jianzhi/my/my"
                                        });
                                    }, 1e3);
                                }
                            });
                        }
                    });
                }
            }) : "xiugai" == e.typs && app.util.request({
                url: "entry/wxapp/Shopruzhu",
                data: e,
                success: function(a) {
                    wx.showToast({
                        title: "请等待审核"
                    }), t.setData({
                        disabled: !0
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "/hyb_jianzhi/my/my"
                        });
                    }, 1e3);
                }
            });
        } else wx.showToast({
            title: "请上传商铺图片",
            image: "/hyb_jianzhi/images/errors.png"
        }); else wx.showToast({
            title: "请上传身份证",
            image: "/hyb_jianzhi/images/errors.png"
        }); else wx.showToast({
            title: "请上传身份证",
            image: "/hyb_jianzhi/images/errors.png"
        }); else wx.showToast({
            title: "请上传授权证书",
            image: "/hyb_jianzhi/images/errors.png"
        }); else wx.showToast({
            title: "请上传营业执照",
            image: "/hyb_jianzhi/images/errors.png"
        }); else wx.showToast({
            title: "手机号格式错误",
            image: "../../resource/images/error.png"
        }); else wx.showToast({
            title: "请上传商家商标",
            image: "/hyb_jianzhi/images/errors.png"
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