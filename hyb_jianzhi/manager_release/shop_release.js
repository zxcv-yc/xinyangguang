var app = getApp();

function findIndex(a, t, e) {
    for (var i in t) if (t[i] == e) return i;
}

Page({
    data: {
        latitude: "",
        longitude: "",
        typs: "",
        f_id: "",
        ps: !1,
        array: [],
        array_jz: [],
        index: "",
        index_j: "",
        xinzi: "",
        huiyuan: "",
        sexArr: [ "男", "女", "不限" ],
        isyajin: "",
        byajinArr: [ "不需要", "需要" ],
        js_types: "",
        js_typesArr: [ "小时结", "日结", "周结", "月结", "完工结" ],
        sex: "",
        pVal: "",
        typesArr: [ "长期兼职", "短期兼职", "临时兼职" ],
        types: "",
        danwei: [],
        index_dan: "",
        date_s: "",
        date_e: "",
        date_s2: "",
        date_e2: "",
        time_s: "",
        time_e: "",
        timesArr: [ "报名后通知", "9:00-12:00,2:30-5:30" ],
        times: "",
        is_hy: "",
        yajin: 0,
        yajinval: null,
        dz: "",
        one: "",
        two: "",
        content2: "请输入内容要求",
        contentss: 0,
        pt_zd: "",
        s_id: "",
        close: !1,
        xianshi: !1
    },
    onLoad: function(a) {
        var f = this, t = wx.getStorageSync("city");
        "" != t && app.util.request({
            url: "entry/wxapp/Base",
            success: function(a) {
                f.setData({
                    city: t,
                    pt_zd: a.data.data.pt_zd,
                    one: a.data.data.fenxiao,
                    two: a.data.data.fenxiaoer
                }), "1" == a.data.data.p_type ? (f.setData({
                    ps: !0
                }), f.getPiandaohang()) : (f.setData({
                    ps: !1
                }), f.getDaohang());
            }
        }), f.getBase(), f.getJianzhi_type(), f.getJianzhi_style(), f.getJianzhi_xinzi();
        // app.util.request({
        //     url: "entry/wxapp/Shangjiainfo",
        //     data: {
        //         openid: wx.getStorageSync("openid")
        //     },
        //     success: function(a) {
        //         "未入驻" == a.data.data ? wx.showModal({
        //             title: "提示",
        //             content: "您还未入驻商家",
        //             success: function(a) {
        //                 a.confirm ? wx.reLaunch({
        //                     url: "/hyb_jianzhi/shop_edit/shop_edit?typs=ruzhu"
        //                 }) : wx.reLaunch({
        //                     url: "/hyb_jianzhi/my/my"
        //                 });
        //             }
        //         }) : 0 == a.data.data.s_status ? f.setData({
        //             close: !0
        //         }) : "待审核" == a.data.data.s_typs ? wx.showModal({
        //             title: "提示",
        //             content: "商家审核中",
        //             success: function(a) {
        //                 a.confirm, wx.reLaunch({
        //                     url: "/hyb_jianzhi/index/index"
        //                 });
        //             }
        //         }) : a.data.data.jiezhi <= 0 ? wx.showModal({
        //             title: "提示",
        //             content: "商家入驻到期",
        //             success: function(a) {
        //                 a.confirm, wx.reLaunch({
        //                     url: "/hyb_jianzhi/my/my"
        //                 });
        //             }
        //         }) : f.setData({
        //             shangjiainfo: a.data.data,
        //             is_hy: a.data.data.hy,
        //             s_id: a.data.data.s_id
        //         });
        //     }
        // });
        var e = a.f_id, i = a.typs;
        console.log(i), f.setData({
            typs: i,
            f_id: e
        }), e && app.util.request({
            url: "entry/wxapp/Jianzhi_infoxq",
            data: {
                f_id: e
            },
            success: function(a) {
                var t = a.data.data;
                console.log(t);
                var e = f.data.js_typesArr, i = "", n = f.data.sexArr, s = "", o = f.data.typesArr, d = "", u = f.data.array_jz, r = f.data.danwei, p = "", c = f.data.array, l = "", h = f.data.byajinArr, y = findIndex(y, r, t.f_danwei), g = findIndex(g, h, t.f_isyajin);
                i = findIndex(i, e, t.f_jiesuan), s = findIndex(s, n, t.f_sex), d = findIndex(d, o, t.f_jianzhizhonglei), 
                p = findIndex(p, u, t.f_jianzhitype), l = findIndex(l, c, t.f_jianzhistyle);
                f.setData({
                    jinazhixq: t,
                    date_s: t.f_gzdate1,
                    date_e: t.f_gzdate2,
                    time_s: t.f_gztime1,
                    time_e: t.f_gztime2,
                    date_s2: t.f_gzdate3,
                    date_e2: t.f_gzdate4,
                    pVal: t.f_address,
                    latitude: t.f_lat,
                    longitude: t.f_lon,
                    per_num: t.f_renshu,
                    xinzi: t.f_xinzi,
                    huiyuan: t.f_huiyuan,
                    content: t.f_content,
                    content2: t.f_content,
                    isyajin: g,
                    f_name: t.f_name,
                    f_byajin: t.f_byajin,
                    yajinval: t.f_yajin,
                    js_types: i,
                    index_dan: y,
                    sex: s,
                    dz: t.dz,
                    types: d,
                    index_j: p,
                    index: l,
                    one: t.one,
                    two: t.two
                });
            }
        });
    },
    yajininput: function(a) {},
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
    getJianzhi_xinzi: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Jianzhi_xinzi",
            success: function(a) {
                var t = [];
                for (var e in a.data.data) t.push(a.data.data[e].title);
                i.setData({
                    danwei: t
                });
            }
        });
    },
    getJianzhi_type: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Jianzhi_type",
            success: function(a) {
                var t = [];
                for (var e in a.data.data) t.push(a.data.data[e].title);
                i.setData({
                    array_jz: t
                });
            }
        });
    },
    getJianzhi_style: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Jianzhi_style",
            success: function(a) {
                var t = [];
                for (var e in a.data.data) t.push(a.data.data[e].title);
                i.setData({
                    array: t
                });
            }
        });
    },
    kaig: function(a) {
        a.detail.value ? this.setData({
            xianshi: !0
        }) : this.setData({
            xianshi: !1
        });
    },
    bindPickerChange_jz: function(a) {
        this.setData({
            index_j: a.detail.value
        });
    },
    bindPickerChange: function(a) {
        var t = this, e = t.data.array[a.detail.value];
        app.util.request({
            url: "entry/wxapp/Yajin",
            data: {
                title: e
            },
            success: function(a) {
                console.log(a.data.data), t.setData({
                    yajin: a.data.data
                });
            }
        }), this.setData({
            index: a.detail.value
        });
    },
    bindoneChange: function(a) {
        this.setData({
            one: a.detail.value
        });
    },
    bindtwoChange: function(a) {
        this.setData({
            two: a.detail.value
        });
    },
    bindDanChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index_dan: a.detail.value
        });
    },
    bindXinChange: function(a) {
        this.setData({
            xinzi: a.detail.value
        });
    },
    bindHuiChange: function(a) {
        this.setData({
            huiyuan: a.detail.value
        });
    },
    bindTypesChange_js: function(a) {
        this.setData({
            js_types: a.detail.value
        });
    },
    bindSexChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            sex: a.detail.value
        });
    },
    bindIsyajinChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            isyajin: a.detail.value
        }), 0 == a.detail.value && this.setData({
            f_byajin: 0
        });
    },
    c_Location: function() {
        var i = this;
        console.log(1), wx.chooseLocation({
            success: function(e) {
                console.log(e);
                var a = e.address;
                i.setData({
                    pVal: a,
                    latitude: e.latitude,
                    longitude: e.longitude
                }), app.util.request({
                    url: "entry/wxapp/Base",
                    success: function(a) {
                        var t = a.data.data.baidukey;
                        wx.request({
                            url: "https://api.map.baidu.com/geocoder/v2/?ak=" + t + "&location=" + e.latitude + "," + e.longitude + "&output=json",
                            data: {},
                            header: {
                                "Content-Type": "application/json"
                            },
                            success: function(a) {
                                console.log(a.data.result.addressComponent), "" == a.data.result.addressComponent.district ? i.setData({
                                    dz: a.data.result.addressComponent.province + a.data.result.addressComponent.city
                                }) : i.setData({
                                    dz: a.data.result.addressComponent.province + a.data.result.addressComponent.city + a.data.result.addressComponent.district
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    bindTypesChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            types: a.detail.value
        });
    },
    bindCycleChange_s: function(a) {
        this.setData({
            date_s: a.detail.value,
            date_s2: a.detail.value
        });
    },
    bindCycleChange_e: function(a) {
        var t = this, e = t.data.yajin, i = t.data.xinzi, n = t.data.renshu, s = new Date(t.data.date_s.replace(/-/g, "/")), o = new Date(a.detail.value.replace(/-/g, "/")).getTime() - s.getTime(), d = parseInt(o / 864e5) + 1;
        t.setData({
            yajinval: i * d * n * e
        }), this.setData({
            date_e: a.detail.value,
            date_e2: a.detail.value
        });
    },
    bindTimeChange_s: function(a) {
        this.setData({
            time_s: a.detail.value
        });
    },
    bindTimeChange_e: function(a) {
        this.setData({
            time_e: a.detail.value
        });
    },
    remove: function(a) {},
    onReady: function() {},
    submitformid: function(a) {
        console.log(a.detail.formId), this.getform(a.detail.formId);
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
    subClick: function(a) {
        var e = this;
        e.getform(a.detail.formId);
        var i = a.detail.value;
        i.openid = wx.getStorageSync("openid"), i.dz = e.data.dz, i.date_s = e.data.date_s2, 
        i.date_e = e.data.date_e2, i.time_e = e.data.time_e, i.time_s = e.data.time_s, i.textCon = e.data.content, 
        i.one = e.data.one, i.two = e.data.two;
        var t = Date.parse(i.date_s) / 1e3, n = Date.parse(i.date_e) / 1e3;
        null == i.index_j ? wx.showToast({
            title: "请选择兼职类型",
            image: "/hyb_jianzhi/images/errors.png"
        }) : null == i.jobTypes ? wx.showToast({
            title: "请选择职位类型",
            image: "/hyb_jianzhi/images/errors.png"
        }) : null == i.js_types ? wx.showToast({
            title: "请选择结算类型",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == i.jobName ? wx.showToast({
            title: "请输入职位名称",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "1" == i.isyajin && "" == i.byajin ? wx.showToast({
            title: "请输入报名押金",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == i.jobPay ? wx.showToast({
            title: "请输入职位工资",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == i.jobHui ? wx.showToast({
            title: "请输入会员工资",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == i.danwei || null == i.danwei ? wx.showToast({
            title: "请选择工资单位",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == i.jobNum ? wx.showToast({
            title: "请输入招聘人数",
            image: "/hyb_jianzhi/images/errors.png"
        }) : null == i.jobSex ? wx.showToast({
            title: "请选择性别要求",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == i.jobPosition ? wx.showToast({
            title: "请选择工作地点",
            image: "/hyb_jianzhi/images/errors.png"
        }) : null == i.jobType ? wx.showToast({
            title: "请选择工作种类",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == i.date_s || "" == i.date_e ? wx.showToast({
            title: "请选择工作日期",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == i.time_s || "" == i.time_e ? wx.showToast({
            title: "请选择工作时间",
            image: "/hyb_jianzhi/images/errors.png"
        }) : "" == i.textCon ? wx.showToast({
            title: "请输入工作内容",
            image: "/hyb_jianzhi/images/errors.png"
        }) : n < t ? wx.showModal({
            title: "提示",
            content: "结束时间不可小于起始时间"
        }) : 1 == i.zhiding && "" == i.zd_time ? wx.showModal({
            title: "提示",
            content: "请输入置顶时间"
        }) : wx.showModal({
            title: "提示",
            content: "发布成功之后不可修改,是否确认发布？",
            success: function(a) {
                if (a.confirm) if (0 == i.zhiding) if (0 == i.yajin) app.util.request({
                    url: "entry/wxapp/Fabu",
                    data: i,
                    success: function(a) {
                        wx.showToast({
                            title: "发布成功!"
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "/hyb_jianzhi/shop/shop"
                            });
                        }, 1e3);
                    }
                }); else if (0 == i.yajin || "true" != e.data.is_hy && 1 != e.data.is_hy) app.util.request({
                    url: "entry/wxapp/Pay",
                    data: {
                        openid: i.openid,
                        zhiding_money: i.yajin
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
                                    url: "entry/wxapp/Fabu",
                                    data: i,
                                    success: function(a) {
                                        wx.showToast({
                                            title: "发布成功!"
                                        }), setTimeout(function() {
                                            wx.redirectTo({
                                                url: "/hyb_jianzhi/shop/shop"
                                            });
                                        }, 1e3);
                                    }
                                });
                            }
                        });
                    }
                }); else {
                    var t = parseFloat(i.yajin) * parseFloat(e.data.shangjiainfo.fb_zk) / 100;
                    app.util.request({
                        url: "entry/wxapp/Pay",
                        data: {
                            openid: i.openid,
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
                                        url: "entry/wxapp/Fabu",
                                        data: i,
                                        success: function(a) {
                                            wx.showToast({
                                                title: "发布成功!"
                                            }), setTimeout(function() {
                                                wx.redirectTo({
                                                    url: "/hyb_jianzhi/shop/shop"
                                                });
                                            }, 1e3);
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else if (1 == i.zhiding) {
                    if ("false" == e.data.is_hy || 0 == e.data.is_hy) if (1 == e.data.pt_zd) 0 == (t = parseFloat(i.yajin) + parseFloat(i.zd_money)) ? app.util.request({
                        url: "entry/wxapp/Fabu",
                        data: i,
                        success: function(a) {
                            wx.showToast({
                                title: "发布成功!"
                            }), setTimeout(function() {
                                wx.redirectTo({
                                    url: "/hyb_jianzhi/shop/shop"
                                });
                            }, 1e3);
                        }
                    }) : app.util.request({
                        url: "entry/wxapp/Pay",
                        data: {
                            openid: i.openid,
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
                                        url: "entry/wxapp/Fabu",
                                        data: i,
                                        success: function(a) {
                                            wx.showToast({
                                                title: "发布成功!"
                                            }), setTimeout(function() {
                                                wx.redirectTo({
                                                    url: "/hyb_jianzhi/shop/shop"
                                                });
                                            }, 1e3);
                                        }
                                    });
                                }
                            });
                        }
                    }); else wx.showModal({
                        title: "提示",
                        content: "会员才可置顶，是否立即办理",
                        success: function(a) {
                            if (a.confirm) wx.navigateTo({
                                url: "/hyb_jianzhi/addvip/addvip"
                            }); else {
                                i.zhiding = !1;
                                var t = parseFloat(i.yajin);
                                i.zd_money = 0, app.util.request({
                                    url: "entry/wxapp/Pay",
                                    data: {
                                        openid: i.openid,
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
                                                    url: "entry/wxapp/Fabu",
                                                    data: i,
                                                    success: function(a) {
                                                        wx.showToast({
                                                            title: "发布成功!"
                                                        }), setTimeout(function() {
                                                            wx.redirectTo({
                                                                url: "/hyb_jianzhi/shop/shop"
                                                            });
                                                        }, 1e3);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }); else if (0 == i.yajin && 0 == i.zd_money) app.util.request({
                        url: "entry/wxapp/Fabu",
                        data: i,
                        success: function(a) {
                            wx.showToast({
                                title: "发布成功!"
                            }), setTimeout(function() {
                                wx.redirectTo({
                                    url: "/hyb_jianzhi/shop/shop"
                                });
                            }, 1e3);
                        }
                    }); else {
                        t = parseFloat(i.yajin) * parseFloat(e.data.shangjiainfo.fb_zk) / 100 + parseFloat(i.zd_money) * parseFloat(e.data.shangjiainfo.zd_zk) / 100;
                        app.util.request({
                            url: "entry/wxapp/Pay",
                            data: {
                                openid: i.openid,
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
                                            url: "entry/wxapp/Fabu",
                                            data: i,
                                            success: function(a) {
                                                wx.showToast({
                                                    title: "发布成功!"
                                                }), setTimeout(function() {
                                                    wx.redirectTo({
                                                        url: "/hyb_jianzhi/shop/shop"
                                                    });
                                                }, 1e3);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
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
    getDaohang: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Daohang",
            success: function(a) {
                console.log(a), t.setData({
                    daohang: a.data.data
                });
            }
        }), console.log(t.data.daohang);
    },
    renshuinput: function(a) {
        this.setData({
            renshu: a.detail.value
        });
    },
    contentChange: function(a) {
        var t = a.detail.value;
        this.setData({
            content: t,
            content2: t
        }), "" == t && that.setData({
            content2: "请输入内容要求"
        });
    },
    onShow: function() {
        // var t = this;
        // app.util.request({
        //     url: "entry/wxapp/Shangjiainfo",
        //     data: {
        //         openid: wx.getStorageSync("openid")
        //     },
        //     success: function(a) {
        //         "未入驻" == a.data.data ? wx.showModal({
        //             title: "提示",
        //             content: "您还未入驻商家",
        //             success: function(a) {
        //                 a.confirm ? wx.reLaunch({
        //                     url: "/hyb_jianzhi/shop_edit/shop_edit?typs=ruzhu"
        //                 }) : wx.reLaunch({
        //                     url: "/hyb_jianzhi/my/my"
        //                 });
        //             }
        //         }) : 0 == a.data.data.s_status ? t.setData({
        //             close: !0
        //         }) : "待审核" == a.data.data.s_typs ? wx.showModal({
        //             title: "提示",
        //             content: "商家审核中",
        //             success: function(a) {
        //                 a.confirm, wx.reLaunch({
        //                     url: "/hyb_jianzhi/index/index"
        //                 });
        //             }
        //         }) : a.data.data.jiezhi <= 0 ? wx.showModal({
        //             title: "提示",
        //             content: "商家入驻到期",
        //             success: function(a) {
        //                 a.confirm, wx.reLaunch({
        //                     url: "/hyb_jianzhi/my/my"
        //                 });
        //             }
        //         }) : t.setData({
        //             shangjiainfo: a.data.data,
        //             is_hy: a.data.data.hy,
        //             s_id: a.data.data.s_id
        //         });
        //     }
        // });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});