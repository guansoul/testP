export default class ServiceManageService {
    constructor(Api,$http) {
        'ngInject';
        this.Api = Api;
        this.$http = $http;
    }

    /**
     * 获取独立服务列表
     */
    getIndependentServiceList(params) {
        return this.Api.get('/api/v1/apps', params);
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }

    /**
     * 获取项目列表
     */
    getMyProjectList(params){
        return this.Api.get('/api/v1/projects', params);
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }

    /**
     * 获取镜像列表
     */
    getBaseImageList(params){
        return this.Api.get('/api/v1/images', params);
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }

    /**
     * 降级
     */
    rollback(params){
        return this.Api.post('/api/v1/services/'+ params.sid + '/rollback');
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }

    /**
     * 创建交付环境
     */
    createPublishEnv(params){
        return this.Api.post('/api/v1/services', params);
        // return this.Api.get('app/mock/depServiceManageList.json', params);
    }
    /**
     * 编辑交付环境
     */
    editPublishEnv(params){
        return this.Api.put('/api/v1/services/update', params);
        // return this.Api.get('app/mock/depServiceManageList.json', params);
    }

    /**
     * 一键交付
     */
    doPublishEnv(params){
        let sid = params.sid;
        return this.Api.put('/api/v1/services/' + sid  + '/delivery', params.delivery);
        // return this.Api.get('app/mock/depServiceManageList.json', params);
    }

    /**
     * 节点标签
     */
    getLabels(params){
        return this.Api.get('/api/v1/labels');
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }

    /**
     * 获取环境
     */
    getEnvs(params){
        return this.Api.get('/api/v1/envs');
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }

    /**
     * 获取历史记录
     */
    getHistory(params){
        return this.Api.get('/api/v1/services/' + params.sid + '/history', params);
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }

    /**
     * 获取服务详情
     */
    getDetail(params){
        return this.Api.get('/api/v1/services/detail/'+ params.sid);
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }

    /**
     * 获取依赖服务列表
     */
    getDependentServiceList(params) {
        // return this.Api.get('/api/v1/services/list', params);
        return this.Api.get('app/mock/depServiceManageList.json', params);
    }

    /**
     * 独立服务管理创建服务请求
     */
    addApp(params) {
        return this.Api.post('/api/v1/apps', params);
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }
    /**
     * 独立服务管理编辑服务请求
     */
    editApp(params) {
        return this.Api.put('/api/v1/apps/'+params.id , params);
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }
    /**
     * 独立服务管理删除应用请求
     */
    deleteApp(params) {
        return this.Api.del('/api/v1/apps/'+params.id);
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }

    /**
     * 独立服务管理获取环境列表请求
     */
    getEnvServiceList(params) {
        return this.Api.get('/api/v1/services/list', params);
        //return this.Api.get('app/mock/serviceManageList.json', params);
    }
    /**
     * 独立服务管理启动服务请求
     */
    startService(params) {
        return this.Api.post('/api/v1/services/'+params.id+'/start');
        //return this.Api.get('app/mock/serviceManageList.json', params);
    }
    /**
     * 独立服务管理暂停服务请求
     */
    stopService(params) {
        return this.Api.post('/api/v1/services/'+params.id+'/stop');
        //return this.Api.get('app/mock/serviceManageList.json', params);
    }
    /**
     * 独立服务管理删除服务请求
     */
    deleteService(params) {
        return this.Api.del('/api/v1/services/'+params.serviceId);
        // return this.Api.get('app/mock/serviceManageList.json', params);
    }
    /**
     * 交付状态
     */
    stepsStage(params){
        return this.Api.get('/api/v1/delivery/'+params+'/status')
    }

    /**
     * 环境列表交付状态
     */
    getServiceStatus(sid){
        return this.Api.get('/api/v1/services/'+sid+'/status')
    }

    /**
     * 交付日志
     */
    stepsLog(params){
        return this.Api.get('/api/v1/logs/delivery',params);
    }

    /**
     * 获取扩缩容实例数
     */
    getReplicas(params){
        return this.Api.get('/api/v1/services/'+ params.sid + '/scale');
    }

    /**
     * 设定扩缩容实例数
     */
    setReplicas(sid, params){
        return this.Api.put('/api/v1/services/'+ sid + '/scale',params);
    }
    //历史记录
    getAppList(params){
        console.log(params)
          return this.Api.get('/api/v1/delivery/'+ params.sid + '/list',params);
    }
}
