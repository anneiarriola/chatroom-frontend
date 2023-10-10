<template>
  <div>
    <v-dialog
      v-model="show"
      max-width="500px"
      transition="dialog-top-transition"
    >
      <v-card>
        <v-card-title v-if="!chat_name">Join {{ chat_name }}</v-card-title>
        <v-card-title v-else>Join {{ chat_name }} Chat Room</v-card-title>

        <v-card-text>
          <pre>
         user: {{ userId }}
         chatid: {{ chat_id }}
         name: {{ user }}
          </pre>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div class="text-right">
              <v-btn color="success" @click="createChatRoom()">Join</v-btn>
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
    chat_name: {
      type: String,
      default: "Chat Room",
    },
    user_id: {
      type: String,
      default: "",
    },
    chat_id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      name: "",
      statusCreatedChat: null,
      valid: false,
      showError: false,
      showSuccess: false,
      onboarding: 1,
    };
  },
  computed: {
    ...mapState({
      isLoadingCreation: (state) =>
        state.ChatRoomStoreModule.isLoadingCreateChat,
      user: (state) => state.user,
      userId: (state) => state.userId,
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
      validJointChatSt: 'UserChatroomStoreModule/validateChatRoomSt'
    }),
    resetForm() {
      this.name = "";
      this.$refs.form.resetValidation();
    },
    createChatRoom() {
      this.validJointChatSt({
        user_id: this.userId,
        chat_room_id: this.chat_id,
      }).then((res) => {
        if (res.status === 201) {
          this.showSuccess = true;
          this.resetForm();
          this.show = false;
          console.log("created!");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
