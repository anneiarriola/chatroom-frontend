import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/WelcomeChat.vue";
import ChatRoom from "./components/ChatRoom.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/chatroom/:room", component: ChatRoom },
];

const router = new VueRouter({
  mode: "history", // Use history mode instead of hash mode
  routes, // short for `routes: routes`
});

export default router;
