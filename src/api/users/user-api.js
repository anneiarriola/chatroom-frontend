import AxiosService from "@/utils/axios-utils";

export default class UsersApi {
  static fetchAllUser() {
    return new Promise((resolve) => {
      AxiosService.getRequest(true, "users/hello", {}).then((res) => {
        console.log(res);
        resolve(res);
      });
    });
  }
}
