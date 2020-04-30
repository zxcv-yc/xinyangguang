var app = getApp();

Page({
    data: {
        title1: "",
        title2: "",
        title3: "",
        jq: "",
        jq2: "",
        jq3: "",
        jqTy: "",
        positionArr: [],
        positionArr1: [],
        positionArr2: [ {
            positions: "长期",
            p_id: 1,
            types: "time"
        }, {
            positions: "短期",
            p_id: 2,
            types: "time"
        }, {
            positions: "临时",
            p_id: 3,
            types: "time"
        } ],
        display: "none",
        display1: "none",
        display2: "none",
        display3: "none",
        keArr: [],
        pageWrapCount: [],
        page: 0,
        is_hy: 0,
        pagesize: 8,
        scrollTop: 0,
        scrollHeight: 0,
        none: [ {
            img: "/hyb_jianzhi/images/none.png",
            con: "暂无该地区"
        } ]
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
    locationShowClick: function(t) {
        var a = this;
        a.getform(t.detail.formId);
        var e = a.data.dispaly, i = a.data.display, n = a.data.jqTy;
        "location" == n ? (n = "", i = e = "none") : (n = "location", i = e = "block"), 
        a.setData({
            display: e,
            display1: i,
            display2: "none",
            display3: "none",
            jqTy: n
        });
    },
    hideClick: function() {
        this.setData({
            display: "none",
            display1: "none",
            display2: "none",
            display3: "none",
            jqTy: ""
        });
    },
    typeShowClick: function(t) {
        var a = this;
        a.getform(t.detail.formId);
        var e = a.data.display, i = a.data.display2, n = a.data.jqTy;
        "type" == n ? (n = "", i = e = "none") : (n = "type", i = e = "block"), a.setData({
            display: e,
            display1: "none",
            display2: i,
            display3: "none",
            jqTy: n
        });
    },
    timeShowClick: function(t) {
        var a = this;
        a.getform(t.detail.formId);
        var e = a.data.display, i = a.data.display3, n = a.data.jqTy;
        "time" == n ? (n = "", i = e = "none") : (n = "time", i = e = "block"), a.setData({
            display: e,
            display1: "none",
            display2: "none",
            display3: i,
            jqTy: n
        });
    },
    checkAllClick: function(t) {
        var a = this;
        a.getform(t.detail.formId);
        var e = t.currentTarget.dataset.types;
        if ("position" == e) {
            var i = "", n = a.data.jq2, o = a.data.jq3;
            a.setData({
                title3: "全部"
            });
        } else if ("type" == e) {
            i = a.data.jq, n = "", o = a.data.jq3;
            a.setData({
                title2: "全部"
            });
        } else if ("time" == e) {
            i = a.data.jq, n = a.data.jq2, o = "";
            a.setData({
                title1: "全部"
            });
        }
        if (a.setData({
            jq: i,
            jq2: n,
            jq3: o,
            jqTy: "",
            display: "none",
            display1: "none",
            display2: "none",
            display3: "none"
        }), "" == a.data.title1) var s = "全部"; else s = a.data.title1;
        if ("" == a.data.title2) var r = "全部"; else r = a.data.title2;
        if ("" == a.data.title3) var d = "全部"; else d = a.data.title3;
        a.setData({
            page: 0,
            pageWrapCount: [],
            keArr: []
        }), a.getJianzhi_info(d, r, s);
    },
    checkItemClick: function(t) {
        var a = this;
        a.getform(t.detail.formId);
        var e = t.currentTarget.dataset.types;
        a.data.pageWrapCount;
        if ("time" == e) {
            var i = a.data.jq, n = a.data.jq2, o = t.currentTarget.dataset.index, s = t.currentTarget.dataset.title;
            a.setData({
                title1: s
            });
        } else if ("type" == e) {
            i = a.data.jq, o = a.data.jq3, n = t.currentTarget.dataset.index;
            var r = t.currentTarget.dataset.title;
            a.setData({
                title2: r
            });
        } else if ("position" == e) {
            i = t.currentTarget.dataset.index, o = a.data.jq3, n = a.data.jq2;
            var d = t.currentTarget.dataset.title;
            var id3 = t.currentTarget.dataset.j_id;
            console.log(id3);
            a.setData({
                title3: d,
                id3:id3
            });
        }
        if (a.setData({
            jq: i,
            jq2: n,
            jq3: o,
            ty: e,
            jqTy: "",
            display: "none",
            display1: "none",
            display2: "none",
            display3: "none"
        }), "" == a.data.title1) var l = "全部"; else l = a.data.title1;
        if ("" == a.data.title2) var p = "全部"; else p = a.data.title2;
        if ("" == a.data.title3) var c = "全部"; else c = a.data.title3;
        a.setData({
            page: 0,
            keArr: [],
            pageWrapCount: []
        }), console.log(a.data.pageWrapCount), a.getJianzhi_info(c, p, l);
    },
    remove: function(t, a) {
        for (var e = 0; e < t.length; e++) if (t[e] == a) return !1;
        return !0;
    },
    preventTouchMove: function() {},
    timeJobDetailClick: function(t) {
        if (this.getform(t.detail.formId), "1" == t.currentTarget.dataset.gq) wx.showToast({
            title: "此职位已过期",
            image: "/hyb_jianzhi/images/errors.png"
        }); else {
            var a = t.currentTarget.dataset.j_id;
            wx.navigateTo({
                url: "/hyb_jianzhi/job_detail/job_detail?j_id=" + a
            });
        }
    },
    onLoad: function(t) {
        this.getJianzhi_info("全部", "全部", "全部", 0), this.getDiqu(), this.getJianzhi_style(), 
        this.getUsers();
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
                    is_hy: t.data.data.u_hy
                });
            }
        });
    },
    getJianzhi_info: function(i, n, o, t,refresh = false) {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Jianzhi_info",
            data: {
                page: s.data.page,
                pagesize: s.data.pagesize,
                city: wx.getStorageSync("city"),
                quyu: i,
                leixing: n,
                shijian: o,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
              console.log(t);
                if ("0" != t.data.data.length && 0 <= s.data.page) {
                    wx.showToast({
                        title: "加载中...",
                        icon: "none",
                        duration: 500
                    }), app.globalData.keArr = t.data.data;
                    var a = s.data.page + 1;
                    if (s.data.keArr == [] || "全部" == i && "全部" == n && "全部" == o) e = t.data.data; else var e = s.data.keArr.concat(t.data.data);
                    console.log(a), s.setData({
                        pageWrapCount: s.data.pageWrapCount.concat([ 1 ]),
                        keArr: refresh ? t.data.data :  s.data.keArr.concat(e),
                        page: a
                    });
                }
            },
            complete(){
              wx.stopPullDownRefresh();
            }
        });
    },
    sort: function(t, a) {
        for (var e = 0; e < t.length; e++) if (a - t[e].juli < 0) {
            var i = t.splice(e, 1);
            t.push(i[0]);
        }
    },
    onReachBottom: function() {
        var t = this;
        if ("" == t.data.title1) var a = "全部"; else a = t.data.title1;
        if ("" == t.data.title2) var e = "全部"; else e = t.data.title2;
        if ("" == t.data.title3) var i = "全部"; else i = t.data.title3;
        t.getJianzhi_info(i, e, a);
    },
    scroll: function(t) {
        this.setData({
            scrollTop: t.detail.scrollTop
        });
    },
    getDiqu: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Diqu",
            data: {
                city: wx.getStorageSync("city")
            },
            success: function(t) {
                console.log(t.data.data);
                var a = t.data.data;
                for (var e in a) a[e].types = "position";
                i.setData({
                    positionArr: a
                });
            }
        });
    },
    getJianzhi_style: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Jianzhi_style",
            success: function(t) {
                console.log(t.data.data);
                var a = t.data.data;
                for (var e in a) a[e].types = "type";
                i.setData({
                    positionArr1: a
                });
            }
        });
    },
    // onShareAppMessage: function() {},
    onPullDownRefresh(){
      var a = this;
      this.setData({
        page: 0,
        pagesize: 8
      })
    if("" == a.data.title1) var s = "全部"; else s = a.data.title1;
    if ("" == a.data.title2) var r = "全部"; else r = a.data.title2;
    if ("" == a.data.title3) var d = "全部"; else d = a.data.title3;
      this.getJianzhi_info(d,r,s,null,true);
    }
});