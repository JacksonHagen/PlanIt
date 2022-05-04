<template>
  <div class="container">
    <form @submit.prevent="createSprint" id="sprintForm" class="text-center">
      <div class="mb-3">
        <label for="name" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="name"
          id="name"
          aria-describedby="helpId"
          placeholder="Name..."
          v-model="editable.name"
          required
        />
      </div>
      <button class="btn btn-info w-50 mt-3" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { Modal } from "bootstrap";
import { sprintsService } from "../services/SprintsService";
import Pop from "../utils/Pop";
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute()
    const editable = ref({ projectId: route.params.projectId });

    return {
      editable,

      async createSprint() {
        try {
          await sprintsService.createSprint(editable.value);
          document.getElementById("sprintForm").reset();
          Modal.getOrCreateInstance(
            document.getElementById("createSprintModal")
          ).toggle();
        } catch (error) {
          console.log("couldnt create");
          Pop.toast(error);
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
