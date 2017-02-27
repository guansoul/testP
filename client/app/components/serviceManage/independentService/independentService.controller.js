/**
 * (description)
 *
 * @author yourname
 */
import apply from "../modalTemplate/apply.html";
import build from "../modalTemplate/build.html";
import buttonpublishing from "../modalTemplate/buttonpublishing.html";
import edit from "../modalTemplate/edit.html";
import detail from "../modalTemplate/detail.html";
import start from "../modalTemplate/start.html";
import stop from "../modalTemplate/stop.html";
import history from "../modalTemplate/history.html";
import rollback from "../modalTemplate/rollback.html";
import size from "../modalTemplate/size.html";
import config from "../modalTemplate/config.html";
import operate from "../modalTemplate/operate.html";
import commonDelete from "../modalTemplate/commonDelete.html";
import serviceDelete from "../modalTemplate/serviceDelete.html";
import steps from "../modalTemplate/steps.html";

import stepsIcon from "../../../skin/images/steps.png";


export default class IndependentServiceController {
    constructor(ServiceManageService, modalInstance, $uibModal, $state, $interval, $rootScope) {
        'ngInject';
        this.name = '应用管理';
        this.$state = $state;
        this.ServiceManageService = ServiceManageService;
        this.modalInstance = modalInstance;
        this.$uibModal = $uibModal;
        this.currentPage = 1;
        this.pageSize = 10;
        this.selectedFilter = "";
        this.filterList = [];
        this.environmentalList = [];
        this.$interval = $interval;
        this.postParams = {
            pageSize: 10,
            pageNum: 1,
            project_ids: ""
        };
        this.getFilterList();
        this.getData(this.postParams);
        $rootScope.$on('$stateChangeStart', function(scope, next, current) {
            if (next != 'serviceManage') {
                if (this.intervalPromise) {
                    this.$interval.cancel(this.intervalPromise);
                }
            }
        }.bind(this));
    }

    getFilterList() {
        let params = {
            //userName:window.localStorage.getItem('usr'),
            pageSize: 0,
            pageNum: 0
        };
        this.loadPromise = this.ServiceManageService.getMyProjectList(params);
        return this.loadPromise.then(
            response => {
                this.filterList = response && response.items;
            }
        );
    }

    getServiceList(row) {
        let params = {
            appId: row.id
        };
        this.environmentalList = [];
        this.loadPromise = this.ServiceManageService.getEnvServiceList(params);
        return this.loadPromise.then(
            response => {
                this.environmentalList = response && response.items;
                this.statusList = { 0: "未开始", 1: "执行中", 2: "执行成功", 3: "执行失败" };
                if (this.intervalPromise) {
                    this.$interval.cancel(this.intervalPromise);
                }
                let self = this;
                this.intervalPromise = this.$interval(() => {
                    angular.forEach(this.environmentalList, function(env) {
                        if (env.deliveryStatus && env.deliveryStatus != 0) {
                            self.ServiceManageService.getServiceStatus(env.id).then(response => {
                                if (response.status != env.deliveryStatus) {
                                    angular.forEach(self.environmentalList, function(item) {
                                        if (item.id == sid) {
                                            item.deliveryStatus = response.status;
                                        }
                                    });
                                }
                            });
                        }
                    });
                }, 6000);
            }
        );
    }

    getData(params) {
        this.loadPromise = this.ServiceManageService.getIndependentServiceList(params);
        return this.loadPromise.then(
            response => {
                this.total = response.total || 0;
                this.tableParams = response && response.items;
            }
        );
    }

    pageChanged() {
        console.log(this.currentPage);
        this.postParams.pageNum = this.currentPage;
        this.getData(this.postParams);
    }

    changePageSize() {
        console.log(this.pageSize);
        this.postParams.pageSize = this.pageSize;
        this.getData(this.postParams);
    }

    doFilter() {
        console.log(this.selectedFilter);
        this.postParams.project_ids = "" + this.selectedFilter;
        this.getData(this.postParams);
    }

    clickStatus(item) {
        if (item.deliveryStatus) {
            this.$state.go('stepsPage', { did: item.deliveryJobId, sid: item.id });
        }
    }

