<template>
  <div class="col-4 bg-info rounded m-3">
    <h1 class="btn bg-dark text-light text-bold fs-5" @click="goToProject">
      {{ project.name }}
    </h1>
    <p class="fs-6">
      {{ project.description }}
    </p>
  </div>
  <br />
</template>

<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { Project } from "../Models/Project.js";
import { projectsService } from "../services/ProjectsService.js";
import Pop from "../utils/Pop.js";
export default {
  props: {
    project: {
      type: Project,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    return {
      account: computed(() => AppState.account),
      goToProject() {
        router.push({ path: "/project/" + props.project.id });
        projectsService.setActiveProject(props.project.id);
      },
      async removeProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(props.project.id);
            Pop.toast("It been delete", "success");
          }
        } catch (error) {
          console.error("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.col-4 {
  width: 20%;
  box-shadow: 0.5em 1em #31316693;
}

.btn {
  padding: 0.1em;
  margin: 0;
  border: 0.1em rgba(255, 255, 255, 0.282) groove;
  width: 100%;
  font-family: "Lexend Deca", sans-serif;
}
</style>
