<template>
  <div class="row justify-content-between m-1">
    <div class="col-10">
      <h2 class="btn">
        {{ sprint.name }}
      </h2>
    </div>
    <div class="col-2 text-end">
      <i
        class="mdi mdi-close mdi-36px text-secondary lighten-10 pointer"
        @click="removeProject"
      ></i>
    </div>
  </div>
  <br />
</template>

<script>
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
