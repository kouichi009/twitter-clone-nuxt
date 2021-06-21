<template>
  <v-app-bar app>
    <v-toolbar-title @click="toHome">Twitter</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="!user">
      <v-btn depressed to="signin" class="headline text-capitalize"
        >Login</v-btn
      >
      <v-btn
        color="#2CB696"
        class="white--text headline text-capitalize mr-5"
        to="signup"
        >Sign Up</v-btn
      >
    </div>
    <div v-else>
      <v-avatar>
        <img :src="user.profileImageUrl" alt="avatar" />
      </v-avatar>
      <span style="font-size: 30px">{{ user.name }}</span>
      <v-btn depressed class="headline text-capitalize" @click="signout"
        >Sign out</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script>
import { db, firebase } from "~/plugins/firebase";

export default {
  data() {
    return {};
  },

  methods: {
    toHome() {
      this.$router.push({ path: `/` });
    },
    signout() {
      console.log("signout");
      firebase
        .auth()
        .signOut()
        .then(
          _ => {
            window.location.reload(true);
          },
          err => {}
        );
    }
  },
  computed: {
    user() {
      const user = this.$store.getters["user"];
      console.log("user@@@@: ", user);
      return user;
    }
  }
};
</script>

<style scoped>
.v-toolbar__title {
  cursor: pointer;
  font-size: 2rem;
  margin-left: 10px;
}

@media (max-width: 576px) {
  .v-toolbar__title {
    cursor: pointer;
    font-size: 1.6rem;
    margin-left: 5px;
  }
}
</style>
