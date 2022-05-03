<template>
  <div class="component">
    <div class="col-md-6">
      <h2>
        {{project.name}}
        </h2>
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
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>