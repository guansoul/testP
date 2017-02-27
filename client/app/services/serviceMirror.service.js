export default class serviceMirror{
	constructor(Api){
		"ngInject";
		this.Api=Api;
	}
	/**
   * 获取我的项目和所有项目
   */
  serviceMir(params){
    return this.Api.get('/api/v1/images',params)
  }
}