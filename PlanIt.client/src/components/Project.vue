<template>
  <div class="row justify-content-between m-1">
    <div class="col-10">
      <h2 class="btn" @click="goToProject">
        {{ project.name }}
      </h2>
      <p>
        {{ project.description }}
      </p>
    </div>
    <div class="col-2 text-end">
      <button></button>
      <i
        class="mdi mdi-close mdi-36px text-secondary lighten-10 pointer"
        @click="removeProject"
      ></i>
    </div>
  </div>
  <br />
</template>

<script>
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

<style lang="scss" scoped></style>
