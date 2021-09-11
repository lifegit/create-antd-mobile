/**
 * CookiesManager
 * 这是一个 cookies 管理器,可以对cookie进行set|get|del,支持所有数据类型(String,number,object,array)
 *
 * author : TheLife
 * time	: 2017-8-20
 * version :1.0
 *
 * demo:
  CookiesManager.setCookie("key1","小王",'s30');
  CookiesManager.setCookie("key2",new Array('1','2'),'h1');
	console.log(CookiesManager.getCookie("key1"),CookiesManager.getCookie("key2"));
 */
export default class Index {
  /**
   * 设置一个cookis
   * @param {String} name
   * @param {Object} value
   * @param {String} time s|h|d 例:'s10'
   */
  static setCookie(name: string, value: any, time: string) {
    //如果value是个object(比如Array,obj),进行序列化
    if (typeof value === 'object') value = 'JSONSTR' + JSON.stringify(value);

    const strSec = this.getSec(time);
    const exp = new Date();
    exp.setTime(exp.getTime() + strSec);
    window.document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toUTCString();
  }

  /**
   * 获取一个cookie
   * @param {String} name
   */
  static getCookie(name: string) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    let arr;
    if ((arr = document.cookie.match(reg))) {
      let value = unescape(arr[2]);
      //解析object
      if (typeof value === 'string' && value.substr(0, 7) === 'JSONSTR') {
        try {
          value = JSON.parse(value.substr(7));
        } catch (e) {}
      }
      return value;
    } else return null;
  }

  /**
   * 删除一个cookis
   * @param {String} name
   */
  static delCookie(name: string) {
    this.setCookie(name, '', '');
  }

  static getSec(str: string): number {
    if (!str) return -1;

    const fid = str.substr(0, 1);
    const second = (str.substr(1, str.length) as any) * 1;
    if (fid === 's') {
      return second * 1000;
    } else if (fid === 'h') {
      return second * 60 * 60 * 1000;
    } else if (fid === 'd') {
      return second * 24 * 60 * 60 * 1000;
    }
    return -1;
  }
}
