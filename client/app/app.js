/**
 * bp admin entry
 * @author name emailAddress
 */

'use strict';

import angular from 'angular';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import AppService from './services/services';
import 'angular-ui-bootstrap';
import 'angular-busy/dist/angular-busy';
import 'angular-busy/angular-busy.css';
import router from './router/router';
import './skin/theme.less';
import { ffanTable, Transfer, InputNumber } from 'fancyui';

angular.module('app', [
    router.name,
    Common.name,
    Components.name,
    AppService.name,
    ffanTable.name,
    Transfer.name,
    InputNumber.name,
    'cgBusy',
    'ui.bootstrap'
  ])
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $urlRouterProvider.otherwise('/login');
  })
  .constant('$menuConstant', {
    DEBUG: process.env.DEBUG
  })
  .component('app', AppComponent)
  .constant('modalInstance', {instance:null})

  console.log('process.env.DEBUG', process.env.DEBUG);
