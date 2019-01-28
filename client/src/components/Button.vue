<template>
<a :class="[type, {inactiveButton: !isActive}]" @click="handler()"  >{{this.name}}</a>
</template>

<script>
export default {
  name: 'Button',
  props: {
    name: String,
    type: String,
    handler: Function,
    isActive: Boolean
  }
}
</script>

<style lang="sass" scoped>
%default
  /* Стандартные свойства для кнопки */
  border-radius: 100px
  font-family: 'Cuprum', sans-serif
  user-select: none
  -moz-user-select: none
  -ms-user-select: none
  -webkit-user-select: none
  -webkit-touch-callout: none
  text-decoration: none
  font-weight: bold
  cursor: pointer
  text-align: center

.primaryBtn
  @extend %default
  background-color: #006094
  color: white
  padding: 10px 60px
  width: 50px
.inactiveButton
  pointer-events: none
  background-color: gray
</style>
