import Vue from 'vue';
const PATH = require("../utils/applicationPath.js");
import Service from '../plugins/Service';
import notifyPlugin from'../plugins/Notify.js'


// REGISTER NOTIFY PLUGIN
Vue.use(notifyPlugin)

// Add Public path url to global vue instance
Vue.prototype.$Path = PATH;

// REGISTER API LAYER
Vue.prototype.$Service = Service
