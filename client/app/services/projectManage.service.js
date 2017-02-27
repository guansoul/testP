export default class serviceProjectManage {
    constructor(Api) {
            "ngInject";
            this.Api = Api;
        }
        /**
         * 获取我的项目和所有项目
         */
    getProjetData(params) {
        return this.Api.get('/api/v1/projects', params);
    }
    getProjetByid(params) {
        return this.Api.get('/api/v1/projects/'+params);
    }
    getUserDoc(params) {
        return this.Api.get('app/mock/projectManageList.json', params)
    }
    addProject(params) {
        return this.Api.post('/api/v1/projects', params);
    }
    editProject(params) {
        return this.Api.put('/api/v1/projects/' + params.id, params);
    }
    deleteProject(params) {
        return this.Api.del('/api/v1/projects/' + params);
    }
    searchProjetData(params) {
            return this.Api.get('/api/v1/projects/search', params);
        }
        //关联用户
    getUsersFromProject(params) {
            return this.Api.get('/api/v1/projects/' + params.pid + '/users', params);
        }
        //增加关联用户
    addUsersToProject(pid, username) {
        return this.Api.post('/api/v1/projects/' + pid + '/users?userNames=' + username);
    }
    deleteUsersFromProject(params, username) {
        return this.Api.del('/api/v1/projects/' + params + '/users?userNames=' + username);
    }

}
