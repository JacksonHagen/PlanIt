<template>
  <div class="container" v-if="!activeProject">
    <div class="row">
      <div class="col-12 text-center">
        <h1>Loading...</h1>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <div
      v-if="account.id === activeProject.creatorId"
      @click="openModal()"
      class="btn btn-lg bg-dark ms-2 mt-0"
    >
      Add Sprint
    </div>
    <button @click="openOffCanvas()" class="btn bg-info btn-lg">
      All Projects
    </button>
    <div class="row">
      <div class="col-12 d-flex justify-content-end">
        <h1 class="mb-5">{{ activeProject.name }}</h1>
        <div class="" v-if="account.id === activeProject.creatorId">
          <i
            class="mdi mdi-trash-can mdi-36px lighten-10 pointer"
            @click="removeProject"
          ></i>
        </div>
      </div>
    </div>
    <div class="row"></div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <Sprint v-for="s in activeSprints" :key="s.id" :sprint="s" />
        </div>
      </div>
    </div>
  </div>
  <OffCanvas id="project-canvas">
    <template #body>
      <div
        class="bg-info projects-off p-1 m-1 my-2"
        v-for="p in projects"
        :key="p.id"
        :project="p"
      >
        <h5 @click="goToProject(p.id)" class="pointer">
          {{ p.name }}
        </h5>
      </div>
    </template>
  </OffCanvas>
  <Modal id="createSprintModal">
    <template #title>
      <h5>Create a Sprint!</h5>
    </template>
    <template #body>
      <SprintForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { Modal, Offcanvas } from "bootstrap";
import { useRoute, useRouter } from "vue-router";
import { projectsService } from "../services/ProjectsService";
import { sprintsService } from "../services/SprintsService";
import { tasksService } from "../services/TasksService.js";
import { notesService } from "../services/NotesService.js";
export default {
  name: "Project",
  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      try {
        await notesService.getAllNotes(route.params.projectId);
      } catch (error) {
        console.error("[Couldnt get notes]", error.message);
        Pop.toast(error.message, "error");
      }
      try {
        await projectsService.getAllProjects(route.params.projectId);
      } catch (error) {
        console.error("[Couldnt get projects]", error.message);
        Pop.toast(error.message, "error");
      }
    });
    watchEffect(async () => {
      try {
        AppState.activeProject = null;
        if (route.params.projectId) {
          const projectId = route.params.projectId;
          await projectsService.setActiveProject(projectId);
          await sprintsService.getAllActiveSprints(projectId);
          await tasksService.getTasks(projectId);
        }
      } catch (error) {
        Pop.toast("no sprints loser!");
      }
    });
    return {
      activeProject: computed(() => AppState.activeProject),
      activeSprints: computed(() => AppState.activeSprints),
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),

      openModal() {
        document.getElementById("sprintForm").reset();
        Modal.getOrCreateInstance(
          document.getElementById("createSprintModal")
        ).toggle();
      },
      async openOffCanvas() {
        Offcanvas.getOrCreateInstance(
          document.getElementById("project-canvas")
        ).toggle();
      },
      goToProject(id) {
        router.push({ path: "/project/" + id });
        Offcanvas.getOrCreateInstance(
          document.getElementById("project-canvas")
        ).toggle();
      },
      async removeProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(route.params.projectId);
            Pop.toast("wow that sure worked", "success");
            router.push({ name: "Home" });
          }
        } catch (error) {
          console.error("could not delete", error.message);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 5em;
  font-family: "Oleo Script Swash Caps", cursive;
}
.projects-off {
  border: 0.1em white solid;
}
</style>
