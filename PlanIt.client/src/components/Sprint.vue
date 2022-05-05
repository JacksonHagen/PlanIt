<template>
  <div class="col-md-4">
    <div
      class="
        row
        justify-content-between
        border border-dark
        rounded
        sprint-card
        p-1
        tiny-margin
        bg-light
      "
    >
      <div class="col-12 bg-dark p-0 d-flex justify-content-between">
        <div class="p-2">
          <h3>
            {{ sprint.name }}
          </h3>
          <h5 v-if="taskWeight > 0">Total Weight of tasks: {{ taskWeight }}</h5>
        </div>
        <div class="bg-dark" v-if="account.id === sprint.creatorId">
          <i
            class="mdi mdi-close mdi-36px text-secondary lighten-10 pointer"
            @click="removeSprint()"
          ></i>
        </div>
      </div>

      <div v-if="account.id === sprint.creatorId" class="my-3">
        <button @click="openModal()" class="btn btn-success">
          Create Task
        </button>
      </div>

      <div v-for="t in tasks" :key="t.id">
        <Task v-if="t.sprintId == sprint.id" :task="t" />
      </div>
    </div>
  </div>
  <br />
  <Modal :id="'s-' + sprint.id">
    <template #title>
      <h5>Create a Task!</h5>
    </template>
    <template #body>
      <TaskForm :sprint="sprint" />
    </template>
  </Modal>
</template>

<script>
import { Modal } from "bootstrap";
import { sprintsService } from "../services/SprintsService.js";
import Pop from "../utils/Pop.js";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks),
      taskWeight: computed(() => {
        let totalWeight = 0;
        AppState.tasks.forEach((t) => {
          if (t.sprintId == props.sprint.id) {
            totalWeight += t.weight;
          }
        });
        return totalWeight;
      }),
      async removeSprint() {
        try {
          if (await Pop.confirm()) {
            await sprintsService.removeSprint(props.sprint);
            Pop.toast("Sprint Removed!", "success");
          }
        } catch (error) {
          console.error("[COULD NOT REMOVE SPRINT]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      openModal() {
        document.getElementById("taskForm").reset();
        Modal.getOrCreateInstance(
          document.getElementById(`s-${props.sprint.id}`)
        ).toggle();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.sprint-card {
  max-height: 60vh;
  overflow-y: auto;
}
.tiny-margin {
  margin: 0.1%;
}
.top-0 {
  top: 0;
}
</style>
