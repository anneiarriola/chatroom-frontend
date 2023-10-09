import AxiosService from "@/utils/axios-utils";

export default class UserChatRoomApi {
  static validateChatRoom(body) {
    return new Promise((resolve) => {
      AxiosService.postRequest(true, "user_chatroom/joint-chat", body).then(
        (res) => {
          resolve(res);
        }
      );
    });
  }
}
