import{d as H,s as d,v as no,x as Q,y as m,z as lo,A as I,C as io,D as h,E as ao,F as so,V as Ee,G as re,H as W,I as ne,m as C,r as L,o as Me,J as pe,K as He,L as co,M as G,N as uo,O as vo,P as ho,Q as mo,R as fo,S as go,T as Oe,U as _,W as Le,X as Be,Y as J,Z as $e,_ as D,$ as ce,a0 as te,a1 as po,a2 as Z,a3 as we,a4 as be,a5 as bo,a6 as de,a7 as xo,a8 as Co,a9 as yo,aa as wo,b as U,p as q,e as z,ab as zo,u as ko,c as So,w as Y,g as K,a as Io,f as V,i as Ro,ac as Po,h as Ne,t as ue,B as Oo,ad as No,ae as To,n as Ao}from"./index-C5gMMpkt.js";import{C as _o,N as jo,a as Eo}from"./Dropdown-CdYYHI4W.js";import{f as ve,a as xe,b as Mo,u as Ho,N as Lo}from"./text-BSlB8Yp7.js";import{V as Bo,c as he}from"./create-3j_5D5bg.js";import{t as $o}from"./Tag-BrLA9Wfn.js";import{N as Te}from"./Icon-DEfanQQl.js";import"./Popover-BsXjhk8n.js";import"./get-D6hBXjBQ.js";import"./next-frame-once-C5Ksf8W7.js";const Fo=H({name:"ChevronDownFilled",render(){return d("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),Ko=no&&"loading"in document.createElement("img");function Vo(e={}){var t;const{root:o=null}=e;return{hash:`${e.rootMargin||"0px 0px 0px 0px"}-${Array.isArray(e.threshold)?e.threshold.join(","):(t=e.threshold)!==null&&t!==void 0?t:"0"}`,options:Object.assign(Object.assign({},e),{root:(typeof o=="string"?document.querySelector(o):o)||document.documentElement})}}const me=new WeakMap,fe=new WeakMap,ge=new WeakMap,Do=(e,t,o)=>{if(!e)return()=>{};const i=Vo(t),{root:s}=i.options;let n;const c=me.get(s);c?n=c:(n=new Map,me.set(s,n));let v,a;n.has(i.hash)?(a=n.get(i.hash),a[1].has(e)||(v=a[0],a[1].add(e),v.observe(e))):(v=new IntersectionObserver(T=>{T.forEach(u=>{if(u.isIntersecting){const k=fe.get(u.target),b=ge.get(u.target);k&&k(),b&&(b.value=!0)}})},i.options),v.observe(e),a=[v,new Set([e])],n.set(i.hash,a));let f=!1;const A=()=>{f||(fe.delete(e),ge.delete(e),f=!0,a[1].has(e)&&(a[0].unobserve(e),a[1].delete(e)),a[1].size<=0&&n.delete(i.hash),n.size||me.delete(s))};return fe.set(e,A),ge.set(e,o),A},Uo=Q("n-avatar-group"),Go=m("avatar",`
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[lo(I("&","--n-merged-color: var(--n-color-modal);")),io(I("&","--n-merged-color: var(--n-color-popover);")),I("img",`
 width: 100%;
 height: 100%;
 `),h("text",`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),m("icon",`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),h("text","line-height: 1.25")]),Wo=Object.assign(Object.assign({},W.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),qo=H({name:"Avatar",props:Wo,slots:Object,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=re(e),i=L(!1);let s=null;const n=L(null),c=L(null),v=()=>{const{value:g}=n;if(g&&(s===null||s!==g.innerHTML)){s=g.innerHTML;const{value:P}=c;if(P){const{offsetWidth:j,offsetHeight:N}=P,{offsetWidth:x,offsetHeight:S}=g,$=.9,F=Math.min(j/x*$,N/S*$,1);g.style.transform=`translateX(-50%) translateY(-50%) scale(${F})`}}},a=G(Uo,null),f=C(()=>{const{size:g}=e;if(g)return g;const{size:P}=a||{};return P||"medium"}),A=W("Avatar","-avatar",Go,uo,e,t),T=G($o,null),u=C(()=>{if(a)return!0;const{round:g,circle:P}=e;return g!==void 0||P!==void 0?g||P:T?T.roundRef.value:!1}),k=C(()=>a?!0:e.bordered||!1),b=C(()=>{const g=f.value,P=u.value,j=k.value,{color:N}=e,{self:{borderRadius:x,fontSize:S,color:$,border:F,colorModal:ee,colorPopover:B},common:{cubicBezierEaseInOut:ie}}=A.value;let oe;return typeof g=="number"?oe=`${g}px`:oe=A.value.self[vo("height",g)],{"--n-font-size":S,"--n-border":j?F:"none","--n-border-radius":P?"50%":x,"--n-color":N||$,"--n-color-modal":N||ee,"--n-color-popover":N||B,"--n-bezier":ie,"--n-merged-size":`var(--n-avatar-size-override, ${oe})`}}),y=o?ne("avatar",C(()=>{const g=f.value,P=u.value,j=k.value,{color:N}=e;let x="";return g&&(typeof g=="number"?x+=`a${g}`:x+=g[0]),P&&(x+="b"),j&&(x+="c"),N&&(x+=ho(N)),x}),b,e):void 0,O=L(!e.lazy);Me(()=>{if(e.lazy&&e.intersectionObserverOptions){let g;const P=pe(()=>{g?.(),g=void 0,e.lazy&&(g=Do(c.value,e.intersectionObserverOptions,O))});He(()=>{P(),g?.()})}}),co(()=>{var g;return e.src||((g=e.imgProps)===null||g===void 0?void 0:g.src)},()=>{i.value=!1});const E=L(!e.lazy);return{textRef:n,selfRef:c,mergedRoundRef:u,mergedClsPrefix:t,fitTextTransform:v,cssVars:o?void 0:b,themeClass:y?.themeClass,onRender:y?.onRender,hasLoadError:i,shouldStartLoading:O,loaded:E,mergedOnError:g=>{if(!O.value)return;i.value=!0;const{onError:P,imgProps:{onError:j}={}}=e;P?.(g),j?.(g)},mergedOnLoad:g=>{const{onLoad:P,imgProps:{onLoad:j}={}}=e;P?.(g),j?.(g),E.value=!0}}},render(){var e,t;const{$slots:o,src:i,mergedClsPrefix:s,lazy:n,onRender:c,loaded:v,hasLoadError:a,imgProps:f={}}=this;c?.();let A;const T=!v&&!a&&(this.renderPlaceholder?this.renderPlaceholder():(t=(e=this.$slots).placeholder)===null||t===void 0?void 0:t.call(e));return this.hasLoadError?A=this.renderFallback?this.renderFallback():ao(o.fallback,()=>[d("img",{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):A=so(o.default,u=>{if(u)return d(Ee,{onResize:this.fitTextTransform},{default:()=>d("span",{ref:"textRef",class:`${s}-avatar__text`},u)});if(i||f.src){const k=this.src||f.src;return d("img",Object.assign(Object.assign({},f),{loading:Ko&&!this.intersectionObserverOptions&&n?"lazy":"eager",src:n&&this.intersectionObserverOptions?this.shouldStartLoading?k:void 0:k,"data-image-src":k,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[f.style||"",{objectFit:this.objectFit},T?{height:"0",width:"0",visibility:"hidden",position:"absolute"}:""]}))}}),d("span",{ref:"selfRef",class:[`${s}-avatar`,this.themeClass],style:this.cssVars},A,n&&T)}});function Yo(e){const{baseColor:t,textColor2:o,bodyColor:i,cardColor:s,dividerColor:n,actionColor:c,scrollbarColor:v,scrollbarColorHover:a,invertedColor:f}=e;return{textColor:o,textColorInverted:"#FFF",color:i,colorEmbedded:c,headerColor:s,headerColorInverted:f,footerColor:c,footerColorInverted:f,headerBorderColor:n,headerBorderColorInverted:f,footerBorderColor:n,footerBorderColorInverted:f,siderBorderColor:n,siderBorderColorInverted:f,siderColor:s,siderColorInverted:f,siderToggleButtonBorder:`1px solid ${n}`,siderToggleButtonColor:t,siderToggleButtonIconColor:o,siderToggleButtonIconColorInverted:o,siderToggleBarColor:Oe(i,v),siderToggleBarColorHover:Oe(i,a),__invertScrollbar:"true"}}const ze=mo({name:"Layout",common:go,peers:{Scrollbar:fo},self:Yo}),Fe=Q("n-layout-sider"),ke={type:String,default:"static"},Xo=m("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[m("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),_("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),Zo={embedded:Boolean,position:ke,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},Ke=Q("n-layout");function Ve(e){return H({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},W.props),Zo),setup(t){const o=L(null),i=L(null),{mergedClsPrefixRef:s,inlineThemeDisabled:n}=re(t),c=W("Layout","-layout",Xo,ze,t,s);function v(y,O){if(t.nativeScrollbar){const{value:E}=o;E&&(O===void 0?E.scrollTo(y):E.scrollTo(y,O))}else{const{value:E}=i;E&&E.scrollTo(y,O)}}J(Ke,t);let a=0,f=0;const A=y=>{var O;const E=y.target;a=E.scrollLeft,f=E.scrollTop,(O=t.onScroll)===null||O===void 0||O.call(t,y)};Be(()=>{if(t.nativeScrollbar){const y=o.value;y&&(y.scrollTop=f,y.scrollLeft=a)}});const T={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},u={scrollTo:v},k=C(()=>{const{common:{cubicBezierEaseInOut:y},self:O}=c.value;return{"--n-bezier":y,"--n-color":t.embedded?O.colorEmbedded:O.color,"--n-text-color":O.textColor}}),b=n?ne("layout",C(()=>t.embedded?"e":""),k,t):void 0;return Object.assign({mergedClsPrefix:s,scrollableElRef:o,scrollbarInstRef:i,hasSiderStyle:T,mergedTheme:c,handleNativeElScroll:A,cssVars:n?void 0:k,themeClass:b?.themeClass,onRender:b?.onRender},u)},render(){var t;const{mergedClsPrefix:o,hasSider:i}=this;(t=this.onRender)===null||t===void 0||t.call(this);const s=i?this.hasSiderStyle:void 0,n=[this.themeClass,e&&`${o}-layout-content`,`${o}-layout`,`${o}-layout--${this.position}-positioned`];return d("div",{class:n,style:this.cssVars},this.nativeScrollbar?d("div",{ref:"scrollableElRef",class:[`${o}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,s],onScroll:this.handleNativeElScroll},this.$slots):d(Le,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,s]}),this.$slots))}})}const Ae=Ve(!1),Jo=Ve(!0),Qo=m("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[_("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),_("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),et={position:ke,inverted:Boolean,bordered:{type:Boolean,default:!1}},ot=H({name:"LayoutHeader",props:Object.assign(Object.assign({},W.props),et),setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=re(e),i=W("Layout","-layout-header",Qo,ze,e,t),s=C(()=>{const{common:{cubicBezierEaseInOut:c},self:v}=i.value,a={"--n-bezier":c};return e.inverted?(a["--n-color"]=v.headerColorInverted,a["--n-text-color"]=v.textColorInverted,a["--n-border-color"]=v.headerBorderColorInverted):(a["--n-color"]=v.headerColor,a["--n-text-color"]=v.textColor,a["--n-border-color"]=v.headerBorderColor),a}),n=o?ne("layout-header",C(()=>e.inverted?"a":"b"),s,e):void 0;return{mergedClsPrefix:t,cssVars:o?void 0:s,themeClass:n?.themeClass,onRender:n?.onRender}},render(){var e;const{mergedClsPrefix:t}=this;return(e=this.onRender)===null||e===void 0||e.call(this),d("div",{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),tt=m("layout-sider",`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[_("bordered",[h("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),h("left-placement",[_("bordered",[h("border",`
 right: 0;
 `)])]),_("right-placement",`
 justify-content: flex-start;
 `,[_("bordered",[h("border",`
 left: 0;
 `)]),_("collapsed",[m("layout-toggle-button",[m("base-icon",`
 transform: rotate(180deg);
 `)]),m("layout-toggle-bar",[I("&:hover",[h("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),m("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[m("base-icon",`
 transform: rotate(0);
 `)]),m("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[I("&:hover",[h("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),_("collapsed",[m("layout-toggle-bar",[I("&:hover",[h("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),m("layout-toggle-button",[m("base-icon",`
 transform: rotate(0);
 `)])]),m("layout-toggle-button",`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[m("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),m("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[h("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),h("bottom",`
 position: absolute;
 top: 34px;
 `),I("&:hover",[h("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),h("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),I("&:hover",[h("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),h("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),m("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),_("show-content",[m("layout-sider-scroll-container",{opacity:1})]),_("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),rt=H({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return d("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},d("div",{class:`${e}-layout-toggle-bar__top`}),d("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),nt=H({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return d("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},d($e,{clsPrefix:e},{default:()=>d(_o,null)}))}}),lt={position:ke,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},it=H({name:"LayoutSider",props:Object.assign(Object.assign({},W.props),lt),setup(e){const t=G(Ke),o=L(null),i=L(null),s=L(e.defaultCollapsed),n=xe(ce(e,"collapsed"),s),c=C(()=>ve(n.value?e.collapsedWidth:e.width)),v=C(()=>e.collapseMode!=="transform"?{}:{minWidth:ve(e.width)}),a=C(()=>t?t.siderPlacement:"left");function f(N,x){if(e.nativeScrollbar){const{value:S}=o;S&&(x===void 0?S.scrollTo(N):S.scrollTo(N,x))}else{const{value:S}=i;S&&S.scrollTo(N,x)}}function A(){const{"onUpdate:collapsed":N,onUpdateCollapsed:x,onExpand:S,onCollapse:$}=e,{value:F}=n;x&&D(x,!F),N&&D(N,!F),s.value=!F,F?S&&D(S):$&&D($)}let T=0,u=0;const k=N=>{var x;const S=N.target;T=S.scrollLeft,u=S.scrollTop,(x=e.onScroll)===null||x===void 0||x.call(e,N)};Be(()=>{if(e.nativeScrollbar){const N=o.value;N&&(N.scrollTop=u,N.scrollLeft=T)}}),J(Fe,{collapsedRef:n,collapseModeRef:ce(e,"collapseMode")});const{mergedClsPrefixRef:b,inlineThemeDisabled:y}=re(e),O=W("Layout","-layout-sider",tt,ze,e,b);function E(N){var x,S;N.propertyName==="max-width"&&(n.value?(x=e.onAfterLeave)===null||x===void 0||x.call(e):(S=e.onAfterEnter)===null||S===void 0||S.call(e))}const g={scrollTo:f},P=C(()=>{const{common:{cubicBezierEaseInOut:N},self:x}=O.value,{siderToggleButtonColor:S,siderToggleButtonBorder:$,siderToggleBarColor:F,siderToggleBarColorHover:ee}=x,B={"--n-bezier":N,"--n-toggle-button-color":S,"--n-toggle-button-border":$,"--n-toggle-bar-color":F,"--n-toggle-bar-color-hover":ee};return e.inverted?(B["--n-color"]=x.siderColorInverted,B["--n-text-color"]=x.textColorInverted,B["--n-border-color"]=x.siderBorderColorInverted,B["--n-toggle-button-icon-color"]=x.siderToggleButtonIconColorInverted,B.__invertScrollbar=x.__invertScrollbar):(B["--n-color"]=x.siderColor,B["--n-text-color"]=x.textColor,B["--n-border-color"]=x.siderBorderColor,B["--n-toggle-button-icon-color"]=x.siderToggleButtonIconColor),B}),j=y?ne("layout-sider",C(()=>e.inverted?"a":"b"),P,e):void 0;return Object.assign({scrollableElRef:o,scrollbarInstRef:i,mergedClsPrefix:b,mergedTheme:O,styleMaxWidth:c,mergedCollapsed:n,scrollContainerStyle:v,siderPlacement:a,handleNativeElScroll:k,handleTransitionend:E,handleTriggerClick:A,inlineThemeDisabled:y,cssVars:P,themeClass:j?.themeClass,onRender:j?.onRender},g)},render(){var e;const{mergedClsPrefix:t,mergedCollapsed:o,showTrigger:i}=this;return(e=this.onRender)===null||e===void 0||e.call(this),d("aside",{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,o&&`${t}-layout-sider--collapsed`,(!o||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:ve(this.width)}]},this.nativeScrollbar?d("div",{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):d(Le,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),i?i==="bar"?d(rt,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):d(nt,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?d("div",{class:`${t}-layout-sider__border`}):null)}}),le=Q("n-menu"),De=Q("n-submenu"),Se=Q("n-menu-item-group"),_e=[I("&::before","background-color: var(--n-item-color-hover);"),h("arrow",`
 color: var(--n-arrow-color-hover);
 `),h("icon",`
 color: var(--n-item-icon-color-hover);
 `),m("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[I("a",`
 color: var(--n-item-text-color-hover);
 `),h("extra",`
 color: var(--n-item-text-color-hover);
 `)])],je=[h("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),m("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[I("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),h("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],at=I([m("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[_("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[m("submenu","margin: 0;"),m("menu-item","margin: 0;"),m("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[I("&::before","display: none;"),_("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),m("menu-item-content",[_("selected",[h("icon","color: var(--n-item-icon-color-active-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[I("a","color: var(--n-item-text-color-active-horizontal);"),h("extra","color: var(--n-item-text-color-active-horizontal);")])]),_("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[I("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),h("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),h("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),te("disabled",[te("selected, child-active",[I("&:focus-within",je)]),_("selected",[X(null,[h("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[I("a","color: var(--n-item-text-color-active-hover-horizontal);"),h("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),_("child-active",[X(null,[h("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[I("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),h("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),X("border-bottom: 2px solid var(--n-border-color-horizontal);",je)]),m("menu-item-content-header",[I("a","color: var(--n-item-text-color-horizontal);")])])]),te("responsive",[m("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),_("collapsed",[m("menu-item-content",[_("selected",[I("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),m("menu-item-content-header","opacity: 0;"),h("arrow","opacity: 0;"),h("icon","color: var(--n-item-icon-color-collapsed);")])]),m("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),m("menu-item-content",`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[I("> *","z-index: 1;"),I("&::before",`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),_("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),_("collapsed",[h("arrow","transform: rotate(0);")]),_("selected",[I("&::before","background-color: var(--n-item-color-active);"),h("arrow","color: var(--n-arrow-color-active);"),h("icon","color: var(--n-item-icon-color-active);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[I("a","color: var(--n-item-text-color-active);"),h("extra","color: var(--n-item-text-color-active);")])]),_("child-active",[m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[I("a",`
 color: var(--n-item-text-color-child-active);
 `),h("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),h("arrow",`
 color: var(--n-arrow-color-child-active);
 `),h("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),te("disabled",[te("selected, child-active",[I("&:focus-within",_e)]),_("selected",[X(null,[h("arrow","color: var(--n-arrow-color-active-hover);"),h("icon","color: var(--n-item-icon-color-active-hover);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[I("a","color: var(--n-item-text-color-active-hover);"),h("extra","color: var(--n-item-text-color-active-hover);")])])]),_("child-active",[X(null,[h("arrow","color: var(--n-arrow-color-child-active-hover);"),h("icon","color: var(--n-item-icon-color-child-active-hover);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[I("a","color: var(--n-item-text-color-child-active-hover);"),h("extra","color: var(--n-item-text-color-child-active-hover);")])])]),_("selected",[X(null,[I("&::before","background-color: var(--n-item-color-active-hover);")])]),X(null,_e)]),h("icon",`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),h("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),m("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[I("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[I("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),h("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),m("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[m("menu-item-content",`
 height: var(--n-item-height);
 `),m("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[po({duration:".2s"})])]),m("menu-item-group",[m("menu-item-group-title",`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),m("menu-tooltip",[I("a",`
 color: inherit;
 text-decoration: none;
 `)]),m("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function X(e,t){return[_("hover",e,t),I("&:hover",e,t)]}const Ue=H({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:t}=G(le);return{menuProps:t,style:C(()=>{const{paddingLeft:o}=e;return{paddingLeft:o&&`${o}px`}}),iconStyle:C(()=>{const{maxIconSize:o,activeIconSize:i,iconMarginRight:s}=e;return{width:`${o}px`,height:`${o}px`,fontSize:`${i}px`,marginRight:`${s}px`}})}},render(){const{clsPrefix:e,tmNode:t,menuProps:{renderIcon:o,renderLabel:i,renderExtra:s,expandIcon:n}}=this,c=o?o(t.rawNode):Z(this.icon);return d("div",{onClick:v=>{var a;(a=this.onClick)===null||a===void 0||a.call(this,v)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},c&&d("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[c]),d("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:i?i(t.rawNode):Z(this.title),this.extra||s?d("span",{class:`${e}-menu-item-content-header__extra`}," ",s?s(t.rawNode):Z(this.extra)):null),this.showArrow?d($e,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>n?n(t.rawNode):d(Fo,null)}):null)}}),se=8;function Ie(e){const t=G(le),{props:o,mergedCollapsedRef:i}=t,s=G(De,null),n=G(Se,null),c=C(()=>o.mode==="horizontal"),v=C(()=>c.value?o.dropdownPlacement:"tmNodes"in e?"right-start":"right"),a=C(()=>{var u;return Math.max((u=o.collapsedIconSize)!==null&&u!==void 0?u:o.iconSize,o.iconSize)}),f=C(()=>{var u;return!c.value&&e.root&&i.value&&(u=o.collapsedIconSize)!==null&&u!==void 0?u:o.iconSize}),A=C(()=>{if(c.value)return;const{collapsedWidth:u,indent:k,rootIndent:b}=o,{root:y,isGroup:O}=e,E=b===void 0?k:b;return y?i.value?u/2-a.value/2:E:n&&typeof n.paddingLeftRef.value=="number"?k/2+n.paddingLeftRef.value:s&&typeof s.paddingLeftRef.value=="number"?(O?k/2:k)+s.paddingLeftRef.value:0}),T=C(()=>{const{collapsedWidth:u,indent:k,rootIndent:b}=o,{value:y}=a,{root:O}=e;return c.value||!O||!i.value?se:(b===void 0?k:b)+y+se-(u+y)/2});return{dropdownPlacement:v,activeIconSize:f,maxIconSize:a,paddingLeft:A,iconMarginRight:T,NMenu:t,NSubmenu:s,NMenuOptionGroup:n}}const Re={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},st=H({name:"MenuDivider",setup(){const e=G(le),{mergedClsPrefixRef:t,isHorizontalRef:o}=e;return()=>o.value?null:d("div",{class:`${t.value}-menu-divider`})}}),Ge=Object.assign(Object.assign({},Re),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),ct=we(Ge),dt=H({name:"MenuOption",props:Ge,setup(e){const t=Ie(e),{NSubmenu:o,NMenu:i,NMenuOptionGroup:s}=t,{props:n,mergedClsPrefixRef:c,mergedCollapsedRef:v}=i,a=o?o.mergedDisabledRef:s?s.mergedDisabledRef:{value:!1},f=C(()=>a.value||e.disabled);function A(u){const{onClick:k}=e;k&&k(u)}function T(u){f.value||(i.doSelect(e.internalKey,e.tmNode.rawNode),A(u))}return{mergedClsPrefix:c,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:i.mergedThemeRef,menuProps:n,dropdownEnabled:be(()=>e.root&&v.value&&n.mode!=="horizontal"&&!f.value),selected:be(()=>i.mergedValueRef.value===e.internalKey),mergedDisabled:f,handleClick:T}},render(){const{mergedClsPrefix:e,mergedTheme:t,tmNode:o,menuProps:{renderLabel:i,nodeProps:s}}=this,n=s?.(o.rawNode);return d("div",Object.assign({},n,{role:"menuitem",class:[`${e}-menu-item`,n?.class]}),d(jo,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>i?i(o.rawNode):Z(this.title),trigger:()=>d(Ue,{tmNode:o,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),We=Object.assign(Object.assign({},Re),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),ut=we(We),vt=H({name:"MenuOptionGroup",props:We,setup(e){const t=Ie(e),{NSubmenu:o}=t,i=C(()=>o?.mergedDisabledRef.value?!0:e.tmNode.disabled);J(Se,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:i});const{mergedClsPrefixRef:s,props:n}=G(le);return function(){const{value:c}=s,v=t.paddingLeft.value,{nodeProps:a}=n,f=a?.(e.tmNode.rawNode);return d("div",{class:`${c}-menu-item-group`,role:"group"},d("div",Object.assign({},f,{class:[`${c}-menu-item-group-title`,f?.class],style:[f?.style||"",v!==void 0?`padding-left: ${v}px;`:""]}),Z(e.title),e.extra?d(bo,null," ",Z(e.extra)):null),d("div",null,e.tmNodes.map(A=>Pe(A,n))))}}});function Ce(e){return e.type==="divider"||e.type==="render"}function ht(e){return e.type==="divider"}function Pe(e,t){const{rawNode:o}=e,{show:i}=o;if(i===!1)return null;if(Ce(o))return ht(o)?d(st,Object.assign({key:e.key},o.props)):null;const{labelField:s}=t,{key:n,level:c,isGroup:v}=e,a=Object.assign(Object.assign({},o),{title:o.title||o[s],extra:o.titleExtra||o.extra,key:n,internalKey:n,level:c,root:c===0,isGroup:v});return e.children?e.isGroup?d(vt,de(a,ut,{tmNode:e,tmNodes:e.children,key:n})):d(ye,de(a,mt,{key:n,rawNodes:o[t.childrenField],tmNodes:e.children,tmNode:e})):d(dt,de(a,ct,{key:n,tmNode:e}))}const qe=Object.assign(Object.assign({},Re),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),mt=we(qe),ye=H({name:"Submenu",props:qe,setup(e){const t=Ie(e),{NMenu:o,NSubmenu:i}=t,{props:s,mergedCollapsedRef:n,mergedThemeRef:c}=o,v=C(()=>{const{disabled:u}=e;return i?.mergedDisabledRef.value||s.disabled?!0:u}),a=L(!1);J(De,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:v}),J(Se,null);function f(){const{onClick:u}=e;u&&u()}function A(){v.value||(n.value||o.toggleExpand(e.internalKey),f())}function T(u){a.value=u}return{menuProps:s,mergedTheme:c,doSelect:o.doSelect,inverted:o.invertedRef,isHorizontal:o.isHorizontalRef,mergedClsPrefix:o.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:a,paddingLeft:t.paddingLeft,mergedDisabled:v,mergedValue:o.mergedValueRef,childActive:be(()=>{var u;return(u=e.virtualChildActive)!==null&&u!==void 0?u:o.activePathRef.value.includes(e.internalKey)}),collapsed:C(()=>s.mode==="horizontal"?!1:n.value?!0:!o.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:C(()=>!v.value&&(s.mode==="horizontal"||n.value)),handlePopoverShowChange:T,handleClick:A}},render(){var e;const{mergedClsPrefix:t,menuProps:{renderIcon:o,renderLabel:i}}=this,s=()=>{const{isHorizontal:c,paddingLeft:v,collapsed:a,mergedDisabled:f,maxIconSize:A,activeIconSize:T,title:u,childActive:k,icon:b,handleClick:y,menuProps:{nodeProps:O},dropdownShow:E,iconMarginRight:g,tmNode:P,mergedClsPrefix:j,isEllipsisPlaceholder:N,extra:x}=this,S=O?.(P.rawNode);return d("div",Object.assign({},S,{class:[`${j}-menu-item`,S?.class],role:"menuitem"}),d(Ue,{tmNode:P,paddingLeft:v,collapsed:a,disabled:f,iconMarginRight:g,maxIconSize:A,activeIconSize:T,title:u,extra:x,showArrow:!c,childActive:k,clsPrefix:j,icon:b,hover:E,onClick:y,isEllipsisPlaceholder:N}))},n=()=>d(xo,null,{default:()=>{const{tmNodes:c,collapsed:v}=this;return v?null:d("div",{class:`${t}-submenu-children`,role:"menu"},c.map(a=>Pe(a,this.menuProps)))}});return this.root?d(Eo,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:o,renderLabel:i}),{default:()=>d("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},s(),this.isHorizontal?null:n())}):d("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},s(),n())}}),ft=Object.assign(Object.assign({},W.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),gt=H({name:"Menu",inheritAttrs:!1,props:ft,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=re(e),i=W("Menu","-menu",at,wo,e,t),s=G(Fe,null),n=C(()=>{var p;const{collapsed:R}=e;if(R!==void 0)return R;if(s){const{collapseModeRef:r,collapsedRef:w}=s;if(r.value==="width")return(p=w.value)!==null&&p!==void 0?p:!1}return!1}),c=C(()=>{const{keyField:p,childrenField:R,disabledField:r}=e;return he(e.items||e.options,{getIgnored(w){return Ce(w)},getChildren(w){return w[R]},getDisabled(w){return w[r]},getKey(w){var M;return(M=w[p])!==null&&M!==void 0?M:w.name}})}),v=C(()=>new Set(c.value.treeNodes.map(p=>p.key))),{watchProps:a}=e,f=L(null);a?.includes("defaultValue")?pe(()=>{f.value=e.defaultValue}):f.value=e.defaultValue;const A=ce(e,"value"),T=xe(A,f),u=L([]),k=()=>{u.value=e.defaultExpandAll?c.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||c.value.getPath(T.value,{includeSelf:!1}).keyPath};a?.includes("defaultExpandedKeys")?pe(k):k();const b=Mo(e,["expandedNames","expandedKeys"]),y=xe(b,u),O=C(()=>c.value.treeNodes),E=C(()=>c.value.getPath(T.value).keyPath);J(le,{props:e,mergedCollapsedRef:n,mergedThemeRef:i,mergedValueRef:T,mergedExpandedKeysRef:y,activePathRef:E,mergedClsPrefixRef:t,isHorizontalRef:C(()=>e.mode==="horizontal"),invertedRef:ce(e,"inverted"),doSelect:g,toggleExpand:j});function g(p,R){const{"onUpdate:value":r,onUpdateValue:w,onSelect:M}=e;w&&D(w,p,R),r&&D(r,p,R),M&&D(M,p,R),f.value=p}function P(p){const{"onUpdate:expandedKeys":R,onUpdateExpandedKeys:r,onExpandedNamesChange:w,onOpenNamesChange:M}=e;R&&D(R,p),r&&D(r,p),w&&D(w,p),M&&D(M,p),u.value=p}function j(p){const R=Array.from(y.value),r=R.findIndex(w=>w===p);if(~r)R.splice(r,1);else{if(e.accordion&&v.value.has(p)){const w=R.findIndex(M=>v.value.has(M));w>-1&&R.splice(w,1)}R.push(p)}P(R)}const N=p=>{const R=c.value.getPath(p??T.value,{includeSelf:!1}).keyPath;if(!R.length)return;const r=Array.from(y.value),w=new Set([...r,...R]);e.accordion&&v.value.forEach(M=>{w.has(M)&&!R.includes(M)&&w.delete(M)}),P(Array.from(w))},x=C(()=>{const{inverted:p}=e,{common:{cubicBezierEaseInOut:R},self:r}=i.value,{borderRadius:w,borderColorHorizontal:M,fontSize:oo,itemHeight:to,dividerColor:ro}=r,l={"--n-divider-color":ro,"--n-bezier":R,"--n-font-size":oo,"--n-border-color-horizontal":M,"--n-border-radius":w,"--n-item-height":to};return p?(l["--n-group-text-color"]=r.groupTextColorInverted,l["--n-color"]=r.colorInverted,l["--n-item-text-color"]=r.itemTextColorInverted,l["--n-item-text-color-hover"]=r.itemTextColorHoverInverted,l["--n-item-text-color-active"]=r.itemTextColorActiveInverted,l["--n-item-text-color-child-active"]=r.itemTextColorChildActiveInverted,l["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveInverted,l["--n-item-text-color-active-hover"]=r.itemTextColorActiveHoverInverted,l["--n-item-icon-color"]=r.itemIconColorInverted,l["--n-item-icon-color-hover"]=r.itemIconColorHoverInverted,l["--n-item-icon-color-active"]=r.itemIconColorActiveInverted,l["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHoverInverted,l["--n-item-icon-color-child-active"]=r.itemIconColorChildActiveInverted,l["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHoverInverted,l["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsedInverted,l["--n-item-text-color-horizontal"]=r.itemTextColorHorizontalInverted,l["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontalInverted,l["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontalInverted,l["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontalInverted,l["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontalInverted,l["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontalInverted,l["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontalInverted,l["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontalInverted,l["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontalInverted,l["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontalInverted,l["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontalInverted,l["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontalInverted,l["--n-arrow-color"]=r.arrowColorInverted,l["--n-arrow-color-hover"]=r.arrowColorHoverInverted,l["--n-arrow-color-active"]=r.arrowColorActiveInverted,l["--n-arrow-color-active-hover"]=r.arrowColorActiveHoverInverted,l["--n-arrow-color-child-active"]=r.arrowColorChildActiveInverted,l["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHoverInverted,l["--n-item-color-hover"]=r.itemColorHoverInverted,l["--n-item-color-active"]=r.itemColorActiveInverted,l["--n-item-color-active-hover"]=r.itemColorActiveHoverInverted,l["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsedInverted):(l["--n-group-text-color"]=r.groupTextColor,l["--n-color"]=r.color,l["--n-item-text-color"]=r.itemTextColor,l["--n-item-text-color-hover"]=r.itemTextColorHover,l["--n-item-text-color-active"]=r.itemTextColorActive,l["--n-item-text-color-child-active"]=r.itemTextColorChildActive,l["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveHover,l["--n-item-text-color-active-hover"]=r.itemTextColorActiveHover,l["--n-item-icon-color"]=r.itemIconColor,l["--n-item-icon-color-hover"]=r.itemIconColorHover,l["--n-item-icon-color-active"]=r.itemIconColorActive,l["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHover,l["--n-item-icon-color-child-active"]=r.itemIconColorChildActive,l["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHover,l["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsed,l["--n-item-text-color-horizontal"]=r.itemTextColorHorizontal,l["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontal,l["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontal,l["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontal,l["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontal,l["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontal,l["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontal,l["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontal,l["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontal,l["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontal,l["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontal,l["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontal,l["--n-arrow-color"]=r.arrowColor,l["--n-arrow-color-hover"]=r.arrowColorHover,l["--n-arrow-color-active"]=r.arrowColorActive,l["--n-arrow-color-active-hover"]=r.arrowColorActiveHover,l["--n-arrow-color-child-active"]=r.arrowColorChildActive,l["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHover,l["--n-item-color-hover"]=r.itemColorHover,l["--n-item-color-active"]=r.itemColorActive,l["--n-item-color-active-hover"]=r.itemColorActiveHover,l["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsed),l}),S=o?ne("menu",C(()=>e.inverted?"a":"b"),x,e):void 0,$=Co(),F=L(null),ee=L(null);let B=!0;const ie=()=>{var p;B?B=!1:(p=F.value)===null||p===void 0||p.sync({showAllItemsBeforeCalculate:!0})};function oe(){return document.getElementById($)}const ae=L(-1);function Ye(p){ae.value=e.options.length-p}function Xe(p){p||(ae.value=-1)}const Ze=C(()=>{const p=ae.value;return{children:p===-1?[]:e.options.slice(p)}}),Je=C(()=>{const{childrenField:p,disabledField:R,keyField:r}=e;return he([Ze.value],{getIgnored(w){return Ce(w)},getChildren(w){return w[p]},getDisabled(w){return w[R]},getKey(w){var M;return(M=w[r])!==null&&M!==void 0?M:w.name}})}),Qe=C(()=>he([{}]).treeNodes[0]);function eo(){var p;if(ae.value===-1)return d(ye,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:Qe.value,domId:$,isEllipsisPlaceholder:!0});const R=Je.value.treeNodes[0],r=E.value,w=!!(!((p=R.children)===null||p===void 0)&&p.some(M=>r.includes(M.key)));return d(ye,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:w,tmNode:R,domId:$,rawNodes:R.rawNode.children||[],tmNodes:R.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:t,controlledExpandedKeys:b,uncontrolledExpanededKeys:u,mergedExpandedKeys:y,uncontrolledValue:f,mergedValue:T,activePath:E,tmNodes:O,mergedTheme:i,mergedCollapsed:n,cssVars:o?void 0:x,themeClass:S?.themeClass,overflowRef:F,counterRef:ee,updateCounter:()=>{},onResize:ie,onUpdateOverflow:Xe,onUpdateCount:Ye,renderCounter:eo,getCounter:oe,onRender:S?.onRender,showOption:N,deriveResponsiveState:ie}},render(){const{mergedClsPrefix:e,mode:t,themeClass:o,onRender:i}=this;i?.();const s=()=>this.tmNodes.map(a=>Pe(a,this.$props)),c=t==="horizontal"&&this.responsive,v=()=>d("div",yo(this.$attrs,{role:t==="horizontal"?"menubar":"menu",class:[`${e}-menu`,o,`${e}-menu--${t}`,c&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),c?d(Bo,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:s,counter:this.renderCounter}):s());return c?d(Ee,{onResize:this.onResize},{default:v}):v()}}),pt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},bt=H({name:"ArchiveOutline",render:function(t,o){return U(),q("svg",pt,o[0]||(o[0]=[z("path",{d:"M80 152v256a40.12 40.12 0 0 0 40 40h272a40.12 40.12 0 0 0 40-40V152",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("rect",{x:"48",y:"64",width:"416",height:"80",rx:"28",ry:"28",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M320 304l-64 64l-64-64"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 345.89V224"},null,-1)]))}}),xt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Ct=H({name:"CodeSlashOutline",render:function(t,o){return U(),q("svg",xt,o[0]||(o[0]=[z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M160 368L32 256l128-112"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M352 368l128-112l-128-112"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M304 96l-96 320"},null,-1)]))}}),yt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},wt=H({name:"CubeOutline",render:function(t,o){return U(),q("svg",yt,o[0]||(o[0]=[z("path",{d:"M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M69 153.99l187 110l187-110"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 463.99v-200"},null,-1)]))}}),zt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},kt=H({name:"DocumentTextOutline",render:function(t,o){return U(),q("svg",zt,o[0]||(o[0]=[z("path",{d:"M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("path",{d:"M256 56v120a32 32 0 0 0 32 32h120",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 288h160"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 368h160"},null,-1)]))}}),St={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},It=H({name:"GitNetworkOutline",render:function(t,o){return U(),q("svg",St,o[0]||(o[0]=[zo('<circle cx="128" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="256" cy="416" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 256v112"></path><circle cx="384" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path d="M128 144c0 74.67 68.92 112 128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path d="M384 144c0 74.67-68.92 112-128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>',6)]))}}),Rt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Pt=H({name:"GridOutline",render:function(t,o){return U(),q("svg",Rt,o[0]||(o[0]=[z("rect",{x:"48",y:"48",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("rect",{x:"288",y:"48",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("rect",{x:"48",y:"288",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("rect",{x:"288",y:"288",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1)]))}}),Ot={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Nt=H({name:"LogOutOutline",render:function(t,o){return U(),q("svg",Ot,o[0]||(o[0]=[z("path",{d:"M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M368 336l80-80l-80-80"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 256h256"},null,-1)]))}}),Tt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},At=H({name:"ReaderOutline",render:function(t,o){return U(),q("svg",Tt,o[0]||(o[0]=[z("rect",{x:"96",y:"48",width:"320",height:"416",rx:"48",ry:"48",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 128h160"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 208h160"},null,-1),z("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 288h80"},null,-1)]))}}),_t={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},jt=H({name:"SettingsOutline",render:function(t,o){return U(),q("svg",_t,o[0]||(o[0]=[z("path",{d:"M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1)]))}}),Et={key:0,class:"brand-copy"},Mt={class:"account"},Ht={class:"account-copy"},Wt=H({__name:"AppLayout",setup(e){const t=Ao(),o=Io(),i=ko(),s=Ho(),n=L(window.innerWidth<900);function c(k,b,y){return{label:()=>d(To,{to:{name:b}},{default:()=>k}),key:b,icon:()=>d(Te,null,{default:()=>d(y)})}}const v=[c("运行概览","dashboard",Pt),c("代理编排","orchestration",It),c("配置管理","config",kt),c("配置能力","schema",Ct),c("dae 版本","versions",wt),c("运行日志","logs",At),c("配置备份","backups",bt),c("安全设置","settings",jt)],a=C(()=>String(t.name||"dashboard")),f=C(()=>String(t.meta.title||"kdae-panel"));async function A(){try{await i.logout(),await o.replace({name:"login"})}catch(k){s.error(k instanceof Error?k.message:"退出登录失败")}}function T(){i.clearSession(),o.replace({name:"login"}),s.warning("登录会话已过期，请重新登录")}function u(){window.innerWidth<900&&(n.value=!0)}return Me(()=>{window.addEventListener("kdae-panel:auth-expired",T),window.addEventListener("resize",u)}),He(()=>{window.removeEventListener("kdae-panel:auth-expired",T),window.removeEventListener("resize",u)}),(k,b)=>{const y=No("RouterView");return U(),So(K(Ae),{"has-sider":"",class:"app-shell"},{default:Y(()=>[V(K(it),{bordered:"","collapse-mode":"width","collapsed-width":64,width:236,collapsed:n.value,"show-trigger":"bar",onCollapse:b[0]||(b[0]=O=>n.value=!0),onExpand:b[1]||(b[1]=O=>n.value=!1)},{default:Y(()=>[z("div",{class:Po(["brand",{compact:n.value}])},[b[3]||(b[3]=z("div",{class:"brand-mark"},"K",-1)),n.value?Ro("",!0):(U(),q("div",Et,[...b[2]||(b[2]=[z("strong",null,"kdae-panel",-1),z("span",null,"零侵入管理面板",-1)])]))],2),V(K(gt),{value:a.value,collapsed:n.value,"collapsed-width":64,"collapsed-icon-size":22,options:v},null,8,["value","collapsed"])]),_:1},8,["collapsed"]),V(K(Ae),null,{default:Y(()=>[V(K(ot),{bordered:"",class:"app-header"},{default:Y(()=>[z("div",null,[V(K(Lo),{depth:"3",class:"eyebrow"},{default:Y(()=>[...b[4]||(b[4]=[Ne("KDAE CONTROL PLANE",-1)])]),_:1}),z("h1",null,ue(f.value),1)]),z("div",Mt,[V(K(qo),{round:"",size:"small"},{default:Y(()=>[Ne(ue(K(i).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),z("div",Ht,[z("strong",null,ue(K(i).user?.username),1),b[5]||(b[5]=z("span",null,"管理员",-1))]),V(K(Oo),{quaternary:"",circle:"",title:"退出登录",onClick:A},{icon:Y(()=>[V(K(Te),null,{default:Y(()=>[V(K(Nt))]),_:1})]),_:1})])]),_:1}),V(K(Jo),{class:"app-content","content-style":"padding: 28px;"},{default:Y(()=>[V(y)]),_:1})]),_:1})]),_:1})}}});export{Wt as default};
