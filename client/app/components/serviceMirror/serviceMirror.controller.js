/**
 * (description)
 *
 * @author yourname
 */

import build from "./build.html";
import show from "./show.html";
export default class ServiceMirrorController {
    constructor(NgTableParams, serviceMirror, modalInstance, $uibModal) {
        'ngInject';
        let self = this;
        self.loading = false;
        self.total = 0;
        self.serviceMirror = serviceMirror;
        self.modalInstance = modalInstance;
        self.$uibModal = $uibModal;
        self.tableParams = new NgTableParams({
            page: 1,
            count: 10
        }, {
            getData: ($defer, params) => {
                // let paramData=self.serviceParams();
                self.loading = true;
                let paramsUrl = params.url();
                let formData = self.getSearchFormData();
                // formData.offset = paramsUrl.page;
                // formData.limit = paramsUrl.count;
                formData.pageSize = paramsUrl.count;
                formData.pageNum = paramsUrl.page;

                formData.imageName = self.imageName;
                formData.userId = self.userId;
                self.loadPromise = self.serviceMirror.serviceMir(formData);

                let returnData = self.loadPromise
                    .then(listData => {
                        console.log(listData);
                        self.loading = false;
                        params.total(listData.total);
                        self.total = listData.total;
                        return listData.items;
                    }, () => {

                    })
                return returnData;
            }
        });
    }

    build() {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: build,
            controller: function() {
                let $ctrl = this;

                $ctrl.ok = function() {
                    modalInstance.close({ $value: 'cancel' });
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    //     search() {
    //     this.tableParams.parameters({ page: 1 }).reload();
    // }
    getSearchFormData() {
            let file = {}
            return file;
        }
        /*
         * 搜索功能
         */
    search() {
            this.tableParams.parameters({ page: 1 }).reload();
        }
        /*
         **  版本操作弹出框
         */
    editVersion() {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: show,
            controller: function() {
                let $ctrl = this;
                ////-------
                ////-------
                $ctrl.ok = function() {
                    modalInstance.close({ $value: 'cancel' });
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }


    // clickSubOperateBtn() {
    //   this.publishing();
    // }

    // cancel() {
    //     console.log("cancel");
    // }
}
