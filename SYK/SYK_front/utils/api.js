import Promise from 'promise.js';
const baseUrl = require('./config.js');

/**
 * 获取分类接口
 */
function gerCats() {
    var url = baseUrl.baseUrl + "/cats/lv2/statistics"
    return baseNet(url)
}
/**
 * 书籍详情
 * @param bookId
 * @returns {*}
 */
function bookDetail(bookId) {
    console.log("bookId = " + bookId);
    var url = baseUrl.baseUrl + "/book/" + bookId
    
    return url
}

/**
 * 获取书籍目录
 * @param bookId
 * @returns {*}
 */
function getContents(bookId) {
    const url = baseUrl.baseUrl + '/mix-atoc/' + bookId + '?view=book-toc-' + bookId + '-chapters'
    return url
    
}

/**
 * 获取书籍列表
 * @param gender
 * @param cate
 * @param start
 * @param limit
 * @returns {*}
 */
function getBookList(gender,cate,start) {
    const url = baseUrl.baseUrl + "/book/by-categories?gender="+gender+"&type=hot&major="+cate+"&start="+start+"&limit="+25
    return baseNet(url)
}
/**
 * 获取内容
 * @param contents
 * @returns {*}
 */
function getContact(contents) {
    const url = baseUrl.contactUrl+"/chapter/"+encodeURIComponent(contents)
    return baseNet(url)
}
/**
 * 搜索内容
 * @param queryName
 * @returns {*}
 */
function searchBook(queryName) {
 
    const url = baseUrl.baseUrl+"/book/fuzzy-search?query="+queryName;
    return url;
}
/**
 * 获取热门标签
 * @returns {*}
 */
function getHotWorld() {
    const url = baseUrl.baseUrl+"/book/hot-word";
    return baseNet(url);
}
// 关联推荐
function relatedRecommendedBooks(bookId){
  const url = baseUrl.baseUrl + "/book/" + bookId + "/recommend";
  return url;
}


//长评
function bookReviews(book_id) {  // @param book_id 书籍id
  return baseUrl.baseUrl + "/post/review/by-book?book=" + book_id;
}
//短评
function shortReviews(book_id){
  return baseUrl.baseUrl + "/post/short-review?book=" + book_id + "&total=true&sortType=newest";
}
//讨论
function discussions(book_id){
  return baseUrl.baseUrl + "/post/by-book?book=" + book_id;
}


// 书籍来源
function bookSources(book_id){
  console.log("booksources = " + baseUrl.baseUrl + "/atoc?view=summary&book=" + book_id);
  return baseUrl.baseUrl+"/atoc?view=summary&book="+book_id;
  
}

// 书籍章节 根据书源id
function bookChapters(book_id){
  return baseUrl.baseUrl+"/atoc/"+book_id+"?view=chapters"
}
// 书籍章节  根据书Id
function bookChaptersBookId(book_id){
  console.log(book_id);
  console.log('书籍章节 = ' + baseUrl.baseUrl + "/mix-atoc/" + book_id + "?view=chapters");
  return baseUrl.baseUrl+"/mix-atoc/"+book_id+"?view=chapters"
}
// 章节内容
function chapterContent(link){
  
  return baseUrl.contactUrl + "/chapter/" + encodeURIComponent(link)
}
// 获取热词
function hotword(){
  return baseUrl.baseUrl + "/book/hot-word";
}
//获取标签
function getCats(){
  console.log("hhhh222");
  return baseUrl.baseUrl + "/cats/lv2/statistics";
}
function getMinor(){
  return baseUrl.baseUrl + "/cats/lv2";
}

function rankInfo(rank_id){
  return baseUrl.baseUrl+"/ranking/"+rank_id
}

function rankCategory(){
  return baseUrl.baseUrl + "/ranking/gender"
}

function getCatsBooks(gender, type, major, minor, start){
  if(minor){
   console.log("5656")
    return baseUrl.baseUrl+"/book/by-categories?gender="+gender+"&type="+type+"&major="+major+"&minor="+minor+"&start="+start+"&limit=20"

  }else{
   
    console.log(baseUrl.baseUrl + "/book/by-categories?gender=$" + gender + "&type=" + type + "&major=" + major + "&start=" + start + "&limit=20");
    return baseUrl.baseUrl+"/book/by-categories?gender="+gender+"&type="+type+"&major="+major+"&start="+start+"&limit=20"
  }

}






function baseNet(url) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                resolve(res)
                console.log("success")
            },
            fail: function (res) {
                reject(res)
                console.log("failed")
            }
        })
    })
}

module.exports.getCats = gerCats;
module.exports.bookDetail = bookDetail;
module.exports.getContents = getContents;
module.exports.getBookList = getBookList;
module.exports.getContact = getContact;
module.exports.searchBook = searchBook;
module.exports.getHotWorld = getHotWorld;
module.exports.bookReviews = bookReviews;
module.exports.shortReviews = shortReviews;
module.exports.discussions = discussions;
module.exports.relatedRecommendedBooks = relatedRecommendedBooks;
module.exports.bookChaptersBookId = bookChaptersBookId;
module.exports.bookSources = bookSources;
module.exports.bookChapters = bookChapters;
module.exports.chapterContent = chapterContent;
module.exports.hotword = hotword;
module.exports.getCats = getCats;
module.exports.getMinor = getMinor;
module.exports.rankCategory = rankCategory;
module.exports.rankInfo = rankInfo;
module.exports.getCatsBooks = getCatsBooks;