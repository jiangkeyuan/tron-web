import { useRoute } from "vue-router";
import common from "./common.js";
// 设置localStorage
export const setStorage = function (key, obj) {
  let json = JSON.stringify(obj);
  window.localStorage.setItem(key, json);
};

// 获取localStorage
export const getStorage = function (key) {
  const str = window.localStorage.getItem(key);
  if (!str) {
    return null;
  }
  return JSON.parse(str);
};

// 移除localStorage
export const removeStorage = function (key) {
  window.localStorage.removeItem(key);
};

export const filterName = (lang) => {
  if (!lang) return "简体中文";
  if (lang === common.LANGEN) {
    return "English";
  } else {
    return "简体中文";
  }
};

// 获取浏览器默认语言
export const getBrowserLang = function () {
  let browserLang = navigator.language
    ? navigator.language
    : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (
    browserLang.toLowerCase() === "cn" ||
    browserLang.toLowerCase() === "zh" ||
    browserLang.toLowerCase() === "zh-cn"
  ) {
    defaultBrowserLang = "zh-CN";
  } else {
    defaultBrowserLang = "en-US";
  }
  return defaultBrowserLang;
};

export const getRouter = () => {
  const router = useRoute();
  return router;
};

/**
 * @param text 用户需要复制的文本内容
 * @param id
 * @param callback
 */
export const copy = (copyEle) => {
  let { id, msg, callback } = copyEle;
  msg = copyValue.fetchMsg(msg, id);
  try {
    copyValue.clipCopy(msg);
  } catch (e) {
    copyValue.inputCopy(msg);
  } finally {
    // 如果有回调则执行回调函数
    if (callback) callback();
  }
};

export let copyValue = {
  /**
   * @param data 复制的内容
   * @desc   使用 input 方式进行内容复制
   */
  inputCopy(data) {
    var aux = document.createElement("input");
    aux.setAttribute("value", data);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  },
  /**
   * @desc 使用 clipboard 方式进行内容复制
   */
  clipCopy(data) {
    if (!document.execCommand("copy")) {
      copyValue.inputCopy(data);
      return;
    }
    let copyMethods = (e) => {
      e.clipboardData.setData("text/plain", data);
      e.preventDefault();
    };
    document.addEventListener("copy", function copy(e) {
      copyMethods(e);
    });
    document.execCommand("copy");
    document.removeEventListener("copy", copyMethods);
  },
  /**
   * @param text 复制内容
   * @param id 提供 DOM 节点的 id 属性
   * @desc 用来判断用户是直接复制内容,还是通过获取元素内容进行的
   *       并且,这里并不会区分是 input 还是普通的 DOM 元素
   */
  fetchMsg(text, id) {
    if (!id) return text;
    let ele = document.querySelector("#" + id);
    const TEXT = ["INPUT", "TEXTAREA"];
    console.log(ele.textContent);
    if (TEXT.includes(ele.tagName)) return ele.textContent;
    else return ele.innerHTML;
  },
};

export function getParamsNew(key) {
  const data = window.location.hash;
  const hashUrlList = data.split("?");
  var temData = "";
  if (data.length > 1) {
    temData = new URLSearchParams(`?${hashUrlList[1]}`);
    return temData.get(key);
  }
  return temData.get(key);
}

//方法
/**
 * @param { String } uri 当前地址栏的url
 * @param { String } key 添加的key值
 * @param { String } value 添加的value值
 * @return { String } 添加之后的url
 */
export function updateQueryStringParameter(uri, key, value) {
  if (!value) {
    return uri;
  }
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}
