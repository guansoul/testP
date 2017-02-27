/**
 * (description)
 * 
 * @author yourname
 */

 export default class StepsPageController {
  constructor($interval,ServiceManageService,$stateParams,$timeout,$rootScope) {
  	"ngInject";
    this.name = 'stepsPage';
    this.interval=$interval;
    this.current=0;
    this.$stateParams=$stateParams;
    this.$timeout=$timeout;
    this.stepsdata=[
                        {   
                          steps: '开始',
                          status: '0'
                        },
                        {   
                          steps: '静态代码扫描',
                          status: '0'
                        },
                        {   
                          steps: '编译',
                          status: '0'
                        },{   
                          steps: '进行单元测试',
                          status: '0'
                        },{   
                          steps: '打包镜像',
                          status: '0'
                        },{   
                          steps: '部署',
                          status: '0'
                        },{   
                          steps: '自动化测试',
                          status: '0'
                        },{   
                          steps: '性能测试',
                          status: '0'
                        }
    ];
    this.log='';
    this.stepscount=['codeScan','build','ut','docker','deploy','at','pt'];
    this.ServiceManageService=ServiceManageService;
    $rootScope.$on('$stateChangeStart', function (scope, next, current) {
            if(next != 'stepsPage') {
                if(this.intervalPromise) {
                    this.interval.cancel(this.intervalPromise);
                }
                if(this.stepsdown){
                    this.interval.cancel(this.stepsdown);
                }
            }
        }.bind(this));
    this.intervalPromise=this.interval(()=>{
        this.stepsGetlog();
        this.stepsGetStage();
        //this.preScroll();
      },3000);
  }
  $onInit(){
    this.scrollToTop();
    this.stepsGetlog();
    this.stepsGetDetail();
    this.stepsGetStage();
    this.predown=this.$timeout(()=>{
      let status=this.preScroll();
      this.stepsdown=this.interval(()=>{
        if(!status){
          status=this.preScroll();
        } else{
          this.interval.cancel(this.stepsdown);
        }
      },100);
    },800);  
  }
  preScroll(){
    let pre=document.querySelector('pre');
    pre.scrollTop=pre.scrollTop+50;
    if(pre.scrollHeight-pre.scrollTop<=598){
      return true;
    }else{
      return false;
    }
  }
  scrollToTop(){
    let page=document.querySelector('.clearfix');
    page.scrollTop=0;
  }
  stepsGetlog(){
    let params={
      deliveryJobId: this.$stateParams.did,
      serviceId: this.$stateParams.sid
    }
    this.ServiceManageService.stepsLog(params)
    .then(response => {
          this.log=response.data;
        });
  }
  stepsGetStage(){
    this.ServiceManageService.stepsStage(this.$stateParams.did).then(response => {
      for(let i=0;i<=7;i++){
        if(this.stepscount[i]==response.currentStage){
          for(let j=0;j<=i+1;j++){
            this.stepsdata[j].status=1;
          }
        }
      }
    });
  }
  stepsGetDetail(){
    let formData={
      sid: this.$stateParams.sid
    }
    this.loadPromise=this.ServiceManageService.getDetail(formData);
    this.loadPromise.then(response=>{
      let codeScan=response.stageCodescan==true?'':1;
      let Build=response.stageBuild==true?'':2;
      let Ut=response.stageUt==true?'':3;
      let Docker=response.stageDocker==true?'':4;
      let Deploy=response.stageDeploy==true?'':5;
      let At=response.stageAt==true?'':6;
      let Pt=response.stagePt==true?'':7;
      if(codeScan){
        this.stepsdata.splice(codeScan,1);
      }else if(Build){
        this.stepsdata.splice(Build,1);
      }else if(Ut){
        this.stepsdata.splice(Ut,1);
      }else if(Docker){
        this.stepsdata.splice(Docker,1);
      }else if(Deploy){
        this.stepsdata.splice(Deploy,1);
      }else if(At){
        this.stepsdata.splice(At,1);
      }else if(Pt){
        this.stepsdata.splice(Pt,1);
      }else{

      }
      
    });
  }
}