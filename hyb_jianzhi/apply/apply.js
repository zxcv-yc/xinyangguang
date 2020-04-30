var app = getApp();

Page({
  data: {
    navArr: [
      //   {
      //     con: "待录用"
      // },
      {
        con: "已录用"
      }, {
        con: "已到岗"
      }, {
        con: '待结算'
      }, {
        con: "已结算"
      },
      {
        con: "已误工"
      }
    ],
    current: 0,
    // none: [ {
    //     img: "/hyb_jianzhi/images/none.png",
    //     con: "暂无待录用信息"
    // } ],
    none1: [{
      img: "/hyb_jianzhi/images/none.png",
      con: "暂无已录用信息"
    }],
    none2: [{
      img: "/hyb_jianzhi/images/none.png",
      con: "暂无已到岗信息"
    }],
    none3: [{
      img: "/hyb_jianzhi/images/none.png",
      con: "暂无待结算信息"
    }],
    none4: [{
      img: "/hyb_jianzhi/images/none.png",
      con: "暂无已结算信息"
    }],
    none5: [{
      img: "/hyb_jianzhi/images/none.png",
      con: "暂无已误工信息"
    }]
  },
  timeJobDetailClick: function(n) {
    this.getform(n.detail.formId);
    var e = n.currentTarget.dataset.j_id;
    wx.navigateTo({
      url: "/hyb_jianzhi/job_detail/job_detail?j_id=" + e
    });
  },
  onLoad: function(n) {
    var e = n.index;
    console.log(e), console.log(wx.getStorageSync("openid")),
      this.setData({
        current: e
      });
  },
  onShow: function() {
    this.getUserBaoming(this.data.current)
  },
  getform: function(n) {
    console.log(n), app.util.request({
      url: "entry/wxapp/Formid",
      data: {
        openid: wx.getStorageSync("openid"),
        formid: n
      },
      success: function(n) {}
    });
  },
  navTab: function(n) {
    var e = this;
    e.getform(n.detail.formId);
    var t = n.currentTarget.dataset.index;
    e.setData({
      current: t
    }), e.getUserBaoming(t);
  },
  //获取用户报名列表
  getUserBaoming: function(n) {
    console.log(n);
    var e = this;
    app.util.request({
      url: "entry/wxapp/Userbaominglist",
      data: {
        openid: wx.getStorageSync("openid"),
        n_id: n
      },
      dataType: 'json',
      success: function(n) {
        var list = n.data.data;
        for (var i in list) {
          list[i].yajin = parseFloat(list[i].yajin)
          list[i].yajin_tuihuan = parseFloat(list[i].yajin_tuihuan)
        }
        console.log(list), e.setData({
          list: list
        });
      }
    });
  },
  goPingClick: function(n) {
    this.getform(n.detail.formId);
    var e = n.currentTarget.dataset.b_id;
    console.log(1), wx.navigateTo({
      url: "/hyb_jianzhi/go_ping/go_ping?b_id=" + e
    });
  },
  delClick: function(n) {
    var e = this;
    e.getform(n.detail.formId);
    var t = n.currentTarget.dataset.b_id;
    app.util.request({
      url: "entry/wxapp/Baomingdel",
      data: {
        b_id: t
      },
      success: function(n) {
        console.log(n);
        wx.showModal({
          title: '系统提示',
          content: n.data.message,
        })
        e.getUserBaoming(e.data.current);
      }
    });
  },
  applyDetailClick: function(n) {
    wx.navigateTo({
      url: "/hyb_jianzhi/apply_detail/apply_detail"
    });
  },
  homeClick: function(n) {
    this.getform(n.detail.formId), wx.reLaunch({
      url: "/hyb_jianzhi/index/index"
    });
  },
  //领取押金
  lingquyajin: function(e) {
    console.log(e.currentTarget.dataset.b_id);
    var that = this;
    var bid = e.currentTarget.dataset.b_id;
    app.util.request({
      url: "entry/wxapp/Yajinlingqu",
      data: {
        b_id: bid,
        openid: wx.getStorageSync('openid')
      },
      success: function(n) {
        console.log(n)
        if (n.data.errno == 0) {
          wx.showModal({
            title: '系统提示',
            content: '领取成功',
          })
          that.getUserBaoming(that.data.current);
        }
      }
    })
  },
  onShareAppMessage: function() {},
  sign(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.list;
    var id = e.currentTarget.dataset.id;
    //如果是已录用  那么可以去签到
    if (list[index].b_typs == '已录用') {
      wx.navigateTo({
        url: '/hyb_jianzhi/apply_sign/apply_sign?id=' + id,
      })
    }
  },
  qt_sign(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.list;
    var id = e.currentTarget.dataset.id;
    //如果是已录用  那么可以去签到
    if (list[index].b_typs == '已到岗') {
      wx.navigateTo({
        url: '/hyb_jianzhi/apply_qt_sign/apply_sign?id=' + id,
      })
    }
  },
  gz_lq(e) {
    wx.navigateTo({
      url: '/hyb_jianzhi/gongzi/gongzi?bid=' + e.currentTarget.dataset.b_id,
    })
  }
});