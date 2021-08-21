import Vue from 'vue';
import { Notify } from 'quasar';

const notifyPlugin = {
  install () {
    Vue.prototype.notification = (message, color) => {
      Notify.create({
          message: message,
          color: color,
          position: 'top-right',
          classes: 'notification-plugin-style'
        })
    }
  }
}

export default notifyPlugin;