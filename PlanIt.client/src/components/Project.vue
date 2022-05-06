<template>
  <div class="col-4 bg-light rounded">
    <h2 class="btn" @click="goToProject">
      {{ project.name }}
    </h2>
    <p>
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
  padding: 1em;
  margin: 1em;
  box-shadow: 0.5em 1em #5655555f;
}

.btn {
  background-color: rgb(219, 219, 255);
}
</style>
