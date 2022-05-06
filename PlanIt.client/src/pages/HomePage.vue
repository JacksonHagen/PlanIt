<template>
  <div class="home">
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex">
          <button
            class="btn bg-black text-light"
            type="button"
            @click="openModal()"
          >
            +Add Project+
          </button>
        </div>
        <div v-if="projects" class="row d-flex">
          <Project v-for="p in projects" :key="p.id" :project="p" />
        </div>
      </div>
    </div>
  </div>
  <Modal id="createProjectModal">
    <template #title>
      <h3>Create Project</h3>
    </template>
    <template #body>
      <ProjectForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop.js";
import { projectsService } from "../services/ProjectsService.js";
import { Modal } from "bootstrap";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getAllProjects();
      } catch (error) {
        console.error("[error prefix]", error.message);
        Pop.toast(error.message, "error");
      }
    });
    return {
      projects: computed(() => AppState.projects),
      openModal() {
        document.getElementById("projectForm").reset();
        Modal.getOrCreateInstance(
          document.getElementById("createProjectModal")
        ).toggle();
      },
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  place-content: center;
  text-align: center;
  user-select: none;
  padding-left: 10%;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.btn {
  border: 0.1em rgba(255, 255, 255, 0.282) groove;
  width: 10%;
  font-family: "Lexend Deca", sans-serif;
}
</style>
