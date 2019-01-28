<template>
  <div class="dropdown">
    <a class="dropbtn">{{buttonName}}</a>
    <div class="dropdown-blank" :style="{height: topOffset + 'px'}"></div>
    <div class="dropdown-content" :style="{top: topOffset + 'px'}">
      <a v-for="item in itemList"
         :key="itemList.indexOf(item)"
         @click="item.handler">
        {{item.title}}
      </a>
    </div>
  </div>
</template>

<script>
    export default {
        name: "dropDownMenu",
      props: {
        itemList: Array,
        buttonName: String,
        topOffset: String
          /*itemList: [
            { title: 'My profile', handler: Function },
            { title: 'Settings', handler: Function },
            { title: 'Logout', handler: Function }
          ],
          buttonName: 'Profile',
          topOffset: null //38*/
      },
    }
</script>

<style lang="sass" scoped>
.dropdown
  position: relative
  display: inline-block
  &:hover
    .dropdown-blank
      display: block
    .dropdown-content
      display: block
  .dropbtn
    font-size: 16px
    color: white
    border: none
    cursor: pointer
  .dropdown-blank
    position: absolute
    display: none
    min-width: 160px
    &:hover
      .dropdown-content
        display: block
  .dropdown-content
    display: none
    position: absolute
    text-align: left
    background-color: #f9f9f9
    min-width: 160px
    cursor: pointer
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2)
    z-index: 1
    a
      color: black
      padding: 12px 16px
      text-decoration: none
      display: block
      &:hover
        background-color: #f1f1f1

</style>
