var app = getApp();

Page({
  data: {
    submitbtn: !0,
    state: "",
    f_id: "",
    over: !1,
    openid: "",
    b_id: "",
    b_mid: ""
  },
  getMoney: function(t) {
    var a = this,
      e = t.detail.value.money,
      i = (a.data.openid, wx.getStorageSync("openid"),
        t.detail.value.b_id),
      n = t.detail.value.b_mid;
    a.setData({
      submitbtn: !1
    }), app.util.request({
      url: "entry/wxapp/Shangjiainfo",
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: function(t) {
        t.data.data.s_money - e < 0 ? (wx.showToast({
          title: "余额不足请充值",
          image: "/hyb_jianzhi/images/errors.png"
        }), setTimeout(function() {
          wx.navigateTo({
            url: "/hyb_jianzhi/chongzhi/chongzhi"
          });
        }, 1e3)) : (console.log(i), console.log(n), console.log(e), app.util.request({
          url: "entry/wxapp/Jiesuan",
          data: {
            money: e,
            b_id: i,
            b_mid: n
          },
          success: function(t) {
            wx.showToast({
              title: "结算成功"
            }), setTimeout(function() {
              wx.navigateTo({
                url: "/hyb_jianzhi/shop_apply_detail/shop_apply_detail?f_id=" + a.data.f_id + "&state=" + a.data.state
              });
            }, 1e3);
          }
        }));
      }
    });
  },
  onLoad: function(t) {
    var a = this,
      e = t.f_id,
      i = t.state;
    a.setData({
      state: i,
      f_id: e
    }), a.getBase(), a.getBaomingxq(e, i);
  },
  getBase: function() {
    var a = this;
    app.util.request({
      url: "entry/wxapp/Base",
      success: function(t) {
        a.setData({
          base: t.data.data
        });
      }
    });
  },
  payMoney: function(t) {
    var a = t.detail.value * this.data.base.jiesuan;
    a = a.toFixed(2), this.setData({
      values: t.detail.value,
      pay: a
    });
  },
  getBaomingxq: function(t, a) {
    var e = this;
    app.util.request({
      url: "entry/wxapp/Baomingxq",
      data: {
        state: a,
        f_id: t
      },
      success: function(t) {
        console.log(t.data.data), e.setData({
          list: t.data.data
        });
      }
    });
  },
  previewClick: function(t) {
    var a = t.currentTarget.dataset.b_openid,
      e = t.currentTarget.dataset.f_id,
      i = t.currentTarget.dataset.b_id;
    wx.navigateTo({
      url: "/hyb_jianzhi/preview/preview?b_openid=" + a + "&f_id=" + e + "&b_id=" + i
    });
  },
  Luyong: function(t) {
    var a = this;
    console.log(t.detail.formId);
    var e = t.currentTarget.dataset.b_id;
    app.util.request({
      url: "entry/wxapp/Luyong",
      data: {
        b_id: e,
        formId: t.detail.formId
      },
      success: function(t) {
        console.log(t), a.getBaomingxq(a.data.f_id, a.data.state);
      }
    });
  },
  Buluyong: function(t) {
    var a = this,
      e = t.currentTarget.dataset.b_id;
    app.util.request({
      url: "entry/wxapp/Buluyong",
      data: {
        b_id: e,
        formId: t.detail.formId
      },
      success: function(t) {
        a.getBaomingxq(a.data.f_id, a.data.state);
      }
    });
  },
  callPhone: function(t) {
    wx.makePhoneCall({
      phoneNumber: t.currentTarget.dataset.phone
    });
  },
  daogang: function(t) {
    var a = this,
      e = t.currentTarget.dataset.b_id;
    app.util.request({
      url: "entry/wxapp/Daogang",
      data: {
        b_id: e
      },
      success: function(t) {
        a.getBaomingxq(a.data.f_id, a.data.state);
      }
    });
  },
  jiesuan: function(t) {
    this.setData({
      over: !0,
      openid: t.currentTarget.dataset.openid,
      b_id: t.currentTarget.dataset.b_id,
      b_mid: t.currentTarget.dataset.b_mid
    });
  },
  hideClick: function() {
    this.setData({
      over: !1
    });
  },
  remove: function(t) {},
  onReady: function() {},
  onShow: function() {
    this.setData({
      over: !1,
      submitbtn: !0
    }), this.getBaomingxq(this.data.f_id, this.data.state);
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});