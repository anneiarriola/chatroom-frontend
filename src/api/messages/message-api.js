import AxiosService from "@/utils/axios-utils";

export default class MessageApi {
  static createMessage(body) {
    return new Promise((resolve) => {
      AxiosService.postRequest(true, "message/create", body).then((res) => {
        resolve(res);
      });
    });
  }

  static fetchAllMessage() {
    return new Promise((resolve) => {
      AxiosService.getRequest(true, "message/fetch", {}).then((res) => {
        console.log(res)
        resolve(res);
      });
    });
  }
}
