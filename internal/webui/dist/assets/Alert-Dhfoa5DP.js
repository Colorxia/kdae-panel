import{B as e,Cn as t,Gt as n,H as r,Ht as i,N as a,O as o,Q as s,Qn as c,R as l,T as u,U as d,V as f,Vt as p,W as m,Wt as h,Y as g,_n as _,dn as v,j as y,jn as b,ln as x,ot as S,pn as C,qt as w,tt as T,un as E}from"./client-D9Dl4Cv_.js";import{a as D,i as O,n as k,o as A,r as j,s as M,t as N}from"./fade-in-height-expand.cssr-DbShN0SS.js";function P(e){let{lineHeight:t,borderRadius:n,fontWeightStrong:r,baseColor:i,dividerColor:a,actionColor:o,textColor1:s,textColor2:c,closeColorHover:l,closeColorPressed:u,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return{...A,fontSize:b,lineHeight:t,titleFontWeight:r,borderRadius:n,border:`1px solid ${a}`,color:o,titleTextColor:s,iconColor:c,contentTextColor:c,closeBorderRadius:n,closeColorHover:l,closeColorPressed:u,closeIconColor:f,closeIconColorHover:p,closeIconColorPressed:h,borderInfo:`1px solid ${m(i,d(g,{alpha:.25}))}`,colorInfo:m(i,d(g,{alpha:.08})),titleTextColorInfo:s,iconColorInfo:g,contentTextColorInfo:c,closeColorHoverInfo:l,closeColorPressedInfo:u,closeIconColorInfo:f,closeIconColorHoverInfo:p,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${m(i,d(_,{alpha:.25}))}`,colorSuccess:m(i,d(_,{alpha:.08})),titleTextColorSuccess:s,iconColorSuccess:_,contentTextColorSuccess:c,closeColorHoverSuccess:l,closeColorPressedSuccess:u,closeIconColorSuccess:f,closeIconColorHoverSuccess:p,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${m(i,d(v,{alpha:.33}))}`,colorWarning:m(i,d(v,{alpha:.08})),titleTextColorWarning:s,iconColorWarning:v,contentTextColorWarning:c,closeColorHoverWarning:l,closeColorPressedWarning:u,closeIconColorWarning:f,closeIconColorHoverWarning:p,closeIconColorPressedWarning:h,borderError:`1px solid ${m(i,d(y,{alpha:.25}))}`,colorError:m(i,d(y,{alpha:.08})),titleTextColorError:s,iconColorError:y,contentTextColorError:c,closeColorHoverError:l,closeColorPressedError:u,closeIconColorError:f,closeIconColorHoverError:p,closeIconColorPressedError:h}}var F={name:`Alert`,common:r,self:P},I=i(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[h(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),n(`closable`,[i(`alert-body`,[h(`title`,`
 padding-right: 24px;
 `)])]),h(`icon`,{color:`var(--n-icon-color)`}),i(`alert-body`,{padding:`var(--n-padding)`},[h(`title`,{color:`var(--n-title-text-color)`}),h(`content`,{color:`var(--n-content-text-color)`})]),N({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),h(`icon`,`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),h(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),n(`show-icon`,[i(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),n(`right-adjust`,[i(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),i(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[h(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[p(`& +`,[h(`content`,{marginTop:`9px`})])]),h(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),h(`icon`,{transition:`color .3s var(--n-bezier)`})]),L={...e.props,title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function},R=_({name:`Alert`,inheritAttrs:!1,props:L,slots:Object,setup(t){let{mergedClsPrefixRef:n,mergedBorderedRef:r,inlineThemeDisabled:i,mergedRtlRef:a}=S(t),s=e(`Alert`,`-alert`,I,F,t,n),l=o(`Alert`,a,n),u=x(()=>{let{common:{cubicBezierEaseInOut:e},self:n}=s.value,{fontSize:r,borderRadius:i,titleFontWeight:a,lineHeight:o,iconSize:c,iconMargin:l,iconMarginRtl:u,closeIconSize:d,closeBorderRadius:f,closeSize:p,closeMargin:m,closeMarginRtl:h,padding:_}=n,{type:v}=t,{left:y,right:b}=g(l);return{"--n-bezier":e,"--n-color":n[w(`color`,v)],"--n-close-icon-size":d,"--n-close-border-radius":f,"--n-close-color-hover":n[w(`closeColorHover`,v)],"--n-close-color-pressed":n[w(`closeColorPressed`,v)],"--n-close-icon-color":n[w(`closeIconColor`,v)],"--n-close-icon-color-hover":n[w(`closeIconColorHover`,v)],"--n-close-icon-color-pressed":n[w(`closeIconColorPressed`,v)],"--n-icon-color":n[w(`iconColor`,v)],"--n-border":n[w(`border`,v)],"--n-title-text-color":n[w(`titleTextColor`,v)],"--n-content-text-color":n[w(`contentTextColor`,v)],"--n-line-height":o,"--n-border-radius":i,"--n-font-size":r,"--n-title-font-weight":a,"--n-icon-size":c,"--n-icon-margin":l,"--n-icon-margin-rtl":u,"--n-close-size":p,"--n-close-margin":m,"--n-close-margin-rtl":h,"--n-padding":_,"--n-icon-margin-left":y,"--n-icon-margin-right":b}}),d=i?f(`alert`,x(()=>t.type[0]),u,t):void 0,p=c(!0),m=()=>{let{onAfterLeave:e,onAfterHide:n}=t;e&&e(),n&&n()};return{rtlEnabled:l,mergedClsPrefix:n,mergedBordered:r,visible:p,handleCloseClick:()=>{Promise.resolve(t.onClose?.()).then(e=>{e!==!1&&(p.value=!1)})},handleAfterLeave:()=>{m()},mergedTheme:s,cssVars:i?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){return this.onRender?.(),b(),v(u,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:n}=this,r={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?(b(),C(`div`,t({key:1},t(this.$attrs,r)),[T(()=>this.closable&&(b(),v(M,{clsPrefix:e,class:s(`${e}-alert__close`),onClick:this.handleCloseClick},null,8,[`clsPrefix`,`class`,`onClick`]))),T(()=>this.bordered&&(b(),C(`div`,{class:s(`${e}-alert__border`)},null,2))),T(()=>this.showIcon&&(b(),C(`div`,{class:s(`${e}-alert__icon`),"aria-hidden":`true`},[T(()=>y(n.icon,()=>[(b(),v(l,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return b(),v(j,{key:3});case`info`:return b(),v(O,{key:4});case`warning`:return b(),v(k,{key:5});case`error`:return b(),v(D,{key:6});default:return null}}},1032,[`clsPrefix`]))]))],2))),E(`div`,{class:s([`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`])},[T(()=>a(n.header,t=>{let n=t||this.title;return n?(b(),C(`div`,{key:2,class:s(`${e}-alert-body__title`)},[T(()=>n)],2)):null})),T(()=>n.default&&(b(),C(`div`,{class:s(`${e}-alert-body__content`)},[T(()=>n.default())],2)))],2)],16)):null}},1032,[`onAfterLeave`])}});export{R as t};