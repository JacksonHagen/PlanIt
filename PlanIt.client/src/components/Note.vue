<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-between bg-light p-2">
      <span class="d-flex">
        <img
          class="profile-pic rounded-pill"
          :src="note.creator.picture"
          alt=""
        />
        <p class="ms-3 mt-2">{{ note.creator.name }}</p>
      </span>
      <i
        v-if="note.creatorId == account.id"
        class="mdi mdi-close mdi-24px pointer"
        @click="removeNote()"
      ></i>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="bg-white p-2 rounded">
        {{ note.body }}
      </div>
    </div>
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
</style>
