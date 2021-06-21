<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Sign in form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-alert v-if="errorMessage" type="error">
              <div class="text-h8">
                {{ errorMessage }}
              </div>
            </v-alert>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="email"
                  prepend-icon="mdi-email"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signin">Sign in</v-btn>
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
    return { email: "", password: "", errorMessage: "" };
  },
  mounted() {},

  methods: {
    async signin() {
      try {
        if (!this.email || !this.password) {
          this.errorMessage = "You need to fill out all fields.";
          return;
        }
        this.errorMessage = "";
        await this.$store.dispatch("signin", {
          email: this.email,
          password: this.password
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
