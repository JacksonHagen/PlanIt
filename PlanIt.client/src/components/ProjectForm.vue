<template>
  <div class="container">
    <form @submit.prevent="create" id="projectForm" class="text-center">
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
      <div class="mb-3">
        <label for="description" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="description"
          id="description"
          aria-describedby="helpId"
          placeholder="Description..."
          v-model="editable.description"
          required
        />
      </div>
      <button class="btn btn-info w-50 mt-3" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Pop from "../utils/Pop.js";
import { projectsService } from "../services/ProjectsService.js";
import { Modal } from "bootstrap";
export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      async create() {
        try {
          await projectsService.createProject(editable.value);
          document.getElementById("projectForm").reset();
          Modal.getOrCreateInstance(
            document.getElementById("createProjectModal")
          ).toggle();
        } catch (error) {
          console.error("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
