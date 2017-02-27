import angular from 'angular';
import {Menu} from 'fancyui';
import automenuComponent from './automenu.component';
export default angular.module('automenu', [Menu.name])
	.component('automenu', automenuComponent);
