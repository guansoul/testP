/**
 * (description)
 *
 * @author yourname
 */

export default class EnvManageController {
    constructor($uibModal,NgTableParams,serviceEnvManage,modalInstance) {
        'ngInject';
        this.name = 'envManage';
        this.$uibModal = $uibModal;
        // this.$state = $state;
        this.modalInstance = modalInstance;
        let self=this;
        self.loading=false;
        self.total=0;
        self.serviceEnvManage = serviceEnvManage;
        self.tableParams = new NgTableParams({
            // page: 1,
            count: 99999
        }, {
            counts: [],
            getData: ($defer, params) => {
                // let paramData=self.serviceParams();
                self.loading = true;
                let paramsUrl = params.url();
                let formData = self.getSearchFormData();
                formData.pageSize = paramsUrl.count;
                formData.pageNum = paramsUrl.page;

                formData.imageName = self.imageName;
                formData.userId = self.userId;
                self.loadPromise = self.serviceEnvManage.getProjetData(formData);
                // let paramsUrl = params.url();
                let returnData=self.loadPromise
                .then(listData=>{
                    self.loading = false;
                    params.total(listData.total);
                    self.total=listData.total || 0;
                    console.log(listData.name)
                    return listData.items;
                }, ()=>{

                });
                return returnData;
            }
        });
    }
    // clickChangeOpen(row, action) {
    //     switch (action) {
    //         case "edit" :
    //             this.apply(row);
    //             break;
    //         case "publish":
    //             this.apply();
    //             break;
    //         case "remove":
    //             this.deleteItem(row);
    //             break;
    //         default:
    //             break;
    //     }
    // }
    addLayer(){
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            templateUrl: 'addenvManage',
            // showClose: false,
            animation: true,
            controller: function () {
                let $ctrl = this;
                $ctrl.titleEnv = self.titleEnv;
                $ctrl.listData = self.listData;
                $ctrl.ok = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };

                $ctrl.cancel = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };
            },
            controllerAs: '$ctrl'
        });
    }
    addenvManage(action){
        let self = this;
        self.titleEnv = true;
        switch (action) {
            case "add":
                this.addLayer();
                break;
        }
    }
    apply(row) {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addenvManage',
            controller: function() {
                let $ctrl = this;
                $ctrl.params={
                    id: row.id,
                    name: row.name,
                    k8s: row.k8s,
                    ci: row.ci,
                    mirror: row.mirror,
                    remark: row.remark,
                };
                $ctrl.ok = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }
    deleteItem(id) {
        console.log(id)
        let self = this;
        let confirmDelet = confirm('确定删除吗？');
        if (confirmDelet) {
            self.loadPromise = self.serviceEnvManage.deleteItem(id);
            self.loadPromise.then(listData => {
                alert('成功删除！');
                self.reloadTable();
            }, () => {

            });
            return;
        } else {
            return;
        }
    }
    getSearchFormData(){
        let file={}
        return file;
    }
    search() {
        this.tableParams.parameters({ page: 1 }).reload();
    }
}
