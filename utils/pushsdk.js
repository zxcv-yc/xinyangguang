var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, app_key = "", _typeof = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : _typeof2(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e);
};

exports.pushSdk = function() {
    var r = "4.1.0", c = "https://openapi.xiaoshentui.com", u = !1, f = {}, l = {
        userInfo: {
            avatarUrl: "",
            country: "",
            city: "",
            gender: "",
            language: "",
            nickName: "",
            province: ""
        }
    };
    function d() {
        l.openid && wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(e) {
                        l.userInfo = e.userInfo, h(l, "setopenid", "setopenid");
                    }
                }) : h(l, "setopenid", "setopenid");
            }
        });
    }
    wx.request({
        url: "https://plog.xiaoshentui.com/config/app.json",
        header: {
            AldStat: "MiniApp-Stat"
        },
        method: "GET",
        success: function(e) {
            200 === e.statusCode && e.data.push_v != r && console.warn("小神推sdk已更新,为不影响正常使用,请去官网(http://www.xiaoshentui.com/)下载最新版本");
        }
    });
    var e = {
        setOpenId: function(e) {
            28 === e.length ? "string" == typeof (l.openid = e) && 28 === e.length ? d() : console.error("openid格式或位数错误") : console.error("openId位数不对");
        },
        sentEvent: function(e) {
            if (32 == e.eventId.length) {
                if (void 0 === e.arg || "" === e.arg) delete e.arg; else if ("Object" !== (t = e.arg, 
                Object.prototype.toString.call(t).slice(8, -1))) return void console.error("arg属性应为空字符串或对象");
                var t;
                for (var n in e.arg) if ("object" === _typeof(e.arg[n])) return void console.error("value只能是字符串");
                l.eventId = e.eventId, l.arg = e.arg, h(l, "tagEvent");
            } else console.error("eventId位数不对");
        },
        sendJsCode: function(e) {
            "string" == typeof e && (l.jscode = e), wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        success: function(e) {
                            l.userInfo = e, h(l, "user_info", "userinfo");
                        }
                    }) : h(l, "user_info", "userinfo");
                }
            });
        }
    };
    function y(e, t, n) {
        if (e[t]) {
            var o = e[t];
            e[t] = function(e) {
                return n.call(this, e, t), o.call.apply(o, [ this ].concat(Array.prototype.slice.call(arguments)));
            };
        } else e[t] = function(e) {
            n.call(this, e, t);
        };
    }
    function g() {
        var e = wx.getStorageSync("t_uuid");
        return e ? l.ifo = 0 : (e = "" + Date.now() + Math.floor(1e7 * Math.random()), wx.setStorageSync("t_uuid", e), 
        wx.setStorageSync("ifo", 1), l.ifo = 1), e;
    }
    var s = function(t, n, o) {
        if (void 0 === n && (n = "GET"), void 0 === o && (o = "d.html"), !(4e3 <= JSON.stringify(t).length)) {
            var i = 0;
            !function e() {
                wx.request({
                    url: "https://plog.xiaoshentui.com/" + o,
                    data: t,
                    header: {},
                    method: n,
                    success: function() {},
                    fail: function() {
                        i < 2 && (i++, t.retryTimes = i, e());
                    }
                });
            }();
        }
    };
    function h(e, t, n) {
        var o = g(), i = void 0;
        "app" == t && "hide" == n && (i = wx.getStorageSync("ifo"), wx.setStorageSync("ifo", 0));
        var a = {
            v: r,
            uu: o,
            ev: t,
            life: n,
            ak: app_key.replace(/(^\s*)|(\s*$)/g, ""),
            pm: e.pm ? e.pm : 0,
            wvv: e.wvv ? e.wvv : 0,
            wsdk: e.wsdk ? e.wsdk : 0,
            sv: e.sv ? e.sv : 0,
            wv: e.wv ? e.wv : 0,
            nt: e.nt ? e.nt : 0,
            ww: e.ww ? e.ww : 0,
            wh: e.wh ? e.wh : 0,
            pr: e.pr ? e.pr : 0,
            pp: e.pp ? e.pp : 0,
            lat: e.lat ? e.lat : 0,
            lng: e.lng ? e.lng : 0,
            st: e.st || 0,
            et: "app" == t && "hide" == n ? Date.now() : 0,
            ppx: e.ppx ? e.ppx : 0,
            ppy: e.ppy ? e.ppy : 0,
            data: "user_info" == t ? e.userInfo : 0,
            fid: "fpage" == t ? e.fid : 0,
            lang: e.lang ? e.lang : 0,
            wsr: "app" == t ? e.appOptions : {},
            ifo: i || 0,
            jscode: "user_info" !== t ? 0 : e.jscode,
            ust: Date.now(),
            openid: e.openid ? e.openid : 0,
            user_info: e.userInfo ? e.userInfo : 0,
            eventid: e.eventId,
            arg: e.arg,
            ele: e.ele ? e.ele : 0
        };
        s(a, "GET", "d.html");
    }
    function w(e) {
        l.ppx = e.detail.target.offsetLeft, l.ppy = e.detail.target.offsetTop, l.fid = e.detail.formId, 
        h(l, "fpage", "clickform");
    }
    function v(e) {
        var t = this, n = e.currentTarget.dataset, o = f, i = wx.getSystemInfoSync(), a = {
            app_key: app_key,
            uuid: wx.getStorageSync("t_uuid"),
            os: i.model,
            device: i.brand,
            msg_key: n.msgkey ? n.msgkey : ""
        };
        n.msgkey && wx.request({
            url: c + "/inapp_click_count",
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            data: a,
            success: function(e) {}
        }), 1 == n.type ? wx.navigateTo({
            url: "/" + n.acdetail,
            success: function() {
                o.isShow = !1, t.setData({
                    onlineData: o
                });
            },
            fail: function(e) {
                wx.switchTab({
                    url: "/" + n.acdetail,
                    success: function() {
                        o.isShow = !1, t.setData({
                            onlineData: o
                        });
                    }
                });
            }
        }) : 3 == n.type ? wx.navigateToMiniProgram({
            appId: n.apd,
            path: "/" + n.acdetail,
            success: function(e) {
                o.isShow = !1, t.setData({
                    onlineData: o
                });
            }
        }) : 4 == n.type && (o.isShow = !1, t.setData({
            onlineData: o
        }));
    }
    function S() {
        var e = f;
        e.isShow = !1, this.setData({
            onlineData: e
        });
    }
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        if (null == this) throw new TypeError();
        var t = Object(this), n = t.length >>> 0;
        if (0 === n) return -1;
        var o = 0;
        if (1 < arguments.length && ((o = Number(arguments[1])) != o ? o = 0 : 0 != o && o != 1 / 0 && o != -1 / 0 && (o = (0 < o || -1) * Math.floor(Math.abs(o)))), 
        n <= o) return -1;
        for (var i = 0 <= o ? o : Math.max(n - Math.abs(o), 0); i < n; i++) if (i in t && t[i] === e) return i;
        return -1;
    }), wx.xst ? console.error("wx.xst can't be defined twice!") : Object.defineProperty(wx, "xst", {
        configurable: !1,
        set: function() {
            console.error("cant't rewrite wx.xst");
        },
        get: function() {
            return e;
        }
    });
    try {
        var t = wx.getSystemInfoSync();
        l.pm = t.model, l.pr = t.pixelRatio, l.ww = t.screenWidth, l.wh = t.screenHeight, 
        l.lang = t.language, l.wv = t.version, l.wvv = t.platform, l.wsdk = void 0 === t.SDKVersion ? "1.0.0" : t.SDKVersion, 
        l.sv = t.system;
    } catch (e) {}
    return wx.getNetworkType({
        success: function(e) {
            l.nt = e.networkType;
        }
    }), function(e, t) {
        try {
            var n, o;
            "App" === t ? n = e : o = e;
        } catch (e) {}
        function i(e) {
            g(), void 0 !== e ? (l.appOptions = e, l.pp = e.path) : l.appOptions = {}, app_key && (wx.getStorageSync("t_appkey") || wx.setStorageSync("t_appkey", app_key));
        }
        function a(e) {
            var t, n;
            l.appOptions = void 0 !== e ? e : {}, t = wx.getSystemInfoSync(), n = {
                app_key: app_key,
                uuid: wx.getStorageSync("t_uuid"),
                openid: l.openid ? l.openid : "",
                os: t.model,
                device: t.brand
            }, wx.request({
                url: c + "/inapp_push",
                method: "GET",
                header: {
                    "content-type": "application/json"
                },
                data: n,
                success: function(e) {
                    200 == e.data.code && (u = !0, (f = e.data.data).isShow = !0);
                }
            });
        }
        function r() {
            d(), h(l, "app", "hide");
        }
        function s(e) {
            var t = this;
            if (l.st = Date.now(), l.pp = this.__route__, t.onShareAppMessage) {
                var n, o = t.onShareAppMessage;
                t.onShareAppMessage = function(e) {
                    return n = "button" === e.from ? "button" : "menu", l.ele = n, h(l, "share"), o(e);
                };
            }
            setTimeout(function() {
                f.isShow && u && (t.setData({
                    onlineTier: u,
                    onlineData: f
                }), t.colseOneBox || (y(t, "atDetails", v), y(t, "colseOneBox", S)));
            }, 2e3);
        }
        function p(e) {
            void 0 !== e && (this.options = e), l.pp = this.__route__, f.isShow && (u = !1, 
            f = {}, this.setData({
                onlineTier: u,
                onlineData: f
            }));
        }
        return {
            App: function(e) {
                y(e, "onLaunch", i), y(e, "onShow", a), y(e, "onHide", r), n ? n(e) : App(e);
            },
            Page: function(e) {
                y(e, "onShow", s), y(e, "onHide", p), y(e, "pushFormSubmit", w), o ? o(e) : Page(e);
            }
        };
    };
}();