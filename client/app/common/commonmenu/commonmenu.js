import angular from 'angular';
import {Menu} from 'fancyui';
import component from './commonmenu.component';

export default angular.module('commonmenu', [Menu.name])
	.component('commonmenu', component);
