<template>
  <div class="row justify-content-between m-1">
    <div class="col-10">
      <h2 class="btn">
        {{ sprint.name }}
      </h2>
      <button @click="openModal()" class="btn btn-success">Create Task</button>
    </div>
    <div class="col-2 text-end">
      <i
        class="mdi mdi-close mdi-36px text-secondary lighten-10 pointer"
        @click="removeSprint()"
      ></i>
    </div>
    <div class="container">
      <Task v-for="t in tasks" :key="t.id" :task="t" />
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
import { Modal } from 'bootstrap';
import { sprintsService } from '../services/SprintsService.js';
import Pop from '../utils/Pop.js';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    return {
      tasks: computed(() => AppState.tasks),
      async removeSprint() {
        try {
          if (await Pop.confirm()) {
            await sprintsService.removeSprint(props.sprint)
            Pop.toast('Sprint Removed!', 'success')
          }
        }
        catch (error) {
          console.error("[COULD NOT REMOVE SPRINT]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      openModal() {
        document.getElementById("taskForm").reset();
        Modal.getOrCreateInstance(
          document.getElementById(`s-${props.sprint.id}`)
        ).toggle();
      }
    };
  },
};
</script>

<style lang="scss" scoped></style>
