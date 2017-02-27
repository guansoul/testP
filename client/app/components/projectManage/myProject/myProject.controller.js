/**
 * (description)
 *
 * @author yourname
 */
'use strict';
import createPop from "../createProject.html";
import relateUser from "../relateUser.html";
import myProject from "../myProject.html";
import imgLoading from '../images/loading.gif'
export default class MyProjectController {
    constructor(NgTableParams, ServiceProjectManage, modalInstance, $uibModal,
        $window) {
        'ngInject';
        this.loading = false;
        this.total = 0;
        this.ServiceProjectManage = ServiceProjectManage;
        this.NgTableParams = NgTableParams;
        this.modalInstance = modalInstance;
        this.window = $window;
        this.uibModal = $uibModal;
        this.projectName = '';
        this.imgLoading = imgLoading;
        this.init();
    }
    init() {
        let self = this;
        self.tableParams = new self.NgTableParams({
            page: 1,
            count: 10
        }, {
             counts: [],
            getData: ($defer, params) => {

                self.loading = true;
                let paramsUrl = params.url();
                let formData = self.getSearchFormData();
                formData.pageNum = paramsUrl.page;
                formData.pageSize = paramsUrl.count;
                formData.projectName = self.projectName;
                formData.userName = window.localStorage.getItem('usr');
                self.loadPromise = self.ServiceProjectManage.getProjetData(formData);
                let returnData = self.loadPromise
                    .then(listData => {
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

    /**
     * 获取格式化后的数据
     */
    getSearchFormData() {
            let filter = {
                userName: window.localStorage.getItem('usr')
            }
            return filter;
        }
        //remove items
    deleteProject(id) {
        let self = this;
        let confirmDelet = confirm('确定删除吗？');
        if (confirmDelet) {
            self.loadPromise = self.ServiceProjectManage.deleteProject(id);
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
    createProject() {
        var gthis = this;
        let modalInstance = gthis.modalInstance.instance = gthis.uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: createPop,
            controller: function(ServiceProjectManage) {
                "ngInject";
                let self = this;
                self.ServiceProjectManage = ServiceProjectManage;
                self.projectName = "";
                self.projectNameZh = "";
                self.description = "";
                self.ok = function(params) {
                    let formData = {};
                    formData.projectName = self.projectName;
                    formData.projectNameZh = self.projectNameZh;
                    formData.description = self.description;
                    self.loadPromise = self.ServiceProjectManage.addProject(formData);
                    self.loadPromise
                        .then(listData => {
                            gthis.reloadTable();
                            modalInstance.close();
                            alert("创建成功！");
                            return listData.items;
                        }, () => {

                        })

                };

                self.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: 'vm'
        });
    }
    relateUser(row) {
            let _this = this;

            let modalInstance = _this.modalInstance.instance = _this.uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                template: relateUser,
                keyboard:false,
                backdrop:"static",
                // size: 'lg',
                controller: function(NgTableParams, ServiceProjectManage) {
                    "ngInject";
                    this.NgTableParams = NgTableParams;
                    this.ServiceProjectManage = ServiceProjectManage;
                    let $ctrl = this;
                    $ctrl.tableParamsusers = new $ctrl.NgTableParams({
                        //page: 1,
                        count: 99999,

                    }, {
                        counts: [],
                        getData: ($defer, params) => {
                            $ctrl.loading = true;
                            let paramsUrl = params.url();
                            let formData = _this.getSearchFormData();
                            formData.pageNum = paramsUrl.page;
                            formData.pageSize = paramsUrl.count;
                            formData.pid = row.id;
                            $ctrl.loadPromiseuser = _this.ServiceProjectManage.getUsersFromProject(formData);
                            let returnData = $ctrl.loadPromiseuser.then(listData => {
                                $ctrl.loading = false;
                                $ctrl.imgLoading = imgLoading;
                                return listData.items;
                            }, () => {

                            })
                            return returnData;
                        }
                    });
                    //-----------------------------
                    $ctrl.ok = function(params) {
                        console.log(params);

                    };

                    $ctrl.cancel = function() {
                        modalInstance.dismiss({ $value: 'cancel' });
                    };
                    //add relate User
                    $ctrl.add = function() {
                        $ctrl.dataLoading = true;
                        _this.ServiceProjectManage.addUsersToProject(row.id, $ctrl.user)
                            .then(listData => {
                                $ctrl.dataLoading = false;
                                if (listData.usersNotExist.length > 0) {
                                    alert("此用户在CTX不存在!")
                                    return false;
                                } else if (listData.usersAlreadyBound.length > 0) {
                                    alert("已经存在于项目中，不需要重复添加!")
                                    return false;
                                } else {
                                    alert("添加成功!")
                                    $ctrl.tableParamsusers.parameters({ page: 1 }).reload();
                                }
                            })
                    };
                    //remove relate User
                    $ctrl.deletUser = function(username) {
                        // $ctrl.users.splice($index, 1);
                        $ctrl.dataLoading = true;
                        _this.ServiceProjectManage.deleteUsersFromProject(row.id, username)
                            .then(data => {
                                 $ctrl.dataLoading = false;
                                if (username == data.projectOwner) {
                                    alert(username + "是此项目的拥有者，不能被删除!")
                                    return false;

                                } else {
                                    $ctrl.tableParamsusers.parameters({ page: 1 }).reload();
                                }
                            })
                    };
                },
                controllerAs: 'vm'
            });
        }
        //review and edit
    myInfo(row, type) {
        let _this = this;
        let modalInstance = _this.modalInstance.instance = _this.uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: myProject,
            controller: function(ServiceProjectManage, NgTableParams) {
                "ngInject";
                let self = this;
                self.ServiceProjectManage = ServiceProjectManage;
                self.NgTableParams = NgTableParams;
                self.ServiceProjectManage.getProjetByid(row.id)
                    .then(data => {
                        self.params = {
                            allDisabled: type,
                            id: data.id,
                            projectName: data.projectName,
                            otherName: data.projectNameZh,
                            description: data.description,
                            createUserName: data.createUserName,
                            createTime: data.createtime,
                            serviceNum: data.appIds.length
                        };

                    })

                self.tableParamsusers = new self.NgTableParams({
                    //page: 1,
                    count: 99999,

                }, {
                    counts: [],
                    getData: ($defer, params) => {
                        self.loading = true;
                        let paramsUrl = params.url();
                        let formData = _this.getSearchFormData();
                        formData.pageNum = paramsUrl.page;
                        formData.pageSize = paramsUrl.count;
                        formData.pid = row.id;
                        self.loadPromiseuser = self.ServiceProjectManage.getUsersFromProject(formData);
                        let returnData = self.loadPromiseuser.then(listData => {
                            self.loading = false;
                            params.settings.counts = []
                            return listData.items;
                        }, () => {

                        })
                        return returnData;
                    }
                });

                self.ok = function(params) {

                    self.params.projectNameZh = self.params.otherName;
                    self.ServiceProjectManage.editProject(self.params);
                    _this.reloadTable();
                    alert("保存成功！");
                    modalInstance.dismiss({ $value: 'cancel' });
                };

                self.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: 'vm'
        });
    }
    reloadTable() {
        this.tableParams.parameters({ page: 1 }).reload();
    }

}
