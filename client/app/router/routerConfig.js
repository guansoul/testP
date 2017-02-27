
export default [
   {
        name:'login',
        url:"/login",
        template:'<login class="routename"></login>',
        lazyload:require("bundle?lazy&name=login!../components/login/login.js"),
        tracking:{
            key:'login'
        }
    },
    {
        name:'start',
        url:"/start",
        template:'<start class="routename"></start>',
        lazyload:require("bundle?lazy&name=start!../components/start/start.js"),
        tracking:{
            key:'start'
        }
    },
    {
        name:'serviceManage',
        url:"/serviceManage",
        template:'<service_manage class="routename"></service_manage>',
        lazyload:require("bundle?lazy&name=serviceManage!../components/serviceManage/serviceManage.js"),
        tracking:{
            key:'serviceManage'
        }
    },
    {
        name:'serviceMirror',
        url:"/serviceMirror",
        template:'<service_mirror class="routename"></service_mirror>',
        lazyload:require("bundle?lazy&name=serviceMirror!../components/serviceMirror/serviceMirror.js"),
        tracking:{
            key:'serviceMirror'
        }
    },
    {
        name:'envManage',
        url:"/envManage",
        template:'<env_manage class="routename"></env_manage>',
        lazyload:require("bundle?lazy&name=envManage!../components/envManage/envManage.js"),
        tracking:{
            key:'envManage'
        }
    },
    {
        name:'userDoc',
        url:"/userDoc",
        template:'<user_doc class="routename"></user_doc>',
        lazyload:require("bundle?lazy&name=userDoc!../components/userDoc/userDoc.js"),
        tracking:{
            key:'userDoc'
        }
    },
    {
        name:'ciHistory',
        url:"/ciHistory",
        template:'<ci_history class="routename"></ci_history>',
        lazyload:require("bundle?lazy&name=ciHistory!../components/ciHistory/ciHistory.js"),
        tracking:{
            key:'ciHistory'
        }
    },
    {
        name:'push',
        url:"/posCtrl/push",
        template:'<push class="routename"></push>',
        lazyload:require("bundle?lazy&name=push!../components/posCtrl/push/push.js"),
        tracking:{
            key:'push'
        }
    },
/*    {
        name:'historyJournal',
        url:"/automaticTest/historyJournal",
        template:'<history_journal class="routename"></history_journal>',
        lazyload:require("bundle?lazy&name=historyJournal!../components/automasticTest/historyJournal/historyJournal.js"),
        tracking:{
            key:'historyJournal'
        }
    }*/
    {
        name:'hiJournal',
        url:"/atmticTest/hiJournal",
        template:'<hi_journal class="routename"></hi_journal>',
        lazyload:require("bundle?lazy&name=hiJournal!../components/atmticTest/hiJournal/hiJournal.js"),
        tracking:{
            key:'hiJournal'
        }
    },
    {
        name:'allProject',
        url:"/projectManage/allProject",
        template:'<all_project class="routename"></all_project>',
        lazyload:require("bundle?lazy&name=allProject!../components/projectManage/allProject/allProject.js"),
        tracking:{
            key:'allProject'
        }
    },
    {
        name:'myProject',
        url:"/projectManage/myProject",
        template:'<my_project class="routename"></my_project>',
        lazyload:require("bundle?lazy&name=allProject!../components/projectManage/myProject/myProject.js"),
        tracking:{
            key:'myProject'
        }
    },
    {
        name:'stepsPage',
        url:"/stepsPage/:did/:sid",
        template:'<steps_page class="routename"></steps_page>',
        lazyload:require("bundle?lazy&name=allProject!../components/stepsPage/stepsPage.js"),
        tracking:{
            key:'stepsPage'
        }
    }
]
