import{d as H,s as c,v as io,x as Q,y as f,z as ao,A as P,C as so,D as h,E as co,F as uo,V as He,G as ne,H as q,I as le,m as C,r as L,o as Le,J as be,K as Be,L as vo,M as W,N as ho,O as mo,P as fo,Q as go,R as po,S as bo,T as Ne,U as E,W as $e,X as Fe,Y as Z,Z as Ke,_ as U,$ as ue,a0 as te,a1 as xo,a2 as J,a3 as ze,a4 as xe,a5 as Co,a6 as ve,a7 as yo,a8 as wo,a9 as zo,aa as ko,b as V,p as Y,e as w,ab as So,u as Io,c as Ae,w as G,g as $,ac as Ro,a as Po,f as D,i as Te,ad as Oo,h as de,t as re,B as No,ae as Ao,af as To,n as jo}from"./index-C_GhywbR.js";import{C as Eo,N as Mo,a as _o}from"./Dropdown-rf0FbNqJ.js";import{f as he,a as Ce,b as Ho,u as Lo,N as Bo}from"./text-CrEFb7TY.js";import{V as $o,c as me}from"./create-CydtdPFv.js";import{t as Fo}from"./Tag-Bun0E_RS.js";import{N as je}from"./Icon-Cm3IqzFk.js";import{N as Ko}from"./Alert-BboOp0Ta.js";import"./Popover-gCvbIrAc.js";import"./get-NhBtRl0D.js";import"./next-frame-once-C5Ksf8W7.js";const Vo=H({name:"ChevronDownFilled",render(){return c("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},c("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),Do=io&&"loading"in document.createElement("img");function Uo(e={}){var t;const{root:o=null}=e;return{hash:`${e.rootMargin||"0px 0px 0px 0px"}-${Array.isArray(e.threshold)?e.threshold.join(","):(t=e.threshold)!==null&&t!==void 0?t:"0"}`,options:Object.assign(Object.assign({},e),{root:(typeof o=="string"?document.querySelector(o):o)||document.documentElement})}}const fe=new WeakMap,ge=new WeakMap,pe=new WeakMap,Go=(e,t,o)=>{if(!e)return()=>{};const i=Uo(t),{root:s}=i.options;let n;const d=fe.get(s);d?n=d:(n=new Map,fe.set(s,n));let v,a;n.has(i.hash)?(a=n.get(i.hash),a[1].has(e)||(v=a[0],a[1].add(e),v.observe(e))):(v=new IntersectionObserver(A=>{A.forEach(u=>{if(u.isIntersecting){const k=ge.get(u.target),T=pe.get(u.target);k&&k(),T&&(T.value=!0)}})},i.options),v.observe(e),a=[v,new Set([e])],n.set(i.hash,a));let g=!1;const j=()=>{g||(ge.delete(e),pe.delete(e),g=!0,a[1].has(e)&&(a[0].unobserve(e),a[1].delete(e)),a[1].size<=0&&n.delete(i.hash),n.size||fe.delete(s))};return ge.set(e,j),pe.set(e,o),j},Wo=Q("n-avatar-group"),qo=f("avatar",`
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
`,[ao(P("&","--n-merged-color: var(--n-color-modal);")),so(P("&","--n-merged-color: var(--n-color-popover);")),P("img",`
 width: 100%;
 height: 100%;
 `),h("text",`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),f("icon",`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),h("text","line-height: 1.25")]),Yo=Object.assign(Object.assign({},q.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),Xo=H({name:"Avatar",props:Yo,slots:Object,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=ne(e),i=L(!1);let s=null;const n=L(null),d=L(null),v=()=>{const{value:m}=n;if(m&&(s===null||s!==m.innerHTML)){s=m.innerHTML;const{value:I}=d;if(I){const{offsetWidth:M,offsetHeight:N}=I,{offsetWidth:x,offsetHeight:R}=m,F=.9,K=Math.min(M/x*F,N/R*F,1);m.style.transform=`translateX(-50%) translateY(-50%) scale(${K})`}}},a=W(Wo,null),g=C(()=>{const{size:m}=e;if(m)return m;const{size:I}=a||{};return I||"medium"}),j=q("Avatar","-avatar",qo,ho,e,t),A=W(Fo,null),u=C(()=>{if(a)return!0;const{round:m,circle:I}=e;return m!==void 0||I!==void 0?m||I:A?A.roundRef.value:!1}),k=C(()=>a?!0:e.bordered||!1),T=C(()=>{const m=g.value,I=u.value,M=k.value,{color:N}=e,{self:{borderRadius:x,fontSize:R,color:F,border:K,colorModal:ee,colorPopover:B},common:{cubicBezierEaseInOut:ae}}=j.value;let oe;return typeof m=="number"?oe=`${m}px`:oe=j.value.self[mo("height",m)],{"--n-font-size":R,"--n-border":M?K:"none","--n-border-radius":I?"50%":x,"--n-color":N||F,"--n-color-modal":N||ee,"--n-color-popover":N||B,"--n-bezier":ae,"--n-merged-size":`var(--n-avatar-size-override, ${oe})`}}),z=o?le("avatar",C(()=>{const m=g.value,I=u.value,M=k.value,{color:N}=e;let x="";return m&&(typeof m=="number"?x+=`a${m}`:x+=m[0]),I&&(x+="b"),M&&(x+="c"),N&&(x+=fo(N)),x}),T,e):void 0,S=L(!e.lazy);Le(()=>{if(e.lazy&&e.intersectionObserverOptions){let m;const I=be(()=>{m?.(),m=void 0,e.lazy&&(m=Go(d.value,e.intersectionObserverOptions,S))});Be(()=>{I(),m?.()})}}),vo(()=>{var m;return e.src||((m=e.imgProps)===null||m===void 0?void 0:m.src)},()=>{i.value=!1});const p=L(!e.lazy);return{textRef:n,selfRef:d,mergedRoundRef:u,mergedClsPrefix:t,fitTextTransform:v,cssVars:o?void 0:T,themeClass:z?.themeClass,onRender:z?.onRender,hasLoadError:i,shouldStartLoading:S,loaded:p,mergedOnError:m=>{if(!S.value)return;i.value=!0;const{onError:I,imgProps:{onError:M}={}}=e;I?.(m),M?.(m)},mergedOnLoad:m=>{const{onLoad:I,imgProps:{onLoad:M}={}}=e;I?.(m),M?.(m),p.value=!0}}},render(){var e,t;const{$slots:o,src:i,mergedClsPrefix:s,lazy:n,onRender:d,loaded:v,hasLoadError:a,imgProps:g={}}=this;d?.();let j;const A=!v&&!a&&(this.renderPlaceholder?this.renderPlaceholder():(t=(e=this.$slots).placeholder)===null||t===void 0?void 0:t.call(e));return this.hasLoadError?j=this.renderFallback?this.renderFallback():co(o.fallback,()=>[c("img",{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):j=uo(o.default,u=>{if(u)return c(He,{onResize:this.fitTextTransform},{default:()=>c("span",{ref:"textRef",class:`${s}-avatar__text`},u)});if(i||g.src){const k=this.src||g.src;return c("img",Object.assign(Object.assign({},g),{loading:Do&&!this.intersectionObserverOptions&&n?"lazy":"eager",src:n&&this.intersectionObserverOptions?this.shouldStartLoading?k:void 0:k,"data-image-src":k,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[g.style||"",{objectFit:this.objectFit},A?{height:"0",width:"0",visibility:"hidden",position:"absolute"}:""]}))}}),c("span",{ref:"selfRef",class:[`${s}-avatar`,this.themeClass],style:this.cssVars},j,n&&A)}});function Jo(e){const{baseColor:t,textColor2:o,bodyColor:i,cardColor:s,dividerColor:n,actionColor:d,scrollbarColor:v,scrollbarColorHover:a,invertedColor:g}=e;return{textColor:o,textColorInverted:"#FFF",color:i,colorEmbedded:d,headerColor:s,headerColorInverted:g,footerColor:d,footerColorInverted:g,headerBorderColor:n,headerBorderColorInverted:g,footerBorderColor:n,footerBorderColorInverted:g,siderBorderColor:n,siderBorderColorInverted:g,siderColor:s,siderColorInverted:g,siderToggleButtonBorder:`1px solid ${n}`,siderToggleButtonColor:t,siderToggleButtonIconColor:o,siderToggleButtonIconColorInverted:o,siderToggleBarColor:Ne(i,v),siderToggleBarColorHover:Ne(i,a),__invertScrollbar:"true"}}const ke=go({name:"Layout",common:bo,peers:{Scrollbar:po},self:Jo}),Ve=Q("n-layout-sider"),Se={type:String,default:"static"},Zo=f("layout",`
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
`,[f("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),E("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),Qo={embedded:Boolean,position:Se,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},De=Q("n-layout");function Ue(e){return H({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},q.props),Qo),setup(t){const o=L(null),i=L(null),{mergedClsPrefixRef:s,inlineThemeDisabled:n}=ne(t),d=q("Layout","-layout",Zo,ke,t,s);function v(z,S){if(t.nativeScrollbar){const{value:p}=o;p&&(S===void 0?p.scrollTo(z):p.scrollTo(z,S))}else{const{value:p}=i;p&&p.scrollTo(z,S)}}Z(De,t);let a=0,g=0;const j=z=>{var S;const p=z.target;a=p.scrollLeft,g=p.scrollTop,(S=t.onScroll)===null||S===void 0||S.call(t,z)};Fe(()=>{if(t.nativeScrollbar){const z=o.value;z&&(z.scrollTop=g,z.scrollLeft=a)}});const A={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},u={scrollTo:v},k=C(()=>{const{common:{cubicBezierEaseInOut:z},self:S}=d.value;return{"--n-bezier":z,"--n-color":t.embedded?S.colorEmbedded:S.color,"--n-text-color":S.textColor}}),T=n?le("layout",C(()=>t.embedded?"e":""),k,t):void 0;return Object.assign({mergedClsPrefix:s,scrollableElRef:o,scrollbarInstRef:i,hasSiderStyle:A,mergedTheme:d,handleNativeElScroll:j,cssVars:n?void 0:k,themeClass:T?.themeClass,onRender:T?.onRender},u)},render(){var t;const{mergedClsPrefix:o,hasSider:i}=this;(t=this.onRender)===null||t===void 0||t.call(this);const s=i?this.hasSiderStyle:void 0,n=[this.themeClass,e&&`${o}-layout-content`,`${o}-layout`,`${o}-layout--${this.position}-positioned`];return c("div",{class:n,style:this.cssVars},this.nativeScrollbar?c("div",{ref:"scrollableElRef",class:[`${o}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,s],onScroll:this.handleNativeElScroll},this.$slots):c($e,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,s]}),this.$slots))}})}const Ee=Ue(!1),et=Ue(!0),ot=f("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[E("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),E("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),tt={position:Se,inverted:Boolean,bordered:{type:Boolean,default:!1}},rt=H({name:"LayoutHeader",props:Object.assign(Object.assign({},q.props),tt),setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=ne(e),i=q("Layout","-layout-header",ot,ke,e,t),s=C(()=>{const{common:{cubicBezierEaseInOut:d},self:v}=i.value,a={"--n-bezier":d};return e.inverted?(a["--n-color"]=v.headerColorInverted,a["--n-text-color"]=v.textColorInverted,a["--n-border-color"]=v.headerBorderColorInverted):(a["--n-color"]=v.headerColor,a["--n-text-color"]=v.textColor,a["--n-border-color"]=v.headerBorderColor),a}),n=o?le("layout-header",C(()=>e.inverted?"a":"b"),s,e):void 0;return{mergedClsPrefix:t,cssVars:o?void 0:s,themeClass:n?.themeClass,onRender:n?.onRender}},render(){var e;const{mergedClsPrefix:t}=this;return(e=this.onRender)===null||e===void 0||e.call(this),c("div",{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),nt=f("layout-sider",`
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
`,[E("bordered",[h("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),h("left-placement",[E("bordered",[h("border",`
 right: 0;
 `)])]),E("right-placement",`
 justify-content: flex-start;
 `,[E("bordered",[h("border",`
 left: 0;
 `)]),E("collapsed",[f("layout-toggle-button",[f("base-icon",`
 transform: rotate(180deg);
 `)]),f("layout-toggle-bar",[P("&:hover",[h("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),f("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[f("base-icon",`
 transform: rotate(0);
 `)]),f("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[P("&:hover",[h("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),E("collapsed",[f("layout-toggle-bar",[P("&:hover",[h("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),f("layout-toggle-button",[f("base-icon",`
 transform: rotate(0);
 `)])]),f("layout-toggle-button",`
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
 `,[f("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),f("layout-toggle-bar",`
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
 `),P("&:hover",[h("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),h("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),h("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),P("&:hover",[h("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),h("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),f("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),E("show-content",[f("layout-sider-scroll-container",{opacity:1})]),E("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),lt=H({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return c("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},c("div",{class:`${e}-layout-toggle-bar__top`}),c("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),it=H({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return c("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},c(Ke,{clsPrefix:e},{default:()=>c(Eo,null)}))}}),at={position:Se,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},st=H({name:"LayoutSider",props:Object.assign(Object.assign({},q.props),at),setup(e){const t=W(De),o=L(null),i=L(null),s=L(e.defaultCollapsed),n=Ce(ue(e,"collapsed"),s),d=C(()=>he(n.value?e.collapsedWidth:e.width)),v=C(()=>e.collapseMode!=="transform"?{}:{minWidth:he(e.width)}),a=C(()=>t?t.siderPlacement:"left");function g(N,x){if(e.nativeScrollbar){const{value:R}=o;R&&(x===void 0?R.scrollTo(N):R.scrollTo(N,x))}else{const{value:R}=i;R&&R.scrollTo(N,x)}}function j(){const{"onUpdate:collapsed":N,onUpdateCollapsed:x,onExpand:R,onCollapse:F}=e,{value:K}=n;x&&U(x,!K),N&&U(N,!K),s.value=!K,K?R&&U(R):F&&U(F)}let A=0,u=0;const k=N=>{var x;const R=N.target;A=R.scrollLeft,u=R.scrollTop,(x=e.onScroll)===null||x===void 0||x.call(e,N)};Fe(()=>{if(e.nativeScrollbar){const N=o.value;N&&(N.scrollTop=u,N.scrollLeft=A)}}),Z(Ve,{collapsedRef:n,collapseModeRef:ue(e,"collapseMode")});const{mergedClsPrefixRef:T,inlineThemeDisabled:z}=ne(e),S=q("Layout","-layout-sider",nt,ke,e,T);function p(N){var x,R;N.propertyName==="max-width"&&(n.value?(x=e.onAfterLeave)===null||x===void 0||x.call(e):(R=e.onAfterEnter)===null||R===void 0||R.call(e))}const m={scrollTo:g},I=C(()=>{const{common:{cubicBezierEaseInOut:N},self:x}=S.value,{siderToggleButtonColor:R,siderToggleButtonBorder:F,siderToggleBarColor:K,siderToggleBarColorHover:ee}=x,B={"--n-bezier":N,"--n-toggle-button-color":R,"--n-toggle-button-border":F,"--n-toggle-bar-color":K,"--n-toggle-bar-color-hover":ee};return e.inverted?(B["--n-color"]=x.siderColorInverted,B["--n-text-color"]=x.textColorInverted,B["--n-border-color"]=x.siderBorderColorInverted,B["--n-toggle-button-icon-color"]=x.siderToggleButtonIconColorInverted,B.__invertScrollbar=x.__invertScrollbar):(B["--n-color"]=x.siderColor,B["--n-text-color"]=x.textColor,B["--n-border-color"]=x.siderBorderColor,B["--n-toggle-button-icon-color"]=x.siderToggleButtonIconColor),B}),M=z?le("layout-sider",C(()=>e.inverted?"a":"b"),I,e):void 0;return Object.assign({scrollableElRef:o,scrollbarInstRef:i,mergedClsPrefix:T,mergedTheme:S,styleMaxWidth:d,mergedCollapsed:n,scrollContainerStyle:v,siderPlacement:a,handleNativeElScroll:k,handleTransitionend:p,handleTriggerClick:j,inlineThemeDisabled:z,cssVars:I,themeClass:M?.themeClass,onRender:M?.onRender},m)},render(){var e;const{mergedClsPrefix:t,mergedCollapsed:o,showTrigger:i}=this;return(e=this.onRender)===null||e===void 0||e.call(this),c("aside",{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,o&&`${t}-layout-sider--collapsed`,(!o||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:he(this.width)}]},this.nativeScrollbar?c("div",{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):c($e,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),i?i==="bar"?c(lt,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):c(it,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?c("div",{class:`${t}-layout-sider__border`}):null)}}),ie=Q("n-menu"),Ge=Q("n-submenu"),Ie=Q("n-menu-item-group"),Me=[P("&::before","background-color: var(--n-item-color-hover);"),h("arrow",`
 color: var(--n-arrow-color-hover);
 `),h("icon",`
 color: var(--n-item-icon-color-hover);
 `),f("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[P("a",`
 color: var(--n-item-text-color-hover);
 `),h("extra",`
 color: var(--n-item-text-color-hover);
 `)])],_e=[h("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),f("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[P("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),h("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],dt=P([f("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[E("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[f("submenu","margin: 0;"),f("menu-item","margin: 0;"),f("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[P("&::before","display: none;"),E("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),f("menu-item-content",[E("selected",[h("icon","color: var(--n-item-icon-color-active-horizontal);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[P("a","color: var(--n-item-text-color-active-horizontal);"),h("extra","color: var(--n-item-text-color-active-horizontal);")])]),E("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[f("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[P("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),h("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),h("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),te("disabled",[te("selected, child-active",[P("&:focus-within",_e)]),E("selected",[X(null,[h("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[P("a","color: var(--n-item-text-color-active-hover-horizontal);"),h("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),E("child-active",[X(null,[h("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[P("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),h("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),X("border-bottom: 2px solid var(--n-border-color-horizontal);",_e)]),f("menu-item-content-header",[P("a","color: var(--n-item-text-color-horizontal);")])])]),te("responsive",[f("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),E("collapsed",[f("menu-item-content",[E("selected",[P("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),f("menu-item-content-header","opacity: 0;"),h("arrow","opacity: 0;"),h("icon","color: var(--n-item-icon-color-collapsed);")])]),f("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),f("menu-item-content",`
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
 `,[P("> *","z-index: 1;"),P("&::before",`
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
 `),E("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),E("collapsed",[h("arrow","transform: rotate(0);")]),E("selected",[P("&::before","background-color: var(--n-item-color-active);"),h("arrow","color: var(--n-arrow-color-active);"),h("icon","color: var(--n-item-icon-color-active);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[P("a","color: var(--n-item-text-color-active);"),h("extra","color: var(--n-item-text-color-active);")])]),E("child-active",[f("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[P("a",`
 color: var(--n-item-text-color-child-active);
 `),h("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),h("arrow",`
 color: var(--n-arrow-color-child-active);
 `),h("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),te("disabled",[te("selected, child-active",[P("&:focus-within",Me)]),E("selected",[X(null,[h("arrow","color: var(--n-arrow-color-active-hover);"),h("icon","color: var(--n-item-icon-color-active-hover);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[P("a","color: var(--n-item-text-color-active-hover);"),h("extra","color: var(--n-item-text-color-active-hover);")])])]),E("child-active",[X(null,[h("arrow","color: var(--n-arrow-color-child-active-hover);"),h("icon","color: var(--n-item-icon-color-child-active-hover);"),f("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[P("a","color: var(--n-item-text-color-child-active-hover);"),h("extra","color: var(--n-item-text-color-child-active-hover);")])])]),E("selected",[X(null,[P("&::before","background-color: var(--n-item-color-active-hover);")])]),X(null,Me)]),h("icon",`
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
 `),f("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[P("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[P("&::before",`
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
 `)])]),f("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[f("menu-item-content",`
 height: var(--n-item-height);
 `),f("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[xo({duration:".2s"})])]),f("menu-item-group",[f("menu-item-group-title",`
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
 `)])]),f("menu-tooltip",[P("a",`
 color: inherit;
 text-decoration: none;
 `)]),f("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function X(e,t){return[E("hover",e,t),P("&:hover",e,t)]}const We=H({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:t}=W(ie);return{menuProps:t,style:C(()=>{const{paddingLeft:o}=e;return{paddingLeft:o&&`${o}px`}}),iconStyle:C(()=>{const{maxIconSize:o,activeIconSize:i,iconMarginRight:s}=e;return{width:`${o}px`,height:`${o}px`,fontSize:`${i}px`,marginRight:`${s}px`}})}},render(){const{clsPrefix:e,tmNode:t,menuProps:{renderIcon:o,renderLabel:i,renderExtra:s,expandIcon:n}}=this,d=o?o(t.rawNode):J(this.icon);return c("div",{onClick:v=>{var a;(a=this.onClick)===null||a===void 0||a.call(this,v)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},d&&c("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[d]),c("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:i?i(t.rawNode):J(this.title),this.extra||s?c("span",{class:`${e}-menu-item-content-header__extra`}," ",s?s(t.rawNode):J(this.extra)):null),this.showArrow?c(Ke,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>n?n(t.rawNode):c(Vo,null)}):null)}}),ce=8;function Re(e){const t=W(ie),{props:o,mergedCollapsedRef:i}=t,s=W(Ge,null),n=W(Ie,null),d=C(()=>o.mode==="horizontal"),v=C(()=>d.value?o.dropdownPlacement:"tmNodes"in e?"right-start":"right"),a=C(()=>{var u;return Math.max((u=o.collapsedIconSize)!==null&&u!==void 0?u:o.iconSize,o.iconSize)}),g=C(()=>{var u;return!d.value&&e.root&&i.value&&(u=o.collapsedIconSize)!==null&&u!==void 0?u:o.iconSize}),j=C(()=>{if(d.value)return;const{collapsedWidth:u,indent:k,rootIndent:T}=o,{root:z,isGroup:S}=e,p=T===void 0?k:T;return z?i.value?u/2-a.value/2:p:n&&typeof n.paddingLeftRef.value=="number"?k/2+n.paddingLeftRef.value:s&&typeof s.paddingLeftRef.value=="number"?(S?k/2:k)+s.paddingLeftRef.value:0}),A=C(()=>{const{collapsedWidth:u,indent:k,rootIndent:T}=o,{value:z}=a,{root:S}=e;return d.value||!S||!i.value?ce:(T===void 0?k:T)+z+ce-(u+z)/2});return{dropdownPlacement:v,activeIconSize:g,maxIconSize:a,paddingLeft:j,iconMarginRight:A,NMenu:t,NSubmenu:s,NMenuOptionGroup:n}}const Pe={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},ct=H({name:"MenuDivider",setup(){const e=W(ie),{mergedClsPrefixRef:t,isHorizontalRef:o}=e;return()=>o.value?null:c("div",{class:`${t.value}-menu-divider`})}}),qe=Object.assign(Object.assign({},Pe),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),ut=ze(qe),vt=H({name:"MenuOption",props:qe,setup(e){const t=Re(e),{NSubmenu:o,NMenu:i,NMenuOptionGroup:s}=t,{props:n,mergedClsPrefixRef:d,mergedCollapsedRef:v}=i,a=o?o.mergedDisabledRef:s?s.mergedDisabledRef:{value:!1},g=C(()=>a.value||e.disabled);function j(u){const{onClick:k}=e;k&&k(u)}function A(u){g.value||(i.doSelect(e.internalKey,e.tmNode.rawNode),j(u))}return{mergedClsPrefix:d,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:i.mergedThemeRef,menuProps:n,dropdownEnabled:xe(()=>e.root&&v.value&&n.mode!=="horizontal"&&!g.value),selected:xe(()=>i.mergedValueRef.value===e.internalKey),mergedDisabled:g,handleClick:A}},render(){const{mergedClsPrefix:e,mergedTheme:t,tmNode:o,menuProps:{renderLabel:i,nodeProps:s}}=this,n=s?.(o.rawNode);return c("div",Object.assign({},n,{role:"menuitem",class:[`${e}-menu-item`,n?.class]}),c(Mo,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>i?i(o.rawNode):J(this.title),trigger:()=>c(We,{tmNode:o,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Ye=Object.assign(Object.assign({},Pe),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),ht=ze(Ye),mt=H({name:"MenuOptionGroup",props:Ye,setup(e){const t=Re(e),{NSubmenu:o}=t,i=C(()=>o?.mergedDisabledRef.value?!0:e.tmNode.disabled);Z(Ie,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:i});const{mergedClsPrefixRef:s,props:n}=W(ie);return function(){const{value:d}=s,v=t.paddingLeft.value,{nodeProps:a}=n,g=a?.(e.tmNode.rawNode);return c("div",{class:`${d}-menu-item-group`,role:"group"},c("div",Object.assign({},g,{class:[`${d}-menu-item-group-title`,g?.class],style:[g?.style||"",v!==void 0?`padding-left: ${v}px;`:""]}),J(e.title),e.extra?c(Co,null," ",J(e.extra)):null),c("div",null,e.tmNodes.map(j=>Oe(j,n))))}}});function ye(e){return e.type==="divider"||e.type==="render"}function ft(e){return e.type==="divider"}function Oe(e,t){const{rawNode:o}=e,{show:i}=o;if(i===!1)return null;if(ye(o))return ft(o)?c(ct,Object.assign({key:e.key},o.props)):null;const{labelField:s}=t,{key:n,level:d,isGroup:v}=e,a=Object.assign(Object.assign({},o),{title:o.title||o[s],extra:o.titleExtra||o.extra,key:n,internalKey:n,level:d,root:d===0,isGroup:v});return e.children?e.isGroup?c(mt,ve(a,ht,{tmNode:e,tmNodes:e.children,key:n})):c(we,ve(a,gt,{key:n,rawNodes:o[t.childrenField],tmNodes:e.children,tmNode:e})):c(vt,ve(a,ut,{key:n,tmNode:e}))}const Xe=Object.assign(Object.assign({},Pe),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),gt=ze(Xe),we=H({name:"Submenu",props:Xe,setup(e){const t=Re(e),{NMenu:o,NSubmenu:i}=t,{props:s,mergedCollapsedRef:n,mergedThemeRef:d}=o,v=C(()=>{const{disabled:u}=e;return i?.mergedDisabledRef.value||s.disabled?!0:u}),a=L(!1);Z(Ge,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:v}),Z(Ie,null);function g(){const{onClick:u}=e;u&&u()}function j(){v.value||(n.value||o.toggleExpand(e.internalKey),g())}function A(u){a.value=u}return{menuProps:s,mergedTheme:d,doSelect:o.doSelect,inverted:o.invertedRef,isHorizontal:o.isHorizontalRef,mergedClsPrefix:o.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:a,paddingLeft:t.paddingLeft,mergedDisabled:v,mergedValue:o.mergedValueRef,childActive:xe(()=>{var u;return(u=e.virtualChildActive)!==null&&u!==void 0?u:o.activePathRef.value.includes(e.internalKey)}),collapsed:C(()=>s.mode==="horizontal"?!1:n.value?!0:!o.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:C(()=>!v.value&&(s.mode==="horizontal"||n.value)),handlePopoverShowChange:A,handleClick:j}},render(){var e;const{mergedClsPrefix:t,menuProps:{renderIcon:o,renderLabel:i}}=this,s=()=>{const{isHorizontal:d,paddingLeft:v,collapsed:a,mergedDisabled:g,maxIconSize:j,activeIconSize:A,title:u,childActive:k,icon:T,handleClick:z,menuProps:{nodeProps:S},dropdownShow:p,iconMarginRight:m,tmNode:I,mergedClsPrefix:M,isEllipsisPlaceholder:N,extra:x}=this,R=S?.(I.rawNode);return c("div",Object.assign({},R,{class:[`${M}-menu-item`,R?.class],role:"menuitem"}),c(We,{tmNode:I,paddingLeft:v,collapsed:a,disabled:g,iconMarginRight:m,maxIconSize:j,activeIconSize:A,title:u,extra:x,showArrow:!d,childActive:k,clsPrefix:M,icon:T,hover:p,onClick:z,isEllipsisPlaceholder:N}))},n=()=>c(yo,null,{default:()=>{const{tmNodes:d,collapsed:v}=this;return v?null:c("div",{class:`${t}-submenu-children`,role:"menu"},d.map(a=>Oe(a,this.menuProps)))}});return this.root?c(_o,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:o,renderLabel:i}),{default:()=>c("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},s(),this.isHorizontal?null:n())}):c("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},s(),n())}}),pt=Object.assign(Object.assign({},q.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),bt=H({name:"Menu",inheritAttrs:!1,props:pt,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=ne(e),i=q("Menu","-menu",dt,ko,e,t),s=W(Ve,null),n=C(()=>{var b;const{collapsed:O}=e;if(O!==void 0)return O;if(s){const{collapseModeRef:r,collapsedRef:y}=s;if(r.value==="width")return(b=y.value)!==null&&b!==void 0?b:!1}return!1}),d=C(()=>{const{keyField:b,childrenField:O,disabledField:r}=e;return me(e.items||e.options,{getIgnored(y){return ye(y)},getChildren(y){return y[O]},getDisabled(y){return y[r]},getKey(y){var _;return(_=y[b])!==null&&_!==void 0?_:y.name}})}),v=C(()=>new Set(d.value.treeNodes.map(b=>b.key))),{watchProps:a}=e,g=L(null);a?.includes("defaultValue")?be(()=>{g.value=e.defaultValue}):g.value=e.defaultValue;const j=ue(e,"value"),A=Ce(j,g),u=L([]),k=()=>{u.value=e.defaultExpandAll?d.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||d.value.getPath(A.value,{includeSelf:!1}).keyPath};a?.includes("defaultExpandedKeys")?be(k):k();const T=Ho(e,["expandedNames","expandedKeys"]),z=Ce(T,u),S=C(()=>d.value.treeNodes),p=C(()=>d.value.getPath(A.value).keyPath);Z(ie,{props:e,mergedCollapsedRef:n,mergedThemeRef:i,mergedValueRef:A,mergedExpandedKeysRef:z,activePathRef:p,mergedClsPrefixRef:t,isHorizontalRef:C(()=>e.mode==="horizontal"),invertedRef:ue(e,"inverted"),doSelect:m,toggleExpand:M});function m(b,O){const{"onUpdate:value":r,onUpdateValue:y,onSelect:_}=e;y&&U(y,b,O),r&&U(r,b,O),_&&U(_,b,O),g.value=b}function I(b){const{"onUpdate:expandedKeys":O,onUpdateExpandedKeys:r,onExpandedNamesChange:y,onOpenNamesChange:_}=e;O&&U(O,b),r&&U(r,b),y&&U(y,b),_&&U(_,b),u.value=b}function M(b){const O=Array.from(z.value),r=O.findIndex(y=>y===b);if(~r)O.splice(r,1);else{if(e.accordion&&v.value.has(b)){const y=O.findIndex(_=>v.value.has(_));y>-1&&O.splice(y,1)}O.push(b)}I(O)}const N=b=>{const O=d.value.getPath(b??A.value,{includeSelf:!1}).keyPath;if(!O.length)return;const r=Array.from(z.value),y=new Set([...r,...O]);e.accordion&&v.value.forEach(_=>{y.has(_)&&!O.includes(_)&&y.delete(_)}),I(Array.from(y))},x=C(()=>{const{inverted:b}=e,{common:{cubicBezierEaseInOut:O},self:r}=i.value,{borderRadius:y,borderColorHorizontal:_,fontSize:ro,itemHeight:no,dividerColor:lo}=r,l={"--n-divider-color":lo,"--n-bezier":O,"--n-font-size":ro,"--n-border-color-horizontal":_,"--n-border-radius":y,"--n-item-height":no};return b?(l["--n-group-text-color"]=r.groupTextColorInverted,l["--n-color"]=r.colorInverted,l["--n-item-text-color"]=r.itemTextColorInverted,l["--n-item-text-color-hover"]=r.itemTextColorHoverInverted,l["--n-item-text-color-active"]=r.itemTextColorActiveInverted,l["--n-item-text-color-child-active"]=r.itemTextColorChildActiveInverted,l["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveInverted,l["--n-item-text-color-active-hover"]=r.itemTextColorActiveHoverInverted,l["--n-item-icon-color"]=r.itemIconColorInverted,l["--n-item-icon-color-hover"]=r.itemIconColorHoverInverted,l["--n-item-icon-color-active"]=r.itemIconColorActiveInverted,l["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHoverInverted,l["--n-item-icon-color-child-active"]=r.itemIconColorChildActiveInverted,l["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHoverInverted,l["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsedInverted,l["--n-item-text-color-horizontal"]=r.itemTextColorHorizontalInverted,l["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontalInverted,l["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontalInverted,l["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontalInverted,l["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontalInverted,l["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontalInverted,l["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontalInverted,l["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontalInverted,l["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontalInverted,l["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontalInverted,l["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontalInverted,l["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontalInverted,l["--n-arrow-color"]=r.arrowColorInverted,l["--n-arrow-color-hover"]=r.arrowColorHoverInverted,l["--n-arrow-color-active"]=r.arrowColorActiveInverted,l["--n-arrow-color-active-hover"]=r.arrowColorActiveHoverInverted,l["--n-arrow-color-child-active"]=r.arrowColorChildActiveInverted,l["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHoverInverted,l["--n-item-color-hover"]=r.itemColorHoverInverted,l["--n-item-color-active"]=r.itemColorActiveInverted,l["--n-item-color-active-hover"]=r.itemColorActiveHoverInverted,l["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsedInverted):(l["--n-group-text-color"]=r.groupTextColor,l["--n-color"]=r.color,l["--n-item-text-color"]=r.itemTextColor,l["--n-item-text-color-hover"]=r.itemTextColorHover,l["--n-item-text-color-active"]=r.itemTextColorActive,l["--n-item-text-color-child-active"]=r.itemTextColorChildActive,l["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveHover,l["--n-item-text-color-active-hover"]=r.itemTextColorActiveHover,l["--n-item-icon-color"]=r.itemIconColor,l["--n-item-icon-color-hover"]=r.itemIconColorHover,l["--n-item-icon-color-active"]=r.itemIconColorActive,l["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHover,l["--n-item-icon-color-child-active"]=r.itemIconColorChildActive,l["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHover,l["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsed,l["--n-item-text-color-horizontal"]=r.itemTextColorHorizontal,l["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontal,l["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontal,l["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontal,l["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontal,l["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontal,l["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontal,l["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontal,l["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontal,l["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontal,l["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontal,l["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontal,l["--n-arrow-color"]=r.arrowColor,l["--n-arrow-color-hover"]=r.arrowColorHover,l["--n-arrow-color-active"]=r.arrowColorActive,l["--n-arrow-color-active-hover"]=r.arrowColorActiveHover,l["--n-arrow-color-child-active"]=r.arrowColorChildActive,l["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHover,l["--n-item-color-hover"]=r.itemColorHover,l["--n-item-color-active"]=r.itemColorActive,l["--n-item-color-active-hover"]=r.itemColorActiveHover,l["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsed),l}),R=o?le("menu",C(()=>e.inverted?"a":"b"),x,e):void 0,F=wo(),K=L(null),ee=L(null);let B=!0;const ae=()=>{var b;B?B=!1:(b=K.value)===null||b===void 0||b.sync({showAllItemsBeforeCalculate:!0})};function oe(){return document.getElementById(F)}const se=L(-1);function Je(b){se.value=e.options.length-b}function Ze(b){b||(se.value=-1)}const Qe=C(()=>{const b=se.value;return{children:b===-1?[]:e.options.slice(b)}}),eo=C(()=>{const{childrenField:b,disabledField:O,keyField:r}=e;return me([Qe.value],{getIgnored(y){return ye(y)},getChildren(y){return y[b]},getDisabled(y){return y[O]},getKey(y){var _;return(_=y[r])!==null&&_!==void 0?_:y.name}})}),oo=C(()=>me([{}]).treeNodes[0]);function to(){var b;if(se.value===-1)return c(we,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:oo.value,domId:F,isEllipsisPlaceholder:!0});const O=eo.value.treeNodes[0],r=p.value,y=!!(!((b=O.children)===null||b===void 0)&&b.some(_=>r.includes(_.key)));return c(we,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:y,tmNode:O,domId:F,rawNodes:O.rawNode.children||[],tmNodes:O.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:t,controlledExpandedKeys:T,uncontrolledExpanededKeys:u,mergedExpandedKeys:z,uncontrolledValue:g,mergedValue:A,activePath:p,tmNodes:S,mergedTheme:i,mergedCollapsed:n,cssVars:o?void 0:x,themeClass:R?.themeClass,overflowRef:K,counterRef:ee,updateCounter:()=>{},onResize:ae,onUpdateOverflow:Ze,onUpdateCount:Je,renderCounter:to,getCounter:oe,onRender:R?.onRender,showOption:N,deriveResponsiveState:ae}},render(){const{mergedClsPrefix:e,mode:t,themeClass:o,onRender:i}=this;i?.();const s=()=>this.tmNodes.map(a=>Oe(a,this.$props)),d=t==="horizontal"&&this.responsive,v=()=>c("div",zo(this.$attrs,{role:t==="horizontal"?"menubar":"menu",class:[`${e}-menu`,o,`${e}-menu--${t}`,d&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),d?c($o,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:s,counter:this.renderCounter}):s());return d?c(He,{onResize:this.onResize},{default:v}):v()}}),xt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Ct=H({name:"ArchiveOutline",render:function(t,o){return V(),Y("svg",xt,o[0]||(o[0]=[w("path",{d:"M80 152v256a40.12 40.12 0 0 0 40 40h272a40.12 40.12 0 0 0 40-40V152",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),w("rect",{x:"48",y:"64",width:"416",height:"80",rx:"28",ry:"28",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M320 304l-64 64l-64-64"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 345.89V224"},null,-1)]))}}),yt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},wt=H({name:"CodeSlashOutline",render:function(t,o){return V(),Y("svg",yt,o[0]||(o[0]=[w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M160 368L32 256l128-112"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M352 368l128-112l-128-112"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M304 96l-96 320"},null,-1)]))}}),zt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},kt=H({name:"CubeOutline",render:function(t,o){return V(),Y("svg",zt,o[0]||(o[0]=[w("path",{d:"M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M69 153.99l187 110l187-110"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 463.99v-200"},null,-1)]))}}),St={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},It=H({name:"DocumentTextOutline",render:function(t,o){return V(),Y("svg",St,o[0]||(o[0]=[w("path",{d:"M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),w("path",{d:"M256 56v120a32 32 0 0 0 32 32h120",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 288h160"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 368h160"},null,-1)]))}}),Rt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Pt=H({name:"GitNetworkOutline",render:function(t,o){return V(),Y("svg",Rt,o[0]||(o[0]=[So('<circle cx="128" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="256" cy="416" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 256v112"></path><circle cx="384" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path d="M128 144c0 74.67 68.92 112 128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path d="M384 144c0 74.67-68.92 112-128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>',6)]))}}),Ot={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Nt=H({name:"GridOutline",render:function(t,o){return V(),Y("svg",Ot,o[0]||(o[0]=[w("rect",{x:"48",y:"48",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),w("rect",{x:"288",y:"48",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),w("rect",{x:"48",y:"288",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),w("rect",{x:"288",y:"288",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1)]))}}),At={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Tt=H({name:"LogOutOutline",render:function(t,o){return V(),Y("svg",At,o[0]||(o[0]=[w("path",{d:"M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M368 336l80-80l-80-80"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 256h256"},null,-1)]))}}),jt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Et=H({name:"ReaderOutline",render:function(t,o){return V(),Y("svg",jt,o[0]||(o[0]=[w("rect",{x:"96",y:"48",width:"320",height:"416",rx:"48",ry:"48",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 128h160"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 208h160"},null,-1),w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 288h80"},null,-1)]))}}),Mt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},_t=H({name:"SettingsOutline",render:function(t,o){return V(),Y("svg",Mt,o[0]||(o[0]=[w("path",{d:"M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1)]))}}),Ht={key:0,class:"brand-copy"},Lt={class:"account"},Bt={class:"account-copy"},Xt=H({__name:"AppLayout",setup(e){const t=jo(),o=Po(),i=Io(),s=Lo(),n=L(window.innerWidth<900);function d(S,p,m){return{label:()=>c(To,{to:{name:p}},{default:()=>S}),key:p,icon:()=>c(je,null,{default:()=>c(m)})}}const v=[d("运行概览","dashboard",Nt),d("代理编排","orchestration",Pt),d("配置管理","config",It),d("配置能力","schema",wt),d("dae 版本","versions",kt),d("运行日志","logs",Et),d("配置备份","backups",Ct),d("安全设置","settings",_t)],a=C(()=>String(t.name||"dashboard")),g=C(()=>String(t.meta.title||"kdae-panel"));async function j(){try{await i.logout(),await o.replace({name:"login"})}catch(S){s.error(S instanceof Error?S.message:"退出登录失败")}}function A(){i.clearSession(),o.replace({name:"login"}),s.warning("登录会话已过期，请重新登录")}function u(){window.innerWidth<900&&(n.value=!0)}const k=L(null),T=L(!1);async function z(){try{k.value=await Ro("/api/v1/panel/update")}catch{k.value=null}}return Le(()=>{window.addEventListener("kdae-panel:auth-expired",A),window.addEventListener("resize",u),z()}),Be(()=>{window.removeEventListener("kdae-panel:auth-expired",A),window.removeEventListener("resize",u)}),(S,p)=>{const m=Ao("RouterView");return V(),Ae($(Ee),{"has-sider":"",class:"app-shell"},{default:G(()=>[D($(st),{bordered:"","collapse-mode":"width","collapsed-width":64,width:236,collapsed:n.value,"show-trigger":"bar",onCollapse:p[0]||(p[0]=I=>n.value=!0),onExpand:p[1]||(p[1]=I=>n.value=!1)},{default:G(()=>[w("div",{class:Oo(["brand",{compact:n.value}])},[p[4]||(p[4]=w("div",{class:"brand-mark"},"K",-1)),n.value?Te("",!0):(V(),Y("div",Ht,[...p[3]||(p[3]=[w("strong",null,"kdae-panel",-1),w("span",null,"零侵入管理面板",-1)])]))],2),D($(bt),{value:a.value,collapsed:n.value,"collapsed-width":64,"collapsed-icon-size":22,options:v},null,8,["value","collapsed"])]),_:1},8,["collapsed"]),D($(Ee),null,{default:G(()=>[D($(rt),{bordered:"",class:"app-header"},{default:G(()=>[w("div",null,[D($(Bo),{depth:"3",class:"eyebrow"},{default:G(()=>[...p[5]||(p[5]=[de("KDAE CONTROL PLANE",-1)])]),_:1}),w("h1",null,re(g.value),1)]),w("div",Lt,[D($(Xo),{round:"",size:"small"},{default:G(()=>[de(re($(i).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),w("div",Bt,[w("strong",null,re($(i).user?.username),1),p[6]||(p[6]=w("span",null,"管理员",-1))]),D($(No),{quaternary:"",circle:"",title:"退出登录",onClick:j},{icon:G(()=>[D($(je),null,{default:G(()=>[D($(Tt))]),_:1})]),_:1})])]),_:1}),D($(et),{class:"app-content","content-style":"padding: 28px;"},{default:G(()=>[k.value?.updateAvailable&&!T.value?(V(),Ae($(Ko),{key:0,type:"info",closable:"",class:"update-banner",onClose:p[2]||(p[2]=I=>T.value=!0)},{default:G(()=>[p[7]||(p[7]=de(" 面板有新版本 ",-1)),w("strong",null,re(k.value.latest),1),de("（当前 "+re(k.value.current)+"）。 在服务器上重新执行一键部署命令即可升级，配置与账号数据都会保留。 ",1),p[8]||(p[8]=w("a",{href:"https://github.com/tuoro/kdae-panel/releases/latest",target:"_blank",rel:"noopener"},"查看发布说明",-1))]),_:1})):Te("",!0),D(m)]),_:1})]),_:1})]),_:1})}}});export{Xt as default};
