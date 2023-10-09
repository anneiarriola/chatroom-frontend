<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-content>
            <v-list-item-title>Chats</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="createChatRoom()">
              <v-icon color="primary">mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ChatRoom</v-toolbar-title>
    </v-app-bar>
    <v-main class="mx-5">
      <h1 class="text-h3">Welcome to the Chat!</h1>
      <h2 class="text-h5">To start please, create a user!</h2>

      <v-btn text class="text-none primary--text" @click="createUser()">Create user</v-btn>
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
import {mapActions} from 'vuex'
export default {
  data: () => ({
    drawer: null,
    showCreateChatRoom: false,
    showCreateUser: false,
  }),
  components: {
    CreateChatRoom: () => import("@/components/modals/ModalCreateChatRoom.vue"),
    ModalCreateUser: () => import("@/components/modals/ModalCreateUser.vue"),
  },
  mounted () {
    this.fetchUserSt();
  },
  methods: {
    ...mapActions({
      fetchUserSt: 'UserStoreModule/fetchUser'
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
