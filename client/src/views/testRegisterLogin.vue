<template>
  <div>
    <div class = "container" v-if="!user">
      <span >Вы не авторизированы. Войдите или создайте аккаунт</span>
      <div class="login" >
        <span >Alex@gmail.com </span>
        <span >123456789</span>
        <input v-model="email" placeholder="email">
        <input v-model="password" placeholder="password">
        <button @click="btnLoginClick" >Login</button>
      </div>
      <div class="registration" >
        <input v-model="firstName" placeholder="email">
        <input v-model="lastName" placeholder="lastName">
        <input v-model="email" placeholder="email">
        <input v-model="password" placeholder="password">
        <input v-model="gender" placeholder="gender">
        <input v-model="birthDate" placeholder="birthDate">
        <input v-model="purpose" placeholder="purpose">
        <button @click="btnRegistrationClick" >Sign On</button>
      </div>
    </div>
    <div v-if="user">
      Здравствуйте, {{user}}
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { LOGIN, REGISTRATION, LOGOUT, REFRESH_TOKENS } from '../constants'

  export default {
    name: 'testRegisterLogin',
    components: {
    },
    created () {
      if(localStorage.refreshToken) {
        this.$router.push('/users');
      }
    },
    data() {
      return {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        purpose: ''
      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user
      })
    },
    methods: {
      ...mapActions([LOGIN, REGISTRATION, LOGOUT, REFRESH_TOKENS]),
      async btnLoginClick() {
        await this[LOGIN]({
            email: this.email,
            password: this.password
          });
        if(this.user){
          this.$router.push('/users')
        }
      },
      btnRegistrationClick() {
        this[REGISTRATION]({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            gender: this.gender,
            birthDate: this.birthDate,
            intention: this.intention
          })
      },
      btnLogoutClick() {
        this[LOGOUT](
          {
            refreshToken: localStorage.refreshToken
          })
      }
    }
  }
</script>

<style scoped>

</style>
