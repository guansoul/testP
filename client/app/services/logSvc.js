/**
 * Created by liyuanning
 */

class logSvc {
    constructor(Api, $location, $http) {
        "ngInject";
        this.Api = Api;
    }

    /**POST
     * 登录验证
     */
    loginbyusername(username, password) {
        return this.Api.post('/api/v1/login', {
            "username": username,
            "password": password
        });
    }
    // 登出
    logout(params){
         return this.Api.post('/api/v1/logout', '');
    }
}


export default logSvc
