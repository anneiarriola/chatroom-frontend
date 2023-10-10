<template>
  <div>
    <v-dialog
      v-model="show"
      max-width="500px"
      transition="dialog-top-transition"
      persistent
    >
      <v-card>
        <v-card-title>Create User</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              label="User name"
              required
            ></v-text-field>
            <v-alert v-if="showSuccess" dense text type="success">
              User created!
            </v-alert>
            <v-alert v-if="showError" dense outlined type="error">
              User already exist!
            </v-alert>
            <div class="text-right">
              <v-btn text color="error" @click="show = false" class="mr-5">Cancel</v-btn>
              <v-btn
                color="success"
                :disabled="isLoadingCreation"
                :loading="isLoadingCreation"
                @click="createUser()"
              >
                <template v-slot:loader> <span>Loading...</span> </template
                >Create</v-btn
              >
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: "",
      statusCreatedUser: null,
      valid: false,
      showError: false,
      showSuccess: false,
    };
  },
  computed: {
    ...mapState({
      isLoadingCreation: (state) => state.UserStoreModule.isLoadingCreateUser,
      user: (state) => state.user
    }),
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.statusCreatedUser);
        }
      },
    },
  },
  methods: {
    ...mapActions({
      createUserSt: "UserStoreModule/createUser",
      setLocalStorageSt: 'setUserLocalStorage',
      setUserIdLocatStorageSt: 'setUserIdLocalStorage'
    }),
    resetForm() {
      this.name = "";
      this.$refs.form.resetValidation();
    },
    createUser() {
      this.createUserSt({
        user_name: this.name,
      }).then((res) => {
        if (res.status === 201) {
          this.showSuccess = true;
          this.setLocalStorageSt(this.name)
          this.setUserIdLocatStorageSt(res.data.user._id)
          this.resetForm();
          this.show = false;
          console.log("created!");
        } else {
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
            this.resetForm();
          }, 800);
          console.log("created error!");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
