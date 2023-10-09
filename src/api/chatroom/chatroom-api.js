import AxiosService from "@/utils/axios-utils";
// import io from 'socket.io-client';
// const socket = io('http://localhost:3000/v1/chatroom/fetch');
export default class ChatRoomApi {
  static fetchAllChatRoom() {
    return new Promise((resolve) => {
      AxiosService.getRequest(true, "chatroom/fetch", {}).then((res) => {
        resolve(res);
      });
    });
  }
  // static fetchChatRoom() {
  //   return new Promise((resolve) => {
  //     socket.emit('fetchUsers');
  //     socket.on('users', (users) => {
  //       resolve(users);
  //     });
  //   });
  // }
  static createChatRoom(body) {
    return new Promise((resolve) => {
      AxiosService.postRequest(true, "chatroom/create", body).then((res) => {
        resolve(res);
      });
    });
  }
}
