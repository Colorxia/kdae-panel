import{A as e,B as t,Cn as n,F as r,Gt as i,H as a,Ht as o,Kt as s,N as c,Q as l,Qn as u,S as d,U as f,V as p,Vt as m,Wt as h,X as g,_n as _,dn as v,jn as y,ln as b,nr as x,ot as S,pn as C,q as w,qt as T,sr as E,tt as D,un as O,w as k,x as A,y as j}from"./client-D9Dl4Cv_.js";import{t as M}from"./use-merged-state-DEYuBML9.js";import{o as N}from"./index-OVfu6MNg.js";function P(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return{...N,iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${f(t,{alpha:.2})}`}}var F={name:`Switch`,common:a,self:P},I=o(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[h(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),h(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),h(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),o(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[A({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),h(`checked, unchecked`,`
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
 `),h(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),h(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),m(`&:focus`,[h(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),i(`round`,[h(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[h(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),s(`disabled`,[s(`icon`,[i(`rubber-band`,[i(`pressed`,[h(`rail`,[h(`button`,`max-width: var(--n-button-width-pressed);`)])]),h(`rail`,[m(`&:active`,[h(`button`,`max-width: var(--n-button-width-pressed);`)])]),i(`active`,[i(`pressed`,[h(`rail`,[h(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),h(`rail`,[m(`&:active`,[h(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),i(`active`,[h(`rail`,[h(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),h(`rail`,`
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
 `,[h(`button-icon`,`
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
 `,[A()]),h(`button`,`
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
 `)]),i(`active`,[h(`rail`,`background-color: var(--n-rail-color-active);`)]),i(`loading`,[h(`rail`,`
 cursor: wait;
 `)]),i(`disabled`,[h(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),L=[`aria-checked`,`tabindex`,`onClick`,`onFocus`,`onBlur`,`onKeyup`,`onKeydown`],R={...t.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]},z,B=_({name:`Switch`,props:R,slots:Object,setup(e){z===void 0&&(z=typeof CSS<`u`?CSS.supports!==void 0&&CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:n,inlineThemeDisabled:i,mergedComponentPropsRef:a}=S(e),o=t(`Switch`,`-switch`,I,F,e,n),s=k(e,{mergedSize(t){return e.size===void 0?t?t.mergedSize.value:a?.value?.Switch?.size||`medium`:e.size}}),{mergedSizeRef:c,mergedDisabledRef:l}=s,d=u(e.defaultValue),f=x(e,`value`),m=M(f,d),h=b(()=>m.value===e.checkedValue),_=u(!1),v=u(!1),y=b(()=>{let{railStyle:t}=e;if(t)return t({focused:v.value,checked:h.value})});function C(t){let{"onUpdate:value":n,onChange:i,onUpdateValue:a}=e,{nTriggerFormInput:o,nTriggerFormChange:c}=s;n&&r(n,t),a&&r(a,t),i&&r(i,t),d.value=t,o(),c()}function E(){let{nTriggerFormFocus:e}=s;e()}function D(){let{nTriggerFormBlur:e}=s;e()}function O(){e.loading||l.value||(m.value===e.checkedValue?C(e.uncheckedValue):C(e.checkedValue))}function A(){v.value=!0,E()}function j(){v.value=!1,D(),_.value=!1}function N(t){e.loading||l.value||t.key===` `&&(m.value===e.checkedValue?C(e.uncheckedValue):C(e.checkedValue),_.value=!1)}function P(t){e.loading||l.value||t.key===` `&&(t.preventDefault(),_.value=!0)}let L=b(()=>{let{value:e}=c,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:s,loadingColor:l,textColor:u,iconColor:d,[T(`buttonHeight`,e)]:f,[T(`buttonWidth`,e)]:p,[T(`buttonWidthPressed`,e)]:m,[T(`railHeight`,e)]:h,[T(`railWidth`,e)]:_,[T(`railBorderRadius`,e)]:v,[T(`buttonBorderRadius`,e)]:y},common:{cubicBezierEaseInOut:b}}=o.value,x,S,C;return z?(x=`calc((${h} - ${f}) / 2)`,S=`max(${h}, ${f})`,C=`max(${_}, calc(${_} + ${f} - ${h}))`):(x=g((w(h)-w(f))/2),S=g(Math.max(w(h),w(f))),C=w(h)>w(f)?_:g(w(_)+w(f)-w(h))),{"--n-bezier":b,"--n-button-border-radius":y,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":p,"--n-button-width-pressed":m,"--n-button-height":f,"--n-height":S,"--n-offset":x,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":h,"--n-rail-width":_,"--n-width":C,"--n-box-shadow-focus":s,"--n-loading-color":l,"--n-text-color":u,"--n-icon-color":d}}),R=i?p(`switch`,b(()=>c.value[0]),L,e):void 0;return{handleClick:O,handleBlur:j,handleFocus:A,handleKeyup:N,handleKeydown:P,mergedRailStyle:y,pressed:_,mergedClsPrefix:n,mergedValue:m,checked:h,mergedDisabled:l,cssVars:i?void 0:L,themeClass:R?.themeClass,onRender:R?.onRender}},render(){let{mergedClsPrefix:t,mergedDisabled:r,checked:i,mergedRailStyle:a,onRender:o,$slots:s}=this;o?.();let{checked:u,unchecked:f,icon:p,"checked-icon":m,"unchecked-icon":h}=s,g=!(e(p)&&e(m)&&e(h));return y(),C(`div`,{role:`switch`,"aria-checked":i,class:l([`${t}-switch`,this.themeClass,g&&`${t}-switch--icon`,i&&`${t}-switch--active`,r&&`${t}-switch--disabled`,this.round&&`${t}-switch--round`,this.loading&&`${t}-switch--loading`,this.pressed&&`${t}-switch--pressed`,this.rubberBand&&`${t}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:E(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[O(`div`,{class:l(`${t}-switch__rail`),"aria-hidden":`true`,style:E(a)},[D(()=>c(u,e=>c(f,n=>e||n?(y(),C(`div`,{key:4,"aria-hidden":!0,class:l(`${t}-switch__children-placeholder`)},[O(`div`,{class:l(`${t}-switch__rail-placeholder`)},[O(`div`,{class:l(`${t}-switch__button-placeholder`)},null,2),D(()=>e)],2),O(`div`,{class:l(`${t}-switch__rail-placeholder`)},[O(`div`,{class:l(`${t}-switch__button-placeholder`)},null,2),D(()=>n)],2)],2)):null))),O(`div`,{class:l(`${t}-switch__button`)},[D(()=>c(p,e=>c(m,r=>c(h,i=>(y(),v(d,null,{default:()=>this.loading?(y(),v(j,n({key:`loading`,clsPrefix:t,strokeWidth:20},this.spinProps),null,16,[`clsPrefix`])):this.checked&&(r||e)?(y(),C(`div`,{class:l(`${t}-switch__button-icon`),key:r?`checked-icon`:`icon`},[D(()=>r||e)],2)):!this.checked&&(i||e)?(y(),C(`div`,{class:l(`${t}-switch__button-icon`),key:i?`unchecked-icon`:`icon`},[D(()=>i||e)],2)):null},1024)))))),D(()=>c(u,e=>e&&(y(),C(`div`,{key:`checked`,class:l(`${t}-switch__checked`)},[D(()=>e)],2)))),D(()=>c(f,e=>e&&(y(),C(`div`,{key:`unchecked`,class:l(`${t}-switch__unchecked`)},[D(()=>e)],2))))],2)],6)],46,L)}});export{B as t};