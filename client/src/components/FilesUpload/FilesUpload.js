import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'FilesUpload',
  components: { vueDropzone: vue2Dropzone },
  props: {
    userId: Number,
    closeModalHandler: Function
  },
  data () {
    return {
      dropzoneOptions: {
        url: 'http://localhost:3000/api/testPhotos/' + this.userId,
        thumbnailWidth: 150,
        maxFilesize: 2, // mb
      },
    }
  },
  methods: {
    beforeOpen (event) {
      console.log(this.dropzoneOptions.url);
    },
  }
}
