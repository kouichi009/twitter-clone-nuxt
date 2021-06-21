<template>
  <v-main class="container mt-10">
    <div v-if="user">
      <v-row>
        <v-avatar class="ml-5">
          <img :src="user.profileImageUrl" alt="avatar" />
        </v-avatar>
        <v-btn
          class="ml-5 mt-1 text-capitalize"
          tile
          outlined
          color="success"
          @click="sendTweet"
          >Tweet</v-btn
        >
      </v-row>
      <v-container fluid>
        <v-textarea
          name="input-7-1"
          v-model="content"
          placeholder="Write something ..."
          filled
          auto-grow
        ></v-textarea>
      </v-container>
    </div>

    <div v-for="post in posts" :key="post.id">
      <post :post="post"></post>
    </div>
  </v-main>
</template>

<script>
import Post from "~/components/Post.vue";

export default {
  data() {
    return {
      content: ""
    };
  },
  components: {
    Post
  },
  mounted() {
    this.$store.dispatch("checkAuth");
    this.$store.dispatch("queryPosts");
  },

  methods: {
    sendTweet() {
      if (!this.content) {
        return;
      }
      try {
        this.$store.dispatch("createPost", {
          content: this.content,
          user: this.user
        });
        this.content = "";
      } catch (err) {
        console.log(err.message);
      }
    }
  },
  computed: {
    posts() {
      const posts = this.$store.getters["posts"];
      console.log("posts@@@@: ", posts);
      return posts;
    },

    user() {
      const user = this.$store.getters["user"];
      console.log("user@@@@: ", user);
      return user;
    }
  }
};
</script>

<style scoped></style>
