import{$ as e,B as t,Cn as n,Dn as r,En as i,F as a,Gt as o,Ht as s,Kt as c,L as l,Mn as u,Q as d,Qn as f,Qt as p,V as m,Vt as h,Wt as g,Xn as _,Z as v,Zn as y,_n as b,an as x,dn as S,dt as C,jn as w,kn as T,ln as E,lt as D,nr as O,ot as k,pn as A,qt as j,tt as M,un as N,xn as P,yn as F,zn as I}from"./client-D9Dl4Cv_.js";import{a as L,d as R,g as z,i as B,r as V,s as ee,t as te,u as ne}from"./create-CmOCwpuz.js";import{c as H,n as re,s as U}from"./Scrollbar--Z_xBrGb.js";import{_ as W,d as ie,i as G,m as ae,r as oe,v as se,x as ce}from"./event-DWmOoXfh.js";import{t as le}from"./use-merged-state-DEYuBML9.js";import{t as ue}from"./Icon-MKA_ndLp.js";import{b as de,x as fe}from"./index-OVfu6MNg.js";function pe(e={},t){let n=_({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:a,keyup:o}=e,s=e=>{switch(e.key){case`Control`:n.ctrl=!0;break;case`Meta`:n.command=!0,n.win=!0;break;case`Shift`:n.shift=!0;break;case`Tab`:n.tab=!0}a!==void 0&&Object.keys(a).forEach(t=>{if(t!==e.key)return;let n=a[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},c=e=>{switch(e.key){case`Control`:n.ctrl=!1;break;case`Meta`:n.command=!1,n.win=!1;break;case`Shift`:n.shift=!1;break;case`Tab`:n.tab=!1}o!==void 0&&Object.keys(o).forEach(t=>{if(t!==e.key)return;let n=o[t];if(typeof n==`function`)n(e);else{let{stop:t=!1,prevent:r=!1}=n;t&&e.stopPropagation(),r&&e.preventDefault(),n.handler(e)}})},l=()=>{(t===void 0||t.value)&&(H(`keydown`,document,s),H(`keyup`,document,c)),t!==void 0&&I(t,e=>{e?(H(`keydown`,document,s),H(`keyup`,document,c)):(U(`keydown`,document,s),U(`keyup`,document,c))})};return ae()?(i(l),r(()=>{(t===void 0||t.value)&&(U(`keydown`,document,s),U(`keyup`,document,c))})):l(),y(n)}var K=b({name:`ChevronRight`,render(){return(()=>{let e=v(`6ab04425f4fcb756`);return e[0]||=N(`svg`,{viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},[N(`path`,{d:`M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z`,fill:`currentColor`})],-1)})()}});function q(e){return t=>{e.value=t?t.$el:null}}var me={...B,...t.props},he=b({name:`Tooltip`,props:me,slots:Object,__popover__:!0,setup(e){let{mergedClsPrefixRef:n}=k(e),r=t(`Tooltip`,`-tooltip`,void 0,de,e,n),i=f(null);return{syncPosition(){i.value.syncPosition()},setShow(e){i.value.setShow(e)},popoverRef:i,mergedTheme:r,popoverThemeOverrides:E(()=>r.value.self)}},render(){let{mergedTheme:e,internalExtraClass:t}=this;return F(V,{...this.$props,theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:t.concat(`tooltip`),ref:`popoverRef`},this.$slots)}}),J=D(`n-dropdown-menu`),Y=D(`n-dropdown`),X=D(`n-dropdown-option`),Z=b({name:`DropdownDivider`,props:{clsPrefix:{type:String,required:!0}},render(){return w(),A(`div`,{class:d(`${this.clsPrefix}-dropdown-divider`)},null,2)}});function Q(e,t){return e.type===`submenu`||e.type===void 0&&e[t]!==void 0}function ge(e){return e.type===`group`}function _e(e){return e.type===`divider`}function ve(e){return e.type===`render`}function ye(e,t,n){if(!t)return e;let r=f(e.value),i=null;return I(e,e=>{i!==null&&window.clearTimeout(i),e===!0?n&&!n.value?r.value=!0:i=window.setTimeout(()=>{r.value=!0},t):r.value=!1}),r}var be=b({name:`DropdownOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:`right-start`},props:Object,scrollable:Boolean},setup(e){let t=P(Y),{hoverKeyRef:n,keyboardKeyRef:r,lastToggledSubmenuKeyRef:i,pendingKeyPathRef:a,activeKeyPathRef:o,animatedRef:s,mergedShowRef:c,renderLabelRef:d,renderIconRef:p,labelFieldRef:m,childrenFieldRef:h,renderOptionRef:g,nodePropsRef:_,menuPropsRef:v}=t,y=P(X,null),b=P(J),x=P(W),S=E(()=>e.tmNode.rawNode),C=E(()=>{let{value:t}=h;return Q(e.tmNode.rawNode,t)}),w=E(()=>{let{disabled:t}=e.tmNode;return t}),T=ye(E(()=>{if(!C.value)return!1;let{key:t,disabled:o}=e.tmNode;if(o)return!1;let{value:s}=n,{value:c}=r,{value:l}=i,{value:u}=a;return s===null?c===null?l!==null&&u.includes(t):u.includes(t)&&u[u.length-1]!==t:u.includes(t)}),300,E(()=>r.value===null&&!s.value)),D=E(()=>!!y?.enteringSubmenuRef.value),O=f(!1);u(X,{enteringSubmenuRef:O});function k(){O.value=!0}function A(){O.value=!1}function j(){let{parentKey:t,tmNode:a}=e;a.disabled||c.value&&(i.value=t,r.value=null,n.value=a.key)}function M(){let{tmNode:t}=e;t.disabled||c.value&&n.value!==t.key&&j()}function N(t){if(e.tmNode.disabled||!c.value)return;let{relatedTarget:r}=t;r&&!z({target:r},`dropdownOption`)&&!z({target:r},`scrollbarRail`)&&(n.value=null)}function F(){let{value:n}=C,{tmNode:r}=e;c.value&&!n&&!r.disabled&&(t.doSelect(r.key,r.rawNode),t.doUpdateShow(!1))}return{labelField:m,renderLabel:d,renderIcon:p,siblingHasIcon:b.showIconRef,siblingHasSubmenu:b.hasSubmenuRef,menuProps:v,popoverBody:x,animated:s,mergedShowSubmenu:E(()=>T.value&&!D.value),rawNode:S,hasSubmenu:C,pending:l(()=>{let{value:t}=a,{key:n}=e.tmNode;return t.includes(n)}),childActive:l(()=>{let{value:t}=o,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r<t.length-1}),active:l(()=>{let{value:t}=o,{key:n}=e.tmNode,r=t.findIndex(e=>n===e);return r!==-1&&r===t.length-1}),mergedDisabled:w,renderOption:g,nodeProps:_,handleClick:F,handleMouseMove:M,handleMouseEnter:j,handleMouseLeave:N,handleSubmenuBeforeEnter:k,handleSubmenuAfterEnter:A}},render(){let{animated:t,rawNode:r,mergedShowSubmenu:i,clsPrefix:a,siblingHasIcon:o,siblingHasSubmenu:s,renderLabel:c,renderIcon:l,renderOption:u,nodeProps:f,props:m,scrollable:h}=this,g=null;if(i){let e=this.menuProps?.(r,r.children);g=(t=>(w(),S($,n({key:1},e,{clsPrefix:a,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}),null,16,[`clsPrefix`,`scrollable`,`tmNodes`,`parentKey`])))(g)}let _={class:[`${a}-dropdown-option-body`,this.pending&&`${a}-dropdown-option-body--pending`,this.active&&`${a}-dropdown-option-body--active`,this.childActive&&`${a}-dropdown-option-body--child-active`,this.mergedDisabled&&`${a}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},v=f?.(r),y=(w(),A(`div`,n({class:[`${a}-dropdown-option`,v?.class],"data-dropdown-option":!0},v),[M(()=>F(`div`,n(_,m),[(w(),A(`div`,{class:d([`${a}-dropdown-option-body__prefix`,o&&`${a}-dropdown-option-body__prefix--show-icon`])},[M(()=>[l?l(r):G(r.icon)])],2)),(w(),A(`div`,{"data-dropdown-option":!0,class:d(`${a}-dropdown-option-body__label`)},[c?(w(),A(x,{key:0},[M(()=>c(r))],64)):(w(),A(x,{key:1},[M(()=>G(r[this.labelField]??r.title))],64))],2)),(w(),A(`div`,{"data-dropdown-option":!0,class:d([`${a}-dropdown-option-body__suffix`,s&&`${a}-dropdown-option-body__suffix--has-submenu`])},[this.hasSubmenu?(w(),S(ue,{key:0},{_:1,default:e(()=>(w(),S(K)))})):M(()=>null)],2))])),this.hasSubmenu?(w(),S(R,{key:0},{default:()=>[(w(),S(ne,null,{default:()=>(w(),A(`div`,{class:d(`${a}-dropdown-offset-container`)},[(w(),S(ee,{show:this.mergedShowSubmenu,placement:this.placement,to:h&&this.popoverBody||void 0,teleportDisabled:!h},{default:()=>(w(),A(`div`,{class:d(`${a}-dropdown-menu-wrapper`)},[t?(w(),S(p,{key:0,onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:`fade-in-scale-up-transition`,appear:!0},{default:()=>g},1032,[`onBeforeEnter`,`onAfterEnter`])):(w(),A(x,{key:1},[M(()=>g)],64))],2))},1032,[`show`,`placement`,`to`,`teleportDisabled`]))],2))},1024))]},1024)):M(()=>null)],16));return u?u({node:y,option:r}):y}}),xe=b({name:`DropdownGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{showIconRef:e,hasSubmenuRef:t}=P(J),{renderLabelRef:n,labelFieldRef:r,nodePropsRef:i,renderOptionRef:a}=P(Y);return{labelField:r,showIcon:e,hasSubmenu:t,renderLabel:n,nodeProps:i,renderOption:a}},render(){let{clsPrefix:e,hasSubmenu:t,showIcon:r,nodeProps:i,renderLabel:a,renderOption:o}=this,{rawNode:s}=this.tmNode,c=(w(),A(`div`,n({class:`${e}-dropdown-option`},i?.(s)),[N(`div`,{class:d(`${e}-dropdown-option-body ${e}-dropdown-option-body--group`)},[N(`div`,{"data-dropdown-option":!0,class:d([`${e}-dropdown-option-body__prefix`,r&&`${e}-dropdown-option-body__prefix--show-icon`])},[M(()=>G(s.icon))],2),N(`div`,{class:d(`${e}-dropdown-option-body__label`),"data-dropdown-option":!0},[a?(w(),A(x,{key:0},[M(()=>a(s))],64)):(w(),A(x,{key:1},[M(()=>G(s.title??s[this.labelField]))],64))],2),N(`div`,{class:d([`${e}-dropdown-option-body__suffix`,t&&`${e}-dropdown-option-body__suffix--has-submenu`]),"data-dropdown-option":!0},null,2)],2)],16));return o?o({node:c,option:s}):c}}),Se=b({name:`NDropdownGroup`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){let{tmNode:e,parentKey:t,clsPrefix:n}=this,{children:r}=e;return w(),A(x,null,[(w(),S(xe,{clsPrefix:n,tmNode:e,key:e.key},null,8,[`clsPrefix`,`tmNode`])),M(()=>r?.map(e=>{let{rawNode:r}=e;return r.show===!1?null:_e(r)?F(Z,{clsPrefix:n,key:e.key}):e.isGroup?(C(`dropdown`,"`group` node is not allowed to be put in `group` node."),null):(w(),S(be,{clsPrefix:n,tmNode:e,parentKey:t,key:e.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`]))}))],64)}}),Ce=b({name:`DropdownRenderOption`,props:{tmNode:{type:Object,required:!0}},render(){let{rawNode:{render:e,props:t}}=this.tmNode;return F(`div`,t,[e?.()])}}),$=b({name:`DropdownMenu`,props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){let{renderIconRef:t,childrenFieldRef:n}=P(Y);u(J,{showIconRef:E(()=>{let n=t.value;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>n?n(e):e.icon);let{rawNode:t}=e;return n?n(t):t.icon})}),hasSubmenuRef:E(()=>{let{value:t}=n;return e.tmNodes.some(e=>{if(e.isGroup)return e.children?.some(({rawNode:e})=>Q(e,t));let{rawNode:n}=e;return Q(n,t)})})});let r=f(null);return u(se,null),u(ce,null),u(W,r),{bodyRef:r}},render(){let{parentKey:e,clsPrefix:t,scrollable:n}=this,r=this.tmNodes.map(r=>{let{rawNode:i}=r;return i.show===!1?null:ve(i)?(w(),S(Ce,{tmNode:r,key:r.key},null,8,[`tmNode`])):_e(i)?(w(),S(Z,{clsPrefix:t,key:r.key},null,8,[`clsPrefix`])):ge(i)?(w(),S(Se,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key},null,8,[`clsPrefix`,`tmNode`,`parentKey`])):(w(),S(be,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:n},null,8,[`clsPrefix`,`tmNode`,`parentKey`,`props`,`scrollable`]))});return w(),A(`div`,{class:d([`${t}-dropdown-menu`,n&&`${t}-dropdown-menu--scrollable`]),ref:`bodyRef`},[n?(w(),S(re,{key:0,contentClass:`${t}-dropdown-menu__content`},{default:()=>r},1032,[`contentClass`])):(w(),A(x,{key:1},[M(()=>r)],64)),this.showArrow?(w(),A(x,{key:2},[M(()=>L({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}))],64)):M(()=>null)],2)}}),we=s(`dropdown-menu`,`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[oe(),s(`dropdown-option`,`
 position: relative;
 `,[h(`a`,`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[h(`&::before`,`
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
 `,[h(`&::before`,`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),c(`disabled`,[o(`pending`,`
 color: var(--n-option-text-color-hover);
 `,[g(`prefix, suffix`,`
 color: var(--n-option-text-color-hover);
 `),h(`&::before`,`background-color: var(--n-option-color-hover);`)]),o(`active`,`
 color: var(--n-option-text-color-active);
 `,[g(`prefix, suffix`,`
 color: var(--n-option-text-color-active);
 `),h(`&::before`,`background-color: var(--n-option-color-active);`)]),o(`child-active`,`
 color: var(--n-option-text-color-child-active);
 `,[g(`prefix, suffix`,`
 color: var(--n-option-text-color-child-active);
 `)])]),o(`disabled`,`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),o(`group`,`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[g(`prefix`,`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[o(`show-icon`,`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),g(`prefix`,`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[o(`show-icon`,`
 width: var(--n-option-icon-prefix-width);
 `),s(`icon`,`
 font-size: var(--n-option-icon-size);
 `)]),g(`label`,`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),g(`suffix`,`
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
 `,[o(`has-submenu`,`
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
 `),h(`>`,[s(`scrollbar`,`
 height: inherit;
 max-height: inherit;
 `)]),c(`scrollable`,`
 padding: var(--n-padding);
 `),o(`scrollable`,[g(`content`,`
 padding: var(--n-padding);
 `)])]),Te={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:`bottom`},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:`label`},keyField:{type:String,default:`key`},childrenField:{type:String,default:`children`},value:[String,Number]},Ee=Object.keys(B),De={...B,...Te,...t.props},Oe=b({name:`Dropdown`,inheritAttrs:!1,props:De,setup(e){let n=f(!1),r=le(O(e,`show`),n),i=E(()=>{let{keyField:t,childrenField:n}=e;return te(e.options,{getKey(e){return e[t]},getDisabled(e){return e.disabled===!0},getIgnored(e){return e.type===`divider`||e.type===`render`},getChildren(e){return e[n]}})}),o=E(()=>i.value.treeNodes),s=f(null),c=f(null),d=f(null),p=E(()=>s.value??c.value??d.value??null),h=E(()=>i.value.getPath(p.value).keyPath),g=E(()=>i.value.getPath(e.value).keyPath),_=l(()=>e.keyboard&&r.value);pe({keydown:{ArrowUp:{prevent:!0,handler:N},ArrowRight:{prevent:!0,handler:M},ArrowDown:{prevent:!0,handler:P},ArrowLeft:{prevent:!0,handler:A},Enter:{prevent:!0,handler:F},Escape:D}},_);let{mergedClsPrefixRef:v,inlineThemeDisabled:y,mergedComponentPropsRef:b}=k(e),x=E(()=>e.size||b?.value?.Dropdown?.size||`medium`),S=t(`Dropdown`,`-dropdown`,we,fe,e,v);u(Y,{labelFieldRef:O(e,`labelField`),childrenFieldRef:O(e,`childrenField`),renderLabelRef:O(e,`renderLabel`),renderIconRef:O(e,`renderIcon`),hoverKeyRef:s,keyboardKeyRef:c,lastToggledSubmenuKeyRef:d,pendingKeyPathRef:h,activeKeyPathRef:g,animatedRef:O(e,`animated`),mergedShowRef:r,nodePropsRef:O(e,`nodeProps`),renderOptionRef:O(e,`renderOption`),menuPropsRef:O(e,`menuProps`),doSelect:C,doUpdateShow:w}),I(r,t=>{!e.animated&&!t&&T()});function C(t,n){let{onSelect:r}=e;r&&a(r,t,n)}function w(t){let{"onUpdate:show":r,onUpdateShow:i}=e;r&&a(r,t),i&&a(i,t),n.value=t}function T(){s.value=null,c.value=null,d.value=null}function D(){w(!1)}function A(){R(`left`)}function M(){R(`right`)}function N(){R(`up`)}function P(){R(`down`)}function F(){let e=L();e?.isLeaf&&r.value&&(C(e.key,e.rawNode),w(!1))}function L(){let{value:e}=i,{value:t}=p;return!e||t===null?null:e.getNode(t)??null}function R(e){let{value:t}=p,{value:{getFirstAvailableNode:n}}=i,r=null;if(t===null){let e=n();e!==null&&(r=e.key)}else{let t=L();if(t){let n;switch(e){case`down`:n=t.getNext();break;case`up`:n=t.getPrev();break;case`right`:n=t.getChild();break;case`left`:n=t.getParent()}n&&(r=n.key)}}r!==null&&(s.value=null,c.value=r)}let z=E(()=>{let{inverted:t}=e,n=x.value,{common:{cubicBezierEaseInOut:r},self:i}=S.value,{padding:a,dividerColor:o,borderRadius:s,optionOpacityDisabled:c,[j(`optionIconSuffixWidth`,n)]:l,[j(`optionSuffixWidth`,n)]:u,[j(`optionIconPrefixWidth`,n)]:d,[j(`optionPrefixWidth`,n)]:f,[j(`fontSize`,n)]:p,[j(`optionHeight`,n)]:m,[j(`optionIconSize`,n)]:h}=i,g={"--n-bezier":r,"--n-font-size":p,"--n-padding":a,"--n-border-radius":s,"--n-option-height":m,"--n-option-prefix-width":f,"--n-option-icon-prefix-width":d,"--n-option-suffix-width":u,"--n-option-icon-suffix-width":l,"--n-option-icon-size":h,"--n-divider-color":o,"--n-option-opacity-disabled":c};return t?(g[`--n-color`]=i.colorInverted,g[`--n-option-color-hover`]=i.optionColorHoverInverted,g[`--n-option-color-active`]=i.optionColorActiveInverted,g[`--n-option-text-color`]=i.optionTextColorInverted,g[`--n-option-text-color-hover`]=i.optionTextColorHoverInverted,g[`--n-option-text-color-active`]=i.optionTextColorActiveInverted,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActiveInverted,g[`--n-prefix-color`]=i.prefixColorInverted,g[`--n-suffix-color`]=i.suffixColorInverted,g[`--n-group-header-text-color`]=i.groupHeaderTextColorInverted):(g[`--n-color`]=i.color,g[`--n-option-color-hover`]=i.optionColorHover,g[`--n-option-color-active`]=i.optionColorActive,g[`--n-option-text-color`]=i.optionTextColor,g[`--n-option-text-color-hover`]=i.optionTextColorHover,g[`--n-option-text-color-active`]=i.optionTextColorActive,g[`--n-option-text-color-child-active`]=i.optionTextColorChildActive,g[`--n-prefix-color`]=i.prefixColor,g[`--n-suffix-color`]=i.suffixColor,g[`--n-group-header-text-color`]=i.groupHeaderTextColor),g}),B=y?m(`dropdown`,E(()=>`${x.value[0]}${e.inverted?`i`:``}`),z,e):void 0;return{mergedClsPrefix:v,mergedTheme:S,mergedSize:x,tmNodes:o,mergedShow:r,handleAfterLeave:()=>{e.animated&&T()},doUpdateShow:w,cssVars:y?void 0:z,themeClass:B?.themeClass,onRender:B?.onRender}},render(){let t=(e,t,r,i,a)=>{let{mergedClsPrefix:o,menuProps:s}=this;this.onRender?.();let c=s?.(void 0,this.tmNodes.map(e=>e.rawNode))||{},l={ref:q(t),class:[e,`${o}-dropdown`,`${o}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:o,tmNodes:this.tmNodes,style:[...r,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:i,onMouseleave:a};return F($,n(this.$attrs,l,c))},{mergedTheme:r}=this,i={show:this.mergedShow,theme:r.peers.Popover,themeOverrides:r.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:t,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return w(),S(V,ie(this.$props,Ee,i),{_:1,trigger:e(()=>this.$slots.default?.())},16)}}),ke=`(max-width: 767px)`;function Ae(){let e=window.matchMedia(ke),t=f(e.matches),n=e=>{t.value=e.matches};return T(()=>e.addEventListener(`change`,n)),r(()=>e.removeEventListener(`change`,n)),y(t)}export{K as a,q as i,Oe as n,he as r,Ae as t};