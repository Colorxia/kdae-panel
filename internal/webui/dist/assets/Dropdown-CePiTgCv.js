import{$n as e,$t as t,Ct as n,En as r,Ft as i,Hn as a,It as o,Jt as s,Ln as c,Mn as l,Mt as u,On as d,Pt as f,Qn as p,Qt as m,Sn as h,Tt as g,Xt as _,Zt as v,er as y,ft as b,in as x,ir as S,j as C,jn as w,mn as T,pt as E,qt as D,un as O,v as k,wn as A}from"./client-BNTVmNnN.js";import{i as j,t as M}from"./create-CZjQqUSJ.js";import{f as N,g as P,p as F,r as I}from"./light-Ckkg8noG.js";import{t as L}from"./utils-B0cx5URQ.js";import{c as R,i as z,n as B,r as V,s as ee,t as H}from"./Popover-DK5f737A.js";import{a as te}from"./text-Dp6d97Hj.js";import{t as ne}from"./Icon-DVYmz0Cw.js";import{P as U,T as re,_ as ie,g as ae}from"./index-krGuNh2y.js";function oe(t={},n){let r=p({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:s,keyup:c}=t,u=e=>{switch(e.key){case`Control`:r.ctrl=!0;break;case`Meta`:r.command=!0,r.win=!0;break;case`Shift`:r.shift=!0;break;case`Tab`:r.tab=!0;break}s!==void 0&&Object.keys(s).forEach(t=>{if(t!==e.key)return;let n=s[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},d=e=>{switch(e.key){case`Control`:r.ctrl=!1;break;case`Meta`:r.command=!1,r.win=!1;break;case`Shift`:r.shift=!1;break;case`Tab`:r.tab=!1;break}c!==void 0&&Object.keys(c).forEach(t=>{if(t!==e.key)return;let n=c[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},f=()=>{(n===void 0||n.value)&&(o(`keydown`,document,u),o(`keyup`,document,d)),n!==void 0&&a(n,e=>{e?(o(`keydown`,document,u),o(`keyup`,document,d)):(i(`keydown`,document,u),i(`keyup`,document,d))})};return L()?(w(f),l(()=>{(n===void 0||n.value)&&(i(`keydown`,document,u),i(`keyup`,document,d))})):f(),e(r)}function se(e,t,n){if(!t)return e;let r=y(e.value),i=null;return a(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}function W(e){return t=>{t?e.value=t.$el:e.value=null}}var G=h({name:`ChevronRight`,render(){return A(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},A(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`}))}}),ce=h({name:`Tooltip`,props:Object.assign(Object.assign({},B),C.props),slots:Object,__popover__:!0,setup(e){let{mergedClsPrefixRef:t}=E(e),n=C(`Tooltip`,`-tooltip`,void 0,ae,e,t),r=y(null);return Object.assign(Object.assign({},{syncPosition(){r.value.syncPosition()},setShow(e){r.value.setShow(e)}}),{popoverRef:r,mergedTheme:n,popoverThemeOverrides:T(()=>n.value.self)})},render(){let{mergedTheme:e,internalExtraClass:t}=this;return A(H,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:t.concat(`tooltip`),ref:`popoverRef`}),this.$slots)}}),K=u(`n-dropdown-menu`),q=u(`n-dropdown`),J=u(`n-dropdown-option`),Y=h({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return A(`div`,{class:`${this.clsPrefix}-dropdown-divider`})}}),le=h({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=r(K),{renderLabelRef:n,labelFieldRef:i,nodePropsRef:a,renderOptionRef:o}=r(q);return{labelField:i,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:a,renderOption:o}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:n,nodeProps:r,renderLabel:i,renderOption:a}=this,{rawNode:o}=this.tmNode,s=A(`div`,Object.assign({class:`${e}-dropdown-option`},r?.(o)),A(`div`,{class:`${e}-dropdown-option-body ${e}-dropdown-option-body--group`},A(`div`,{"data-dropdown-option":!0,class:[`${e}-dropdown-option-body__prefix`,n&&`${e}-dropdown-option-body__prefix--show-icon`]},U(o.icon)),A(`div`,{class:`${e}-dropdown-option-body__label`,"data-dropdown-option":!0},i?i(o):U(o.title??o[this.labelField])),A(`div`,{class:[`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return a?a({node:s,option:o}):s}});function X(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ue(e){return e.type===`group`}function Z(e){return e.type===`divider`}function de(e){return e.type===`render`}var Q=h({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=r(q),{hoverKeyRef:n,keyboardKeyRef:i,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:o,activeKeyPathRef:s,animatedRef:l,mergedShowRef:u,renderLabelRef:d,renderIconRef:p,labelFieldRef:m,childrenFieldRef:h,renderOptionRef:g,nodePropsRef:_,menuPropsRef:v}=t,b=r(J,null),x=r(K),S=r(N),C=T(()=>e.tmNode.rawNode),w=T(()=>{let{value:t}=h;return X(e.tmNode.rawNode,t)}),E=T(()=>{let{disabled:t}=e.tmNode;return t}),D=se(T(()=>{if(!w.value)return!1;let{key:t,disabled:r}=e.tmNode;if(r)return!1;let{value:s}=n,{value:c}=i,{value:l}=a,{value:u}=o;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,T(()=>i.value===null&&!l.value)),O=T(()=>!!b?.enteringSubmenuRef.value),k=y(!1);c(J,{enteringSubmenuRef:k});function A(){k.value=!0}function M(){k.value=!1}function P(){let{parentKey:t,tmNode:r}=e;r.disabled||u.value&&(a.value=t,i.value=null,n.value=r.key)}function F(){let{tmNode:t}=e;t.disabled||u.value&&n.value!==t.key&&P()}function I(t){if(e.tmNode.disabled||!u.value)return;let{relatedTarget:r}=t;r&&!j({target:r},`dropdownOption`)&&!j({target:r},`scrollbarRail`)&&(n.value=null)}function L(){let{value:n}=w,{tmNode:r}=e;u.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:m,renderLabel:d,renderIcon:p,siblingHasIcon:x.showIconRef,siblingHasSubmenu:x.hasSubmenuRef,menuProps:v,popoverBody:S,animated:l,mergedShowSubmenu:T(()=>D.value&&!O.value),rawNode:C,hasSubmenu:w,pending:f(()=>{let{value:t}=o,{key:n}=e.tmNode;return t.includes(n)}),childActive:f(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:f(()=>{let{value:t}=s,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:E,renderOption:g,nodeProps:_,handleClick:L,handleMouseMove:F,handleMouseEnter:P,handleMouseLeave:I,handleSubmenuBeforeEnter:A,handleSubmenuAfterEnter:M}},render(){let{animated:e,rawNode:t,mergedShowSubmenu:n,clsPrefix:r,siblingHasIcon:i,siblingHasSubmenu:a,renderLabel:o,renderIcon:s,renderOption:c,nodeProps:l,props:u,scrollable:f}=this,p=null;if(n){let e=this.menuProps?.call(this,t,t.children);p=A($,Object.assign({},e,{clsPrefix:r,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}let m={class:[`${r}-dropdown-option-body`,this.pending&&`${r}-dropdown-option-body--pending`,this.active&&`${r}-dropdown-option-body--active`,this.childActive&&`${r}-dropdown-option-body--child-active`,this.mergedDisabled&&`${r}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},h=l?.(t),g=A(`div`,Object.assign({class:[`${r}-dropdown-option`,h?.class],"data-dropdown-option":!0},h),A(`div`,d(m,u),[A(`div`,{class:[`${r}-dropdown-option-body__prefix`,i&&`${r}-dropdown-option-body__prefix--show-icon`]},[s?s(t):U(t.icon)]),A(`div`,{"data-dropdown-option":!0,class:`${r}-dropdown-option-body__label`},o?o(t):U(t[this.labelField]??t.title)),A(`div`,{"data-dropdown-option":!0,class:[`${r}-dropdown-option-body__suffix`,a&&`${r}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?A(ne,null,{default:()=>A(G,null)}):null)]),this.hasSubmenu?A(R,null,{default:()=>[A(ee,null,{default:()=>A(`div`,{class:`${r}-dropdown-offset-container`},A(z,{show:this.mergedShowSubmenu,placement:this.placement,to:f&&this.popoverBody||void 0,teleportDisabled:!f},{default:()=>A(`div`,{class:`${r}-dropdown-menu-wrapper`},e?A(x,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>p}):p)}))})]}):null);return c?c({node:g,option:t}):g}}),fe=h({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:r}=e;return A(O,null,A(le,{clsPrefix:n,tmNode:e,key:e.key}),r?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:Z(r)?A(Y,{clsPrefix:n,key:e.key}):e.isGroup?(g(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):A(Q,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key})}))}}),pe=h({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return A(`div`,t,[e?.()])}}),$=h({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=r(q);c(K,{showIconRef:T(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:T(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>X(e,t));let{rawNode:n}=e;return X(n,t)})})});let i=y(null);return c(F,null),c(P,null),c(N,i),{bodyRef:i}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,r=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:de(i)?A(pe,{tmNode:r,key:r.key}):Z(i)?A(Y,{clsPrefix:t,key:r.key}):ue(i)?A(fe,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key}):A(Q,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n})});return A(`div`,{class:[`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`],ref:`bodyRef`},n?A(k,{contentClass:`${t}-dropdown-menu__content`},{default:()=>r}):r,this.showArrow?V({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),me=s(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[re(),s(`dropdown-option`,`
 position: relative;
 `,[D(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[D(`&::before`,`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),s(`dropdown-option-body`,`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[D(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),m(`disabled`,[v(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[_(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),D(`&::before`,`background-color: var(--n-option-color-hover);`)]),v(`active`,`
 color: var(--n-option-text-color-active);
 `,[_(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),D(`&::before`,`background-color: var(--n-option-color-active);`)]),v(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[_(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),v(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),v(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[_(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[v(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),_(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[v(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),s(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),_(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),_(`suffix`,`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[v(`has-submenu`,`
 width: var(--n-option-icon-suffix-width);
 `),s(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),s(`dropdown-menu`,`pointer-events: all;`)]),s(`dropdown-offset-container`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),s(`dropdown-divider`,`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),s(`dropdown-menu-wrapper`,`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),D(`>`,[s(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),m(`scrollable`,`
 padding: var(--n-padding);
 `),v(`scrollable`,[_(`content`,`
 padding: var(--n-padding);
 `)])]),he={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},ge=Object.keys(B),_e=h({name:`Dropdown`,inheritAttrs:!1,props:Object.assign(Object.assign(Object.assign({},B),he),C.props),setup(e){let r=y(!1),i=te(S(e,`show`),r),o=T(()=>{let{keyField:t,childrenField:n}=e;return M(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),s=T(()=>o.value.treeNodes),l=y(null),u=y(null),d=y(null),p=T(()=>l.value??u.value??d.value??null),m=T(()=>o.value.getPath(p.value).keyPath),h=T(()=>o.value.getPath(e.value).keyPath),g=f(()=>e.keyboard&&i.value);oe({keydown:{ArrowUp:{prevent:!0,handler:F},ArrowRight:{prevent:!0,handler:P},ArrowDown:{prevent:!0,handler:I},ArrowLeft:{prevent:!0,handler:N},Enter:{prevent:!0,handler:L},Escape:j}},g);let{mergedClsPrefixRef:_,inlineThemeDisabled:v,mergedComponentPropsRef:x}=E(e),w=T(()=>e.size||x?.value?.Dropdown?.size||`medium`),D=C(`Dropdown`,`-dropdown`,me,ie,e,_);c(q,{labelFieldRef:S(e,`labelField`),childrenFieldRef:S(e,`childrenField`),renderLabelRef:S(e,`renderLabel`),renderIconRef:S(e,`renderIcon`),hoverKeyRef:l,keyboardKeyRef:u,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:m,activeKeyPathRef:h,animatedRef:S(e,`animated`),mergedShowRef:i,nodePropsRef:S(e,`nodeProps`),renderOptionRef:S(e,`renderOption`),menuPropsRef:S(e,`menuProps`),doSelect:O,doUpdateShow:k}),a(i,t=>{!e.animated&&!t&&A()});function O(t,r){let{onSelect:i}=e;i&&n(i,t,r)}function k(t){let{"onUpdate:show":i,onUpdateShow:a}=e;i&&n(i,t),a&&n(a,t),r.value=t}function A(){l.value=null,u.value=null,d.value=null}function j(){k(!1)}function N(){z(`left`)}function P(){z(`right`)}function F(){z(`up`)}function I(){z(`down`)}function L(){let e=R();e?.isLeaf&&i.value&&(O(e.key,e.rawNode),k(!1))}function R(){let{value:e}=o,{value:t}=p;return!e||t===null?null:e.getNode(t)??null}function z(e){let{value:t}=p,{value:{getFirstAvailableNode:n}}=o,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=R();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent();break}n&&(r=n.key)}}r!==null&&(l.value=null,u.value=r)}let B=T(()=>{let{inverted:n}=e,r=w.value,{common:{cubicBezierEaseInOut:i},self:a}=D.value,{padding:o,dividerColor:s,borderRadius:c,optionOpacityDisabled:l,[t(`optionIconSuffixWidth`,r)]:u,[t(`optionSuffixWidth`,r)]:d,[t(`optionIconPrefixWidth`,r)]:f,[t(`optionPrefixWidth`,r)]:p,[t(`fontSize`,r)]:m,[t(`optionHeight`,r)]:h,[t(`optionIconSize`,r)]:g}=a,_={"--n-bezier":i,"--n-font-size":m,"--n-padding":o,"--n-border-radius":c,"--n-option-height":h,"--n-option-prefix-width":p,"--n-option-icon-prefix-width":f,"--n-option-suffix-width":d,"--n-option-icon-suffix-width":u,"--n-option-icon-size":g,"--n-divider-color":s,"--n-option-opacity-disabled":l};return n?(_[`--n-color`]=a.colorInverted,_[`--n-option-color-hover`]=a.optionColorHoverInverted,_[`--n-option-color-active`]=a.optionColorActiveInverted,_[`--n-option-text-color`]=a.optionTextColorInverted,_[`--n-option-text-color-hover`]=a.optionTextColorHoverInverted,_[`--n-option-text-color-active`]=a.optionTextColorActiveInverted,_[`--n-option-text-color-child-active`]=a.optionTextColorChildActiveInverted,_[`--n-prefix-color`]=a.prefixColorInverted,_[`--n-suffix-color`]=a.suffixColorInverted,_[`--n-group-header-text-color`]=a.groupHeaderTextColorInverted):(_[`--n-color`]=a.color,_[`--n-option-color-hover`]=a.optionColorHover,_[`--n-option-color-active`]=a.optionColorActive,_[`--n-option-text-color`]=a.optionTextColor,_[`--n-option-text-color-hover`]=a.optionTextColorHover,_[`--n-option-text-color-active`]=a.optionTextColorActive,_[`--n-option-text-color-child-active`]=a.optionTextColorChildActive,_[`--n-prefix-color`]=a.prefixColor,_[`--n-suffix-color`]=a.suffixColor,_[`--n-group-header-text-color`]=a.groupHeaderTextColor),_}),V=v?b(`dropdown`,T(()=>`${w.value[0]}${e.inverted?`i`:``}`),B,e):void 0;return{mergedClsPrefix:_,mergedTheme:D,mergedSize:w,tmNodes:s,mergedShow:i,handleAfterLeave:()=>{e.animated&&A()},doUpdateShow:k,cssVars:v?void 0:B,themeClass:V?.themeClass,onRender:V?.onRender}},render(){let e=(e,t,n,r,i)=>{var a;let{mergedClsPrefix:o,menuProps:s}=this;(a=this.onRender)==null||a.call(this);let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:W(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...n,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:r,onMouseleave:i};return A($,d(this.$attrs,l,c))},{mergedTheme:t}=this,n={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return A(H,Object.assign({},I(this.$props,ge),n),{trigger:()=>{var e;return(e=this.$slots).default?.call(e)}})}});export{W as i,ce as n,G as r,_e as t};