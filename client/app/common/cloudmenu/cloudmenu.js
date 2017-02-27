import angular from 'angular';
import {Menu} from 'fancyui';
import cloudmenuComponent from './cloudmenu.component';
export default angular.module('cloudmenu', [Menu.name])
 .component('cloudmenu', cloudmenuComponent);
