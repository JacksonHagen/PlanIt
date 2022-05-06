<template>
  <nav class="navbar navbar-expand-lg bg-transparent">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <img class="logo" src="../assets/img/ppNewLogo.png" />
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
button {
  background-color: rgb(219, 219, 255);
  padding: 0.1em;
  margin: 0;
  border: 0.1em rgba(255, 255, 255, 0.282) groove;
  width: 100%;
  font-family: "Lexend Deca", sans-serif;
}

.logo {
  width: 20em;
}

.banner {
  width: 16em;
}
</style>
