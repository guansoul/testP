'use strict';

export default class commonMenuController {
	constructor($scope,$rootScope) {
		"ngInject";
		this.$scope = $scope;
        let key = sessionStorage.getItem("selectedKey");
		this.keys = key ? [key]: ['start'];
	    this.openKeys = ['submenufirst'];
        $rootScope.$on('$stateChangeStart', function (scope, next, current) {
            console.log(next.name);
            sessionStorage.setItem("selectedKey", next.name);
        }.bind(this));

		// this.showSub = false;
	}

	// collapse(e) {
	// 	$(e.target).parent().find('.sub-menu').toggle();
	// }
}
