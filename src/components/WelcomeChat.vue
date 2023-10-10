<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-content>{{ user }}</v-list-item-content>
          <v-list-item-action>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  icon
                  @click="createChatRoom()"
                >
                  <v-icon color="primary">mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Create Chat Room</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(chat, i) in chatRoom"
          :key="i"
          @click="
            () => {
              openJoinChat(chat.name, chat._id);
            }
          "
        >
          <v-list-item-content>
            <v-list-item-title v-if="chat === ''">
              No Chats!></v-list-item-title
            >
            <v-list-item-title>{{ chat.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-toolbar-title>ChatRoom App</v-toolbar-title>
    </v-app-bar>
    <v-main class="mx-5">
      <div v-if="user !== null">
        <h1 class="text-h3">
          Welcome to the Chat! <br />
          <strong class="primary--text">{{ user }}</strong>
        </h1>
      </div>
      <div v-else>
        <h1 class="text-h3">Welcome to the Chat!</h1>
        <h2 class="text-h5">To start please, create a user!</h2>

        <v-btn text class="text-none primary--text" @click="createUser()"
          >Create user</v-btn
        >
      </div>
    </v-main>
    <create-chat-room
      :visible="showCreateChatRoom"
      @close="onCloseModalCreateChatRoom"
    />
    <modal-create-user
      :visible="showCreateUser"
      @close="onCloseModalCreateUser"
    />
    <modal-join-chat-room
      :visible="showJoinChat"
      :chat_name="chatRoomName"
      :user_id="user_id"
      :chat_id="chatId"
      @close="onCloseModalJoinChat"
    />
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    drawer: true,
    showCreateChatRoom: false,
    showCreateUser: false,
    showJoinChat: false,
    chatRoomName: "",
    chatId: "",
    user_id: "",
  }),
  components: {
    CreateChatRoom: () => import("@/components/modals/ModalCreateChatRoom.vue"),
    ModalCreateUser: () => import("@/components/modals/ModalCreateUser.vue"),
    ModalJoinChatRoom: () =>
      import("@/components/modals/ModalJoinChatRoom.vue"),
  },
  mounted() {
    this.createUser();
    this.fetchChatRoomSt();
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      userIdSt: (state) => state.userId,
      chatRoom: (state) => state.ChatRoomStoreModule.chatroom,
      isLoadingCreationChatRoom: (state) =>
        state.ChatRoomStoreModule.isLoadingCreateChat,
    }),
  },
  methods: {
    ...mapActions({
      fetchUserSt: "UserStoreModule/fetchUser",
      fetchChatRoomSt: "ChatRoomStoreModule/fetchChatRoom",
      validJointChatSt: "UserChatroomStoreModule/validateChatRoomSt",
    }),
    createUser() {
      this.showCreateUser = !this.user;
    },
    onCloseModalCreateUser() {
      this.showCreateUser = false;
    },
    createChatRoom() {
      this.showCreateChatRoom = true;
    },
    onCloseModalCreateChatRoom() {
      this.showCreateChatRoom = false;
    },
    onCloseModalJoinChat() {
      this.showJoinChat = false;
    },
    openJoinChat(chatname, chat_id) {
      this.validJointChatSt({
        user_id: this.userIdSt,
        chat_room_id: chat_id,
      }).then((res) => {
        if (res.status === 200) {
          this.$router.push("/chatroom/" + chat_id);
        } else {
          this.showJoinChat = true;
          this.chatRoomName = chatname;
          this.userId = this.userIdSt;
          this.chatId = chat_id;
        }
      });
    },
  },
};
</script>
