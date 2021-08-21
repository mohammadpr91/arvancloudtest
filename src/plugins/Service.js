// import Vue from 'vue'
import axios from 'axios';
import { Notify } from 'quasar';
import Store from "../store";

const headers = [
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*' ,
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest',
  axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'
]

class Service {
  async request(
    method,
    url,
    dataModel,
    isAuthorized = true,
  )
  { return await this.sendApi(method, url, dataModel, isAuthorized); }

  async sendApi (method, url, dataModel, isAuthorized) {
    const config = {
      method: method,
      url: url,
      data: dataModel,
      headers: this.headerConf(isAuthorized)
    }

    try {
      let response = "";
      response = await axios(config)

      return this.handleSuccess(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  headerConf(isAuthorized) {
    if (isAuthorized) {
      return {
        Authorization: 'Token ' + Store().state.userConf.token,
      }
    } 
  }

  handleSuccess(response) {
    if (response.status === 200) return response;
  }

  handleError(error) {
    if (error.response.status == "422") {
      Notify.create({
        message: 'Login Failed!  User name and/or Password is invalid',
        color: 'negative'
      })
    }
    if (error.response.status == "403") {
      Notify.create({
        message: 'not owned by user',
        color: 'negative',
        position: 'top-right',
        classes: 'notification-plugin-style'
      })
    }
    if (error.response.status == "401") {
      Notify.create({
        message: 'your are not Authorized, please Login',
        color: 'negative',
        position: 'top-right',
        classes: 'notification-plugin-style'
      })
    }
    if (error.response.status == "404") {
      Notify.create({
        message: 'page not found',
        color: 'negative',
        position: 'top-right',
        classes: 'notification-plugin-style'
      })
      if (typeof error.response === 'undefined') {
        Notify.create({
          message: 'A network error occurred. '
          + 'This could be a CORS issue or a dropped internet connection. '
          + 'It is not possible for us to know.',
          color: 'negative',
          position: 'top-right',
          classes: 'notification-plugin-style'
        })
      }
    }
    return  error;
  }
}

export default new Service

