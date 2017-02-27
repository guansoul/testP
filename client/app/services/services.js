
import angular from 'angular';
import Api from './api.service';
import ServiceManageService from './serviceManage.service';
import ServiceProjectManage from './projectManage.service';
import serviceMirror from './serviceMirror.service';
import serviceEnvManage from './envManage.service';
import logSvc from './logSvc'


export default angular.module('app.service', [])
  .service({
  	Api,
    ServiceManageService,
    ServiceProjectManage,
    serviceEnvManage,
    serviceMirror,
    logSvc
  })
  .constant('APIBASE','');
