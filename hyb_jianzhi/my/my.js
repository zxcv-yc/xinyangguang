var app = getApp();

Page({
  data: {
    tx:{},
  },
  getTx: function () {
    var that = this;
      app.util.request({
        url: 'entry/wxapp/Tixiantime',
        data: {
          'openid': wx.getStorageSync("openid")
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res);
          that.setData({
            tx: res.data.data
          })
          
        }
      })

    return that.data.tx.tx_ok;
  },
  //判断是否为管理员
  isMgmt(){
    var that = this;
    app.util.request({
      url: 'entry/wxapp/Ismgmt',
      data:{
        'openid':wx.getStorageSync('openid')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        that.setData({
          isMgmt:res.data.data
        })
      }
    })
  },
  getIdcard(){
    var that = this;
    app.util.request({
      url: 'entry/wxapp/Idcard',
      data:{
        'openid': wx.getStorageSync("openid")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res);
        that.setData({
          idcard: res.data.data.bind
        })
      }
    })
  },
  onLoad: function (t) {
    this.getBase(), this.getUser(),this.getTx(),this.getIdcard(),this.isMgmt();
  },
  getBase: function () {
    var e = this;
    app.util.request({
      url: "entry/wxapp/Base",
      success: function (t) {
        console.log(t), e.setData({
          base: t.data.data
        });
      }
    });
  },
  getUser: function () {
    var e = this;
    app.util.request({
      url: "entry/wxapp/User",
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: function (t) {
        console.log(wx.getStorageSync("openid")), console.log(t), e.setData({
          userinfo: t.data.data
        });
      }
    });
  },
  caozuozhinan: function (t) {
    var e = t.currentTarget.dataset.url;
    wx.navigateTo({
      url: "../outerlink/outerlink?url=" + e
    });
  },
  myPingClick: function (t) {
    this.getform(t.detail.formId), wx.navigateTo({
      url: "/hyb_jianzhi/my_ping/my_ping"
    });
  },
  editClick: function (t) {
    this.getform(t.detail.formId), wx.navigateTo({
      url: "/hyb_jianzhi/edit/edit"
    });
  },
  applyClick: function (t) {
    this.getform(t.detail.formId);
    var e = t.currentTarget.dataset.index;
    wx.navigateTo({
      url: "/hyb_jianzhi/apply/apply?index=" + e
    });
  },
  walletClick: function (t) {
    var that = this;
    that.getform(t.detail.formId), wx.navigateTo({
      url: "/hyb_jianzhi/wallet/wallet"
    });
    // app.util.request({
    //   url: 'entry/wxapp/Tixiantime',
    //   data:{
    //     openid:wx.getStorageSync('openid')
    //   },
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     // console.log(res);
    //     // that.setData({
    //     //   tx: res.data.data
    //     // })
    //     if(!res.data.data.tx_ok){
    //       wx.showModal({
    //         title: '系统提示',
    //         content: '现在不是系统开放的提现时间',
    //       })
    //       return;
    //     }

        
    //   }
    // })
      

    
  },
  callPhone: function (t) {
    this.getform(t.detail.formId), wx.makePhoneCall({
      phoneNumber: t.currentTarget.dataset.phone
    });
  },
  shopClickManager: function (t) {
    wx.navigateTo({
      url: '/hyb_jianzhi/manager/shop',
    })
  },
  shopClick: function (t) {
    this.getform(t.detail.formId), wx.navigateTo({
      url: "/hyb_jianzhi/shop/shop"
    });
  },
  help: function (t) {
    this.getform(t.detail.formId), wx.navigateTo({
      url: "/hyb_jianzhi/yue/yue"
    });
  },
  shopClick2: function (t) {
    this.getform(t.detail.formId), wx.showToast({
      title: "审核中",
      image: "/hyb_jianzhi/images/errors.png"
    });
  },
  shopClick3: function (t) {
    this.getform(t.detail.formId), wx.showToast({
      title: "请先入驻",
      image: "/hyb_jianzhi/images/errors.png"
    }), setTimeout(function () {
      wx.navigateTo({
        url: "/hyb_jianzhi/shop_edit/shop_edit?typs=ruzhu"
      });
    }, 1e3);
  },
  collect: function (t) {
    this.getform(t.detail.formId), wx.navigateTo({
      url: "../collect/collect"
    });
  },
  sell: function (t) {
    this.getform(t.detail.formId), wx.navigateTo({
      url: "/hyb_jianzhi/sell/sell"
    });
  },
  getform: function (t) {
    console.log(t), app.util.request({
      url: "entry/wxapp/Formid",
      data: {
        openid: wx.getStorageSync("openid"),
        formid: t
      },
      success: function (t) { }
    });
  },
  addvip: function (t) {
    this.getform(t.detail.formId), wx.navigateTo({
      url: "../addvip_user/addvip_user"
    });
  },
  onReady: function () { },
  onShow: function () {
    this.getBase(), this.getUser();
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  // onShareAppMessage: function () { }
});