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
    
    var i = this;
    console.log(options.id)
    var obj = i.data.obj;
    obj.id = options.id;
    if(options.id){
      i.setData({
        obj:obj
      })
    }    
    var e = app.siteInfo.uniacid;
    i.setData({
      uniacid: e
    }), app.util.request({
      url: "entry/wxapp/url",
      success: function (a) {
        i.setData({
          url: a.data
        });
      }
    });

    var r = this;
    app.util.request({
      url: "entry/wxapp/Base",
      success: function (a) {
        a.data.data;
        var s = a.data.data.baidukey;
        wx.getLocation({
          type: "wgs84",
          success: function (a) {
            var t = a.longitude, e = a.latitude, n = a.speed, i = a.accuracy;
            app.util.request({
              url: "entry/wxapp/Weizhi",
              cachetime: "30",
              data: {
                latitude: e,
                longitude: t,
                openid: wx.getStorageSync("openid"),
                speed: n,
                accuracy: i
              }
            }), wx.request({
              url: "https://api.map.baidu.com/geocoder/v2/?ak=" + s + "&location=" + e + "," + t + "&output=json",
              data: {},
              header: {
                "Content-Type": "application/json"
              },
              success: function (a) {
                var address = a.data.result.formatted_address + " " + a.data.result.sematic_description;
                
                var obj = r.data.obj;
                obj.address = address;

                r.setData({
                  address:address,
                  obj:obj
                })
              }
            });
          }
        });
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
      sourceType: ["camera"],
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
      sourceType: ["camera"],
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
      url:'entry/wxapp/QtSign',
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