    doSubAction(item, action, row) {
        let tempStr = {
            "edit": "进行了编辑操作。",
            "detail": "进行了查看详情操作。",
            "history": "进行了查看历史记录操作。",
            "rollback": "进行了降级操作。",
            "size": "进行了扩容缩容操作。",
            "config": "调整了资源配置。",
            "publish": "",
            "operate": "进行了实例操作。"
        };
        switch (action) {
            case "edit":
                this.edit(item);
                break;
            case "detail":
                this.detail(item);
                break;
            case "start":
                this.start(item);
                break;
            case "stop":
                this.stop(item);
                break;
            case "history":
                this.history(item);
                break;
            case "rollback":
                this.rollback(item);
                break;
            case "size":
                this.size(item);
                break;
            case "config":
                this.config(item);
                break;
            case "publish":
                this.publishing(item);
                break;
            case "operate":
                this.doOperate(item);
                break;
            case "delete":
                this.delete(item, row);
                break;
            default:
                break;
        }
    }

    clickOperateBtn(row, action, $event) {
        switch (action) {
            case "edit":
                this.build(row);
                break;
            case "publish":
                this.apply(row);
                break;
            case "remove":
                this.deleteItem(row);
                break;
            default:
                break;
        }
        $event.stopPropagation();
        $event.preventDefault();
        return false;
    }

