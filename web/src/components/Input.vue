<template>
  <div class="box-input">
    <label>{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: String,
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped lang="scss">
.box-input {
  display: flex;
  flex-direction: column;

  input {
    all: unset;
    padding: 0.5rem;
    border: 1px solid #000;
    border-radius: 6px;
  }

  label {
    margin-bottom: 0.5rem;
  }
}
</style>
