 <template>
  <button
    class="yButton"
    :class="{'isDisabled':disabled}"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>
 

<script>
export default {
  name: "YButton",
  props: {
    type: String,
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.yButton {
  display: inline-block;
  width: 100%;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  background-color: #20af0e;
  border: #20af0e;
  text-align: center;
  box-sizing: border-box;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 4px;
  &.isDisabled,
  &.isDisabled:hover,
  &.isDisabled:focus {
    color: #fff;
    background-color: #75b56c;
    border-color: #75b56c;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
