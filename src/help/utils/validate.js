/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return true
}

/**
 * Check email
 * @returns {Boolean}
 */
export function checkEmail(rule, _value, callback) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  var isEmail = re.test(_value)
  if(!isEmail) {
    return callback(new Error('Vui lòng nhập email đúng dạng'))
  }else{
    callback()
  }
}

export function checkNumber(rule, _value, callback) {
  const value = parseFloat(_value)
  if (value === 0) return callback()
  if (!value) {
    return callback(new Error('Phải là số lớn hơn hoặc bằng 0'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Vui lòng nhập số'))
    } else {
      if (value <= 0) {
        callback(new Error('Vui lòng nhập số lớn hơn hoặc bằng 0'))
      } else if (value > 10000000000) {
        callback(new Error('Vui lòng nhập số nhỏ hơn 10 tỷ'))
      } else {
        callback()
      }
    }
  }, 1000)
}

/**
 * Check Length Password
 * @returns {Boolean}
 */
export function checkLengthPassword(rule, _value, callback) {
  const len = _value.length
  if(len < 6) {
    return callback(new Error('Mật khẩu phải lớn hơn 6 kí tự'))
  }else {
    callback()
  }
}
