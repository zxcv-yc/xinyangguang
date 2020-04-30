var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.util.request({
      url:'entry/wxapp/Getsign',
      data:{
        bid:options.bid
      },
      success:function(e){
        console.log(e)
        var obj = {};
        obj.xianchang = e.data.data.qt_xc;
        obj.zipai = e.data.data.qt_zp;
        obj.address = e.data.data.qt_address;
        console.log(obj)
        that.setData({
          obj:obj
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  choosePhoto1: function () {
    var e = this, i = e.data.uniacid;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (a) {
        var t = a.tempFilePaths[0];
        e.setData({
          upvimage: t
        }), wx.uploadFile({
          url: e.data.url + "app/index.php?i=" + i + "&c=entry&a=wxapp&do=upload&m=hyb_jianzhi",
          filePath: t,
          name: "upfile",
          formData: {},
          success: function (a) {
            console.log(a.data), e.setData({
              "obj.xianchang": a.data
            });
          }
        });
      }
    });
  },
  choosePhoto2: function () {
    var e = this, i = e.data.uniacid;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (a) {
        var t = a.tempFilePaths[0];
        e.setData({
          upvimage: t
        }), wx.uploadFile({
          url: e.data.url + "app/index.php?i=" + i + "&c=entry&a=wxapp&do=upload&m=hyb_jianzhi",
          filePath: t,
          name: "upfile",
          formData: {},
          success: function (a) {
            console.log(a.data), e.setData({
              "obj.zipai": a.data
            });
          }
        });
      }
    });
  },
  submit(){
    var that = this;
    // console.log(that.data.obj)
    var obj = that.data.obj;
    obj.openid = wx.getStorageSync("openid");
    
    if(!obj.xianchang){
      wx.showToast({
        icon: 'none',
        title: '请提供现场照片',
      })
      return;
    }

    if(!obj.zipai){
      wx.showToast({
        icon:'none',
        title: '请提供您在现场的自拍照片',
      })
      return;
    }
    
    app.util.request({
      url:'entry/wxapp/sign',
      data:obj,
      header: {
        "Content-Type": "application/json"
      },
      success:function(e){
        console.log(e)
        wx.showModal({
          title: '提示',
          content: e.data.message,
          success:function(){
            wx.navigateBack({
              delta:1
            })
          }
        })
        
      }
    })
  }
})