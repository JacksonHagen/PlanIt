<template>
  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    aria-labelledby="offcanvasScrollingLabel"
  >
    <div class="offcanvas-header bg-info">
      <h2 class="" id="offcanvasScrollingLabel">Projects</h2>
      <hr />
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body bg-dark text-light">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
