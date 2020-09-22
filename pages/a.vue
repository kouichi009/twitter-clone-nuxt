<template>
  <v-main class="container mt-10">
    <div>
      <v-row>
        <v-avatar class="ml-5">
          <img src alt="avatar" />
        </v-avatar>
        <v-btn
          class="ml-5 mt-1 text-capitalize"
          tile
          outlined
          color="success"
          @click="sendTweet"
        >Tweet</v-btn>
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
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    sendTweet() {
      console.log("sendTweet: ", this.content);
    },
  },
};
</script>

<style scoped>
</style>
