import{$t as e,Ct as t,Et as n,Jt as r,Ln as i,Lt as a,Mt as o,P as s,Qt as c,Sn as l,Ut as u,Xt as d,Zt as f,er as p,ft as m,ir as h,j as g,mn as _,pt as v,qt as y,wn as b,x,xt as S}from"./client-BNTVmNnN.js";import{t as C}from"./Close-DKHGmVJZ.js";import{w}from"./index-DwxMOWIr.js";function T(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:o,successColor:s,warningColor:c,errorColor:l,baseColor:u,borderColor:d,opacityDisabled:f,tagColor:p,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:T,heightMedium:E,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},w),{closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:T,heightLarge:E,borderRadius:_,opacityDisabled:f,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:u,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${d}`,textColor:t,color:p,colorBordered:`rgb(250, 250, 252)`,closeIconColor:m,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${a(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:a(i,{alpha:.12}),colorBorderedPrimary:a(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:a(i,{alpha:.12}),closeColorPressedPrimary:a(i,{alpha:.18}),borderInfo:`1px solid ${a(o,{alpha:.3})}`,textColorInfo:o,colorInfo:a(o,{alpha:.12}),colorBorderedInfo:a(o,{alpha:.1}),closeIconColorInfo:o,closeIconColorHoverInfo:o,closeIconColorPressedInfo:o,closeColorHoverInfo:a(o,{alpha:.12}),closeColorPressedInfo:a(o,{alpha:.18}),borderSuccess:`1px solid ${a(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:a(s,{alpha:.12}),colorBorderedSuccess:a(s,{alpha:.1}),closeIconColorSuccess:s,closeIconColorHoverSuccess:s,closeIconColorPressedSuccess:s,closeColorHoverSuccess:a(s,{alpha:.12}),closeColorPressedSuccess:a(s,{alpha:.18}),borderWarning:`1px solid ${a(c,{alpha:.35})}`,textColorWarning:c,colorWarning:a(c,{alpha:.15}),colorBorderedWarning:a(c,{alpha:.12}),closeIconColorWarning:c,closeIconColorHoverWarning:c,closeIconColorPressedWarning:c,closeColorHoverWarning:a(c,{alpha:.12}),closeColorPressedWarning:a(c,{alpha:.18}),borderError:`1px solid ${a(l,{alpha:.23})}`,textColorError:l,colorError:a(l,{alpha:.1}),colorBorderedError:a(l,{alpha:.08}),closeIconColorError:l,closeIconColorHoverError:l,closeIconColorPressedError:l,closeColorHoverError:a(l,{alpha:.12}),closeColorPressedError:a(l,{alpha:.18})})}var E={name:`Tag`,common:x,self:T},D={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},O=r(`tag`,`
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
`,[f(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),d(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),d(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),d(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),d(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),f(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[d(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),d(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),f(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),f(`icon, avatar`,[f(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),f(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),f(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[c(`disabled`,[y(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[c(`checked`,`color: var(--n-text-color-hover-checkable);`)]),y(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[c(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),f(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[c(`disabled`,[y(`&:hover`,`background-color: var(--n-color-checked-hover);`),y(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),k=Object.assign(Object.assign(Object.assign({},g.props),D),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),A=o(`n-tag`),j=l({name:`Tag`,props:k,slots:Object,setup(r){let a=p(null),{mergedBorderedRef:o,mergedClsPrefixRef:c,inlineThemeDisabled:l,mergedRtlRef:d,mergedComponentPropsRef:f}=v(r),y=_(()=>r.size||f?.value?.Tag?.size||`medium`),b=g(`Tag`,`-tag`,O,E,r,c);i(A,{roundRef:h(r,`round`)});function x(){if(!r.disabled&&r.checkable){let{checked:e,onCheckedChange:t,onUpdateChecked:n,"onUpdate:checked":i}=r;n&&n(!e),i&&i(!e),t&&t(!e)}}function S(e){if(r.triggerClickOnClose||e.stopPropagation(),!r.disabled){let{onClose:n}=r;n&&t(n,e)}}let C={setTextContent(e){let{value:t}=a;t&&(t.textContent=e)}},w=s(`Tag`,d,c),T=_(()=>{let{type:t,color:{color:n,textColor:i}={}}=r,a=y.value,{common:{cubicBezierEaseInOut:s},self:{padding:c,closeMargin:l,borderRadius:d,opacityDisabled:f,textColorCheckable:p,textColorHoverCheckable:m,textColorPressedCheckable:h,textColorChecked:g,colorCheckable:_,colorHoverCheckable:v,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[e(`colorBordered`,t)]:D,[e(`closeSize`,a)]:O,[e(`closeIconSize`,a)]:k,[e(`fontSize`,a)]:A,[e(`height`,a)]:j,[e(`color`,t)]:M,[e(`textColor`,t)]:N,[e(`border`,t)]:P,[e(`closeIconColor`,t)]:F,[e(`closeIconColorHover`,t)]:I,[e(`closeIconColorPressed`,t)]:L,[e(`closeColorHover`,t)]:R,[e(`closeColorPressed`,t)]:z}}=b.value,B=u(l);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":s,"--n-border-radius":d,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(o.value?D:M),"--n-color-checkable":_,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":v,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":f,"--n-padding":c,"--n-text-color":i||N,"--n-text-color-checkable":p,"--n-text-color-checked":g,"--n-text-color-hover-checkable":m,"--n-text-color-pressed-checkable":h}}),D=l?m(`tag`,_(()=>{let e=``,{type:t,color:{color:i,textColor:a}={}}=r;return e+=t[0],e+=y.value[0],i&&(e+=`a${n(i)}`),a&&(e+=`b${n(a)}`),o.value&&(e+=`c`),e}),T,r):void 0;return Object.assign(Object.assign({},C),{rtlEnabled:w,mergedClsPrefix:c,contentRef:a,mergedBordered:o,handleClick:x,handleCloseClick:S,cssVars:l?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender})},render(){var e;let{mergedClsPrefix:t,rtlEnabled:n,closable:r,color:{borderColor:i}={},round:a,onRender:o,$slots:s}=this;o?.();let c=S(s.avatar,e=>e&&b(`div`,{class:`${t}-tag__avatar`},e)),l=S(s.icon,e=>e&&b(`div`,{class:`${t}-tag__icon`},e));return b(`div`,{class:[`${t}-tag`,this.themeClass,{[`${t}-tag--rtl`]:n,[`${t}-tag--strong`]:this.strong,[`${t}-tag--disabled`]:this.disabled,[`${t}-tag--checkable`]:this.checkable,[`${t}-tag--checked`]:this.checkable&&this.checked,[`${t}-tag--round`]:a,[`${t}-tag--avatar`]:c,[`${t}-tag--icon`]:l,[`${t}-tag--closable`]:r}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},l||c,b(`span`,{class:`${t}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&r?b(C,{clsPrefix:t,class:`${t}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:a,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?b(`div`,{class:`${t}-tag__border`,style:{borderColor:i}}):null)}});export{A as n,j as t};