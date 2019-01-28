<template>
  <div class="container">
    <div class="bigPic"></div>
    <div class="bigTitle">FIND YOUR LOVE</div>
    <div class="contentContainer">
      <div class="enterContainer"><a @click="onLoginClick()" >Have account already?</a></div>
      <div class="register"><a @click="onSignUpClick()" >don't have? Sign up for free!</a></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import {addUser, getAllUsers} from "../api/rest/usersService";
import {login} from "../api/rest/authorizationService";
import { CURRENT_USER } from '../constants'


export default {
  name: 'home',
  created() {
    /*if (this.user === null)
      this[CURRENT_USER]();*/
  },
  components: {
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    ...mapActions([CURRENT_USER]),
    onLoginClick() {
      this.$router.push('/login')
    },
    onSignUpClick() {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="sass" scoped>
  .container
    display: flex
    flex-direction: column
    .bigPic
      border: 3px #2C5C92 solid
      height: 500px
      margin: 20px -50px 0 -50px
      background: url("https://iliusstu-a.akamaihd.net/uk.match.com/all/small-122f6612fd6.jpg")
    .bigTitle
      z-index: 2
      margin-top: -290px
      text-align: center
      font-weight: bold
      width: 100%
      color: #ff0500
      font-family: "Montserrat", sans-serif
      font-size: 90px
    .contentContainer
      margin-top: 260px
      display: flex
      flex-direction: column
      .enterContainer
        text-align: center
        font-size: 18px
        font-weight: 200
        margin-bottom: 24px
        a
          cursor: pointer
          background: #2C5C92
          padding: 12px 15px
          color: #fff9f8
          text-decoration: none
          font-family: "Montserrat", sans-serif
          &:active
            background: #223992
            box-shadow: inset 0px 0px 12px 2px rgba(0,0,0,0.4)
      .register
        text-align: center
        font-size: 14px
        a
          cursor: pointer
          color: #7f7b7e
          &:hover
            color: #4b494a

</style>
