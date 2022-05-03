<template>
  <div class="row">
    <div class="col-12">
      <div @click="openModal()" class="btn">fasdfad</div>
      <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
    </div>
  </div>
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
import { onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { useRoute } from "vue-router";
import { projectsService } from "../services/ProjectsService";
import { sprintsService } from "../services/SprintsService";
export default {
  name: "Project",
  setup() {
    const route = useRoute();
    onMounted(async () => {
      projectsService.setActiveProject(route.params.projectId);
      try {
        await sprintsService.getAllSprints(AppState.activeProject);
      } catch (error) {
        Pop.toast("no sprints loser!");
      }
    });
    return {
      sprint: computed(() => AppState.sprints),
      openModal() {
        document.getElementById("sprintForm").reset();
        Modal.getOrCreateInstance(
          document.getElementById("createSprintModal")
        ).toggle();
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
