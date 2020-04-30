var app = getApp();

Page({
  data: {
    submitbtn: !0,
    state: "",
    f_id: "",
    over: !1,
    openid: "",
    b_id: "",
    b_mid: "",
    worktime: [],
    index: 0
  },
  bindPickerChange(e) {
    console.log("picker值", this.data.worktime[e.detail.value]);
    this.getBaomingxq(this.data.f_id, this.data.state, this.data.worktime[e.detail.value])
  },
  getWorktime() {
    var _this = this;
    app.util.request({
      url: "entry/wxapp/GetWorktime",
      data: {
        'f_id': _this.data.f_id
      },
      success: function(res) {
        console.log('worktime', res.data.data)
        var data = res.data.data;
        var worktime = [];
        for (var i in data) {
          worktime.push(data[i].worktime);
        }
        _this.setData({
          worktime: worktime
        })
      }
    })
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
        }, 1e3)) : (console.log(i), console.log(n), console.log(e),
          app.util.request({
            url: "entry/wxapp/Wancheng",
            data: {
              money: e,
              b_id: i,
              b_mid: n
            },
            success: function(t) {
              wx.showToast({
                title: "签退成功"
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
  getBaomingxq: function(t, a, worktime = 0) {
    var e = this;
    app.util.request({
      url: "entry/wxapp/Baomingxq",
      data: {
        state: a,
        f_id: t,
        worktime: worktime
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
    wx.showModal({
      title: '提示',
      content: '确认到岗？',
      success(res) {
        if (res.confirm) {
          app.util.request({
            url: "entry/wxapp/Daogang",
            data: {
              b_id: e
            },
            success: function(t) {
              a.getBaomingxq(a.data.f_id, a.data.state);
            }
          });
        }
      }
    })

  },
  //误工
  wugong: function(t) {
    var a = this,
      e = t.currentTarget.dataset.b_id;
    wx.showModal({
      title: '提示',
      content: '确定误工？',
      success: function(res) {
        if (res.confirm) {
          app.util.request({
            url: "entry/wxapp/Wugong",
            data: {
              b_id: e
            },
            success: function(t) {
              a.getBaomingxq(a.data.f_id, a.data.state);
            }
          });
        }
      }
    })

  },
  //查看用户的签到信息
  qiandaoxinxi: function(t) {
    var a = this,
      e = t.currentTarget.dataset.b_id;
    wx.navigateTo({
      url: '/hyb_jianzhi/manager_apply_sign/apply_sign?bid=' + e,
    })
  },
  qiantuixinxi: function(t) {
    var a = this,
      e = t.currentTarget.dataset.b_id;
    wx.navigateTo({
      url: '/hyb_jianzhi/manager_apply_sign_qt/apply_sign?bid=' + e,
    })
  },
  jiesuan: function(t) {
    // this.setData({
    //     over: !0,
    //     openid: t.currentTarget.dataset.openid,
    //     b_id: ,
    //     b_mid: 
    // });
    var a = this;
    wx.showModal({
      title: '提示',
      content: '您确定要签退吗？',
      success: function(res) {
        if (res.confirm) {
          app.util.request({
            url: "entry/wxapp/Wancheng",
            data: {
              // money: e,
              b_id: t.currentTarget.dataset.b_id,
              b_mid: t.currentTarget.dataset.b_mid
            },
            success: function(t) {
              console.log(t);
              wx.showToast({
                title: "签退成功"
              }), setTimeout(function() {
                wx.redirectTo({
                  url: "/hyb_jianzhi/manage_apply_detail/shop_apply_detail?f_id=" + a.data.f_id + "&state=" + a.data.state
                });
              }, 1e3);
            }
          })
        }
      }
    })

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
      }), this.getBaomingxq(this.data.f_id, this.data.state),
      this.getWorktime();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});