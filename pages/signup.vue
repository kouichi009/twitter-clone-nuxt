<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Sign up form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <label>
                  <v-avatar style="display:block; cursor:pointer;" size="120" class="mx-auto">
                    <v-img :src="profileImageUrl"></v-img>
                  </v-avatar>
                  <div>
                    <input
                      style="display:none"
                      type="file"
                      id="avatar_name"
                      accept="image/*"
                      @change="onImageChange"
                    />
                  </div>
                </label>

                <v-text-field v-model="name" label="Name" prepend-icon="mdi-account" type="text"></v-text-field>
                <v-text-field v-model="email" label="email" prepend-icon="mdi-email" type="text"></v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signup">Sign up</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { db, firebase } from "~/plugins/firebase";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      profileImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSksCCH3HUjf6bCqqwlrKdcjT8_YZSoNvaeQ&usqp=CAU",
    };
  },
  mounted() {},

  methods: {
    async onImageChange(e) {
      const images = e.target.files || e.dataTransfer.files;
      // let rawImage = images[0];

      let file = images[0];

      // this.uploadFile = compressedImage;
      console.log(file);
      let imageUid = db.collection("users").doc().id;
      var storageRef = firebase
        .storage()
        .ref()
        .child("tmp/" + imageUid + file.name);

      let uploadTask = await storageRef.put(file);
      let url = await uploadTask.ref.getDownloadURL();
      console.log(url);
      this.profileImageUrl = url;
    },

    async signup() {
      try {
        this.$store.dispatch("signup", {
          name: this.name,
          email: this.email,
          password: this.password,
          profileImageUrl: this.profileImageUrl,
        });
        this.$router.push({ path: `/` });
      } catch (err) {
        console.log("errorMessage: ", err.message);
      }
    },
  },
};
</script>
