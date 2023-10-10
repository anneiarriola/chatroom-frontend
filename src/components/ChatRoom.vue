<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <span>{{ formattedDate }}</span>
    </v-system-bar>

    <v-app-bar app clipped-right flat height="72">
      Chat
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app width="300">
      <v-navigation-drawer
        v-model="drawer"
        absolute
        color="grey lighten-3"
        mini-variant
      >
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="grey darken-1"
          size="36"
        ></v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>

        <v-avatar
          v-for="n in 6"
          :key="n"
          class="d-block text-center mx-auto mb-9"
          color="grey lighten-1"
          size="28"
        ></v-avatar>
      </v-navigation-drawer>

      <v-sheet color="grey lighten-5" height="128" width="100%"></v-sheet>
    </v-navigation-drawer>
    <div>
      <v-card elevation="0">
        <v-card-text>
          <v-list dense rounded>
            <v-list-item
              v-for="(message, index) in allMessagesSt"
              :key="index"
              color="blue"
              class="my-3"
              :class="{
                'message-bubble': message.user_sender_id !== userIdSt,
                'message-bubble.sender': message.user_sender_id === userIdSt,
              }"
            >
              <v-list-item-content
                :class="{
                  'text-left': message.user_sender_id !== userIdSt,
                  'text-right': message.user_sender_id === userIdSt,
                }"
              >
                <v-list-item-subtitle class="font-weight-regular"
                  >{{ message.user_sender_id }}
                  <span class="text-caption text-right">{{
                    formatDateTime(message.timestamp)
                  }}</span></v-list-item-subtitle
                >
                <v-list-item-title class="font-weight-medium"
                  >{{ message.content }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
      <v-footer app color="white" height="80" inset elevation="4">
        <v-text-field
          v-model="newMessage"
          @keyup.enter="sendMessage"
          background-color="grey lighten-3"
          dense
          flat
          append-icon="mdi-send-variant-outline"
          hide-details
          placeholder="Type a message..."
          rounded
          solo
        ></v-text-field>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import io from "socket.io-client";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: null,
      room: this.$route.params.room,
      socket: null,
      newMessage: "",
      formattedDate: "",
    };
  },
  mounted() {
    // Conectar al espacio de nombres específico en el servidor
    this.socket = io(`http://localhost:3000/`);
    // Escuchar eventos del socket
    this.socket.on(this.room, (message) => {
      console.log("dsadasd", message);
      this.allMessagesSt.push(message);
    });

    this.socket.on("disconnect", () => {
      console.log("Desconectado del servidor");
    });
    this.fetchAllMessageSt();
    this.updateDate();
    // Update the date every second (1000 milliseconds)
    setInterval(() => {
      this.updateDate();
    }, 1000);
  },

  computed: {
    ...mapState({
      userIdSt: (state) => state.userId,
      isLoadingMessage: (state) => state.MessageStoreModule.isLoadingMessage,
      allMessagesSt: (state) => state.MessageStoreModule.allMessages,
    }),
  },
  methods: {
    ...mapActions({
      createMessageSt: "MessageStoreModule/createMessageStore",
      fetchAllMessageSt: "MessageStoreModule/fetchAllMessages",
    }),
    sendMessage() {
      if (this.newMessage.trim() === "") return;
      this.createMessageSt({
        user_sender_id: this.userIdSt,
        chat_room_id: this.room,
        content: this.newMessage,
      });
      // this.socket.emit("message", {
      //   user_sender_id: this.userIdSt,
      //   chat_room_id: this.room,
      //   content: this.newMessage,
      // });
      // console.log(this.socket);
      this.newMessage = "";
    },
    updateDate() {
      const currentDate = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      this.formattedDate = currentDate.toLocaleDateString(undefined, options);
    },
    formatDateTime(dateTimeString) {
      const options = { hour: "numeric", minute: "numeric", hour12: true };
      return new Date(dateTimeString).toLocaleTimeString(undefined, options);
    },
  },
};
</script>
<style scoped>
.message-bubble {
  background-color: #c1e7ffc8;
  color: #333;
  border-radius: 14px;
  padding: 10px 15px;
  font-size: 14px;
  max-width: 50%;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.message-bubble.sender {
  background-color: #6996b3;
  align-self: flex-end;
}
</style>
