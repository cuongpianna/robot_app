<template>
  <div class="login-container" :style="{'background-image': 'url(' + require('@/assets/bg.png') + ')' }">
    <vue-particles color="#dedede" />
    <vs-row vs-type="flex" vs-w="3" class="login-form ">
      <vs-col vs-type="flex">
        <el-form
          v-if="isLogin"
          ref="loginForm"
          class="w-full frmlogin"
          :model="loginForm"
          :rules="loginRules"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">{{ generateTitleView('title', 'login') }}</h3>
          </div>
          <el-form-item prop="username">
            <vs-input
              id="txtUserName"
              v-model="loginForm.username"
              class="w-full"
              :label-placeholder="generateTitleView('userName', 'login')"
              color="rgb(88, 90, 250)"
              icon-no-border
              size="large"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item prop="password">
            <vs-input
              id="txtPassword"
              ref="password"
              v-model="loginForm.password"
              class="w-full"
              :label-placeholder="generateTitleView('password', 'login')"
              :type="passwordType"
              color="rgb(88, 90, 250)"
              icon-no-border
              size="large"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <vs-button
            ref="loadableButton"
            color="rgb(88, 90, 250)"
            type="filled"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
          >{{ generateTitleView('loginBtn', 'login') }}
          </vs-button>
        </el-form>
      </vs-col>
    </vs-row>

  </div>
</template>
<script>

import { validUsername } from '@/help/utils/validate'
import { generateTitleView } from '@/help/utils/i18n'
import { Message } from 'element-ui'
import User from '@/models/user'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.generateTitleView('passwordLength', 'message')))
      } else {
        callback()
      }
    }

    return {
      isLogin: true,
      loginForm: new User('', '', ''),
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      // loading: false,
      passwordType: 'password',
      redirect: undefined,
      colorLoading: 'rgb(88, 90, 250)',
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect

        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    document.getElementById('txtPassword').focus()
    document.getElementById('txtUserName').focus()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$vs.loading({ color: this.colorLoading })
          this.$store
              .dispatch('auth/Login', this.loginForm)
              .then((res) => {
                this.$vs.loading.close()
                if (res.token) {
                  // window.location.href = window.location.origin + '/'
                  this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                } else {
                  Message({
                    message: this.generateTitleView('errorMessageLogin', 'message'),
                    type: 'error',
                    duration: 5 * 1000
                  })
                }
              })
              .catch(() => {
                this.$vs.loading.close()
                Message({
                  message: this.generateTitleView('errorMessageServerLogin', 'message'),
                  type: 'error',
                  duration: 5 * 1000
                })
              })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>

.vs-con-input-label {
  width: 100% !important
}

$bg: #fff;
$light_gray: #616161;
$cursor: #616161;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }

}

.material-icons {
  padding-top: 5px;
  font-size: 19px;
}

.img-login {
  // padding-top: 5%;
  max-width: 95%;
  height: auto;
  position: absolute;
}

.img-register {
  padding-top: 15%;
  max-width: 100%;
  height: auto;
  position: absolute;
}

.vs-input--placeholder.large {
  padding-top: 1px;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    .el-form-item {
      border-bottom: 1px solid #e0e0e0;
      background: #fff;
      border-radius: 0;
      color: #454545;
    }

  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #3187e0;

.login-form {
  background: red;
}

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 100vh;

  .frmlogin {
    width: 100%;
  }

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    padding: 30px 35px 30px;
    margin: 0 auto;
    overflow: hidden;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    -webkit-box-shadow: 0 4px 8px 0 #00000014;
    box-shadow: 0 4px 8px 0 #00000014;
  }

  .tips {
    font-size: 14px;
    color: #616161;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }

    }
  }

  .svg-container {
    // padding: 6px 5px 6px 15px;
    padding: 6px 5px 6px 0px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 18px;
      color: #7b7b7b;
      margin: 0px auto 40px auto;
      text-align: left;
      text-transform: uppercase;
      font-weight: bold;
      padding-left: 12px;
      border-left: 2px solid #585afa;
    }

  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 20px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .text-link {
    color: #585afa;
  }

}

.login-container /deep/ .vs-con-input {
  #txtUserName {
    height: 40px !important;
  }

  span.input-span-placeholder.vs-input--placeholder.large.large.vs-placeholder-label {
    padding: 0 12px;
    height: 40px !important;
    line-height: 40px;
  }

  #txtPassword {
    height: 40px !important;
  }
}

@media only screen and (max-width: 480px) {
  .login-form{
    width: 90% !important;
  }
}
</style>
