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
            <v-alert v-if="errorMessage" type="error">
              <div class="text-h8">
                {{ errorMessage }}
              </div>
            </v-alert>
            <v-card-text>
              <v-form>
                <label>
                  <v-avatar
                    style="display:block; cursor:pointer;"
                    size="120"
                    class="mx-auto"
                  >
                    <v-img :src="avatar"></v-img>
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

                <v-text-field
                  v-model="name"
                  label="Name"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="email"
                  prepend-icon="mdi-email"
                  type="text"
                ></v-text-field>
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
export default {
  data() {
    return {
      errorMessage: "",
      name: "",
      email: "",
      password: "",
      avatar: "",
      imgFile: null
    };
  },
  mounted() {
    this.convertUrlToFile();
  },

  methods: {
    async convertUrlToFile() {
      let response = await fetch(require("~/assets/icon_user.png"));
      let data = await response.blob();
      let metadata = {
        type: "image/jpeg"
      };
      let file = new File([data], "icon_user.jpg", metadata);
      this.imgFile = file;
      this.getBase64(file).then(image => (this.avatar = image));
    },
    async onImageChange(e) {
      const images = e.target.files || e.dataTransfer.files;

      let file = images[0];

      this.imgFile = file;
      this.getBase64(file).then(image => (this.avatar = image));
    },

    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },

    async signup() {
      try {
        if (!this.name || !this.email || !this.password) {
          this.errorMessage = "You need to fill out all fields.";
          return;
        }
        this.errorMessage = "";
        await this.$store.dispatch("signup", {
          name: this.name,
          email: this.email,
          password: this.password,
          imgFile: this.imgFile
        });
        this.$router.push({ path: `/` });
      } catch (err) {
        console.log("errorMessage: ", err.message);
        this.errorMessage = err.message;
      }
    }
  }
};
</script>
