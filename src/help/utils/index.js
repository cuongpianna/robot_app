import { Message } from 'element-ui'

/**
 * Check price is number
 */
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
 * @param {Array} list
 * @param {Array} tHeader
 * @param {Array} filterVal
 */
export function exportExcel(
  list,
  tHeader = [],
  filterVal = []) {
  const formatJson = (filterVal, jsonData) => {
    return jsonData.map(v => filterVal.map(j => {
      if (j === 'status') {
        if (v[j] === 1) return 'Ngừng hoạt động'
        else if (v[j] === 2) return 'Đang bảo trì'
        else return 'Đang hoạt động'
      } else if (j === 'timestamp') {
        return parseTime(v[j])
      } else {
        return v[j]
      }
    }))
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return 'chỉ cần'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + 'vài phút trước'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + 'vài giờ trước'
  } else if (diff < 3600 * 24 * 2) {
    return '1 ngày trước'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      'tháng' +
      d.getDate() +
      'ngày ' +
      d.getHours() +
      ' giờ' +
      d.getMinutes() +
      ' phút'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export function checkEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function hasPermissionAction(roles, roleName, link, message) {
    if (roles.includes(roleName)) {
        if (link !== '') {
            window.location.href = '/#/' + link
        }
        return true
    } else {
        Message({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })
        return false
    }
}

export function data2blob(data, mime) {
  data = data.split(',')[1]
  data = window.atob(data)
  var ia = new Uint8Array(data.length)
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  // The default format returned by canvas.toDataURL is image/png
  return new Blob([ia], {
    type: mime
  })
}