    apply(param, isEdit) {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: apply,
            controller: function($timeout) {
                'ngInject';
                let $ctrl = this;
                let Options;
                $ctrl.agreementOptions = ["TCP", "HTTP", "HTTPS", "UDP"];
                $ctrl.agreementOptionsName = { "TCP": "TCP", "HTTP": "HTTP", "HTTPS": "HTTPS", "UDP": "UDP" };
                $ctrl.languageOptionsName = ["java", "python", "php", "nodejs"];
                $ctrl.serviceTypes = { "1": "ClusterIP", "2": "NodePort", "3": "LoadBalancer", "4": "Ingress", "5": "Headless" };
                $ctrl.serviceTypeOptions = ["1", "2", "3", "4", "5"];
                // ClusterIP(1),        // 集群内部访问服务
                // NodePort(2),     // 提供NodePort供外部访问
                // LoadBalancer(3), // 提供外部负载均衡给外部访问
                // Ingress(4),          // 提供Ingress资源类负载均衡集群服务，此时自动设置k8s服务为headless
                // Headless(5);     // Headless类型服务，用于扩展，界面暂且不开放此参数类型

                $ctrl.isEdit = false;
                $ctrl.cmds = [];
                $ctrl.args = [];
                if (isEdit) {
                    $ctrl.isEdit = true;
                    let loadPromise = self.ServiceManageService.getDetail({
                        sid: param.id
                    });
                    loadPromise.then(response => {
                        $ctrl.apply = response;
                        if ($ctrl.apply.envVar.length == 0) {
                            $ctrl.apply.envVar = [{
                                "name": "",
                                "value": ""
                            }];
                        }

                        if ($ctrl.apply.args.length > 0) {
                            angular.forEach($ctrl.apply.args, function(item) {
                                if (item.length > 0) {
                                    $ctrl.args.push({
                                        value: item
                                    })
                                }
                            });
                        } else {
                            $ctrl.args.push({ value: "" });
                        }

                        if ($ctrl.apply.command.length > 0) {
                            angular.forEach($ctrl.apply.command, function(item) {
                                if (item.length > 0) {
                                    $ctrl.cmds.push({
                                        value: item
                                    })
                                }
                            });
                        } else {
                            $ctrl.cmds.push({ value: "" });
                        }

                        self.ServiceManageService.getLabels().then(response => {
                            let labels = response;
                            if ($ctrl.apply.nodeSelector.length > 0) {
                                angular.forEach($ctrl.apply.nodeSelector, function(node) {
                                    angular.forEach(labels, function(label) {
                                        if (label.defaultFlag > 0 || node == label.id) {
                                            label.defaultFlag = true;
                                        }
                                    });
                                });
                            }
                            $ctrl.labels = labels;
                        });

                        self.ServiceManageService.getEnvs().then(response => {
                            $ctrl.settingOptions = response;
                            angular.forEach(response, function(item) {
                                if (item.id == $ctrl.apply.envId) {
                                    $ctrl.apply.envId = item;
                                    return;
                                }
                            });
                        });
                    });
                } else {
                    $ctrl.cmds.push({ value: "" });
                    $ctrl.args.push({ value: "" });
                    $ctrl.apply = {
                        "appId": param.id,
                        "args": [],
                        "command": [],
                        "cpu": 0.5,
                        "disk": 0,
                        "envId": "",
                        "envVar": [{
                            "name": "",
                            "value": ""
                        }],
                        "healthcheck": "",
                        "innerPort": 0,
                        "instanceNum": 2,
                        "language": "java",
                        "mem": 4,
                        "nodeSelector": [],
                        "outerPort": 0,
                        "selfTestPath": "",
                        "serviceDomain": "",
                        "serviceName": "",
                        "serviceNameZh": "",
                        "serviceProtocol": "TCP",
                        "serviceType": "4",
                        "stageAt": true,
                        "stageBuild": true,
                        "stageCodescan": false,
                        "stageDeploy": true,
                        "stageDocker": true,
                        "stagePt": false,
                        "stageUt": true,
                        "tag": ""
                    };
                    self.ServiceManageService.getEnvs().then(response => {
                        $ctrl.settingOptions = response;
                        $ctrl.apply.envId = $ctrl.settingOptions[0];
                    });
                    self.ServiceManageService.getLabels().then(response => {
                        $ctrl.labels = response;
                    });
                }

                $ctrl.onCpuChange = function(value) {
                    if (value) {
                        value = parseFloat(value);
                        $ctrl.apply.cpu = parseFloat(value.toFixed(1));
                    }
                };
                $ctrl.onMemChange = function(value) {
                    if (value) {
                        value = parseFloat(value);
                        $ctrl.apply.mem = parseFloat(value.toFixed(1));
                    }
                };
                $ctrl.addEnvParam = function(index) {
                    $ctrl.apply.envVar.splice(index + 1, 0, {
                        "name": "",
                        "value": ""
                    });
                };
                $ctrl.removeEnvParam = function(index) {
                    $ctrl.apply.envVar.splice(index, 1);
                    if ($ctrl.apply.envVar.length == 0) {
                        $ctrl.apply.envVar.push({
                            "name": "",
                            "value": ""
                        })
                    }
                };

                $ctrl.addCommand = function(index) {
                    $ctrl.cmds.splice(index + 1, 0, { value: "" });
                };
                $ctrl.removeCommand = function(index) {
                    $ctrl.cmds.splice(index, 1);
                    if ($ctrl.cmds.length == 0) {
                        $ctrl.cmds.push({ value: "" })
                    }
                };

                $ctrl.addArgs = function(index) {
                    $ctrl.args.splice(index + 1, 0, { value: "" });
                };
                $ctrl.removeArgs = function(index) {
                    $ctrl.args.splice(index, 1);
                    if ($ctrl.args.length == 0) {
                        $ctrl.args.push({ value: "" })
                    }
                };

                $ctrl.ok = function(params) {
                    console.log(params);
                    let list = [];
                    let vars = [];
                    let cmds = [];
                    let args = [];
                    angular.forEach($ctrl.apply.envVar, function(item) {
                        if (item.name.length != 0 && item.value.length != 0) {
                            vars.push(item);
                        }
                    });

                    angular.forEach($ctrl.cmds, function(item) {
                        if (item.value.length != 0) {
                            cmds.push(item.value);
                        }
                    });

                    angular.forEach($ctrl.args, function(item) {
                        if (item.value.length != 0) {
                            args.push(item.value);
                        }
                    });
                    angular.forEach($ctrl.labels, function(item) {
                        if (item.defaultFlag) {
                            list.push(item.id);
                        }
                    });
                    params.nodeSelector = list;
                    params.envId = params.envId.id;
                    params.mem = params.mem + 'Gi';
                    params.envVar = vars;
                    params.command = cmds;
                    params.args = args;
                    let action = "";
                    if (isEdit) {
                        action = "editPublishEnv";
                    } else {
                        action = "createPublishEnv";
                    }
                    let loadPromise = self.ServiceManageService[action](params);

                    return loadPromise.then(response => {
                        console.log(response);
                        let appId = param.id;
                        if (isEdit) {
                            alert("编辑成功");
                            appId = params.appId;
                        } else {
                            alert("创建成功")
                        }
                        if (!param.isCustomHeaderOpen) {
                            param.isCustomHeaderOpen = true;
                        }
                        self.getServiceList({
                            id: appId
                        });
                        modalInstance.dismiss({ $value: 'cancel' });
                    });
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    toggleAccordion($event, row) {
        if (this.intervalPromise) {
            this.$interval.cancel(this.intervalPromise);
        }
        if (row.isCustomHeaderOpen && $($event.target).closest("tr").hasClass("clickable-header")) {
            this.getServiceList(row);
        }
    }

    build(param) {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: build,
            controller: function(ServiceManageService) {
                "ngInject";
                let $ctrl = this;
                $ctrl.ServiceManageService = ServiceManageService;
                $ctrl.options = self.filterList;

                if (param) {
                    $ctrl.isEdit = true;
                    let params = {
                        pageSize: 0,
                        pageNum: 1,
                        base: 1,
                        // userId: window.localStorage.getItem("usrid")
                    };
                    self.ServiceManageService.getBaseImageList(params).then(
                        response => {
                            $ctrl.optionsbase = response && response.items;
                            angular.forEach($ctrl.optionsbase, function(item) {
                                if (item.id == param.baseImage) {
                                    $ctrl.image = item;
                                    return;
                                }
                            });
                        }
                    );

                    angular.forEach(self.filterList, function(item) {
                        if (item.id == param.projectId) {
                            $ctrl.project = item;
                            return;
                        }
                    });
                    $ctrl.build = param;

                } else {
                    let params = {
                        pageSize: 0,
                        pageNum: 1,
                        base: 1,
                        // userId: window.localStorage.getItem("usrid")
                    };
                    self.ServiceManageService.getBaseImageList(params).then(
                        response => {
                            $ctrl.optionsbase = response && response.items;
                            $ctrl.image = $ctrl.optionsbase[0];
                        }
                    );

                    $ctrl.project = self.filterList[0];
                    $ctrl.build = {
                        "appName": "",
                        "appNameZh": "",
                        "baseImage": "",
                        "description": "",
                        "dockerfileTpl": "FROM {BASE_IMAGE}",
                        "gitUrl": "",
                        "projectId": ""
                    };
                }

                $ctrl.showform = function(form) {
                    console.log(form);
                };
                $ctrl.ok = function(params) {
                    params.projectId = $ctrl.project.id;
                    params.id = $ctrl.build.id;
                    params.baseImage = $ctrl.image.id;
                    if (!params.myVar) {
                        delete params.dockerfileTpl;
                    }
                    if ($ctrl.isEdit) {
                        $ctrl.loadPromise = $ctrl.ServiceManageService.editApp(params);
                        $ctrl.loadPromise
                            .then(listData => {
                                self.getData(self.postParams);
                                modalInstance.dismiss({ $value: 'cancel' });
                                alert("编辑成功！");
                            }, () => {
                                console.log('=============');
                                modalInstance.dismiss({ $value: 'cancel' });
                            })
                    } else {
                        $ctrl.loadPromise = $ctrl.ServiceManageService.addApp(params);
                        $ctrl.loadPromise
                            .then(listData => {
                                self.getData(self.postParams);
                                console.log(222);
                                modalInstance.dismiss({ $value: 'cancel' });
                                alert("创建成功！");
                            }, () => {
                                console.log('=============');
                                modalInstance.dismiss({ $value: 'cancel' });
                            })
                    }
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    publishing(item) {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: buttonpublishing,
            controller: function($state) {
                "ngInject";
                let $ctrl = this;
                $ctrl.branch = ["master", "head ", "origin"];
                $ctrl.publishbranch = "master";
                $ctrl.options = ["latest", "v1.0", "v2.0", "v3.0"];
                $ctrl.publishVersion = "latest";
                $ctrl.setting = item.env;
                $ctrl.servicename = item.serviceName;
                $ctrl.servicedomain = item.domain;
                $ctrl.param = {
                    branch: "",
                    tag: "",
                    userId: window.localStorage.getItem("usrid")
                };
                $ctrl.ok = function(params) {
                    console.log(params);
                    let param = {
                        sid: 　item.id,
                        delivery: $ctrl.param
                    };
                    this.loadPromise = self.ServiceManageService.doPublishEnv(param);
                    return this.loadPromise.then(
                        response => {
                            console.log(response);
                            alert("交付成功");
                            modalInstance.dismiss({ $value: 'cancel' });
                            $state.go('stepsPage', { did: item.deliveryJobId, sid: item.id });
                        }
                    );
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    doOperate() {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: operate,
            controller: function() {
                let $ctrl = this;

                $ctrl.ok = function(params) {
                    console.log(params);
                    modalInstance.dismiss({ $value: 'cancel' });
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    edit(item) {
        this.apply(item, true);
    }

    detail(item) {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: detail,
            controller: function() {
                let $ctrl = this;
                $ctrl.agreementOptions = ["TCP", "HTTP", "HTTPS", "UDP"];
                $ctrl.agreementOptionsName = { "TCP": "TCP", "HTTP": "HTTP", "HTTPS": "HTTPS", "UDP": "UDP" };
                $ctrl.languageOptionsName = ["java", "python", "php", "nodejs"];
                let loadPromise = self.ServiceManageService.getDetail({
                    sid: item.id
                });
                loadPromise.then(response => {
                    console.log(response);
                    $ctrl.apply = response;
                    self.ServiceManageService.getLabels().then(response => {
                        $ctrl.labels = response;
                    });
                    self.ServiceManageService.getEnvs().then(response => {
                        $ctrl.settingOptions = response;
                        angular.forEach(response, function(item) {
                            if (item.id == $ctrl.apply.envId) {
                                $ctrl.apply.envId = item;
                                return;
                            }
                        });
                    });
                });

                $ctrl.ok = function(params) {
                    console.log(params);
                    modalInstance.dismiss({ $value: 'cancel' });
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    history(item) {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: history,
            controller: function(NgTableParams, ServiceManageService) {
                "ngInject";
                self.NgTableParams = NgTableParams;
                // self.ServiceProjectManage = ServiceProjectManage;
                let $ctrl = this;

                // let loadPromise = self.ServiceManageService.getHistory(params);
                //  loadPromise.then(response => {
                //     console.log(response);
                // });

                $ctrl.tableParamshistory = new self.NgTableParams({
                    page: 1,
                    count: 10
                }, {
                    counts: [],
                    getData: ($defer, params) => {
                        let formData = {
                            sid: item.id
                                // pageSize: 0,
                                // pageNum: 1
                        };
                        $ctrl.loading = true;
                        let paramsUrl = params.url();
                        formData.pageNum = paramsUrl.page;
                        formData.pageSize = paramsUrl.count;
                        $ctrl.loadPromisehistory = self.ServiceManageService.getAppList(formData);
                        let returnData = $ctrl.loadPromisehistory.then(listData => {
                            $ctrl.loading = false;
                            listData.items.forEach((data) => {

                                if(data.currentStatus == 0) {
                                    data.currentStatus = "idle"
                                } else if(data.currentStatus == 1) {
                                    data.currentStatus = "success"
                                } else if(data.currentStatus == 2) {
                                    data.currentStatus = "pending"
                                } else {
                                    data.currentStatus = "failed"
                                }
                            })
                            params.total(listData.total);
                            return listData.items;
                        }, () => {

                        })
                        return returnData;
                    }
                });




                $ctrl.ok = function(params) {
                    console.log(params);
                    modalInstance.dismiss({ $value: 'cancel' });
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    rollback(item) {
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: serviceDelete,
            controller: function(ServiceManageService) {
                "ngInject";
                let $ctrl = this;
                $ctrl.ServiceManageService = ServiceManageService;
                $ctrl.title = "降级";
                $ctrl.content = "确定降级吗？";
                $ctrl.ok = function() {
                    let params = {};
                    params.sid = item.id;
                    $ctrl.loadPromise = $ctrl.ServiceManageService.rollback(params);
                    $ctrl.loadPromise
                        .then(listData => {
                            modalInstance.dismiss({ $value: 'cancel' });
                            alert("降级成功！");
                        }, (resp) => {
                            console.log('=============');
                            alert(resp.errMessage);
                            modalInstance.dismiss({ $value: 'cancel' });
                        })
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    size(param) {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: size,
            controller: function() {
                let $ctrl = this;
                self.ServiceManageService.getReplicas({
                    sid: param.id
                }).then(response => {
                    $ctrl.replicas = response.replicas;
                });
                $ctrl.ok = function(params) {
                    self.ServiceManageService.setReplicas(param.id, {
                        replicas: params
                    }).then(response => {
                        alert("设置成功");
                        modalInstance.dismiss({ $value: 'cancel' });
                    });
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });

    }

    config(param) {
        let self = this;
        let modalInstance = self.modalInstance.instance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: config,
            controller: function() {
                let $ctrl = this;
                let loadPromise = self.ServiceManageService.getDetail({
                    sid: param.id
                });
                loadPromise.then(response => {
                    $ctrl.apply = response;
                });
                $ctrl.onCpuChange = function(value) {
                    if (value) {
                        value = parseFloat(value);
                        $ctrl.apply.cpu = parseFloat(value.toFixed(1));
                    }
                };
                $ctrl.onMemChange = function(value) {
                    if (value) {
                        value = parseFloat(value);
                        $ctrl.apply.mem = parseFloat(value.toFixed(1));
                    }
                };
                $ctrl.ok = function(params) {
                    console.log(params);
                    modalInstance.dismiss({ $value: 'cancel' });
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    deleteItem(row) {
        console.log(row);
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: commonDelete,
            controller: function(ServiceManageService) {
                "ngInject";
                let $ctrl = this;
                $ctrl.ServiceManageService = ServiceManageService;
                $ctrl.title = "删除应用";
                $ctrl.content = "确定删除该项应用？";
                let cutOut = row.id;
                $ctrl.ok = function() {
                    let params = {};
                    params.id = cutOut;
                    $ctrl.loadPromise = $ctrl.ServiceManageService.deleteApp(params);
                    $ctrl.loadPromise
                        .then(listData => {
                            self.getData(self.postParams);
                            modalInstance.dismiss({ $value: 'cancel' });
                            alert("删除成功！");
                        }, () => {
                            console.log('=============');
                            modalInstance.dismiss({ $value: 'cancel' });
                        })
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    start(row) {
        console.log(row);
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: start,
            controller: function(ServiceManageService) {
                "ngInject";
                let $ctrl = this;
                $ctrl.ServiceManageService = ServiceManageService;
                $ctrl.title = "启动应用";
                $ctrl.content = "确定启动该项应用？";
                let serviceId = row.id;
                console.log(row);
                $ctrl.ok = function() {
                    console.log('已启动');
                    let params = {};
                    params.id = serviceId;
                    $ctrl.loadPromise = $ctrl.ServiceManageService.startService(params);
                    $ctrl.loadPromise
                        .then(listData => {
                            modalInstance.dismiss({ $value: 'cancel' });
                            alert("启动成功！");
                        }, () => {
                            console.log('=============');
                            alert("启动失败！");
                            modalInstance.dismiss({ $value: 'cancel' });
                        })
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    stop(row) {
        console.log(row);
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: stop,
            controller: function(ServiceManageService) {
                "ngInject";
                let $ctrl = this;
                $ctrl.ServiceManageService = ServiceManageService;
                $ctrl.title = "停止应用";
                $ctrl.content = "确定停止该项应用？";
                let serviceId = row.id;
                $ctrl.ok = function() {
                    console.log("已停止");
                    let params = {};
                    params.id = serviceId;
                    $ctrl.loadPromise = $ctrl.ServiceManageService.stopService(params);
                    $ctrl.loadPromise
                        .then(listData => {
                            modalInstance.dismiss({ $value: 'cancel' });
                            alert('停止成功');
                        }, () => {
                            console.log('=============');
                            alert('停止失败');
                            modalInstance.dismiss({ $value: 'cancel' });
                        })
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    delete(item, row) {
        let self = this;
        let modalInstance = self.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: serviceDelete,
            controller: function(ServiceManageService) {
                "ngInject";
                let $ctrl = this;
                $ctrl.ServiceManageService = ServiceManageService;
                $ctrl.title = "删除应用";
                $ctrl.content = "确定删除该项应用？";
                let serviceId = item.id;
                let appId = row.id;
                $ctrl.ok = function() {
                    let params = {};
                    params.serviceId = serviceId;
                    params.id = appId;
                    $ctrl.loadPromise = $ctrl.ServiceManageService.deleteService(params);
                    $ctrl.loadPromise
                        .then(listData => {
                            self.getServiceList(params);
                            modalInstance.dismiss({ $value: 'cancel' });
                            alert("删除成功！");
                        }, () => {
                            console.log('=============');
                            modalInstance.dismiss({ $value: 'cancel' });
                        })
                };

                $ctrl.cancel = function() {
                    modalInstance.dismiss({ $value: 'cancel' });
                };
            },
            controllerAs: '$ctrl'
        });
    }

    cancel() {
        console.log("cancel");
    }
}
