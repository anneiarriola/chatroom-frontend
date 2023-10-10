import axios from 'axios'

export default class AxiosService {
  static getRequest (useBaseUrl, endpoint, body) {
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url: `${useBaseUrl ? 'https://chatroom-backend-ov5r4k05w-anneiarriola.vercel.app/v1/' : ''}${endpoint}`,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: body
      })
        .then((res) => {
          resolve({
            status: res.status,
            data: res.data && res.data.result ? res.data.result : res.data,
            message: res.data && res.data.message ? res.data.message : 'OK'
          })
        })
        .catch(function (error) {
          if (error.response) {
            resolve({
              status: error.response.status,
              data: error.response.data,
              message: error.response.data.message
            })
          } else if (error.request) {
            resolve({
              status: 500,
              data: null,
              message: 'Server Error'
            })
          } else {
            resolve({
              status: 500,
              data: null,
              message: 'Server Error Unkwnon'
            })
          }
        })
    })
  }

  static postRequest (useBaseUrl, endpoint, body) {
    return new Promise((resolve) => {
      axios({
        method: 'POST',
        url: `${useBaseUrl ? 'https://chatroom-backend-ov5r4k05w-anneiarriola.vercel.app/v1/' : ''}${endpoint}`,
        data: body
      })
        .then((res) => {
          resolve({
            status: res.status,
            data: res.data && res.data.result ? res.data.result : res.data,
            message: res.data && res.data.message ? res.data.message : 'OK'
          })
        })
        .catch(function (error) {
          if (error.response) {
            resolve({
              status: error.response.status,
              data: error.response.data,
              message: error.response.data.message
            })
          } else if (error.request) {
            resolve({
              status: 500,
              data: null,
              message: 'Server Error'
            })
          } else {
            resolve({
              status: 500,
              data: null,
              message: 'Server Error Unkwnon'
            })
          }
        })
    })
  }

  static putRequest (useBaseUrl, endpoint, body) {
    return new Promise((resolve) => {
      axios({
        method: 'PUT',
        url: `${useBaseUrl ? 'https://chatroom-backend-ov5r4k05w-anneiarriola.vercel.app/v1/' : ''}${endpoint}`,
        data: body
      })
        .then((res) => {
          resolve({
            status: res.status,
            data: res.data && res.data.result ? res.data.result : res.data,
            message: res.data && res.data.message ? res.data.message : 'OK'
          })
        })
        .catch(function (error) {
          if (error.response) {
            resolve({
              status: error.response.status,
              data: error.response.data,
              message: error.response.data.message
            })
          } else if (error.request) {
            resolve({
              status: 500,
              data: null,
              message: 'Server Error'
            })
          } else {
            resolve({
              status: 500,
              data: null,
              message: 'Server Error Unkwnon'
            })
          }
        })
    })
  }

  static deleteRequest (useBaseUrl, endpoint, body) {
    return new Promise((resolve) => {
      axios({
        method: 'DELETE',
        url: `${useBaseUrl ? 'https://chatroom-backend-ov5r4k05w-anneiarriola.vercel.app/v1/' : ''}${endpoint}`,
        data: body
      })
        .then((res) => {
          resolve({
            status: res.status,
            data: res.data && res.data.result ? res.data.result : res.data,
            message: res.data && res.data.message ? res.data.message : 'OK'
          })
        })
        .catch(function (error) {
          if (error.response) {
            resolve({
              status: error.response.status,
              data: error.response.data,
              message: error.response.data.message
            })
          } else if (error.request) {
            resolve({
              status: 500,
              data: null,
              message: 'Server Error'
            })
          } else {
            resolve({
              status: 500,
              data: null,
              message: 'Server Error Unkwnon'
            })
          }
        })
    })
  }
}
