/**
 * (description)
 * 
 * @author yourname
 */

export default class AutomenuController {
  constructor($scope) {
	"ngInject";
	this.name = 'automenu';
	this.$scope = $scope;
	this.keys = ['hi_journal'];
    this.openKeys = ['submenufirst'];
  }
}