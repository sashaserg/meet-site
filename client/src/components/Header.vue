<template>
<div class="container">
  <div class="header">
    <div class="logo"></div>
    <nav class="navigation">
      <div class="navItem">
        <router-link to="/">
          <font-awesome-icon icon="home"/><span class="text"> Home</span>
        </router-link></div>
      <div class="navItem"><router-link to="/login">Login</router-link></div>
      <div class="navItem"><router-link to="/register">Sign up</router-link></div>
      <div class="navItem">
        <router-link to="/users">
          <span class="text">Find people </span><font-awesome-icon icon="search"/>
        </router-link>
      </div>
    </nav>
    <div class="userPanel" v-if="this.currentUser">
      <dropDownMenu buttonName="Profile"
                    :itemList="dropDownItems"
                    topOffset="38"></dropDownMenu>
      <div class="userPic"
           :style="{ backgroundImage: 'url(' + currentUser.profilePicture + ')' }"
           @click="myProfileClick"></div>
    </div>
  </div>
</div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { LOGOUT } from "../constants";
  import dropDownMenu from './dropDownMenu.vue'

  export default {
      name: "Header",
      components: {
        dropDownMenu
      },
    data() {
        return {
          dropDownItems: [
            { title: 'My profile', handler: this.myProfileClick},
            { title: 'Settings', handler: this.settingsClick},
            { title: 'Logout', handler: this.logoutClick }
          ]
        }
    },
      computed: {
        ...mapState({
          currentUser: state => state.auth.user,
        })
      },
      methods: {
        ...mapActions([LOGOUT]),
        logoutClick() {
          this[LOGOUT] ();
          this.$router.push('/');
        },
        myProfileClick() {
          const userId = this.currentUser.id;
          this.$router.push('/user/' + userId);
        },
        settingsClick() {
          console.log('settings');
        }
      }

    }
</script>

<style lang="sass" scoped>
.container
  height: 60px
  font-family: 'Montserrat', sans-serif
  display: flex
  flex-direction: row
  justify-content: center
  background: #2C5C92
  border-bottom: 3px solid #ffd965
  .header
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    width: 900px
    height: 100%
    color: whitesmoke
    background-position: center
    background: url('https://cdn140.picsart.com/248507323006212.png?r1024x1024')
    background-size: 50%
    .logo
      height: 50px
      width: 50px
      transition: transform 1s
      background-position: center
      background-size: contain
      background-image: url("http://www.stickpng.com/assets/images/5897aa00cba9841eabab615a.png")
      &:hover
        transform: rotate(360deg)
    .navigation
      display: flex
      flex-direction: row
      .navItem
        cursor: pointer
        margin-left: 18px
        .text
          @media (max-width: 600px)
            display: none
        a
          text-decoration: none
          color: #e7e7e7
          &:hover
            color: white
    .userPanel
      display: flex
      flex-direction: row
      align-items: center
      .dropdown
        margin-right: 15px
        .dropdown-content
          color: chartreuse
      .userPic
        border-radius: 50%
        background-position: center
        background-size: cover
        height: 50px
        width: 50px
        cursor: pointer




</style>
