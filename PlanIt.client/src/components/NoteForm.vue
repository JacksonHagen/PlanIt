<template>
  <div class="container">
    <form @submit.prevent="createNote()" id="noteForm" class="text-center">
      <div class="text-start">
        <label for="body" class="form-label">Note</label>
        <textarea
          type="text"
          class="form-control"
          name="body"
          id="body"
          aria-describedby="helpId"
          placeholder="Add Note..."
          v-model="editable.body"
          required
        >
        </textarea>
        <button class="btn btn-sm w-100 mt-1 bg-dark" type="submit">+</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { notesService } from "../services/NotesService";
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const editable = ref({
      projectId: route.params.projectId,
      taskId: props.task.id,
    });
    return {
      editable,
      async createNote() {
        try {
          await notesService.createNote(editable.value);
          Pop.toast('Note added!', 'success')
          document.getElementById('noteForm').reset()
        } catch (error) {
          console.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
