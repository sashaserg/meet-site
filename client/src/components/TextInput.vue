<template>
<div class="formField">
  <label class="label">{{fieldTitle}}</label>
  <input :id="fieldName"
         :type="fieldType"
         :placeholder="placeholder"
         :value="fieldValue"
         @input="setText($event.target.value)"/>
  <span class="error" v-if="errorMessage">{{errorMessage}}</span>
</div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    fieldName: String,
    fieldTitle: String,
    fieldType: String,
    placeholder: String,
    fieldValue: String,
    fieldChange: Function,
    errorMessage: String
  },
  data () {
    return {
      isDisplayErrorField: false
    }
  },
  methods: {
    setText (value) {
      this.isDisplayErrorField = !value;
      this.fieldChange(this.fieldName, value);
    }
  }
}
</script>

<style lang="sass" scoped>
.formField
  display: flex
  flex-direction: column
  margin-bottom: 23px
  .label
    font-family: 'Cuprum', sans-serif
    display: block
    font-weight: bold
    font-size: 14px
    color: #434C5E
    margin-bottom: 8px
    text-align: left
    letter-spacing: 1px
  input
    border: 1px solid #D4D9E2
    border-radius: 3px
    padding: 15px
    font-size: 14px
    color: #596377
    outline: 0
  .error
    color: red
    text-align: left
    text-indent: 5px
    margin-top: 8px

</style>
