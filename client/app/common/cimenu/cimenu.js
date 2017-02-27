import angular from 'angular';
import {Menu} from 'fancyui';
import cimenuComponent from './cimenu.component';

export default angular.module('cimenu', [Menu.name])
 .component('cimenu', cimenuComponent);
