import AxiosService from "@/utils/axios-utils";

export default class UsersApi {
  static fetchAllUser() {
    return new Promise((resolve) => {
      AxiosService.getRequest(true, "users/fetch", {}).then((res) => {
        resolve(res);
      });
    });
  }

  static createUser(body){
    return new Promise((resolve) => {
      AxiosService.postRequest(true, 'users/create', body).then((res) =>{
        resolve(res)
      })
    })
  }
}
