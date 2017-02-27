/**
 * (description)
 *
 * @author yourname
 */
import pop from "./pop.html";
export default class UserDocController {
  constructor(NgTableParams,ServiceProjectManage,modalInstance,$uibModal) {
  	'ngInject';

  	this.loading=false;
  	this.total=0;
    this.ServiceProjectManage=ServiceProjectManage;
    this.modalInstance=modalInstance;
    this.uibModal=$uibModal;
    this.NgTableParams = NgTableParams;
    this.init();

  }
  init(){
     let self=this;
        self.tableParams = new self.NgTableParams({
            page: 1,
            count: 10
        }, {
            getData: ($defer, params) => {
                let paramData=self.serviceParams();
                self.loading = true;
                self.loadPromise = self.ServiceProjectManage.getUserDoc(paramData);
                let returnData=self.loadPromise
                .then(listData=>{
                    self.loading = false;
                    params.total(listData.total);
                    //self.total=listData.total;
                    self.total=4;
                    return listData;
                }, ()=>{

                })
                return returnData;
            }
        });
  }
  serviceParams(){
    let obj={};
    obj.url='app/mock/projectManageList.json';
    obj.postParams={};
  	return obj;
  }
  createProject(){
    let self=this;
    let modalInstance = self.modalInstance.instance = self.uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: pop,
            controller: function () {
                let self = this;

                self.ok = function (params) {
                    console.log(params);

                };

                self.cancel = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };
            },
            controllerAs: 'vm'
        });
  }
}
