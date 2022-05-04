<template>
  <div class="row justify-content-between m-1">
    <div class="col-10">
      <h2 class="btn">
        {{ task.name }}
      </h2>
    </div>
    <div class="col-2 text-end">
      <i
        class="mdi mdi-close mdi-24px text-secondary lighten-10 pointer"
        @click="removeTask()"
      ></i>
    </div>
  </div>
  <br />
</template>


<script>
import { onMounted } from '@vue/runtime-core';
import { tasksService } from '../services/TasksService.js';
import Pop from '../utils/Pop.js';
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
  },
  setup() {
    onMounted(async () => {
      try {
        await tasksService.getTasks()
      }
      catch (error) {
        console.error("[COULD NOT GET TASKS]", error.message);
        Pop.toast(error.message, "error");
      }
    })
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>