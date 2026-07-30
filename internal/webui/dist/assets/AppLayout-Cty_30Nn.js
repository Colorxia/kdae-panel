import{$t as e,A as t,At as n,Cn as r,Ct as i,Dn as a,Dt as o,Et as s,Fn as c,Gn as l,Jt as u,Ln as d,Mt as f,Nn as p,Pt as m,Qt as h,Rn as g,Rt as _,Sn as v,St as y,T as b,Tn as x,Un as S,Vn as C,Wn as w,Xt as T,Zt as E,_ as D,_n as O,a as ee,ar as k,bn as A,cr as j,dn as M,en as N,f as P,ft as F,gn as I,hn as L,i as te,j as R,jt as ne,k as re,kn as ie,lr as z,o as ae,pt as B,qt as V,sr as H,tn as oe,tr as U,vn as se,x as ce,xn as W,xt as le,y as ue,yn as G,yt as de}from"./client-DVlvm8qj.js";import{r as fe,t as K}from"./create-CyoCXTMe.js";import{t as pe}from"./misc-DDs3MKLt.js";import{r as q}from"./light-C3ssoYlQ.js";import{a as J,i as me,n as he,r as Y,t as ge}from"./text-Sj-og4xd.js";import{n as _e,r as ve,t as ye}from"./Dropdown-BhBRANUl.js";import{n as be}from"./Tag-C6rEfc7C.js";import{t as xe}from"./Alert-veb-7_VI.js";import{t as X}from"./Icon-BaY2XuQB.js";import{t as Se}from"./composables-CIcAPtSQ.js";import{C as Ce,F as Z,S as we,i as Te,l as Ee,n as De,r as Oe,t as ke}from"./index-BvW3qXdO.js";import{t as Ae}from"./CloudDownloadOutline-Dz2XBDkV.js";var je=r({name:`ChevronDownFilled`,render(){return x(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},x(`path`,{d:`M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z`,fill:`currentColor`}))}}),Me=ne&&`loading`in document.createElement(`img`);function Ne(e={}){let{root:t=null}=e;return{hash:`${e.rootMargin||`0px 0px 0px 0px`}-${Array.isArray(e.threshold)?e.threshold.join(`,`):e.threshold??`0`}`,options:Object.assign(Object.assign({},e),{root:(typeof t==`string`?document.querySelector(t):t)||document.documentElement})}}var Pe=new WeakMap,Fe=new WeakMap,Ie=new WeakMap,Le=(e,t,n)=>{if(!e)return()=>{};let r=Ne(t),{root:i}=r.options,a,o=Pe.get(i);o?a=o:(a=new Map,Pe.set(i,a));let s,c;a.has(r.hash)?(c=a.get(r.hash),c[1].has(e)||(s=c[0],c[1].add(e),s.observe(e))):(s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=Fe.get(e.target),n=Ie.get(e.target);t&&t(),n&&(n.value=!0)}})},r.options),s.observe(e),c=[s,new Set([e])],a.set(r.hash,c));let l=!1,u=()=>{l||(Fe.delete(e),Ie.delete(e),l=!0,c[1].has(e)&&(c[0].unobserve(e),c[1].delete(e)),c[1].size<=0&&a.delete(r.hash),a.size||Pe.delete(i))};return Fe.set(e,u),Ie.set(e,n),u},Re=f(`n-avatar-group`),ze=u(`avatar`,`
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
`,[N(V(`&`,`--n-merged-color: var(--n-color-modal);`)),oe(V(`&`,`--n-merged-color: var(--n-color-popover);`)),V(`img`,`
 width: 100%;
 height: 100%;
 `),T(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),u(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),T(`text`,`line-height: 1.25`)]),Be=r({name:`Avatar`,props:Object.assign(Object.assign({},R.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=B(t),i=U(!1),o=null,l=U(null),u=U(null),d=()=>{let{value:e}=l;if(e&&(o===null||o!==e.innerHTML)){o=e.innerHTML;let{value:t}=u;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},f=a(Re,null),m=L(()=>{let{size:e}=t;if(e)return e;let{size:n}=f||{};return n||`medium`}),h=R(`Avatar`,`-avatar`,ze,we,t,n),g=a(be,null),_=L(()=>{if(f)return!0;let{round:e,circle:n}=t;return e!==void 0||n!==void 0?e||n:g?g.roundRef.value:!1}),v=L(()=>f?!0:t.bordered||!1),y=L(()=>{let n=m.value,r=_.value,i=v.value,{color:a}=t,{self:{borderRadius:o,fontSize:s,color:c,border:l,colorModal:u,colorPopover:d},common:{cubicBezierEaseInOut:f}}=h.value,p;return p=typeof n==`number`?`${n}px`:h.value.self[e(`height`,n)],{"--n-font-size":s,"--n-border":i?l:`none`,"--n-border-radius":r?`50%`:o,"--n-color":a||c,"--n-color-modal":a||u,"--n-color-popover":a||d,"--n-bezier":f,"--n-merged-size":`var(--n-avatar-size-override, ${p})`}}),b=r?F(`avatar`,L(()=>{let e=m.value,n=_.value,r=v.value,{color:i}=t,a=``;return e&&(typeof e==`number`?a+=`a${e}`:a+=e[0]),n&&(a+=`b`),r&&(a+=`c`),i&&(a+=s(i)),a}),y,t):void 0,x=U(!t.lazy);c(()=>{if(t.lazy&&t.intersectionObserverOptions){let e,n=w(()=>{e?.(),e=void 0,t.lazy&&(e=Le(u.value,t.intersectionObserverOptions,x))});p(()=>{n(),e?.()})}}),S(()=>t.src||t.imgProps?.src,()=>{i.value=!1});let C=U(!t.lazy);return{textRef:l,selfRef:u,mergedRoundRef:_,mergedClsPrefix:n,fitTextTransform:d,cssVars:r?void 0:y,themeClass:b?.themeClass,onRender:b?.onRender,hasLoadError:i,shouldStartLoading:x,loaded:C,mergedOnError:e=>{if(!x.value)return;i.value=!0;let{onError:n,imgProps:{onError:r}={}}=t;n?.(e),r?.(e)},mergedOnLoad:e=>{let{onLoad:n,imgProps:{onLoad:r}={}}=t;n?.(e),r?.(e),C.value=!0}}},render(){var e;let{$slots:t,src:n,mergedClsPrefix:r,lazy:i,onRender:a,loaded:s,hasLoadError:c,imgProps:l={}}=this;a?.();let u,d=!s&&!c&&(this.renderPlaceholder?this.renderPlaceholder():(e=this.$slots).placeholder?.call(e));return u=this.hasLoadError?this.renderFallback?this.renderFallback():de(t.fallback,()=>[x(`img`,{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):le(t.default,e=>{if(e)return x(o,{onResize:this.fitTextTransform},{default:()=>x(`span`,{ref:`textRef`,class:`${r}-avatar__text`},e)});if(n||l.src){let e=this.src||l.src;return x(`img`,Object.assign(Object.assign({},l),{loading:Me&&!this.intersectionObserverOptions&&i?`lazy`:`eager`,src:i&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[l.style||``,{objectFit:this.objectFit},d?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]}))}}),x(`span`,{ref:`selfRef`,class:[`${r}-avatar`,this.themeClass],style:this.cssVars},u,i&&d)}});function Ve(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:o,scrollbarColor:s,scrollbarColorHover:c,invertedColor:l}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:o,headerColor:i,headerColorInverted:l,footerColor:o,footerColorInverted:l,headerBorderColor:a,headerBorderColorInverted:l,footerBorderColor:a,footerBorderColorInverted:l,siderBorderColor:a,siderBorderColorInverted:l,siderColor:i,siderColorInverted:l,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:_(r,s),siderToggleBarColorHover:_(r,c),__invertScrollbar:`true`}}var He=t({name:`Layout`,common:ce,peers:{Scrollbar:ue},self:Ve}),Ue=f(`n-layout-sider`),We={type:String,default:`static`},Ge=u(`layout`,`
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
 `),E(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),Ke={embedded:Boolean,position:We,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},qe=f(`n-layout`);function Je(e){return r({name:e?`LayoutContent`:`Layout`,props:Object.assign(Object.assign({},R.props),Ke),setup(e){let t=U(null),r=U(null),{mergedClsPrefixRef:i,inlineThemeDisabled:a}=B(e),o=R(`Layout`,`-layout`,Ge,He,e,i);function s(n,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(n):e.scrollTo(n,i))}else{let{value:e}=r;e&&e.scrollTo(n,i)}}g(qe,e);let c=0,l=0,u=t=>{var n;let r=t.target;c=r.scrollLeft,l=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};n(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=l,e.scrollLeft=c)}});let d={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},f={scrollTo:s},p=L(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=o.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),m=a?F(`layout`,L(()=>e.embedded?`e`:``),p,e):void 0;return Object.assign({mergedClsPrefix:i,scrollableElRef:t,scrollbarInstRef:r,hasSiderStyle:d,mergedTheme:o,handleNativeElScroll:u,cssVars:a?void 0:p,themeClass:m?.themeClass,onRender:m?.onRender},f)},render(){var t;let{mergedClsPrefix:n,hasSider:r}=this;(t=this.onRender)==null||t.call(this);let i=r?this.hasSiderStyle:void 0;return x(`div`,{class:[this.themeClass,e&&`${n}-layout-content`,`${n}-layout`,`${n}-layout--${this.position}-positioned`],style:this.cssVars},this.nativeScrollbar?x(`div`,{ref:`scrollableElRef`,class:[`${n}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,i],onScroll:this.handleNativeElScroll},this.$slots):x(D,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,i]}),this.$slots))}})}var Ye=Je(!1),Xe=Je(!0),Ze=u(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[E(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),E(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),Qe={position:We,inverted:Boolean,bordered:{type:Boolean,default:!1}},$e=r({name:`LayoutHeader`,props:Object.assign(Object.assign({},R.props),Qe),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=B(e),r=R(`Layout`,`-layout-header`,Ze,He,e,t),i=L(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?F(`layout-header`,L(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){var e;let{mergedClsPrefix:t}=this;return(e=this.onRender)==null||e.call(this),x(`div`,{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),et=u(`layout-sider`,`
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
`,[E(`bordered`,[T(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),T(`left-placement`,[E(`bordered`,[T(`border`,`
 right: 0;
 `)])]),E(`right-placement`,`
 justify-content: flex-start;
 `,[E(`bordered`,[T(`border`,`
 left: 0;
 `)]),E(`collapsed`,[u(`layout-toggle-button`,[u(`base-icon`,`
 transform: rotate(180deg);
 `)]),u(`layout-toggle-bar`,[V(`&:hover`,[T(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),T(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),u(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[u(`base-icon`,`
 transform: rotate(0);
 `)]),u(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[V(`&:hover`,[T(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),T(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),E(`collapsed`,[u(`layout-toggle-bar`,[V(`&:hover`,[T(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),T(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),u(`layout-toggle-button`,[u(`base-icon`,`
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
 `,[T(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),T(`bottom`,`
 position: absolute;
 top: 34px;
 `),V(`&:hover`,[T(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),T(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),T(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),V(`&:hover`,[T(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),T(`border`,`
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
 `),E(`show-content`,[u(`layout-sider-scroll-container`,{opacity:1})]),E(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),tt=r({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return x(`div`,{onClick:this.onClick,class:`${e}-layout-toggle-bar`},x(`div`,{class:`${e}-layout-toggle-bar__top`}),x(`div`,{class:`${e}-layout-toggle-bar__bottom`}))}}),nt=r({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return x(`div`,{class:`${e}-layout-toggle-button`,onClick:this.onClick},x(re,{clsPrefix:e},{default:()=>x(ve,null)}))}}),rt={position:We,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},it=r({name:`LayoutSider`,props:Object.assign(Object.assign({},R.props),rt),setup(e){let t=a(qe),r=U(null),o=U(null),s=U(e.defaultCollapsed),c=J(k(e,`collapsed`),s),l=L(()=>Y(c.value?e.collapsedWidth:e.width)),u=L(()=>e.collapseMode===`transform`?{minWidth:Y(e.width)}:{}),d=L(()=>t?t.siderPlacement:`left`);function f(t,n){if(e.nativeScrollbar){let{value:e}=r;e&&(n===void 0?e.scrollTo(t):e.scrollTo(t,n))}else{let{value:e}=o;e&&e.scrollTo(t,n)}}function p(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:a}=e,{value:o}=c;n&&i(n,!o),t&&i(t,!o),s.value=!o,o?r&&i(r):a&&i(a)}let m=0,h=0,_=t=>{var n;let r=t.target;m=r.scrollLeft,h=r.scrollTop,(n=e.onScroll)==null||n.call(e,t)};n(()=>{if(e.nativeScrollbar){let e=r.value;e&&(e.scrollTop=h,e.scrollLeft=m)}}),g(Ue,{collapsedRef:c,collapseModeRef:k(e,`collapseMode`)});let{mergedClsPrefixRef:v,inlineThemeDisabled:y}=B(e),b=R(`Layout`,`-layout-sider`,et,He,e,v);function x(t){var n,r;t.propertyName===`max-width`&&(c.value?(n=e.onAfterLeave)==null||n.call(e):(r=e.onAfterEnter)==null||r.call(e))}let S={scrollTo:f},C=L(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=b.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),w=y?F(`layout-sider`,L(()=>e.inverted?`a`:`b`),C,e):void 0;return Object.assign({scrollableElRef:r,scrollbarInstRef:o,mergedClsPrefix:v,mergedTheme:b,styleMaxWidth:l,mergedCollapsed:c,scrollContainerStyle:u,siderPlacement:d,handleNativeElScroll:_,handleTransitionend:x,handleTriggerClick:p,inlineThemeDisabled:y,cssVars:C,themeClass:w?.themeClass,onRender:w?.onRender},S)},render(){var e;let{mergedClsPrefix:t,mergedCollapsed:n,showTrigger:r}=this;return(e=this.onRender)==null||e.call(this),x(`aside`,{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,n&&`${t}-layout-sider--collapsed`,(!n||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:Y(this.width)}]},this.nativeScrollbar?x(`div`,{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:`auto`},this.contentStyle],ref:`scrollableElRef`},this.$slots):x(D,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),this.$slots),r?x(r===`bar`?tt:nt,{clsPrefix:t,class:n?this.collapsedTriggerClass:this.triggerClass,style:n?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?x(`div`,{class:`${t}-layout-sider__border`}):null)}}),Q=f(`n-menu`),at=f(`n-submenu`),ot=f(`n-menu-item-group`),st=[V(`&::before`,`background-color: var(--n-item-color-hover);`),T(`arrow`,`
 color: var(--n-arrow-color-hover);
 `),T(`icon`,`
 color: var(--n-item-icon-color-hover);
 `),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover);
 `,[V(`a`,`
 color: var(--n-item-text-color-hover);
 `),T(`extra`,`
 color: var(--n-item-text-color-hover);
 `)])],ct=[T(`icon`,`
 color: var(--n-item-icon-color-hover-horizontal);
 `),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover-horizontal);
 `,[V(`a`,`
 color: var(--n-item-text-color-hover-horizontal);
 `),T(`extra`,`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],lt=V([u(`menu`,`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[E(`horizontal`,`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[u(`submenu`,`margin: 0;`),u(`menu-item`,`margin: 0;`),u(`menu-item-content`,`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[V(`&::before`,`display: none;`),E(`selected`,`border-bottom: 2px solid var(--n-border-color-horizontal)`)]),u(`menu-item-content`,[E(`selected`,[T(`icon`,`color: var(--n-item-icon-color-active-horizontal);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-horizontal);
 `,[V(`a`,`color: var(--n-item-text-color-active-horizontal);`),T(`extra`,`color: var(--n-item-text-color-active-horizontal);`)])]),E(`child-active`,`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[u(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[V(`a`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `),T(`extra`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),T(`icon`,`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),h(`disabled`,[h(`selected, child-active`,[V(`&:focus-within`,ct)]),E(`selected`,[$(null,[T(`icon`,`color: var(--n-item-icon-color-active-hover-horizontal);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[V(`a`,`color: var(--n-item-text-color-active-hover-horizontal);`),T(`extra`,`color: var(--n-item-text-color-active-hover-horizontal);`)])])]),E(`child-active`,[$(null,[T(`icon`,`color: var(--n-item-icon-color-child-active-hover-horizontal);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[V(`a`,`color: var(--n-item-text-color-child-active-hover-horizontal);`),T(`extra`,`color: var(--n-item-text-color-child-active-hover-horizontal);`)])])]),$(`border-bottom: 2px solid var(--n-border-color-horizontal);`,ct)]),u(`menu-item-content-header`,[V(`a`,`color: var(--n-item-text-color-horizontal);`)])])]),h(`responsive`,[u(`menu-item-content-header`,`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),E(`collapsed`,[u(`menu-item-content`,[E(`selected`,[V(`&::before`,`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),u(`menu-item-content-header`,`opacity: 0;`),T(`arrow`,`opacity: 0;`),T(`icon`,`color: var(--n-item-icon-color-collapsed);`)])]),u(`menu-item`,`
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
 `,[V(`> *`,`z-index: 1;`),V(`&::before`,`
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
 `),E(`disabled`,`
 opacity: .45;
 cursor: not-allowed;
 `),E(`collapsed`,[T(`arrow`,`transform: rotate(0);`)]),E(`selected`,[V(`&::before`,`background-color: var(--n-item-color-active);`),T(`arrow`,`color: var(--n-arrow-color-active);`),T(`icon`,`color: var(--n-item-icon-color-active);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-active);
 `,[V(`a`,`color: var(--n-item-text-color-active);`),T(`extra`,`color: var(--n-item-text-color-active);`)])]),E(`child-active`,[u(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active);
 `,[V(`a`,`
 color: var(--n-item-text-color-child-active);
 `),T(`extra`,`
 color: var(--n-item-text-color-child-active);
 `)]),T(`arrow`,`
 color: var(--n-arrow-color-child-active);
 `),T(`icon`,`
 color: var(--n-item-icon-color-child-active);
 `)]),h(`disabled`,[h(`selected, child-active`,[V(`&:focus-within`,st)]),E(`selected`,[$(null,[T(`arrow`,`color: var(--n-arrow-color-active-hover);`),T(`icon`,`color: var(--n-item-icon-color-active-hover);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover);
 `,[V(`a`,`color: var(--n-item-text-color-active-hover);`),T(`extra`,`color: var(--n-item-text-color-active-hover);`)])])]),E(`child-active`,[$(null,[T(`arrow`,`color: var(--n-arrow-color-child-active-hover);`),T(`icon`,`color: var(--n-item-icon-color-child-active-hover);`),u(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover);
 `,[V(`a`,`color: var(--n-item-text-color-child-active-hover);`),T(`extra`,`color: var(--n-item-text-color-child-active-hover);`)])])]),E(`selected`,[$(null,[V(`&::before`,`background-color: var(--n-item-color-active-hover);`)])]),$(null,st)]),T(`icon`,`
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
 `),T(`arrow`,`
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
 `,[V(`a`,`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[V(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),T(`extra`,`
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
 `)])]),u(`menu-tooltip`,[V(`a`,`
 color: inherit;
 text-decoration: none;
 `)]),u(`menu-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function $(e,t){return[E(`hover`,e,t),V(`&:hover`,e,t)]}var ut=r({name:`MenuOptionContent`,props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){let{props:t}=a(Q);return{menuProps:t,style:L(()=>{let{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:L(()=>{let{maxIconSize:t,activeIconSize:n,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){let{clsPrefix:e,tmNode:t,menuProps:{renderIcon:n,renderLabel:r,renderExtra:i,expandIcon:a}}=this,o=n?n(t.rawNode):Z(this.icon);return x(`div`,{onClick:e=>{var t;(t=this.onClick)==null||t.call(this,e)},role:`none`,class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},o&&x(`div`,{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:`none`},[o]),x(`div`,{class:`${e}-menu-item-content-header`,role:`none`},this.isEllipsisPlaceholder?this.title:r?r(t.rawNode):Z(this.title),this.extra||i?x(`span`,{class:`${e}-menu-item-content-header__extra`},` `,i?i(t.rawNode):Z(this.extra)):null),this.showArrow?x(re,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>a?a(t.rawNode):x(je,null)}):null)}}),dt=8;function ft(e){let t=a(Q),{props:n,mergedCollapsedRef:r}=t,i=a(at,null),o=a(ot,null),s=L(()=>n.mode===`horizontal`),c=L(()=>s.value?n.dropdownPlacement:`tmNodes`in e?`right-start`:`right`),l=L(()=>Math.max(n.collapsedIconSize??n.iconSize,n.iconSize));return{dropdownPlacement:c,activeIconSize:L(()=>!s.value&&e.root&&r.value?n.collapsedIconSize??n.iconSize:n.iconSize),maxIconSize:l,paddingLeft:L(()=>{if(s.value)return;let{collapsedWidth:t,indent:a,rootIndent:c}=n,{root:u,isGroup:d}=e,f=c===void 0?a:c;return u?r.value?t/2-l.value/2:f:o&&typeof o.paddingLeftRef.value==`number`?a/2+o.paddingLeftRef.value:i&&typeof i.paddingLeftRef.value==`number`?(d?a/2:a)+i.paddingLeftRef.value:0}),iconMarginRight:L(()=>{let{collapsedWidth:t,indent:i,rootIndent:a}=n,{value:o}=l,{root:c}=e;return s.value||!c||!r.value?dt:(a===void 0?i:a)+o+dt-(t+o)/2}),NMenu:t,NSubmenu:i,NMenuOptionGroup:o}}var pt={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},mt=r({name:`MenuDivider`,setup(){let{mergedClsPrefixRef:e,isHorizontalRef:t}=a(Q);return()=>t.value?null:x(`div`,{class:`${e.value}-menu-divider`})}}),ht=Object.assign(Object.assign({},pt),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),gt=y(ht),_t=r({name:`MenuOption`,props:ht,setup(e){let t=ft(e),{NSubmenu:n,NMenu:r,NMenuOptionGroup:i}=t,{props:a,mergedClsPrefixRef:o,mergedCollapsedRef:s}=r,c=n?n.mergedDisabledRef:i?i.mergedDisabledRef:{value:!1},l=L(()=>c.value||e.disabled);function u(t){let{onClick:n}=e;n&&n(t)}function d(t){l.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),u(t))}return{mergedClsPrefix:o,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:a,dropdownEnabled:m(()=>e.root&&s.value&&a.mode!==`horizontal`&&!l.value),selected:m(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:l,handleClick:d}},render(){let{mergedClsPrefix:e,mergedTheme:t,tmNode:n,menuProps:{renderLabel:r,nodeProps:i}}=this,a=i?.(n.rawNode);return x(`div`,Object.assign({},a,{role:`menuitem`,class:[`${e}-menu-item`,a?.class]}),x(_e,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:`hover`,placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:[`menu-tooltip`]},{default:()=>r?r(n.rawNode):Z(this.title),trigger:()=>x(ut,{tmNode:n,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),vt=Object.assign(Object.assign({},pt),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),yt=y(vt),bt=r({name:`MenuOptionGroup`,props:vt,setup(e){let t=ft(e),{NSubmenu:n}=t,r=L(()=>n?.mergedDisabledRef.value?!0:e.tmNode.disabled);g(ot,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:r});let{mergedClsPrefixRef:i,props:o}=a(Q);return function(){let{value:n}=i,r=t.paddingLeft.value,{nodeProps:a}=o,s=a?.(e.tmNode.rawNode);return x(`div`,{class:`${n}-menu-item-group`,role:`group`},x(`div`,Object.assign({},s,{class:[`${n}-menu-item-group-title`,s?.class],style:[s?.style||``,r===void 0?``:`padding-left: ${r}px;`]}),Z(e.title),e.extra?x(M,null,` `,Z(e.extra)):null),x(`div`,null,e.tmNodes.map(e=>Ct(e,o))))}}});function xt(e){return e.type===`divider`||e.type===`render`}function St(e){return e.type===`divider`}function Ct(e,t){let{rawNode:n}=e,{show:r}=n;if(r===!1)return null;if(xt(n))return St(n)?x(mt,Object.assign({key:e.key},n.props)):null;let{labelField:i}=t,{key:a,level:o,isGroup:s}=e,c=Object.assign(Object.assign({},n),{title:n.title||n[i],extra:n.titleExtra||n.extra,key:a,internalKey:a,level:o,root:o===0,isGroup:s});return e.children?e.isGroup?x(bt,q(c,yt,{tmNode:e,tmNodes:e.children,key:a})):x(Et,q(c,Tt,{key:a,rawNodes:n[t.childrenField],tmNodes:e.children,tmNode:e})):x(_t,q(c,gt,{key:a,tmNode:e}))}var wt=Object.assign(Object.assign({},pt),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),Tt=y(wt),Et=r({name:`Submenu`,props:wt,setup(e){let t=ft(e),{NMenu:n,NSubmenu:r}=t,{props:i,mergedCollapsedRef:a,mergedThemeRef:o}=n,s=L(()=>{let{disabled:t}=e;return r?.mergedDisabledRef.value||i.disabled?!0:t}),c=U(!1);g(at,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:s}),g(ot,null);function l(){let{onClick:t}=e;t&&t()}function u(){s.value||(a.value||n.toggleExpand(e.internalKey),l())}function d(e){c.value=e}return{menuProps:i,mergedTheme:o,doSelect:n.doSelect,inverted:n.invertedRef,isHorizontal:n.isHorizontalRef,mergedClsPrefix:n.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:s,mergedValue:n.mergedValueRef,childActive:m(()=>e.virtualChildActive??n.activePathRef.value.includes(e.internalKey)),collapsed:L(()=>i.mode===`horizontal`?!1:a.value?!0:!n.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:L(()=>!s.value&&(i.mode===`horizontal`||a.value)),handlePopoverShowChange:d,handleClick:u}},render(){let{mergedClsPrefix:e,menuProps:{renderIcon:t,renderLabel:n}}=this,r=()=>{let{isHorizontal:e,paddingLeft:t,collapsed:n,mergedDisabled:r,maxIconSize:i,activeIconSize:a,title:o,childActive:s,icon:c,handleClick:l,menuProps:{nodeProps:u},dropdownShow:d,iconMarginRight:f,tmNode:p,mergedClsPrefix:m,isEllipsisPlaceholder:h,extra:g}=this,_=u?.(p.rawNode);return x(`div`,Object.assign({},_,{class:[`${m}-menu-item`,_?.class],role:`menuitem`}),x(ut,{tmNode:p,paddingLeft:t,collapsed:n,disabled:r,iconMarginRight:f,maxIconSize:i,activeIconSize:a,title:o,extra:g,showArrow:!e,childActive:s,clsPrefix:m,icon:c,hover:d,onClick:l,isEllipsisPlaceholder:h}))},i=()=>x(b,null,{default:()=>{let{tmNodes:t,collapsed:n}=this;return n?null:x(`div`,{class:`${e}-submenu-children`,role:`menu`},t.map(e=>Ct(e,this.menuProps)))}});return this.root?x(ye,Object.assign({size:`large`,trigger:`hover`},this.menuProps?.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:`14px`,optionIconSizeLarge:`18px`},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:n}),{default:()=>x(`div`,{class:`${e}-submenu`,role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},r(),this.isHorizontal?null:i())}):x(`div`,{class:`${e}-submenu`,role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},r(),i())}}),Dt=r({name:`Menu`,inheritAttrs:!1,props:Object.assign(Object.assign({},R.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},disabledField:{type:String,default:`disabled`},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:`vertical`},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:`bottom`},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=B(e),r=R(`Menu`,`-menu`,lt,Ee,e,t),o=a(Ue,null),s=L(()=>{let{collapsed:t}=e;if(t!==void 0)return t;if(o){let{collapseModeRef:e,collapsedRef:t}=o;if(e.value===`width`)return t.value??!1}return!1}),c=L(()=>{let{keyField:t,childrenField:n,disabledField:r}=e;return K(e.items||e.options,{getIgnored(e){return xt(e)},getChildren(e){return e[n]},getDisabled(e){return e[r]},getKey(e){return e[t]??e.name}})}),l=L(()=>new Set(c.value.treeNodes.map(e=>e.key))),{watchProps:u}=e,d=U(null);u?.includes(`defaultValue`)?w(()=>{d.value=e.defaultValue}):d.value=e.defaultValue;let f=J(k(e,`value`),d),p=U([]),m=()=>{p.value=e.defaultExpandAll?c.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||c.value.getPath(f.value,{includeSelf:!1}).keyPath};u?.includes(`defaultExpandedKeys`)?w(m):m();let h=me(e,[`expandedNames`,`expandedKeys`]),_=J(h,p),v=L(()=>c.value.treeNodes),y=L(()=>c.value.getPath(f.value).keyPath);g(Q,{props:e,mergedCollapsedRef:s,mergedThemeRef:r,mergedValueRef:f,mergedExpandedKeysRef:_,activePathRef:y,mergedClsPrefixRef:t,isHorizontalRef:L(()=>e.mode===`horizontal`),invertedRef:k(e,`inverted`),doSelect:b,toggleExpand:C});function b(t,n){let{"onUpdate:value":r,onUpdateValue:a,onSelect:o}=e;a&&i(a,t,n),r&&i(r,t,n),o&&i(o,t,n),d.value=t}function S(t){let{"onUpdate:expandedKeys":n,onUpdateExpandedKeys:r,onExpandedNamesChange:a,onOpenNamesChange:o}=e;n&&i(n,t),r&&i(r,t),a&&i(a,t),o&&i(o,t),p.value=t}function C(t){let n=Array.from(_.value),r=n.findIndex(e=>e===t);if(~r)n.splice(r,1);else{if(e.accordion&&l.value.has(t)){let e=n.findIndex(e=>l.value.has(e));e>-1&&n.splice(e,1)}n.push(t)}S(n)}let T=t=>{let n=c.value.getPath(t??f.value,{includeSelf:!1}).keyPath;if(!n.length)return;let r=Array.from(_.value),i=new Set([...r,...n]);e.accordion&&l.value.forEach(e=>{i.has(e)&&!n.includes(e)&&i.delete(e)}),S(Array.from(i))},E=L(()=>{let{inverted:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value,{borderRadius:a,borderColorHorizontal:o,fontSize:s,itemHeight:c,dividerColor:l}=i,u={"--n-divider-color":l,"--n-bezier":n,"--n-font-size":s,"--n-border-color-horizontal":o,"--n-border-radius":a,"--n-item-height":c};return t?(u[`--n-group-text-color`]=i.groupTextColorInverted,u[`--n-color`]=i.colorInverted,u[`--n-item-text-color`]=i.itemTextColorInverted,u[`--n-item-text-color-hover`]=i.itemTextColorHoverInverted,u[`--n-item-text-color-active`]=i.itemTextColorActiveInverted,u[`--n-item-text-color-child-active`]=i.itemTextColorChildActiveInverted,u[`--n-item-text-color-child-active-hover`]=i.itemTextColorChildActiveInverted,u[`--n-item-text-color-active-hover`]=i.itemTextColorActiveHoverInverted,u[`--n-item-icon-color`]=i.itemIconColorInverted,u[`--n-item-icon-color-hover`]=i.itemIconColorHoverInverted,u[`--n-item-icon-color-active`]=i.itemIconColorActiveInverted,u[`--n-item-icon-color-active-hover`]=i.itemIconColorActiveHoverInverted,u[`--n-item-icon-color-child-active`]=i.itemIconColorChildActiveInverted,u[`--n-item-icon-color-child-active-hover`]=i.itemIconColorChildActiveHoverInverted,u[`--n-item-icon-color-collapsed`]=i.itemIconColorCollapsedInverted,u[`--n-item-text-color-horizontal`]=i.itemTextColorHorizontalInverted,u[`--n-item-text-color-hover-horizontal`]=i.itemTextColorHoverHorizontalInverted,u[`--n-item-text-color-active-horizontal`]=i.itemTextColorActiveHorizontalInverted,u[`--n-item-text-color-child-active-horizontal`]=i.itemTextColorChildActiveHorizontalInverted,u[`--n-item-text-color-child-active-hover-horizontal`]=i.itemTextColorChildActiveHoverHorizontalInverted,u[`--n-item-text-color-active-hover-horizontal`]=i.itemTextColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-horizontal`]=i.itemIconColorHorizontalInverted,u[`--n-item-icon-color-hover-horizontal`]=i.itemIconColorHoverHorizontalInverted,u[`--n-item-icon-color-active-horizontal`]=i.itemIconColorActiveHorizontalInverted,u[`--n-item-icon-color-active-hover-horizontal`]=i.itemIconColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-child-active-horizontal`]=i.itemIconColorChildActiveHorizontalInverted,u[`--n-item-icon-color-child-active-hover-horizontal`]=i.itemIconColorChildActiveHoverHorizontalInverted,u[`--n-arrow-color`]=i.arrowColorInverted,u[`--n-arrow-color-hover`]=i.arrowColorHoverInverted,u[`--n-arrow-color-active`]=i.arrowColorActiveInverted,u[`--n-arrow-color-active-hover`]=i.arrowColorActiveHoverInverted,u[`--n-arrow-color-child-active`]=i.arrowColorChildActiveInverted,u[`--n-arrow-color-child-active-hover`]=i.arrowColorChildActiveHoverInverted,u[`--n-item-color-hover`]=i.itemColorHoverInverted,u[`--n-item-color-active`]=i.itemColorActiveInverted,u[`--n-item-color-active-hover`]=i.itemColorActiveHoverInverted,u[`--n-item-color-active-collapsed`]=i.itemColorActiveCollapsedInverted):(u[`--n-group-text-color`]=i.groupTextColor,u[`--n-color`]=i.color,u[`--n-item-text-color`]=i.itemTextColor,u[`--n-item-text-color-hover`]=i.itemTextColorHover,u[`--n-item-text-color-active`]=i.itemTextColorActive,u[`--n-item-text-color-child-active`]=i.itemTextColorChildActive,u[`--n-item-text-color-child-active-hover`]=i.itemTextColorChildActiveHover,u[`--n-item-text-color-active-hover`]=i.itemTextColorActiveHover,u[`--n-item-icon-color`]=i.itemIconColor,u[`--n-item-icon-color-hover`]=i.itemIconColorHover,u[`--n-item-icon-color-active`]=i.itemIconColorActive,u[`--n-item-icon-color-active-hover`]=i.itemIconColorActiveHover,u[`--n-item-icon-color-child-active`]=i.itemIconColorChildActive,u[`--n-item-icon-color-child-active-hover`]=i.itemIconColorChildActiveHover,u[`--n-item-icon-color-collapsed`]=i.itemIconColorCollapsed,u[`--n-item-text-color-horizontal`]=i.itemTextColorHorizontal,u[`--n-item-text-color-hover-horizontal`]=i.itemTextColorHoverHorizontal,u[`--n-item-text-color-active-horizontal`]=i.itemTextColorActiveHorizontal,u[`--n-item-text-color-child-active-horizontal`]=i.itemTextColorChildActiveHorizontal,u[`--n-item-text-color-child-active-hover-horizontal`]=i.itemTextColorChildActiveHoverHorizontal,u[`--n-item-text-color-active-hover-horizontal`]=i.itemTextColorActiveHoverHorizontal,u[`--n-item-icon-color-horizontal`]=i.itemIconColorHorizontal,u[`--n-item-icon-color-hover-horizontal`]=i.itemIconColorHoverHorizontal,u[`--n-item-icon-color-active-horizontal`]=i.itemIconColorActiveHorizontal,u[`--n-item-icon-color-active-hover-horizontal`]=i.itemIconColorActiveHoverHorizontal,u[`--n-item-icon-color-child-active-horizontal`]=i.itemIconColorChildActiveHorizontal,u[`--n-item-icon-color-child-active-hover-horizontal`]=i.itemIconColorChildActiveHoverHorizontal,u[`--n-arrow-color`]=i.arrowColor,u[`--n-arrow-color-hover`]=i.arrowColorHover,u[`--n-arrow-color-active`]=i.arrowColorActive,u[`--n-arrow-color-active-hover`]=i.arrowColorActiveHover,u[`--n-arrow-color-child-active`]=i.arrowColorChildActive,u[`--n-arrow-color-child-active-hover`]=i.arrowColorChildActiveHover,u[`--n-item-color-hover`]=i.itemColorHover,u[`--n-item-color-active`]=i.itemColorActive,u[`--n-item-color-active-hover`]=i.itemColorActiveHover,u[`--n-item-color-active-collapsed`]=i.itemColorActiveCollapsed),u}),D=n?F(`menu`,L(()=>e.inverted?`a`:`b`),E,e):void 0,O=pe(),ee=U(null),A=U(null),j=!0,M=()=>{var e;j?j=!1:(e=ee.value)==null||e.sync({showAllItemsBeforeCalculate:!0})};function N(){return document.getElementById(O)}let P=U(-1);function I(t){P.value=e.options.length-t}function te(e){e||(P.value=-1)}let ne=L(()=>{let t=P.value;return{children:t===-1?[]:e.options.slice(t)}}),re=L(()=>{let{childrenField:t,disabledField:n,keyField:r}=e;return K([ne.value],{getIgnored(e){return xt(e)},getChildren(e){return e[t]},getDisabled(e){return e[n]},getKey(e){return e[r]??e.name}})}),ie=L(()=>K([{}]).treeNodes[0]);function z(){if(P.value===-1)return x(Et,{root:!0,level:0,key:`__ellpisisGroupPlaceholder__`,internalKey:`__ellpisisGroupPlaceholder__`,title:`···`,tmNode:ie.value,domId:O,isEllipsisPlaceholder:!0});let e=re.value.treeNodes[0],t=y.value;return x(Et,{level:0,root:!0,key:`__ellpisisGroup__`,internalKey:`__ellpisisGroup__`,title:`···`,virtualChildActive:!!e.children?.some(e=>t.includes(e.key)),tmNode:e,domId:O,rawNodes:e.rawNode.children||[],tmNodes:e.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:t,controlledExpandedKeys:h,uncontrolledExpanededKeys:p,mergedExpandedKeys:_,uncontrolledValue:d,mergedValue:f,activePath:y,tmNodes:v,mergedTheme:r,mergedCollapsed:s,cssVars:n?void 0:E,themeClass:D?.themeClass,overflowRef:ee,counterRef:A,updateCounter:()=>{},onResize:M,onUpdateOverflow:te,onUpdateCount:I,renderCounter:z,getCounter:N,onRender:D?.onRender,showOption:T,deriveResponsiveState:M}},render(){let{mergedClsPrefix:e,mode:t,themeClass:n,onRender:r}=this;r?.();let i=()=>this.tmNodes.map(e=>Ct(e,this.$props)),a=t===`horizontal`&&this.responsive,s=()=>x(`div`,ie(this.$attrs,{role:t===`horizontal`?`menubar`:`menu`,class:[`${e}-menu`,n,`${e}-menu--${t}`,a&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),a?x(fe,{ref:`overflowRef`,onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:i,counter:this.renderCounter}):i());return a?x(o,{onResize:this.onResize},{default:s}):s()}}),Ot={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},kt=r({name:`ArchiveOutline`,render:function(e,t){return d(),G(`svg`,Ot,t[0]||=[I(`path`,{d:`M80 152v256a40.12 40.12 0 0 0 40 40h272a40.12 40.12 0 0 0 40-40V152`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),I(`rect`,{x:`48`,y:`64`,width:`416`,height:`80`,rx:`28`,ry:`28`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M320 304l-64 64l-64-64`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 345.89V224`},null,-1)])}}),At={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},jt=r({name:`CodeSlashOutline`,render:function(e,t){return d(),G(`svg`,At,t[0]||=[I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M160 368L32 256l128-112`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M352 368l128-112l-128-112`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M304 96l-96 320`},null,-1)])}}),Mt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Nt=r({name:`CubeOutline`,render:function(e,t){return d(),G(`svg`,Mt,t[0]||=[I(`path`,{d:`M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M69 153.99l187 110l187-110`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 463.99v-200`},null,-1)])}}),Pt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ft=r({name:`DocumentTextOutline`,render:function(e,t){return d(),G(`svg`,Pt,t[0]||=[I(`path`,{d:`M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),I(`path`,{d:`M256 56v120a32 32 0 0 0 32 32h120`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h160`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 368h160`},null,-1)])}}),It={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Lt=r({name:`GitNetworkOutline`,render:function(e,t){return d(),G(`svg`,It,t[0]||=[A(`<circle cx="128" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="256" cy="416" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 256v112"></path><circle cx="384" cy="96" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path d="M128 144c0 74.67 68.92 112 128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path d="M384 144c0 74.67-68.92 112-128 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>`,6)])}}),Rt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},zt=r({name:`GridOutline`,render:function(e,t){return d(),G(`svg`,Rt,t[0]||=[I(`rect`,{x:`48`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),I(`rect`,{x:`288`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),I(`rect`,{x:`48`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),I(`rect`,{x:`288`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Bt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Vt=r({name:`LogOutOutline`,render:function(e,t){return d(),G(`svg`,Bt,t[0]||=[I(`path`,{d:`M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 336l80-80l-80-80`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 256h256`},null,-1)])}}),Ht={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Ut=r({name:`ReaderOutline`,render:function(e,t){return d(),G(`svg`,Ht,t[0]||=[I(`rect`,{x:`96`,y:`48`,width:`320`,height:`416`,rx:`48`,ry:`48`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 128h160`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 208h160`},null,-1),I(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h80`},null,-1)])}}),Wt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Gt=r({name:`SettingsOutline`,render:function(e,t){return d(),G(`svg`,Wt,t[0]||=[I(`path`,{d:`M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Kt={key:0,class:`brand-copy`},qt={class:`account`},Jt={class:`account-copy`},Yt={class:`update-banner-body`},Xt=r({__name:`AppLayout`,setup(e){let t=Oe(),n=Te(),r=ke(),i=he(),a=Se(),o=U(window.innerWidth<900);function s(e,t,n){return{label:()=>x(De,{to:{name:t}},{default:()=>e}),key:t,icon:()=>x(X,null,{default:()=>x(n)})}}let u=[s(`运行概览`,`dashboard`,zt),s(`代理编排`,`orchestration`,Lt),s(`配置管理`,`config`,Ft),s(`配置能力`,`schema`,jt),s(`dae 版本`,`versions`,Nt),s(`运行日志`,`logs`,Ut),s(`配置备份`,`backups`,kt),s(`面板设置`,`settings`,Gt)],f=L(()=>String(t.name||`dashboard`)),m=L(()=>String(t.meta.title||`kdae-panel`));async function h(){try{await r.logout(),await n.replace({name:`login`})}catch(e){i.error(e instanceof Error?e.message:`退出登录失败`)}}function g(){r.clearSession(),n.replace({name:`login`}),i.warning(`登录会话已过期，请重新登录`)}function _(){window.innerWidth<900&&(o.value=!0)}let y=U(null),b=U(!1),S=U(!1),w=U(!1),T=L(()=>y.value?.status?.enabled===!0&&y.value.status.updatable),E=L(()=>y.value?.status!==void 0&&!y.value.status.enabled);async function D(){try{y.value=await te(`/api/v1/panel/update`)}catch{y.value=null}}function k(){let e=y.value?.check.latest;a.warning({title:`升级面板到 ${e}`,content:`面板会下载发布包、比对 sha256，用新版本自证能在本机运行，然后替换 ${y.value?.status?.binaryPath} 并重启自身。重启期间面板会短暂无法访问（通常几秒），dae 与代理流量不受影响。上一版会保留一份副本，万一新版本起不来可以手工换回。`,positiveText:`下载并升级`,negativeText:`取消`,onPositiveClick:()=>A(e)})}async function A(e){S.value=!0;try{await ee(`/api/v1/panel/update`,e?{version:e}:{}),i.info(`已开始升级，面板重启后页面会自动刷新`),R(e)}catch(e){S.value=!1,i.error(e instanceof Error?e.message:`启动升级失败`)}}function N(){let e=y.value?.check.latest;a.warning({title:`启用并升级到 ${e}`,content:`启用状态会保存在面板数据目录，以后有新版本即可直接在这里升级。本次会下载并校验发布包、备份当前二进制，然后重启面板；dae 与代理流量不受影响。`,positiveText:`启用并升级`,negativeText:`取消`,onPositiveClick:async()=>{w.value=!0;try{let t=await ae(`/api/v1/panel/update/preference`,{enabled:!0});y.value&&(y.value.status=t.status),window.dispatchEvent(new CustomEvent(`kdae-panel:self-update-changed`,{detail:t.status})),await A(e)}catch(e){i.error(e instanceof Error?e.message:`启用面板一键升级失败`)}finally{w.value=!1}}})}function F(e){let t=e.detail;y.value&&t&&(y.value.status=t)}async function R(e){let t=Date.now()+12e4;for(;Date.now()<t;){await new Promise(e=>window.setTimeout(e,2e3));try{let t=await te(`/api/v1/health`);if(!e||t.version===e){window.location.reload();return}}catch{}}S.value=!1,i.warning(`等待面板重启超时，请手动刷新页面确认升级结果`)}return c(()=>{window.addEventListener(`kdae-panel:auth-expired`,g),window.addEventListener(`kdae-panel:self-update-changed`,F),window.addEventListener(`resize`,_),D()}),p(()=>{window.removeEventListener(`kdae-panel:auth-expired`,g),window.removeEventListener(`kdae-panel:self-update-changed`,F),window.removeEventListener(`resize`,_)}),(e,t)=>{let n=C(`RouterView`);return d(),O(H(Ye),{"has-sider":``,class:`app-shell`},{default:l(()=>[v(H(it),{bordered:``,"collapse-mode":`width`,"collapsed-width":64,width:236,collapsed:o.value,"show-trigger":`bar`,onCollapse:t[0]||=e=>o.value=!0,onExpand:t[1]||=e=>o.value=!1},{default:l(()=>[I(`div`,{class:j([`brand`,{compact:o.value}])},[t[4]||=I(`div`,{class:`brand-mark`},`K`,-1),o.value?se(``,!0):(d(),G(`div`,Kt,[...t[3]||=[I(`strong`,null,`kdae-panel`,-1),I(`span`,null,`零侵入管理面板`,-1)]]))],2),v(H(Dt),{value:f.value,collapsed:o.value,"collapsed-width":64,"collapsed-icon-size":22,options:u},null,8,[`value`,`collapsed`])]),_:1},8,[`collapsed`]),v(H(Ye),null,{default:l(()=>[v(H($e),{bordered:``,class:`app-header`},{default:l(()=>[I(`div`,null,[v(H(ge),{depth:`3`,class:`eyebrow`},{default:l(()=>[...t[5]||=[W(`KDAE CONTROL PLANE`,-1)]]),_:1}),I(`h1`,null,z(m.value),1)]),I(`div`,qt,[v(H(Be),{round:``,size:`small`},{default:l(()=>[W(z(H(r).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),I(`div`,Jt,[I(`strong`,null,z(H(r).user?.username),1),t[6]||=I(`span`,null,`管理员`,-1)]),v(H(P),{quaternary:``,circle:``,title:`退出登录`,onClick:h},{icon:l(()=>[v(H(X),null,{default:l(()=>[v(H(Vt))]),_:1})]),_:1})])]),_:1}),v(H(Xe),{class:`app-content`,"content-style":`padding: 28px;`},{default:l(()=>[y.value?.check.updateAvailable&&!b.value?(d(),O(H(xe),{key:0,type:`info`,closable:!S.value,class:`update-banner`,onClose:t[2]||=e=>b.value=!0},{default:l(()=>[I(`div`,Yt,[I(`span`,null,[t[7]||=W(` 面板有新版本 `,-1),I(`strong`,null,z(y.value.check.latest),1),W(`（当前 `+z(y.value.check.current)+`）。 `,1),T.value?(d(),G(M,{key:0},[W(`升级会替换面板二进制并重启自身，配置与账号数据都会保留。`)],64)):E.value?(d(),G(M,{key:1},[W(`可直接在这里启用一键升级，不需要 SSH。`)],64)):y.value.status?.problem?(d(),G(M,{key:2},[W(`当前无法一键升级：`+z(y.value.status.problem),1)],64)):(d(),G(M,{key:3},[W(`当前部署不支持一键升级，可重新执行一键部署命令。`)],64)),t[8]||=I(`a`,{href:`https://github.com/tuoro/kdae-panel/releases/latest`,target:`_blank`,rel:`noopener`},`查看发布说明`,-1)]),T.value?(d(),O(H(P),{key:0,size:`small`,type:`primary`,loading:S.value,disabled:S.value,onClick:k},{icon:l(()=>[v(H(X),null,{default:l(()=>[v(H(Ae))]),_:1})]),default:l(()=>[W(` `+z(S.value?`升级中…`:`立即升级`),1)]),_:1},8,[`loading`,`disabled`])):E.value?(d(),O(H(P),{key:1,size:`small`,type:`primary`,loading:w.value||S.value,disabled:w.value||S.value,onClick:N},{icon:l(()=>[v(H(X),null,{default:l(()=>[v(H(Ae))]),_:1})]),default:l(()=>[t[9]||=W(` 启用并升级 `,-1)]),_:1},8,[`loading`,`disabled`])):se(``,!0)])]),_:1},8,[`closable`])):se(``,!0),v(n)]),_:1})]),_:1})]),_:1})}}});export{Xt as default};