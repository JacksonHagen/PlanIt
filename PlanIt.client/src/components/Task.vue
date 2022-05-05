<template>
  <li>
    <div class="row justify-content-between m-1">
      <div class="col-10">
        <span class="d-flex flex-column">
          <div class="d-flex">
            <i
              @click="toggleCompleted()"
              class="mdi selectable"
              :class="
                task.isCompleted
                  ? 'mdi-checkbox-marked-outline'
                  : 'mdi-checkbox-blank-outline'
              "
            ></i>
            <h5 class="ms-2">{{ task.name }}</h5>
          </div>
          <div class="">
            <h5>Weight: {{ task.weight }}</h5>
          </div>
          <div v-for="n in notes" :key="n.id">
            <Note v-if="task.id == n.taskId" :note="n" />
          </div>
        </span>
        <NoteForm :task="task" />
        <div v-if="account.id === task.creatorId">
          <div class="btn btn-info" @click="toggleCollapse()">hello</div>
        </div>
      </div>
      <div class="col-2 text-end" v-if="account.id === task.creatorId">
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
import { computed, onMounted, ref } from "@vue/runtime-core";
import { tasksService } from "../services/TasksService.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { Collapse } from "bootstrap";
import { AppState } from "../AppState.js";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const editable = ref({ projectId: route.params.projectId });
    return {
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account),
      editable,
      sprints: computed(() => AppState.activeSprints),
      toggleCollapse() {
        Collapse.getOrCreateInstance(
          document.getElementById("t-" + props.task.id)
        ).toggle();
      },
      async moveTask() {
        try {
          await tasksService.moveTask(props.task, editable.value);
        } catch (error) {
          console.error("[Couldnt move task]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      async removeTask() {
        try {
          if (await Pop.confirm()) {
            await tasksService.removeTask(
              props.task.id,
              route.params.projectId
            );
            Pop.toast("Task removed!", "success");
          }
        } catch (error) {
          console.error("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      async toggleCompleted() {
        try {
          props.task.isCompleted = !props.task.isCompleted;
          props.task.projectId = route.params.projectId;
          await tasksService.toggleCompleted(props.task);
        } catch (error) {
          console.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-aqua {
  background-color: rgba(210, 255, 254, 0.691);
}
</style>
