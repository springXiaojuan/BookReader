// pages/search/search.js
const api = require('../../utils/api.js')
const config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    imgUrl: '',
    scrollTop: 0,
    hotWords: [],
    showHotWords: [],  //随机显示六个热词
    hotWordBackgoundColor: ['#FFCC00', '#009966', '#999900', '#DDA0DD', '#0099cc', '#339900'],
    showSearchContent: false,
    searchValue: '',
    searchRes: {},
    historyWords: []
  },

  getHotWords: function () {
    wx.request({
      url: api.hotword(),
      success: res => {
        this.setData({
          hotWords: res.data.hotWords
        });
        this.randomHotWord();
      }
    })
  },

  randomHotWord: function () {
    //this.setData({
    //   showHotWords: []
    // }); 
    let hotWordLen = this.data.hotWords.length;
    let randomIndex;
    for (let i = 0; i < 6; i++) {
      // 随机生成一个小于等于Math.random() * hotWordLen的值
      let newRandom = Math.floor(Math.random() * hotWordLen);
      if (newRandom === randomIndex) {
        i--;
        break;
      }
      randomIndex = newRandom;
      this.data.showHotWords.push(this.data.hotWords[randomIndex])
    }
    this.setData({
      showHotWords: this.data.showHotWords
    });
  },

  hotWordSearch: function (event) {  //点击热词搜索
    this.setData({
      searchValue: event.target.dataset.word
    });
    this.search(event.target.dataset.word);
  },

  searchInput: function (event) {  //手动清空搜索栏关闭搜索容器
  console.log("==" +event.detail.value+"==");
  console.log(event.detail);
    this.setData({
      searchValue: event.detail.value
    });
    if (event.detail.value.length === 0) {
      this.setData({
        showSearchContent: false
      });
    }
  },

  clearInput: function () { //清空搜索栏关闭搜索容器
    this.setData({
      searchValue: '',
      showSearchContent: false
    });
  },

  search: function (word) {
   
    wx.showLoading({
      title: '搜索中',
      mask: true
    });
    let indexWord = word.detail ? word.detail.value : word;
   
    wx.getStorage({
      key: 'searchHistory',
      success: res => {
        if (indexWord != ""){

          for (let i = 0; i < res.data.length; i++) {  //已有记录删除重复的
            if (indexWord === res.data[i]) {
              res.data.splice(i, 1);
              break;
            }
          }
          res.data.unshift(indexWord);

          wx.setStorage({
            key: 'searchHistory',
            data: res.data,
          });
        }
        
       
        this.setData({
          historyWords: res.data
        });
      }
    })

    wx.request({
      // url: api.searchBook(indexWord),
      url: 'http://localhost:8080/search/book/' + indexWord,
      success: res => {
          console.log(res.data);
          if(res.data.total == undefined){ 
            wx.showToast({
              title: '请输入用户名或作者名',
              icon: 'none',
              duration: 2000//持续的时间

            })
          }
          else{
            this.setData({
              showSearchContent: true,
              searchRes: res.data,
              scrollTop: 0
            });
          }
         
       

        wx.hideLoading();
      }
    })
  },

  clearHistory: function () {
    wx.setStorage({
      key: 'searchHistory',
      data: []
    });
    this.setData({
      historyWords: []
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  高度自适应
    wx.getSystemInfo({
      success: (res) => {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 140;
        this.setData({
          imgUrl: config.baseImgUrl,
          winHeight: calc
        });
      }
    });

    wx.getStorage({
      key: 'searchHistory',
      success: res => {
        this.setData({
          historyWords: res.data
        });
      },
      fail: () => {
        wx.setStorage({
          key: 'searchHistory',
          data: [],
        })
      }
    })

    this.getHotWords();
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title:'搜索',
      path: '/page/search/search'
    }
  }
})