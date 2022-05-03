<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-white rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo" class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        <div v-if="projects" class="container">
          <Project v-for="p in projects" :key="p.id" :project="p"/>
        </div>
      </h1>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'
export default {
  name: 'Home',
  setup(){
    onMounted(async ()=>{
      try {
        await projectsService.getAllProjects()
      }
      catch(error) {
        console.error("[error prefix]", error.message);
        Pop.toast(error.message, "error");
      }
    })
    return{
      projects: computed(() => AppState.projects)
    }
  }
}

</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
