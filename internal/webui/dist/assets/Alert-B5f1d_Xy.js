import{$t as e,Jt as t,Lt as n,On as r,P as i,Rt as a,Sn as o,T as s,Ut as c,Xt as l,Zt as u,er as d,ft as f,j as p,k as m,mn as h,pt as g,qt as _,wn as v,x as y,xt as b,yt as x}from"./client-BNTVmNnN.js";import{t as S}from"./Close-DKHGmVJZ.js";import{C,D as w,E as T,O as E,S as D,k as O}from"./index-DwxMOWIr.js";function k(e){let{lineHeight:t,borderRadius:r,fontWeightStrong:i,baseColor:o,dividerColor:s,actionColor:c,textColor1:l,textColor2:u,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,infoColor:g,successColor:_,warningColor:v,errorColor:y,fontSize:b}=e;return Object.assign(Object.assign({},C),{fontSize:b,lineHeight:t,titleFontWeight:i,borderRadius:r,border:`1px solid ${s}`,color:c,titleTextColor:l,iconColor:u,contentTextColor:u,closeBorderRadius:r,closeColorHover:d,closeColorPressed:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,borderInfo:`1px solid ${a(o,n(g,{alpha:.25}))}`,colorInfo:a(o,n(g,{alpha:.08})),titleTextColorInfo:l,iconColorInfo:g,contentTextColorInfo:u,closeColorHoverInfo:d,closeColorPressedInfo:f,closeIconColorInfo:p,closeIconColorHoverInfo:m,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${a(o,n(_,{alpha:.25}))}`,colorSuccess:a(o,n(_,{alpha:.08})),titleTextColorSuccess:l,iconColorSuccess:_,contentTextColorSuccess:u,closeColorHoverSuccess:d,closeColorPressedSuccess:f,closeIconColorSuccess:p,closeIconColorHoverSuccess:m,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${a(o,n(v,{alpha:.33}))}`,colorWarning:a(o,n(v,{alpha:.08})),titleTextColorWarning:l,iconColorWarning:v,contentTextColorWarning:u,closeColorHoverWarning:d,closeColorPressedWarning:f,closeIconColorWarning:p,closeIconColorHoverWarning:m,closeIconColorPressedWarning:h,borderError:`1px solid ${a(o,n(y,{alpha:.25}))}`,colorError:a(o,n(y,{alpha:.08})),titleTextColorError:l,iconColorError:y,contentTextColorError:u,closeColorHoverError:d,closeColorPressedError:f,closeIconColorError:p,closeIconColorHoverError:m,closeIconColorPressedError:h})}var A={name:`Alert`,common:y,self:k},j=t(`alert`,`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[l(`border`,`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),u(`closable`,[t(`alert-body`,[l(`title`,`
 padding-right: 24px;
 `)])]),l(`icon`,{color:`var(--n-icon-color)`}),t(`alert-body`,{padding:`var(--n-padding)`},[l(`title`,{color:`var(--n-title-text-color)`}),l(`content`,{color:`var(--n-content-text-color)`})]),D({originalTransition:`transform .3s var(--n-bezier)`,enterToProps:{transform:`scale(1)`},leaveToProps:{transform:`scale(0.9)`}}),l(`icon`,`
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
 `),l(`close`,`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),u(`show-icon`,[t(`alert-body`,{paddingLeft:`calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))`})]),u(`right-adjust`,[t(`alert-body`,{paddingRight:`calc(var(--n-close-size) + var(--n-padding) + 2px)`})]),t(`alert-body`,`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[l(`title`,`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[_(`& +`,[l(`content`,{marginTop:`9px`})])]),l(`content`,{transition:`color .3s var(--n-bezier)`,fontSize:`var(--n-font-size)`})]),l(`icon`,{transition:`color .3s var(--n-bezier)`})]),M=o({name:`Alert`,inheritAttrs:!1,props:Object.assign(Object.assign({},p.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:`default`},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),slots:Object,setup(t){let{mergedClsPrefixRef:n,mergedBorderedRef:r,inlineThemeDisabled:a,mergedRtlRef:o}=g(t),s=p(`Alert`,`-alert`,j,A,t,n),l=i(`Alert`,o,n),u=h(()=>{let{common:{cubicBezierEaseInOut:n},self:r}=s.value,{fontSize:i,borderRadius:a,titleFontWeight:o,lineHeight:l,iconSize:u,iconMargin:d,iconMarginRtl:f,closeIconSize:p,closeBorderRadius:m,closeSize:h,closeMargin:g,closeMarginRtl:_,padding:v}=r,{type:y}=t,{left:b,right:x}=c(d);return{"--n-bezier":n,"--n-color":r[e(`color`,y)],"--n-close-icon-size":p,"--n-close-border-radius":m,"--n-close-color-hover":r[e(`closeColorHover`,y)],"--n-close-color-pressed":r[e(`closeColorPressed`,y)],"--n-close-icon-color":r[e(`closeIconColor`,y)],"--n-close-icon-color-hover":r[e(`closeIconColorHover`,y)],"--n-close-icon-color-pressed":r[e(`closeIconColorPressed`,y)],"--n-icon-color":r[e(`iconColor`,y)],"--n-border":r[e(`border`,y)],"--n-title-text-color":r[e(`titleTextColor`,y)],"--n-content-text-color":r[e(`contentTextColor`,y)],"--n-line-height":l,"--n-border-radius":a,"--n-font-size":i,"--n-title-font-weight":o,"--n-icon-size":u,"--n-icon-margin":d,"--n-icon-margin-rtl":f,"--n-close-size":h,"--n-close-margin":g,"--n-close-margin-rtl":_,"--n-padding":v,"--n-icon-margin-left":b,"--n-icon-margin-right":x}}),m=a?f(`alert`,h(()=>t.type[0]),u,t):void 0,_=d(!0),v=()=>{let{onAfterLeave:e,onAfterHide:n}=t;e&&e(),n&&n()};return{rtlEnabled:l,mergedClsPrefix:n,mergedBordered:r,visible:_,handleCloseClick:()=>{Promise.resolve(t.onClose?.call(t)).then(e=>{e!==!1&&(_.value=!1)})},handleAfterLeave:()=>{v()},mergedTheme:s,cssVars:a?void 0:u,themeClass:m?.themeClass,onRender:m?.onRender}},render(){var e;return(e=this.onRender)==null||e.call(this),v(s,{onAfterLeave:this.handleAfterLeave},{default:()=>{let{mergedClsPrefix:e,$slots:t}=this,n={class:[`${e}-alert`,this.themeClass,this.closable&&`${e}-alert--closable`,this.showIcon&&`${e}-alert--show-icon`,!this.title&&this.closable&&`${e}-alert--right-adjust`,this.rtlEnabled&&`${e}-alert--rtl`],style:this.cssVars,role:`alert`};return this.visible?v(`div`,Object.assign({},r(this.$attrs,n)),this.closable&&v(S,{clsPrefix:e,class:`${e}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&v(`div`,{class:`${e}-alert__border`}),this.showIcon&&v(`div`,{class:`${e}-alert__icon`,"aria-hidden":`true`},x(t.icon,()=>[v(m,{clsPrefix:e},{default:()=>{switch(this.type){case`success`:return v(w,null);case`info`:return v(E,null);case`warning`:return v(T,null);case`error`:return v(O,null);default:return null}}})])),v(`div`,{class:[`${e}-alert-body`,this.mergedBordered&&`${e}-alert-body--bordered`]},b(t.header,t=>{let n=t||this.title;return n?v(`div`,{class:`${e}-alert-body__title`},n):null}),t.default&&v(`div`,{class:`${e}-alert-body__content`},t))):null}})}});export{M as t};