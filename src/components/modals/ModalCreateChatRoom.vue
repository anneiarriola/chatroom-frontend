<template>
  <div>
    <v-dialog
      v-model="show"
      max-width="500px"
      transition="dialog-top-transition"
      persistent
    >
      <v-card rounded="lg">
        <v-card-title>Create Chat Room</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              label="Name Chat Room"
              required
            ></v-text-field>
            <v-alert v-if="showSuccess" dense text type="success">
              User created!
            </v-alert>
            <v-alert v-if="showError" dense outlined type="error">
              User already exist!
            </v-alert>
            <div class="text-right">
              <v-btn
                text
                color="error"
                class="text-none mr-5"
                @click="show = false"
                >Cancel</v-btn
              >
              <v-btn
                color="success"
                @click="createChatRoom()"
                :loading="isLoadingCreation"
                :disabled="isLoadingCreation"
                >Create

                <template v-slot:loader> <span>Loading...</span> </template>
              </v-btn>
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
      statusCreatedChat: null,
      valid: false,
      showError: false,
      showSuccess: false,
    };
  },
  computed: {
    ...mapState({
      isLoadingCreation: (state) =>
        state.ChatRoomStoreModule.isLoadingCreateChat,
    }),
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close", this.statusCreatedChat);
        }
      },
    },
  },
  methods: {
    ...mapActions({
      createChatRoomSt: "ChatRoomStoreModule/createChatRoom",
    }),
    resetForm() {
      this.name = "";
      this.$refs.form.resetValidation();
    },
    createChatRoom() {
      this.createChatRoomSt({
        name: this.name,
      }).then((res) => {
        if (res.status === 201) {
          this.showSuccess = true;
          this.resetForm();
          this.show = false;
          console.log("created!");
        } else {
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
            this.resetForm();
          }, 1800);
          console.log("created error!");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
