<template>
  <div class="loginWrapper">
    <div class="loginContent">
      <div class="header">
        <h1>Sign up to meeting service<small>Enter your details below</small></h1>
      </div>
      <div class="form">
        <TextInput fieldTitle="Email Address"
                   fieldName="email"
                   placeholder="email@email.com"
                   fieldType="email"
                   :fieldValue="email"
                   :fieldChange="changeMethod"
                   :errorMessage="emailError"></TextInput>
        <TextInput fieldTitle="Password"
                   fieldName="password"
                   placeholder="Enter your password"
                   fieldType="password"
                   :fieldValue="password"
                   :fieldChange="changeMethod"
                   :errorMessage="passwordError"></TextInput>
        <TextInput fieldTitle="Confirm password"
                   fieldName="passwordConfirm"
                   placeholder="Confirm your password"
                   fieldType="password"
                   :fieldValue="passwordConfirm"
                   :fieldChange="changeMethod"
                   :errorMessage="passwordError"></TextInput>
        <div class="btnContainer"><Button name="Sign up"
                     :type="'primaryBtn'"
                     :handler="onRegisterClicked"
                     :isActive='isSignUpBtnActive'></Button></div>
        <a @click="toLoginPageHandler()" class="toLoginPageBtn">Have account already?</a>
      </div>

    </div>
  </div>
</template>

<script>
  import TextInput from '@/components/TextInput.vue'
  import Button from '@/components/Button.vue'
  import { REGISTRATION } from '../constants'
  import { mapActions } from 'vuex'

  export default {
    name: "Registration",
    components: {
      TextInput, Button
    },
    created () {
      if(localStorage.refreshToken) {
        this.$router.push('/users');
      }
    },
    data () {
      return {
        email: '',
        password: '',
        passwordConfirm: '',
        passwordError: '',
        emailError: '',
        isSignUpBtnActive: true
      }
    },
    methods: {
      ...mapActions([REGISTRATION]),
      onRegisterClicked() {
        console.log(this.password + ' ' + this.passwordConfirm)
        if(this.password === this.passwordConfirm)
          this[REGISTRATION] ({email: this.email, password: this.password})
        else {
          this.passwordError = 'Password and confirmation must be equal'
          this.password = '';
          this.passwordConfirm = '';
        }
      },
      changeMethod (fieldName, fieldValue) {
        this[fieldName] = fieldValue
      },
      toLoginPageHandler() {
        this.$router.push('/login');
      }
    },
  }
</script>

<style lang="sass" scoped>
  .loginWrapper
    font-family: 'Cuprum', sans-serif
    width: 100%
    padding-top: 100px
    padding-bottom: 100px
    .loginContent
      max-width: 540px
      margin: 0 auto
      clear: both
      .header
        margin-bottom: 50px
        h1
          color: #434C5F
          text-align: left
          display: block
          font-weight: normal
          font-size: 28px
        small
          color: #596377
          display: block
          font-size: 16px
          margin-top: 10px
      .form
        display: flex
        flex-direction: column
        justify-content: center
        .btnContainer
          display: flex
          flex-direction: row
          justify-content: center
          a
            white-space: nowrap
        .toLoginPageBtn
          display: flex
          justify-content: center
          margin-top: 18px
          text-decoration: underline
          cursor: pointer
          font-size: 12px
          color: #596377

</style>
