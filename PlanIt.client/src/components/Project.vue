<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h2>
        {{ project.name }}
      </h2>
      <h5>
        {{ project.description }}
      </h5>
    </div>
  </div>
</template>


<script>
import { Project } from '../Models/Project.js'
export default {
  props: {
    project: {
      type: Project,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>