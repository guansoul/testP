/**
 * (description)
 * 
 * @author yourname
 */

export default class PushController {
  constructor(NgTableParams,Servicedetail1,modalInstance,$uibModal) {
    'ngInject';
    let self=this;
    self.loading=false;
    self.total=0;
    self.Servicedetail1=Servicedetail1;
    self.modalInstance = modalInstance;
    self.$uibModal = $uibModal;
    self.tableParams = new NgTableParams({
      page: 1,
      count: 10
    }, {
      getData: ($defer, params) => {
        // let paramData=self.serviceParams();
        self.loading = true;
        self.loadPromise = self.Servicedetail1.detail1(params);
        let returnData=self.loadPromise
        .then(listData=>{
          self.loading = false;
          params.total(listData.total);
          self.total=listData.total;
          self.total=7;
          return listData;
        }, ()=>{

        })
        return returnData;
      }
    });
  }
      /*
      ** 搜索
      */
      search() {
        this.tableParams.parameters({ page: 1 }).reload();
    }
}

