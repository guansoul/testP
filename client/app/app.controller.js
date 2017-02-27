/**
 * track.json默认为空，不填不作任何操作
 */
import routerConfig from './router/routerConfig';

class AppController {
    constructor(ffanRouter,$rootScope) {
        'ngInject';
        //ffanRouter.registerTracking(routerConfig);
        const NO_MENU_LIST = ['login', 'recovery']
        this.layoutNoMenu = false;
        $rootScope.$on("$locationChangeStart", (history, toUrl, formUrl) => {
            //识别用哪个左导航
            var  menuS = "home",
                 menuList = ["ciHistory", "atmticTest","posCtrl"];
            for(var i = 0, len = menuList.length; i < len; i++) {
                if(toUrl.indexOf(menuList[i]) != -1) {
                    menuS = menuList[i];
                }
            }
            this.menuTab = menuS;
            let isNoMenu = 0;
            angular.forEach(NO_MENU_LIST, function(item) {
                if (toUrl.indexOf(item) !== -1) {
                    isNoMenu++;
                }
            }.bind(this));
            this.layoutNoMenu = isNoMenu > 0
        })
    }
}

export default AppController;
