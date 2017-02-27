import loginComponent from './login.component';
import {Service} from 'fancyui';
export default angular.module('login', [Service.name])
/**
 * 轻在routerConfig.js里定义路由
 */
.component('login', loginComponent); 