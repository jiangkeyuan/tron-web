// 设置localStorage
export const setStorage = function(key, obj) {
    let json = JSON.stringify(obj);
    window.localStorage.setItem(key, json);
} 

// 获取localStorage
export const getStorage = function(key) {
    const str = window.localStorage.getItem(key); 
    if (!str) {
        return null
    }
    return JSON.parse(str)
}

// 移除localStorage
export const removeStorage = function(key) {
    window.localStorage.removeItem(key)
}

// 获取浏览器默认语言
export const getBrowserLang = function() {
    let browserLang = navigator.language ? navigator.language: navigator.browserLanguage;
    let defaultBrowserLang = '';
    if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
        defaultBrowserLang = 'zh-CN'
    } else {
        defaultBrowserLang = 'en-US'
    }
    return defaultBrowserLang
}