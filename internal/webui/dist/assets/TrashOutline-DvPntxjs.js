import{$t as e,C as t,Ct as n,E as r,In as i,Jt as a,Lt as o,O as s,Qt as c,Sn as l,Vt as u,Wt as d,Xt as f,Zt as p,dt as m,er as h,ft as g,hn as _,ir as v,j as y,mn as b,pt as x,qt as S,vn as C,vt as w,wn as T,x as E,xt as D,yn as O}from"./client-BNTVmNnN.js";import{a as k}from"./text-Dp6d97Hj.js";import{a as A}from"./index-krGuNh2y.js";function j(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return Object.assign(Object.assign({},A),{iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${o(t,{alpha:.2})}`})}var M={name:`Switch`,common:E,self:j},N=a(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[f(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),f(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),f(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),a(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[r({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),f(`checked, unchecked`,`
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
 `),f(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),f(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),S(`&:focus`,[f(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),p(`round`,[f(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[f(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),c(`disabled`,[c(`icon`,[p(`rubber-band`,[p(`pressed`,[f(`rail`,[f(`button`,`max-width: var(--n-button-width-pressed);`)])]),f(`rail`,[S(`&:active`,[f(`button`,`max-width: var(--n-button-width-pressed);`)])]),p(`active`,[p(`pressed`,[f(`rail`,[f(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),f(`rail`,[S(`&:active`,[f(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),p(`active`,[f(`rail`,[f(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),f(`rail`,`
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
 `,[f(`button-icon`,`
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
 `,[r()]),f(`button`,`
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
 `)]),p(`active`,[f(`rail`,`background-color: var(--n-rail-color-active);`)]),p(`loading`,[f(`rail`,`
 cursor: wait;
 `)]),p(`disabled`,[f(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),P=Object.assign(Object.assign({},y.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]}),F,I=l({name:`Switch`,props:P,slots:Object,setup(t){F===void 0&&(F=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:r,inlineThemeDisabled:i,mergedComponentPropsRef:a}=x(t),o=y(`Switch`,`-switch`,N,M,t,r),s=m(t,{mergedSize(e){return t.size===void 0?e?e.mergedSize.value:a?.value?.Switch?.size||`medium`:t.size}}),{mergedSizeRef:c,mergedDisabledRef:l}=s,f=h(t.defaultValue),p=k(v(t,`value`),f),_=b(()=>p.value===t.checkedValue),S=h(!1),C=h(!1),w=b(()=>{let{railStyle:e}=t;if(e)return e({focused:C.value,checked:_.value})});function T(e){let{"onUpdate:value":r,onChange:i,onUpdateValue:a}=t,{nTriggerFormInput:o,nTriggerFormChange:c}=s;r&&n(r,e),a&&n(a,e),i&&n(i,e),f.value=e,o(),c()}function E(){let{nTriggerFormFocus:e}=s;e()}function D(){let{nTriggerFormBlur:e}=s;e()}function O(){t.loading||l.value||(p.value===t.checkedValue?T(t.uncheckedValue):T(t.checkedValue))}function A(){C.value=!0,E()}function j(){C.value=!1,D(),S.value=!1}function P(e){t.loading||l.value||e.key===` `&&(p.value===t.checkedValue?T(t.uncheckedValue):T(t.checkedValue),S.value=!1)}function I(e){t.loading||l.value||e.key===` `&&(e.preventDefault(),S.value=!0)}let L=b(()=>{let{value:t}=c,{self:{opacityDisabled:n,railColor:r,railColorActive:i,buttonBoxShadow:a,buttonColor:s,boxShadowFocus:l,loadingColor:f,textColor:p,iconColor:m,[e(`buttonHeight`,t)]:h,[e(`buttonWidth`,t)]:g,[e(`buttonWidthPressed`,t)]:_,[e(`railHeight`,t)]:v,[e(`railWidth`,t)]:y,[e(`railBorderRadius`,t)]:b,[e(`buttonBorderRadius`,t)]:x},common:{cubicBezierEaseInOut:S}}=o.value,C,w,T;return F?(C=`calc((${v} - ${h}) / 2)`,w=`max(${v}, ${h})`,T=`max(${y}, calc(${y} + ${h} - ${v}))`):(C=d((u(v)-u(h))/2),w=d(Math.max(u(v),u(h))),T=u(v)>u(h)?y:d(u(y)+u(h)-u(v))),{"--n-bezier":S,"--n-button-border-radius":x,"--n-button-box-shadow":a,"--n-button-color":s,"--n-button-width":g,"--n-button-width-pressed":_,"--n-button-height":h,"--n-height":w,"--n-offset":C,"--n-opacity-disabled":n,"--n-rail-border-radius":b,"--n-rail-color":r,"--n-rail-color-active":i,"--n-rail-height":v,"--n-rail-width":y,"--n-width":T,"--n-box-shadow-focus":l,"--n-loading-color":f,"--n-text-color":p,"--n-icon-color":m}}),R=i?g(`switch`,b(()=>c.value[0]),L,t):void 0;return{handleClick:O,handleBlur:j,handleFocus:A,handleKeyup:P,handleKeydown:I,mergedRailStyle:w,pressed:S,mergedClsPrefix:r,mergedValue:p,checked:_,mergedDisabled:l,cssVars:i?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:n,checked:r,mergedRailStyle:i,onRender:a,$slots:o}=this;a?.();let{checked:c,unchecked:l,icon:u,"checked-icon":d,"unchecked-icon":f}=o,p=!(w(u)&&w(d)&&w(f));return T(`div`,{role:`switch`,"aria-checked":r,class:[`${e}-switch`,this.themeClass,p&&`${e}-switch--icon`,r&&`${e}-switch--active`,n&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},T(`div`,{class:`${e}-switch__rail`,"aria-hidden":`true`,style:i},D(c,t=>D(l,n=>t||n?T(`div`,{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},T(`div`,{class:`${e}-switch__rail-placeholder`},T(`div`,{class:`${e}-switch__button-placeholder`}),t),T(`div`,{class:`${e}-switch__rail-placeholder`},T(`div`,{class:`${e}-switch__button-placeholder`}),n)):null)),T(`div`,{class:`${e}-switch__button`},D(u,n=>D(d,r=>D(f,i=>T(s,null,{default:()=>this.loading?T(t,Object.assign({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(r||n)?T(`div`,{class:`${e}-switch__button-icon`,key:r?`checked-icon`:`icon`},r||n):!this.checked&&(i||n)?T(`div`,{class:`${e}-switch__button-icon`,key:i?`unchecked-icon`:`icon`},i||n):null})))),D(c,t=>t&&T(`div`,{key:`checked`,class:`${e}-switch__checked`},t)),D(l,t=>t&&T(`div`,{key:`unchecked`,class:`${e}-switch__unchecked`},t)))))}}),L={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},R=l({name:`TimerOutline`,render:function(e,t){return i(),C(`svg`,L,t[0]||=[_(`path`,{d:`M112.91 128A191.85 191.85 0 0 0 64 254c-1.18 106.35 85.65 193.8 192 194c106.2.2 192-85.83 192-192c0-104.54-83.55-189.61-187.5-192a4.36 4.36 0 0 0-4.5 4.37V152`,fill:`none`,stroke:`currentColor`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`32`},null,-1),_(`path`,{d:`M233.38 278.63l-79-113a8.13 8.13 0 0 1 11.32-11.32l113 79a32.5 32.5 0 0 1-37.25 53.26a33.21 33.21 0 0 1-8.07-7.94z`,fill:`currentColor`},null,-1)])}}),z={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},B=l({name:`TrashOutline`,render:function(e,t){return i(),C(`svg`,z,t[0]||=[O(`<path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path>`,6)])}});export{R as n,I as r,B as t};