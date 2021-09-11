/**
 * LocalStorageManager
 * 这是一个 LocalStorageManager,可以setItem|getItem|removeItem 等...支持大部分数据类型(String,number,object,array),并且可以提供AES加密(使用crypto-js,[npm install crypto-js],虽然前端加密作用不大,但至少可以防止debug偷窥)
 *
 * author : TheLife
 * time	: 2017-12-16
 * version :1.0
 * demo:
 import LocalStorageManager from 'LocalStorageManager';
 const lsm = new LocalStorageManager()
 if(lsm.isSupport()){
		lsm.clear()
		lsm.setItem('aa','woai1')
		lsm.setItem('aa','woai2')
		console.log(lsm.getItem('aa'))
		lsm.removeItem('aa')
		console.log(lsm.getItem('aa'))
		lsm.setItem('bb','hello')
		lsm.setItem('cc','hi')
		console.log(lsm.getItem('bb'))
		lsm.toString()
		lsm.clear()
		console.log(lsm.getItem('bb'))
	}else
 console.log('not support localStorage!')
 */

const AES = require('crypto-js/aes');
const Utf8 = require('crypto-js/enc-utf8');

interface TimeVal {
  t: number;
  time: number;
  val: any;
}

export default class Index {
  isEncryptAES;
  encryptKey;

  /**
   * constructor
   */
  constructor(isEncryptAES = true, encryptKey = undefined) {
    this.isEncryptAES = isEncryptAES;
    if (this.isEncryptAES) {
      this.encryptKey = encryptKey || `d5-${13 * 6}d${2 * 3}a`;
    }
  }
  /**
   * Encrypt
   */
  Encrypt(word: any): string {
    return AES.encrypt(word, Utf8.parse(this.encryptKey), {
      iv: Utf8.parse('inputvec'),
    }).toString();
  }
  /**
   * Decrypt
   */
  Decrypt(word: any) {
    let res = '';
    try {
      res = AES.decrypt(word, Utf8.parse(this.encryptKey), {
        iv: Utf8.parse('inputvec'),
      }).toString(Utf8);
    } catch (e) {
      console.error(e);
    }
    return res;
  }
  /**
   * setItem
   */
  setItem(key: string, value: any) {
    // 在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误
    // 这时一般在setItem之前，先removeItem()就ok了
    if (this.getItem(key) !== null) this.removeItem(key);

    const jsonVal = JSON.stringify(value);
    const [keyRs, valueRs] = this.isEncryptAES
      ? [this.Encrypt(key), this.Encrypt(jsonVal)]
      : [key, jsonVal];
    window.localStorage.setItem(keyRs, valueRs);
  }
  /**
   * setItemTime
   * 写出一个带有time的value
   */
  setItemTime(key: string, value: any, second: number) {
    const date = new Date();
    date.setTime(date.getTime() + second * 1000);

    const jsonVal = JSON.stringify({
      t: 1,
      time: date.getTime(),
      val: value,
    } as TimeVal);

    const [keyRs, valueRs] = this.isEncryptAES
      ? [this.Encrypt(key), this.Encrypt(jsonVal)]
      : [key, jsonVal];
    window.localStorage.setItem(keyRs, valueRs);
  }
  /**
   * getItem
   */
  getItem(key: string) {
    const keyRs = this.isEncryptAES ? this.Encrypt(key) : key;
    let value: any = window.localStorage.getItem(keyRs);
    if (value == null) return null;
    value = this.isEncryptAES ? this.Decrypt(value) : value;
    try {
      value = JSON.parse(value);
    } catch (err) {
      console.log('LocalStorageManager getItem err ', err);
    }

    function isTimeVal(data: any): data is TimeVal {
      const t = <TimeVal>data;
      return t.t == 1 && t.time > 0 && t.val;
    }

    // check timeKey
    if (isTimeVal(value)) {
      if (new Date().getTime() >= value.time) {
        this.removeItem(keyRs);
        value = undefined;
      } else {
        value = value.val;
      }
    }

    // 查询不存在的key时，有的浏览器返回undefined，这里统一返回null
    return value === undefined ? null : value;
  }
  /**
   * removeItem
   */
  removeItem(key: string) {
    const keyRs = this.isEncryptAES ? this.Encrypt(key) : key;
    window.localStorage.removeItem(keyRs);
  }
  /**
   * isSupport
   */
  isSupport(): boolean {
    return !!window.localStorage;
  }
  /**
   * clear
   */
  clear() {
    window.localStorage.clear();
  }
  /**
   * toString
   */
  toString() {
    Array.from({ length: window.localStorage.length }).forEach((_, index) => {
      const key = window.localStorage.key(index);
      const keyRs = this.isEncryptAES ? this.Decrypt(key) : key;
      const valueRs = this.getItem(keyRs as string);
      console.log(index, key, valueRs);
    });
  }
}
