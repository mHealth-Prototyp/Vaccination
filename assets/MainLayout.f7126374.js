import{k as Q,c as n,h as y,l as ee,i as fe,m as k,n as ae,r as q,w as f,p as ye,q as He,s as ve,g as te,t as We,v as Ke,x as Fe,y as Ue,z as Ye,A as Ge,B as Je,C as de,D as Ee,E as J,o as Xe,G as Ze,H as be,I as ea,J as Le,K as aa,L as ta,M as me,N as X,a as oa,O as sa,P as na,d as qe,u as Te,R as Re,S as K,U as Z,V as D,j,W as F,X as U,Y as ia,Z as ra,$ as la,a0 as _e,a1 as ce,F as ua,a2 as M,a3 as De,a4 as da,a5 as ma,a6 as _a,_ as t,a7 as ca,a8 as va,a9 as fa}from"./index.9b44893e.js";import{u as ga}from"./use-quasar.298dd09d.js";import{_ as Oe}from"./plugin-vue_export-helper.21dcd24c.js";import{u as pa}from"./vue-i18n.runtime.fffd3340.js";var ha=Q({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:g}){const c=n(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>y("div",{class:c.value},ee(g.default))}}),Na=Q({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:g}){const c=n(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>y("div",{class:c.value,role:"toolbar"},ee(g.default))}}),Ea=Q({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:g,emit:c}){const{proxy:{$q:u}}=te(),i=fe(ae,k);if(i===k)return console.error("QHeader needs to be child of QLayout"),k;const d=q(parseInt(e.heightHint,10)),E=q(!0),_=n(()=>e.reveal===!0||i.view.value.indexOf("H")!==-1||u.platform.is.ios&&i.isContainer.value===!0),p=n(()=>{if(e.modelValue!==!0)return 0;if(_.value===!0)return E.value===!0?d.value:0;const s=d.value-i.scroll.value.position;return s>0?s:0}),h=n(()=>e.modelValue!==!0||_.value===!0&&E.value!==!0),o=n(()=>e.modelValue===!0&&h.value===!0&&e.reveal===!0),z=n(()=>"q-header q-layout__section--marginal "+(_.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(h.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),V=n(()=>{const s=i.rows.value.top,T={};return s[0]==="l"&&i.left.space===!0&&(T[u.lang.rtl===!0?"right":"left"]=`${i.left.size}px`),s[2]==="r"&&i.right.space===!0&&(T[u.lang.rtl===!0?"left":"right"]=`${i.right.size}px`),T});function b(s,T){i.update("header",s,T)}function v(s,T){s.value!==T&&(s.value=T)}function w({height:s}){v(d,s),b("size",s)}function L(s){o.value===!0&&v(E,!0),c("focusin",s)}f(()=>e.modelValue,s=>{b("space",s),v(E,!0),i.animate()}),f(p,s=>{b("offset",s)}),f(()=>e.reveal,s=>{s===!1&&v(E,e.modelValue)}),f(E,s=>{i.animate(),c("reveal",s)}),f(i.scroll,s=>{e.reveal===!0&&v(E,s.direction==="up"||s.position<=e.revealOffset||s.position-s.inflectionPoint<100)});const m={};return i.instances.header=m,e.modelValue===!0&&b("size",d.value),b("space",e.modelValue),b("offset",p.value),ye(()=>{i.instances.header===m&&(i.instances.header=void 0,b("size",0),b("offset",0),b("space",!1))}),()=>{const s=He(g.default,[]);return e.elevated===!0&&s.push(y("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),s.push(y(ve,{debounce:0,onResize:w})),y("header",{class:z.value,style:V.value,onFocusin:L},s)}}});const je=150;var ba=Q({name:"QDrawer",inheritAttrs:!1,props:{...We,...Ke,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...Fe,"onLayout","miniState"],setup(e,{slots:g,emit:c,attrs:u}){const i=te(),{proxy:{$q:d}}=i,E=Ue(e,d),{preventBodyScroll:_}=ea(),{registerTimeout:p,removeTimeout:h}=Ye(),o=fe(ae,k);if(o===k)return console.error("QDrawer needs to be child of QLayout"),k;let z,V=null,b;const v=q(e.behavior==="mobile"||e.behavior!=="desktop"&&o.totalWidth.value<=e.breakpoint),w=n(()=>e.mini===!0&&v.value!==!0),L=n(()=>w.value===!0?e.miniWidth:e.width),m=q(e.showIfAbove===!0&&v.value===!1?!0:e.modelValue===!0),s=n(()=>e.persistent!==!0&&(v.value===!0||Pe.value===!0));function T(a,r){if(S(),a!==!1&&o.animate(),P(0),v.value===!0){const R=o.instances[Y.value];R!==void 0&&R.belowBreakpoint===!0&&R.hide(!1),A(1),o.isContainer.value!==!0&&_(!0)}else A(0),a!==!1&&re(!1);p(()=>{a!==!1&&re(!0),r!==!0&&c("show",a)},je)}function l(a,r){H(),a!==!1&&o.animate(),A(0),P(B.value*L.value),le(),r!==!0?p(()=>{c("hide",a)},je):h()}const{show:N,hide:O}=Ge({showing:m,hideOnRouteChange:s,handleShow:T,handleHide:l}),{addToHistory:S,removeFromHistory:H}=Je(m,O,s),x={belowBreakpoint:v,hide:O},I=n(()=>e.side==="right"),B=n(()=>(d.lang.rtl===!0?-1:1)*(I.value===!0?1:-1)),ge=q(0),$=q(!1),oe=q(!1),pe=q(L.value*B.value),Y=n(()=>I.value===!0?"left":"right"),se=n(()=>m.value===!0&&v.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:L.value:0),ne=n(()=>e.overlay===!0||e.miniToOverlay===!0||o.view.value.indexOf(I.value?"R":"L")!==-1||d.platform.is.ios===!0&&o.isContainer.value===!0),W=n(()=>e.overlay===!1&&m.value===!0&&v.value===!1),Pe=n(()=>e.overlay===!0&&m.value===!0&&v.value===!1),Ve=n(()=>"fullscreen q-drawer__backdrop"+(m.value===!1&&$.value===!1?" hidden":"")),we=n(()=>({backgroundColor:`rgba(0,0,0,${ge.value*.4})`})),he=n(()=>I.value===!0?o.rows.value.top[2]==="r":o.rows.value.top[0]==="l"),Ie=n(()=>I.value===!0?o.rows.value.bottom[2]==="r":o.rows.value.bottom[0]==="l"),ke=n(()=>{const a={};return o.header.space===!0&&he.value===!1&&(ne.value===!0?a.top=`${o.header.offset}px`:o.header.space===!0&&(a.top=`${o.header.size}px`)),o.footer.space===!0&&Ie.value===!1&&(ne.value===!0?a.bottom=`${o.footer.offset}px`:o.footer.space===!0&&(a.bottom=`${o.footer.size}px`)),a}),Ae=n(()=>{const a={width:`${L.value}px`,transform:`translateX(${pe.value}px)`};return v.value===!0?a:Object.assign(a,ke.value)}),Ce=n(()=>"q-drawer__content fit "+(o.isContainer.value!==!0?"scroll":"overflow-auto")),ze=n(()=>`q-drawer q-drawer--${e.side}`+(oe.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(E.value===!0?" q-drawer--dark q-dark":"")+($.value===!0?" no-transition":m.value===!0?"":" q-layout--prevent-focus")+(v.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${w.value===!0?"mini":"standard"}`+(ne.value===!0||W.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(he.value===!0?" q-drawer--top-padding":""))),Se=n(()=>{const a=d.lang.rtl===!0?e.side:Y.value;return[[de,Me,void 0,{[a]:!0,mouse:!0}]]}),xe=n(()=>{const a=d.lang.rtl===!0?Y.value:e.side;return[[de,Ne,void 0,{[a]:!0,mouse:!0}]]}),Be=n(()=>{const a=d.lang.rtl===!0?Y.value:e.side;return[[de,Ne,void 0,{[a]:!0,mouse:!0,mouseAllDir:!0}]]});function ie(){Qe(v,e.behavior==="mobile"||e.behavior!=="desktop"&&o.totalWidth.value<=e.breakpoint)}f(v,a=>{a===!0?(z=m.value,m.value===!0&&O(!1)):e.overlay===!1&&e.behavior!=="mobile"&&z!==!1&&(m.value===!0?(P(0),A(0),le()):N(!1))}),f(()=>e.side,(a,r)=>{o.instances[r]===x&&(o.instances[r]=void 0,o[r].space=!1,o[r].offset=0),o.instances[a]=x,o[a].size=L.value,o[a].space=W.value,o[a].offset=se.value}),f(o.totalWidth,()=>{(o.isContainer.value===!0||document.qScrollPrevented!==!0)&&ie()}),f(()=>e.behavior+e.breakpoint,ie),f(o.isContainer,a=>{m.value===!0&&_(a!==!0),a===!0&&ie()}),f(o.scrollbarWidth,()=>{P(m.value===!0?0:void 0)}),f(se,a=>{C("offset",a)}),f(W,a=>{c("onLayout",a),C("space",a)}),f(I,()=>{P()}),f(L,a=>{P(),ue(e.miniToOverlay,a)}),f(()=>e.miniToOverlay,a=>{ue(a,L.value)}),f(()=>d.lang.rtl,()=>{P()}),f(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&($e(),o.animate())}),f(w,a=>{c("miniState",a)});function P(a){a===void 0?Ee(()=>{a=m.value===!0?0:L.value,P(B.value*a)}):(o.isContainer.value===!0&&I.value===!0&&(v.value===!0||Math.abs(a)===L.value)&&(a+=B.value*o.scrollbarWidth.value),pe.value=a)}function A(a){ge.value=a}function re(a){const r=a===!0?"remove":o.isContainer.value!==!0?"add":"";r!==""&&document.body.classList[r]("q-body--drawer-toggle")}function $e(){V!==null&&clearTimeout(V),i.proxy&&i.proxy.$el&&i.proxy.$el.classList.add("q-drawer--mini-animate"),oe.value=!0,V=setTimeout(()=>{V=null,oe.value=!1,i&&i.proxy&&i.proxy.$el&&i.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function Me(a){if(m.value!==!1)return;const r=L.value,R=J(a.distance.x,0,r);if(a.isFinal===!0){R>=Math.min(75,r)===!0?N():(o.animate(),A(0),P(B.value*r)),$.value=!1;return}P((d.lang.rtl===!0?I.value!==!0:I.value)?Math.max(r-R,0):Math.min(0,R-r)),A(J(R/r,0,1)),a.isFirst===!0&&($.value=!0)}function Ne(a){if(m.value!==!0)return;const r=L.value,R=a.direction===e.side,G=(d.lang.rtl===!0?R!==!0:R)?J(a.distance.x,0,r):0;if(a.isFinal===!0){Math.abs(G)<Math.min(75,r)===!0?(o.animate(),A(1),P(0)):O(),$.value=!1;return}P(B.value*G),A(J(1-G/r,0,1)),a.isFirst===!0&&($.value=!0)}function le(){_(!1),re(!0)}function C(a,r){o.update(e.side,a,r)}function Qe(a,r){a.value!==r&&(a.value=r)}function ue(a,r){C("size",a===!0?e.miniWidth:r)}return o.instances[e.side]=x,ue(e.miniToOverlay,L.value),C("space",W.value),C("offset",se.value),e.showIfAbove===!0&&e.modelValue!==!0&&m.value===!0&&e["onUpdate:modelValue"]!==void 0&&c("update:modelValue",!0),Xe(()=>{c("onLayout",W.value),c("miniState",w.value),z=e.showIfAbove===!0;const a=()=>{(m.value===!0?T:l)(!1,!0)};if(o.totalWidth.value!==0){Ee(a);return}b=f(o.totalWidth,()=>{b(),b=void 0,m.value===!1&&e.showIfAbove===!0&&v.value===!1?N(!1):a()})}),ye(()=>{b!==void 0&&b(),V!==null&&(clearTimeout(V),V=null),m.value===!0&&le(),o.instances[e.side]===x&&(o.instances[e.side]=void 0,C("size",0),C("offset",0),C("space",!1))}),()=>{const a=[];v.value===!0&&(e.noSwipeOpen===!1&&a.push(Ze(y("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),Se.value)),a.push(be("div",{ref:"backdrop",class:Ve.value,style:we.value,"aria-hidden":"true",onClick:O},void 0,"backdrop",e.noSwipeBackdrop!==!0&&m.value===!0,()=>Be.value)));const r=w.value===!0&&g.mini!==void 0,R=[y("div",{...u,key:""+r,class:[Ce.value,u.class]},r===!0?g.mini():ee(g.default))];return e.elevated===!0&&m.value===!0&&R.push(y("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),a.push(be("aside",{ref:"content",class:ze.value,style:Ae.value},R,"contentclose",e.noSwipeClose!==!0&&v.value===!0,()=>xe.value)),y("div",{class:"q-drawer-container"},a)}}}),ja=Q({name:"QPageContainer",setup(e,{slots:g}){const{proxy:{$q:c}}=te(),u=fe(ae,k);if(u===k)return console.error("QPageContainer needs to be child of QLayout"),k;Le(aa,!0);const i=n(()=>{const d={};return u.header.space===!0&&(d.paddingTop=`${u.header.size}px`),u.right.space===!0&&(d[`padding${c.lang.rtl===!0?"Left":"Right"}`]=`${u.right.size}px`),u.footer.space===!0&&(d.paddingBottom=`${u.footer.size}px`),u.left.space===!0&&(d[`padding${c.lang.rtl===!0?"Right":"Left"}`]=`${u.left.size}px`),d});return()=>y("div",{class:"q-page-container",style:i.value},ee(g.default))}}),ya=Q({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:g,emit:c}){const{proxy:{$q:u}}=te(),i=q(null),d=q(u.screen.height),E=q(e.container===!0?0:u.screen.width),_=q({position:0,direction:"down",inflectionPoint:0}),p=q(0),h=q(ta.value===!0?0:me()),o=n(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),z=n(()=>e.container===!1?{minHeight:u.screen.height+"px"}:null),V=n(()=>h.value!==0?{[u.lang.rtl===!0?"left":"right"]:`${h.value}px`}:null),b=n(()=>h.value!==0?{[u.lang.rtl===!0?"right":"left"]:0,[u.lang.rtl===!0?"left":"right"]:`-${h.value}px`,width:`calc(100% + ${h.value}px)`}:null);function v(l){if(e.container===!0||document.qScrollPrevented!==!0){const N={position:l.position.top,direction:l.direction,directionChanged:l.directionChanged,inflectionPoint:l.inflectionPoint.top,delta:l.delta.top};_.value=N,e.onScroll!==void 0&&c("scroll",N)}}function w(l){const{height:N,width:O}=l;let S=!1;d.value!==N&&(S=!0,d.value=N,e.onScrollHeight!==void 0&&c("scrollHeight",N),m()),E.value!==O&&(S=!0,E.value=O),S===!0&&e.onResize!==void 0&&c("resize",l)}function L({height:l}){p.value!==l&&(p.value=l,m())}function m(){if(e.container===!0){const l=d.value>p.value?me():0;h.value!==l&&(h.value=l)}}let s=null;const T={instances:{},view:n(()=>e.view),isContainer:n(()=>e.container),rootRef:i,height:d,containerHeight:p,scrollbarWidth:h,totalWidth:n(()=>E.value+h.value),rows:n(()=>{const l=e.view.toLowerCase().split(" ");return{top:l[0].split(""),middle:l[1].split(""),bottom:l[2].split("")}}),header:X({size:0,offset:0,space:!1}),right:X({size:300,offset:0,space:!1}),footer:X({size:0,offset:0,space:!1}),left:X({size:300,offset:0,space:!1}),scroll:_,animate(){s!==null?clearTimeout(s):document.body.classList.add("q-body--layout-animate"),s=setTimeout(()=>{s=null,document.body.classList.remove("q-body--layout-animate")},155)},update(l,N,O){T[l][N]=O}};if(Le(ae,T),me()>0){let O=function(){l=null,N.classList.remove("hide-scrollbar")},S=function(){if(l===null){if(N.scrollHeight>u.screen.height)return;N.classList.add("hide-scrollbar")}else clearTimeout(l);l=setTimeout(O,300)},H=function(x){l!==null&&x==="remove"&&(clearTimeout(l),O()),window[`${x}EventListener`]("resize",S)},l=null;const N=document.body;f(()=>e.container!==!0?"add":"remove",H),e.container!==!0&&H("add"),oa(()=>{H("remove")})}return()=>{const l=sa(g.default,[y(na,{onScroll:v}),y(ve,{onResize:w})]),N=y("div",{class:o.value,style:z.value,ref:e.container===!0?void 0:i,tabindex:-1},l);return e.container===!0?y("div",{class:"q-layout-container overflow-hidden",ref:i},[y(ve,{onResize:L}),y("div",{class:"absolute-full",style:V.value},[y("div",{class:"scroll",style:b.value},[N])])]):N}}}),La=[{isoName:"ar-TN",nativeName:"\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u062A\u0648\u0646\u0633)"},{isoName:"ar",nativeName:"\u0627\u0644\u0639\u0631\u0628\u064A\u0629"},{isoName:"az-Latn",nativeName:"Azerbaijani (latin)"},{isoName:"bg",nativeName:"\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438 \u0435\u0437\u0438\u043A"},{isoName:"bn",nativeName:"\u09AC\u09BE\u0982\u09B2\u09BE"},{isoName:"ca",nativeName:"Catal\xE0"},{isoName:"cs",nativeName:"\u010Ce\u0161tina"},{isoName:"da",nativeName:"Dansk"},{isoName:"de-CH",nativeName:"Deutsch (CH)"},{isoName:"de-DE",nativeName:"Deutsch (DE)"},{isoName:"de",nativeName:"Deutsch"},{isoName:"el",nativeName:"\u03B5\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"},{isoName:"en-GB",nativeName:"English (UK)"},{isoName:"en-US",nativeName:"English (US)"},{isoName:"eo",nativeName:"Esperanto"},{isoName:"es",nativeName:"Espa\xF1ol"},{isoName:"et",nativeName:"Eesti"},{isoName:"eu",nativeName:"Euskara"},{isoName:"fa-IR",nativeName:"\u0641\u0627\u0631\u0633\u06CC"},{isoName:"fa",nativeName:"\u0641\u0627\u0631\u0633\u06CC"},{isoName:"fi",nativeName:"Suomi"},{isoName:"fr",nativeName:"Fran\xE7ais"},{isoName:"gn",nativeName:"Ava\xF1e'\u1EBD"},{isoName:"he",nativeName:"\u05E2\u05D1\u05E8\u05D9\u05EA"},{isoName:"hi",nativeName:"\u0905\u092E\u0947\u0930\u093F\u0915\u0940 \u0905\u0902\u0917\u094D\u0930\u0947\u091C\u093C\u0940"},{isoName:"hr",nativeName:"Hrvatski jezik"},{isoName:"hu",nativeName:"Magyar"},{isoName:"id",nativeName:"Bahasa Indonesia"},{isoName:"is",nativeName:"\xCDslenska"},{isoName:"it",nativeName:"Italiano"},{isoName:"ja",nativeName:"\u65E5\u672C\u8A9E (\u306B\u307B\u3093\u3054)"},{isoName:"kk",nativeName:"\u049A\u0430\u0437\u0430\u049B\u0448\u0430"},{isoName:"km",nativeName:"\u1781\u17D2\u1798\u17C2\u179A"},{isoName:"ko-KR",nativeName:"\uD55C\uAD6D\uC5B4"},{isoName:"kur-CKB",nativeName:"\u06A9\u0648\u0631\u062F\u06CC \u0633\u06C6\u0631\u0627\u0646\u06CC"},{isoName:"lt",nativeName:"Lithuanian"},{isoName:"lu",nativeName:"Kiluba"},{isoName:"lv",nativeName:"Latvie\u0161u valoda"},{isoName:"mk",nativeName:"\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438"},{isoName:"ml",nativeName:"\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02"},{isoName:"mm",nativeName:"\u1019\u103C\u1014\u103A\u1019\u102C(\u1017\u1019\u102C)"},{isoName:"ms-MY",nativeName:"Malaysia"},{isoName:"ms",nativeName:"Bahasa Melayu"},{isoName:"my",nativeName:"Malaysia"},{isoName:"nb-NO",nativeName:"Norsk"},{isoName:"nl",nativeName:"Nederlands"},{isoName:"pl",nativeName:"Polski"},{isoName:"pt-BR",nativeName:"Portugu\xEAs (BR)"},{isoName:"pt",nativeName:"Portugu\xEAs"},{isoName:"ro",nativeName:"Rom\xE2n\u0103"},{isoName:"ru",nativeName:"\u0440\u0443\u0441\u0441\u043A\u0438\u0439"},{isoName:"sk",nativeName:"Sloven\u010Dina"},{isoName:"sl",nativeName:"Slovenski Jezik"},{isoName:"sm",nativeName:"Fa'as\u0101moa"},{isoName:"sr-CYR",nativeName:"\u0441\u0440\u043F\u0441\u043A\u0438 \u0458\u0435\u0437\u0438\u043A"},{isoName:"sr",nativeName:"srpski jezik"},{isoName:"sv",nativeName:"Svenska"},{isoName:"ta",nativeName:"\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD"},{isoName:"th",nativeName:"\u0E44\u0E17\u0E22"},{isoName:"tl",nativeName:"Tagalog"},{isoName:"tr",nativeName:"T\xFCrk\xE7e"},{isoName:"ug",nativeName:"\u0626\u06C7\u064A\u063A\u06C7\u0631\u0686\u06D5"},{isoName:"uk",nativeName:"\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"},{isoName:"uz-Cyrl",nativeName:"\u040E\u0437\u0431\u0435\u043A\u0447\u0430 (\u041A\u0438\u0440\u0438\u043B)"},{isoName:"uz-Latn",nativeName:"O'zbekcha (Lotin)"},{isoName:"vi",nativeName:"Ti\u1EBFng Vi\u1EC7t"},{isoName:"zh-CN",nativeName:"\u4E2D\u6587(\u7B80\u4F53)"},{isoName:"zh-TW",nativeName:"\u4E2D\u6587\uFF08\u7E41\u9AD4\uFF09"}];const qa={class:"footer-menu-link"},Ta=qe({__name:"DrawerMenuItems",setup(e){const g=ga(),{t:c,locale:u}=pa(),i=Te(),d={"../../node_modules/quasar/lang/ar-TN.js":()=>t(()=>import("./ar-TN.23a27262.js"),[]),"../../node_modules/quasar/lang/ar.js":()=>t(()=>import("./ar.3c1e0222.js"),[]),"../../node_modules/quasar/lang/az-Latn.js":()=>t(()=>import("./az-Latn.c0073661.js"),[]),"../../node_modules/quasar/lang/bg.js":()=>t(()=>import("./bg.a4b5593d.js"),[]),"../../node_modules/quasar/lang/bn.js":()=>t(()=>import("./bn.dbd5d0e9.js"),[]),"../../node_modules/quasar/lang/ca.js":()=>t(()=>import("./ca.d73b3299.js"),[]),"../../node_modules/quasar/lang/cs.js":()=>t(()=>import("./cs.c6dce247.js"),[]),"../../node_modules/quasar/lang/da.js":()=>t(()=>import("./da.60e7a231.js"),[]),"../../node_modules/quasar/lang/de-CH.js":()=>t(()=>import("./de-CH.44966ab6.js"),[]),"../../node_modules/quasar/lang/de-DE.js":()=>t(()=>import("./de-DE.ba18320e.js"),[]),"../../node_modules/quasar/lang/de.js":()=>t(()=>import("./de.d6adeb1f.js"),[]),"../../node_modules/quasar/lang/el.js":()=>t(()=>import("./el.d6dd75e7.js"),[]),"../../node_modules/quasar/lang/en-GB.js":()=>t(()=>import("./en-GB.59fe43a7.js"),[]),"../../node_modules/quasar/lang/en-US.js":()=>t(()=>import("./index.9b44893e.js").then(function(_){return _.aH}),["assets/index.9b44893e.js","assets/index.08a9c8a4.css"]),"../../node_modules/quasar/lang/eo.js":()=>t(()=>import("./eo.04c95678.js"),[]),"../../node_modules/quasar/lang/es.js":()=>t(()=>import("./es.a093fe18.js"),[]),"../../node_modules/quasar/lang/et.js":()=>t(()=>import("./et.349ba6bd.js"),[]),"../../node_modules/quasar/lang/eu.js":()=>t(()=>import("./eu.66aa450e.js"),[]),"../../node_modules/quasar/lang/fa-IR.js":()=>t(()=>import("./fa-IR.5f7b8014.js"),[]),"../../node_modules/quasar/lang/fa.js":()=>t(()=>import("./fa.a8dc6f01.js"),[]),"../../node_modules/quasar/lang/fi.js":()=>t(()=>import("./fi.ebe9572a.js"),[]),"../../node_modules/quasar/lang/fr.js":()=>t(()=>import("./fr.1190a5e6.js"),[]),"../../node_modules/quasar/lang/gn.js":()=>t(()=>import("./gn.c2d13bfd.js"),[]),"../../node_modules/quasar/lang/he.js":()=>t(()=>import("./he.6af6a74a.js"),[]),"../../node_modules/quasar/lang/hi.js":()=>t(()=>import("./hi.3431db8f.js"),[]),"../../node_modules/quasar/lang/hr.js":()=>t(()=>import("./hr.8fd833a8.js"),[]),"../../node_modules/quasar/lang/hu.js":()=>t(()=>import("./hu.6250fc13.js"),[]),"../../node_modules/quasar/lang/id.js":()=>t(()=>import("./id.74810423.js"),[]),"../../node_modules/quasar/lang/is.js":()=>t(()=>import("./is.eefa8e8a.js"),[]),"../../node_modules/quasar/lang/it.js":()=>t(()=>import("./it.68d72a55.js"),[]),"../../node_modules/quasar/lang/ja.js":()=>t(()=>import("./ja.2cffcd69.js"),[]),"../../node_modules/quasar/lang/kk.js":()=>t(()=>import("./kk.15d8927b.js"),[]),"../../node_modules/quasar/lang/km.js":()=>t(()=>import("./km.9d32d5b6.js"),[]),"../../node_modules/quasar/lang/ko-KR.js":()=>t(()=>import("./ko-KR.b4fdf5e9.js"),[]),"../../node_modules/quasar/lang/kur-CKB.js":()=>t(()=>import("./kur-CKB.8628416d.js"),[]),"../../node_modules/quasar/lang/lt.js":()=>t(()=>import("./lt.037429f4.js"),[]),"../../node_modules/quasar/lang/lu.js":()=>t(()=>import("./lu.9f7c1938.js"),[]),"../../node_modules/quasar/lang/lv.js":()=>t(()=>import("./lv.9770475b.js"),[]),"../../node_modules/quasar/lang/mk.js":()=>t(()=>import("./mk.3d3e4622.js"),[]),"../../node_modules/quasar/lang/ml.js":()=>t(()=>import("./ml.341c53f9.js"),[]),"../../node_modules/quasar/lang/mm.js":()=>t(()=>import("./mm.ffe53e92.js"),[]),"../../node_modules/quasar/lang/ms-MY.js":()=>t(()=>import("./ms-MY.a4e39dfe.js"),[]),"../../node_modules/quasar/lang/ms.js":()=>t(()=>import("./ms.e47ad4b7.js"),[]),"../../node_modules/quasar/lang/my.js":()=>t(()=>import("./my.ee549b1e.js"),[]),"../../node_modules/quasar/lang/nb-NO.js":()=>t(()=>import("./nb-NO.7a30eec0.js"),[]),"../../node_modules/quasar/lang/nl.js":()=>t(()=>import("./nl.5e330049.js"),[]),"../../node_modules/quasar/lang/pl.js":()=>t(()=>import("./pl.74c544b7.js"),[]),"../../node_modules/quasar/lang/pt-BR.js":()=>t(()=>import("./pt-BR.f0b34194.js"),[]),"../../node_modules/quasar/lang/pt.js":()=>t(()=>import("./pt.2e8592fa.js"),[]),"../../node_modules/quasar/lang/ro.js":()=>t(()=>import("./ro.6c24d432.js"),[]),"../../node_modules/quasar/lang/ru.js":()=>t(()=>import("./ru.87479442.js"),[]),"../../node_modules/quasar/lang/sk.js":()=>t(()=>import("./sk.89935d32.js"),[]),"../../node_modules/quasar/lang/sl.js":()=>t(()=>import("./sl.c195ee6a.js"),[]),"../../node_modules/quasar/lang/sm.js":()=>t(()=>import("./sm.8b4e2a81.js"),[]),"../../node_modules/quasar/lang/sr-CYR.js":()=>t(()=>import("./sr-CYR.9152c69a.js"),[]),"../../node_modules/quasar/lang/sr.js":()=>t(()=>import("./sr.a1c5fe37.js"),[]),"../../node_modules/quasar/lang/sv.js":()=>t(()=>import("./sv.9ed4965c.js"),[]),"../../node_modules/quasar/lang/ta.js":()=>t(()=>import("./ta.7ee00df3.js"),[]),"../../node_modules/quasar/lang/th.js":()=>t(()=>import("./th.1f9041e7.js"),[]),"../../node_modules/quasar/lang/tl.js":()=>t(()=>import("./tl.553e8773.js"),[]),"../../node_modules/quasar/lang/tr.js":()=>t(()=>import("./tr.bc0b2227.js"),[]),"../../node_modules/quasar/lang/ug.js":()=>t(()=>import("./ug.c72b3dd2.js"),[]),"../../node_modules/quasar/lang/uk.js":()=>t(()=>import("./uk.0bb97957.js"),[]),"../../node_modules/quasar/lang/uz-Cyrl.js":()=>t(()=>import("./uz-Cyrl.a0b2966e.js"),[]),"../../node_modules/quasar/lang/uz-Latn.js":()=>t(()=>import("./uz-Latn.44dd90de.js"),[]),"../../node_modules/quasar/lang/vi.js":()=>t(()=>import("./vi.fdcfe756.js"),[]),"../../node_modules/quasar/lang/zh-CN.js":()=>t(()=>import("./zh-CN.64b55862.js"),[]),"../../node_modules/quasar/lang/zh-TW.js":()=>t(()=>import("./zh-TW.7e5e0208.js"),[])};f(u,_=>{i.userSettings.language=_;try{d[`../../node_modules/quasar/lang/${_}.js`]().then(p=>{g.lang.set(p.default)})}catch(p){console.warn("Could not load language file to quasar",p)}});const E=[{to:"/",translationKey:"menu.home",icon:"home"},{to:"/immunization",translationKey:"menu.immunizations",icon:"syringe"},{to:"/rules",translationKey:"menu.rules",icon:"gears"},{to:"/create",translationKey:"menu.create",icon:"plus"},{to:"/about",translationKey:"menu.about",icon:"circle-info"}];return(_,p)=>{const h=Re("RouterLink");return K(),Z(_a,null,{default:D(()=>[j(ia,{class:"menu-header",header:""},{default:D(()=>[F(U(_.$t("menu.title")),1)]),_:1}),(K(),ra(ua,null,la(E,o=>j(ce,{key:o.translationKey,clickable:""},{default:D(()=>[j(_e,{class:"menu-icon",name:`fa-solid fa-${o.icon}`},null,8,["name"]),j(h,{class:"menu-link text-body2",to:o.to},{default:D(()=>[F(U(_.$t(o.translationKey)),1)]),_:2},1032,["to"])]),_:2},1024)),64)),M(i).showCreatePage?(K(),Z(ce,{key:0,clickable:""},{default:D(()=>[j(_e,{class:"menu-icon",name:"fa-solid fa-file-plus"}),j(h,{class:"menu-link text-body2",to:"/create"},{default:D(()=>[F(U(_.$t("menu.create")),1)]),_:1})]),_:1})):De("",!0),j(ce,{class:"fixed-bottom"},{default:D(()=>[j(_e,{class:"footer-menu-icon",name:"fas fa-language"}),da("div",qa,[j(ma,{modelValue:_.$i18n.locale,"onUpdate:modelValue":p[0]||(p[0]=o=>_.$i18n.locale=o),outlined:"",dense:"",class:"language-select",options:M(La).filter(o=>_.$i18n.availableLocales.includes(o.isoName)).map(o=>({label:o.nativeName,value:o.isoName})),"emit-value":"","map-options":"",label:M(c)("settings.languageTitle")},null,8,["modelValue","options","label"])])]),_:1})]),_:1})}}});var Ra=Oe(Ta,[["__scopeId","data-v-15f2cbfd"]]);const Da=qe({__name:"MainLayout",setup(e){const g=Te(),c=ca(),u=q(!1);function i(){u.value=!u.value}function d(){g.logout(),c.go(0)}return(E,_)=>{const p=Re("router-view");return K(),Z(ya,{view:"lHh Lpr lFf"},{default:D(()=>[j(Ea,null,{default:D(()=>[j(Na,null,{default:D(()=>[j(va,{flat:"",dense:"",round:"",icon:"fa-solid fa-bars",onClick:i}),j(ha,{class:"text-h6 text-weight-medium"},{default:D(()=>[F(U(E.$t("common.appName")),1)]),_:1}),M(g).userIsLogged?(K(),Z(fa,{key:0,id:"logout",class:"text-body2 text-weight-medium",color:"secondary","text-color":"onSecondary","icon-right":"fa-solid fa-right-from-bracket",clickable:"",onClick:d},{default:D(()=>[F(U(`${M(g).user.firstName} ${M(g).user.lastName}`),1)]),_:1})):De("",!0)]),_:1})]),_:1}),j(ba,{modelValue:u.value,"onUpdate:modelValue":_[0]||(_[0]=h=>u.value=h),"show-if-above":"",bordered:""},{default:D(()=>[j(Ra)]),_:1},8,["modelValue"]),j(ja,null,{default:D(()=>[j(p)]),_:1})]),_:1})}}});var ka=Oe(Da,[["__scopeId","data-v-791207e2"]]);export{ka as default};
