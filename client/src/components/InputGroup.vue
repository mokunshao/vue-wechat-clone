<template>
  <div class="inputGroup">
    <label :for="name">
      <slot name="label"></slot>
    </label>
    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :name="name"
      @input="$emit('input',$event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: "InputGroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String
  }
};
</script>

<style lang="scss" scoped>
.inputGroup {
  box-sizing: border-box;
  height: 60px;
  border-bottom: 1px solid #d9d9dd;
  padding: 10px 0;
  line-height: 60px;
  label {
    display: inline-block;
    width: 30%;
    font-size: 16px;
  }
  input {
    display: inline-block;
    width: 65%;
    border: none;
    outline: none;
  }
}
</style>
