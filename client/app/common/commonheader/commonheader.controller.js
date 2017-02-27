import logoImg from './images/logo.png';
'use strict';

export default class commonHeaderController {
    constructor($scope, $rootScope, $window, Api, $location, logSvc) {
        "ngInject";
        this.$scope = $scope;
        this.logoImg = logoImg;

        this.Api = Api;
        this.logSvc = logSvc
        this.location = $location;
        // 限制菜单显示
        const NO_MENU_LIST = ['login', 'recovery']
        this.layoutNoMenu = false;
        this.layoutNoPic = false
        $rootScope.$on("$locationChangeStart", (history, toUrl, formUrl) => {
            let isNoMenu = 0;
            let isNopic = 0;
            angular.forEach(NO_MENU_LIST, function(item) {
                if (toUrl.indexOf(item) !== -1) {
                    isNoMenu++;
                } else {
                    isNopic++
                }
            }.bind(this));
            this.layoutNoMenu = isNoMenu > 0;
            this.layoutNoPic = isNopic > 0;
            if(window.localStorage.getItem('usr')){
                this.username = window.localStorage.getItem('usr');

            }else{
                 this.location.path('/login');
            }

        })

    }

    toggleUser() {
        $(".head_item").toggleClass('open');
    }

    logout() {
        let self = this;
        self.logSvc.logout().then(req => {
            window.localStorage.clear();
            self.location.path('/login');
        })

    }
}
