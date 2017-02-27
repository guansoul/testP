import serviceManageComponent from './serviceManage.component';
import dependenceService from './dependenceService/dependenceService';
import independentService from './independentService/independentService';

export default angular.module('serviceManage', [
  dependenceService.name,
  independentService.name
])
.component('serviceManage', serviceManageComponent);
