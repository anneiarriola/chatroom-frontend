import AxiosService from "@/utils/axios-utils";

export default class ChatRoomApi {
  static fetchAllChatRoom() {
    return new Promise((resolve) => {
      AxiosService.getRequest(true, "chatroom/fetch", {}).then((res) => {
        resolve(res);
      });
    });
  }

  static createUser(body) {
    return new Promise((resolve) => {
      AxiosService.postRequest(true, "users/create", body).then((res) => {
        resolve(res);
      });
    });
  }
}
