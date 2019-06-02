const CryptoJS = require('crypto-js')

const Storage = function (options) {
  return {
    get(key) {
      if (process.browser) {
        let value = window.localStorage.getItem(options.prefix + key)
        if (value) {
          try {
            return JSON.parse(CryptoJS.AES.decrypt(window.localStorage.getItem(options.prefix + key), options.obfusck).toString(CryptoJS.enc.Utf8))
          } catch (Error) {
            this.clear(true)
          }
        }
        return null
      }
    },
    set(key, value) {
      if (process.browser) {
        window.localStorage.setItem(options.prefix + key, CryptoJS.AES.encrypt(JSON.stringify(value), options.obfusck))
      }
    },
    isset(key) {
      if (process.browser) {
        return (options.prefix + key in window.localStorage)
      }
    },
    remove(key) {
      if (process.browser) {
        window.localStorage.removeItem(options.prefix + key)
      }
    },
    clear() {
      if (process.browser) {
        var arr = []
        var i = 0
        for (i = 0; i < window.localStorage.length; i++) {
          if (window.localStorage.key(i).substring(0, options.prefix.length) === options.prefix) {
            arr.push(window.localStorage.key(i))
          }
        }
        for (i = 0; i < arr.length; i++) {
          window.localStorage.removeItem(arr[i])
        }
      }
    }
  }
}

export {
  Storage
}

export default {
  install(Vue, options) {
    Vue.prototype.$storage = Storage(options)
  }
}
