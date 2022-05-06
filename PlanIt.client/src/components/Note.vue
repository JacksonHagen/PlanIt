<template>
  <div class="row note-body mx-2">
    <div class="col-12 d-flex justify-content-between bg-dark p-1">
      <span class="d-flex">
        <img
          class="profile-pic rounded-pill"
          :src="note.creator.picture"
          alt=""
        />
        <b class="ms-3 mt-2">{{ note.creator.name }}:</b>
      </span>
      <div class="bg-info p-2 m-1 rounded note-text text-light">
        {{ note.body }}
      </div>
      <i
        v-if="note.creatorId == account.id"
        class="mdi mdi-trash-can pointer"
        @click="removeNote()"
      ></i>
    </div>
  </div>
  <div class="row">
    <div class="col-12"></div>
  </div>

  <br />
  <!-- NOTE run all api tests - read the style guide -->
</template>

<script>
import { computed } from "@vue/reactivity";
import { notesService } from "../services/NotesService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async removeNote() {
        try {
          if (await Pop.confirm()) {
            await notesService.removeNote(props.note);
            Pop.toast("Note delorted!", "success");
          }
        } catch (error) {
          Pop.toast("cannot delete", "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.profile-pic {
  object-fit: cover;
  height: 3em;
  width: 3em;
}
.mdi-close {
  right: 0;
}
.note-body {
  box-shadow: 0.4em 0.6em 0.6em rgba(0, 0, 0, 0.46);
}
.note-text {
  width: 100%;
}
</style>
