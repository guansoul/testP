export default class servicedetail1{
	constructor(Api){
		"ngInject";
		this.Api=Api;
	}
	/**
   * 获取我的项目和所有项目
   */
  detail1(params){
    return this.Api.get('app/mock/detail1.json',params)
  }
}