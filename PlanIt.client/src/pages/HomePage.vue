<template>
  <div class="container-fluid card">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="projects" class="">
          <Project v-for="p in projects" :key="p.id" :project="p" />
        </div>
      </div>
    </div>
    <div class="">
      <button
        class="btn btn-outline-success"
        type="button"
        @click="openModal()"
      >
        Create Project
      </button>
      <!-- <ProjectForm /> -->
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
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'
import { Modal } from 'bootstrap'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getAllProjects()
      }
      catch (error) {
        console.error("[error prefix]", error.message);
        Pop.toast(error.message, "error");
      }
    })
    return {
      projects: computed(() => AppState.projects),
      openModal() {
        document.getElementById('projectForm').reset()
        Modal.getOrCreateInstance(document.getElementById('createProjectModal')).toggle()
      }
    }
  }
}

</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
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
</style>
