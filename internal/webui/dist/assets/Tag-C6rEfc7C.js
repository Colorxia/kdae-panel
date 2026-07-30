import{$t as e,Cn as t,Ct as n,Et as r,Jt as i,Lt as a,Mt as o,P as s,Qt as c,Rn as l,Tn as u,Ut as d,Xt as f,Zt as p,ar as m,ft as h,hn as g,j as _,pt as v,qt as y,tr as b,x,xt as S}from"./client-DVlvm8qj.js";import{t as C}from"./Close-C20mxv-J.js";import{T as w}from"./index-BvW3qXdO.js";function T(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:o,successColor:s,warningColor:c,errorColor:l,baseColor:u,borderColor:d,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:T,heightMedium:E,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},w),{closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:T,heightLarge:E,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:u,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${d}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${a(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:a(i,{alpha:.12}),colorBorderedPrimary:a(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:a(i,{alpha:.12}),closeColorPressedPrimary:a(i,{alpha:.18}),borderInfo:`1px solid ${a(o,{alpha:.3})}`,textColorInfo:o,colorInfo:a(o,{alpha:.12}),colorBorderedInfo:a(o,{alpha:.1}),closeIconColorInfo:o,closeIconColorHoverInfo:o,closeIconColorPressedInfo:o,closeColorHoverInfo:a(o,{alpha:.12}),closeColorPressedInfo:a(o,{alpha:.18}),borderSuccess:`1px solid ${a(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:a(s,{alpha:.12}),colorBorderedSuccess:a(s,{alpha:.1}),closeIconColorSuccess:s,closeIconColorHoverSuccess:s,closeIconColorPressedSuccess:s,closeColorHoverSuccess:a(s,{alpha:.12}),closeColorPressedSuccess:a(s,{alpha:.18}),borderWarning:`1px solid ${a(c,{alpha:.35})}`,textColorWarning:c,colorWarning:a(c,{alpha:.15}),colorBorderedWarning:a(c,{alpha:.12}),closeIconColorWarning:c,closeIconColorHoverWarning:c,closeIconColorPressedWarning:c,closeColorHoverWarning:a(c,{alpha:.12}),closeColorPressedWarning:a(c,{alpha:.18}),borderError:`1px solid ${a(l,{alpha:.23})}`,textColorError:l,colorError:a(l,{alpha:.1}),colorBorderedError:a(l,{alpha:.08}),closeIconColorError:l,closeIconColorHoverError:l,closeIconColorPressedError:l,closeColorHoverError:a(l,{alpha:.12}),closeColorPressedError:a(l,{alpha:.18})})}var E={name:`Tag`,common:x,self:T},D={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},O=i(`tag`,`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[p(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),f(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),f(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),f(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),f(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),p(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[f(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),f(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),p(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),p(`icon, avatar`,[p(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),p(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),p(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[c(`disabled`,[y(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[c(`checked`,`color: var(--n-text-color-hover-checkable);`)]),y(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[c(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),p(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[c(`disabled`,[y(`&:hover`,`background-color: var(--n-color-checked-hover);`),y(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),k=Object.assign(Object.assign(Object.assign({},_.props),D),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),A=o(`n-tag`),j=t({name:`Tag`,props:k,slots:Object,setup(t){let i=b(null),{mergedBorderedRef:a,mergedClsPrefixRef:o,inlineThemeDisabled:c,mergedRtlRef:u,mergedComponentPropsRef:f}=v(t),p=g(()=>t.size||f?.value?.Tag?.size||`medium`),y=_(`Tag`,`-tag`,O,E,t,o);l(A,{roundRef:m(t,`round`)});function x(){if(!t.disabled&&t.checkable){let{checked:e,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=t;r&&r(!e),i&&i(!e),n&&n(!e)}}function S(e){if(t.triggerClickOnClose||e.stopPropagation(),!t.disabled){let{onClose:r}=t;r&&n(r,e)}}let C={setTextContent(e){let{value:t}=i;t&&(t.textContent=e)}},w=s(`Tag`,u,o),T=g(()=>{let{type:n,color:{color:r,textColor:i}={}}=t,o=p.value,{common:{cubicBezierEaseInOut:s},self:{padding:c,closeMargin:l,borderRadius:u,opacityDisabled:f,textColorCheckable:m,textColorHoverCheckable:h,textColorPressedCheckable:g,textColorChecked:_,colorCheckable:v,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[e(`colorBordered`,n)]:D,[e(`closeSize`,o)]:O,[e(`closeIconSize`,o)]:k,[e(`fontSize`,o)]:A,[e(`height`,o)]:j,[e(`color`,n)]:M,[e(`textColor`,n)]:N,[e(`border`,n)]:P,[e(`closeIconColor`,n)]:F,[e(`closeIconColorHover`,n)]:I,[e(`closeIconColorPressed`,n)]:L,[e(`closeColorHover`,n)]:R,[e(`closeColorPressed`,n)]:z}}=y.value,B=d(l);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":s,"--n-border-radius":u,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":r||(a.value?D:M),"--n-color-checkable":v,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":f,"--n-padding":c,"--n-text-color":i||N,"--n-text-color-checkable":m,"--n-text-color-checked":_,"--n-text-color-hover-checkable":h,"--n-text-color-pressed-checkable":g}}),D=c?h(`tag`,g(()=>{let e=``,{type:n,color:{color:i,textColor:o}={}}=t;return e+=n[0],e+=p.value[0],i&&(e+=`a${r(i)}`),o&&(e+=`b${r(o)}`),a.value&&(e+=`c`),e}),T,t):void 0;return Object.assign(Object.assign({},C),{rtlEnabled:w,mergedClsPrefix:o,contentRef:i,mergedBordered:a,handleClick:x,handleCloseClick:S,cssVars:c?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender})},render(){var e;let{mergedClsPrefix:t,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:s}=this;o?.();let c=S(s.avatar,e=>e&&u(`div`,{class:`${t}-tag__avatar`},e)),l=S(s.icon,e=>e&&u(`div`,{class:`${t}-tag__icon`},e));return u(`div`,{class:[`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:n,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:a,[`${t}-tag--avatar`]:c,[`${t}-tag--icon`]:l,[`${t}-tag--closable`]:r}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},l||c,u(`span`,{class:`${t}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&r?u(C,{clsPrefix:t,class:`${t}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?u(`div`,{class:`${t}-tag__border`,style:{borderColor:i}}):null)}});export{A as n,j as t};