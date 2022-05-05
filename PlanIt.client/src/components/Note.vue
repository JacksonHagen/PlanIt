<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img
          class="profile-pic rounded-pill"
          :src="note.creator.picture"
          alt=""
        />
      </div>
      <div class="col">
        {{ note.creator.name }}
      </div>
    </div>
    <div class="row">
      <div class="col">
        {{ note.body }}
        <i
          v-if="note.creatorId == account.id"
          class="mdi mdi-close mdi-24px selectable"
          @click="removeNote()"
        ></i>
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
  height: 75px;
  width: 75px;
}
</style>
