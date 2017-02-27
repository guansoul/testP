/**
 * (description)
 *
 * @author yourname
 */
/**
 * (description)
 *
 * @author yourname
 */
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/bar'
export default class StartController {
    constructor() {
        "ngInject";
        this.name = '概况';
        this.getTotal = "100";
        this.updates = "20";
        this.getRes = 200;
        this.getFirstpie();
        this.getHistogramData();
        // window.onresize = function() {
        //     $("canvas").css("width", "100%")
        //     $("canvas").css("height", "100%")
        // }
    }

    getFirstpie() {

        let self = this;
        self.pieConfig_pro = {
            theme: 'default',
            dataLoaded: true
        };

        self.pieOption_pro = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['项目活跃数', '其他项目'],

                },
                color: ['rgba(241,92,128,.8)', 'rgba(128,133,233,.8)'],
                series: [{
                    name: '比例分析',
                    type: 'pie',
                    radius: '75%',
                    center: ['60%', '50%'],
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}: {c}',
                            position: 'inside'
                        }
                    },
                    data: [{
                        value: '60',
                        name: '项目活跃数'
                    }, {
                        value: '40',
                        name: '其他项目'
                    }]
                }]
            },

            //环境应用

            self.pieConfig_env = {
                theme: 'default',
                dataLoaded: true
            };



        self.pieOption_env = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br>{b} : {c} ({d}%)"
            },

            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['site环境', 'uat环境', '生产环境']
            },
            color: ['#90ee7e', 'rgb(124, 181, 236)', 'rgb(247, 163, 92)'],
            series: [{
                name: '',
                type: 'pie',
                radius: '75%',
                center: ['60%', '50%'],
                data: [{
                    value: '58',
                    name: 'site环境'
                }, {
                    value: '32',
                    name: 'uat环境'
                }, {
                    value: '10',
                    name: '生产环境'
                }],
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}: {c}',
                        position: 'inside'
                    }
                }
            }]
        }


    }
    getHistogramData() {

        let self = this;

        self.barConfig = {
            theme: 'default',
            dataLoaded: true
        };
        self.barOption = {

            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['site环境', 'uat环境', '生产环境'],
                align: 'left'
            },
            xAxis: [{
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

            }],
            yAxis: [{
                type: 'value',
            }],
            series: [{
                name: 'site环境',
                type: 'bar',
                stack: "发布数",
                barWidth: 30,
                itemStyle: {
                    normal: {
                        color: "#90ee7e"
                    }
                },
                data: [10, 8, 15, 20, 7, 5, 8, 13, 7, 4, 6, 3],
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                }
            }, {
                name: 'uat环境',
                type: 'bar',
                barWidth: 30,
                stack: "发布数",
                itemStyle: {
                    normal: {
                        color: "rgb(124, 181, 236)"
                    }
                },
                data: [6, 5, 7, 9, 3, 4, 3, 5, 4, 2, 3, 2],
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                }
            }, {
                name: '生产环境',
                type: 'bar',
                barWidth: 30,
                stack: "发布数",
                itemStyle: {
                    normal: {
                        color: "rgb(247, 163, 92)"
                    }
                },
                data: [2, 3, 4, 5, 1, 2, 1, 3, 1, 2, 1, 1],
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                }
            }]
        };
    }


}
