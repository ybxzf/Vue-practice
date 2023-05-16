//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import JsonExcel from 'vue-json-excel'// 引入导出Excel
Vue.component('downloadExcel', JsonExcel)

import vuei18n from 'vue-i18n'


// import SocketIO from 'socket.io-client'
// import VueSocketIO from 'vue-socket.io';
// Vue.use(new VueSocketIO({
//   debug: true,
//   // connection: SocketIO(network.wsURL)
//   connection: SocketIO('ws://localhost:3001')
// }))

//关闭Vue的生产提示
Vue.config.productionTip = false
Vue.use(vuei18n)
Vue.use(ElementUI);
//多语言实例
//多语言实例
const i18n = new vuei18n({
	locale: (function () {
		if (localStorage.getItem('lang')) {
			return localStorage.getItem('lang')
		}
		return 'en'
	}()),
	messages: {
		'en': require('@/assets/language/en'), //英文语言包
		'portugal': require('@/assets/language/portugal'), //葡萄牙语言包
		'zh': require('@/assets/language/zhc'), //中文繁体包
	}
})



//创建vm
new Vue({
	el: '#app',
	i18n,
	render: h => h(App),


	// sockets: {
	//监听用的是this.sockets   发送消息是this.$socket，不要弄混
	// connecting() {
	//   console.log("正在连接");
	// },
	// connect() {
	//   console.log("连接成功");
	// },
	// disconnect() {
	//   console.log("断开连接");
	// },
	// connect_failed() {
	//   console.log("连接失败");
	// },
	// error() {
	//   console.log("错误发生，并且无法被其他事件类型所处理");
	// },
	// reconnecting() {
	//   console.log("正在重连");
	// },
	// reconnect_failed() {
	//   console.log("重连失败");
	// },
	// reconnect() {
	//   console.log("重连成功");
	// },
	// welcome: (data) => {
	//   //全局监听订阅事件，需要与后端约定好
	//   console.log("welcome data", data);
	// },
	//   },
})