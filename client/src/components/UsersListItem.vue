<template>
  <div class="container" @click="onUserClick">
    <div class="userItem" >
      <div class="profilePicture" :style="getProfileUrl()">
        <div class="indicator"></div>
      </div>
      <div class="profileInfo">
        <div class="title">
          <span class="fullName">{{propsUser.firstName + ' ' + propsUser.lastName}}</span>
        </div>
        <p class="message">
          {{propsUser.gender}}
          {{propsUser.birthDate | moment("from", "now", true) }},
          {{propsUser.purpose}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UsersListItem',
    props: {
      propsUser: Object
    },
    methods: {
      // Если у юзера есть фотка - показать её, если нет - показать заглушку. (как в телеграмме)
      getProfileUrl () {
        if (this.propsUser.profilePicture) {
          return { 'background-image': `url('${this.propsUser.profilePicture}')` }
        } else {
          return { 'background-image': `url('http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')` }
        }
      },
      onUserClick () {
        this.$router.push('/user/' + this.propsUser.id);
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700&subset=cyrillic')
  .container
    display: flex
    flex-direction: column
    cursor: pointer
    &:hover
      box-shadow: inset 0px 0px 0px 1px rgb(226, 217, 226)
    .userItem
      display: flex
      flex-direction: row
      align-items: center
      height: 80px
      min-width: 120px
      border-bottom: 2px #f7f7f7 solid
      .profilePicture
        width: 60px
        height: 60px
        border-radius: 100%
        border: 2px white solid
        -webkit-box-shadow: -4px 4px 10px -4px rgba(69,69,69,0.75)
        -moz-box-shadow: -4px 4px 10px -4px rgba(69,69,69,0.75)
        box-shadow: -4px 4px 10px -4px rgba(69,69,69,0.75)
        margin-left: 14px
        background-position: center
        background-size: cover
        display: flex
        justify-content: flex-end
        align-items: flex-end
        .indicator
          height: 12px
          width: 12px
          background-color: #48c740
          border: 2px white solid
          border-radius: 50%
      .profileInfo
        display: flex
        flex: 1
        flex-direction: column
        margin-left: 11px
        margin-right: 7px
        .title
          display: flex
          justify-content: space-between
          align-items: center
          margin-bottom: 5px
          .fullName
            font-family: 'Montserrat', sans-serif
            font-weight: 600
            font-size: 16px
            color: #002347
        .message
          margin: 0
          font-family: 'Montserrat', sans-serif
          font-weight: normal
          font-size: 14px
          color: #00152b
          opacity: .7
          overflow: hidden
          display: -webkit-box
          text-align: left
          -webkit-line-clamp: 2 /* number of lines to show */
          -webkit-box-orient: vertical
          text-overflow: ellipsis

</style>
