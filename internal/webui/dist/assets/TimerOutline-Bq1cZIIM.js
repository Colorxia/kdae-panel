import{S as ue,aE as he,aF as be,y as U,D as o,aG as E,A as M,U as d,a0 as I,d as G,aH as N,s as a,F as x,G as fe,H as X,an as ve,r as K,I as ge,m as F,aI as we,aJ as me,_ as W,O as y,aC as A,aK as c,$ as pe,b as xe,p as ye,e as L}from"./index-C_GhywbR.js";import{a as ke}from"./text-CrEFb7TY.js";function Ce(e){const{primaryColor:s,opacityDisabled:r,borderRadius:n,textColor3:v}=e;return Object.assign(Object.assign({},he),{iconColor:v,textColor:"white",loadingColor:s,opacityDisabled:r,railColor:"rgba(0, 0, 0, .14)",railColorActive:s,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:n,railBorderRadiusMedium:n,railBorderRadiusLarge:n,buttonBorderRadiusSmall:n,buttonBorderRadiusMedium:n,buttonBorderRadiusLarge:n,boxShadowFocus:`0 0 0 2px ${be(s,{alpha:.2})}`})}const Se={common:ue,self:Ce},Be=U("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[o("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),o("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),o("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),U("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[E({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),o("checked, unchecked",`
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
 `),o("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),o("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),M("&:focus",[o("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),d("round",[o("rail","border-radius: calc(var(--n-rail-height) / 2);",[o("button","border-radius: calc(var(--n-button-height) / 2);")])]),I("disabled",[I("icon",[d("rubber-band",[d("pressed",[o("rail",[o("button","max-width: var(--n-button-width-pressed);")])]),o("rail",[M("&:active",[o("button","max-width: var(--n-button-width-pressed);")])]),d("active",[d("pressed",[o("rail",[o("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),o("rail",[M("&:active",[o("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),d("active",[o("rail",[o("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),o("rail",`
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
 `,[o("button-icon",`
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
 `,[E()]),o("button",`
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
 `)]),d("active",[o("rail","background-color: var(--n-rail-color-active);")]),d("loading",[o("rail",`
 cursor: wait;
 `)]),d("disabled",[o("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),Re=Object.assign(Object.assign({},X.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]});let $;const Ve=G({name:"Switch",props:Re,slots:Object,setup(e){$===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?$=CSS.supports("width","max(1px)"):$=!1:$=!0);const{mergedClsPrefixRef:s,inlineThemeDisabled:r,mergedComponentPropsRef:n}=fe(e),v=X("Switch","-switch",Be,Se,e,s),g=ve(e,{mergedSize(t){var u,h;if(e.size!==void 0)return e.size;if(t)return t.mergedSize.value;const p=(h=(u=n?.value)===null||u===void 0?void 0:u.Switch)===null||h===void 0?void 0:h.size;return p||"medium"}}),{mergedSizeRef:C,mergedDisabledRef:w}=g,S=K(e.defaultValue),_=pe(e,"value"),m=ke(_,S),z=F(()=>m.value===e.checkedValue),i=K(!1),l=K(!1),B=F(()=>{const{railStyle:t}=e;if(t)return t({focused:l.value,checked:z.value})});function V(t){const{"onUpdate:value":u,onChange:h,onUpdateValue:p}=e,{nTriggerFormInput:O,nTriggerFormChange:T}=g;u&&W(u,t),p&&W(p,t),h&&W(h,t),S.value=t,O(),T()}function Y(){const{nTriggerFormFocus:t}=g;t()}function J(){const{nTriggerFormBlur:t}=g;t()}function q(){e.loading||w.value||(m.value!==e.checkedValue?V(e.checkedValue):V(e.uncheckedValue))}function Q(){l.value=!0,Y()}function Z(){l.value=!1,J(),i.value=!1}function ee(t){e.loading||w.value||t.key===" "&&(m.value!==e.checkedValue?V(e.checkedValue):V(e.uncheckedValue),i.value=!1)}function te(t){e.loading||w.value||t.key===" "&&(t.preventDefault(),i.value=!0)}const H=F(()=>{const{value:t}=C,{self:{opacityDisabled:u,railColor:h,railColorActive:p,buttonBoxShadow:O,buttonColor:T,boxShadowFocus:oe,loadingColor:ie,textColor:ae,iconColor:ne,[y("buttonHeight",t)]:b,[y("buttonWidth",t)]:re,[y("buttonWidthPressed",t)]:le,[y("railHeight",t)]:f,[y("railWidth",t)]:R,[y("railBorderRadius",t)]:se,[y("buttonBorderRadius",t)]:de},common:{cubicBezierEaseInOut:ce}}=v.value;let j,P,D;return $?(j=`calc((${f} - ${b}) / 2)`,P=`max(${f}, ${b})`,D=`max(${R}, calc(${R} + ${b} - ${f}))`):(j=A((c(f)-c(b))/2),P=A(Math.max(c(f),c(b))),D=c(f)>c(b)?R:A(c(R)+c(b)-c(f))),{"--n-bezier":ce,"--n-button-border-radius":de,"--n-button-box-shadow":O,"--n-button-color":T,"--n-button-width":re,"--n-button-width-pressed":le,"--n-button-height":b,"--n-height":P,"--n-offset":j,"--n-opacity-disabled":u,"--n-rail-border-radius":se,"--n-rail-color":h,"--n-rail-color-active":p,"--n-rail-height":f,"--n-rail-width":R,"--n-width":D,"--n-box-shadow-focus":oe,"--n-loading-color":ie,"--n-text-color":ae,"--n-icon-color":ne}}),k=r?ge("switch",F(()=>C.value[0]),H,e):void 0;return{handleClick:q,handleBlur:Z,handleFocus:Q,handleKeyup:ee,handleKeydown:te,mergedRailStyle:B,pressed:i,mergedClsPrefix:s,mergedValue:m,checked:z,mergedDisabled:w,cssVars:r?void 0:H,themeClass:k?.themeClass,onRender:k?.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:s,checked:r,mergedRailStyle:n,onRender:v,$slots:g}=this;v?.();const{checked:C,unchecked:w,icon:S,"checked-icon":_,"unchecked-icon":m}=g,z=!(N(S)&&N(_)&&N(m));return a("div",{role:"switch","aria-checked":r,class:[`${e}-switch`,this.themeClass,z&&`${e}-switch--icon`,r&&`${e}-switch--active`,s&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},a("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:n},x(C,i=>x(w,l=>i||l?a("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},a("div",{class:`${e}-switch__rail-placeholder`},a("div",{class:`${e}-switch__button-placeholder`}),i),a("div",{class:`${e}-switch__rail-placeholder`},a("div",{class:`${e}-switch__button-placeholder`}),l)):null)),a("div",{class:`${e}-switch__button`},x(S,i=>x(_,l=>x(m,B=>a(we,null,{default:()=>this.loading?a(me,Object.assign({key:"loading",clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(l||i)?a("div",{class:`${e}-switch__button-icon`,key:l?"checked-icon":"icon"},l||i):!this.checked&&(B||i)?a("div",{class:`${e}-switch__button-icon`,key:B?"unchecked-icon":"icon"},B||i):null})))),x(C,i=>i&&a("div",{key:"checked",class:`${e}-switch__checked`},i)),x(w,i=>i&&a("div",{key:"unchecked",class:`${e}-switch__unchecked`},i)))))}}),$e={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Fe=G({name:"TimerOutline",render:function(s,r){return xe(),ye("svg",$e,r[0]||(r[0]=[L("path",{d:"M112.91 128A191.85 191.85 0 0 0 64 254c-1.18 106.35 85.65 193.8 192 194c106.2.2 192-85.83 192-192c0-104.54-83.55-189.61-187.5-192a4.36 4.36 0 0 0-4.5 4.37V152",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),L("path",{d:"M233.38 278.63l-79-113a8.13 8.13 0 0 1 11.32-11.32l113 79a32.5 32.5 0 0 1-37.25 53.26a33.21 33.21 0 0 1-8.07-7.94z",fill:"currentColor"},null,-1)]))}});export{Ve as N,Fe as T};
