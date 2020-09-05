<template>
  <div class="hotel-footer">
    <div class="region-date">
      <div class="region_top">
        <div class="time">
          <span id="hourMin" class="hour-min" /><span id="second" class="sec" />
        </div>
        <div id="timeRegion" class="region" />
      </div>
      <div class="region_bottom">
        <div class="hello-user">
          <p class="hello">{{ generateTitleView('hello', 'dashboard') }}, <b>{{ name }}</b></p>
        </div>
      </div>
    </div>
    <div class="weather-user">
      <div
        class="doctor-weather__inner"
        :style="{'background-image': 'url(' + require('@/assets/doctor.png') + ')'}"
      >
        <div class="weather">
          <img id="imgWeather" src="https://openweathermap.org/img/wn/03d@2x.png" alt="" class="img-weather">
          <p class="temperature"><span id="minTemp">24</span><span class="temp-sign" />C</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { generateTitleView } from '@/help/utils/i18n'
import Cookies from 'js-cookie'

export default {
  name: 'DashboardFooter',
  props: {
    'name': {
      type: String,
      default() {
        return ''
      }
    },
    'avatar': {
      type: String,
      default() {
        return ''
      }
    },
    'city': {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      WEATHER_API_KEY: process.env.VUE_APP_WEATHER_API_KEY,
      timeInterval: ''
    }
  },
  watch: {
    city: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler: 'getWeatherApi'
    }
  },
  mounted() {
    this.currentDateTime()
  },
  methods: {
    currentDateTime() {
      const me = this
      clearInterval(me.timeInterval)
      const lang = Cookies.get('language')
      let dayOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']

      if (lang === 'en') {
        dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wenesday', 'Thurday', 'Friday', 'Saturday']
      }

      const fnSetDateTimeString = function() {
        const d = new Date()
        const hourMinute = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ''
        const second = ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds() + ''
        const dString = me.city + ', ' + dayOfWeek[d.getDay()] + ' ' + (d.getDate() < 10 ? '0' : '') + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ''
        const elHourMinute = document.getElementById('hourMin')
        const elSecond = document.getElementById('second')
        const elTimeRegion = document.getElementById('timeRegion')
        if (typeof elHourMinute !== 'undefined' && elHourMinute != null && typeof elSecond !== 'undefined' && elSecond != null && typeof elTimeRegion !== 'undefined' && elTimeRegion != null) {
          elHourMinute.innerText = hourMinute
          elSecond.innerText = second
          elTimeRegion.innerText = dString
        } else {
          clearInterval(me.timeInterval)
        }
      }
      fnSetDateTimeString()
      me.timeInterval = setInterval(fnSetDateTimeString, 1000)
    },
    getWeatherApi() {
      let choseCity = this.city
      if (choseCity === 'Hồ Chí Minh') {
        choseCity = 'Ho Chi Minh City'
      }
      if (choseCity === 'Hải Phòng') {
        choseCity = 'Haiphong'
      }
      choseCity = choseCity.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
      const data = axios({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${choseCity},vn&appid=${this.WEATHER_API_KEY}`,
        method: 'get',
        data: data
      }).then(res => {
        const temp = res.data && Math.floor(res.data.main.temp - 273.15)
        const imgCode = res.data && res.data.weather[0].icon
        const elTemp = document.getElementById('minTemp')
        const elImg = document.getElementById('imgWeather')
        const imgWeather = `https://openweathermap.org/img/wn/${imgCode}@2x.png`
        elTemp.innerText = temp
        elImg.setAttribute('src', imgWeather)
      })
      return data
    },
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>
.hotel-footer {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  /*position: absolute;*/
  width: 100%;
  box-sizing: border-box;
  left: 0;
  bottom: 30px;

  .region-date {
    .time {
      font-size: 35px;
      color: #fff;

      .sec {
        font-size: 25px;
        color: #fff;
      }

    }

    .region {
      font-size: 15px;
      color: #fff;
      text-transform: uppercase;
      display: block;
      margin-top: 10px;
    }

  }

  .weather-user {
    width: 150px;
    display: flex;
    justify-content: flex-start;

    .weather {
      width: 120px;
      position: relative;

      .img-weather {
        width: 80px;
        height: 80px;
        display: block;
        position: absolute;
        top: -67px;
      }

      .temperature {
        color: #fff;
        font-size: 15px;
        margin-top: 30px;
        margin-left: 20px;

        .temp-sign {
          border: 1px solid #fff;
          border-radius: 100%;
          width: 6px;
          height: 6px;
          display: inline-block;
          position: relative;
          top: -8px;
        }

      }

      .description {
        color: #fff;
        font-size: 15px;
        margin-top: 5px;
      }

    }

    .hello-user {
      width: calc(100% - 120px);
      margin-top: 15px;
      margin-left: 20px;

      .hello {
        color: #fff;
        font-size: 20px;
      }

      .company {
        margin-top: 15px;
        color: #b2b2b2;
        font-size: 13px;
        text-transform: uppercase;
      }

    }
  }
}

@media screen and (max-width: 670px) {
  .hotel-footer {
    justify-content: flex-end;
    flex-wrap: wrap;

    .region-date {
      width: 100%;
      margin-bottom: 30px;
    }

    .weather-user {
      width: 100%;
    }

  }
}

.region-date {
  .region_top {
    display: inline-flex;
    align-items: flex-end;

    #timeRegion {
      margin-top: 0 !important;
      margin-left: 15px;
      font-size: 18px;
    }
  }

  .region_bottom {
    margin-top: 15px;

    .hello {
      font-size: 24px;
      color: #fff;
    }
  }
}

.doctor-weather__inner {
  height: 100px;
  position: relative;
  width: 100%;
  background-size: contain;
}

.weather-user {
  .weather {
    width: 100%;
    height: auto;
    position: absolute;
  }
}

@media only screen and (max-width: 480px) {
  .region-date{
    .region_top{
      align-items: center;
      justify-content: space-between;

      .time{
        font-size: 25px;
      }

      #timeRegion{
        font-size: 15px;
      }
    }
  }

  .weather-user{
    display: none !important;
  }
}
</style>
