import{$n as e,$t as t,A as n,At as r,Cn as i,Dn as a,Et as o,Fn as s,Hn as c,In as l,Kt as u,Lt as d,Nn as f,Nt as p,O as m,Qt as h,St as g,Tn as _,Tt as v,Un as y,Vn as b,Xt as x,Yt as S,Zt as C,_n as w,ar as T,b as ee,bn as E,bt as D,d as te,dt as O,en as k,ft as A,g as j,gn as M,hn as N,jn as P,jt as F,k as I,kt as ne,ln as re,mn as L,or as ie,pn as R,qt as z,r as ae,rr as B,sr as V,v as oe,vn as se,vt as ce,w as le,xn as H,xt as U,yn as W,zn as ue}from"./client-afectMo_.js";import{r as de,t as G}from"./create-CCsFn2Ba.js";import{t as fe}from"./misc-DDs3MKLt.js";import{r as K}from"./light-6OxpLMiD.js";import{a as q,i as pe,n as me,r as J,t as he}from"./text-Cz55FHMX.js";import{n as ge,r as _e,t as ve}from"./Dropdown-CFBFhG9G.js";import{n as ye}from"./Tag-B_mhBdqS.js";import{t as be}from"./Alert-CouDwWcH.js";import{t as xe}from"./Icon-cgotgpJ7.js";import{P as Y,S as Se,c as Ce,i as we,n as Te,r as Ee,t as De,x as Oe}from"./index-Dzn2FMmc.js";var ke=H({name:`ChevronDownFilled`,render(){return i(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},i(`path`,{d:`M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z`,fill:`currentColor`}))}}),Ae=r&&`loading`in document.createElement(`img`);function je(e={}){let{root:t=null}=e;return{hash:`${e.rootMargin||`0px 0px 0px 0px`}-${Array.isArray(e.threshold)?e.threshold.join(`,`):e.threshold??`0`}`,options:Object.assign(Object.assign({},e),{root:(typeof t==`string`?document.querySelector(t):t)||document.documentElement})}}var X=new WeakMap,Me=new WeakMap,Z=new WeakMap,Ne=(e,t,n)=>{if(!e)return()=>{};let r=je(t),{root:i}=r.options,a,o=X.get(i);o?a=o:(a=new Map,X.set(i,a));let s,c;a.has(r.hash)?(c=a.get(r.hash),c[1].has(e)||(s=c[0],c[1].add(e),s.observe(e))):(s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=Me.get(e.target),n=Z.get(e.target);t&&t(),n&&(n.value=!0)}})},r.options),s.observe(e),c=[s,new Set([e])],a.set(r.hash,c));let l=!1,u=()=>{l||(Me.delete(e),Z.delete(e),l=!0,c[1].has(e)&&(c[0].unobserve(e),c[1].delete(e)),c[1].size<=0&&a.delete(r.hash),a.size||X.delete(i))};return Me.set(e,u),Z.set(e,n),u},Pe=F(`n-avatar-group`),Fe=z(`avatar`,`
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
`,[t(u(`&`,`--n-merged-color: var(--n-color-modal);`)),k(u(`&`,`--n-merged-color: var(--n-color-popover);`)),u(`img`,`
 width: 100%;
 height: 100%;
 `),S(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),z(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),S(`text`,`line-height: 1.25`)]),Ie=H({name:`Avatar`,props:Object.assign(Object.assign({},n.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),slots:Object,setup(t){let{mergedClsPrefixRef:r,inlineThemeDisabled:i}=A(t),a=e(!1),o=null,s=e(null),l=e(null),u=()=>{let{value:e}=s;if(e&&(o===null||o!==e.innerHTML)){o=e.innerHTML;let{value:t}=l;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},d=_(Pe,null),p=R(()=>{let{size:e}=t;if(e)return e;let{size:n}=d||{};return n||`medium`}),m=n(`Avatar`,`-avatar`,Fe,Oe,t,r),g=_(ye,null),y=R(()=>{if(d)return!0;let{round:e,circle:n}=t;return e!==void 0||n!==void 0?e||n:g?g.roundRef.value:!1}),x=R(()=>d?!0:t.bordered||!1),S=R(()=>{let e=p.value,n=y.value,r=x.value,{color:i}=t,{self:{borderRadius:a,fontSize:o,color:s,border:c,colorModal:l,colorPopover:u},common:{cubicBezierEaseInOut:d}}=m.value,f;return f=typeof e==`number`?`${e}px`:m.value.self[h(`height`,e)],{"--n-font-size":o,"--n-border":r?c:`none`,"--n-border-radius":n?`50%`:a,"--n-color":i||s,"--n-color-modal":i||l,"--n-color-popover":i||u,"--n-bezier":d,"--n-merged-size":`var(--n-avatar-size-override, ${f})`}}),C=i?O(`avatar`,R(()=>{let e=p.value,n=y.value,r=x.value,{color:i}=t,a=``;return e&&(typeof e==`number`?a+=`a${e}`:a+=e[0]),n&&(a+=`b`),r&&(a+=`c`),i&&(a+=v(i)),a}),S,t):void 0,w=e(!t.lazy);f(()=>{if(t.lazy&&t.intersectionObserverOptions){let e,n=c(()=>{e?.(),e=void 0,t.lazy&&(e=Ne(l.value,t.intersectionObserverOptions,w))});P(()=>{n(),e?.()})}}),b(()=>t.src||t.imgProps?.src,()=>{a.value=!1});let T=e(!t.lazy);return{textRef:s,selfRef:l,mergedRoundRef:y,mergedClsPrefix:r,fitTextTransform:u,cssVars:i?void 0:S,themeClass:C?.themeClass,onRender:C?.onRender,hasLoadError:a,shouldStartLoading:w,loaded:T,mergedOnError:e=>{if(!w.value)return;a.value=!0;let{onError:n,imgProps:{onError:r}={}}=t;n?.(e),r?.(e)},mergedOnLoad:e=>{let{onLoad:n,imgProps:{onLoad:r}={}}=t;n?.(e),r?.(e),T.value=!0}}},render(){var e;let{$slots:t,src:n,mergedClsPrefix:r,lazy:a,onRender:s,loaded:c,hasLoadError:l,imgProps:u={}}=this;s?.();let d,f=!c&&!l&&(this.renderPlaceholder?this.renderPlaceholder():(e=this.$slots).placeholder?.call(e));return d=this.hasLoadError?this.renderFallback?this.renderFallback():ce(t.fallback,()=>[i(`img`,{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):D(t.default,e=>{if(e)return i(o,{onResize:this.fitTextTransform},{default:()=>i(`span`,{ref:`textRef`,class:`${r}-avatar__text`},e)});if(n||u.src){let e=this.src||u.src;return i(`img`,Object.assign(Object.assign({},u),{loading:Ae&&!this.intersectionObserverOptions&&a?`lazy`:`eager`,src:a&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[u.style||``,{objectFit:this.objectFit},f?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]}))}}),i(`span`,{ref:`selfRef`,class:[`${r}-avatar`,this.themeClass],style:this.cssVars},d,a&&f)}});function Le(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:o,scrollbarColor:s,scrollbarColorHover:c,invertedColor:l}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:o,headerColor:i,headerColorInverted:l,footerColor:o,footerColorInverted:l,headerBorderColor:a,headerBorderColorInverted:l,footerBorderColor:a,footerBorderColorInverted:l,siderBorderColor:a,siderBorderColorInverted:l,siderColor:i,siderColorInverted:l,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:d(r,s),siderToggleBarColorHover:d(r,c),__invertScrollbar:`true`}}var Re=I({name:`Layout`,common:ee,peers:{Scrollbar:oe},self:Le}),ze=F(`n-layout-sider`),Be={type:String,default:`static`},Ve=z(`layout`,`
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
`,[z(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),x(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),He={embedded:Boolean,position:Be,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},Ue=F(`n-layout`);function We(t){return H({name:t?`LayoutContent`:`Layout`,props:Object.assign(Object.assign({},n.props),He),setup(t){let r=e(null),i=e(null),{mergedClsPrefixRef:a,inlineThemeDisabled:o}=A(t),s=n(`Layout`,`-layout`,Ve,Re,t,a);function c(e,n){if(t.nativeScrollbar){let{value:t}=r;t&&(n===void 0?t.scrollTo(e):t.scrollTo(e,n))}else{let{value:t}=i;t&&t.scrollTo(e,n)}}l(Ue,t);let u=0,d=0,f=e=>{var n;let r=e.target;u=r.scrollLeft,d=r.scrollTop,(n=t.onScroll)==null||n.call(t,e)};ne(()=>{if(t.nativeScrollbar){let e=r.value;e&&(e.scrollTop=d,e.scrollLeft=u)}});let p={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},m={scrollTo:c},h=R(()=>{let{common:{cubicBezierEaseInOut:e},self:n}=s.value;return{"--n-bezier":e,"--n-color":t.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),g=o?O(`layout`,R(()=>t.embedded?`e`:``),h,t):void 0;return Object.assign({mergedClsPrefix:a,scrollableElRef:r,scrollbarInstRef:i,hasSiderStyle:p,mergedTheme:s,handleNativeElScroll:f,cssVars:o?void 0:h,themeClass:g?.themeClass,onRender:g?.onRender},m)},render(){var e;let{mergedClsPrefix:n,hasSider:r}=this;(e=this.onRender)==null||e.call(this);let a=r?this.hasSiderStyle:void 0;return i(`div`,{class:[this.themeClass,t&&`${n}-layout-content`,`${n}-layout`,`${n}-layout--${this.position}-positioned`],style:this.cssVars},this.nativeScrollbar?i(`div`,{ref:`scrollableElRef`,class:[`${n}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,a],onScroll:this.handleNativeElScroll},this.$slots):i(j,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,a]}),this.$slots))}})}var Ge=We(!1),Ke=We(!0),qe=z(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[x(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),x(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),Je={position:Be,inverted:Boolean,bordered:{type:Boolean,default:!1}},Ye=H({name:`LayoutHeader`,props:Object.assign(Object.assign({},n.props),Je),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r}=A(e),i=n(`Layout`,`-layout-header`,qe,Re,e,t),a=R(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=i.value,r={"--n-bezier":t};return e.inverted?(r[`--n-color`]=n.headerColorInverted,r[`--n-text-color`]=n.textColorInverted,r[`--n-border-color`]=n.headerBorderColorInverted):(r[`--n-color`]=n.headerColor,r[`--n-text-color`]=n.textColor,r[`--n-border-color`]=n.headerBorderColor),r}),o=r?O(`layout-header`,R(()=>e.inverted?`a`:`b`),a,e):void 0;return{mergedClsPrefix:t,cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){var e;let{mergedClsPrefix:t}=this;return(e=this.onRender)==null||e.call(this),i(`div`,{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),Xe=z(`layout-sider`,`
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
`,[x(`bordered`,[S(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),S(`left-placement`,[x(`bordered`,[S(`border`,`
 right: 0;
 `)])]),x(`right-placement`,`
 justify-content: flex-start;
 `,[x(`bordered`,[S(`border`,`
 left: 0;
 `)]),x(`collapsed`,[z(`layout-toggle-button`,[z(`base-icon`,`
 transform: rotate(180deg);
 `)]),z(`layout-toggle-bar`,[u(`&:hover`,[S(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),S(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),z(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[z(`base-icon`,`
 transform: rotate(0);
 `)]),z(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[u(`&:hover`,[S(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),S(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),x(`collapsed`,[z(`layout-toggle-bar`,[u(`&:hover`,[S(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),S(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),z(`layout-toggle-button`,[z(`base-icon`,`
 transform: rotate(0);
 `)])]),z(`layout-toggle-button`,`
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
 `,[z(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),z(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[S(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),S(`bottom`,`
 position: absolute;
 top: 34px;
 `),u(`&:hover`,[S(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),S(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),S(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),u(`&:hover`,[S(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),S(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),z(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),x(`show-content`,[z(`layout-sider-scroll-container`,{opacity:1})]),x(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),Ze=H({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return i(`div`,{onClick:this.onClick,class:`${e}-layout-toggle-bar`},i(`div`,{class:`${e}-layout-toggle-bar__top`}),i(`div`,{class:`${e}-layout-toggle-bar__bottom`}))}}),Qe=H({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return i(`div`,{class:`${e}-layout-toggle-button`,onClick:this.onClick},i(m,{clsPrefix:e},{default:()=>i(_e,null)}))}}),$e={position:Be,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},et=H({name:`LayoutSider`,props:Object.assign(Object.assign({},n.props),$e),setup(t){let r=_(Ue),i=e(null),a=e(null),o=e(t.defaultCollapsed),s=q(B(t,`collapsed`),o),c=R(()=>J(s.value?t.collapsedWidth:t.width)),u=R(()=>t.collapseMode===`transform`?{minWidth:J(t.width)}:{}),d=R(()=>r?r.siderPlacement:`left`);function f(e,n){if(t.nativeScrollbar){let{value:t}=i;t&&(n===void 0?t.scrollTo(e):t.scrollTo(e,n))}else{let{value:t}=a;t&&t.scrollTo(e,n)}}function p(){let{"onUpdate:collapsed":e,onUpdateCollapsed:n,onExpand:r,onCollapse:i}=t,{value:a}=s;n&&g(n,!a),e&&g(e,!a),o.value=!a,a?r&&g(r):i&&g(i)}let m=0,h=0,v=e=>{var n;let r=e.target;m=r.scrollLeft,h=r.scrollTop,(n=t.onScroll)==null||n.call(t,e)};ne(()=>{if(t.nativeScrollbar){let e=i.value;e&&(e.scrollTop=h,e.scrollLeft=m)}}),l(ze,{collapsedRef:s,collapseModeRef:B(t,`collapseMode`)});let{mergedClsPrefixRef:y,inlineThemeDisabled:b}=A(t),x=n(`Layout`,`-layout-sider`,Xe,Re,t,y);function S(e){var n,r;e.propertyName===`max-width`&&(s.value?(n=t.onAfterLeave)==null||n.call(t):(r=t.onAfterEnter)==null||r.call(t))}let C={scrollTo:f},w=R(()=>{let{common:{cubicBezierEaseInOut:e},self:n}=x.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":e,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return t.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),T=b?O(`layout-sider`,R(()=>t.inverted?`a`:`b`),w,t):void 0;return Object.assign({scrollableElRef:i,scrollbarInstRef:a,mergedClsPrefix:y,mergedTheme:x,styleMaxWidth:c,mergedCollapsed:s,scrollContainerStyle:u,siderPlacement:d,handleNativeElScroll:v,handleTransitionend:S,handleTriggerClick:p,inlineThemeDisabled:b,cssVars:w,themeClass:T?.themeClass,onRender:T?.onRender},C)},render(){var e;let{mergedClsPrefix:t,mergedCollapsed:n,showTrigger:r}=this;return(e=this.onRender)==null||e.call(this),i(`aside`,{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,n&&`${t}-layout-sider--collapsed`,(!n||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:J(this.width)}]},this.nativeScrollbar?i(`div`,{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:`auto`},this.contentStyle],ref:`scrollableElRef`},this.$slots):i(j,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),this.$slots),r?i(r===`bar`?Ze:Qe,{clsPrefix:t,class:n?this.collapsedTriggerClass:this.triggerClass,style:n?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?i(`div`,{class:`${t}-layout-sider__border`}):null)}}),Q=F(`n-menu`),tt=F(`n-submenu`),nt=F(`n-menu-item-group`),rt=[u(`&::before`,`background-color: var(--n-item-color-hover);`),S(`arrow`,`
 color: var(--n-arrow-color-hover);
 `),S(`icon`,`
 color: var(--n-item-icon-color-hover);
 `),z(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover);
 `,[u(`a`,`
 color: var(--n-item-text-color-hover);
 `),S(`extra`,`
 color: var(--n-item-text-color-hover);
 `)])],it=[S(`icon`,`
 color: var(--n-item-icon-color-hover-horizontal);
 `),z(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover-horizontal);
 `,[u(`a`,`
 color: var(--n-item-text-color-hover-horizontal);
 `),S(`extra`,`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],at=u([z(`menu`,`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[x(`horizontal`,`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[z(`submenu`,`margin: 0;`),z(`menu-item`,`margin: 0;`),z(`menu-item-content`,`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[u(`&::before`,`display: none;`),x(`selected`,`border-bottom: 2px solid var(--n-border-color-horizontal)`)]),z(`menu-item-content`,[x(`selected`,[S(`icon`,`color: var(--n-item-icon-color-active-horizontal);`),z(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-horizontal);
 `,[u(`a`,`color: var(--n-item-text-color-active-horizontal);`),S(`extra`,`color: var(--n-item-text-color-active-horizontal);`)])]),x(`child-active`,`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[z(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[u(`a`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `),S(`extra`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),S(`icon`,`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),C(`disabled`,[C(`selected, child-active`,[u(`&:focus-within`,it)]),x(`selected`,[$(null,[S(`icon`,`color: var(--n-item-icon-color-active-hover-horizontal);`),z(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[u(`a`,`color: var(--n-item-text-color-active-hover-horizontal);`),S(`extra`,`color: var(--n-item-text-color-active-hover-horizontal);`)])])]),x(`child-active`,[$(null,[S(`icon`,`color: var(--n-item-icon-color-child-active-hover-horizontal);`),z(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[u(`a`,`color: var(--n-item-text-color-child-active-hover-horizontal);`),S(`extra`,`color: var(--n-item-text-color-child-active-hover-horizontal);`)])])]),$(`border-bottom: 2px solid var(--n-border-color-horizontal);`,it)]),z(`menu-item-content-header`,[u(`a`,`color: var(--n-item-text-color-horizontal);`)])])]),C(`responsive`,[z(`menu-item-content-header`,`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),x(`collapsed`,[z(`menu-item-content`,[x(`selected`,[u(`&::before`,`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),z(`menu-item-content-header`,`opacity: 0;`),S(`arrow`,`opacity: 0;`),S(`icon`,`color: var(--n-item-icon-color-collapsed);`)])]),z(`menu-item`,`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),z(`menu-item-content`,`
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
 `,[u(`> *`,`z-index: 1;`),u(`&::before`,`
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
 `),x(`disabled`,`
 opacity: .45;
 cursor: not-allowed;
 `),x(`collapsed`,[S(`arrow`,`transform: rotate(0);`)]),x(`selected`,[u(`&::before`,`background-color: var(--n-item-color-active);`),S(`arrow`,`color: var(--n-arrow-color-active);`),S(`icon`,`color: var(--n-item-icon-color-active);`),z(`menu-item-content-header`,`
 color: var(--n-item-text-color-active);
 `,[u(`a`,`color: var(--n-item-text-color-active);`),S(`extra`,`color: var(--n-item-text-color-active);`)])]),x(`child-active`,[z(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active);
 `,[u(`a`,`
 color: var(--n-item-text-color-child-active);
 `),S(`extra`,`
 color: var(--n-item-text-color-child-active);
 `)]),S(`arrow`,`
 color: var(--n-arrow-color-child-active);
 `),S(`icon`,`
 color: var(--n-item-icon-color-child-active);
 `)]),C(`disabled`,[C(`selected, child-active`,[u(`&:focus-within`,rt)]),x(`selected`,[$(null,[S(`arrow`,`color: var(--n-arrow-color-active-hover);`),S(`icon`,`color: var(--n-item-icon-color-active-hover);`),z(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover);
 `,[u(`a`,`color: var(--n-item-text-color-active-hover);`),S(`extra`,`color: var(--n-item-text-color-active-hover);`)])])]),x(`child-active`,[$(null,[S(`arrow`,`color: var(--n-arrow-color-child-active-hover);`),S(`icon`,`color: var(--n-item-icon-color-child-active-hover);`),z(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover);
 `,[u(`a`,`color: var(--n-item-text-color-child-active-hover);`),S(`extra`,`color: var(--n-item-text-color-child-active-hover);`)])])]),x(`selected`,[$(null,[u(`&::before`,`background-color: var(--n-item-color-active-hover);`)])]),$(null,rt)]),S(`icon`,`
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
 `),S(`arrow`,`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),z(`menu-item-content-header`,`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[u(`a`,`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[u(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),S(`extra`,`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),z(`submenu`,`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[z(`menu-item-content`,`
 height: var(--n-item-height);
 `),z(`submenu-children`,`
 overflow: hidden;
 padding: 0;
 `,[Se({duration:`.2s`})])]),z(`menu-item-group`,[z(`menu-item-group-title`,`
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
 `)])]),z(`menu-tooltip`,[u(`a`,`
 color: inherit;
 text-decoration: none;
 `)]),z(`menu-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function $(e,t){return[x(`hover`,e,t),u(`&:hover`,e,t)]}var ot=H({name:`MenuOptionContent`,props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){let{props:t}=_(Q);return{menuProps:t,style:R(()=>{let{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:R(()=>{let{maxIconSize:t,activeIconSize:n,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){let{clsPrefix:e,tmNode:t,menuProps:{renderIcon:n,renderLabel:r,renderExtra:a,expandIcon:o}}=this,s=n?n(t.rawNode):Y(this.icon);return i(`div`,{onClick:e=>{var t;(t=this.onClick)==null||t.call(this,e)},role:`none`,class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},s&&i(`div`,{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:`none`},[s]),i(`div`,{class:`${e}-menu-item-content-header`,role:`none`},this.isEllipsisPlaceholder?this.title:r?r(t.rawNode):Y(this.title),this.extra||a?i(`span`,{class:`${e}-menu-item-content-header__extra`},` `,a?a(t.rawNode):Y(this.extra)):null),this.showArrow?i(m,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>o?o(t.rawNode):i(ke,null)}):null)}}),st=8;function ct(e){let t=_(Q),{props:n,mergedCollapsedRef:r}=t,i=_(tt,null),a=_(nt,null),o=R(()=>n.mode===`horizontal`),s=R(()=>o.value?n.dropdownPlacement:`tmNodes`in e?`right-start`:`right`),c=R(()=>Math.max(n.collapsedIconSize??n.iconSize,n.iconSize));return{dropdownPlacement:s,activeIconSize:R(()=>!o.value&&e.root&&r.value?n.collapsedIconSize??n.iconSize:n.iconSize),maxIconSize:c,paddingLeft:R(()=>{if(o.value)return;let{collapsedWidth:t,indent:s,rootIndent:l}=n,{root:u,isGroup:d}=e,f=l===void 0?s:l;return u?r.value?t/2-c.value/2:f:a&&typeof a.paddingLeftRef.value==`number`?s/2+a.paddingLeftRef.value:i&&typeof i.paddingLeftRef.value==`number`?(d?s/2:s)+i.paddingLeftRef.value:0}),iconMarginRight:R(()=>{let{collapsedWidth:t,indent:i,rootIndent:a}=n,{value:s}=c,{root:l}=e;return o.value||!l||!r.value?st:(a===void 0?i:a)+s+st-(t+s)/2}),NMenu:t,NSubmenu:i,NMenuOptionGroup:a}}var lt={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},ut=H({name:`MenuDivider`,setup(){let{mergedClsPrefixRef:e,isHorizontalRef:t}=_(Q);return()=>t.value?null:i(`div`,{class:`${e.value}-menu-divider`})}}),dt=Object.assign(Object.assign({},lt),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),ft=U(dt),pt=H({name:`MenuOption`,props:dt,setup(e){let t=ct(e),{NSubmenu:n,NMenu:r,NMenuOptionGroup:i}=t,{props:a,mergedClsPrefixRef:o,mergedCollapsedRef:s}=r,c=n?n.mergedDisabledRef:i?i.mergedDisabledRef:{value:!1},l=R(()=>c.value||e.disabled);function u(t){let{onClick:n}=e;n&&n(t)}function d(t){l.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),u(t))}return{mergedClsPrefix:o,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:a,dropdownEnabled:p(()=>e.root&&s.value&&a.mode!==`horizontal`&&!l.value),selected:p(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:l,handleClick:d}},render(){let{mergedClsPrefix:e,mergedTheme:t,tmNode:n,menuProps:{renderLabel:r,nodeProps:a}}=this,o=a?.(n.rawNode);return i(`div`,Object.assign({},o,{role:`menuitem`,class:[`${e}-menu-item`,o?.class]}),i(ge,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:`hover`,placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:[`menu-tooltip`]},{default:()=>r?r(n.rawNode):Y(this.title),trigger:()=>i(ot,{tmNode:n,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),mt=Object.assign(Object.assign({},lt),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),ht=U(mt),gt=H({name:`MenuOptionGroup`,props:mt,setup(e){let t=ct(e),{NSubmenu:n}=t,r=R(()=>n?.mergedDisabledRef.value?!0:e.tmNode.disabled);l(nt,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:r});let{mergedClsPrefixRef:a,props:o}=_(Q);return function(){let{value:n}=a,r=t.paddingLeft.value,{nodeProps:s}=o,c=s?.(e.tmNode.rawNode);return i(`div`,{class:`${n}-menu-item-group`,role:`group`},i(`div`,Object.assign({},c,{class:[`${n}-menu-item-group-title`,c?.class],style:[c?.style||``,r===void 0?``:`padding-left: ${r}px;`]}),Y(e.title),e.extra?i(re,null,` `,Y(e.extra)):null),i(`div`,null,e.tmNodes.map(e=>yt(e,o))))}}});function _t(e){return e.type===`divider`||e.type===`render`}function vt(e){return e.type===`divider`}function yt(e,t){let{rawNode:n}=e,{show:r}=n;if(r===!1)return null;if(_t(n))return vt(n)?i(ut,Object.assign({key:e.key},n.props)):null;let{labelField:a}=t,{key:o,level:s,isGroup:c}=e,l=Object.assign(Object.assign({},n),{title:n.title||n[a],extra:n.titleExtra||n.extra,key:o,internalKey:o,level:s,root:s===0,isGroup:c});return e.children?e.isGroup?i(gt,K(l,ht,{tmNode:e,tmNodes:e.children,key:o})):i(St,K(l,xt,{key:o,rawNodes:n[t.childrenField],tmNodes:e.children,tmNode:e})):i(pt,K(l,ft,{key:o,tmNode:e}))}var bt=Object.assign(Object.assign({},lt),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),xt=U(bt),St=H({name:`Submenu`,props:bt,setup(t){let n=ct(t),{NMenu:r,NSubmenu:i}=n,{props:a,mergedCollapsedRef:o,mergedThemeRef:s}=r,c=R(()=>{let{disabled:e}=t;return i?.mergedDisabledRef.value||a.disabled?!0:e}),u=e(!1);l(tt,{paddingLeftRef:n.paddingLeft,mergedDisabledRef:c}),l(nt,null);function d(){let{onClick:e}=t;e&&e()}function f(){c.value||(o.value||r.toggleExpand(t.internalKey),d())}function m(e){u.value=e}return{menuProps:a,mergedTheme:s,doSelect:r.doSelect,inverted:r.invertedRef,isHorizontal:r.isHorizontalRef,mergedClsPrefix:r.mergedClsPrefixRef,maxIconSize:n.maxIconSize,activeIconSize:n.activeIconSize,iconMarginRight:n.iconMarginRight,dropdownPlacement:n.dropdownPlacement,dropdownShow:u,paddingLeft:n.paddingLeft,mergedDisabled:c,mergedValue:r.mergedValueRef,childActive:p(()=>t.virtualChildActive??r.activePathRef.value.includes(t.internalKey)),collapsed:R(()=>a.mode===`horizontal`?!1:o.value?!0:!r.mergedExpandedKeysRef.value.includes(t.internalKey)),dropdownEnabled:R(()=>!c.value&&(a.mode===`horizontal`||o.value)),handlePopoverShowChange:m,handleClick:f}},render(){let{mergedClsPrefix:e,menuProps:{renderIcon:t,renderLabel:n}}=this,r=()=>{let{isHorizontal:e,paddingLeft:t,collapsed:n,mergedDisabled:r,maxIconSize:a,activeIconSize:o,title:s,childActive:c,icon:l,handleClick:u,menuProps:{nodeProps:d},dropdownShow:f,iconMarginRight:p,tmNode:m,mergedClsPrefix:h,isEllipsisPlaceholder:g,extra:_}=this,v=d?.(m.rawNode);return i(`div`,Object.assign({},v,{class:[`${h}-menu-item`,v?.class],role:`menuitem`}),i(ot,{tmNode:m,paddingLeft:t,collapsed:n,disabled:r,iconMarginRight:p,maxIconSize:a,activeIconSize:o,title:s,extra:_,showArrow:!e,childActive:c,clsPrefix:h,icon:l,hover:f,onClick:u,isEllipsisPlaceholder:g}))},a=()=>i(le,null,{default:()=>{let{tmNodes:t,collapsed:n}=this;return n?null:i(`div`,{class:`${e}-submenu-children`,role:`menu`},t.map(e=>yt(e,this.menuProps)))}});return this.root?i(ve,Object.assign({size:`large`,trigger:`hover`},this.menuProps?.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:`14px`,optionIconSizeLarge:`18px`},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:n}),{default:()=>i(`div`,{class:`${e}-submenu`,role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},r(),this.isHorizontal?null:a())}):i(`div`,{class:`${e}-submenu`,role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},r(),a())}}),Ct=H({name:`Menu`,inheritAttrs:!1,props:Object.assign(Object.assign({},n.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},disabledField:{type:String,default:`disabled`},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:`vertical`},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:`bottom`},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),setup(t){let{mergedClsPrefixRef:r,inlineThemeDisabled:a}=A(t),o=n(`Menu`,`-menu`,at,Ce,t,r),s=_(ze,null),u=R(()=>{let{collapsed:e}=t;if(e!==void 0)return e;if(s){let{collapseModeRef:e,collapsedRef:t}=s;if(e.value===`width`)return t.value??!1}return!1}),d=R(()=>{let{keyField:e,childrenField:n,disabledField:r}=t;return G(t.items||t.options,{getIgnored(e){return _t(e)},getChildren(e){return e[n]},getDisabled(e){return e[r]},getKey(t){return t[e]??t.name}})}),f=R(()=>new Set(d.value.treeNodes.map(e=>e.key))),{watchProps:p}=t,m=e(null);p?.includes(`defaultValue`)?c(()=>{m.value=t.defaultValue}):m.value=t.defaultValue;let h=q(B(t,`value`),m),v=e([]),y=()=>{v.value=t.defaultExpandAll?d.value.getNonLeafKeys():t.defaultExpandedNames||t.defaultExpandedKeys||d.value.getPath(h.value,{includeSelf:!1}).keyPath};p?.includes(`defaultExpandedKeys`)?c(y):y();let b=pe(t,[`expandedNames`,`expandedKeys`]),x=q(b,v),S=R(()=>d.value.treeNodes),C=R(()=>d.value.getPath(h.value).keyPath);l(Q,{props:t,mergedCollapsedRef:u,mergedThemeRef:o,mergedValueRef:h,mergedExpandedKeysRef:x,activePathRef:C,mergedClsPrefixRef:r,isHorizontalRef:R(()=>t.mode===`horizontal`),invertedRef:B(t,`inverted`),doSelect:w,toggleExpand:ee});function w(e,n){let{"onUpdate:value":r,onUpdateValue:i,onSelect:a}=t;i&&g(i,e,n),r&&g(r,e,n),a&&g(a,e,n),m.value=e}function T(e){let{"onUpdate:expandedKeys":n,onUpdateExpandedKeys:r,onExpandedNamesChange:i,onOpenNamesChange:a}=t;n&&g(n,e),r&&g(r,e),i&&g(i,e),a&&g(a,e),v.value=e}function ee(e){let n=Array.from(x.value),r=n.findIndex(t=>t===e);if(~r)n.splice(r,1);else{if(t.accordion&&f.value.has(e)){let e=n.findIndex(e=>f.value.has(e));e>-1&&n.splice(e,1)}n.push(e)}T(n)}let E=e=>{let n=d.value.getPath(e??h.value,{includeSelf:!1}).keyPath;if(!n.length)return;let r=Array.from(x.value),i=new Set([...r,...n]);t.accordion&&f.value.forEach(e=>{i.has(e)&&!n.includes(e)&&i.delete(e)}),T(Array.from(i))},D=R(()=>{let{inverted:e}=t,{common:{cubicBezierEaseInOut:n},self:r}=o.value,{borderRadius:i,borderColorHorizontal:a,fontSize:s,itemHeight:c,dividerColor:l}=r,u={"--n-divider-color":l,"--n-bezier":n,"--n-font-size":s,"--n-border-color-horizontal":a,"--n-border-radius":i,"--n-item-height":c};return e?(u[`--n-group-text-color`]=r.groupTextColorInverted,u[`--n-color`]=r.colorInverted,u[`--n-item-text-color`]=r.itemTextColorInverted,u[`--n-item-text-color-hover`]=r.itemTextColorHoverInverted,u[`--n-item-text-color-active`]=r.itemTextColorActiveInverted,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHoverInverted,u[`--n-item-icon-color`]=r.itemIconColorInverted,u[`--n-item-icon-color-hover`]=r.itemIconColorHoverInverted,u[`--n-item-icon-color-active`]=r.itemIconColorActiveInverted,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHoverInverted,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActiveInverted,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHoverInverted,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsedInverted,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontalInverted,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontalInverted,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontalInverted,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontalInverted,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontalInverted,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontalInverted,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontalInverted,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontalInverted,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontalInverted,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontalInverted,u[`--n-arrow-color`]=r.arrowColorInverted,u[`--n-arrow-color-hover`]=r.arrowColorHoverInverted,u[`--n-arrow-color-active`]=r.arrowColorActiveInverted,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHoverInverted,u[`--n-arrow-color-child-active`]=r.arrowColorChildActiveInverted,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHoverInverted,u[`--n-item-color-hover`]=r.itemColorHoverInverted,u[`--n-item-color-active`]=r.itemColorActiveInverted,u[`--n-item-color-active-hover`]=r.itemColorActiveHoverInverted,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsedInverted):(u[`--n-group-text-color`]=r.groupTextColor,u[`--n-color`]=r.color,u[`--n-item-text-color`]=r.itemTextColor,u[`--n-item-text-color-hover`]=r.itemTextColorHover,u[`--n-item-text-color-active`]=r.itemTextColorActive,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActive,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveHover,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHover,u[`--n-item-icon-color`]=r.itemIconColor,u[`--n-item-icon-color-hover`]=r.itemIconColorHover,u[`--n-item-icon-color-active`]=r.itemIconColorActive,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHover,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActive,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHover,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsed,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontal,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontal,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontal,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontal,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontal,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontal,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontal,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontal,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontal,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontal,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontal,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontal,u[`--n-arrow-color`]=r.arrowColor,u[`--n-arrow-color-hover`]=r.arrowColorHover,u[`--n-arrow-color-active`]=r.arrowColorActive,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHover,u[`--n-arrow-color-child-active`]=r.arrowColorChildActive,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHover,u[`--n-item-color-hover`]=r.itemColorHover,u[`--n-item-color-active`]=r.itemColorActive,u[`--n-item-color-active-hover`]=r.itemColorActiveHover,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsed),u}),te=a?O(`menu`,R(()=>t.inverted?`a`:`b`),D,t):void 0,k=fe(),j=e(null),M=e(null),N=!0,P=()=>{var e;N?N=!1:(e=j.value)==null||e.sync({showAllItemsBeforeCalculate:!0})};function F(){return document.getElementById(k)}let I=e(-1);function ne(e){I.value=t.options.length-e}function re(e){e||(I.value=-1)}let L=R(()=>{let e=I.value;return{children:e===-1?[]:t.options.slice(e)}}),ie=R(()=>{let{childrenField:e,disabledField:n,keyField:r}=t;return G([L.value],{getIgnored(e){return _t(e)},getChildren(t){return t[e]},getDisabled(e){return e[n]},getKey(e){return e[r]??e.name}})}),z=R(()=>G([{}]).treeNodes[0]);function ae(){if(I.value===-1)return i(St,{root:!0,level:0,key:`__ellpisisGroupPlaceholder__`,internalKey:`__ellpisisGroupPlaceholder__`,title:`···`,tmNode:z.value,domId:k,isEllipsisPlaceholder:!0});let e=ie.value.treeNodes[0],t=C.value;return i(St,{level:0,root:!0,key:`__ellpisisGroup__`,internalKey:`__ellpisisGroup__`,title:`···`,virtualChildActive:!!e.children?.some(e=>t.includes(e.key)),tmNode:e,domId:k,rawNodes:e.rawNode.children||[],tmNodes:e.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:r,controlledExpandedKeys:b,uncontrolledExpanededKeys:v,mergedExpandedKeys:x,uncontrolledValue:m,mergedValue:h,activePath:C,tmNodes:S,mergedTheme:o,mergedCollapsed:u,cssVars:a?void 0:D,themeClass:te?.themeClass,overflowRef:j,counterRef:M,updateCounter:()=>{},onResize:P,onUpdateOverflow:re,onUpdateCount:ne,renderCounter:ae,getCounter:F,onRender:te?.onRender,showOption:E,deriveResponsiveState:P}},render(){let{mergedClsPrefix:e,mode:t,themeClass:n,onRender:r}=this;r?.();let s=()=>this.tmNodes.map(e=>yt(e,this.$props)),c=t===`horizontal`&&this.responsive,l=()=>i(`div`,a(this.$attrs,{role:t===`horizontal`?`menubar`:`menu`,class:[`${e}-menu`,n,`${e}-menu--${t}`,c&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),c?i(de,{ref:`overflowRef`,onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:s,counter:this.renderCounter}):s());return c?i(o,{onResize:this.onResize},{default:l}):l()}}),wt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Tt=H({name:`ArchiveOutline`,render:function(e,t){return s(),w(`svg`,wt,t[0]||=[L(`path`,{d:`M80 152v256a40.12 40.12 0 0 0 40 40h272a40.12 40.12 0 0 0 40-40V152`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),L(`rect`,{x:`48`,y:`64`,width:`416`,height:`80`,rx:`28`,ry:`28`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M320 304l-64 64l-64-64`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 345.89V224`},null,-1)])}}),Et={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Dt=H({name:`CodeSlashOutline`,render:function(e,t){return s(),w(`svg`,Et,t[0]||=[L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M160 368L32 256l128-112`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M352 368l128-112l-128-112`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M304 96l-96 320`},null,-1)])}}),Ot={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},kt=H({name:`CubeOutline`,render:function(e,t){return s(),w(`svg`,Ot,t[0]||=[L(`path`,{d:`M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M69 153.99l187 110l187-110`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 463.99v-200`},null,-1)])}}),At={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},jt=H({name:`DocumentTextOutline`,render:function(e,t){return s(),w(`svg`,At,t[0]||=[L(`path`,{d:`M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),L(`path`,{d:`M256 56v120a32 32 0 0 0 32 32h120`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h160`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 368h160`},null,-1)])}}),Mt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Nt=H({name:`GitNetworkOutline`,render:function(e,t){return s(),w(`svg`,Mt,t[0]||=[se(`<circle cx="128" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="256" cy="416" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 256v112"></path><circle cx="384" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path d="M128 144c0 74.67 68.92 112 128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path d="M384 144c0 74.67-68.92 112-128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>`,6)])}}),Pt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ft=H({name:`GridOutline`,render:function(e,t){return s(),w(`svg`,Pt,t[0]||=[L(`rect`,{x:`48`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),L(`rect`,{x:`288`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),L(`rect`,{x:`48`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),L(`rect`,{x:`288`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),It={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Lt=H({name:`LogOutOutline`,render:function(e,t){return s(),w(`svg`,It,t[0]||=[L(`path`,{d:`M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 336l80-80l-80-80`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 256h256`},null,-1)])}}),Rt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},zt=H({name:`ReaderOutline`,render:function(e,t){return s(),w(`svg`,Rt,t[0]||=[L(`rect`,{x:`96`,y:`48`,width:`320`,height:`416`,rx:`48`,ry:`48`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 128h160`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 208h160`},null,-1),L(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h80`},null,-1)])}}),Bt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Vt=H({name:`SettingsOutline`,render:function(e,t){return s(),w(`svg`,Bt,t[0]||=[L(`path`,{d:`M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Ht={key:0,class:`brand-copy`},Ut={class:`account`},Wt={class:`account-copy`},Gt=H({__name:`AppLayout`,setup(t){let n=Ee(),r=we(),a=De(),o=me(),c=e(window.innerWidth<900);function l(e,t,n){return{label:()=>i(Te,{to:{name:t}},{default:()=>e}),key:t,icon:()=>i(xe,null,{default:()=>i(n)})}}let u=[l(`运行概览`,`dashboard`,Ft),l(`代理编排`,`orchestration`,Nt),l(`配置管理`,`config`,jt),l(`配置能力`,`schema`,Dt),l(`dae 版本`,`versions`,kt),l(`运行日志`,`logs`,zt),l(`配置备份`,`backups`,Tt),l(`安全设置`,`settings`,Vt)],d=R(()=>String(n.name||`dashboard`)),p=R(()=>String(n.meta.title||`kdae-panel`));async function m(){try{await a.logout(),await r.replace({name:`login`})}catch(e){o.error(e instanceof Error?e.message:`退出登录失败`)}}function h(){a.clearSession(),r.replace({name:`login`}),o.warning(`登录会话已过期，请重新登录`)}function g(){window.innerWidth<900&&(c.value=!0)}let _=e(null),v=e(!1);async function b(){try{_.value=await ae(`/api/v1/panel/update`)}catch{_.value=null}}return f(()=>{window.addEventListener(`kdae-panel:auth-expired`,h),window.addEventListener(`resize`,g),b()}),P(()=>{window.removeEventListener(`kdae-panel:auth-expired`,h),window.removeEventListener(`resize`,g)}),(e,t)=>{let n=ue(`RouterView`);return s(),N(T(Ge),{"has-sider":``,class:`app-shell`},{default:y(()=>[E(T(et),{bordered:``,"collapse-mode":`width`,"collapsed-width":64,width:236,collapsed:c.value,"show-trigger":`bar`,onCollapse:t[0]||=e=>c.value=!0,onExpand:t[1]||=e=>c.value=!1},{default:y(()=>[L(`div`,{class:ie([`brand`,{compact:c.value}])},[t[4]||=L(`div`,{class:`brand-mark`},`K`,-1),c.value?M(``,!0):(s(),w(`div`,Ht,[...t[3]||=[L(`strong`,null,`kdae-panel`,-1),L(`span`,null,`零侵入管理面板`,-1)]]))],2),E(T(Ct),{value:d.value,collapsed:c.value,"collapsed-width":64,"collapsed-icon-size":22,options:u},null,8,[`value`,`collapsed`])]),_:1},8,[`collapsed`]),E(T(Ge),null,{default:y(()=>[E(T(Ye),{bordered:``,class:`app-header`},{default:y(()=>[L(`div`,null,[E(T(he),{depth:`3`,class:`eyebrow`},{default:y(()=>[...t[5]||=[W(`KDAE CONTROL PLANE`,-1)]]),_:1}),L(`h1`,null,V(p.value),1)]),L(`div`,Ut,[E(T(Ie),{round:``,size:`small`},{default:y(()=>[W(V(T(a).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),L(`div`,Wt,[L(`strong`,null,V(T(a).user?.username),1),t[6]||=L(`span`,null,`管理员`,-1)]),E(T(te),{quaternary:``,circle:``,title:`退出登录`,onClick:m},{icon:y(()=>[E(T(xe),null,{default:y(()=>[E(T(Lt))]),_:1})]),_:1})])]),_:1}),E(T(Ke),{class:`app-content`,"content-style":`padding: 28px;`},{default:y(()=>[_.value?.updateAvailable&&!v.value?(s(),N(T(be),{key:0,type:`info`,closable:``,class:`update-banner`,onClose:t[2]||=e=>v.value=!0},{default:y(()=>[t[7]||=W(` 面板有新版本 `,-1),L(`strong`,null,V(_.value.latest),1),W(`（当前 `+V(_.value.current)+`）。 在服务器上重新执行一键部署命令即可升级，配置与账号数据都会保留。 `,1),t[8]||=L(`a`,{href:`https://github.com/tuoro/kdae-panel/releases/latest`,target:`_blank`,rel:`noopener`},`查看发布说明`,-1)]),_:1})):M(``,!0),E(n)]),_:1})]),_:1})]),_:1})}}});export{Gt as default};