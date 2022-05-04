<template>
  <div class="container">
    <form @submit.prevent="createTask()" id="taskForm" class="text-center">
      <div class="mb-3">
        <label for="name" class="form-label">Task Name</label>
        <input
          type="text"
          class="form-control"
          name="name"
          id="name"
          aria-describedby="helpId"
          placeholder="Task Name..."
          v-model="editable.name"
          required
        />
      </div>
      <div class="mb-3">
        <div class="mb-3">
          <label for="taskWeight" class="form-label">Task Weight</label>
          <input
            type="number"
            class="form-control"
            name="taskWeight"
            id="taskWeight"
            placeholder="Task Weight..."
            v-model="editable.weight"
          />
        </div>
      </div>
      <button class="btn btn-info w-50 mt-3" type="submit">Submit</button>
    </form>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity'
import { tasksService } from '../services/TasksService.js'
import Pop from '../utils/Pop.js'
import { useRoute } from 'vue-router'
import { Modal } from 'bootstrap'
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({ sprintId: props.sprint.id, projectId: route.params.projectId })
    return {
      editable,
      async createTask() {
        try {
          await tasksService.createTask(editable.value)
          Modal.getOrCreateInstance(document.getElementById('s-' + props.sprint.id)).toggle()
          Pop.toast('Task Created!', 'success')
        }
        catch (error) {
          console.error("[COULD NOT CREATE TASK]", error.message);
          Pop.toast(error.message, "error");
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>