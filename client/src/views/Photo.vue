<template>
<div class="container">
  <SideBar></SideBar>
  <div class="contentContainer">
    <div class="linkDiv"><a @click="$router.go(-1)">Back</a></div>
    <div class="photoContainer">
      <div class="photo" :style="{ backgroundImage: 'url(' + this.currentPhoto.url + ')' }"></div>
    </div>
    <div class="commentsContainer">
      <span class="title">Комментарии</span>
      <div class="commentList">
        <div class="comment" v-for="com in comments" :key="com.id">
          <div class="avatarContainer">
            <div class="avatar" :style="{ backgroundImage: 'url(' + com.User.profilePicture + ')' }"
                 @click="onCommentAuthorClick(com.User.id)"></div>
          </div>
          <div class="messageInfo">
            <div class="title"><a @click="onCommentAuthorClick(com.User.id)"
                                  class="name">{{com.User.firstName}}</a>
              <span class="years">, {{com.User.birthDate | moment("from", "now", true) }}</span></div>
            <div class="text">{{com.text}}</div>
            <div class="date">{{com.createdAt | moment("from", true)}}</div>
          </div>
        </div>
      </div>
      <div class="leaveMessageContainer">
        <div class="messageContainer">
          <div class="avatar" :style="{ backgroundImage: 'url(' + this.currentUser.profilePicture + ')' }"></div>
          <div class="text">
            <textarea @keyup="onKeyUpTextAria" placeholder="Write a message...">
            </textarea>
          </div>
        </div>
          <button style="display: none">Send</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import SideBar from '@/components/SideBar.vue'
  import { mapState, mapActions } from 'vuex';
  import {COMMENTS, PHOTO, ADD_COMMENT} from "../constants";
  const moment = require('moment');

    export default {
        name: "Photo",
      components: {
          SideBar
      },
      created() {
        const photoId = this.$route.params.id;
        if( photoId ) {
          this[PHOTO] (photoId);
          this[COMMENTS] (photoId);
        }

      },
      beforeDestroy() {
        this.comments = [];
      },
      computed: {
        ...mapState({
          currentUser: state => state.auth.user,
          currentPhoto: state => state.photo.currentPhoto,
        }),
        comments: {
          get () { return this.$store.state.comment.comments},
          set (value) { this.$store.state.comment.comments = value }
        }
      },
      methods: {
          ...mapActions([PHOTO, COMMENTS, ADD_COMMENT]),
        onCommentAuthorClick(userId) {
            this.$router.push('/user/' + userId);
        },
        onKeyUpTextAria (e) {
            if(e.key === "Enter") {
              const text = e.target.value.slice(0,-1); //Удалить пробельный знак
              const userId = this.currentUser.id;
              const photoId = this.currentPhoto.id;
              const message = {
                userId: userId,
                text: text,
                photoId: photoId
              };
              if(message !== '') {
                this[ADD_COMMENT] (message);
                e.target.value = '';
              }
            }
        }
      }
    }
</script>

<style lang="sass" scoped>
  @keyframes flickerAnimation
    0%
      border: 1px solid #aaabaa
    50%
      border: 1px solid rgba(45, 42, 255, 0.61)
    100%
      border: 1px solid #aaabaa

  .container
    display: flex
    flex-direction: row
    .contentContainer
      display: flex
      flex-direction: column
      flex: 1
      .linkDiv
        margin-top: 5px
        a
          padding: 5px 15px
          background: #b3d4fc
          border-radius: 5px
          font-size: 14px
          text-decoration: underline
          cursor: pointer
      .photoContainer
        margin-top: 15px
        height: 600px
        background: #00040b
        display: flex
        flex-direction: row
        justify-content: center
        .photo
          //object-fit: contain
          background-position: center
          background-size: contain
          background-repeat: no-repeat
          height: 100%
          width: 100%
      .commentsContainer
        display: flex
        flex-direction: column
        padding: 10px
        margin-top: 20px
        .title
          color: #ff8d38
          font-size: 18px
        .commentList
          padding-top: 10px
          margin-top: 15px
          border-top: 1px solid #cbcbcb
          display: flex
          flex-direction: column
          .comment
            display: flex
            flex-direction: row
            border-bottom: 1px solid #dedede
            padding-bottom: 10px
            margin-bottom: 10px
            &:last-child
              border-bottom: none
            .avatarContainer
              display: flex
              flex-direction: column
              justify-content: flex-start
              .avatar
                width: 50px
                height: 50px
                cursor: pointer
                background-position: center
                background-size: cover
            .messageInfo
              margin-left: 10px
              display: flex
              flex-direction: column
              .title
                color: black
                font-size: 16px
                margin-bottom: 8px
                a
                  text-decoration: none
                  cursor: pointer
                  color: #0f00ac
                .years
                  font-size: 15px
              .text
                line-height: 20px
                margin-bottom: 8px
                color: #222222
              .date
                color: #8d8d8d
                font-size: 12px
        .leaveMessageContainer
          display: flex
          flex-direction: column
          .messageContainer
            display: flex
            flex-direction: row
            .text
              flex: 1
              display: flex
              margin-left: 10px

              textarea
                width: 100%
                &:focus
                  border: 1px solid rgba(103, 82, 255, 0.57)

            .avatar
              width: 65px
              height: 65px
              cursor: pointer
              background-position: center
              background-size: cover


</style>
