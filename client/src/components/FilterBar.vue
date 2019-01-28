<template>
  <div class="container">
    <div class="filters">
      <div class="filterColumn">
        <input v-model="filter.firstName" placeholder="first name">
        <div class="withPhotoContainer">
          <input v-model="filter.withPhoto" id="withPhoto" type="checkbox">
          <label for="withPhoto"> With photo</label>
        </div>
        <select v-model="filter.gender">
          <option value="" selected>gender</option>
          <option value="man">man</option>
          <option value="woman">woman</option>
        </select>
      </div>
      <div class="separator"></div>
      <div class="filterColumn">
        <input v-model="filter.minAge" placeholder="min age">
        <input v-model="filter.maxAge" placeholder="max age">
        <select v-model="filter.purpose">
          <option value="" selected>purpose</option>
          <option value="friendship">friendship</option>
          <option value="relationship">relationship</option>
          <option value="sex">sex</option>
        </select>
      </div>
      <div class="filterAccept">
        <button @click="onFindClick">Find <font-awesome-icon icon="search" /></button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { USERS } from '../constants'
  const queryString = require('query-string');
    export default {
        name: "FilterBar",
      data() {
        return {
          filter: {
            firstName: '',
            gender: '',
            minAge: null,
            maxAge: null,
            purpose: '',
            withPhoto: false
          }
        }
      },
      methods: {
        ...mapActions([USERS]),
        onFindClick() {
          const queryParams = '?' + queryString.stringify(this.filter);
          this.$router.push('/users' + queryParams);
        }
      },
      beforeRouteUpdate (to, from, next) {
        if (to.path === from.path) {
          this[USERS](to.query);
        }
        next();
      }
    }
</script>

<style lang="sass" scoped>
  .container
    width: auto
    background: #f2f3f2
    border-radius: 8px
    border: 1px solid #cbcbcb
    .filters
      display: flex
      flex-direction: row
      padding: 15px
      flex-grow: 1
      input
        padding: 2px 5px
      select
        padding: 2px 5px
      .separator
        border-left: 1px solid #c5c5c5
        margin-right: 20px
      .filterColumn
        display: flex
        flex-direction: column
        justify-content: space-between
        padding-right: 20px
        height: 80px
        flex: 1
      .filterAccept
        display: flex
        flex-direction: column
        justify-content: center
        button
          font-weight: bold
          width: 100px
          padding: 10px 5px
          background: #ffd965
          border-bottom-right-radius: 5px
          color: #002347


</style>
