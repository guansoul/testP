export default class serviceEnvManage{
    constructor(Api){
        "ngInject";
        this.Api=Api;
    }
    /**
     * 获取我的项目和所有项目
     */
    getProjetData(params){
        return this.Api.get('/api/v1/envs',params)
    }
}
