var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select1:true,
    select2:true,
    qcode:'https://we2.boyaokj.cn/img/qcode.png',
    b_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var b_id = options.bid;
    _this.setData({
      b_id:b_id
    })
    _this.getData(b_id);
  },
  getData(bid){
    var _this = this;
    app.util.request({
      url:'entry/wxapp/Gongzilingqu',
      data:{
        b_id:bid
      },
      success:function(res){
        console.log(res)
        _this.setData({
          baoming:res.data.data
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
  // onShareAppMessage: function () {
    
  // },
  //保存二维码到手机
  saveQcode:function(){
    var _this = this;
    wx.downloadFile({
      url:_this.data.qcode,
      success:function(res){
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success:function(){
            wx.showToast({
              title: '保存成功',
              icon:'none'
            })
          }
        })
      }
    })
    
  },
  select1:function(){
    // console.log(1);
    this.setData({
      select1:!this.data.select1
    })
  },
  select2: function () {
    this.setData({
      select2: !this.data.select2
    })
  },
  lingqu:function(){
    var _this = this;
    app.util.request({
      url:'entry/wxapp/Lqgz',
      data:{
        'm':'hyb_jianzhi',
        'b_id':_this.data.b_id,
        'select2':_this.data.select2 ? 1 : 0
      },
      success:function(res){
        console.log(res)
        wx.showModal({
          title: '提示',
          content: res.data.message,
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