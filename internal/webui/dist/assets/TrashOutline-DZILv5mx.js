import{$t as e,C as t,E as n,En as r,Gt as i,Ht as a,Jt as o,O as s,Qt as c,Rn as l,Rt as u,Yt as d,Zt as f,bn as p,dt as m,en as h,ft as g,gn as _,j as v,nr as y,or as b,pt as x,vt as S,wn as C,wt as w,x as T,xn as E,xt as D}from"./client-DzOxLNa2.js";import{a as O}from"./text-DPkxR-eM.js";import{o as k}from"./index-CyMxPzFe.js";function A(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return Object.assign(Object.assign({},k),{iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${u(t,{alpha:.2})}`})}var j={name:`Switch`,common:T,self:A},M=d(`switch`,`
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
 `),d(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[n({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),f(`checked, unchecked`,`
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
 `),o(`&:focus`,[f(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),c(`round`,[f(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[f(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),e(`disabled`,[e(`icon`,[c(`rubber-band`,[c(`pressed`,[f(`rail`,[f(`button`,`max-width: var(--n-button-width-pressed);`)])]),f(`rail`,[o(`&:active`,[f(`button`,`max-width: var(--n-button-width-pressed);`)])]),c(`active`,[c(`pressed`,[f(`rail`,[f(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),f(`rail`,[o(`&:active`,[f(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),c(`active`,[f(`rail`,[f(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),f(`rail`,`
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
 `,[n()]),f(`button`,`
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
 `)]),c(`active`,[f(`rail`,`background-color: var(--n-rail-color-active);`)]),c(`loading`,[f(`rail`,`
 cursor: wait;
 `)]),c(`disabled`,[f(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),N=Object.assign(Object.assign({},v.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]}),P,F=C({name:`Switch`,props:N,slots:Object,setup(e){P===void 0&&(P=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedComponentPropsRef:r}=x(e),o=v(`Switch`,`-switch`,M,j,e,t),s=m(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:r?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:c,mergedDisabledRef:l}=s,u=y(e.defaultValue),d=O(b(e,`value`),u),f=_(()=>d.value===e.checkedValue),p=y(!1),S=y(!1),C=_(()=>{let{railStyle:t}=e;if(t)return t({focused:S.value,checked:f.value})});function T(t){let{"onUpdate:value":n,onChange:r,onUpdateValue:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=s;n&&w(n,t),i&&w(i,t),r&&w(r,t),u.value=t,a(),o()}function E(){let{nTriggerFormFocus:e}=s;e()}function D(){let{nTriggerFormBlur:e}=s;e()}function k(){e.loading||l.value||(d.value===e.checkedValue?T(e.uncheckedValue):T(e.checkedValue))}function A(){S.value=!0,E()}function N(){S.value=!1,D(),p.value=!1}function F(t){e.loading||l.value||t.key===` `&&(d.value===e.checkedValue?T(e.uncheckedValue):T(e.checkedValue),p.value=!1)}function I(t){e.loading||l.value||t.key===` `&&(t.preventDefault(),p.value=!0)}let L=_(()=>{let{value:e}=c,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:s,buttonColor:l,boxShadowFocus:u,loadingColor:d,textColor:f,iconColor:p,[h(`buttonHeight`,e)]:m,[h(`buttonWidth`,e)]:g,[h(`buttonWidthPressed`,e)]:_,[h(`railHeight`,e)]:v,[h(`railWidth`,e)]:y,[h(`railBorderRadius`,e)]:b,[h(`buttonBorderRadius`,e)]:x},common:{cubicBezierEaseInOut:S}}=o.value,C,w,T;return P?(C=`calc((${v} - ${m}) / 2)`,w=`max(${v}, ${m})`,T=`max(${y}, calc(${y} + ${m} - ${v}))`):(C=i((a(v)-a(m))/2),w=i(Math.max(a(v),a(m))),T=a(v)>a(m)?y:i(a(y)+a(m)-a(v))),{"--n-bezier":S,"--n-button-border-radius":x,"--n-button-box-shadow":s,"--n-button-color":l,"--n-button-width":g,"--n-button-width-pressed":_,"--n-button-height":m,"--n-height":w,"--n-offset":C,"--n-opacity-disabled":t,"--n-rail-border-radius":b,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":v,"--n-rail-width":y,"--n-width":T,"--n-box-shadow-focus":u,"--n-loading-color":d,"--n-text-color":f,"--n-icon-color":p}}),R=n?g(`switch`,_(()=>c.value[0]),L,e):void 0;return{handleClick:k,handleBlur:N,handleFocus:A,handleKeyup:F,handleKeydown:I,mergedRailStyle:C,pressed:p,mergedClsPrefix:t,mergedValue:d,checked:f,mergedDisabled:l,cssVars:n?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:n,checked:i,mergedRailStyle:a,onRender:o,$slots:c}=this;o?.();let{checked:l,unchecked:u,icon:d,"checked-icon":f,"unchecked-icon":p}=c,m=!(S(d)&&S(f)&&S(p));return r(`div`,{role:`switch`,"aria-checked":i,class:[`${e}-switch`,this.themeClass,m&&`${e}-switch--icon`,i&&`${e}-switch--active`,n&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},r(`div`,{class:`${e}-switch__rail`,"aria-hidden":`true`,style:a},D(l,t=>D(u,n=>t||n?r(`div`,{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},r(`div`,{class:`${e}-switch__rail-placeholder`},r(`div`,{class:`${e}-switch__button-placeholder`}),t),r(`div`,{class:`${e}-switch__rail-placeholder`},r(`div`,{class:`${e}-switch__button-placeholder`}),n)):null)),r(`div`,{class:`${e}-switch__button`},D(d,n=>D(f,i=>D(p,a=>r(s,null,{default:()=>this.loading?r(t,Object.assign({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(i||n)?r(`div`,{class:`${e}-switch__button-icon`,key:i?`checked-icon`:`icon`},i||n):!this.checked&&(a||n)?r(`div`,{class:`${e}-switch__button-icon`,key:a?`unchecked-icon`:`icon`},a||n):null})))),D(l,t=>t&&r(`div`,{key:`checked`,class:`${e}-switch__checked`},t)),D(u,t=>t&&r(`div`,{key:`unchecked`,class:`${e}-switch__unchecked`},t)))))}}),I={xmlns:`http://www.w3.org/2000/svg`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,viewBox:`0 0 512 512`},L=C({name:`TrashOutline`,render:function(e,t){return l(),p(`svg`,I,t[0]||=[E(`<path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path>`,6)])}});export{F as n,L as t};