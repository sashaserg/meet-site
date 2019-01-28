<template>
<div class="container">
  <SideBar></SideBar>
  <div class="contentContainer">
    <FilterBar></FilterBar>
    <div class="usersList">
      <loading :active.sync="isFetching"
                    :can-cancel="false"
                    :is-full-page='true'></loading>
      <UsersListItem v-for="user in users"
                     :key="user.id" :propsUser="user">
      </UsersListItem>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { USERS } from '../constants'
import UsersListItem from '@/components/UsersListItem.vue'
import FilterBar from '@/components/FilterBar.vue'
import SideBar from '@/components/SideBar.vue'
const queryString = require('query-string');
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Users',
  components: {
    UsersListItem, FilterBar, SideBar, Loading
  },
  created () {
    const queryParams = this.$route.query;
    this[USERS](queryParams);
  },
  computed: {
    ...mapState({
      users: state => state.user.users,
      isFetching: state => state.isFetching,
      error: state => state.error
    })
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
    font-family: 'Cuprum', sans-serif
    width: 100%
    display: flex
    flex-direction: row
    .contentContainer
      flex: 1
      .usersList
        margin-top: 15px
        flex-grow: 3
        display: flex
        flex-direction: column
        .test
          width: 100%
          height: 100%



</style>
