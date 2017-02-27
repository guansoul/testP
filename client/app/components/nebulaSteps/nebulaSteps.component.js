import template from './nebulaSteps.html';
import controller from './nebulaSteps.controller';
import './nebulaSteps.less';

export default {
  restrict: 'E',
  bindings: {
  	totalSteps: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};
