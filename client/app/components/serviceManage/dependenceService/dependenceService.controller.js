/**
 * (description)
 *
 * @author yourname
 */
import createServiceDependence from "../modalTemplate/createServiceDependence.html";
import publishServiceDependence from "../modalTemplate/publishServiceDependence.html";
import historyServiceDependence from "../modalTemplate/historyServiceDependence.html";
import detailServiceDependence from "../modalTemplate/detailServiceDependence.html";
import commonDelete from "../modalTemplate/commonDelete.html";
import relaIcon from "../../../skin/images/rela.png";
import stepsIcon from "../../../skin/images/steps.png";
import steps from "../modalTemplate/steps.html";

export default class DependenceServiceController {
    constructor(ServiceManageService, NgTableParams, $uibModal) {
        'ngInject';
        this.$uibModal = $uibModal;
        this.relaIcon = relaIcon;
        this.tableParams = new NgTableParams({
            count: 10,
            page: 1
        }, {
            counts: [10, 20, 50, 100, 200],
            getData: (params) => {
                let postParams = {
                    limit: parseInt(params.url().count),
                    offset: (parseInt(params.url().page) - 1) * parseInt(params.url().count),
                    app_ids: ""
                };
                this.loadPromise = ServiceManageService.getDependentServiceList(postParams);
                return this.loadPromise.then(
                    response => {
                        params.total(response.total);
                        this.total = response.total || 0;
                        return response && response.datas;
                    }
                );
            }
        });
    }

    doSubAction(row, action) {
        switch (action) {
            case "edit":
                this.create(row);
                break;
            case "detail":
                this.showDetail(row);
                break;
            case "history":
                this.showHistory(row);
                break;
            case "delete":
                this.deleteItem(row);
                break;
            default:
                break;
        }
    }

    publishTo(row, target) {
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: publishServiceDependence,
            controller: function () {
                let $ctrl = this;
                $ctrl.target = target;
                $ctrl.data1 = "latest";
                $ctrl.data2 = "latest";
                $ctrl.ok = function () {
                    modalInstance.close({});
                };

                $ctrl.cancel = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };
            },
            controllerAs: '$ctrl'
        });
    }

    clickIcon(item) {
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: steps,
            controller: function () {
                let $ctrl = this;
                $ctrl.stepsIcon = relaIcon;
                $ctrl.onlyIcon = true;
                $ctrl.ok = function (params) {
                    console.log(params);
                    modalInstance.dismiss({$value: 'cancel'});
                };

                $ctrl.cancel = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };
            },
            controllerAs: '$ctrl'
        });
    }

    clickStatus(item) {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: steps,
            controller: function () {
                let $ctrl = this;
                $ctrl.stepsIcon = stepsIcon;
                $ctrl.ok = function (params) {
                    console.log(params);
                    modalInstance.dismiss({$value: 'cancel'});
                };

                $ctrl.cancel = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };
            },
            controllerAs: '$ctrl'
        });
    }

    create(row) {
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            size: 'lg',
            template: createServiceDependence,
            controller: function () {
                let $ctrl = this;
                if (row) {
                    $ctrl.isEdit = true;
                    $ctrl.detail = row;
                    $ctrl.name = "测试应用依赖";
                    $ctrl.note = "测试应用依赖XXXXXXXXXx注意事项";
                }

                $ctrl.relaIcon = relaIcon;

                $ctrl.dataSource = [
                    {key: 9103700, value: "服务器XXXXX"},
                    {key: 9103705, value: "服务器XXXXX（TEST店）"},
                    {key: 9103384, value: "服务器XXXXX（性能测试商圈01_勿动店）"},
                    {key: 9103381, value: "服务器XXXXX（性能测试商圈01_勿动店棒啊帮帮哒00100101010）"},
                    {key: 9103347, value: "服务器XXXXX（勿动）（沈阳奥体店）"},
                    {key: 9103346, storeName: "服务器XXXXX", value: "服务器XXXXX（沈阳北一路店）333333333333333333"},
                    {key: 9103345, value: "服务器XXXXX（沈阳太原街店）11111111111111111"},
                    {key: 9103344, value: "服务器XXXXX（勿动）"}
                ];

                $ctrl.transferOptions = $ctrl.transferOptions || {
                        titles: ['应用列表', '已选择门店'],
                        placeholders: ['输入门店进行检索', '对已经出来的结果进行检索'],
                        operations: ['增加', '增加全部', '删除', '全部删除'],
                        showLeftSearch: false,
                        showRightSearch: false,
                        addBtn: true,
                        addAllBtn: true,
                        delBtn: true,
                        delAllBtn: true
                    };

                $ctrl.ok = function () {
                    modalInstance.close({});
                };

                $ctrl.cancel = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };
            },
            controllerAs: '$ctrl'
        });
    }

    showDetail(row) {
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            size: 'lg',
            template: detailServiceDependence,
            controller: function () {
                let $ctrl = this;
                $ctrl.name = "测试应用依赖";
                $ctrl.note = "测试应用依赖XXXXXXXXXx注意事项";
                $ctrl.relaIcon = relaIcon;

                $ctrl.dataSource = [
                    {key: 9103700, value: "服务器XXXXX"},
                    {key: 9103705, value: "服务器XXXXX（TEST店）"},
                    {key: 9103384, value: "服务器XXXXX（性能测试商圈01_勿动店）"},
                    {key: 9103381, value: "服务器XXXXX（性能测试商圈01_勿动店棒啊帮帮哒00100101010）"},
                    {key: 9103347, value: "服务器XXXXX（勿动）（沈阳奥体店）"},
                    {key: 9103346, storeName: "服务器XXXXX", value: "服务器XXXXX（沈阳北一路店）333333333333333333"},
                    {key: 9103345, value: "服务器XXXXX（沈阳太原街店）11111111111111111"},
                    {key: 9103344, value: "服务器XXXXX（勿动）"}
                ];

                $ctrl.transferOptions = $ctrl.transferOptions || {
                        titles: ['应用列表', '已选择门店'],
                        placeholders: ['输入门店进行检索', '对已经出来的结果进行检索'],
                        operations: ['增加', '增加全部', '删除', '全部删除'],
                        showLeftSearch: false,
                        showRightSearch: false,
                        addBtn: true,
                        addAllBtn: true,
                        delBtn: true,
                        delAllBtn: true
                    };
                $ctrl.ok = function () {
                    modalInstance.close({});
                };

                $ctrl.cancel = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };
            },
            controllerAs: '$ctrl'
        });
    }

    showHistory(row) {
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: historyServiceDependence,
            controller: function () {
                let $ctrl = this;
                if (row) {
                    $ctrl.isEdit = true;
                    $ctrl.detail = row;
                }
                $ctrl.ok = function () {
                    modalInstance.close({});
                };

                $ctrl.cancel = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };
            },
            controllerAs: '$ctrl'
        });
    }

    deleteItem(row) {
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: commonDelete,
            controller: function () {
                let $ctrl = this;
                $ctrl.title = "删除应用依赖";
                $ctrl.content = "确定删除该项应用依赖？";
                $ctrl.ok = function () {
                    modalInstance.close({});
                };

                $ctrl.cancel = function () {
                    modalInstance.dismiss({$value: 'cancel'});
                };
            },
            controllerAs: '$ctrl'
        });
    }

}
