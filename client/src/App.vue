<template>
  <div id="app">
    <Header></Header>
    <div class="contentWrap">
      <div class="routerWrap">
        <router-view/>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer/Footer.vue'
  export default {
    components: { Header, Footer }
  }

</script>

<style lang="sass">
  #app
    display: flex
    flex-direction: column
    .contentWrap
      display: flex
      flex: 1
      flex-direction: row
      justify-content: center
      margin-bottom: 15px
      .routerWrap
        padding: 20px 15px 28px
        flex-basis: 900px
        background: #fcfcfc
</style>
