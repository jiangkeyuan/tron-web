import{aj as M,B as pe,S as re,U as me,aI as de,d as ee,cf as fe,cg as ke,ch as be,ab as ve,b as _e,af as Ie,r as y,ci as xe,s as Ce,c as z,I as ie,Z as ge,o as he,e as _,f as K,l as n,w,a1 as o,i as f,g as t,n as ce,j as Le,p as k,E as $,b1 as Ee,h as T,P as ue,aJ as Se,G as Te,cj as $e,ck as Ne,ac as Oe,cl as Re,cm as Ae,aH as Be,N as Ve,O as Me,k as W,T as Xe,am as He,_ as we,x as V,u as X,cn as Ye,q as ye,b5 as De,t as Fe,a3 as Pe,aD as je,M as We,a as Ze,a5 as qe,a6 as Je,a2 as Q}from"./index.e46ffe7a.js";import{_ as ze}from"./_plugin-vue_export-helper.cdc0426e.js";import{t as le}from"./throttle.582b0758.js";import{u as Ge}from"./index.65ef1111.js";import{a as Ue}from"./scroll.692c710b.js";import"./debounce.10df7c34.js";const Ke=(r,p)=>{if(!M||!r||!p)return!1;const c=r.getBoundingClientRect();let s;return p instanceof Element?s=p.getBoundingClientRect():s={top:0,right:window.innerWidth,bottom:window.innerHeight,left:0},c.top<s.bottom&&c.bottom>s.top&&c.right>s.left&&c.left<s.right},Qe=pe({urlList:{type:re(Array),default:()=>me([])},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},hideOnClickModal:{type:Boolean,default:!1},teleported:{type:Boolean,default:!1},closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2}}),et={close:()=>!0,switch:r=>de(r)},tt=["src"],st=ee({name:"ElImageViewer"}),at=ee({...st,props:Qe,emits:et,setup(r,{expose:p,emit:c}){const s=r,N={CONTAIN:{name:"contain",icon:fe(ke)},ORIGINAL:{name:"original",icon:fe(be)}},{t:C}=ve(),i=_e("image-viewer"),{nextZIndex:te}=Ie(),O=y(),b=y([]),I=xe(),x=y(!0),m=y(s.initialIndex),v=Ce(N.CONTAIN),d=y({scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}),H=z(()=>{const{urlList:e}=s;return e.length<=1}),R=z(()=>m.value===0),Z=z(()=>m.value===s.urlList.length-1),se=z(()=>s.urlList[m.value]),Y=z(()=>{const{scale:e,deg:a,offsetX:l,offsetY:g,enableTransition:E}=d.value;let h=l/e,S=g/e;switch(a%360){case 90:case-270:[h,S]=[S,-h];break;case 180:case-180:[h,S]=[-h,-S];break;case 270:case-90:[h,S]=[-S,h];break}const B={transform:`scale(${e}) rotate(${a}deg) translate(${h}px, ${S}px)`,transition:E?"transform .3s":""};return v.value.name===N.CONTAIN.name&&(B.maxWidth=B.maxHeight="100%"),B}),ae=z(()=>de(s.zIndex)?s.zIndex:te());function A(){ne(),c("close")}function D(){const e=le(l=>{switch(l.code){case V.esc:s.closeOnPressEscape&&A();break;case V.space:P();break;case V.left:G();break;case V.up:L("zoomIn");break;case V.right:U();break;case V.down:L("zoomOut");break}}),a=le(l=>{const g=l.deltaY||l.deltaX;L(g<0?"zoomIn":"zoomOut",{zoomRate:s.zoomRate,enableTransition:!1})});I.run(()=>{X(document,"keydown",e),X(document,"wheel",a)})}function ne(){I.stop()}function oe(){x.value=!1}function q(e){x.value=!1,e.target.alt=C("el.image.error")}function J(e){if(x.value||e.button!==0||!O.value)return;d.value.enableTransition=!1;const{offsetX:a,offsetY:l}=d.value,g=e.pageX,E=e.pageY,h=le(B=>{d.value={...d.value,offsetX:a+B.pageX-g,offsetY:l+B.pageY-E}}),S=X(document,"mousemove",h);X(document,"mouseup",()=>{S()}),e.preventDefault()}function F(){d.value={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}function P(){if(x.value)return;const e=Ye(N),a=Object.values(N),l=v.value.name,E=(a.findIndex(h=>h.name===l)+1)%e.length;v.value=N[e[E]],F()}function j(e){const a=s.urlList.length;m.value=(e+a)%a}function G(){R.value&&!s.infinite||j(m.value-1)}function U(){Z.value&&!s.infinite||j(m.value+1)}function L(e,a={}){if(x.value)return;const{zoomRate:l,rotateDeg:g,enableTransition:E}={zoomRate:s.zoomRate,rotateDeg:90,enableTransition:!0,...a};switch(e){case"zoomOut":d.value.scale>.2&&(d.value.scale=Number.parseFloat((d.value.scale/l).toFixed(3)));break;case"zoomIn":d.value.scale<7&&(d.value.scale=Number.parseFloat((d.value.scale*l).toFixed(3)));break;case"clockwise":d.value.deg+=g;break;case"anticlockwise":d.value.deg-=g;break}d.value.enableTransition=E}return ie(se,()=>{ge(()=>{const e=b.value[0];e!=null&&e.complete||(x.value=!0)})}),ie(m,e=>{F(),c("switch",e)}),he(()=>{var e,a;D(),(a=(e=O.value)==null?void 0:e.focus)==null||a.call(e)}),p({setActiveItem:j}),(e,a)=>(_(),K(He,{to:"body",disabled:!e.teleported},[n(Xe,{name:"viewer-fade",appear:""},{default:w(()=>[o("div",{ref_key:"wrapper",ref:O,tabindex:-1,class:f(t(i).e("wrapper")),style:ce({zIndex:t(ae)})},[o("div",{class:f(t(i).e("mask")),onClick:a[0]||(a[0]=Le(l=>e.hideOnClickModal&&A(),["self"]))},null,2),k(" CLOSE "),o("span",{class:f([t(i).e("btn"),t(i).e("close")]),onClick:A},[n(t($),null,{default:w(()=>[n(t(Ee))]),_:1})],2),k(" ARROW "),t(H)?k("v-if",!0):(_(),T(ue,{key:0},[o("span",{class:f([t(i).e("btn"),t(i).e("prev"),t(i).is("disabled",!e.infinite&&t(R))]),onClick:G},[n(t($),null,{default:w(()=>[n(t(Se))]),_:1})],2),o("span",{class:f([t(i).e("btn"),t(i).e("next"),t(i).is("disabled",!e.infinite&&t(Z))]),onClick:U},[n(t($),null,{default:w(()=>[n(t(Te))]),_:1})],2)],64)),k(" ACTIONS "),o("div",{class:f([t(i).e("btn"),t(i).e("actions")])},[o("div",{class:f(t(i).e("actions__inner"))},[n(t($),{onClick:a[1]||(a[1]=l=>L("zoomOut"))},{default:w(()=>[n(t($e))]),_:1}),n(t($),{onClick:a[2]||(a[2]=l=>L("zoomIn"))},{default:w(()=>[n(t(Ne))]),_:1}),o("i",{class:f(t(i).e("actions__divider"))},null,2),n(t($),{onClick:P},{default:w(()=>[(_(),K(Oe(t(v).icon)))]),_:1}),o("i",{class:f(t(i).e("actions__divider"))},null,2),n(t($),{onClick:a[3]||(a[3]=l=>L("anticlockwise"))},{default:w(()=>[n(t(Re))]),_:1}),n(t($),{onClick:a[4]||(a[4]=l=>L("clockwise"))},{default:w(()=>[n(t(Ae))]),_:1})],2)],2),k(" CANVAS "),o("div",{class:f(t(i).e("canvas"))},[(_(!0),T(ue,null,Be(e.urlList,(l,g)=>Ve((_(),T("img",{ref_for:!0,ref:E=>b.value[g]=E,key:l,src:l,style:ce(t(Y)),class:f(t(i).e("img")),onLoad:oe,onError:q,onMousedown:J},null,46,tt)),[[Me,g===m.value]])),128))],2),W(e.$slots,"default")],6)]),_:3})],8,["disabled"]))}});var nt=we(at,[["__file","/home/runner/work/element-plus/element-plus/packages/components/image-viewer/src/image-viewer.vue"]]);const ot=ye(nt),lt=pe({hideOnClickModal:{type:Boolean,default:!1},src:{type:String,default:""},fit:{type:String,values:["","contain","cover","fill","none","scale-down"],default:""},loading:{type:String,values:["eager","lazy"]},lazy:{type:Boolean,default:!1},scrollContainer:{type:re([String,Object])},previewSrcList:{type:re(Array),default:()=>me([])},previewTeleported:{type:Boolean,default:!1},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2}}),rt={load:r=>r instanceof Event,error:r=>r instanceof Event,switch:r=>de(r),close:()=>!0,show:()=>!0},it=["src","loading"],ct={key:0},ut=ee({name:"ElImage",inheritAttrs:!1}),dt=ee({...ut,props:lt,emits:rt,setup(r,{emit:p}){const c=r;let s="";const{t:N}=ve(),C=_e("image"),i=De(),te=Ge(),O=y(),b=y(!1),I=y(!0),x=y(!1),m=y(),v=y(),d=M&&"loading"in HTMLImageElement.prototype;let H,R;const Z=z(()=>i.style),se=z(()=>{const{fit:e}=c;return M&&e?{objectFit:e}:{}}),Y=z(()=>{const{previewSrcList:e}=c;return Array.isArray(e)&&e.length>0}),ae=z(()=>{const{previewSrcList:e,initialIndex:a}=c;let l=a;return a>e.length-1&&(l=0),l}),A=z(()=>c.loading==="eager"?!1:!d&&c.loading==="lazy"||c.lazy),D=()=>{!M||(I.value=!0,b.value=!1,O.value=c.src)};function ne(e){I.value=!1,b.value=!1,p("load",e)}function oe(e){I.value=!1,b.value=!0,p("error",e)}function q(){Ke(m.value,v.value)&&(D(),P())}const J=Ze(q,200);async function F(){var e;if(!M)return;await ge();const{scrollContainer:a}=c;je(a)?v.value=a:We(a)&&a!==""?v.value=(e=document.querySelector(a))!=null?e:void 0:m.value&&(v.value=Ue(m.value)),v.value&&(H=X(v,"scroll",J),setTimeout(()=>q(),100))}function P(){!M||!v.value||!J||(H==null||H(),v.value=void 0)}function j(e){if(!!e.ctrlKey){if(e.deltaY<0)return e.preventDefault(),!1;if(e.deltaY>0)return e.preventDefault(),!1}}function G(){!Y.value||(R=X("wheel",j,{passive:!1}),s=document.body.style.overflow,document.body.style.overflow="hidden",x.value=!0,p("show"))}function U(){R==null||R(),document.body.style.overflow=s,x.value=!1,p("close")}function L(e){p("switch",e)}return ie(()=>c.src,()=>{A.value?(I.value=!0,b.value=!1,P(),F()):D()}),he(()=>{A.value?F():D()}),(e,a)=>(_(),T("div",{ref_key:"container",ref:m,class:f([t(C).b(),e.$attrs.class]),style:ce(t(Z))},[O.value!==void 0&&!b.value?(_(),T("img",Fe({key:0},t(te),{src:O.value,loading:e.loading,style:t(se),class:[t(C).e("inner"),t(Y)&&t(C).e("preview"),I.value&&t(C).is("loading")],onClick:G,onLoad:ne,onError:oe}),null,16,it)):k("v-if",!0),I.value||b.value?(_(),T("div",{key:1,class:f(t(C).e("wrapper"))},[I.value?W(e.$slots,"placeholder",{key:0},()=>[o("div",{class:f(t(C).e("placeholder"))},null,2)]):b.value?W(e.$slots,"error",{key:1},()=>[o("div",{class:f(t(C).e("error"))},Pe(t(N)("el.image.error")),3)]):k("v-if",!0)],2)):k("v-if",!0),t(Y)?(_(),T(ue,{key:2},[x.value?(_(),K(t(ot),{key:0,"z-index":e.zIndex,"initial-index":t(ae),infinite:e.infinite,"zoom-rate":e.zoomRate,"url-list":e.previewSrcList,"hide-on-click-modal":e.hideOnClickModal,teleported:e.previewTeleported,"close-on-press-escape":e.closeOnPressEscape,onClose:U,onSwitch:L},{default:w(()=>[e.$slots.viewer?(_(),T("div",ct,[W(e.$slots,"viewer")])):k("v-if",!0)]),_:3},8,["z-index","initial-index","infinite","zoom-rate","url-list","hide-on-click-modal","teleported","close-on-press-escape"])):k("v-if",!0)],64)):k("v-if",!0)],6))}});var ft=we(dt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/image/src/image.vue"]]);const pt=ye(ft);const mt={},vt={class:"help-content"};function _t(r,p){return _(),T("div",vt,[W(r.$slots,"default",{},void 0,!0)])}const gt=ze(mt,[["render",_t],["__scopeId","data-v-5b7e783f"]]);const u=r=>(qe("data-v-5415ae97"),r=r(),Je(),r),ht=u(()=>o("p",null,"\u53EA\u9700\u51E0\u6B65\u8F7B\u677E\u8BBE\u7F6E",-1)),wt=u(()=>o("p",null,[Q(" 1\u3001\u9996\u5148\uFF0C\u6253\u5F00\u6CE2\u573A\u6D4F\u89C8\u5668 "),o("a",{href:"https://tronscan.org",target:"_blank"},"tronscan")],-1)),yt=u(()=>o("p",null,"2\u3001\u70B9\u51FB\u8FDE\u63A5\u94B1\u5305",-1)),zt=u(()=>o("p",null,"3\u3001\u8FDE\u63A5\u6210\u529F\u540E\uFF0C\u70B9\u51FB\u94B1\u5305\u5730\u5740",-1)),kt=u(()=>o("p",null,"4\u3001\u70B9\u51FB\u8FDB\u5165\u8D26\u6237",-1)),bt=u(()=>o("p",null,"5\u3001\u70B9\u51FB\u7F16\u8F91\u6743\u9650",-1)),It=u(()=>o("p",null,"6\u3001\u70B9\u51FB\u6DFB\u52A0\u65B0\u6743\u9650",-1)),xt=u(()=>o("p",null,"7\u3001\u6743\u9650\u540D\u79F0\u5FC5\u987B\u8F93\u5165feee.io",-1)),Ct=u(()=>o("p",null,"8\u3001\u9608\u503C\u586B\u51991",-1)),Lt=u(()=>o("p",null,[Q("9\u3001\u8F93\u5165\u5E73\u53F0\u94B1\u5305\u5730\u5740"),o("mark",null,"TQcC5yWBCuqo9pXkskHJMdsfBwZJLhhhhh")],-1)),Et=u(()=>o("p",null,"10\u3001\u6743\u91CD\u586B\u51991s",-1)),St=u(()=>o("p",null,"11\u3001\u70B9\u51FB\u6DFB\u52A0\u64CD\u4F5C",-1)),Tt=u(()=>o("p",null," 12\u3001\u5728\u7F16\u8F91\u6743\u9650\u5F39\u7A97\u4E2D\u52FE\u9009\u8FD94\u9879\uFF08TRX Freeze\u662F\u8D28\u62BC\u6743\u9650\uFF0C\u6388\u6743\u5E73\u53F0\u540E\u53EF\u81EA\u52A8\u5316\u51FA\u552E\u80FD\u91CF\u6216\u5E26\u5BBD\u3001TRX Unfreeze\u662F\u89E3\u62BC\u6743\u9650\uFF0C\u6388\u6743\u540E\u5E73\u53F0\u81EA\u52A8\u89E3\u51BB\u8D28\u62BC\u8BA2\u5355\u3001 \u6388\u6743\u6295\u7968\u6743\u9650\uFF0C\u53EF\u5728\u51FA\u552E\u6210\u529F\u540E\u81EA\u52A8\u6295\u7968\uFF0C\u83B7\u53D6TRX\u6743\u76CA\u5956\u52B1\u3001 Reward Withdraw\u662F\u9886\u53D6\u6743\u76CA\u6743\u9650\uFF0C\u6388\u6743\u540E\u5E73\u53F0\u4F1A\u81EA\u52A8\u9886\u53D6\u6743\u76CA\u6536\u76CA\u5230\u60A8\u7684\u94B1\u5305\uFF09 ",-1)),$t=u(()=>o("p",null,"13\u3001\u70B9\u51FB\u4FDD\u5B58",-1)),Nt=u(()=>o("p",null,"14\u3001\u4FDD\u5B58\u6210\u529F\u540E\uFF0C\u6211\u4EEC\u4F1A\u770B\u5230\u65B0\u6DFB\u52A0\u7684\u6388\u6743\u6743\u9650",-1)),Ot=u(()=>o("p",null,"15\u3001\u518D\u70B9\u51FB\u53F3\u4E0A\u65B9\u7684\u4FDD\u5B58\u6309\u94AE",-1)),Rt=u(()=>o("p",null,"16\u3001\u6CE2\u573A\u4F1A\u6536\u53D6100TRX\u7684\u8D39\u7528",-1)),At=u(()=>o("p",null,[Q(" 17\u3001\u652F\u4ED8\u6210\u529F\u540E\uFF0C\u56DE\u5230\u5356\u5BB6\u540E\u53F0 "),o("a",{href:"https://feee.io/console",target:"_blank",rel:"noopener noreferrer"},"Feee.io"),Q("\uFF0C\u586B\u5199\u5DF2\u8BBE\u7F6E\u6388\u6743\u7684\u94B1\u5305\u5730\u5740\u5E76\u63D0\u4EA4\u5B8C\u6210\u6388\u6743\uFF0C\u5230\u6B64\u6388\u6743\u7684\u5168\u90E8\u64CD\u4F5C\u5C31\u5B8C\u6210\u4E86\u3002 ")],-1)),Bt={__name:"index",setup(r){return(p,c)=>{const s=pt;return _(),K(gt,{class:"text-course-wrapper"},{default:w(()=>[ht,wt,n(s,{src:"/src/assets/help/cas-1.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),yt,n(s,{src:"/src/assets/help/cas-2.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),zt,n(s,{src:"/src/assets/help/cas-3.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),kt,n(s,{src:"/src/assets/help/cas-4.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),bt,n(s,{src:"/src/assets/help/cas-5.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),It,n(s,{src:"/src/assets/help/cas-6.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),xt,n(s,{src:"/src/assets/help/cas-7.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),Ct,n(s,{src:"/src/assets/help/cas-8.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),Lt,n(s,{src:"/src/assets/help/cas-9.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),Et,n(s,{src:"/src/assets/help/cas-10.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),St,n(s,{src:"/src/assets/help/cas-11.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),Tt,n(s,{src:"/src/assets/help/cas-12.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),$t,n(s,{src:"/src/assets/help/cas-13.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),Nt,n(s,{src:"/src/assets/help/cas-14.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),Ot,n(s,{src:"/src/assets/help/cas-15.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),Rt,n(s,{src:"/src/assets/help/cas-16.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),At,n(s,{src:"/src/assets/help/cas-17-1.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"]),n(s,{src:"/src/assets/help/cas-17-2.png","zoom-rate":1.2,"initial-index":4,fit:"cover"},null,8,["zoom-rate"])]),_:1})}}},Ft=ze(Bt,[["__scopeId","data-v-5415ae97"]]);export{Ft as default};
//# sourceMappingURL=index.1abab07d.js.map