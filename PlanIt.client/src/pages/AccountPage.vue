<template>
  <div class="about text-center">
    <div class="container">
      <div v-if="!editing" class="row d-flex">
        <div class="col-9"></div>
        <i class="selectable ms-2 mdi mdi-pencil" @click="editing = true"></i>
      </div>
      <form v-else @submit="editAccount()">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Name.."
            v-model="account.name"
          />
        </div>
        <div class="mb-3">
          <label for="img" class="form-label">Picture</label>
          <input
            type="text"
            class="form-control"
            id="img"
            placeholder="Img..."
            v-model="account.picture"
          />
        </div>
        <button class="btn btn-danger" @click="editing = false">Cancel</button>
        <button class="btn btn-success ms-2">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState";
import { accountService } from "../services/AccountService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  name: "Account",

  setup() {
    const editing = ref(false);

    return {
      editing,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.editAccount(AppState.account);
          Pop.toast("Updated User", "success");
          editing.value = false;
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
