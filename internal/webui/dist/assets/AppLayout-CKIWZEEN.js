import{$n as e,$t as t,Cn as n,D as r,Dn as i,E as a,Fn as o,Gn as s,J as c,Jn as l,K as u,L as d,N as f,Nn as p,On as m,Q as h,Qn as g,Sn as _,Tn as v,U as y,Un as b,V as x,Vn as ee,Wn as S,X as C,Y as w,Zn as T,_ as te,_n as E,_r as D,_t as O,an as k,bt as A,ct as j,dt as M,en as N,et as P,f as F,ft as I,gr as L,hr as R,i as ne,in as z,jn as B,k as re,kn as V,lr as H,lt as U,nn as W,on as ie,pr as G,q as ae,qn as oe,rn as K,sn as se,vr as q,w as ce,wn as J,xn as Y,xt as le,z as ue,zn as de}from"./client-DecrR2G0.js";import{r as fe,t as pe}from"./create-BssiVmzz.js";import{t as me}from"./misc-DDs3MKLt.js";import{t as he}from"./use-merged-state-Dvb8YPIJ.js";import{i as ge,n as _e,r as ve,t as ye}from"./text-DpnNyaQe.js";import{a as be,n as xe,r as Se,t as Ce}from"./useMobileViewport-Dvzs-Sbs.js";import{r as we,t as X}from"./Icon-DtptHnlV.js";import{t as Te}from"./Alert-B8_bHhkA.js";import{n as Ee,t as De}from"./DrawerContent-CTBAtG2B.js";import{L as Z,P as Oe,Q as ke,i as Ae,n as je,r as Me,t as Ne,u as Pe,z as Fe}from"./index-CII6alhR.js";import{t as Ie}from"./SwapHorizontalOutline-PmmMnoVu.js";import{t as Le}from"./PanelUpdateAction-Bm4bg_VH.js";var Re=te&&`loading`in document.createElement(`img`);function ze(e={}){let{root:t=null}=e;return{hash:`${e.rootMargin||`0px 0px 0px 0px`}-${Array.isArray(e.threshold)?e.threshold.join(`,`):e.threshold??`0`}`,options:{...e,root:(typeof t==`string`?document.querySelector(t):t)||document.documentElement}}}var Be=new WeakMap,Ve=new WeakMap,He=new WeakMap,Ue=(e,t,n)=>{if(!e)return()=>{};let r=ze(t),{root:i}=r.options,a,o=Be.get(i);o?a=o:(a=new Map,Be.set(i,a));let s,c;a.has(r.hash)?(c=a.get(r.hash),c[1].has(e)||(s=c[0],c[1].add(e),s.observe(e))):(s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=Ve.get(e.target),n=He.get(e.target);t&&t(),n&&(n.value=!0)}})},r.options),s.observe(e),c=[s,new Set([e])],a.set(r.hash,c));let l=!1,u=()=>{l||(Ve.delete(e),He.delete(e),l=!0,c[1].has(e)&&(c[0].unobserve(e),c[1].delete(e)),c[1].size<=0&&a.delete(r.hash),a.size||Be.delete(i))};return Ve.set(e,u),He.set(e,n),u},We=A(`n-avatar-group`),Ge=N(`avatar`,`
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
`,[ie(t(`&`,`--n-merged-color: var(--n-color-modal);`)),se(t(`&`,`--n-merged-color: var(--n-color-popover);`)),t(`img`,`
 width: 100%;
 height: 100%;
 `),W(`text`,`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),N(`icon`,`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),W(`text`,`line-height: 1.25`)]),Ke=[`src`],qe={...c.props,size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String},Je=V({name:`Avatar`,props:qe,slots:Object,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=O(e),r=H(!1),i=null,o=H(null),s=H(null),l=()=>{let{value:e}=o;if(e&&(i===null||i!==e.innerHTML)){i=e.innerHTML;let{value:t}=s;if(t){let{offsetWidth:n,offsetHeight:r}=t,{offsetWidth:i,offsetHeight:a}=e,o=.9,s=Math.min(n/i*o,r/a*o,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${s})`}}},u=p(We,null),d=Y(()=>{let{size:t}=e;if(t)return t;let{size:n}=u||{};return n||`medium`}),f=c(`Avatar`,`-avatar`,Ge,Oe,e,t),m=p(we,null),h=Y(()=>{if(u)return!0;let{round:t,circle:n}=e;return t!==void 0||n!==void 0?t||n:m?m.roundRef.value:!1}),_=Y(()=>u?!0:e.bordered||!1),v=Y(()=>{let t=d.value,n=h.value,r=_.value,{color:i}=e,{self:{borderRadius:a,fontSize:o,color:s,border:c,colorModal:l,colorPopover:u},common:{cubicBezierEaseInOut:p}}=f.value,m;return m=typeof t==`number`?`${t}px`:f.value.self[k(`height`,t)],{"--n-font-size":o,"--n-border":r?c:`none`,"--n-border-radius":n?`50%`:a,"--n-color":i||s,"--n-color-modal":i||l,"--n-color-popover":i||u,"--n-bezier":p,"--n-merged-size":`var(--n-avatar-size-override, ${m})`}}),y=n?w(`avatar`,Y(()=>{let t=d.value,n=h.value,r=_.value,{color:i}=e,o=``;return t&&(o+=typeof t==`number`?`a${t}`:t[0]),n&&(o+=`b`),r&&(o+=`c`),i&&(o+=a(i)),o}),v,e):void 0,b=H(!e.lazy);ee(()=>{if(e.lazy&&e.intersectionObserverOptions){let t,n=g(()=>{t?.(),t=void 0,e.lazy&&(t=Ue(s.value,e.intersectionObserverOptions,b))});de(()=>{n(),t?.()})}}),T(()=>e.src||e.imgProps?.src,()=>{r.value=!1});let x=H(!e.lazy);return{textRef:o,selfRef:s,mergedRoundRef:h,mergedClsPrefix:t,fitTextTransform:l,cssVars:n?void 0:v,themeClass:y?.themeClass,onRender:y?.onRender,hasLoadError:r,shouldStartLoading:b,loaded:x,mergedOnError:t=>{if(!b.value)return;r.value=!0;let{onError:n,imgProps:{onError:i}={}}=e;n?.(t),i?.(t)},mergedOnLoad:t=>{let{onLoad:n,imgProps:{onLoad:r}={}}=e;n?.(t),r?.(t),x.value=!0}}},render(){let{$slots:e,src:t,mergedClsPrefix:r,lazy:i,onRender:a,loaded:o,hasLoadError:s,imgProps:c={}}=this;a?.();let l,u=!o&&!s&&(this.renderPlaceholder?this.renderPlaceholder():this.$slots.placeholder?.());return l=this.hasLoadError?this.renderFallback?this.renderFallback():d(e.fallback,()=>[(b(),v(`img`,{src:this.fallbackSrc,style:D({objectFit:this.objectFit})},null,12,Ke))]):ue(e.default,e=>{if(e)return b(),n(re,{key:1,onResize:this.fitTextTransform},{default:()=>(b(),v(`span`,{ref:`textRef`,class:U(`${r}-avatar__text`)},[I(()=>e)],2))},1032,[`onResize`]);if(t||c.src){let e=this.src||c.src;return B(`img`,{...c,loading:Re&&!this.intersectionObserverOptions&&i?`lazy`:`eager`,src:i&&this.intersectionObserverOptions?this.shouldStartLoading?e:void 0:e,"data-image-src":e,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[c.style||``,{objectFit:this.objectFit},u?{height:`0`,width:`0`,visibility:`hidden`,position:`absolute`}:``]})}}),b(),v(`span`,{ref:`selfRef`,class:U([`${r}-avatar`,this.themeClass]),style:D(this.cssVars)},[I(()=>l),I(()=>i&&u)],6)}});function Ye(e){let{baseColor:t,textColor2:n,bodyColor:r,cardColor:i,dividerColor:a,actionColor:o,scrollbarColor:s,scrollbarColorHover:c,invertedColor:l}=e;return{textColor:n,textColorInverted:`#FFF`,color:r,colorEmbedded:o,headerColor:i,headerColorInverted:l,footerColor:o,footerColorInverted:l,headerBorderColor:a,headerBorderColorInverted:l,footerBorderColor:a,footerBorderColorInverted:l,siderBorderColor:a,siderBorderColorInverted:l,siderColor:i,siderColorInverted:l,siderToggleButtonBorder:`1px solid ${a}`,siderToggleButtonColor:t,siderToggleButtonIconColor:n,siderToggleButtonIconColorInverted:n,siderToggleBarColor:P(r,s),siderToggleBarColorHover:P(r,c),__invertScrollbar:`true`}}var Xe=ae({name:`Layout`,common:h,peers:{Scrollbar:C},self:Ye}),Ze=A(`n-layout-sider`),Qe={type:String,default:`static`},$e=N(`layout`,`
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
`,[N(`layout-scroll-container`,`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),K(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),et={embedded:Boolean,position:Qe,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:``},hasSider:Boolean,siderPlacement:{type:String,default:`left`}},tt=A(`n-layout`);function nt(e){return V({name:e?`LayoutContent`:`Layout`,props:{...c.props,...et},setup(e){let t=H(null),n=H(null),{mergedClsPrefixRef:r,inlineThemeDisabled:i}=O(e),a=c(`Layout`,`-layout`,$e,Xe,e,r);function o(r,i){if(e.nativeScrollbar){let{value:e}=t;e&&(i===void 0?e.scrollTo(r):e.scrollTo(r,i))}else{let{value:e}=n;e&&e.scrollTo(r,i)}}S(tt,e);let s=0,l=0,u=t=>{let n=t.target;s=n.scrollLeft,l=n.scrollTop,e.onScroll?.(t)};f(()=>{if(e.nativeScrollbar){let e=t.value;e&&(e.scrollTop=l,e.scrollLeft=s)}});let d={display:`flex`,flexWrap:`nowrap`,width:`100%`,flexDirection:`row`},p={scrollTo:o},m=Y(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=a.value;return{"--n-bezier":t,"--n-color":e.embedded?n.colorEmbedded:n.color,"--n-text-color":n.textColor}}),h=i?w(`layout`,Y(()=>e.embedded?`e`:``),m,e):void 0;return{mergedClsPrefix:r,scrollableElRef:t,scrollbarInstRef:n,hasSiderStyle:d,mergedTheme:a,handleNativeElScroll:u,cssVars:i?void 0:m,themeClass:h?.themeClass,onRender:h?.onRender,...p}},render(){let{mergedClsPrefix:t,hasSider:i}=this;this.onRender?.();let a=i?this.hasSiderStyle:void 0,s=[this.themeClass,e&&`${t}-layout-content`,`${t}-layout`,`${t}-layout--${this.position}-positioned`];return b(),v(`div`,{class:U(s),style:D(this.cssVars)},[this.nativeScrollbar?(b(),v(`div`,{key:0,ref:`scrollableElRef`,class:U([`${t}-layout-scroll-container`,this.contentClass]),style:D([this.contentStyle,a]),onScroll:this.handleNativeElScroll},[I(()=>this.$slots.default?.())],46,[`onScroll`])):(b(),n(r,o({key:1},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,a]}),M(this.$slots),1040,[`onScroll`,`theme`,`themeOverrides`,`contentClass`,`contentStyle`]))],6)}})}var rt=nt(!1),it=nt(!0),at=N(`layout-header`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[K(`absolute-positioned`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),K(`bordered`,`
 border-bottom: solid 1px var(--n-border-color);
 `)]),ot={position:Qe,inverted:Boolean,bordered:Boolean},st=V({name:`LayoutHeader`,props:{...c.props,...ot},setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=O(e),r=c(`Layout`,`-layout-header`,at,Xe,e,t),i=Y(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=r.value,i={"--n-bezier":t};return e.inverted?(i[`--n-color`]=n.headerColorInverted,i[`--n-text-color`]=n.textColorInverted,i[`--n-border-color`]=n.headerBorderColorInverted):(i[`--n-color`]=n.headerColor,i[`--n-text-color`]=n.textColor,i[`--n-border-color`]=n.headerBorderColor),i}),a=n?w(`layout-header`,Y(()=>e.inverted?`a`:`b`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a?.themeClass,onRender:a?.onRender}},render(){let{mergedClsPrefix:e}=this;return this.onRender?.(),b(),v(`div`,{class:U([`${e}-layout-header`,this.themeClass,this.position&&`${e}-layout-header--${this.position}-positioned`,this.bordered&&`${e}-layout-header--bordered`]),style:D(this.cssVars)},[I(()=>this.$slots.default?.())],6)}}),ct=N(`layout-sider`,`
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
`,[K(`bordered`,[W(`border`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),W(`left-placement`,[K(`bordered`,[W(`border`,`
 right: 0;
 `)])]),K(`right-placement`,`
 justify-content: flex-start;
 `,[K(`bordered`,[W(`border`,`
 left: 0;
 `)]),K(`collapsed`,[N(`layout-toggle-button`,[N(`base-icon`,`
 transform: rotate(180deg);
 `)]),N(`layout-toggle-bar`,[t(`&:hover`,[W(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),W(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])])]),N(`layout-toggle-button`,`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[N(`base-icon`,`
 transform: rotate(0);
 `)]),N(`layout-toggle-bar`,`
 left: -28px;
 transform: rotate(180deg);
 `,[t(`&:hover`,[W(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),W(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})])])]),K(`collapsed`,[N(`layout-toggle-bar`,[t(`&:hover`,[W(`top`,{transform:`rotate(-12deg) scale(1.15) translateY(-2px)`}),W(`bottom`,{transform:`rotate(12deg) scale(1.15) translateY(2px)`})])]),N(`layout-toggle-button`,[N(`base-icon`,`
 transform: rotate(0);
 `)])]),N(`layout-toggle-button`,`
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
 `,[N(`base-icon`,`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),N(`layout-toggle-bar`,`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[W(`top, bottom`,`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),W(`bottom`,`
 position: absolute;
 top: 34px;
 `),t(`&:hover`,[W(`top`,{transform:`rotate(12deg) scale(1.15) translateY(-2px)`}),W(`bottom`,{transform:`rotate(-12deg) scale(1.15) translateY(2px)`})]),W(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color)`}),t(`&:hover`,[W(`top, bottom`,{backgroundColor:`var(--n-toggle-bar-color-hover)`})])]),W(`border`,`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),N(`layout-sider-scroll-container`,`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),K(`show-content`,[N(`layout-sider-scroll-container`,{opacity:1})]),K(`absolute-positioned`,`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),lt=[`onClick`],ut=V({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return b(),v(`div`,{onClick:this.onClick,class:U(`${e}-layout-toggle-bar`)},[_(`div`,{class:U(`${e}-layout-toggle-bar__top`)},null,2),_(`div`,{class:U(`${e}-layout-toggle-bar__bottom`)},null,2)],10,lt)}}),dt=[`onClick`],ft=V({name:`LayoutToggleButton`,props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){let{clsPrefix:e}=this;return b(),v(`div`,{class:U(`${e}-layout-toggle-button`),onClick:this.onClick},[(b(),n(u,{clsPrefix:e},{default:()=>(b(),n(be))},1032,[`clsPrefix`]))],10,dt)}}),pt=[`onTransitionend`],mt={position:Qe,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:``},collapseMode:{type:String,default:`transform`},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},ht=V({name:`LayoutSider`,props:{...c.props,...mt},setup(e){let t=p(tt),n=H(null),r=H(null),i=H(e.defaultCollapsed),a=he(G(e,`collapsed`),i),o=Y(()=>ve(a.value?e.collapsedWidth:e.width)),s=Y(()=>e.collapseMode===`transform`?{minWidth:ve(e.width)}:{}),l=Y(()=>t?t.siderPlacement:`left`);function u(t,i){if(e.nativeScrollbar){let{value:e}=n;e&&(i===void 0?e.scrollTo(t):e.scrollTo(t,i))}else{let{value:e}=r;e&&e.scrollTo(t,i)}}function d(){let{"onUpdate:collapsed":t,onUpdateCollapsed:n,onExpand:r,onCollapse:o}=e,{value:s}=a;n&&x(n,!s),t&&x(t,!s),i.value=!s,s?r&&x(r):o&&x(o)}let m=0,h=0,g=t=>{let n=t.target;m=n.scrollLeft,h=n.scrollTop,e.onScroll?.(t)};f(()=>{if(e.nativeScrollbar){let e=n.value;e&&(e.scrollTop=h,e.scrollLeft=m)}}),S(Ze,{collapsedRef:a,collapseModeRef:G(e,`collapseMode`)});let{mergedClsPrefixRef:_,inlineThemeDisabled:v}=O(e),y=c(`Layout`,`-layout-sider`,ct,Xe,e,_);function b(t){t.propertyName===`max-width`&&(a.value?e.onAfterLeave?.():e.onAfterEnter?.())}let ee={scrollTo:u},C=Y(()=>{let{common:{cubicBezierEaseInOut:t},self:n}=y.value,{siderToggleButtonColor:r,siderToggleButtonBorder:i,siderToggleBarColor:a,siderToggleBarColorHover:o}=n,s={"--n-bezier":t,"--n-toggle-button-color":r,"--n-toggle-button-border":i,"--n-toggle-bar-color":a,"--n-toggle-bar-color-hover":o};return e.inverted?(s[`--n-color`]=n.siderColorInverted,s[`--n-text-color`]=n.textColorInverted,s[`--n-border-color`]=n.siderBorderColorInverted,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColorInverted,s.__invertScrollbar=n.__invertScrollbar):(s[`--n-color`]=n.siderColor,s[`--n-text-color`]=n.textColor,s[`--n-border-color`]=n.siderBorderColor,s[`--n-toggle-button-icon-color`]=n.siderToggleButtonIconColor),s}),T=v?w(`layout-sider`,Y(()=>e.inverted?`a`:`b`),C,e):void 0;return{scrollableElRef:n,scrollbarInstRef:r,mergedClsPrefix:_,mergedTheme:y,styleMaxWidth:o,mergedCollapsed:a,scrollContainerStyle:s,siderPlacement:l,handleNativeElScroll:g,handleTransitionend:b,handleTriggerClick:d,inlineThemeDisabled:v,cssVars:C,themeClass:T?.themeClass,onRender:T?.onRender,...ee}},render(){let{mergedClsPrefix:e,mergedCollapsed:t,showTrigger:i}=this;return this.onRender?.(),b(),v(`aside`,{class:U([`${e}-layout-sider`,this.themeClass,`${e}-layout-sider--${this.position}-positioned`,`${e}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${e}-layout-sider--bordered`,t&&`${e}-layout-sider--collapsed`,(!t||this.showCollapsedContent)&&`${e}-layout-sider--show-content`]),onTransitionend:this.handleTransitionend,style:D([this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:ve(this.width)}])},[this.nativeScrollbar?(b(),v(`div`,{key:1,class:U([`${e}-layout-sider-scroll-container`,this.contentClass]),onScroll:this.handleNativeElScroll,style:D([this.scrollContainerStyle,{overflow:`auto`},this.contentStyle]),ref:`scrollableElRef`},[I(()=>this.$slots.default?.())],46,[`onScroll`])):(b(),n(r,o({key:0},this.scrollbarProps,{onScroll:this.onScroll,ref:`scrollbarInstRef`,style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar===`true`?{colorHover:`rgba(255, 255, 255, .4)`,color:`rgba(255, 255, 255, .3)`}:void 0}),M(this.$slots),1040,[`onScroll`,`style`,`contentStyle`,`contentClass`,`theme`,`themeOverrides`,`builtinThemeOverrides`])),i?(b(),v(E,{key:2},[i===`bar`?(b(),n(ut,{key:0,clsPrefix:e,class:U(t?this.collapsedTriggerClass:this.triggerClass),style:D(t?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`])):(b(),n(ft,{key:1,clsPrefix:e,class:U(t?this.collapsedTriggerClass:this.triggerClass),style:D(t?this.collapsedTriggerStyle:this.triggerStyle),onClick:this.handleTriggerClick},null,8,[`clsPrefix`,`class`,`style`,`onClick`]))],64)):I(()=>null),this.bordered?(b(),v(`div`,{key:4,class:U(`${e}-layout-sider__border`)},null,2)):I(()=>null)],46,pt)}}),Q=A(`n-menu`),gt=A(`n-submenu`),_t=A(`n-menu-item-group`),vt=[t(`&::before`,`background-color: var(--n-item-color-hover);`),W(`arrow`,`
 color: var(--n-arrow-color-hover);
 `),W(`icon`,`
 color: var(--n-item-icon-color-hover);
 `),N(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover);
 `,[t(`a`,`
 color: var(--n-item-text-color-hover);
 `),W(`extra`,`
 color: var(--n-item-text-color-hover);
 `)])],yt=[W(`icon`,`
 color: var(--n-item-icon-color-hover-horizontal);
 `),N(`menu-item-content-header`,`
 color: var(--n-item-text-color-hover-horizontal);
 `,[t(`a`,`
 color: var(--n-item-text-color-hover-horizontal);
 `),W(`extra`,`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],bt=t([N(`menu`,`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[K(`horizontal`,`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[N(`submenu`,`margin: 0;`),N(`menu-item`,`margin: 0;`),N(`menu-item-content`,`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[t(`&::before`,`display: none;`),K(`selected`,`border-bottom: 2px solid var(--n-border-color-horizontal)`)]),N(`menu-item-content`,[K(`selected`,[W(`icon`,`color: var(--n-item-icon-color-active-horizontal);`),N(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-horizontal);
 `,[t(`a`,`color: var(--n-item-text-color-active-horizontal);`),W(`extra`,`color: var(--n-item-text-color-active-horizontal);`)])]),K(`child-active`,`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[N(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[t(`a`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `),W(`extra`,`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),W(`icon`,`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),z(`disabled`,[z(`selected, child-active`,[t(`&:focus-within`,yt)]),K(`selected`,[$(null,[W(`icon`,`color: var(--n-item-icon-color-active-hover-horizontal);`),N(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[t(`a`,`color: var(--n-item-text-color-active-hover-horizontal);`),W(`extra`,`color: var(--n-item-text-color-active-hover-horizontal);`)])])]),K(`child-active`,[$(null,[W(`icon`,`color: var(--n-item-icon-color-child-active-hover-horizontal);`),N(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[t(`a`,`color: var(--n-item-text-color-child-active-hover-horizontal);`),W(`extra`,`color: var(--n-item-text-color-child-active-hover-horizontal);`)])])]),$(`border-bottom: 2px solid var(--n-border-color-horizontal);`,yt)]),N(`menu-item-content-header`,[t(`a`,`color: var(--n-item-text-color-horizontal);`)])])]),z(`responsive`,[N(`menu-item-content-header`,`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),K(`collapsed`,[N(`menu-item-content`,[K(`selected`,[t(`&::before`,`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),N(`menu-item-content-header`,`opacity: 0;`),W(`arrow`,`opacity: 0;`),W(`icon`,`color: var(--n-item-icon-color-collapsed);`)])]),N(`menu-item`,`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),N(`menu-item-content`,`
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
 `,[t(`> *`,`z-index: 1;`),t(`&::before`,`
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
 `),K(`disabled`,`
 opacity: .45;
 cursor: not-allowed;
 `),K(`collapsed`,[W(`arrow`,`transform: rotate(0);`)]),K(`selected`,[t(`&::before`,`background-color: var(--n-item-color-active);`),W(`arrow`,`color: var(--n-arrow-color-active);`),W(`icon`,`color: var(--n-item-icon-color-active);`),N(`menu-item-content-header`,`
 color: var(--n-item-text-color-active);
 `,[t(`a`,`color: var(--n-item-text-color-active);`),W(`extra`,`color: var(--n-item-text-color-active);`)])]),K(`child-active`,[N(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active);
 `,[t(`a`,`
 color: var(--n-item-text-color-child-active);
 `),W(`extra`,`
 color: var(--n-item-text-color-child-active);
 `)]),W(`arrow`,`
 color: var(--n-arrow-color-child-active);
 `),W(`icon`,`
 color: var(--n-item-icon-color-child-active);
 `)]),z(`disabled`,[z(`selected, child-active`,[t(`&:focus-within`,vt)]),K(`selected`,[$(null,[W(`arrow`,`color: var(--n-arrow-color-active-hover);`),W(`icon`,`color: var(--n-item-icon-color-active-hover);`),N(`menu-item-content-header`,`
 color: var(--n-item-text-color-active-hover);
 `,[t(`a`,`color: var(--n-item-text-color-active-hover);`),W(`extra`,`color: var(--n-item-text-color-active-hover);`)])])]),K(`child-active`,[$(null,[W(`arrow`,`color: var(--n-arrow-color-child-active-hover);`),W(`icon`,`color: var(--n-item-icon-color-child-active-hover);`),N(`menu-item-content-header`,`
 color: var(--n-item-text-color-child-active-hover);
 `,[t(`a`,`color: var(--n-item-text-color-child-active-hover);`),W(`extra`,`color: var(--n-item-text-color-child-active-hover);`)])])]),K(`selected`,[$(null,[t(`&::before`,`background-color: var(--n-item-color-active-hover);`)])]),$(null,vt)]),W(`icon`,`
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
 `),W(`arrow`,`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),N(`menu-item-content-header`,`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[t(`a`,`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[t(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),W(`extra`,`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),N(`submenu`,`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[N(`menu-item-content`,`
 height: var(--n-item-height);
 `),N(`submenu-children`,`
 overflow: hidden;
 padding: 0;
 `,[Fe({duration:`.2s`})])]),N(`menu-item-group`,[N(`menu-item-group-title`,`
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
 `)])]),N(`menu-tooltip`,[t(`a`,`
 color: inherit;
 text-decoration: none;
 `)]),N(`menu-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function $(e,n){return[K(`hover`,e,n),t(`&:hover`,e,n)]}var xt=V({name:`MenuDivider`,setup(){let{mergedClsPrefixRef:e,isHorizontalRef:t}=p(Q);return()=>t.value?null:(b(),v(`div`,{key:1,class:U(`${e.value}-menu-divider`)},null,2))}}),St=V({name:`ChevronDownFilled`,render(){return(()=>{let e=j(`f3af82a2aab086a5`);return e[0]||=_(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[_(`path`,{d:`M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z`,fill:`currentColor`})],-1)})()}}),Ct=[`onClick`],wt=V({name:`MenuOptionContent`,props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){let{props:t}=p(Q);return{menuProps:t,style:Y(()=>{let{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:Y(()=>{let{maxIconSize:t,activeIconSize:n,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){let{clsPrefix:e,tmNode:t,menuProps:{renderIcon:r,renderLabel:i,renderExtra:a,expandIcon:o}}=this,s=r?r(t.rawNode):Z(this.icon);return(()=>{let r=j(`7bb10afc6caf8fa4`);return b(),v(`div`,{onClick:e=>{this.onClick?.(e)},role:`none`,class:U([`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}]),style:D(this.style)},[I(()=>s&&(b(),v(`div`,{class:U(`${e}-menu-item-content__icon`),style:D(this.iconStyle),role:`none`},[I(()=>[s])],6))),_(`div`,{class:U(`${e}-menu-item-content-header`),role:`none`},[this.isEllipsisPlaceholder?(b(),v(E,{key:0},[I(()=>this.title)],64)):(b(),v(E,{key:1},[i?(b(),v(E,{key:0},[I(()=>i(t.rawNode))],64)):(b(),v(E,{key:1},[I(()=>Z(this.title))],64))],64)),this.extra||a?(b(),v(`span`,{key:2,class:U(`${e}-menu-item-content-header__extra`)},[r[0]||=I(` `,-1),a?(b(),v(E,{key:0},[I(()=>a(t.rawNode))],64)):(b(),v(E,{key:1},[I(()=>Z(this.extra))],64))],2)):I(()=>null)],2),this.showArrow?(b(),n(u,{key:0,ariaHidden:!0,class:U(`${e}-menu-item-content__arrow`),clsPrefix:e},{default:()=>o?o(t.rawNode):(b(),n(St,{key:1}))},1032,[`class`,`clsPrefix`])):I(()=>null)],14,Ct)})()}}),Tt=8;function Et(e){let t=p(Q),{props:n,mergedCollapsedRef:r}=t,i=p(gt,null),a=p(_t,null),o=Y(()=>n.mode===`horizontal`),s=Y(()=>o.value?n.dropdownPlacement:`tmNodes`in e?`right-start`:`right`),c=Y(()=>Math.max(n.collapsedIconSize??n.iconSize,n.iconSize));return{dropdownPlacement:s,activeIconSize:Y(()=>!o.value&&e.root&&r.value?n.collapsedIconSize??n.iconSize:n.iconSize),maxIconSize:c,paddingLeft:Y(()=>{if(o.value)return;let{collapsedWidth:t,indent:s,rootIndent:l}=n,{root:u,isGroup:d}=e,f=l===void 0?s:l;return u?r.value?t/2-c.value/2:f:a&&typeof a.paddingLeftRef.value==`number`?r.value?t/2-c.value/2:s/2+a.paddingLeftRef.value:i&&typeof i.paddingLeftRef.value==`number`?(d?s/2:s)+i.paddingLeftRef.value:0}),iconMarginRight:Y(()=>{let{collapsedWidth:t,indent:i,rootIndent:a}=n,{value:s}=c,{root:l}=e;return o.value||!l||!r.value?Tt:(a===void 0?i:a)+s+Tt-(t+s)/2}),NMenu:t,NSubmenu:i,NMenuOptionGroup:a}}var Dt={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},Ot={...Dt,tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function},kt=le(Ot),At=V({name:`MenuOption`,props:Ot,setup(e){let t=Et(e),{NSubmenu:n,NMenu:r,NMenuOptionGroup:i}=t,{props:a,mergedClsPrefixRef:o,mergedCollapsedRef:s}=r,c=n?n.mergedDisabledRef:i?i.mergedDisabledRef:{value:!1},l=Y(()=>c.value||e.disabled);function u(t){let{onClick:n}=e;n&&n(t)}function d(t){l.value||(r.doSelect(e.internalKey,e.tmNode.rawNode),u(t))}return{mergedClsPrefix:o,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:r.mergedThemeRef,menuProps:a,dropdownEnabled:y(()=>e.root&&s.value&&a.mode!==`horizontal`&&!l.value),selected:y(()=>r.mergedValueRef.value===e.internalKey),mergedDisabled:l,handleClick:d}},render(){let{mergedClsPrefix:e,mergedTheme:t,tmNode:r,menuProps:{renderLabel:i,nodeProps:a}}=this,s=a?.(r.rawNode);return b(),v(`div`,o(s,{role:`menuitem`,class:[`${e}-menu-item`,s?.class]}),[(b(),n(Se,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:`hover`,placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:[`menu-tooltip`]},{default:()=>i?i(r.rawNode):Z(this.title),trigger:()=>(b(),n(wt,{tmNode:r,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick},null,8,[`tmNode`,`clsPrefix`,`paddingLeft`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`selected`,`title`,`extra`,`disabled`,`icon`,`onClick`]))},1032,[`theme`,`themeOverrides`,`placement`,`disabled`]))],16)}}),jt={...Dt,tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}},Mt=le(jt),Nt=V({name:`MenuOptionGroup`,props:jt,setup(e){let t=Et(e),{NSubmenu:n}=t,r=Y(()=>n?.mergedDisabledRef.value?!0:e.tmNode.disabled);S(_t,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:r});let{mergedClsPrefixRef:i,props:a}=p(Q);return function(){let{value:n}=i,r=t.paddingLeft.value,{nodeProps:s}=a,c=s?.(e.tmNode.rawNode);return(()=>{let t=j(`45eca6a63be5028b`);return b(),v(`div`,{class:U(`${n}-menu-item-group`),role:`group`},[_(`div`,o(c,{class:[`${n}-menu-item-group-title`,c?.class],style:[c?.style||``,r===void 0?``:`padding-left: ${r}px;`]}),[I(()=>Z(e.title)),e.extra?(b(),v(E,{key:0},[t[0]||=I(` `,-1),I(()=>Z(e.extra))],64)):I(()=>null)],16),_(`div`,null,[I(()=>e.tmNodes.map(e=>Vt(e,a)))])],2)})()}}}),Pt=[`aria-expanded`,`id`],Ft=[`aria-expanded`,`id`],It={...Dt,rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean},Lt=le(It),Rt=V({name:`Submenu`,props:It,setup(e){let t=Et(e),{NMenu:n,NSubmenu:r}=t,{props:i,mergedCollapsedRef:a,mergedThemeRef:o}=n,s=Y(()=>{let{disabled:t}=e;return r?.mergedDisabledRef.value||i.disabled?!0:t}),c=H(!1);S(gt,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:s}),S(_t,null);function l(){let{onClick:t}=e;t&&t()}function u(){s.value||(a.value||n.toggleExpand(e.internalKey),l())}function d(e){c.value=e}return{menuProps:i,mergedTheme:o,doSelect:n.doSelect,inverted:n.invertedRef,isHorizontal:n.isHorizontalRef,mergedClsPrefix:n.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:c,paddingLeft:t.paddingLeft,mergedDisabled:s,mergedValue:n.mergedValueRef,childActive:y(()=>e.virtualChildActive??n.activePathRef.value.includes(e.internalKey)),collapsed:Y(()=>i.mode===`horizontal`?!1:a.value?!0:!n.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:Y(()=>!s.value&&(i.mode===`horizontal`||a.value)),handlePopoverShowChange:d,handleClick:u}},render(){let{mergedClsPrefix:e,menuProps:{renderIcon:t,renderLabel:r}}=this,i=()=>{let{isHorizontal:e,paddingLeft:t,collapsed:r,mergedDisabled:i,maxIconSize:a,activeIconSize:s,title:c,childActive:l,icon:u,handleClick:d,menuProps:{nodeProps:f},dropdownShow:p,iconMarginRight:m,tmNode:h,mergedClsPrefix:g,isEllipsisPlaceholder:_,extra:y}=this,x=f?.(h.rawNode);return b(),v(`div`,o(x,{class:[`${g}-menu-item`,x?.class],role:`menuitem`}),[(b(),n(wt,{tmNode:h,paddingLeft:t,collapsed:r,disabled:i,iconMarginRight:m,maxIconSize:a,activeIconSize:s,title:c,extra:y,showArrow:!e,childActive:l,clsPrefix:g,icon:u,hover:p,onClick:d,isEllipsisPlaceholder:_},null,8,[`tmNode`,`paddingLeft`,`collapsed`,`disabled`,`iconMarginRight`,`maxIconSize`,`activeIconSize`,`title`,`extra`,`showArrow`,`childActive`,`clsPrefix`,`icon`,`hover`,`onClick`,`isEllipsisPlaceholder`]))],16)},a=()=>(b(),n(ce,null,{default:()=>{let{tmNodes:t,collapsed:n}=this;return n?null:(b(),v(`div`,{key:1,class:U(`${e}-submenu-children`),role:`menu`},[I(()=>t.map(e=>Vt(e,this.menuProps)))],2))}},1024));return this.root?(b(),n(xe,o({key:2,size:`large`,trigger:`hover`},this.menuProps?.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:`14px`,optionIconSizeLarge:`18px`},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:r}),{default:()=>(b(),v(`div`,{class:U(`${e}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[I(()=>i()),this.isHorizontal?I(()=>null):(b(),v(E,{key:1},[I(()=>a())],64))],10,Pt))},1040,[`themeOverrides`,`theme`,`value`,`disabled`,`placement`,`keyField`,`labelField`,`childrenField`,`onUpdateShow`,`options`,`onSelect`,`inverted`,`renderIcon`,`renderLabel`])):(b(),v(`div`,{key:3,class:U(`${e}-submenu`),role:`menu`,"aria-expanded":!this.collapsed,id:this.domId},[I(()=>i()),I(()=>a())],10,Ft))}});function zt(e){return e.type===`divider`||e.type===`render`}function Bt(e){return e.type===`divider`}function Vt(e,t){let{rawNode:r}=e,{show:i}=r;if(i===!1)return null;if(zt(r))return Bt(r)?(b(),n(xt,o({key:e.key},r.props),null,16)):null;let{labelField:a}=t,{key:s,level:c,isGroup:l}=e,u={...r,title:r.title||r[a],extra:r.titleExtra||r.extra,key:s,internalKey:s,level:c,root:c===0,isGroup:l};return e.children?e.isGroup?B(Nt,ke(u,Mt,{tmNode:e,tmNodes:e.children,key:s})):B(Rt,ke(u,Lt,{key:s,rawNodes:r[t.childrenField],tmNodes:e.children,tmNode:e})):B(At,ke(u,kt,{key:s,tmNode:e}))}var Ht={...c.props,options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},disabledField:{type:String,default:`disabled`},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:`vertical`},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:`bottom`},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array},Ut=V({name:`Menu`,inheritAttrs:!1,props:Ht,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r}=O(e),i=c(`Menu`,`-menu`,bt,Pe,e,t),a=p(Ze,null),o=Y(()=>{let{collapsed:t}=e;if(t!==void 0)return t;if(a){let{collapseModeRef:e,collapsedRef:t}=a;if(e.value===`width`)return t.value??!1}return!1}),s=Y(()=>{let{keyField:t,childrenField:n,disabledField:r}=e;return pe(e.items||e.options,{getIgnored(e){return zt(e)},getChildren(e){return e[n]},getDisabled(e){return e[r]},getKey(e){return e[t]??e.name}})}),l=Y(()=>new Set(s.value.treeNodes.map(e=>e.key))),{watchProps:u}=e,d=H(null);u?.includes(`defaultValue`)?g(()=>{d.value=e.defaultValue}):d.value=e.defaultValue;let f=G(e,`value`),m=he(f,d),h=H([]),_=()=>{h.value=e.defaultExpandAll?s.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||s.value.getPath(m.value,{includeSelf:!1}).keyPath};u?.includes(`defaultExpandedKeys`)?g(_):_();let v=ge(e,[`expandedNames`,`expandedKeys`]),y=he(v,h),ee=Y(()=>s.value.treeNodes),C=Y(()=>s.value.getPath(m.value).keyPath);S(Q,{props:e,mergedCollapsedRef:o,mergedThemeRef:i,mergedValueRef:m,mergedExpandedKeysRef:y,activePathRef:C,mergedClsPrefixRef:t,isHorizontalRef:Y(()=>e.mode===`horizontal`),invertedRef:G(e,`inverted`),doSelect:T,toggleExpand:E});function T(t,n){let{"onUpdate:value":r,onUpdateValue:i,onSelect:a}=e;i&&x(i,t,n),r&&x(r,t,n),a&&x(a,t,n),d.value=t}function te(t){let{"onUpdate:expandedKeys":n,onUpdateExpandedKeys:r,onExpandedNamesChange:i,onOpenNamesChange:a}=e;n&&x(n,t),r&&x(r,t),i&&x(i,t),a&&x(a,t),h.value=t}function E(t){let n=Array.from(y.value),r=n.findIndex(e=>e===t);if(~r)n.splice(r,1);else{if(e.accordion&&l.value.has(t)){let e=n.findIndex(e=>l.value.has(e));e>-1&&n.splice(e,1)}n.push(t)}te(n)}let D=t=>{let n=s.value.getPath(t??m.value,{includeSelf:!1}).keyPath;if(!n.length)return;let r=Array.from(y.value),i=new Set([...r,...n]);e.accordion&&l.value.forEach(e=>{i.has(e)&&!n.includes(e)&&i.delete(e)}),te(Array.from(i))},k=Y(()=>{let{inverted:t}=e,{common:{cubicBezierEaseInOut:n},self:r}=i.value,{borderRadius:a,borderColorHorizontal:o,fontSize:s,itemHeight:c,dividerColor:l}=r,u={"--n-divider-color":l,"--n-bezier":n,"--n-font-size":s,"--n-border-color-horizontal":o,"--n-border-radius":a,"--n-item-height":c};return t?(u[`--n-group-text-color`]=r.groupTextColorInverted,u[`--n-color`]=r.colorInverted,u[`--n-item-text-color`]=r.itemTextColorInverted,u[`--n-item-text-color-hover`]=r.itemTextColorHoverInverted,u[`--n-item-text-color-active`]=r.itemTextColorActiveInverted,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveInverted,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHoverInverted,u[`--n-item-icon-color`]=r.itemIconColorInverted,u[`--n-item-icon-color-hover`]=r.itemIconColorHoverInverted,u[`--n-item-icon-color-active`]=r.itemIconColorActiveInverted,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHoverInverted,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActiveInverted,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHoverInverted,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsedInverted,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontalInverted,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontalInverted,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontalInverted,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontalInverted,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontalInverted,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontalInverted,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontalInverted,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontalInverted,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontalInverted,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontalInverted,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontalInverted,u[`--n-arrow-color`]=r.arrowColorInverted,u[`--n-arrow-color-hover`]=r.arrowColorHoverInverted,u[`--n-arrow-color-active`]=r.arrowColorActiveInverted,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHoverInverted,u[`--n-arrow-color-child-active`]=r.arrowColorChildActiveInverted,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHoverInverted,u[`--n-item-color-hover`]=r.itemColorHoverInverted,u[`--n-item-color-active`]=r.itemColorActiveInverted,u[`--n-item-color-active-hover`]=r.itemColorActiveHoverInverted,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsedInverted):(u[`--n-group-text-color`]=r.groupTextColor,u[`--n-color`]=r.color,u[`--n-item-text-color`]=r.itemTextColor,u[`--n-item-text-color-hover`]=r.itemTextColorHover,u[`--n-item-text-color-active`]=r.itemTextColorActive,u[`--n-item-text-color-child-active`]=r.itemTextColorChildActive,u[`--n-item-text-color-child-active-hover`]=r.itemTextColorChildActiveHover,u[`--n-item-text-color-active-hover`]=r.itemTextColorActiveHover,u[`--n-item-icon-color`]=r.itemIconColor,u[`--n-item-icon-color-hover`]=r.itemIconColorHover,u[`--n-item-icon-color-active`]=r.itemIconColorActive,u[`--n-item-icon-color-active-hover`]=r.itemIconColorActiveHover,u[`--n-item-icon-color-child-active`]=r.itemIconColorChildActive,u[`--n-item-icon-color-child-active-hover`]=r.itemIconColorChildActiveHover,u[`--n-item-icon-color-collapsed`]=r.itemIconColorCollapsed,u[`--n-item-text-color-horizontal`]=r.itemTextColorHorizontal,u[`--n-item-text-color-hover-horizontal`]=r.itemTextColorHoverHorizontal,u[`--n-item-text-color-active-horizontal`]=r.itemTextColorActiveHorizontal,u[`--n-item-text-color-child-active-horizontal`]=r.itemTextColorChildActiveHorizontal,u[`--n-item-text-color-child-active-hover-horizontal`]=r.itemTextColorChildActiveHoverHorizontal,u[`--n-item-text-color-active-hover-horizontal`]=r.itemTextColorActiveHoverHorizontal,u[`--n-item-icon-color-horizontal`]=r.itemIconColorHorizontal,u[`--n-item-icon-color-hover-horizontal`]=r.itemIconColorHoverHorizontal,u[`--n-item-icon-color-active-horizontal`]=r.itemIconColorActiveHorizontal,u[`--n-item-icon-color-active-hover-horizontal`]=r.itemIconColorActiveHoverHorizontal,u[`--n-item-icon-color-child-active-horizontal`]=r.itemIconColorChildActiveHorizontal,u[`--n-item-icon-color-child-active-hover-horizontal`]=r.itemIconColorChildActiveHoverHorizontal,u[`--n-arrow-color`]=r.arrowColor,u[`--n-arrow-color-hover`]=r.arrowColorHover,u[`--n-arrow-color-active`]=r.arrowColorActive,u[`--n-arrow-color-active-hover`]=r.arrowColorActiveHover,u[`--n-arrow-color-child-active`]=r.arrowColorChildActive,u[`--n-arrow-color-child-active-hover`]=r.arrowColorChildActiveHover,u[`--n-item-color-hover`]=r.itemColorHover,u[`--n-item-color-active`]=r.itemColorActive,u[`--n-item-color-active-hover`]=r.itemColorActiveHover,u[`--n-item-color-active-collapsed`]=r.itemColorActiveCollapsed),u}),A=r?w(`menu`,Y(()=>e.inverted?`a`:`b`),k,e):void 0,j=me(),M=H(null),N=H(null),P=!0,F=()=>{P?P=!1:M.value?.sync({showAllItemsBeforeCalculate:!0})};function I(){return document.getElementById(j)}let L=H(-1);function R(t){L.value=e.options.length-t}function ne(e){e||(L.value=-1)}let z=Y(()=>{let t=L.value;return{children:t===-1?[]:e.options.slice(t)}}),B=Y(()=>{let{childrenField:t,disabledField:n,keyField:r}=e;return pe([z.value],{getIgnored(e){return zt(e)},getChildren(e){return e[t]},getDisabled(e){return e[n]},getKey(e){return e[r]??e.name}})}),re=Y(()=>pe([{}]).treeNodes[0]);function V(){if(L.value===-1)return b(),n(Rt,{root:!0,level:0,key:`__ellpisisGroupPlaceholder__`,internalKey:`__ellpisisGroupPlaceholder__`,title:`···`,tmNode:re.value,domId:j,isEllipsisPlaceholder:!0},null,8,[`tmNode`,`domId`]);let e=B.value.treeNodes[0],t=C.value,r=!!e.children?.some(e=>t.includes(e.key));return b(),n(Rt,{level:0,root:!0,key:`__ellpisisGroup__`,internalKey:`__ellpisisGroup__`,title:`···`,virtualChildActive:r,tmNode:e,domId:j,rawNodes:e.rawNode.children||[],tmNodes:e.children||[],isEllipsisPlaceholder:!0},null,8,[`virtualChildActive`,`tmNode`,`domId`,`rawNodes`,`tmNodes`])}return{mergedClsPrefix:t,controlledExpandedKeys:v,uncontrolledExpanededKeys:h,mergedExpandedKeys:y,uncontrolledValue:d,mergedValue:m,activePath:C,tmNodes:ee,mergedTheme:i,mergedCollapsed:o,cssVars:r?void 0:k,themeClass:A?.themeClass,overflowRef:M,counterRef:N,updateCounter:()=>{},onResize:F,onUpdateOverflow:ne,onUpdateCount:R,renderCounter:V,getCounter:I,onRender:A?.onRender,showOption:D,deriveResponsiveState:F}},render(){let{mergedClsPrefix:e,mode:t,themeClass:r,onRender:i}=this;i?.();let a=()=>this.tmNodes.map(e=>Vt(e,this.$props)),s=t===`horizontal`&&this.responsive,c=()=>B(`div`,o(this.$attrs,{role:t===`horizontal`?`menubar`:`menu`,class:[`${e}-menu`,r,`${e}-menu--${t}`,s&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),s?(b(),n(fe,{key:2,ref:`overflowRef`,onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:a,counter:this.renderCounter},1032,[`onUpdateOverflow`,`getCounter`,`onUpdateCount`,`updateCounter`])):a());return s?(b(),n(re,{key:3,onResize:this.onResize},{default:c},1032,[`onResize`])):c()}}),Wt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Gt=V({name:`CubeOutline`,render:function(e,t){return b(),v(`svg`,Wt,t[0]||=[_(`path`,{d:`M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),_(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M69 153.99l187 110l187-110`},null,-1),_(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M256 463.99v-200`},null,-1)])}}),Kt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},qt=V({name:`DocumentTextOutline`,render:function(e,t){return b(),v(`svg`,Kt,t[0]||=[_(`path`,{d:`M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z`,fill:`none`,stroke:`currentColor`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),_(`path`,{d:`M256 56v120a32 32 0 0 0 32 32h120`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),_(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 288h160`},null,-1),_(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 368h160`},null,-1)])}}),Jt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Yt=V({name:`GridOutline`,render:function(e,t){return b(),v(`svg`,Jt,t[0]||=[_(`rect`,{x:`48`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),_(`rect`,{x:`288`,y:`48`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),_(`rect`,{x:`48`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),_(`rect`,{x:`288`,y:`288`,width:`176`,height:`176`,rx:`20`,ry:`20`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),Xt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},Zt=V({name:`LogOutOutline`,render:function(e,t){return b(),v(`svg`,Xt,t[0]||=[_(`path`,{d:`M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),_(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M368 336l80-80l-80-80`},null,-1),_(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M176 256h256`},null,-1)])}}),Qt={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},$t=V({name:`MenuOutline`,render:function(e,t){return b(),v(`svg`,Qt,t[0]||=[_(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 160h352`},null,-1),_(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 256h352`},null,-1),_(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-miterlimit":`10`,"stroke-width":`32`,d:`M80 352h352`},null,-1)])}}),en={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},tn=V({name:`PulseOutline`,render:function(e,t){return b(),v(`svg`,en,t[0]||=[_(`path`,{fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`,d:`M48 320h64l64-256l64 384l64-224l32 96h64`},null,-1),_(`circle`,{cx:`432`,cy:`320`,r:`32`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),nn={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},rn=V({name:`SettingsOutline`,render:function(e,t){return b(),v(`svg`,nn,t[0]||=[_(`path`,{d:`M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1)])}}),an={key:0,class:`brand-copy`},on={class:`mobile-drawer-account`},sn={class:`account-copy`},cn={key:0,class:`section-header-scope`},ln={key:1,class:`app-header-leading`},un={class:`app-title`},dn={class:`account`},fn={class:`account-copy`},pn=[`aria-label`],mn={class:`update-banner-body`},hn=V({__name:`AppLayout`,setup(t){let r=Me(),a=Ae(),o=Ne(),c=_e(),u=Ce(),d=H(!1),f=H(null),p=H(window.innerWidth),h=Y(()=>Math.min(320,Math.round(p.value*.86))),g=H(window.innerWidth<1100);function y(e,t,n,r=t){return{label:()=>B(je,{to:{name:t},custom:!0},{default:({href:t,isExactActive:n,navigate:r})=>B(`a`,{href:t,"aria-current":n?`page`:void 0,onClick:r},e)}),key:r,icon:()=>B(X,null,{default:()=>B(n)})}}let x=[y(`运行概览`,`dashboard`,Yt),y(`连接活动`,`connections`,Ie),y(`配置中心`,`orchestration`,qt,`configuration`),y(`资源管理`,`versions`,Gt,`resources`),y(`排障中心`,`diagnostics`,tn,`troubleshooting`),y(`面板设置`,`settings`,rn)],S={configuration:{label:`配置中心`,icon:qt,tabs:[{name:`orchestration`,label:`代理配置`},{name:`config`,label:`配置文件`},{name:`backups`,label:`配置备份`},{name:`schema`,label:`配置参考`}]},resources:{label:`资源管理`,icon:Gt,tabs:[{name:`versions`,label:`dae 版本`},{name:`geo`,label:`Geo 数据`}]},troubleshooting:{label:`排障中心`,icon:tn,tabs:[{name:`diagnostics`,label:`故障诊断`},{name:`logs`,label:`运行日志`}]}},C=Y(()=>S[r.meta.section]),w=Y(()=>String(r.meta.section||r.name||`dashboard`)),te=Y(()=>String(r.meta.title||`kdae-panel`));async function D(){try{await o.logout(),await a.replace({name:`login`})}catch(e){c.error(e instanceof Error?e.message:`退出登录失败`)}}function O(){o.clearSession(),a.replace({name:`login`}),c.warning(`登录会话已过期，请重新登录`)}function k(){p.value=window.innerWidth,!u.value&&window.innerWidth<1100&&(g.value=!0)}function A(){f.value?.querySelector(`.n-menu-item-content--selected a`)?.focus({preventScroll:!0})}T(u,()=>{d.value=!1});let j=H(null),M=H(!1);async function N(){try{j.value=await ne(`/api/v1/panel/update`)}catch{j.value=null}}function P(e){let t=e.detail;j.value&&t&&(j.value.status=t)}return ee(()=>{window.addEventListener(`kdae-panel:auth-expired`,O),window.addEventListener(`kdae-panel:self-update-changed`,P),window.addEventListener(`resize`,k),N()}),de(()=>{window.removeEventListener(`kdae-panel:auth-expired`,O),window.removeEventListener(`kdae-panel:self-update-changed`,P),window.removeEventListener(`resize`,k)}),(t,a)=>{let c=oe(`RouterView`);return b(),n(R(rt),{"has-sider":!R(u),class:`app-shell`},{default:e(()=>[R(u)?J(``,!0):(b(),n(R(ht),{key:0,class:`app-sidebar`,bordered:``,"collapse-mode":`width`,"collapsed-width":64,width:236,collapsed:g.value,"show-trigger":`bar`,onCollapse:a[0]||=e=>g.value=!0,onExpand:a[1]||=e=>g.value=!1},{default:e(()=>[_(`div`,{class:L([`brand`,{compact:g.value}])},[a[8]||=_(`div`,{class:`brand-mark`},`K`,-1),g.value?J(``,!0):(b(),v(`div`,an,[...a[7]||=[_(`strong`,null,`kdae-panel`,-1),_(`span`,null,`零侵入管理面板`,-1)]]))],2),m(R(Ut),{value:w.value,collapsed:g.value,"collapsed-width":64,"collapsed-icon-size":22,options:x},null,8,[`value`,`collapsed`])]),_:1},8,[`collapsed`])),m(R(Ee),{show:d.value,"onUpdate:show":a[3]||=e=>d.value=e,placement:`left`,width:h.value,"auto-focus":!1,onAfterEnter:A},{default:e(()=>[m(R(De),{class:`mobile-nav-drawer`,"native-scrollbar":!1,"body-content-style":`padding: 0;`},{footer:e(()=>[_(`div`,on,[m(R(Je),{round:``,size:`small`},{default:e(()=>[i(q(R(o).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),_(`div`,sn,[_(`strong`,null,q(R(o).user?.username),1),a[9]||=_(`span`,null,`管理员`,-1)]),m(R(F),{quaternary:``,circle:``,title:`退出登录`,"aria-label":`退出登录`,onClick:D},{icon:e(()=>[m(R(X),null,{default:e(()=>[m(R(Zt))]),_:1})]),_:1})])]),default:e(()=>[a[10]||=_(`div`,{class:`brand mobile-drawer-brand`},[_(`div`,{class:`brand-mark`},`K`),_(`div`,{class:`brand-copy`},[_(`strong`,null,`kdae-panel`),_(`span`,null,`零侵入管理面板`)])],-1),_(`div`,{ref_key:`mobileNavRef`,ref:f},[m(R(Ut),{value:w.value,options:x,"onUpdate:value":a[2]||=e=>d.value=!1},null,8,[`value`])],512)]),_:1})]),_:1},8,[`show`,`width`]),m(R(rt),{class:`app-main`},{default:e(()=>[m(R(st),{bordered:``,class:L([`app-header`,{"section-header":C.value}])},{default:e(()=>[C.value?(b(),v(`div`,cn,[R(u)?(b(),n(R(F),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:a[4]||=e=>d.value=!0},{icon:e(()=>[m(R(X),null,{default:e(()=>[m(R($t))]),_:1})]),_:1})):J(``,!0),m(R(X),{size:`17`},{default:e(()=>[(b(),n(l(C.value.icon)))]),_:1}),_(`strong`,null,q(C.value.label),1)])):(b(),v(`div`,ln,[R(u)?(b(),n(R(F),{key:0,quaternary:``,circle:``,class:`mobile-nav-trigger`,title:`打开导航`,"aria-label":`打开导航`,onClick:a[5]||=e=>d.value=!0},{icon:e(()=>[m(R(X),null,{default:e(()=>[m(R($t))]),_:1})]),_:1})):J(``,!0),_(`div`,un,[m(R(ye),{depth:`3`,class:`eyebrow`},{default:e(()=>[...a[11]||=[i(`KDAE CONTROL PLANE`,-1)]]),_:1}),_(`h1`,null,q(te.value),1)])])),_(`div`,dn,[m(R(Je),{round:``,size:`small`},{default:e(()=>[i(q(R(o).user?.username?.slice(0,1).toUpperCase()),1)]),_:1}),_(`div`,fn,[_(`strong`,null,q(R(o).user?.username),1),a[12]||=_(`span`,null,`管理员`,-1)]),m(R(F),{quaternary:``,circle:``,title:`退出登录`,onClick:D},{icon:e(()=>[m(R(X),null,{default:e(()=>[m(R(Zt))]),_:1})]),_:1})]),C.value?(b(),v(`nav`,{key:2,class:`section-tabs`,"aria-label":`${C.value.label}子页面`},[(b(!0),v(E,null,s(C.value.tabs,t=>(b(),n(R(je),{key:t.name,to:{name:t.name},class:L([`section-tab`,{active:R(r).name===t.name}])},{default:e(()=>[i(q(t.label),1)]),_:2},1032,[`to`,`class`]))),128))],8,pn)):J(``,!0)]),_:1},8,[`class`]),m(R(it),{class:L([`app-content`,{"section-content":C.value}]),"content-style":`padding: var(--page-padding);`},{default:e(()=>[j.value?.check.updateAvailable&&!M.value?(b(),n(R(Te),{key:0,type:`info`,closable:``,class:`update-banner`,onClose:a[6]||=e=>M.value=!0},{default:e(()=>[_(`div`,mn,[_(`span`,null,[a[13]||=i(` 面板有新版本 `,-1),_(`strong`,null,q(j.value.check.latest),1),i(`（当前 `+q(j.value.check.current)+`）。 `,1),j.value.status?.enabled&&j.value.status.updatable?(b(),v(E,{key:0},[i(`升级会替换面板二进制并重启自身，配置与账号数据都会保留。`)],64)):j.value.status&&!j.value.status.enabled?(b(),v(E,{key:1},[i(`可直接在这里启用一键升级，不需要 SSH。`)],64)):j.value.status?.problem?(b(),v(E,{key:2},[i(`当前无法一键升级：`+q(j.value.status.problem),1)],64)):(b(),v(E,{key:3},[i(`当前部署不支持一键升级，可重新执行一键部署命令。`)],64)),a[14]||=_(`a`,{href:`https://github.com/tuoro/kdae-panel/releases/latest`,target:`_blank`,rel:`noopener`},`查看发布说明`,-1)]),m(Le,{payload:j.value,label:`立即升级`},null,8,[`payload`])])]),_:1})):J(``,!0),m(c)]),_:1},8,[`class`])]),_:1})]),_:1},8,[`has-sider`])}}});export{hn as default};