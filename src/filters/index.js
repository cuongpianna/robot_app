const moment = require('moment')

export function formatMoney(value) {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function shortDatetime(time) {
    return moment(time).format('DD/MM HH:mm')
}

export function formatDayWeekend(value) {
    var date = new Date(value)
    var day = date.getDay()
    var dt = moment(date).format('DD/MM')
    var dayClean = ''
    if(day === 0) {
        dayClean = 'CN'
    }else if(day === 2) {
        dayClean = 'T3'
    }else if(day === 3) {
        dayClean = 'T4'
    }else if(day === 4) {
        dayClean = 'T5'
    }else if(day === 5) {
        dayClean = 'T6'
    }else if(day === 6) {
        dayClean = 'T7'
    }else if(day === 1) {
        dayClean = 'T2'
    }
    return dayClean + ` ${dt}`
}

export function fullDatetime(time) {
    const dt = new Date(time)
    const e = moment(dt).format('A')
    let a = ''
    if(e === 'AM') {
        a = ' SA'
    }else {
        a = ' CH'
    }
    var result = moment(dt).format('DD/MM/YYYY hh:mm')
    return result + a
}

export function stayTime(time) {
    var dt = new Date(time)
    return moment(dt).format('DD/MM (HH:mm)')
}

export function dayMonthYear(time) {
    var dt = new Date(time)
    return moment(dt).format('DD/MM/YYYY')
}
