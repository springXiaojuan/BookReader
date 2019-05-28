// pages/bookCity/bookCity.js
const api = require('../../utils/api.js')
const config = require('../../utils/config.js')
Page({
  data: {
    imgUrl: '',
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    majorList: {},
    rankCategory: {},
    openMaleOther: false, //控制列表伸缩
    openFemaleOther: false
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    console.log(e.detail.current);
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //展开当前其他排行榜
  toggleList: function (e) {
    let id = e.target.dataset.id;
    if (id === '0') {
      this.setData({
        openMaleOther: !this.data.openMaleOther
      });
    } else if (id === '1') {
      this.setData({
        openFemaleOther: !this.data.openFemaleOther
      });
    }
  },
  //获取一级分类及数目 
  getCats: function () {
    wx.request({
      url: api.getCats(),
      success: (res) => {
        this.setData({
          majorList: res.data
        });
        console.log(res.data);
        console.log(6767677767);
      }
      
    })
  },
  //获取二级分类
  getMinor: function () {
    wx.request({
      url: api.getMinor(),
      success: function (res) {
        wx.hideLoading();
        wx.setStorage({
          key: 'minor',
          data: res.data,
        })
        console.log(res.data);
      }
    });
  },
  //获取排行
  getRankCategory: function () {
    wx.request({
      url: api.rankCategory(),
      success: res => {
        for (let key in res.data) {      
          for (let i = 0; i < res.data[key].length; i++) {
            res.data[key][i].title = res.data[key][i].title.replace('追书', '轻读');
            if (res.data[key][i].collapse) {
              res.data[key].splice(i, 0, {
                title: '别人家的排行榜',
                key: 'isOther',
                collapse: true,
                // cover: '../../img/otherIcon.png'
              });
              break;
            }
          }
        }
        this.setData({
          rankCategory: res.data
        });
      }
    })
  },
  onLoad: function () {
    this.setData({
      imgUrl: config.baseImgUrl
    });
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getCats();
    this.getMinor();
    this.getRankCategory();
    //  高度自适应
    wx.getSystemInfo({
      success: (res) => {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 80;
        this.setData({
          winHeight: calc
        });
      }
    });
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '搜索',
      path: '/page/search/search'
    }
  }
})