<template>
  <div class="sideBar">
    <ul class="sideBarList">
      <li class="sideBarItem popularity"><a>Popularity</a></li>
      <li class="sideBarItem"><a>Guests</a></li>
      <li class="sideBarItem"><a>Want to meet</a></li>
      <li class="sideBarItem"><a>You want to meet</a></li>
      <li class="sideBarItem"><a>Mutual sympathy</a></li>
      <li class="sideBarItem"><a>Ratings</a></li>
      <li class="sideBarItem"><a>Comments</a></li>
      <li class="sideBarItem"><a>Favorites</a></li>
    </ul>
    <div class="searchStatistic">
      <div class="info">You are on 120 place in search</div>
      <div><span class="arrowUp">&#8593 </span><a href="#">Lift yourself</a></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SideBar"
    }
</script>

<style lang="sass" scoped>
  .sideBar
    width: 180px
    margin-right: 20px
    font-family: 'Cuprum', sans-serif
    .searchStatistic
      margin-top: 16px
      background: rgba(242, 214, 135, 0.44)
      border-radius: 5px
      padding: 12px 10px
      font-size: 14px
      text-align: center
      .info
        color: rgb(242, 125, 12)
        margin-bottom: 3px
      .arrowUp
        font-size: 20px

    .sideBarList
      display: flex
      flex-direction: column
      border: 1px solid #cbcbcb
      border-radius: 8px
      .sideBarItem
        height: 36px
        border-bottom: 1px solid #ebebeb
        display: flex
        flex-direction: column
        justify-content: center
        a
          font-size: 14px
          color: #002347
          cursor: pointer
          margin-left: 7px
          &:hover
            text-decoration: underline
        &:last-child
          border-bottom: none
</style>
