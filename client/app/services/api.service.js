/**
 * Created by fjywan on 16/4/15.
 */

class Api {
    constructor($http, $q, APIBASE, $window) {
        "ngInject";
        //this.base = APIBASE ? APIBASE : '';
        this.base = "/nebula"
        this.$q = $q;
        this.$http = $http;
        this.window = $window;
    }

    get(url, params,isAlert) {
        let deferred = this.$q.defer();
        let header = "";
        if(url.split(".").pop() != "json") {//前端json假数据
            header = this.base;
        }
       // debugger;
        this.$http({
            url: header + url,
            method: 'get',
            params: params || {},
            headers: {
                "X-AUTH-TOKEN": this.window.localStorage.token,
                "Content-Type": "application/json"
            }
        }).then(function(raw) {
            let result = raw.data;
            if (result.errCode == 0) {
                deferred.resolve(result.data);
            } else {
                if (isAlert != 0) {
                    alert(result.errMessage);
                }
                deferred.reject(result);
            }
        }, function(raw) {
            deferred.reject(raw);
            if (raw.msg) {
                alert(raw.msg)
            } else {
                alert("服务器出错了，请稍后再试！")
            }
        });
        return deferred.promise;
    }

    post(url, params, isAlert) {
        let deferred = this.$q.defer();
        this.$http({
            url: this.base + url,
            data: params || {},
            method: "post",
            headers: {
                "X-AUTH-TOKEN": this.window.localStorage.token,
                "Content-Type": "application/json"
            }
        }).then(function(raw) {
            let result = raw.data;
            if (raw.status == 200) {
                if (result.errCode == 0) {
                    deferred.resolve(result.data)
                } else {
                    if (isAlert != 0) {
                        alert(result.errMessage);
                    }
                    deferred.reject(result);
                }
            }
        }, function(raw) {
            if (raw.msg) {
                alert(raw.msg)
            } else {
                alert("服务器出错了，请稍后再试！")
            }
            deferred.reject(raw);
        });
        return deferred.promise;
    }

    put(url, params, isAlert) {
        let deferred = this.$q.defer();
        this.$http({
            url: this.base + url,
            data: params || {},
            method: "put",
            headers: {
                "X-AUTH-TOKEN": this.window.localStorage.token,
                "Content-Type": "application/json"
            }
        }).then(function(raw) {
            let result = raw.data;
            if (raw.status == 200) {
                if (result.errCode == 0) {
                    deferred.resolve(result.data)
                } else {
                    if (isAlert != 0) {
                        alert(result.errMessage);
                    }
                    deferred.reject(result);
                }
            }
        }, function(raw) {
            if (raw.msg) {
                alert(raw.msg)
            } else {
                alert("服务器出错了，请稍后再试！")
            }
            deferred.reject(raw);
        });
        return deferred.promise;
    }

    del(url, params, isAlert) {
        let deferred = this.$q.defer();
        this.$http({
            url: this.base + url,
            data: params || {},
            method: "delete",
            headers: {
                "X-AUTH-TOKEN": this.window.localStorage.token,
                "Content-Type": "application/json"
            }
        }).then(function(raw) {
            let result = raw.data;
            if (raw.status == 200) {
                if (result.errCode == 0) {
                    deferred.resolve(result.data)
                } else {
                    if (isAlert != 0) {
                        alert(result.errMessage);
                    }
                    deferred.reject(result);
                }
            }
        }, function(raw) {
            if (raw.msg) {
                alert(raw.msg)
            } else {
                alert("服务器出错了，请稍后再试！")
            }
            deferred.reject(raw);
        });
        return deferred.promise;
    }
}

export default Api
