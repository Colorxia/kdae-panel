import{$t as e,An as t,C as n,Ct as r,Dt as i,E as a,En as o,Gn as s,Gt as c,Hn as l,It as u,Jt as d,Ln as f,Mn as p,Mt as m,Nn as h,Nt as g,O as _,On as v,Ot as y,P as b,Pn as x,Pt as S,Qt as C,Sn as w,Un as T,Ut as E,Vt as D,Wt as O,Xt as k,Zt as A,_ as j,dt as M,en as N,er as P,ft as F,gt as I,in as L,ir as R,j as z,k as B,kn as V,kt as ee,mn as H,on as U,pt as te,qt as W,tn as G,un as K,wn as q,xt as J,yt as Y}from"./client-BNTVmNnN.js";import{t as X}from"./next-frame-once-qdYFoq8G.js";import{i as ne,n as re,r as Z,t as ie}from"./create-CZjQqUSJ.js";import{t as ae}from"./misc-DDs3MKLt.js";import{l as Q}from"./light-Ckkg8noG.js";import{a as oe,c as se,d as ce,i as le,l as ue,o as de,s as fe,t as pe,u as me}from"./Popover-DK5f737A.js";import{a as he,i as ge}from"./text-Dp6d97Hj.js";import{a as _e,f as ve,l as ye,r as be,s as xe,t as Se}from"./light-C7v7fPkm.js";import{t as Ce}from"./use-locale-sy7zopKF.js";import{n as we}from"./Input-T4XGyShH.js";import{t as Te}from"./Tag-Di7LKqKh.js";import{P as $,T as Ee}from"./index-krGuNh2y.js";function De(e){return e&-e}var Oe=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=De(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=De(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}else if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},ke;function Ae(){return typeof document>`u`?!1:(ke===void 0&&(ke=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),ke)}var je;function Me(){return typeof document>`u`?1:(je===void 0&&(je=`chrome`in window?window.devicePixelRatio:1),je)}var Ne=`VVirtualListXScroll`;function Pe({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=P(0),i=P(0),a=H(()=>{let t=e.value;if(t.length===0)return null;let n=new Oe(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n});return f(Ne,{startIndexRef:S(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),endIndexRef:S(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)}),columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:e=>{let t=a.value;return t===null?0:t.sum(e)}}),{listWidthRef:r,scrollLeftRef:i}}var Fe=w({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:a}=o(Ne);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:a,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),Ie=oe(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[oe(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[oe(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Le=w({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let n=ee();Ie.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:de,ssr:n}),x(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&v({key:n}):v({index:t})});let r=!1,i=!1;t(()=>{if(r=!1,!i){i=!0;return}v({top:m.value,left:s.value})}),h(()=>{r=!0,i||=!0});let a=S(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),o=H(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:s,listWidthRef:c}=Pe({columnsRef:R(e,`columns`),renderColRef:R(e,`renderCol`),renderItemWithColsRef:R(e,`renderItemWithCols`)}),l=P(null),u=P(void 0),d=new Map,f=H(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Oe(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=d.get(n);a!==void 0&&i.add(t,a)}),i}),p=P(0),m=P(0),g=S(()=>Math.max(f.value.getBound(m.value-D(e.paddingTop))-1,0)),_=H(()=>{let{value:t}=u;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=g.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),v=(e,t)=>{if(typeof e==`number`){w(e,t,`auto`);return}let{left:n,top:r,index:i,key:a,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)w(n,r,c);else if(i!==void 0)C(i,c,l);else if(a!==void 0){let e=o.value.get(a);e!==void 0&&C(e,c,l)}else s===`bottom`?w(0,2**53-1,c):s===`top`&&w(0,0,c)},y,b=null;function C(t,n,r){let{value:i}=f,a=i.sum(t)+D(e.paddingTop);if(!r)l.value.scrollTo({left:0,top:a,behavior:n});else{y=t,b!==null&&window.clearTimeout(b),b=window.setTimeout(()=>{y=void 0,b=null},16);let{scrollTop:e,offsetHeight:r}=l.value;if(a>e){let o=i.get(t);a+o<=e+r||l.value.scrollTo({left:0,top:a+o-r,behavior:n})}else l.value.scrollTo({left:0,top:a,behavior:n})}}function w(e,t,n){l.value.scrollTo({left:e,top:t,behavior:n})}function T(t,n){if(r||e.ignoreItemResize||F(n.target))return;let{value:i}=f,a=o.value.get(t),s=i.get(a),c=n.borderBoxSize?.[0]?.blockSize??n.contentRect.height;if(c===s)return;c-e.itemSize===0?d.delete(t):d.set(t,c-e.itemSize);let u=c-s;if(u===0)return;i.add(a,u);let m=l.value;if(m!=null){if(y===void 0){let e=i.sum(a);m.scrollTop>e&&m.scrollBy(0,u)}else(a<y||a===y&&c+i.sum(a)>m.scrollTop+m.offsetHeight)&&m.scrollBy(0,u);N()}p.value++}let E=!Ae(),k=!1;function A(t){var n;(n=e.onScroll)==null||n.call(e,t),(!E||!k)&&N()}function j(t){var n;if((n=e.onWheel)==null||n.call(e,t),E){let e=l.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Me(),e.scrollLeft+=t.deltaX/Me(),N(),k=!0,X(()=>{k=!1})}}}function M(t){if(r||F(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===u.value)return}else if(t.contentRect.height===u.value&&t.contentRect.width===c.value)return;u.value=t.contentRect.height,c.value=t.contentRect.width;let{onResize:n}=e;n!==void 0&&n(t)}function N(){let{value:e}=l;e!=null&&(m.value=e.scrollTop,s.value=e.scrollLeft)}function F(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:u,listStyle:{overflow:`auto`},keyToIndex:o,itemsStyle:H(()=>{let{itemResizable:t}=e,n=O(f.value.sum());return p.value,[e.itemsStyle,{boxSizing:`content-box`,width:O(a.value),height:t?``:n,minHeight:t?n:``,paddingTop:O(e.paddingTop),paddingBottom:O(e.paddingBottom)}]}),visibleItemsStyle:H(()=>(p.value,{transform:`translateY(${O(f.value.sum(g.value))})`})),viewportItems:_,listElRef:l,itemsElRef:P(null),scrollTo:v,handleListResize:M,handleListScroll:A,handleListWheel:j,handleItemResize:T}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return q(i,{onResize:this.handleListResize},{default:()=>{var a;return q(`div`,v(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(a=this.$slots).empty?.call(a):q(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[q(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:a}=this;return this.viewportItems.map(o=>{let s=o[t],c=n.get(s),l=r==null?void 0:q(Fe,{index:c,item:o}),u=a==null?void 0:q(Fe,{index:c,item:o}),d=this.$slots.default({item:o,renderedCols:l,renderedItemWithCols:u,index:c})[0];return e?q(i,{key:s,onResize:e=>this.handleItemResize(s,e)},{default:()=>d}):(d.key=s,d)})}})])])}})}});function Re(e,t){t&&(x(()=>{let{value:n}=e;n&&y.registerHandler(n,t)}),l(e,(e,t)=>{t&&y.unregisterHandler(t)},{deep:!1}),p(()=>{let{value:t}=e;t&&y.unregisterHandler(t)}))}function ze(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function Be(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var Ve=w({name:`Checkmark`,render(){return q(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},q(`g`,{fill:`none`},q(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})))}}),He=w({name:`Empty`,render(){return q(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},q(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),q(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`}))}}),Ue=w({props:{onFocus:Function,onBlur:Function},setup(e){return()=>q(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),We=d(`empty`,`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[k(`icon`,`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[W(`+`,[k(`description`,`
 margin-top: 8px;
 `)])]),k(`description`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),k(`extra`,`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Ge=w({name:`Empty`,props:Object.assign(Object.assign({},z.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function}),slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i}=te(t),a=z(`Empty`,`-empty`,We,ye,t,n),{localeRef:o}=Ce(`Empty`),s=H(()=>t.description??i?.value?.Empty?.description),c=H(()=>i?.value?.Empty?.renderIcon||(()=>q(He,null))),l=H(()=>{let{size:n}=t,{common:{cubicBezierEaseInOut:r},self:{[e(`iconSize`,n)]:i,[e(`fontSize`,n)]:o,textColor:s,iconColor:c,extraTextColor:l}}=a.value;return{"--n-icon-size":i,"--n-font-size":o,"--n-bezier":r,"--n-text-color":s,"--n-icon-color":c,"--n-extra-text-color":l}}),u=r?F(`empty`,H(()=>{let e=``,{size:n}=t;return e+=n[0],e}),l,t):void 0;return{mergedClsPrefix:n,mergedRenderIcon:c,localizedDescription:H(()=>s.value||o.value.description),cssVars:r?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,onRender:n}=this;return n?.(),q(`div`,{class:[`${t}-empty`,this.themeClass],style:this.cssVars},this.showIcon?q(`div`,{class:`${t}-empty__icon`},e.icon?e.icon():q(B,{clsPrefix:t},{default:this.mergedRenderIcon})):null,this.showDescription?q(`div`,{class:`${t}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?q(`div`,{class:`${t}-empty__extra`},e.extra()):null)}}),Ke=w({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=o(ce);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):$(i[this.labelField],i,!1),s=q(`div`,Object.assign({},a,{class:[`${e}-base-select-group-header`,a?.class]}),o);return i.render?i.render({node:s,option:i}):n?n({node:s,option:i,selected:!1}):s}});function qe(e,t){return q(L,{name:`fade-in-scale-up-transition`},{default:()=>e?q(B,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>q(Ve)}):null})}var Je=w({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:s,labelFieldRef:c,valueFieldRef:l,showCheckmarkRef:u,nodePropsRef:d,handleOptionClick:f,handleOptionMouseEnter:p}=o(ce),m=S(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function _(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:S(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:u,nodeProps:d,isPending:m,isSelected:S(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[l.value];if(a){let{value:e}=i;return e.has(o)}else return n===o}),labelField:c,renderLabel:a,renderOption:s,handleMouseMove:_,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:o,renderOption:s,renderLabel:c,handleClick:l,handleMouseEnter:u,handleMouseMove:d}=this,f=qe(n,e),p=c?[c(t,n),a&&f]:[$(t[this.labelField],t,n),a&&f],m=o?.(t),h=q(`div`,Object.assign({},m,{class:[`${e}-base-select-option`,t.class,m?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[m?.style||``,t.style||``],onClick:Be([l,m?.onClick]),onMouseenter:Be([u,m?.onMouseenter]),onMousemove:Be([d,m?.onMousemove])}),q(`div`,{class:`${e}-base-select-option__content`},p));return t.render?t.render({node:h,option:t,selected:n}):s?s({node:h,option:t,selected:n}):h}}),Ye=d(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[d(`scrollbar`,`
 max-height: var(--n-height);
 `),d(`virtual-list`,`
 max-height: var(--n-height);
 `),d(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[k(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),d(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),d(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),k(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),k(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),k(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),k(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),d(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),d(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[A(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),W(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),W(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),A(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),A(`pending`,[W(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),A(`selected`,`
 color: var(--n-option-text-color-active);
 `,[W(`&::before`,`
 background-color: var(--n-option-color-active);
 `),A(`pending`,[W(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),A(`disabled`,`
 cursor: not-allowed;
 `,[C(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),A(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),k(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Ee({enterScale:`0.5`})])])]),Xe=w({name:`InternalSelectMenu`,props:Object.assign(Object.assign({},z.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function}),setup(t){let{mergedClsPrefixRef:n,mergedRtlRef:r,mergedComponentPropsRef:i}=te(t),a=b(`InternalSelectMenu`,r,n),o=z(`InternalSelectMenu`,`-internal-select-menu`,Ye,xe,t,R(t,`clsPrefix`)),s=P(null),c=P(null),u=P(null),d=H(()=>t.treeMate.getFlattenedNodes()),m=H(()=>re(d.value)),h=P(null);function g(){let{treeMate:e}=t,n=null,{value:r}=t;r===null?n=e.getFirstAvailableNode():(n=t.multiple?e.getNode((r||[])[(r||[]).length-1]):e.getNode(r),(!n||n.disabled)&&(n=e.getFirstAvailableNode())),G(n||null)}function _(){let{value:e}=h;e&&!t.treeMate.getNode(e.key)&&(h.value=null)}let v;l(()=>t.show,e=>{e?v=l(()=>t.treeMate,()=>{t.resetMenuOnOptionsChange?(t.autoPending?g():_(),V(K)):_()},{immediate:!0}):v?.()},{immediate:!0}),p(()=>{v?.()});let y=H(()=>D(o.value.self[e(`optionHeight`,t.size)])),S=H(()=>E(o.value.self[e(`padding`,t.size)])),C=H(()=>t.multiple&&Array.isArray(t.value)?new Set(t.value):new Set),w=H(()=>{let e=d.value;return e&&e.length===0}),T=H(()=>i?.value?.Select?.renderEmpty);function O(e){let{onToggle:n}=t;n&&n(e)}function k(e){let{onScroll:n}=t;n&&n(e)}function A(e){var t;(t=u.value)==null||t.sync(),k(e)}function j(){var e;(e=u.value)==null||e.sync()}function M(){let{value:e}=h;return e||null}function N(e,t){t.disabled||G(t,!1)}function I(e,t){t.disabled||O(t)}function L(e){var n;ne(e,`action`)||(n=t.onKeyup)==null||n.call(t,e)}function B(e){var n;ne(e,`action`)||(n=t.onKeydown)==null||n.call(t,e)}function ee(e){var n;(n=t.onMousedown)==null||n.call(t,e),!t.focusable&&e.preventDefault()}function U(){let{value:e}=h;e&&G(e.getNext({loop:!0}),!0)}function W(){let{value:e}=h;e&&G(e.getPrev({loop:!0}),!0)}function G(e,t=!1){h.value=e,t&&K()}function K(){var e,n;let r=h.value;if(!r)return;let i=m.value(r.key);i!==null&&(t.virtualScroll?(e=c.value)==null||e.scrollTo({index:i}):(n=u.value)==null||n.scrollTo({index:i,elSize:y.value}))}function q(e){var n;s.value?.contains(e.target)&&((n=t.onFocus)==null||n.call(t,e))}function J(e){var n;s.value?.contains(e.relatedTarget)||(n=t.onBlur)==null||n.call(t,e)}f(ce,{handleOptionMouseEnter:N,handleOptionClick:I,valueSetRef:C,pendingTmNodeRef:h,nodePropsRef:R(t,`nodeProps`),showCheckmarkRef:R(t,`showCheckmark`),multipleRef:R(t,`multiple`),valueRef:R(t,`value`),renderLabelRef:R(t,`renderLabel`),renderOptionRef:R(t,`renderOption`),labelFieldRef:R(t,`labelField`),valueFieldRef:R(t,`valueField`)}),f(me,s),x(()=>{let{value:e}=u;e&&e.sync()});let Y=H(()=>{let{size:n}=t,{common:{cubicBezierEaseInOut:r},self:{height:i,borderRadius:a,color:s,groupHeaderTextColor:c,actionDividerColor:l,optionTextColorPressed:u,optionTextColor:d,optionTextColorDisabled:f,optionTextColorActive:p,optionOpacityDisabled:m,optionCheckColor:h,actionTextColor:g,optionColorPending:_,optionColorActive:v,loadingColor:y,loadingSize:b,optionColorActivePending:x,[e(`optionFontSize`,n)]:S,[e(`optionHeight`,n)]:C,[e(`optionPadding`,n)]:w}}=o.value;return{"--n-height":i,"--n-action-divider-color":l,"--n-action-text-color":g,"--n-bezier":r,"--n-border-radius":a,"--n-color":s,"--n-option-font-size":S,"--n-group-header-text-color":c,"--n-option-check-color":h,"--n-option-color-pending":_,"--n-option-color-active":v,"--n-option-color-active-pending":x,"--n-option-height":C,"--n-option-opacity-disabled":m,"--n-option-text-color":d,"--n-option-text-color-active":p,"--n-option-text-color-disabled":f,"--n-option-text-color-pressed":u,"--n-option-padding":w,"--n-option-padding-left":E(w,`left`),"--n-option-padding-right":E(w,`right`),"--n-loading-color":y,"--n-loading-size":b}}),{inlineThemeDisabled:X}=t,Z=X?F(`internal-select-menu`,H(()=>t.size[0]),Y,t):void 0,ie={selfRef:s,next:U,prev:W,getPendingTmNode:M};return Re(s,t.onResize),Object.assign({mergedTheme:o,mergedClsPrefix:n,rtlEnabled:a,virtualListRef:c,scrollbarRef:u,itemSize:y,padding:S,flattenedNodes:d,empty:w,mergedRenderEmpty:T,virtualListContainer(){let{value:e}=c;return e?.listElRef},virtualListContent(){let{value:e}=c;return e?.itemsElRef},doScroll:k,handleFocusin:q,handleFocusout:J,handleKeyUp:L,handleKeyDown:B,handleMouseDown:ee,handleVirtualListResize:j,handleVirtualListScroll:A,cssVars:X?void 0:Y,themeClass:Z?.themeClass,onRender:Z?.onRender},ie)},render(){let{$slots:e,virtualScroll:t,clsPrefix:r,mergedTheme:i,themeClass:a,onRender:o}=this;return o?.(),q(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:[`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,a,this.multiple&&`${r}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},J(e.header,e=>e&&q(`div`,{class:`${r}-base-select-menu__header`,"data-header":!0,key:`header`},e)),this.loading?q(`div`,{class:`${r}-base-select-menu__loading`},q(n,{clsPrefix:r,strokeWidth:20})):this.empty?q(`div`,{class:`${r}-base-select-menu__empty`,"data-empty":!0},Y(e.empty,()=>[this.mergedRenderEmpty?.call(this)||q(Ge,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size})])):q(j,Object.assign({ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?q(Le,{ref:`virtualListRef`,class:`${r}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?q(Ke,{key:e.key,clsPrefix:r,tmNode:e}):e.ignored?null:q(Je,{clsPrefix:r,key:e.key,tmNode:e})}):q(`div`,{class:`${r}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(e=>e.isGroup?q(Ke,{key:e.key,clsPrefix:r,tmNode:e}):q(Je,{clsPrefix:r,key:e.key,tmNode:e})))}),J(e.action,e=>e&&[q(`div`,{class:`${r}-base-select-menu__action`,"data-action":!0,key:`action`},e),q(Ue,{onFocus:this.onTabOut,key:`focus-detector`})]))}}),Ze=W([d(`base-selection`,`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[d(`base-loading`,`
 color: var(--n-loading-color);
 `),d(`base-selection-tags`,`min-height: var(--n-height);`),k(`border, state-border`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),k(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),d(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[k(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),d(`base-selection-overlay`,`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[k(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),d(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[k(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),d(`base-selection-tags`,`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),d(`base-selection-label`,`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[d(`base-selection-input`,`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[k(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),k(`render-label`,`
 color: var(--n-text-color);
 `)]),C(`disabled`,[W(`&:hover`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),A(`focus`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),A(`active`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),d(`base-selection-label`,`background-color: var(--n-color-active);`),d(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),A(`disabled`,`cursor: not-allowed;`,[k(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),d(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[d(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),k(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),d(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),d(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),d(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[k(`input`,`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),k(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>A(`${e}-status`,[k(`state-border`,`border: var(--n-border-${e});`),C(`disabled`,[W(`&:hover`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),A(`active`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),d(`base-selection-label`,`background-color: var(--n-color-active-${e});`),d(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),A(`focus`,[k(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),d(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),d(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[W(`&:last-child`,`padding-right: 0;`),d(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[k(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Qe=w({name:`InternalSelection`,props:Object.assign(Object.assign({},z.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(t){let{mergedClsPrefixRef:n,mergedRtlRef:r}=te(t),i=b(`InternalSelection`,r,n),a=P(null),o=P(null),s=P(null),c=P(null),u=P(null),d=P(null),f=P(null),p=P(null),m=P(null),h=P(null),g=P(!1),_=P(!1),v=P(!1),y=z(`InternalSelection`,`-internal-selection`,Ze,_e,t,R(t,`clsPrefix`)),S=H(()=>t.clearable&&!t.disabled&&(v.value||t.active)),C=H(()=>t.selectedOption?t.renderTag?t.renderTag({option:t.selectedOption,handleClose:()=>{}}):t.renderLabel?t.renderLabel(t.selectedOption,!0):$(t.selectedOption[t.labelField],t.selectedOption,!0):t.placeholder),w=H(()=>{let e=t.selectedOption;if(e)return e[t.labelField]}),D=H(()=>t.multiple?!!(Array.isArray(t.selectedOptions)&&t.selectedOptions.length):t.selectedOption!==null);function O(){var e;let{value:n}=a;if(n){let{value:r}=o;r&&(r.style.width=`${n.offsetWidth}px`,t.maxTagCount!==`responsive`&&((e=m.value)==null||e.sync({showAllItemsBeforeCalculate:!1})))}}function k(){let{value:e}=h;e&&(e.style.display=`none`)}function A(){let{value:e}=h;e&&(e.style.display=`inline-block`)}l(R(t,`active`),e=>{e||k()}),l(R(t,`pattern`),()=>{t.multiple&&V(O)});function j(e){let{onFocus:n}=t;n&&n(e)}function M(e){let{onBlur:n}=t;n&&n(e)}function N(e){let{onDeleteOption:n}=t;n&&n(e)}function I(e){let{onClear:n}=t;n&&n(e)}function L(e){let{onPatternInput:n}=t;n&&n(e)}function B(e){(!e.relatedTarget||!s.value?.contains(e.relatedTarget))&&j(e)}function ee(e){s.value?.contains(e.relatedTarget)||M(e)}function U(e){I(e)}function W(){v.value=!0}function G(){v.value=!1}function K(e){!t.active||!t.filterable||e.target!==o.value&&e.preventDefault()}function q(e){N(e)}let J=P(!1);function Y(e){if(e.key===`Backspace`&&!J.value&&!t.pattern.length){let{selectedOptions:e}=t;e?.length&&q(e[e.length-1])}}let X=null;function ne(e){let{value:n}=a;n&&(n.textContent=e.target.value,O()),t.ignoreComposition&&J.value?X=e:L(e)}function re(){J.value=!0}function Z(){J.value=!1,t.ignoreComposition&&L(X),X=null}function ie(e){var n;_.value=!0,(n=t.onPatternFocus)==null||n.call(t,e)}function ae(e){var n;_.value=!1,(n=t.onPatternBlur)==null||n.call(t,e)}function Q(){var e,n;if(t.filterable)_.value=!1,(e=d.value)==null||e.blur(),(n=o.value)==null||n.blur();else if(t.multiple){let{value:e}=c;e?.blur()}else{let{value:e}=u;e?.blur()}}function oe(){var e,n,r;t.filterable?(_.value=!1,(e=d.value)==null||e.focus()):t.multiple?(n=c.value)==null||n.focus():(r=u.value)==null||r.focus()}function se(){let{value:e}=o;e&&(A(),e.focus())}function ce(){let{value:e}=o;e&&e.blur()}function le(e){let{value:t}=f;t&&t.setTextContent(`+${e}`)}function ue(){let{value:e}=p;return e}function de(){return o.value}let fe=null;function pe(){fe!==null&&window.clearTimeout(fe)}function me(){t.active||(pe(),fe=window.setTimeout(()=>{D.value&&(g.value=!0)},100))}function he(){pe()}function ge(e){e||(pe(),g.value=!1)}l(D,e=>{e||(g.value=!1)}),x(()=>{T(()=>{let e=d.value;e&&(t.disabled?e.removeAttribute(`tabindex`):e.tabIndex=_.value?-1:0)})}),Re(s,t.onResize);let{inlineThemeDisabled:ve}=t,ye=H(()=>{let{size:n}=t,{common:{cubicBezierEaseInOut:r},self:{fontWeight:i,borderRadius:a,color:o,placeholderColor:s,textColor:c,paddingSingle:l,paddingMultiple:u,caretColor:d,colorDisabled:f,textColorDisabled:p,placeholderColorDisabled:m,colorActive:h,boxShadowFocus:g,boxShadowActive:_,boxShadowHover:v,border:b,borderFocus:x,borderHover:S,borderActive:C,arrowColor:w,arrowColorDisabled:T,loadingColor:D,colorActiveWarning:O,boxShadowFocusWarning:k,boxShadowActiveWarning:A,boxShadowHoverWarning:j,borderWarning:M,borderFocusWarning:N,borderHoverWarning:P,borderActiveWarning:F,colorActiveError:I,boxShadowFocusError:L,boxShadowActiveError:R,boxShadowHoverError:z,borderError:B,borderFocusError:V,borderHoverError:ee,borderActiveError:H,clearColor:U,clearColorHover:te,clearColorPressed:W,clearSize:G,arrowSize:K,[e(`height`,n)]:q,[e(`fontSize`,n)]:J}}=y.value,Y=E(l),X=E(u);return{"--n-bezier":r,"--n-border":b,"--n-border-active":C,"--n-border-focus":x,"--n-border-hover":S,"--n-border-radius":a,"--n-box-shadow-active":_,"--n-box-shadow-focus":g,"--n-box-shadow-hover":v,"--n-caret-color":d,"--n-color":o,"--n-color-active":h,"--n-color-disabled":f,"--n-font-size":J,"--n-height":q,"--n-padding-single-top":Y.top,"--n-padding-multiple-top":X.top,"--n-padding-single-right":Y.right,"--n-padding-multiple-right":X.right,"--n-padding-single-left":Y.left,"--n-padding-multiple-left":X.left,"--n-padding-single-bottom":Y.bottom,"--n-padding-multiple-bottom":X.bottom,"--n-placeholder-color":s,"--n-placeholder-color-disabled":m,"--n-text-color":c,"--n-text-color-disabled":p,"--n-arrow-color":w,"--n-arrow-color-disabled":T,"--n-loading-color":D,"--n-color-active-warning":O,"--n-box-shadow-focus-warning":k,"--n-box-shadow-active-warning":A,"--n-box-shadow-hover-warning":j,"--n-border-warning":M,"--n-border-focus-warning":N,"--n-border-hover-warning":P,"--n-border-active-warning":F,"--n-color-active-error":I,"--n-box-shadow-focus-error":L,"--n-box-shadow-active-error":R,"--n-box-shadow-hover-error":z,"--n-border-error":B,"--n-border-focus-error":V,"--n-border-hover-error":ee,"--n-border-active-error":H,"--n-clear-size":G,"--n-clear-color":U,"--n-clear-color-hover":te,"--n-clear-color-pressed":W,"--n-arrow-size":K,"--n-font-weight":i}}),be=ve?F(`internal-selection`,H(()=>t.size[0]),ye,t):void 0;return{mergedTheme:y,mergedClearable:S,mergedClsPrefix:n,rtlEnabled:i,patternInputFocused:_,filterablePlaceholder:C,label:w,selected:D,showTagsPanel:g,isComposing:J,counterRef:f,counterWrapperRef:p,patternInputMirrorRef:a,patternInputRef:o,selfRef:s,multipleElRef:c,singleElRef:u,patternInputWrapperRef:d,overflowRef:m,inputTagElRef:h,handleMouseDown:K,handleFocusin:B,handleClear:U,handleMouseEnter:W,handleMouseLeave:G,handleDeleteOption:q,handlePatternKeyDown:Y,handlePatternInputInput:ne,handlePatternInputBlur:ae,handlePatternInputFocus:ie,handleMouseEnterCounter:me,handleMouseLeaveCounter:he,handleFocusout:ee,handleCompositionEnd:Z,handleCompositionStart:re,onPopoverUpdateShow:ge,focus:oe,focusInput:se,blur:Q,blurInput:ce,updateCounter:le,getCounter:ue,getTail:de,renderLabel:t.renderLabel,cssVars:ve?void 0:ye,themeClass:be?.themeClass,onRender:be?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:r,filterable:i,maxTagCount:a,bordered:o,clsPrefix:s,ellipsisTagPopoverProps:c,onRender:l,renderTag:u,renderLabel:d}=this;l?.();let f=a===`responsive`,p=typeof a==`number`,m=f||p,h=q(I,null,{default:()=>q(we,{clsPrefix:s,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var e;return(e=this.$slots).arrow?.call(e)}})}),g;if(t){let{labelField:e}=this,t=t=>q(`div`,{class:`${s}-base-selection-tag-wrapper`,key:t.value},u?u({option:t,handleClose:()=>{this.handleDeleteOption(t)}}):q(Te,{size:n,closable:!t.disabled,disabled:r,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>d?d(t,!0):$(t[e],t,!0)})),o=()=>(p?this.selectedOptions.slice(0,a):this.selectedOptions).map(t),l=i?q(`div`,{class:`${s}-base-selection-input-tag`,ref:`inputTagElRef`,key:`__input-tag__`},q(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${s}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),q(`span`,{ref:`patternInputMirrorRef`,class:`${s}-base-selection-input-tag__mirror`},this.pattern)):null,_=f?()=>q(`div`,{class:`${s}-base-selection-tag-wrapper`,ref:`counterWrapperRef`},q(Te,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r})):void 0,v;if(p){let e=this.selectedOptions.length-a;e>0&&(v=q(`div`,{class:`${s}-base-selection-tag-wrapper`,key:`__counter__`},q(Te,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${e}`})))}let y=f?i?q(Z,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:_,tail:()=>l}):q(Z,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:_}):p&&v?o().concat(v):o(),b=m?()=>q(`div`,{class:`${s}-base-selection-popover`},f?o():this.selectedOptions.map(t)):void 0,x=m?Object.assign({show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},c):null,S=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?q(`div`,{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`},q(`div`,{class:`${s}-base-selection-placeholder__inner`},this.placeholder)):null,C=i?q(`div`,{ref:`patternInputWrapperRef`,class:`${s}-base-selection-tags`},y,f?null:l,h):q(`div`,{ref:`multipleElRef`,class:`${s}-base-selection-tags`,tabindex:r?void 0:0},y,h);g=q(K,null,m?q(pe,Object.assign({},x,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>C,default:b}):C,S)}else if(i){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;g=q(`div`,{ref:`patternInputWrapperRef`,class:`${s}-base-selection-label`,title:this.patternInputFocused?void 0:ze(this.label)},q(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,class:`${s}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),n?q(`div`,{class:`${s}-base-selection-label__render-label ${s}-base-selection-overlay`,key:`input`},q(`div`,{class:`${s}-base-selection-overlay__wrapper`},u?u({option:this.selectedOption,handleClose:()=>{}}):d?d(this.selectedOption,!0):$(this.label,this.selectedOption,!0))):null,t?q(`div`,{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`,key:`placeholder`},q(`div`,{class:`${s}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,h)}else g=q(`div`,{ref:`singleElRef`,class:`${s}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label===void 0?q(`div`,{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`,key:`placeholder`},q(`div`,{class:`${s}-base-selection-placeholder__inner`},this.placeholder)):q(`div`,{class:`${s}-base-selection-input`,title:ze(this.label),key:`input`},q(`div`,{class:`${s}-base-selection-input__content`},u?u({option:this.selectedOption,handleClose:()=>{}}):d?d(this.selectedOption,!0):$(this.label,this.selectedOption,!0))),h);return q(`div`,{ref:`selfRef`,class:[`${s}-base-selection`,this.rtlEnabled&&`${s}-base-selection--rtl`,this.themeClass,e&&`${s}-base-selection--${e}-status`,{[`${s}-base-selection--active`]:this.active,[`${s}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${s}-base-selection--disabled`]:this.disabled,[`${s}-base-selection--multiple`]:this.multiple,[`${s}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},g,o?q(`div`,{class:`${s}-base-selection__border`}):null,o?q(`div`,{class:`${s}-base-selection__state-border`}):null)}});function $e(e){return e.type===`group`}function et(e){return e.type===`ignored`}function tt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function nt(e,t){return{getIsGroup:$e,getIgnored:et,getKey(t){return $e(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function rt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if($e(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(et(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function it(e,t,n){let r=new Map;return e.forEach(e=>{$e(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var at=m(`n-checkbox-group`),ot=w({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:t}=te(e),n=M(e),{mergedSizeRef:i,mergedDisabledRef:a}=n,o=P(e.defaultValue),s=he(H(()=>e.value),o),c=H(()=>s.value?.length||0),l=H(()=>Array.isArray(s.value)?new Set(s.value):new Set);function u(t,i){let{nTriggerFormInput:a,nTriggerFormChange:c}=n,{onChange:l,"onUpdate:value":u,onUpdateValue:d}=e;if(Array.isArray(s.value)){let e=Array.from(s.value),n=e.findIndex(e=>e===i);t?~n||(e.push(i),d&&r(d,e,{actionType:`check`,value:i}),u&&r(u,e,{actionType:`check`,value:i}),a(),c(),o.value=e,l&&r(l,e)):~n&&(e.splice(n,1),d&&r(d,e,{actionType:`uncheck`,value:i}),u&&r(u,e,{actionType:`uncheck`,value:i}),l&&r(l,e),o.value=e,a(),c())}else t?(d&&r(d,[i],{actionType:`check`,value:i}),u&&r(u,[i],{actionType:`check`,value:i}),l&&r(l,[i]),o.value=[i],a(),c()):(d&&r(d,[],{actionType:`uncheck`,value:i}),u&&r(u,[],{actionType:`uncheck`,value:i}),l&&r(l,[]),o.value=[],a(),c())}return f(at,{checkedCountRef:c,maxRef:R(e,`max`),minRef:R(e,`min`),valueSetRef:l,disabledRef:a,mergedSizeRef:i,toggleCheckbox:u}),{mergedClsPrefix:t}},render(){return q(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),st=()=>q(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},q(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),ct=()=>q(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},q(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),lt=W([d(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[A(`show-label`,`line-height: var(--n-label-line-height);`),W(`&:hover`,[d(`checkbox-box`,[k(`border`,`border: var(--n-border-checked);`)])]),W(`&:focus:not(:active)`,[d(`checkbox-box`,[k(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),A(`inside-table`,[d(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),A(`checked`,[d(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[d(`checkbox-icon`,[W(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),A(`indeterminate`,[d(`checkbox-box`,[d(`checkbox-icon`,[W(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),W(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),A(`checked, indeterminate`,[W(`&:focus:not(:active)`,[d(`checkbox-box`,[k(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),d(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[k(`border`,{border:`var(--n-border-checked)`})])]),A(`disabled`,{cursor:`not-allowed`},[A(`checked`,[d(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[k(`border`,{border:`var(--n-border-disabled-checked)`}),d(`checkbox-icon`,[W(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),d(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[k(`border`,`
 border: var(--n-border-disabled);
 `),d(`checkbox-icon`,[W(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),k(`label`,`
 color: var(--n-text-color-disabled);
 `)]),d(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),d(`checkbox-box`,`
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `,[k(`border`,`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `),d(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[W(`.check-icon, .line-icon`,`
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `),a({left:`1px`,top:`1px`})])]),k(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[W(`&:empty`,{display:`none`})])]),N(d(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),G(d(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),ut=w({name:`Checkbox`,props:Object.assign(Object.assign({},z.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),setup(t){let n=o(at,null),i=P(null),{mergedClsPrefixRef:a,inlineThemeDisabled:s,mergedRtlRef:c,mergedComponentPropsRef:l}=te(t),u=P(t.defaultChecked),d=he(R(t,`checked`),u),f=S(()=>{if(n){let e=n.valueSetRef.value;return e&&t.value!==void 0?e.has(t.value):!1}else return d.value===t.checkedValue}),p=M(t,{mergedSize(e){let{size:r}=t;if(r!==void 0)return r;if(n){let{value:e}=n.mergedSizeRef;if(e!==void 0)return e}if(e){let{mergedSize:t}=e;if(t!==void 0)return t.value}return l?.value?.Checkbox?.size||`medium`},mergedDisabled(e){let{disabled:r}=t;if(r!==void 0)return r;if(n){if(n.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=n;if(e!==void 0&&t.value>=e&&!f.value)return!0;let{minRef:{value:r}}=n;if(r!==void 0&&t.value<=r&&f.value)return!0}return e?e.disabled.value:!1}}),{mergedDisabledRef:m,mergedSizeRef:h}=p,g=z(`Checkbox`,`-checkbox`,lt,be,t,a);function _(e){if(n&&t.value!==void 0)n.toggleCheckbox(!f.value,t.value);else{let{onChange:n,"onUpdate:checked":i,onUpdateChecked:a}=t,{nTriggerFormInput:o,nTriggerFormChange:s}=p,c=f.value?t.uncheckedValue:t.checkedValue;i&&r(i,c,e),a&&r(a,c,e),n&&r(n,c,e),o(),s(),u.value=c}}function v(e){m.value||_(e)}function y(e){if(!m.value)switch(e.key){case` `:case`Enter`:_(e)}}function x(e){switch(e.key){case` `:e.preventDefault()}}let C={focus:()=>{var e;(e=i.value)==null||e.focus()},blur:()=>{var e;(e=i.value)==null||e.blur()}},w=b(`Checkbox`,c,a),T=H(()=>{let{value:t}=h,{common:{cubicBezierEaseInOut:n},self:{borderRadius:r,color:i,colorChecked:a,colorDisabled:o,colorTableHeader:s,colorTableHeaderModal:c,colorTableHeaderPopover:l,checkMarkColor:u,checkMarkColorDisabled:d,border:f,borderFocus:p,borderDisabled:m,borderChecked:_,boxShadowFocus:v,textColor:y,textColorDisabled:b,checkMarkColorDisabledChecked:x,colorDisabledChecked:S,borderDisabledChecked:C,labelPadding:w,labelLineHeight:T,labelFontWeight:E,[e(`fontSize`,t)]:D,[e(`size`,t)]:O}}=g.value;return{"--n-label-line-height":T,"--n-label-font-weight":E,"--n-size":O,"--n-bezier":n,"--n-border-radius":r,"--n-border":f,"--n-border-checked":_,"--n-border-focus":p,"--n-border-disabled":m,"--n-border-disabled-checked":C,"--n-box-shadow-focus":v,"--n-color":i,"--n-color-checked":a,"--n-color-table":s,"--n-color-table-modal":c,"--n-color-table-popover":l,"--n-color-disabled":o,"--n-color-disabled-checked":S,"--n-text-color":y,"--n-text-color-disabled":b,"--n-check-mark-color":u,"--n-check-mark-color-disabled":d,"--n-check-mark-color-disabled-checked":x,"--n-font-size":D,"--n-label-padding":w}}),E=s?F(`checkbox`,H(()=>h.value[0]),T,t):void 0;return Object.assign(p,C,{rtlEnabled:w,selfRef:i,mergedClsPrefix:a,mergedDisabled:m,renderedChecked:f,mergedTheme:g,labelId:ae(),handleClick:v,handleKeyUp:y,handleKeyDown:x,cssVars:s?void 0:T,themeClass:E?.themeClass,onRender:E?.onRender})},render(){var e;let{$slots:t,renderedChecked:n,mergedDisabled:r,indeterminate:i,privateInsideTable:a,cssVars:o,labelId:s,label:c,mergedClsPrefix:l,focusable:d,handleKeyUp:f,handleKeyDown:p,handleClick:m}=this;(e=this.onRender)==null||e.call(this);let h=J(t.default,e=>c||e?q(`span`,{class:`${l}-checkbox__label`,id:s},c||e):null);return q(`div`,{ref:`selfRef`,class:[`${l}-checkbox`,this.themeClass,this.rtlEnabled&&`${l}-checkbox--rtl`,n&&`${l}-checkbox--checked`,r&&`${l}-checkbox--disabled`,i&&`${l}-checkbox--indeterminate`,a&&`${l}-checkbox--inside-table`,h&&`${l}-checkbox--show-label`],tabindex:r||!d?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:n,"aria-labelledby":s,style:o,onKeyup:f,onKeydown:p,onClick:m,onMousedown:()=>{u(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},q(`div`,{class:`${l}-checkbox-box-wrapper`},`\xA0`,q(`div`,{class:`${l}-checkbox-box`},q(_,null,{default:()=>this.indeterminate?q(`div`,{key:`indeterminate`,class:`${l}-checkbox-icon`},ct()):q(`div`,{key:`check`,class:`${l}-checkbox-icon`},st())}),q(`div`,{class:`${l}-checkbox-box__border`}))),h)}}),dt=W([d(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),d(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Ee({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),ft=w({name:`Select`,props:Object.assign(Object.assign({},z.props),{to:ue.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:i,inlineThemeDisabled:a,mergedComponentPropsRef:o}=te(e),s=z(`Select`,`-select`,dt,Se,e,t),u=P(e.defaultValue),d=he(R(e,`value`),u),f=P(!1),p=P(``),m=ge(e,[`items`,`options`]),h=P([]),_=P([]),v=H(()=>_.value.concat(h.value).concat(m.value)),y=H(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return tt(e,i);let a=t[r];return typeof a==`string`?tt(e,a):typeof a==`number`&&tt(e,String(a))}}),b=H(()=>{if(e.remote)return m.value;{let{value:t}=v,{value:n}=p;return!n.length||!e.filterable?t:rt(t,y.value,n,e.childrenField)}}),x=H(()=>{let{valueField:t,childrenField:n}=e,r=nt(t,n);return ie(b.value,r)}),S=H(()=>it(v.value,e.valueField,e.childrenField)),C=P(!1),w=he(R(e,`show`),C),T=P(null),E=P(null),D=P(null),{localeRef:O}=Ce(`Select`),k=H(()=>e.placeholder??O.value.placeholder),A=[],j=P(new Map),N=H(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function I(t){let n=e.remote,{value:r}=j,{value:i}=S,{value:a}=N,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let L=H(()=>{if(e.multiple){let{value:e}=d;return Array.isArray(e)?I(e):[]}return null}),B=H(()=>{let{value:t}=d;return!e.multiple&&!Array.isArray(t)?t===null?null:I([t])[0]||null:null}),V=M(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:o?.value?.Select?.size||`medium`}}),{mergedSizeRef:ee,mergedDisabledRef:U,mergedStatusRef:W}=V;function G(t,n){let{onChange:i,"onUpdate:value":a,onUpdateValue:o}=e,{nTriggerFormChange:s,nTriggerFormInput:c}=V;i&&r(i,t,n),o&&r(o,t,n),a&&r(a,t,n),u.value=t,s(),c()}function K(t){let{onBlur:n}=e,{nTriggerFormBlur:i}=V;n&&r(n,t),i()}function q(){let{onClear:t}=e;t&&r(t)}function J(t){let{onFocus:n,showOnFocus:i}=e,{nTriggerFormFocus:a}=V;n&&r(n,t),a(),i&&ae()}function Y(t){let{onSearch:n}=e;n&&r(n,t)}function X(t){let{onScroll:n}=e;n&&r(n,t)}function re(){var t;let{remote:n,multiple:r}=e;if(n){let{value:n}=j;if(r){let{valueField:r}=e;(t=L.value)==null||t.forEach(e=>{n.set(e[r],e)})}else{let t=B.value;t&&n.set(t[e.valueField],t)}}}function Z(t){let{onUpdateShow:n,"onUpdate:show":i}=e;n&&r(n,t),i&&r(i,t),C.value=t}function ae(){U.value||(Z(!0),C.value=!0,e.filterable&&Me())}function Q(){Z(!1)}function oe(){p.value=``,_.value=A}let se=P(!1);function ce(){e.filterable&&(se.value=!0)}function le(){e.filterable&&(se.value=!1,w.value||oe())}function de(){U.value||(w.value?e.filterable?Me():Q():ae())}function fe(e){(D.value?.selfRef)?.contains(e.relatedTarget)||(f.value=!1,K(e),Q())}function pe(e){J(e),f.value=!0}function me(){f.value=!0}function _e(e){T.value?.$el.contains(e.relatedTarget)||(f.value=!1,K(e),Q())}function ye(){var e;(e=T.value)==null||e.focus(),Q()}function be(e){w.value&&(T.value?.$el.contains(c(e))||Q())}function xe(t){if(!Array.isArray(t))return[];if(N.value)return Array.from(t);{let{remote:n}=e,{value:r}=S;if(n){let{value:e}=j;return t.filter(t=>r.has(t)||e.has(t))}else return t.filter(e=>r.has(e))}}function we(e){Te(e.rawNode)}function Te(t){if(U.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=_,t=e[0]||null;if(t){let e=h.value;e.length?e.push(t):h.value=[t],_.value=A}}if(r&&j.value.set(t[a],t),e.multiple){let e=xe(d.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=$(t[a]);~e&&(h.value.splice(e,1),i&&(p.value=``))}}else e.push(t[a]),i&&(p.value=``);G(e,I(e))}else{if(n&&!r){let e=$(t[a]);~e?h.value=[h.value[e]]:h.value=A}je(),Q(),G(t[a],t)}}function $(t){return h.value.findIndex(n=>n[e.valueField]===t)}function Ee(t){w.value||ae();let{value:n}=t.target;p.value=n;let{tag:r,remote:i}=e;if(Y(n),r&&!i){if(!n){_.value=A;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;m.value.some(e=>e[i]===r[i]||e[a]===r[a])||h.value.some(e=>e[i]===r[i]||e[a]===r[a])?_.value=A:_.value=[r]}}function De(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Q(),r&&!i&&a&&(h.value=A),q(),n?G([],[]):G(null,null)}function Oe(e){!ne(e,`action`)&&!ne(e,`empty`)&&!ne(e,`header`)&&e.preventDefault()}function ke(e){X(e)}function Ae(t){var n,r,i;if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!T.value?.isComposing){if(w.value){let t=D.value?.getPendingTmNode();t?we(t):e.filterable||(Q(),je())}else if(ae(),e.tag&&se.value){let t=_.value[0];if(t){let n=t[e.valueField],{value:r}=d;e.multiple&&Array.isArray(r)&&r.includes(n)||Te(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;w.value&&((n=D.value)==null||n.prev());break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;w.value?(r=D.value)==null||r.next():ae();break;case`Escape`:w.value&&(ve(t),Q()),(i=T.value)==null||i.focus();break}}function je(){var e;(e=T.value)==null||e.focus()}function Me(){var e;(e=T.value)==null||e.focusInput()}function Ne(){var e;w.value&&((e=E.value)==null||e.syncPosition())}re(),l(R(e,`options`),re);let Pe={focus:()=>{var e;(e=T.value)==null||e.focus()},focusInput:()=>{var e;(e=T.value)==null||e.focusInput()},blur:()=>{var e;(e=T.value)==null||e.blur()},blurInput:()=>{var e;(e=T.value)==null||e.blurInput()}},Fe=H(()=>{let{self:{menuBoxShadow:e}}=s.value;return{"--n-menu-box-shadow":e}}),Ie=a?F(`select`,void 0,Fe,e):void 0;return Object.assign(Object.assign({},Pe),{mergedStatus:W,mergedClsPrefix:t,mergedBordered:n,namespace:i,treeMate:x,isMounted:g(),triggerRef:T,menuRef:D,pattern:p,uncontrolledShow:C,mergedShow:w,adjustedTo:ue(e),uncontrolledValue:u,mergedValue:d,followerRef:E,localizedPlaceholder:k,selectedOption:B,selectedOptions:L,mergedSize:ee,mergedDisabled:U,focused:f,activeWithoutMenuOpen:se,inlineThemeDisabled:a,onTriggerInputFocus:ce,onTriggerInputBlur:le,handleTriggerOrMenuResize:Ne,handleMenuFocus:me,handleMenuBlur:_e,handleMenuTabOut:ye,handleTriggerClick:de,handleToggle:we,handleDeleteOption:Te,handlePatternInput:Ee,handleClear:De,handleTriggerBlur:fe,handleTriggerFocus:pe,handleKeydown:Ae,handleMenuAfterLeave:oe,handleMenuClickOutside:be,handleMenuScroll:ke,handleMenuKeydown:Ae,handleMenuMousedown:Oe,mergedTheme:s,cssVars:a?void 0:Fe,themeClass:Ie?.themeClass,onRender:Ie?.onRender})},render(){return q(`div`,{class:`${this.mergedClsPrefix}-select`},q(se,null,{default:()=>[q(fe,null,{default:()=>q(Qe,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e;return[(e=this.$slots).arrow?.call(e)]}})}),q(le,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===ue.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{default:()=>q(L,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e;return this.mergedShow||this.displayDirective===`show`?((e=this.onRender)==null||e.call(this),s(q(Xe,Object.assign({},this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var e;return[(e=this.$slots).empty?.call(e)]},header:()=>{var e;return[(e=this.$slots).header?.call(e)]},action:()=>{var e;return[(e=this.$slots).action?.call(e)]}}),this.displayDirective===`show`?[[U,this.mergedShow],[Q,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Q,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});export{Xe as a,Le as c,nt as i,ut as n,Ge as o,ot as r,Be as s,ft as t};