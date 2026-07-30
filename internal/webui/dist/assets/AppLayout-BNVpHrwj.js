import{$t as e,A as t,At as n,Bn as r,Ct as i,Dt as a,En as o,Et as s,Hn as c,In as l,Jt as u,Ln as d,Mn as f,Mt as p,On as m,Pn as h,Pt as g,Qt as _,Rt as v,Sn as y,St as b,T as x,Un as S,Wn as C,Xt as w,Zt as T,_ as E,_n as D,a as ee,bn as O,cr as k,en as A,er as j,f as M,ft as N,gn as P,hn as F,i as I,ir as L,j as R,jt as te,k as ne,mn as z,o as re,or as B,pt as V,qt as H,sr as ie,tn as ae,un as U,vn as W,wn as G,x as oe,xn as K,xt as se,y as ce,yn as le,yt as ue}from"./client-BNTVmNnN.js";import{r as de,t as fe}from"./create-CZjQqUSJ.js";import{t as pe}from"./misc-DDs3MKLt.js";import{r as q}from"./light-Ckkg8noG.js";import{a as J,i as me,n as he,r as Y,t as ge}from"./text-Dp6d97Hj.js";import{n as _e,r as ve,t as ye}from"./Dropdown-D7rzHfgt.js";import{n as be}from"./Tag-DqVqVF6S.js";import{t as xe}from"./Alert-B5f1d_Xy.js";import{t as X}from"./Icon-DVYmz0Cw.js";import{t as Se}from"./composables-CdEMSQmV.js";import{P as Z,S as Ce,c as we,i as Te,n as Ee,r as De,t as Oe,x as ke}from"./index-DwxMOWIr.js";import{t as Ae}from"./CloudDownloadOutline-TwcuZWLR.js";var je=y({name:`ChevronDownFilled`,render(){return G(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},G(`path`,{d:`M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z`,fill:`currentColor`}))}}),Me=te&&`loading`in document.createElement(`img`);function Ne(e={}){let{root:t=null}=e;return{hash:`${e.rootMargin||`0px 0px 0px 0px`}-${Array.isArray(e.threshold)?e.threshold.join(`,`):e.threshold??`0`}`,options:Object.assign(Object.assign({},e),{root:(typeof t==`string`?document.querySelector(t):t)||document.documentElement})}}var Pe=new WeakMap,Fe=new WeakMap,Ie=new WeakMap,Le=(e,t,n)=>{if(!e)return()=>{};let r=Ne(t),{root:i}=r.options,a,o=Pe.get(i);o?a=o:(a=new Map,Pe.set(i,a));let s,c;a.has(r.hash)?(c=a.get(r.hash),c[1].has(e)||(s=c[0],c[1].add(e),s.observe(e))):(s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=Fe.get(e.target),n=Ie.get(e.target);t&&t(),n&&(n.value=!0)}})},r.options),s.observe(e),c=[s,new Set([e])],a.set(r.hash,c));let l=!1,u=()=>{l||(Fe.delete(e),Ie.delete(e),l=!0,c[1].has(e)&&(c[0].unobserve(e),c[1].delete(e)),c[1].size<=0&&a.delete(r.hash),a.size||Pe.delete(i))};return Fe.set(e,u),Ie.set(e,n),u},Re=p(`n-avatar-group`),ze=u(`avatar`,`
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
`,[A(H(`&`,`--n-merged-color: var(--n-color-modal);`)),ae(H(`&`,`--n-merged-color: var(--n-color-popover);`)),H(`img`,`
 width: 100%;
 height: 100%;
 `),w(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),u(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),w(`text`,`line-height: 1.25`)]),Be=y({name:`Avatar`,props:Object.assign(Object.assign({},R.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=V(t),i=j(!1),a=null,l=j(null),u=j(null),d=()=>{let{value:e}=l;if(e&&(a===null||a!==e.innerHTML)){a=e.innerHTML;let{value:t}=u;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},p=o(Re,null),m=z(()=>{let{size:e}=t;if(e)return e;let{size:n}=p||{};return n||`medium`}),g=R(`Avatar`,`-avatar`,ze,ke,t,n),_=o(be,null),v=z(()=>{if(p)return!0;let{round:e,circle:n}=t;return e!==void 0||n!==void 0?e||n:_?_.roundRef.value:!1}),y=z(()=>p?!0:t.bordered||!1),b=z(()=>{let n=m.value,r=v.value,i=y.value,{color:a}=t,{self:{borderRadius:o,fontSize:s,color:c,border:l,colorModal:u,colorPopover:d},common:{cubicBezierEaseInOut:f}}=g.value,p;return p=typeof n==`number`?`${n}px`:g.value.self[e(`height`,n)],{"--n-font-size":s,"--n-border":i?l:`none`,"--n-border-radius":r?`50%`:o,"--n-color":a||c,"--n-color-modal":a||u,"--n-color-popover":a||d,"--n-bezier":f,"--n-merged-size":`var(--n-avatar-size-override, ${p})`}}),x=r?N(`avatar`,z(()=>{let e=m.value,n=v.value,r=y.value,{color:i}=t,a=``;return e&&(typeof e==`number`?a+=`a${e}`:a+=e[0]),n&&(a+=`b`),r&&(a+=`c`),i&&(a+=s(i)),a}),b,t):void 0,C=j(!t.lazy);h(()=>{if(t.lazy&&t.intersectionObserverOptions){let e,n=S(()=>{e?.(),e=void 0,t.lazy&&(e=Le(u.value,t.intersectionObserverOptions,C))});f(()=>{n(),e?.()})}}),c(()=>t.src||t.imgProps?.src,()=>{i.value=!1});let w=j(!t.lazy);return{textRef:l,selfRef:u,mergedRoundRef:v,mergedClsPrefix:n,fitTextTransform:d,cssVars:r?void 0:b,themeClass:x?.themeClass,onRender:x?.onRender,hasLoadError:i,shouldStartLoading:C,loaded:w,mergedOnError:e=>{if(!C.value)return;i.value=!0;let{onError:n,imgProps:{onError:r}={}}=t;n?.(e),r?.(e)},mergedOnLoad:e=>{let{onLoad:n,imgProps:{onLoad:r}={}}=t;n?.(e),r?.(e),w.value=!0}}},render(){var e;let{$slots:t,src:n,mergedClsPrefix:r,lazy:i,onRender:o,loaded:s,hasLoadError:c,imgProps:l={}}=this;o?.();let u,d=!s&&!c&&(this.renderPlaceholder?this.renderPlaceholder():(e=this.$slots).placeholder?.call(e));return u=this.hasLoadError?this.renderFallback?this.renderFallback():ue(t.fallback,()=>[G(`img`,{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):se(t.default,e=>{if(e)return G(a,{onResize:this.fitTextTransform},{default:()=>G(`span`,{ref:`textRef`,class:`${r}-avatar__text`},e)});if(n||l.src){let e=this.src||l.src;return G(`img`,Object.assign(Object.assign({},l),{loading:Me&&!this.intersectionObserverOptions&&i?`lazy`:`eager`,src:i&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[l.style||``,{objectFit:this.objectFit},d?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]}))}}),G(`span`,{ref:`selfRef`,class:[`${r}-avatar`,this.themeClass],style:this.cssVars},u,i&&d)}});function Ve(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:o,scrollbarColor:s,scrollbarColorHover:c,invertedColor:l}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:o,headerColor:i,headerColorInverted:l,footerColor:o,footerColorInverted:l,headerBorderColor:a,headerBorderColorInverted:l,footerBorderColor:a,footerBorderColorInverted:l,siderBorderColor:a,siderBorderColorInverted:l,siderColor:i,siderColorInverted:l,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:v(r,s),siderToggleBarColorHover:v(r,c),__invertScrollbar:`true`}}var He=t({name:`Layout`,common:oe,peers:{Scrollbar:ce},self:Ve}),Ue=p(`n-layout-sider`),We={type:String,default:`static`},Ge=u(`layout`,`
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
`,[u(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),T(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),Ke={embedded:Boolean,position:We,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},qe=p(`n-layout`);function Je(e){return y({name:e?`LayoutContent`:`Layout`,props:Object.assign(Object.assign({},R.props),Ke),setup(e){let t=j(null),r=j(null),{mergedClsPrefixRef:i,inlineThemeDisabled:a}=V(e),o=R(`Layout`,`-layout`,Ge,He,e,i);function s(n,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(n):e.scrollTo(n,i))}else{let{value:e}=r;e&&e.scrollTo(n,i)}}d(qe,e);let c=0,l=0,u=t=>{var n;let r=t.target;c=r.scrollLeft,l=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};n(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=l,e.scrollLeft=c)}});let f={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},p={scrollTo:s},m=z(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),h=a?N(`layout`,z(()=>e.embedded?`e`:``),m,e):void 0;return Object.assign({mergedClsPrefix:i,scrollableElRef:t,scrollbarInstRef:r,hasSiderStyle:f,mergedTheme:o,handleNativeElScroll:u,cssVars:a?void 0:m,themeClass:h?.themeClass,onRender:h?.onRender},p)},render(){var t;let{mergedClsPrefix:n,hasSider:r}=this;(t=this.onRender)==null||t.call(this);let i=r?this.hasSiderStyle:void 0;return G(`div`,{class:[this.themeClass,e&&`${n}-layout-content`,`${n}-layout`,`${n}-layout--${this.position}-positioned`],style:this.cssVars},this.nativeScrollbar?G(`div`,{ref:`scrollableElRef`,class:[`${n}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,i],onScroll:this.handleNativeElScroll},this.$slots):G(E,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,i]}),this.$slots))}})}var Ye=Je(!1),Xe=Je(!0),Ze=u(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[T(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),T(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),Qe={position:We,inverted:Boolean,bordered:{type:Boolean,default:!1}},$e=y({name:`LayoutHeader`,props:Object.assign(Object.assign({},R.props),Qe),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=V(e),r=R(`Layout`,`-layout-header`,Ze,He,e,t),i=z(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?N(`layout-header`,z(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){var e;let{mergedClsPrefix:t}=this;return(e=this.onRender)==null||e.call(this),G(`div`,{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),et=u(`layout-sider`,`
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
`,[T(`bordered`,[w(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),w(`left-placement`,[T(`bordered`,[w(`border`,`
 right: 0;
 `)])]),T(`right-placement`,`
 justify-content: flex-start;
 `,[T(`bordered`,[w(`border`,`
 left: 0;
 `)]),T(`collapsed`,[u(`layout-toggle-button`,[u(`base-icon`,`
 transform: rotate(180deg);
 `)]),u(`layout-toggle-bar`,[H(`&:hover`,[w(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),w(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),u(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[u(`base-icon`,`
 transform: rotate(0);
 `)]),u(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[H(`&:hover`,[w(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),w(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),T(`collapsed`,[u(`layout-toggle-bar`,[H(`&:hover`,[w(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),w(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),u(`layout-toggle-button`,[u(`base-icon`,`
 transform: rotate(0);
 `)])]),u(`layout-toggle-button`,`
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
 `,[u(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),u(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[w(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),w(`bottom`,`
 position: absolute;
 top: 34px;
 `),H(`&:hover`,[w(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),w(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),w(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),H(`&:hover`,[w(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),w(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),u(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),T(`show-content`,[u(`layout-sider-scroll-container`,{opacity:1})]),T(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),tt=y({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return G(`div`,{onClick:this.onClick,class:`${e}-layout-toggle-bar`},G(`div`,{class:`${e}-layout-toggle-bar__top`}),G(`div`,{class:`${e}-layout-toggle-bar__bottom`}))}}),nt=y({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return G(`div`,{class:`${e}-layout-toggle-button`,onClick:this.onClick},G(ne,{clsPrefix:e},{default:()=>G(ve,null)}))}}),rt={position:We,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},it=y({name:`LayoutSider`,props:Object.assign(Object.assign({},R.props),rt),setup(e){let t=o(qe),r=j(null),a=j(null),s=j(e.defaultCollapsed),c=J(L(e,`collapsed`),s),l=z(()=>Y(c.value?e.collapsedWidth:e.width)),u=z(()=>e.collapseMode===`transform`?{minWidth:Y(e.width)}:{}),f=z(()=>t?t.siderPlacement:`left`);function p(t,n){if(e.nativeScrollbar){let{value:e}=r;e&&(n===void 0?e.scrollTo(t):e.scrollTo(t,n))}else{let{value:e}=a;e&&e.scrollTo(t,n)}}function m(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:a}=e,{value:o}=c;n&&i(n,!o),t&&i(t,!o),s.value=!o,o?r&&i(r):a&&i(a)}let h=0,g=0,_=t=>{var n;let r=t.target;h=r.scrollLeft,g=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};n(()=>{if(e.nativeScrollbar){let e=r.value;e&&(e.scrollTop=g,e.scrollLeft=h)}}),d(Ue,{collapsedRef:c,collapseModeRef:L(e,`collapseMode`)});let{mergedClsPrefixRef:v,inlineThemeDisabled:y}=V(e),b=R(`Layout`,`-layout-sider`,et,He,e,v);function x(t){var n,r;t.propertyName===`max-width`&&(c.value?(n=e.onAfterLeave)==null||n.call(e):(r=e.onAfterEnter)==null||r.call(e))}let S={scrollTo:p},C=z(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=b.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),w=y?N(`layout-sider`,z(()=>e.inverted?`a`:`b`),C,e):void 0;return Object.assign({scrollableElRef:r,scrollbarInstRef:a,mergedClsPrefix:v,mergedTheme:b,styleMaxWidth:l,mergedCollapsed:c,scrollContainerStyle:u,siderPlacement:f,handleNativeElScroll:_,handleTransitionend:x,handleTriggerClick:m,inlineThemeDisabled:y,cssVars:C,themeClass:w?.themeClass,onRender:w?.onRender},S)},render(){var e;let{mergedClsPrefix:t,mergedCollapsed:n,showTrigger:r}=this;return(e=this.onRender)==null||e.call(this),G(`aside`,{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,n&&`${t}-layout-sider--collapsed`,(!n||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:Y(this.width)}]},this.nativeScrollbar?G(`div`,{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:`auto`},this.contentStyle],ref:`scrollableElRef`},this.$slots):G(E,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),this.$slots),r?G(r===`bar`?tt:nt,{clsPrefix:t,class:n?this.collapsedTriggerClass:this.triggerClass,style:n?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?G(`div`,{class:`${t}-layout-sider__border`}):null)}}),Q=p(`n-menu`),at=p(`n-submenu`),ot=p(`n-menu-item-group`),st=[H(`&::before`,`background-color: var(--n-item-color-hover);`),w(`arrow`,`
 color: var(--n-arrow-color-hover);
 `),w(`icon`,`
 color: var(--n-item-icon-color-hover);
 `),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover);
 `,[H(`a`,`
 color: var(--n-item-text-color-hover);
 `),w(`extra`,`
 color: var(--n-item-text-color-hover);
 `)])],ct=[w(`icon`,`
 color: var(--n-item-icon-color-hover-horizontal);
 `),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover-horizontal);
 `,[H(`a`,`
 color: var(--n-item-text-color-hover-horizontal);
 `),w(`extra`,`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],lt=H([u(`menu`,`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[T(`horizontal`,`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[u(`submenu`,`margin: 0;`),u(`menu-item`,`margin: 0;`),u(`menu-item-content`,`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[H(`&::before`,`display: none;`),T(`selected`,`border-bottom: 2px solid var(--n-border-color-horizontal)`)]),u(`menu-item-content`,[T(`selected`,[w(`icon`,`color: var(--n-item-icon-color-active-horizontal);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-horizontal);
 `,[H(`a`,`color: var(--n-item-text-color-active-horizontal);`),w(`extra`,`color: var(--n-item-text-color-active-horizontal);`)])]),T(`child-active`,`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[u(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[H(`a`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `),w(`extra`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),w(`icon`,`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),_(`disabled`,[_(`selected, child-active`,[H(`&:focus-within`,ct)]),T(`selected`,[$(null,[w(`icon`,`color: var(--n-item-icon-color-active-hover-horizontal);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[H(`a`,`color: var(--n-item-text-color-active-hover-horizontal);`),w(`extra`,`color: var(--n-item-text-color-active-hover-horizontal);`)])])]),T(`child-active`,[$(null,[w(`icon`,`color: var(--n-item-icon-color-child-active-hover-horizontal);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[H(`a`,`color: var(--n-item-text-color-child-active-hover-horizontal);`),w(`extra`,`color: var(--n-item-text-color-child-active-hover-horizontal);`)])])]),$(`border-bottom: 2px solid var(--n-border-color-horizontal);`,ct)]),u(`menu-item-content-header`,[H(`a`,`color: var(--n-item-text-color-horizontal);`)])])]),_(`responsive`,[u(`menu-item-content-header`,`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),T(`collapsed`,[u(`menu-item-content`,[T(`selected`,[H(`&::before`,`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),u(`menu-item-content-header`,`opacity: 0;`),w(`arrow`,`opacity: 0;`),w(`icon`,`color: var(--n-item-icon-color-collapsed);`)])]),u(`menu-item`,`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),u(`menu-item-content`,`
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
 `,[H(`> *`,`z-index: 1;`),H(`&::before`,`
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
 `),T(`disabled`,`
 opacity: .45;
 cursor: not-allowed;
 `),T(`collapsed`,[w(`arrow`,`transform: rotate(0);`)]),T(`selected`,[H(`&::before`,`background-color: var(--n-item-color-active);`),w(`arrow`,`color: var(--n-arrow-color-active);`),w(`icon`,`color: var(--n-item-icon-color-active);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-active);
 `,[H(`a`,`color: var(--n-item-text-color-active);`),w(`extra`,`color: var(--n-item-text-color-active);`)])]),T(`child-active`,[u(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active);
 `,[H(`a`,`
 color: var(--n-item-text-color-child-active);
 `),w(`extra`,`
 color: var(--n-item-text-color-child-active);
 `)]),w(`arrow`,`
 color: var(--n-arrow-color-child-active);
 `),w(`icon`,`
 color: var(--n-item-icon-color-child-active);
 `)]),_(`disabled`,[_(`selected, child-active`,[H(`&:focus-within`,st)]),T(`selected`,[$(null,[w(`arrow`,`color: var(--n-arrow-color-active-hover);`),w(`icon`,`color: var(--n-item-icon-color-active-hover);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover);
 `,[H(`a`,`color: var(--n-item-text-color-active-hover);`),w(`extra`,`color: var(--n-item-text-color-active-hover);`)])])]),T(`child-active`,[$(null,[w(`arrow`,`color: var(--n-arrow-color-child-active-hover);`),w(`icon`,`color: var(--n-item-icon-color-child-active-hover);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover);
 `,[H(`a`,`color: var(--n-item-text-color-child-active-hover);`),w(`extra`,`color: var(--n-item-text-color-child-active-hover);`)])])]),T(`selected`,[$(null,[H(`&::before`,`background-color: var(--n-item-color-active-hover);`)])]),$(null,st)]),w(`icon`,`
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
 `),w(`arrow`,`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),u(`menu-item-content-header`,`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[H(`a`,`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[H(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),w(`extra`,`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),u(`submenu`,`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[u(`menu-item-content`,`
 height: var(--n-item-height);
 `),u(`submenu-children`,`
 overflow: hidden;
 padding: 0;
 `,[Ce({duration:`.2s`})])]),u(`menu-item-group`,[u(`menu-item-group-title`,`
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
 `)])]),u(`menu-tooltip`,[H(`a`,`
 color: inherit;
 text-decoration: none;
 `)]),u(`menu-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function $(e,t){return[T(`hover`,e,t),H(`&:hover`,e,t)]}var ut=y({name:`MenuOptionContent`,props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){let{props:t}=o(Q);return{menuProps:t,style:z(()=>{let{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:z(()=>{let{maxIconSize:t,activeIconSize:n,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){let{clsPrefix:e,tmNode:t,menuProps:{renderIcon:n,renderLabel:r,renderExtra:i,expandIcon:a}}=this,o=n?n(t.rawNode):Z(this.icon);return G(`div`,{onClick:e=>{var t;(t=this.onClick)==null||t.call(this,e)},role:`none`,class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},o&&G(`div`,{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:`none`},[o]),G(`div`,{class:`${e}-menu-item-content-header`,role:`none`},this.isEllipsisPlaceholder?this.title:r?r(t.rawNode):Z(this.title),this.extra||i?G(`span`,{class:`${e}-menu-item-content-header__extra`},` `,i?i(t.rawNode):Z(this.extra)):null),this.showArrow?G(ne,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>a?a(t.rawNode):G(je,null)}):null)}}),dt=8;function ft(e){let t=o(Q),{props:n,mergedCollapsedRef:r}=t,i=o(at,null),a=o(ot,null),s=z(()=>n.mode===`horizontal`),c=z(()=>s.value?n.dropdownPlacement:`tmNodes`in e?`right-start`:`right`),l=z(()=>Math.max(n.collapsedIconSize??n.iconSize,n.iconSize));return{dropdownPlacement:c,activeIconSize:z(()=>!s.value&&e.root&&r.value?n.collapsedIconSize??n.iconSize:n.iconSize),maxIconSize:l,paddingLeft:z(()=>{if(s.value)return;let{collapsedWidth:t,indent:o,rootIndent:c}=n,{root:u,isGroup:d}=e,f=c===void 0?o:c;return u?r.value?t/2-l.value/2:f:a&&typeof a.paddingLeftRef.value==`number`?o/2+a.paddingLeftRef.value:i&&typeof i.paddingLeftRef.value==`number`?(d?o/2:o)+i.paddingLeftRef.value:0}),iconMarginRight:z(()=>{let{collapsedWidth:t,indent:i,rootIndent:a}=n,{value:o}=l,{root:c}=e;return s.value||!c||!r.value?dt:(a===void 0?i:a)+o+dt-(t+o)/2}),NMenu:t,NSubmenu:i,NMenuOptionGroup:a}}var pt={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},mt=y({name:`MenuDivider`,setup(){let{mergedClsPrefixRef:e,isHorizontalRef:t}=o(Q);return()=>t.value?null:G(`div`,{class:`${e.value}-menu-divider`})}}),ht=Object.assign(Object.assign({},pt),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),gt=b(ht),_t=y({name:`MenuOption`,props:ht,setup(e){let t=ft(e),{NSubmenu:n,NMenu:r,NMenuOptionGroup:i}=t,{props:a,mergedClsPrefixRef:o,mergedCollapsedRef:s}=r,c=n?n.mergedDisabledRef:i?i.mergedDisabledRef:{value:!1},l=z(()=>c.value||e.disabled);function u(t){let{onClick:n}=e;n&&n(t)}function d(t){l.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),u(t))}return{mergedClsPrefix:o,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:a,dropdownEnabled:g(()=>e.root&&s.value&&a.mode!==`horizontal`&&!l.value),selected:g(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:l,handleClick:d}},render(){let{mergedClsPrefix:e,mergedTheme:t,tmNode:n,menuProps:{renderLabel:r,nodeProps:i}}=this,a=i?.(n.rawNode);return G(`div`,Object.assign({},a,{role:`menuitem`,class:[`${e}-menu-item`,a?.class]}),G(_e,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:`hover`,placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:[`menu-tooltip`]},{default:()=>r?r(n.rawNode):Z(this.title),trigger:()=>G(ut,{tmNode:n,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),vt=Object.assign(Object.assign({},pt),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),yt=b(vt),bt=y({name:`MenuOptionGroup`,props:vt,setup(e){let t=ft(e),{NSubmenu:n}=t,r=z(()=>n?.mergedDisabledRef.value?!0:e.tmNode.disabled);d(ot,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:r});let{mergedClsPrefixRef:i,props:a}=o(Q);return function(){let{value:n}=i,r=t.paddingLeft.value,{nodeProps:o}=a,s=o?.(e.tmNode.rawNode);return G(`div`,{class:`${n}-menu-item-group`,role:`group`},G(`div`,Object.assign({},s,{class:[`${n}-menu-item-group-title`,s?.class],style:[s?.style||``,r===void 0?``:`padding-left: ${r}px;`]}),Z(e.title),e.extra?G(U,null,` `,Z(e.extra)):null),G(`div`,null,e.tmNodes.map(e=>Ct(e,a))))}}});function xt(e){return e.type===`divider`||e.type===`render`}function St(e){return e.type===`divider`}function Ct(e,t){let{rawNode:n}=e,{show:r}=n;if(r===!1)return null;if(xt(n))return St(n)?G(mt,Object.assign({key:e.key},n.props)):null;let{labelField:i}=t,{key:a,level:o,isGroup:s}=e,c=Object.assign(Object.assign({},n),{title:n.title||n[i],extra:n.titleExtra||n.extra,key:a,internalKey:a,level:o,root:o===0,isGroup:s});return e.children?e.isGroup?G(bt,q(c,yt,{tmNode:e,tmNodes:e.children,key:a})):G(Et,q(c,Tt,{key:a,rawNodes:n[t.childrenField],tmNodes:e.children,tmNode:e})):G(_t,q(c,gt,{key:a,tmNode:e}))}var wt=Object.assign(Object.assign({},pt),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),Tt=b(wt),Et=y({name:`Submenu`,props:wt,setup(e){let t=ft(e),{NMenu:n,NSubmenu:r}=t,{props:i,mergedCollapsedRef:a,mergedThemeRef:o}=n,s=z(()=>{let{disabled:t}=e;return r?.mergedDisabledRef.value||i.disabled?!0:t}),c=j(!1);d(at,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:s}),d(ot,null);function l(){let{onClick:t}=e;t&&t()}function u(){s.value||(a.value||n.toggleExpand(e.internalKey),l())}function f(e){c.value=e}return{menuProps:i,mergedTheme:o,doSelect:n.doSelect,inverted:n.invertedRef,isHorizontal:n.isHorizontalRef,mergedClsPrefix:n.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:s,mergedValue:n.mergedValueRef,childActive:g(()=>e.virtualChildActive??n.activePathRef.value.includes(e.internalKey)),collapsed:z(()=>i.mode===`horizontal`?!1:a.value?!0:!n.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:z(()=>!s.value&&(i.mode===`horizontal`||a.value)),handlePopoverShowChange:f,handleClick:u}},render(){let{mergedClsPrefix:e,menuProps:{renderIcon:t,renderLabel:n}}=this,r=()=>{let{isHorizontal:e,paddingLeft:t,collapsed:n,mergedDisabled:r,maxIconSize:i,activeIconSize:a,title:o,childActive:s,icon:c,handleClick:l,menuProps:{nodeProps:u},dropdownShow:d,iconMarginRight:f,tmNode:p,mergedClsPrefix:m,isEllipsisPlaceholder:h,extra:g}=this,_=u?.(p.rawNode);return G(`div`,Object.assign({},_,{class:[`${m}-menu-item`,_?.class],role:`menuitem`}),G(ut,{tmNode:p,paddingLeft:t,collapsed:n,disabled:r,iconMarginRight:f,maxIconSize:i,activeIconSize:a,title:o,extra:g,showArrow:!e,childActive:s,clsPrefix:m,icon:c,hover:d,onClick:l,isEllipsisPlaceholder:h}))},i=()=>G(x,null,{default:()=>{let{tmNodes:t,collapsed:n}=this;return n?null:G(`div`,{class:`${e}-submenu-children`,role:`menu`},t.map(e=>Ct(e,this.menuProps)))}});return this.root?G(ye,Object.assign({size:`large`,trigger:`hover`},this.menuProps?.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:`14px`,optionIconSizeLarge:`18px`},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:n}),{default:()=>G(`div`,{class:`${e}-submenu`,role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},r(),this.isHorizontal?null:i())}):G(`div`,{class:`${e}-submenu`,role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},r(),i())}}),Dt=y({name:`Menu`,inheritAttrs:!1,props:Object.assign(Object.assign({},R.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},disabledField:{type:String,default:`disabled`},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:`vertical`},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:`bottom`},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=V(e),r=R(`Menu`,`-menu`,lt,we,e,t),a=o(Ue,null),s=z(()=>{let{collapsed:t}=e;if(t!==void 0)return t;if(a){let{collapseModeRef:e,collapsedRef:t}=a;if(e.value===`width`)return t.value??!1}return!1}),c=z(()=>{let{keyField:t,childrenField:n,disabledField:r}=e;return fe(e.items||e.options,{getIgnored(e){return xt(e)},getChildren(e){return e[n]},getDisabled(e){return e[r]},getKey(e){return e[t]??e.name}})}),l=z(()=>new Set(c.value.treeNodes.map(e=>e.key))),{watchProps:u}=e,f=j(null);u?.includes(`defaultValue`)?S(()=>{f.value=e.defaultValue}):f.value=e.defaultValue;let p=J(L(e,`value`),f),m=j([]),h=()=>{m.value=e.defaultExpandAll?c.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||c.value.getPath(p.value,{includeSelf:!1}).keyPath};u?.includes(`defaultExpandedKeys`)?S(h):h();let g=me(e,[`expandedNames`,`expandedKeys`]),_=J(g,m),v=z(()=>c.value.treeNodes),y=z(()=>c.value.getPath(p.value).keyPath);d(Q,{props:e,mergedCollapsedRef:s,mergedThemeRef:r,mergedValueRef:p,mergedExpandedKeysRef:_,activePathRef:y,mergedClsPrefixRef:t,isHorizontalRef:z(()=>e.mode===`horizontal`),invertedRef:L(e,`inverted`),doSelect:b,toggleExpand:C});function b(t,n){let{"onUpdate:value":r,onUpdateValue:a,onSelect:o}=e;a&&i(a,t,n),r&&i(r,t,n),o&&i(o,t,n),f.value=t}function x(t){let{"onUpdate:expandedKeys":n,onUpdateExpandedKeys:r,onExpandedNamesChange:a,onOpenNamesChange:o}=e;n&&i(n,t),r&&i(r,t),a&&i(a,t),o&&i(o,t),m.value=t}function C(t){let n=Array.from(_.value),r=n.findIndex(e=>e===t);if(~r)n.splice(r,1);else{if(e.accordion&&l.value.has(t)){let e=n.findIndex(e=>l.value.has(e));e>-1&&n.splice(e,1)}n.push(t)}x(n)}let w=t=>{let n=c.value.getPath(t??p.value,{includeSelf:!1}).keyPath;if(!n.length)return;let r=Array.from(_.value),i=new Set([...r,...n]);e.accordion&&l.value.forEach(e=>{i.has(e)&&!n.includes(e)&&i.delete(e)}),x(Array.from(i))},T=z(()=>{let{inverted:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{borderRadius:a,borderColorHorizontal:o,fontSize:s,itemHeight:c,dividerColor:l}=i,u={"--n-divider-color":l,"--n-bezier":n,"--n-font-size":s,"--n-border-color-horizontal":o,"--n-border-radius":a,"--n-item-height":c};return t?(u[`--n-group-text-color`]=i.groupTextColorInverted,u[`--n-color`]=i.colorInverted,u[`--n-item-text-color`]=i.itemTextColorInverted,u[`--n-item-text-color-hover`]=i.itemTextColorHoverInverted,u[`--n-item-text-color-active`]=i.itemTextColorActiveInverted,u[`--n-item-text-color-child-active`]=i.itemTextColorChildActiveInverted,u[`--n-item-text-color-child-active-hover`]=i.itemTextColorChildActiveInverted,u[`--n-item-text-color-active-hover`]=i.itemTextColorActiveHoverInverted,u[`--n-item-icon-color`]=i.itemIconColorInverted,u[`--n-item-icon-color-hover`]=i.itemIconColorHoverInverted,u[`--n-item-icon-color-active`]=i.itemIconColorActiveInverted,u[`--n-item-icon-color-active-hover`]=i.itemIconColorActiveHoverInverted,u[`--n-item-icon-color-child-active`]=i.itemIconColorChildActiveInverted,u[`--n-item-icon-color-child-active-hover`]=i.itemIconColorChildActiveHoverInverted,u[`--n-item-icon-color-collapsed`]=i.itemIconColorCollapsedInverted,u[`--n-item-text-color-horizontal`]=i.itemTextColorHorizontalInverted,u[`--n-item-text-color-hover-horizontal`]=i.itemTextColorHoverHorizontalInverted,u[`--n-item-text-color-active-horizontal`]=i.itemTextColorActiveHorizontalInverted,u[`--n-item-text-color-child-active-horizontal`]=i.itemTextColorChildActiveHorizontalInverted,u[`--n-item-text-color-child-active-hover-horizontal`]=i.itemTextColorChildActiveHoverHorizontalInverted,u[`--n-item-text-color-active-hover-horizontal`]=i.itemTextColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-horizontal`]=i.itemIconColorHorizontalInverted,u[`--n-item-icon-color-hover-horizontal`]=i.itemIconColorHoverHorizontalInverted,u[`--n-item-icon-color-active-horizontal`]=i.itemIconColorActiveHorizontalInverted,u[`--n-item-icon-color-active-hover-horizontal`]=i.itemIconColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-child-active-horizontal`]=i.itemIconColorChildActiveHorizontalInverted,u[`--n-item-icon-color-child-active-hover-horizontal`]=i.itemIconColorChildActiveHoverHorizontalInverted,u[`--n-arrow-color`]=i.arrowColorInverted,u[`--n-arrow-color-hover`]=i.arrowColorHoverInverted,u[`--n-arrow-color-active`]=i.arrowColorActiveInverted,u[`--n-arrow-color-active-hover`]=i.arrowColorActiveHoverInverted,u[`--n-arrow-color-child-active`]=i.arrowColorChildActiveInverted,u[`--n-arrow-color-child-active-hover`]=i.arrowColorChildActiveHoverInverted,u[`--n-item-color-hover`]=i.itemColorHoverInverted,u[`--n-item-color-active`]=i.itemColorActiveInverted,u[`--n-item-color-active-hover`]=i.itemColorActiveHoverInverted,u[`--n-item-color-active-collapsed`]=i.itemColorActiveCollapsedInverted):(u[`--n-group-text-color`]=i.groupTextColor,u[`--n-color`]=i.color,u[`--n-item-text-color`]=i.itemTextColor,u[`--n-item-text-color-hover`]=i.itemTextColorHover,u[`--n-item-text-color-active`]=i.itemTextColorActive,u[`--n-item-text-color-child-active`]=i.itemTextColorChildActive,u[`--n-item-text-color-child-active-hover`]=i.itemTextColorChildActiveHover,u[`--n-item-text-color-active-hover`]=i.itemTextColorActiveHover,u[`--n-item-icon-color`]=i.itemIconColor,u[`--n-item-icon-color-hover`]=i.itemIconColorHover,u[`--n-item-icon-color-active`]=i.itemIconColorActive,u[`--n-item-icon-color-active-hover`]=i.itemIconColorActiveHover,u[`--n-item-icon-color-child-active`]=i.itemIconColorChildActive,u[`--n-item-icon-color-child-active-hover`]=i.itemIconColorChildActiveHover,u[`--n-item-icon-color-collapsed`]=i.itemIconColorCollapsed,u[`--n-item-text-color-horizontal`]=i.itemTextColorHorizontal,u[`--n-item-text-color-hover-horizontal`]=i.itemTextColorHoverHorizontal,u[`--n-item-text-color-active-horizontal`]=i.itemTextColorActiveHorizontal,u[`--n-item-text-color-child-active-horizontal`]=i.itemTextColorChildActiveHorizontal,u[`--n-item-text-color-child-active-hover-horizontal`]=i.itemTextColorChildActiveHoverHorizontal,u[`--n-item-text-color-active-hover-horizontal`]=i.itemTextColorActiveHoverHorizontal,u[`--n-item-icon-color-horizontal`]=i.itemIconColorHorizontal,u[`--n-item-icon-color-hover-horizontal`]=i.itemIconColorHoverHorizontal,u[`--n-item-icon-color-active-horizontal`]=i.itemIconColorActiveHorizontal,u[`--n-item-icon-color-active-hover-horizontal`]=i.itemIconColorActiveHoverHorizontal,u[`--n-item-icon-color-child-active-horizontal`]=i.itemIconColorChildActiveHorizontal,u[`--n-item-icon-color-child-active-hover-horizontal`]=i.itemIconColorChildActiveHoverHorizontal,u[`--n-arrow-color`]=i.arrowColor,u[`--n-arrow-color-hover`]=i.arrowColorHover,u[`--n-arrow-color-active`]=i.arrowColorActive,u[`--n-arrow-color-active-hover`]=i.arrowColorActiveHover,u[`--n-arrow-color-child-active`]=i.arrowColorChildActive,u[`--n-arrow-color-child-active-hover`]=i.arrowColorChildActiveHover,u[`--n-item-color-hover`]=i.itemColorHover,u[`--n-item-color-active`]=i.itemColorActive,u[`--n-item-color-active-hover`]=i.itemColorActiveHover,u[`--n-item-color-active-collapsed`]=i.itemColorActiveCollapsed),u}),E=n?N(`menu`,z(()=>e.inverted?`a`:`b`),T,e):void 0,D=pe(),ee=j(null),O=j(null),k=!0,A=()=>{var e;k?k=!1:(e=ee.value)==null||e.sync({showAllItemsBeforeCalculate:!0})};function M(){return document.getElementById(D)}let P=j(-1);function F(t){P.value=e.options.length-t}function I(e){e||(P.value=-1)}let te=z(()=>{let t=P.value;return{children:t===-1?[]:e.options.slice(t)}}),ne=z(()=>{let{childrenField:t,disabledField:n,keyField:r}=e;return fe([te.value],{getIgnored(e){return xt(e)},getChildren(e){return e[t]},getDisabled(e){return e[n]},getKey(e){return e[r]??e.name}})}),re=z(()=>fe([{}]).treeNodes[0]);function B(){if(P.value===-1)return G(Et,{root:!0,level:0,key:`__ellpisisGroupPlaceholder__`,internalKey:`__ellpisisGroupPlaceholder__`,title:`···`,tmNode:re.value,domId:D,isEllipsisPlaceholder:!0});let e=ne.value.treeNodes[0],t=y.value;return G(Et,{level:0,root:!0,key:`__ellpisisGroup__`,internalKey:`__ellpisisGroup__`,title:`···`,virtualChildActive:!!e.children?.some(e=>t.includes(e.key)),tmNode:e,domId:D,rawNodes:e.rawNode.children||[],tmNodes:e.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:t,controlledExpandedKeys:g,uncontrolledExpanededKeys:m,mergedExpandedKeys:_,uncontrolledValue:f,mergedValue:p,activePath:y,tmNodes:v,mergedTheme:r,mergedCollapsed:s,cssVars:n?void 0:T,themeClass:E?.themeClass,overflowRef:ee,counterRef:O,updateCounter:()=>{},onResize:A,onUpdateOverflow:I,onUpdateCount:F,renderCounter:B,getCounter:M,onRender:E?.onRender,showOption:w,deriveResponsiveState:A}},render(){let{mergedClsPrefix:e,mode:t,themeClass:n,onRender:r}=this;r?.();let i=()=>this.tmNodes.map(e=>Ct(e,this.$props)),o=t===`horizontal`&&this.responsive,s=()=>G(`div`,m(this.$attrs,{role:t===`horizontal`?`menubar`:`menu`,class:[`${e}-menu`,n,`${e}-menu--${t}`,o&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),o?G(de,{ref:`overflowRef`,onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:i,counter:this.renderCounter}):i());return o?G(a,{onResize:this.onResize},{default:s}):s()}}),Ot={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},kt=y({name:`ArchiveOutline`,render:function(e,t){return l(),W(`svg`,Ot,t[0]||=[F(`path`,{d:`M80 152v256a40.12 40.12 0 0 0 40 40h272a40.12 40.12 0 0 0 40-40V152`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),F(`rect`,{x:`48`,y:`64`,width:`416`,height:`80`,rx:`28`,ry:`28`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M320 304l-64 64l-64-64`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 345.89V224`},null,-1)])}}),At={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},jt=y({name:`CodeSlashOutline`,render:function(e,t){return l(),W(`svg`,At,t[0]||=[F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M160 368L32 256l128-112`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M352 368l128-112l-128-112`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M304 96l-96 320`},null,-1)])}}),Mt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Nt=y({name:`CubeOutline`,render:function(e,t){return l(),W(`svg`,Mt,t[0]||=[F(`path`,{d:`M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M69 153.99l187 110l187-110`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 463.99v-200`},null,-1)])}}),Pt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ft=y({name:`DocumentTextOutline`,render:function(e,t){return l(),W(`svg`,Pt,t[0]||=[F(`path`,{d:`M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),F(`path`,{d:`M256 56v120a32 32 0 0 0 32 32h120`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h160`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 368h160`},null,-1)])}}),It={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Lt=y({name:`GitNetworkOutline`,render:function(e,t){return l(),W(`svg`,It,t[0]||=[le(`<circle cx="128" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="256" cy="416" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 256v112"></path><circle cx="384" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path d="M128 144c0 74.67 68.92 112 128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path d="M384 144c0 74.67-68.92 112-128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>`,6)])}}),Rt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},zt=y({name:`GridOutline`,render:function(e,t){return l(),W(`svg`,Rt,t[0]||=[F(`rect`,{x:`48`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),F(`rect`,{x:`288`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),F(`rect`,{x:`48`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),F(`rect`,{x:`288`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Bt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Vt=y({name:`LogOutOutline`,render:function(e,t){return l(),W(`svg`,Bt,t[0]||=[F(`path`,{d:`M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 336l80-80l-80-80`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 256h256`},null,-1)])}}),Ht={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ut=y({name:`ReaderOutline`,render:function(e,t){return l(),W(`svg`,Ht,t[0]||=[F(`rect`,{x:`96`,y:`48`,width:`320`,height:`416`,rx:`48`,ry:`48`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 128h160`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 208h160`},null,-1),F(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h80`},null,-1)])}}),Wt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Gt=y({name:`SettingsOutline`,render:function(e,t){return l(),W(`svg`,Wt,t[0]||=[F(`path`,{d:`M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Kt={key:0,class:`brand-copy`},qt={class:`account`},Jt={class:`account-copy`},Yt={class:`update-banner-body`},Xt=y({__name:`AppLayout`,setup(e){let t=De(),n=Te(),i=Oe(),a=he(),o=Se(),s=j(window.innerWidth<900);function c(e,t,n){return{label:()=>G(Ee,{to:{name:t}},{default:()=>e}),key:t,icon:()=>G(X,null,{default:()=>G(n)})}}let u=[c(`运行概览`,`dashboard`,zt),c(`代理编排`,`orchestration`,Lt),c(`配置管理`,`config`,Ft),c(`配置能力`,`schema`,jt),c(`dae 版本`,`versions`,Nt),c(`运行日志`,`logs`,Ut),c(`配置备份`,`backups`,kt),c(`面板设置`,`settings`,Gt)],d=z(()=>String(t.name||`dashboard`)),p=z(()=>String(t.meta.title||`kdae-panel`));async function m(){try{await i.logout(),await n.replace({name:`login`})}catch(e){a.error(e instanceof Error?e.message:`退出登录失败`)}}function g(){i.clearSession(),n.replace({name:`login`}),a.warning(`登录会话已过期，请重新登录`)}function _(){window.innerWidth<900&&(s.value=!0)}let v=j(null),y=j(!1),b=j(!1),x=j(!1),S=z(()=>v.value?.status?.enabled===!0&&v.value.status.updatable),w=z(()=>v.value?.status!==void 0&&!v.value.status.enabled);async function T(){try{v.value=await I(`/api/v1/panel/update`)}catch{v.value=null}}function E(){let e=v.value?.check.latest;o.warning({title:`升级面板到 ${e}`,content:`面板会下载发布包、比对 sha256，用新版本自证能在本机运行，然后替换 ${v.value?.status?.binaryPath} 并重启自身。重启期间面板会短暂无法访问（通常几秒），dae 与代理流量不受影响。上一版会保留一份副本，万一新版本起不来可以手工换回。`,positiveText:`下载并升级`,negativeText:`取消`,onPositiveClick:()=>A(e)})}async function A(e){b.value=!0;try{await ee(`/api/v1/panel/update`,e?{version:e}:{}),a.info(`已开始升级，面板重启后页面会自动刷新`),R(e)}catch(e){b.value=!1,a.error(e instanceof Error?e.message:`启动升级失败`)}}function N(){let e=v.value?.check.latest;o.warning({title:`启用并升级到 ${e}`,content:`启用状态会保存在面板数据目录，以后有新版本即可直接在这里升级。本次会下载并校验发布包、备份当前二进制，然后重启面板；dae 与代理流量不受影响。`,positiveText:`启用并升级`,negativeText:`取消`,onPositiveClick:async()=>{x.value=!0;try{let t=await re(`/api/v1/panel/update/preference`,{enabled:!0});v.value&&(v.value.status=t.status),window.dispatchEvent(new CustomEvent(`kdae-panel:self-update-changed`,{detail:t.status})),await A(e)}catch(e){a.error(e instanceof Error?e.message:`启用面板一键升级失败`)}finally{x.value=!1}}})}function L(e){let t=e.detail;v.value&&t&&(v.value.status=t)}async function R(e){let t=Date.now()+12e4;for(;Date.now()<t;){await new Promise(e=>window.setTimeout(e,2e3));try{let t=await I(`/api/v1/health`);if(!e||t.version===e){window.location.reload();return}}catch{}}b.value=!1,a.warning(`等待面板重启超时，请手动刷新页面确认升级结果`)}return h(()=>{window.addEventListener(`kdae-panel:auth-expired`,g),window.addEventListener(`kdae-panel:self-update-changed`,L),window.addEventListener(`resize`,_),T()}),f(()=>{window.removeEventListener(`kdae-panel:auth-expired`,g),window.removeEventListener(`kdae-panel:self-update-changed`,L),window.removeEventListener(`resize`,_)}),(e,t)=>{let n=r(`RouterView`);return l(),P(B(Ye),{"has-sider":``,class:`app-shell`},{default:C(()=>[K(B(it),{bordered:``,"collapse-mode":`width`,"collapsed-width":64,width:236,collapsed:s.value,"show-trigger":`bar`,onCollapse:t[0]||=e=>s.value=!0,onExpand:t[1]||=e=>s.value=!1},{default:C(()=>[F(`div`,{class:ie([`brand`,{compact:s.value}])},[t[4]||=F(`div`,{class:`brand-mark`},`K`,-1),s.value?D(``,!0):(l(),W(`div`,Kt,[...t[3]||=[F(`strong`,null,`kdae-panel`,-1),F(`span`,null,`零侵入管理面板`,-1)]]))],2),K(B(Dt),{value:d.value,collapsed:s.value,"collapsed-width":64,"collapsed-icon-size":22,options:u},null,8,[`value`,`collapsed`])]),_:1},8,[`collapsed`]),K(B(Ye),null,{default:C(()=>[K(B($e),{bordered:``,class:`app-header`},{default:C(()=>[F(`div`,null,[K(B(ge),{depth:`3`,class:`eyebrow`},{default:C(()=>[...t[5]||=[O(`KDAE CONTROL PLANE`,-1)]]),_:1}),F(`h1`,null,k(p.value),1)]),F(`div`,qt,[K(B(Be),{round:``,size:`small`},{default:C(()=>[O(k(B(i).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),F(`div`,Jt,[F(`strong`,null,k(B(i).user?.username),1),t[6]||=F(`span`,null,`管理员`,-1)]),K(B(M),{quaternary:``,circle:``,title:`退出登录`,onClick:m},{icon:C(()=>[K(B(X),null,{default:C(()=>[K(B(Vt))]),_:1})]),_:1})])]),_:1}),K(B(Xe),{class:`app-content`,"content-style":`padding: 28px;`},{default:C(()=>[v.value?.check.updateAvailable&&!y.value?(l(),P(B(xe),{key:0,type:`info`,closable:!b.value,class:`update-banner`,onClose:t[2]||=e=>y.value=!0},{default:C(()=>[F(`div`,Yt,[F(`span`,null,[t[7]||=O(` 面板有新版本 `,-1),F(`strong`,null,k(v.value.check.latest),1),O(`（当前 `+k(v.value.check.current)+`）。 `,1),S.value?(l(),W(U,{key:0},[O(`升级会替换面板二进制并重启自身，配置与账号数据都会保留。`)],64)):w.value?(l(),W(U,{key:1},[O(`可直接在这里启用一键升级，不需要 SSH。`)],64)):v.value.status?.problem?(l(),W(U,{key:2},[O(`当前无法一键升级：`+k(v.value.status.problem),1)],64)):(l(),W(U,{key:3},[O(`当前部署不支持一键升级，可重新执行一键部署命令。`)],64)),t[8]||=F(`a`,{href:`https://github.com/tuoro/kdae-panel/releases/latest`,target:`_blank`,rel:`noopener`},`查看发布说明`,-1)]),S.value?(l(),P(B(M),{key:0,size:`small`,type:`primary`,loading:b.value,disabled:b.value,onClick:E},{icon:C(()=>[K(B(X),null,{default:C(()=>[K(B(Ae))]),_:1})]),default:C(()=>[O(` `+k(b.value?`升级中…`:`立即升级`),1)]),_:1},8,[`loading`,`disabled`])):w.value?(l(),P(B(M),{key:1,size:`small`,type:`primary`,loading:x.value||b.value,disabled:x.value||b.value,onClick:N},{icon:C(()=>[K(B(X),null,{default:C(()=>[K(B(Ae))]),_:1})]),default:C(()=>[t[9]||=O(` 启用并升级 `,-1)]),_:1},8,[`loading`,`disabled`])):D(``,!0)])]),_:1},8,[`closable`])):D(``,!0),K(n)]),_:1})]),_:1})]),_:1})}}});export{Xt as default};