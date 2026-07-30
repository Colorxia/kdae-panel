import{$t as e,C as t,Ct as n,E as r,Jt as i,Lt as a,O as o,Qt as s,Sn as c,Vt as l,Wt as u,Xt as d,Zt as f,dt as p,er as m,ft as h,ir as g,j as _,mn as v,pt as y,qt as b,vt as x,wn as S,x as C,xt as w}from"./client-BNTVmNnN.js";import{a as T}from"./text-Dp6d97Hj.js";import{a as E}from"./index-DwxMOWIr.js";function D(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return Object.assign(Object.assign({},E),{iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${a(t,{alpha:.2})}`})}var O={name:`Switch`,common:C,self:D},k=i(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[d(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),d(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),d(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),i(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[r({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),d(`checked, unchecked`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),d(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),d(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),b(`&:focus`,[d(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),f(`round`,[d(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[d(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),s(`disabled`,[s(`icon`,[f(`rubber-band`,[f(`pressed`,[d(`rail`,[d(`button`,`max-width: var(--n-button-width-pressed);`)])]),d(`rail`,[b(`&:active`,[d(`button`,`max-width: var(--n-button-width-pressed);`)])]),f(`active`,[f(`pressed`,[d(`rail`,[d(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),d(`rail`,[b(`&:active`,[d(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),f(`active`,[d(`rail`,[d(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),d(`rail`,`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[d(`button-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[r()]),d(`button`,`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),f(`active`,[d(`rail`,`background-color: var(--n-rail-color-active);`)]),f(`loading`,[d(`rail`,`
 cursor: wait;
 `)]),f(`disabled`,[d(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),A=Object.assign(Object.assign({},_.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]}),j,M=c({name:`Switch`,props:A,slots:Object,setup(t){j===void 0&&(j=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=y(t),o=_(`Switch`,`-switch`,k,O,t,r),s=p(t,{mergedSize(e){return t.size===void 0?e?e.mergedSize.value:a?.value?.Switch?.size||`medium`:t.size}}),{mergedSizeRef:c,mergedDisabledRef:d}=s,f=m(t.defaultValue),b=T(g(t,`value`),f),x=v(()=>b.value===t.checkedValue),S=m(!1),C=m(!1),w=v(()=>{let{railStyle:e}=t;if(e)return e({focused:C.value,checked:x.value})});function E(e){let{"onUpdate:value":r,onChange:i,onUpdateValue:a}=t,{nTriggerFormInput:o,nTriggerFormChange:c}=s;r&&n(r,e),a&&n(a,e),i&&n(i,e),f.value=e,o(),c()}function D(){let{nTriggerFormFocus:e}=s;e()}function A(){let{nTriggerFormBlur:e}=s;e()}function M(){t.loading||d.value||(b.value===t.checkedValue?E(t.uncheckedValue):E(t.checkedValue))}function N(){C.value=!0,D()}function P(){C.value=!1,A(),S.value=!1}function F(e){t.loading||d.value||e.key===` `&&(b.value===t.checkedValue?E(t.uncheckedValue):E(t.checkedValue),S.value=!1)}function I(e){t.loading||d.value||e.key===` `&&(e.preventDefault(),S.value=!0)}let L=v(()=>{let{value:t}=c,{self:{opacityDisabled:n,railColor:r,railColorActive:i,buttonBoxShadow:a,buttonColor:s,boxShadowFocus:d,loadingColor:f,textColor:p,iconColor:m,[e(`buttonHeight`,t)]:h,[e(`buttonWidth`,t)]:g,[e(`buttonWidthPressed`,t)]:_,[e(`railHeight`,t)]:v,[e(`railWidth`,t)]:y,[e(`railBorderRadius`,t)]:b,[e(`buttonBorderRadius`,t)]:x},common:{cubicBezierEaseInOut:S}}=o.value,C,w,T;return j?(C=`calc((${v} - ${h}) / 2)`,w=`max(${v}, ${h})`,T=`max(${y}, calc(${y} + ${h} - ${v}))`):(C=u((l(v)-l(h))/2),w=u(Math.max(l(v),l(h))),T=l(v)>l(h)?y:u(l(y)+l(h)-l(v))),{"--n-bezier":S,"--n-button-border-radius":x,"--n-button-box-shadow":a,"--n-button-color":s,"--n-button-width":g,"--n-button-width-pressed":_,"--n-button-height":h,"--n-height":w,"--n-offset":C,"--n-opacity-disabled":n,"--n-rail-border-radius":b,"--n-rail-color":r,"--n-rail-color-active":i,"--n-rail-height":v,"--n-rail-width":y,"--n-width":T,"--n-box-shadow-focus":d,"--n-loading-color":f,"--n-text-color":p,"--n-icon-color":m}}),R=i?h(`switch`,v(()=>c.value[0]),L,t):void 0;return{handleClick:M,handleBlur:P,handleFocus:N,handleKeyup:F,handleKeydown:I,mergedRailStyle:w,pressed:S,mergedClsPrefix:r,mergedValue:b,checked:x,mergedDisabled:d,cssVars:i?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:n,checked:r,mergedRailStyle:i,onRender:a,$slots:s}=this;a?.();let{checked:c,unchecked:l,icon:u,"checked-icon":d,"unchecked-icon":f}=s,p=!(x(u)&&x(d)&&x(f));return S(`div`,{role:`switch`,"aria-checked":r,class:[`${e}-switch`,this.themeClass,p&&`${e}-switch--icon`,r&&`${e}-switch--active`,n&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},S(`div`,{class:`${e}-switch__rail`,"aria-hidden":`true`,style:i},w(c,t=>w(l,n=>t||n?S(`div`,{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},S(`div`,{class:`${e}-switch__rail-placeholder`},S(`div`,{class:`${e}-switch__button-placeholder`}),t),S(`div`,{class:`${e}-switch__rail-placeholder`},S(`div`,{class:`${e}-switch__button-placeholder`}),n)):null)),S(`div`,{class:`${e}-switch__button`},w(u,n=>w(d,r=>w(f,i=>S(o,null,{default:()=>this.loading?S(t,Object.assign({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(r||n)?S(`div`,{class:`${e}-switch__button-icon`,key:r?`checked-icon`:`icon`},r||n):!this.checked&&(i||n)?S(`div`,{class:`${e}-switch__button-icon`,key:i?`unchecked-icon`:`icon`},i||n):null})))),w(c,t=>t&&S(`div`,{key:`checked`,class:`${e}-switch__checked`},t)),w(l,t=>t&&S(`div`,{key:`unchecked`,class:`${e}-switch__unchecked`},t)))))}});export{M as t};