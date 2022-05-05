<template>
  <div class="row justify-content-between m-1 border border-dark">
    <div class="col-10 p-3">
      <h2 class="btn">
        {{ sprint.name }}
        {{ taskWeight }}
      </h2>
      <div v-if="account.id === sprint.creatorId">
        <button @click="openModal()" class="btn btn-success">
          Create Task
        </button>
      </div>
    </div>
    <div class="col-2 text-end" v-if="account.id === sprint.creatorId">
      <i
        class="mdi mdi-close mdi-36px text-secondary lighten-10 pointer"
        @click="removeSprint()"
      ></i>
    </div>
    <div class="container">
      <ul>
        <div v-for="t in tasks" :key="t.id">
          <Task v-if="t.sprintId == sprint.id" :task="t" />
        </div>
      </ul>
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

<style lang="scss" scoped></style>
