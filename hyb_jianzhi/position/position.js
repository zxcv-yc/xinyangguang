var app = getApp(), city = require("../../utils/city.js");

Page({
    data: {
        currentCity: "定位中...",
        letterArr: [],
        city1: []
    },
    onLoad: function(t) {
        var a = this, e = wx.getStorageSync("city");
        a.setData({
            currentCity: e
        }), a.getCity();
        var i = city.searchLetter, r = city.cityList(), c = i;
        a.setData({
            city1: r,
            letterArr: c
        });
    },
    getCity: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/City",
            success: function(t) {
                a.setData({
                    info: t.data.data
                });
            }
        });
    },
    confirmClick: function(t) {
        var a = t.target.dataset.a_id;
        wx.setStorage({
            key: "city",
            data: a
        }), console.log(a);
        var e = new RegExp("[一-龥]+", "g");
        a.search(e) || (wx.setStorageSync("city", t.target.dataset.a_id), wx.reLaunch({
            url: "/hyb_jianzhi/index/index?a_id=" + a
        }));
    },
    anchorClick: function(t) {
        var a = t.currentTarget.dataset.a_id;
        this.setData({
            toView: a
        });
    }
});