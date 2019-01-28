import TextInput from '@/components/TextInput.vue'
import Button from '@/components/Button.vue'
import { mapActions, mapState } from "vuex";
import {LOGIN} from '../../constants'
export default {
  name: 'Login',
  components: {
    TextInput,
    Button
  },
  created () {
    if(localStorage.refreshToken) {
      this.$router.push('/users');
    }
  },
  data () {
    return {
      email: '',
      password: '',
      isLoginBtnActive: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    ...mapActions([LOGIN]),
    async onLoginClicked() {
      await this[LOGIN]({
        email: this.email,
        password: this.password
      });
      if(this.user){
        this.$router.push('/users')
      }
    },
    toRegisterPageHandler() {
      this.$router.push('/register')
    },
    changeMethod (fieldName, fieldValue) {
      this[fieldName] = fieldValue
    },
  }
}
