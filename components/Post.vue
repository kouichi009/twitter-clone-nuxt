<template>
  <div class="my-5">
    <v-card class="pa-5" v-if="post">
      <div class="row">
        <img :src="post.user.profileImageUrl" alt="Avatar" class="post-avatar" />
        <div class="ml-5">
          <p class="name">
            {{
            post.user.name
            }}
          </p>
        </div>
      </div>
      <p class="pb-5 post-text">{{ post.content }}</p>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["post"],
};
</script>

<style scoped>
.post-text {
  font-size: 16px;
  white-space: pre-wrap;
}

.name {
  color: #2db696;
  font-size: 20px;
}

.post-avatar {
  margin-left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
