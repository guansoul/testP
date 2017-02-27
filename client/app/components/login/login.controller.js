/**
 * (description)
 *
 * @author yourname
 */
'use strict';
import backff from './images/title.png'
import backgg from './images/back2.png'
import userimg from './images/user.png'
import light_userimg from './images/user_click.png'
import passimg from './images/password.png'
import light_passimg from './images/pass_click.png'
import go from './images/go.png'
export default class LoginController {
    constructor($location, Api, LoadingService, logSvc, $rootScope, $state) {
        'ngInject';
        this.name = 'login';
        this.backff = backff;
        this.backgg = backgg;
        this.userimg = userimg;
        this.light_userimg = light_userimg;
        this.passimg = passimg;
        this.light_passimg = light_passimg;
        this.go = go;
        this.state = $state;
        this.location = $location;
        this.Api = Api;
        this.logSvc = logSvc;
        this.rootScope = $rootScope;
        this.LoadingService = LoadingService;
        this.isCheck = false;
        this.isCheckUser = false;
        this.isCheckPasssWord = false;
    }

    //可能会有缓存的问题，需要解决
    login() {
        let self = this;
        self.loading = self.LoadingService.loading({
            target: '#loginBg',
            text: '登录中...'
        });
        self.logSvc.loginbyusername(self.username, self.password)
            .then(function(req) {
                if (req.user.id !== null) {

                    self.state.go('start');
                    window.localStorage.setItem("token", req.token);
                    window.localStorage.setItem("usr", self.username);
                    window.localStorage.setItem("usrid", req.user.id);
                    //self.loading.close();

                } else {
                    window.localStorage.clear()
                    self.loading.close();
                    self.state.go('start');
                    console.log("err is invaild passwrd or username")
                }
            }, function(err) {
                console.log(err)
                window.localStorage.clear();
                self.loading.close();
            });
    }

    toggleCheck(){
        let _this = this;
        console.log(this.isCheck);
        if( _this.isCheck ){
            _this.isCheck = false;
        }else{
            _this.isCheck = true;
        }
    }
    aaa(){
        this.userimg = light_userimg;
        this.isCheckPasssWord = false;
        if( this.isCheckUser ){
            this.isCheckUser = false;
        }else{
            this.isCheckUser = true;
        }
    }
    bbb(){
        this.passimg = light_passimg;
        this.isCheckUser = false;
        if( this.isCheckPasssWord ){
            this.isCheckPasssWord = false;
        }else{
            this.isCheckPasssWord = true;
        }
    }

}
