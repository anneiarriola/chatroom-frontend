import AxiosService from "@/utils/axios-utils";
export default class ChatRoomApi {
  static fetchAllChatRoom() {
    return new Promise((resolve) => {
      AxiosService.getRequest(true, "chatroom/fetch", {}).then((res) => {
        resolve(res);
      });
    });
  }
  static createChatRoom(body) {
    return new Promise((resolve) => {
      AxiosService.postRequest(true, "chatroom/create", body).then((res) => {
        resolve(res);
      });
    });
  }
}
