<template>
  <li>
    <div class="row justify-content-between m-1">
      <div class="col-10">
        <h2 class="btn" type="button" @click="toggleCollapse()">
          {{ task.name }}
        </h2>
      </div>
      <div class="col-2 text-end">
        <i
          class="mdi mdi-close mdi-24px text-secondary lighten-10 pointer"
          @click="removeTask()"
        ></i>
      </div>
      <!-- REVIEW Making a collapsable for the form -->
      <div class="col-12">
        <div class="collapse" :id="'t-' + task.id">
          <div class="bg-aqua rounded p-3 elevation-2">
            <form @submit.prevent="moveTask()">
              <div class="row justify-content-between">
                <div class="col-3">
                  <div class="mb-3">
                    <label for="sprintSelect" class="form-label"
                      >Select Sprint</label
                    >
                    <select
                      class="btn w-100"
                      name="sprintSelect"
                      id="sprintSelect"
                      v-model="editable.sprintId"
                    >
                      <!-- REVIEW Creating the options for every sprint -->
                      <option v-for="s in sprints" :key="s.id" :value="s.id">
                        {{ s.name }}
                      </option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-primary w-100">
                    Change Sprint
                  </button>
                </div>
                <div class="col-9"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </li>
  <br />
</template>


<script>
import { computed, onMounted, ref } from '@vue/runtime-core';
import { tasksService } from '../services/TasksService.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { Collapse } from 'bootstrap';
import { AppState } from '../AppState.js';
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({ projectId: route.params.projectId })
    return {
      editable,
      sprints: computed(() => AppState.activeSprints),
      toggleCollapse() {
        Collapse.getOrCreateInstance(document.getElementById('t-' + props.task.id)).toggle()
      },
      async moveTask() {
        try {
          await tasksService.moveTask(props.task, editable.value)
        }
        catch (error) {
          console.error("[Couldnt move task]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      async removeTask() {
        try {
          if (await Pop.confirm()) {
            await tasksService.removeTask(props.task.id, route.params.projectId)
            Pop.toast('Task removed!', 'success')
          }
        }
        catch (error) {
          console.error("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.bg-aqua {
  background-color: rgba(210, 255, 254, 0.691);
}
</style>