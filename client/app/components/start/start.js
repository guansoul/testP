import startComponent from './start.component';
import {Charts} from 'fancyui';
export default angular.module('start', [
    Charts.name])
/**
 * 请在routerConfig.js里定义路由
 */
.component('start', startComponent);
