<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-content>
            <v-list-item-title
              >Chats for
              <strong v-if="user">{{
                user.user_name
              }}</strong></v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="createChatRoom()">
              <v-icon color="primary">mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="(chat, i)  in chatRoom" :key="i">
          <v-list-item-content>
            <v-list-item-title v-if="chat === ''"> No Chats!></v-list-item-title>
            <v-list-item-title>{{chat.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon
        v-if="user !== null"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>ChatRoom {{ user }}</v-toolbar-title>
    </v-app-bar>
    <v-main class="mx-5">
      <div v-if="user !== null">
        <h1 class="text-h3">
          Welcome to the Chat! <br />
          <strong class="primary--text">{{ user.user_name }}</strong>
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
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import SocketChatRoom from '../api/chatroom/chatroom-api'
export default {
  data: () => ({
    drawer: true,
    showCreateChatRoom: false,
    showCreateUser: false,
  }),
  components: {
    CreateChatRoom: () => import("@/components/modals/ModalCreateChatRoom.vue"),
    ModalCreateUser: () => import("@/components/modals/ModalCreateUser.vue"),
  },
  mounted() {
    this.fetchChatRoomSt()
  },
  computed: {
    ...mapState({
      isLoadingCreation: (state) => state.UserStoreModule.isLoadingCreateUser,
      user: (state) => state.UserStoreModule.userCreated,
      chatRoom: (state) => state.ChatRoomStoreModule.chatroom
    }),
  },
  methods: {
    ...mapActions({
      fetchUserSt: "UserStoreModule/fetchUser",
      fetchChatRoomSt: "ChatRoomStoreModule/fetchChatRoom",
    }),
    createUser() {
      this.showCreateUser = true;
      // this.fetchUserSt()
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
  },
};
</script>
