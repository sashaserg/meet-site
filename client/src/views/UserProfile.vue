<template>
<div class="container">
  <SideBar></SideBar>
  <div class="contentContainer">
    <div class="linkDiv">
      <a class="back" @click="$router.go(-1)">Back</a>
      <a class="settings" v-if="user.id === loggedUser.id">settings <font-awesome-icon icon="cogs" /></a>
    </div>
    <div class="header">
      <div class="fullName">{{user.firstName + ' ' + user.lastName}}</div>
      <div class="generalInfo">
        <span class="age">{{user.birthDate | moment("from", "now", true) }}, </span>
        <span class="purpose">want to have a {{user.purpose}}</span>
      </div>
    </div>
    <div class="mainContent">
      <div class="profilePictureWrap">
        <div class="profilePicture" :style="{ backgroundImage: 'url(' + user.profilePicture + ')' }"></div>
      </div>
      <div class="userInformation">
        <span class="title">Personal information</span>
        <div class="infoTable">
          <div class="row">
            <div class="column">Civil status: married</div>
            <div class="column">Education: High</div>
          </div>
          <div class="row">
            <div class="column">Religion: Christian</div>
            <div class="column">Tattoos: No</div>
          </div>
          <div class="row">
            <div class="column">Height: 180</div>
            <div class="column">Weight: 57kg</div>
          </div>
          <div class="row">
            <div class="column">Contexture: Contexture</div>
            <div class="column">Eyes: Blue</div>
          </div>
          <div class="row">
            <div class="column">Children: No</div>
            <div class="column">Work: Programmer</div>
          </div>
          <div class="row">
            <div class="column">Sign: Sign</div>
            <div class="column">Hair: White</div>
          </div>
          <div class="row">
            <div class="column">Smoker: No</div>
            <div class="column">Piercings: Piercings</div>
          </div>
        </div>
      </div>
    </div>
    <div class="actionButtons">
      <button class="action messageButton"><font-awesome-icon icon="envelope" /> Send a message</button>
      <button class="action"><font-awesome-icon icon="gift" /> Send a present</button>
      <button class="action">Or</button>
    </div>
    <div class="photoGallery">
      <div class="galleryTitleContainer">
        <span class="title">Gallery</span>
        <a v-if="user.id === loggedUser.id" class="addPhotos" @click="showModalFileUpload">upload <font-awesome-icon icon="plus-square"/></a>
      </div>
      <div class="photoList">
        <div v-for="photo in userPhotos"
             :key="photo.id"
              class="photo">
          <img :src="photo.url"
               @click="onPhotoClick(photo.id)"/>
        </div>
      </div>
    </div>
    <FilesUpload :userId="parseInt(this.$route.params.id)"
                 :closeModalHandler="closeModal"/>
  </div>

</div>
</template>

<script>
  import { USER_BY_ID, PHOTOS, COMMENTS } from '../constants';
  import { mapState, mapActions } from 'vuex';
  import SideBar from '@/components/SideBar.vue'
  import FilesUpload from '@/components/FilesUpload/FilesUpload.vue'

  export default {
    name: 'UserProfile',
    components: {
      SideBar, FilesUpload
    },
    created() {
      const userId = this.$route.params.id;
      if(userId) {
        this[USER_BY_ID] (userId);
        this[PHOTOS] (userId);
      }

    },
    beforeDestroy() {
      this.userPhotos = [];
      this.user = {};
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
        loggedUser: state => state.auth.user
      }),
      userPhotos: {
        get () { return this.$store.state.photo.photos},
        set (value) { this.$store.state.photo.photos = value }
      },
      user: {
        get () { return this.$store.state.user.displayedUser},
        set (value) { this.$store.state.user.displayedUser = value }
      }
    },
    methods: {
      ...mapActions([USER_BY_ID, PHOTOS, COMMENTS]),
      onPhotoClick(photoId) {
        this.$router.push('/photo/' + photoId);
      },
      getProfileUrl() {
        if (this.user.profilePicture) {
          return { 'background-image': `url('${this.user.profilePicture}')` }
        } else {
          return { 'background-image': 'url("https://www.photoshopessentials.com/newsite/wp-content/uploads/2016/07/face-aware-liquify-featured.jpg")' }
        }
      },
      showModalFileUpload() {
        this.$modal.show('fileUpload');
      },
      closeModal(file, response) {
        this[PHOTOS](this.$route.params.id);
      }
    },
    beforeRouteUpdate (to, from, next) {
      this[USER_BY_ID](to.params.id);
      this[PHOTOS] (to.params.id);
      next();
    },
  }
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700&subset=cyrillic')
.container
  display: flex
  flex-direction: row
  .contentContainer
    display: flex
    flex-direction: column
    flex: 1
    .linkDiv
      display: flex
      flex-direction: row
      justify-content: space-between
      margin-top: 5px
      a
        padding: 5px 15px
        font-size: 15px
        cursor: pointer
      .back
        background: #b3d4fc
        border-radius: 5px
      .settings
        padding-right: 0
    .header
      flex-direction: column
      display: flex
      margin-top: 18px
      .fullName
        font-size: 28px
        font-weight: 600
        color: #ff9d2e
      .generalInfo
        margin-top: 5px
    .mainContent
      display: flex
      flex-direction: row
      margin-top: 20px
      .profilePictureWrap
        margin: 0 30px
        display: flex
        flex-direction: column
        .profilePicture
          width: 240px
          height: 320px
          background-position: center
          background-size: cover
      .userInformation
        flex: 1
        .title
          font-size: 18px
          font-weight: bold
          color: #002347
        .infoTable
          margin-top: 10px
          border: 1px solid #c5c5c5
          border-radius: 5px
          padding: 15px
          display: flex
          flex-direction: column
          background: #fff7e2
          .row
            margin-bottom: 15px
            display: flex
            flex-direction: row
            justify-content: space-between
            &:last-child
              margin-bottom: 0

    .actionButtons
      display: flex
      flex-direction: row
      margin-top: 15px
      .action
        font-size: 14px
        padding: 5px 15px
        border: 1px solid #c5c5c5
        background: none
        &:hover
          background: #c5c5c5
          color: white
        &:first-child
          border-right: none
          border-top-left-radius: 8px
          border-bottom-left-radius: 8px
        &:last-child
          border-left: none
          border-top-right-radius: 8px
          border-bottom-right-radius: 8px
      .messageButton
        background: #ff9d2e
        color: white
    .photoGallery
      margin-top: 20px
      .galleryTitleContainer
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        .title
          font-size: 24px
          font-weight: bold
          color: #002347
        a
          cursor: pointer
          &:hover
            color: #ff7813
      .photoList
        border-radius: 5px
        margin-top: 10px
        border: 1px solid #cbcbcb
        display: flex
        flex-flow: row wrap
        .photo
          display: flex
          padding: 15px
          height: 200px
          width: 25%
          box-sizing: border-box
          @media (max-width: 1050px)
            width: 33.3%
            height: 260px
          @media (max-width: 850px)
            width: 50%
            height: 370px
          @media (max-width: 600px)
            width: 100%
            height: 550px
          img
            object-fit: cover
            cursor: pointer
            height: 100%
            width: 100%






</style>
