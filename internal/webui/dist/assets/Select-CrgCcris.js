import{$t as e,An as t,C as n,Cn as r,Ct as i,Dn as a,Dt as o,E as s,Fn as c,Gt as l,It as u,Jt as d,Kn as f,Mt as p,Nn as m,Nt as h,O as g,Ot as _,P as v,Pn as y,Pt as b,Qt as x,Rn as S,Tn as C,Un as w,Ut as T,Vt as E,Wn as D,Wt as O,Xt as k,Zt as A,_ as j,ar as M,dn as N,dt as P,en as F,ft as ee,gt as te,hn as I,in as L,j as R,jn as z,k as ne,kn as B,kt as re,pt as V,qt as H,sn as U,tn as W,tr as G,xt as K,yt as q}from"./client-DVlvm8qj.js";import{t as J}from"./next-frame-once-qdYFoq8G.js";import{i as ie,n as ae,r as Y,t as oe}from"./create-CyoCXTMe.js";import{t as X}from"./misc-DDs3MKLt.js";import{l as Z}from"./light-C3ssoYlQ.js";import{a as se,c as ce,d as le,i as ue,l as de,o as fe,s as pe,t as me,u as he}from"./Popover-BjCwG4kL.js";import{a as ge,i as _e}from"./text-Sj-og4xd.js";import{a as ve,f as ye,l as be,r as xe,s as Se,t as Ce}from"./light-BrYiNH4l.js";import{t as we}from"./use-locale-D_f5A1Lq.js";import{n as Te}from"./Input-DvicfdAS.js";import{t as Q}from"./Tag-C6rEfc7C.js";import{E as Ee,F as $}from"./index-BvW3qXdO.js";function De(e){return e&-e}var Oe=class{constructor(e,t){this.l=e,this.min=t;let n=Array(e+1);for(let t=0;t<e+1;++t)n[t]=0;this.ft=n}add(e,t){if(t===0)return;let{l:n,ft:r}=this;for(e+=1;e<=n;)r[e]+=t,e+=De(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;let{ft:t,min:n,l:r}=this;if(e>r)throw Error("[FinweckTree.sum]: `i` is larger than length.");let i=e*n;for(;e>0;)i+=t[e],e-=De(e);return i}getBound(e){let t=0,n=this.l;for(;n>t;){let r=Math.floor((t+n)/2),i=this.sum(r);if(i>e){n=r;continue}else if(i<e){if(t===r)return this.sum(t+1)<=e?t+1:r;t=r}else return r}return t}},ke;function Ae(){return typeof document>`u`?!1:(ke===void 0&&(ke=`matchMedia`in window&&window.matchMedia(`(pointer:coarse)`).matches),ke)}var je;function Me(){return typeof document>`u`?1:(je===void 0&&(je=`chrome`in window?window.devicePixelRatio:1),je)}var Ne=`VVirtualListXScroll`;function Pe({columnsRef:e,renderColRef:t,renderItemWithColsRef:n}){let r=G(0),i=G(0),a=I(()=>{let t=e.value;if(t.length===0)return null;let n=new Oe(t.length,0);return t.forEach((e,t)=>{n.add(t,e.width)}),n});return S(Ne,{startIndexRef:b(()=>{let e=a.value;return e===null?0:Math.max(e.getBound(i.value)-1,0)}),endIndexRef:b(()=>{let t=a.value;return t===null?0:Math.min(t.getBound(i.value+r.value)+1,e.value.length-1)}),columnsRef:e,renderColRef:t,renderItemWithColsRef:n,getLeft:e=>{let t=a.value;return t===null?0:t.sum(e)}}),{listWidthRef:r,scrollLeftRef:i}}var Fe=r({name:`VirtualListRow`,props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){let{startIndexRef:e,endIndexRef:t,columnsRef:n,getLeft:r,renderColRef:i,renderItemWithColsRef:o}=a(Ne);return{startIndex:e,endIndex:t,columns:n,renderCol:i,renderItemWithCols:o,getLeft:r}},render(){let{startIndex:e,endIndex:t,columns:n,renderCol:r,renderItemWithCols:i,getLeft:a,item:o}=this;if(i!=null)return i({itemIndex:this.index,startColIndex:e,endColIndex:t,allColumns:n,item:o,getLeft:a});if(r!=null){let i=[];for(let s=e;s<=t;++s){let e=n[s];i.push(r({column:e,left:a(s),item:o}))}return i}return null}}),Ie=se(`.v-vl`,{maxHeight:`inherit`,height:`100%`,overflow:`auto`,minWidth:`1px`},[se(`&:not(.v-vl--show-scrollbar)`,{scrollbarWidth:`none`},[se(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,{width:0,height:0,display:`none`})])]),Le=r({name:`VirtualList`,inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:`div`},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:`key`},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){let t=re();Ie.mount({id:`vueuc/virtual-list`,head:!0,anchorMetaName:fe,ssr:t}),c(()=>{let{defaultScrollIndex:t,defaultScrollKey:n}=e;t==null?n!=null&&_({key:n}):_({index:t})});let n=!1,r=!1;z(()=>{if(n=!1,!r){r=!0;return}_({top:m.value,left:o.value})}),y(()=>{n=!0,r||=!0});let i=b(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let t=0;return e.columns.forEach(e=>{t+=e.width}),t}),a=I(()=>{let t=new Map,{keyField:n}=e;return e.items.forEach((e,r)=>{t.set(e[n],r)}),t}),{scrollLeftRef:o,listWidthRef:s}=Pe({columnsRef:M(e,`columns`),renderColRef:M(e,`renderCol`),renderItemWithColsRef:M(e,`renderItemWithCols`)}),l=G(null),u=G(void 0),d=new Map,f=I(()=>{let{items:t,itemSize:n,keyField:r}=e,i=new Oe(t.length,n);return t.forEach((e,t)=>{let n=e[r],a=d.get(n);a!==void 0&&i.add(t,a)}),i}),p=G(0),m=G(0),h=b(()=>Math.max(f.value.getBound(m.value-E(e.paddingTop))-1,0)),g=I(()=>{let{value:t}=u;if(t===void 0)return[];let{items:n,itemSize:r}=e,i=h.value,a=Math.min(i+Math.ceil(t/r+1),n.length-1),o=[];for(let e=i;e<=a;++e)o.push(n[e]);return o}),_=(e,t)=>{if(typeof e==`number`){C(e,t,`auto`);return}let{left:n,top:r,index:i,key:o,position:s,behavior:c,debounce:l=!0}=e;if(n!==void 0||r!==void 0)C(n,r,c);else if(i!==void 0)S(i,c,l);else if(o!==void 0){let e=a.value.get(o);e!==void 0&&S(e,c,l)}else s===`bottom`?C(0,2**53-1,c):s===`top`&&C(0,0,c)},v,x=null;function S(t,n,r){let{value:i}=f,a=i.sum(t)+E(e.paddingTop);if(!r)l.value.scrollTo({left:0,top:a,behavior:n});else{v=t,x!==null&&window.clearTimeout(x),x=window.setTimeout(()=>{v=void 0,x=null},16);let{scrollTop:e,offsetHeight:r}=l.value;if(a>e){let o=i.get(t);a+o<=e+r||l.value.scrollTo({left:0,top:a+o-r,behavior:n})}else l.value.scrollTo({left:0,top:a,behavior:n})}}function C(e,t,n){l.value.scrollTo({left:e,top:t,behavior:n})}function w(t,r){if(n||e.ignoreItemResize||P(r.target))return;let{value:i}=f,o=a.value.get(t),s=i.get(o),c=r.borderBoxSize?.[0]?.blockSize??r.contentRect.height;if(c===s)return;c-e.itemSize===0?d.delete(t):d.set(t,c-e.itemSize);let u=c-s;if(u===0)return;i.add(o,u);let m=l.value;if(m!=null){if(v===void 0){let e=i.sum(o);m.scrollTop>e&&m.scrollBy(0,u)}else(o<v||o===v&&c+i.sum(o)>m.scrollTop+m.offsetHeight)&&m.scrollBy(0,u);N()}p.value++}let T=!Ae(),D=!1;function k(t){var n;(n=e.onScroll)==null||n.call(e,t),(!T||!D)&&N()}function A(t){var n;if((n=e.onWheel)==null||n.call(e,t),T){let e=l.value;if(e!=null){if(t.deltaX===0&&(e.scrollTop===0&&t.deltaY<=0||e.scrollTop+e.offsetHeight>=e.scrollHeight&&t.deltaY>=0))return;t.preventDefault(),e.scrollTop+=t.deltaY/Me(),e.scrollLeft+=t.deltaX/Me(),N(),D=!0,J(()=>{D=!1})}}}function j(t){if(n||P(t.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(t.contentRect.height===u.value)return}else if(t.contentRect.height===u.value&&t.contentRect.width===s.value)return;u.value=t.contentRect.height,s.value=t.contentRect.width;let{onResize:r}=e;r!==void 0&&r(t)}function N(){let{value:e}=l;e!=null&&(m.value=e.scrollTop,o.value=e.scrollLeft)}function P(e){let t=e;for(;t!==null;){if(t.style.display===`none`)return!0;t=t.parentElement}return!1}return{listHeight:u,listStyle:{overflow:`auto`},keyToIndex:a,itemsStyle:I(()=>{let{itemResizable:t}=e,n=O(f.value.sum());return p.value,[e.itemsStyle,{boxSizing:`content-box`,width:O(i.value),height:t?``:n,minHeight:t?n:``,paddingTop:O(e.paddingTop),paddingBottom:O(e.paddingBottom)}]}),visibleItemsStyle:I(()=>(p.value,{transform:`translateY(${O(f.value.sum(h.value))})`})),viewportItems:g,listElRef:l,itemsElRef:G(null),scrollTo:_,handleListResize:j,handleListScroll:k,handleListWheel:A,handleItemResize:w}},render(){let{itemResizable:e,keyField:t,keyToIndex:n,visibleItemsTag:r}=this;return C(o,{onResize:this.handleListResize},{default:()=>{var i;return C(`div`,B(this.$attrs,{class:[`v-vl`,this.showScrollbar&&`v-vl--show-scrollbar`],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:`listElRef`}),[this.items.length===0?(i=this.$slots).empty?.call(i):C(`div`,{ref:`itemsElRef`,class:`v-vl-items`,style:this.itemsStyle},[C(r,Object.assign({class:`v-vl-visible-items`,style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{let{renderCol:r,renderItemWithCols:i}=this;return this.viewportItems.map(a=>{let s=a[t],c=n.get(s),l=r==null?void 0:C(Fe,{index:c,item:a}),u=i==null?void 0:C(Fe,{index:c,item:a}),d=this.$slots.default({item:a,renderedCols:l,renderedItemWithCols:u,index:c})[0];return e?C(o,{key:s,onResize:e=>this.handleItemResize(s,e)},{default:()=>d}):(d.key=s,d)})}})])])}})}});function Re(e,t){t&&(c(()=>{let{value:n}=e;n&&_.registerHandler(n,t)}),w(e,(e,t)=>{t&&_.unregisterHandler(t)},{deep:!1}),m(()=>{let{value:t}=e;t&&_.unregisterHandler(t)}))}function ze(e){switch(typeof e){case`string`:return e||void 0;case`number`:return String(e);default:return}}function Be(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var Ve=r({name:`Checkmark`,render(){return C(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},C(`g`,{fill:`none`},C(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})))}}),He=r({name:`Empty`,render(){return C(`svg`,{viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},C(`path`,{d:`M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z`,fill:`currentColor`}),C(`path`,{d:`M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z`,fill:`currentColor`}))}}),Ue=r({props:{onFocus:Function,onBlur:Function},setup(e){return()=>C(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),We=d(`empty`,`
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
 `,[H(`+`,[k(`description`,`
 margin-top: 8px;
 `)])]),k(`description`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),k(`extra`,`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Ge=r({name:`Empty`,props:Object.assign(Object.assign({},R.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:`medium`},renderIcon:Function}),slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedComponentPropsRef:i}=V(t),a=R(`Empty`,`-empty`,We,be,t,n),{localeRef:o}=we(`Empty`),s=I(()=>t.description??i?.value?.Empty?.description),c=I(()=>i?.value?.Empty?.renderIcon||(()=>C(He,null))),l=I(()=>{let{size:n}=t,{common:{cubicBezierEaseInOut:r},self:{[e(`iconSize`,n)]:i,[e(`fontSize`,n)]:o,textColor:s,iconColor:c,extraTextColor:l}}=a.value;return{"--n-icon-size":i,"--n-font-size":o,"--n-bezier":r,"--n-text-color":s,"--n-icon-color":c,"--n-extra-text-color":l}}),u=r?ee(`empty`,I(()=>{let e=``,{size:n}=t;return e+=n[0],e}),l,t):void 0;return{mergedClsPrefix:n,mergedRenderIcon:c,localizedDescription:I(()=>s.value||o.value.description),cssVars:r?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,onRender:n}=this;return n?.(),C(`div`,{class:[`${t}-empty`,this.themeClass],style:this.cssVars},this.showIcon?C(`div`,{class:`${t}-empty__icon`},e.icon?e.icon():C(ne,{clsPrefix:t},{default:this.mergedRenderIcon})):null,this.showDescription?C(`div`,{class:`${t}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?C(`div`,{class:`${t}-empty__extra`},e.extra()):null)}}),Ke=r({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=a(le);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r?.(i),o=t?t(i,!1):$(i[this.labelField],i,!1),s=C(`div`,Object.assign({},a,{class:[`${e}-base-select-group-header`,a?.class]}),o);return i.render?i.render({node:s,option:i}):n?n({node:s,option:i,selected:!1}):s}});function qe(e,t){return C(L,{name:`fade-in-scale-up-transition`},{default:()=>e?C(ne,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>C(Ve)}):null})}var Je=r({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:o,renderOptionRef:s,labelFieldRef:c,valueFieldRef:l,showCheckmarkRef:u,nodePropsRef:d,handleOptionClick:f,handleOptionMouseEnter:p}=a(le),m=b(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e;n.disabled||p(t,n)}function _(t){let{tmNode:n}=e,{value:r}=m;n.disabled||r||p(t,n)}return{multiple:r,isGrouped:b(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:u,nodeProps:d,isPending:m,isSelected:b(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[l.value];if(a){let{value:e}=i;return e.has(o)}else return n===o}),labelField:c,renderLabel:o,renderOption:s,handleMouseMove:_,handleMouseEnter:g,handleClick:h}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:o,renderOption:s,renderLabel:c,handleClick:l,handleMouseEnter:u,handleMouseMove:d}=this,f=qe(n,e),p=c?[c(t,n),a&&f]:[$(t[this.labelField],t,n),a&&f],m=o?.(t),h=C(`div`,Object.assign({},m,{class:[`${e}-base-select-option`,t.class,m?.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[m?.style||``,t.style||``],onClick:Be([l,m?.onClick]),onMouseenter:Be([u,m?.onMouseenter]),onMousemove:Be([d,m?.onMousemove])}),C(`div`,{class:`${e}-base-select-option__content`},p));return t.render?t.render({node:h,option:t,selected:n}):s?s({node:h,option:t,selected:n}):h}}),Ye=d(`base-select-menu`,`
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
 `),H(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),H(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),A(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),A(`pending`,[H(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),A(`selected`,`
 color: var(--n-option-text-color-active);
 `,[H(`&::before`,`
 background-color: var(--n-option-color-active);
 `),A(`pending`,[H(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),A(`disabled`,`
 cursor: not-allowed;
 `,[x(`selected`,`
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
 `,[Ee({enterScale:`0.5`})])])]),Xe=r({name:`InternalSelectMenu`,props:Object.assign(Object.assign({},R.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function}),setup(n){let{mergedClsPrefixRef:r,mergedRtlRef:i,mergedComponentPropsRef:a}=V(n),o=v(`InternalSelectMenu`,i,r),s=R(`InternalSelectMenu`,`-internal-select-menu`,Ye,Se,n,M(n,`clsPrefix`)),l=G(null),u=G(null),d=G(null),f=I(()=>n.treeMate.getFlattenedNodes()),p=I(()=>ae(f.value)),h=G(null);function g(){let{treeMate:e}=n,t=null,{value:r}=n;r===null?t=e.getFirstAvailableNode():(t=n.multiple?e.getNode((r||[])[(r||[]).length-1]):e.getNode(r),(!t||t.disabled)&&(t=e.getFirstAvailableNode())),H(t||null)}function _(){let{value:e}=h;e&&!n.treeMate.getNode(e.key)&&(h.value=null)}let y;w(()=>n.show,e=>{e?y=w(()=>n.treeMate,()=>{n.resetMenuOnOptionsChange?(n.autoPending?g():_(),t(U)):_()},{immediate:!0}):y?.()},{immediate:!0}),m(()=>{y?.()});let b=I(()=>E(s.value.self[e(`optionHeight`,n.size)])),x=I(()=>T(s.value.self[e(`padding`,n.size)])),C=I(()=>n.multiple&&Array.isArray(n.value)?new Set(n.value):new Set),D=I(()=>{let e=f.value;return e&&e.length===0}),O=I(()=>a?.value?.Select?.renderEmpty);function k(e){let{onToggle:t}=n;t&&t(e)}function A(e){let{onScroll:t}=n;t&&t(e)}function j(e){var t;(t=d.value)==null||t.sync(),A(e)}function N(){var e;(e=d.value)==null||e.sync()}function P(){let{value:e}=h;return e||null}function F(e,t){t.disabled||H(t,!1)}function te(e,t){t.disabled||k(t)}function L(e){var t;ie(e,`action`)||(t=n.onKeyup)==null||t.call(n,e)}function z(e){var t;ie(e,`action`)||(t=n.onKeydown)==null||t.call(n,e)}function ne(e){var t;(t=n.onMousedown)==null||t.call(n,e),!n.focusable&&e.preventDefault()}function B(){let{value:e}=h;e&&H(e.getNext({loop:!0}),!0)}function re(){let{value:e}=h;e&&H(e.getPrev({loop:!0}),!0)}function H(e,t=!1){h.value=e,t&&U()}function U(){var e,t;let r=h.value;if(!r)return;let i=p.value(r.key);i!==null&&(n.virtualScroll?(e=u.value)==null||e.scrollTo({index:i}):(t=d.value)==null||t.scrollTo({index:i,elSize:b.value}))}function W(e){var t;l.value?.contains(e.target)&&((t=n.onFocus)==null||t.call(n,e))}function K(e){var t;l.value?.contains(e.relatedTarget)||(t=n.onBlur)==null||t.call(n,e)}S(le,{handleOptionMouseEnter:F,handleOptionClick:te,valueSetRef:C,pendingTmNodeRef:h,nodePropsRef:M(n,`nodeProps`),showCheckmarkRef:M(n,`showCheckmark`),multipleRef:M(n,`multiple`),valueRef:M(n,`value`),renderLabelRef:M(n,`renderLabel`),renderOptionRef:M(n,`renderOption`),labelFieldRef:M(n,`labelField`),valueFieldRef:M(n,`valueField`)}),S(he,l),c(()=>{let{value:e}=d;e&&e.sync()});let q=I(()=>{let{size:t}=n,{common:{cubicBezierEaseInOut:r},self:{height:i,borderRadius:a,color:o,groupHeaderTextColor:c,actionDividerColor:l,optionTextColorPressed:u,optionTextColor:d,optionTextColorDisabled:f,optionTextColorActive:p,optionOpacityDisabled:m,optionCheckColor:h,actionTextColor:g,optionColorPending:_,optionColorActive:v,loadingColor:y,loadingSize:b,optionColorActivePending:x,[e(`optionFontSize`,t)]:S,[e(`optionHeight`,t)]:C,[e(`optionPadding`,t)]:w}}=s.value;return{"--n-height":i,"--n-action-divider-color":l,"--n-action-text-color":g,"--n-bezier":r,"--n-border-radius":a,"--n-color":o,"--n-option-font-size":S,"--n-group-header-text-color":c,"--n-option-check-color":h,"--n-option-color-pending":_,"--n-option-color-active":v,"--n-option-color-active-pending":x,"--n-option-height":C,"--n-option-opacity-disabled":m,"--n-option-text-color":d,"--n-option-text-color-active":p,"--n-option-text-color-disabled":f,"--n-option-text-color-pressed":u,"--n-option-padding":w,"--n-option-padding-left":T(w,`left`),"--n-option-padding-right":T(w,`right`),"--n-loading-color":y,"--n-loading-size":b}}),{inlineThemeDisabled:J}=n,Y=J?ee(`internal-select-menu`,I(()=>n.size[0]),q,n):void 0,oe={selfRef:l,next:B,prev:re,getPendingTmNode:P};return Re(l,n.onResize),Object.assign({mergedTheme:s,mergedClsPrefix:r,rtlEnabled:o,virtualListRef:u,scrollbarRef:d,itemSize:b,padding:x,flattenedNodes:f,empty:D,mergedRenderEmpty:O,virtualListContainer(){let{value:e}=u;return e?.listElRef},virtualListContent(){let{value:e}=u;return e?.itemsElRef},doScroll:A,handleFocusin:W,handleFocusout:K,handleKeyUp:L,handleKeyDown:z,handleMouseDown:ne,handleVirtualListResize:N,handleVirtualListScroll:j,cssVars:J?void 0:q,themeClass:Y?.themeClass,onRender:Y?.onRender},oe)},render(){let{$slots:e,virtualScroll:t,clsPrefix:r,mergedTheme:i,themeClass:a,onRender:o}=this;return o?.(),C(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:[`${r}-base-select-menu`,`${r}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${r}-base-select-menu--rtl`,a,this.multiple&&`${r}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},K(e.header,e=>e&&C(`div`,{class:`${r}-base-select-menu__header`,"data-header":!0,key:`header`},e)),this.loading?C(`div`,{class:`${r}-base-select-menu__loading`},C(n,{clsPrefix:r,strokeWidth:20})):this.empty?C(`div`,{class:`${r}-base-select-menu__empty`,"data-empty":!0},q(e.empty,()=>[this.mergedRenderEmpty?.call(this)||C(Ge,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size})])):C(j,Object.assign({ref:`scrollbarRef`,theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},this.scrollbarProps),{default:()=>t?C(Le,{ref:`virtualListRef`,class:`${r}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?C(Ke,{key:e.key,clsPrefix:r,tmNode:e}):e.ignored?null:C(Je,{clsPrefix:r,key:e.key,tmNode:e})}):C(`div`,{class:`${r}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(e=>e.isGroup?C(Ke,{key:e.key,clsPrefix:r,tmNode:e}):C(Je,{clsPrefix:r,key:e.key,tmNode:e})))}),K(e.action,e=>e&&[C(`div`,{class:`${r}-base-select-menu__action`,"data-action":!0,key:`action`},e),C(Ue,{onFocus:this.onTabOut,key:`focus-detector`})]))}}),Ze=H([d(`base-selection`,`
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
 `)]),x(`disabled`,[H(`&:hover`,[k(`state-border`,`
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
 `)]),[`warning`,`error`].map(e=>A(`${e}-status`,[k(`state-border`,`border: var(--n-border-${e});`),x(`disabled`,[H(`&:hover`,[k(`state-border`,`
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
 `,[H(`&:last-child`,`padding-right: 0;`),d(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[k(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Qe=r({name:`InternalSelection`,props:Object.assign(Object.assign({},R.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(n){let{mergedClsPrefixRef:r,mergedRtlRef:i}=V(n),a=v(`InternalSelection`,i,r),o=G(null),s=G(null),l=G(null),u=G(null),d=G(null),f=G(null),p=G(null),m=G(null),h=G(null),g=G(null),_=G(!1),y=G(!1),b=G(!1),x=R(`InternalSelection`,`-internal-selection`,Ze,ve,n,M(n,`clsPrefix`)),S=I(()=>n.clearable&&!n.disabled&&(b.value||n.active)),C=I(()=>n.selectedOption?n.renderTag?n.renderTag({option:n.selectedOption,handleClose:()=>{}}):n.renderLabel?n.renderLabel(n.selectedOption,!0):$(n.selectedOption[n.labelField],n.selectedOption,!0):n.placeholder),E=I(()=>{let e=n.selectedOption;if(e)return e[n.labelField]}),O=I(()=>n.multiple?!!(Array.isArray(n.selectedOptions)&&n.selectedOptions.length):n.selectedOption!==null);function k(){var e;let{value:t}=o;if(t){let{value:r}=s;r&&(r.style.width=`${t.offsetWidth}px`,n.maxTagCount!==`responsive`&&((e=h.value)==null||e.sync({showAllItemsBeforeCalculate:!1})))}}function A(){let{value:e}=g;e&&(e.style.display=`none`)}function j(){let{value:e}=g;e&&(e.style.display=`inline-block`)}w(M(n,`active`),e=>{e||A()}),w(M(n,`pattern`),()=>{n.multiple&&t(k)});function N(e){let{onFocus:t}=n;t&&t(e)}function P(e){let{onBlur:t}=n;t&&t(e)}function F(e){let{onDeleteOption:t}=n;t&&t(e)}function te(e){let{onClear:t}=n;t&&t(e)}function L(e){let{onPatternInput:t}=n;t&&t(e)}function z(e){(!e.relatedTarget||!l.value?.contains(e.relatedTarget))&&N(e)}function ne(e){l.value?.contains(e.relatedTarget)||P(e)}function B(e){te(e)}function re(){b.value=!0}function H(){b.value=!1}function U(e){!n.active||!n.filterable||e.target!==s.value&&e.preventDefault()}function W(e){F(e)}let K=G(!1);function q(e){if(e.key===`Backspace`&&!K.value&&!n.pattern.length){let{selectedOptions:e}=n;e?.length&&W(e[e.length-1])}}let J=null;function ie(e){let{value:t}=o;t&&(t.textContent=e.target.value,k()),n.ignoreComposition&&K.value?J=e:L(e)}function ae(){K.value=!0}function Y(){K.value=!1,n.ignoreComposition&&L(J),J=null}function oe(e){var t;y.value=!0,(t=n.onPatternFocus)==null||t.call(n,e)}function X(e){var t;y.value=!1,(t=n.onPatternBlur)==null||t.call(n,e)}function Z(){var e,t;if(n.filterable)y.value=!1,(e=f.value)==null||e.blur(),(t=s.value)==null||t.blur();else if(n.multiple){let{value:e}=u;e?.blur()}else{let{value:e}=d;e?.blur()}}function se(){var e,t,r;n.filterable?(y.value=!1,(e=f.value)==null||e.focus()):n.multiple?(t=u.value)==null||t.focus():(r=d.value)==null||r.focus()}function ce(){let{value:e}=s;e&&(j(),e.focus())}function le(){let{value:e}=s;e&&e.blur()}function ue(e){let{value:t}=p;t&&t.setTextContent(`+${e}`)}function de(){let{value:e}=m;return e}function fe(){return s.value}let pe=null;function me(){pe!==null&&window.clearTimeout(pe)}function he(){n.active||(me(),pe=window.setTimeout(()=>{O.value&&(_.value=!0)},100))}function ge(){me()}function _e(e){e||(me(),_.value=!1)}w(O,e=>{e||(_.value=!1)}),c(()=>{D(()=>{let e=f.value;e&&(n.disabled?e.removeAttribute(`tabindex`):e.tabIndex=y.value?-1:0)})}),Re(l,n.onResize);let{inlineThemeDisabled:ye}=n,be=I(()=>{let{size:t}=n,{common:{cubicBezierEaseInOut:r},self:{fontWeight:i,borderRadius:a,color:o,placeholderColor:s,textColor:c,paddingSingle:l,paddingMultiple:u,caretColor:d,colorDisabled:f,textColorDisabled:p,placeholderColorDisabled:m,colorActive:h,boxShadowFocus:g,boxShadowActive:_,boxShadowHover:v,border:y,borderFocus:b,borderHover:S,borderActive:C,arrowColor:w,arrowColorDisabled:E,loadingColor:D,colorActiveWarning:O,boxShadowFocusWarning:k,boxShadowActiveWarning:A,boxShadowHoverWarning:j,borderWarning:M,borderFocusWarning:N,borderHoverWarning:P,borderActiveWarning:F,colorActiveError:ee,boxShadowFocusError:te,boxShadowActiveError:I,boxShadowHoverError:L,borderError:R,borderFocusError:z,borderHoverError:ne,borderActiveError:B,clearColor:re,clearColorHover:V,clearColorPressed:H,clearSize:U,arrowSize:W,[e(`height`,t)]:G,[e(`fontSize`,t)]:K}}=x.value,q=T(l),J=T(u);return{"--n-bezier":r,"--n-border":y,"--n-border-active":C,"--n-border-focus":b,"--n-border-hover":S,"--n-border-radius":a,"--n-box-shadow-active":_,"--n-box-shadow-focus":g,"--n-box-shadow-hover":v,"--n-caret-color":d,"--n-color":o,"--n-color-active":h,"--n-color-disabled":f,"--n-font-size":K,"--n-height":G,"--n-padding-single-top":q.top,"--n-padding-multiple-top":J.top,"--n-padding-single-right":q.right,"--n-padding-multiple-right":J.right,"--n-padding-single-left":q.left,"--n-padding-multiple-left":J.left,"--n-padding-single-bottom":q.bottom,"--n-padding-multiple-bottom":J.bottom,"--n-placeholder-color":s,"--n-placeholder-color-disabled":m,"--n-text-color":c,"--n-text-color-disabled":p,"--n-arrow-color":w,"--n-arrow-color-disabled":E,"--n-loading-color":D,"--n-color-active-warning":O,"--n-box-shadow-focus-warning":k,"--n-box-shadow-active-warning":A,"--n-box-shadow-hover-warning":j,"--n-border-warning":M,"--n-border-focus-warning":N,"--n-border-hover-warning":P,"--n-border-active-warning":F,"--n-color-active-error":ee,"--n-box-shadow-focus-error":te,"--n-box-shadow-active-error":I,"--n-box-shadow-hover-error":L,"--n-border-error":R,"--n-border-focus-error":z,"--n-border-hover-error":ne,"--n-border-active-error":B,"--n-clear-size":U,"--n-clear-color":re,"--n-clear-color-hover":V,"--n-clear-color-pressed":H,"--n-arrow-size":W,"--n-font-weight":i}}),xe=ye?ee(`internal-selection`,I(()=>n.size[0]),be,n):void 0;return{mergedTheme:x,mergedClearable:S,mergedClsPrefix:r,rtlEnabled:a,patternInputFocused:y,filterablePlaceholder:C,label:E,selected:O,showTagsPanel:_,isComposing:K,counterRef:p,counterWrapperRef:m,patternInputMirrorRef:o,patternInputRef:s,selfRef:l,multipleElRef:u,singleElRef:d,patternInputWrapperRef:f,overflowRef:h,inputTagElRef:g,handleMouseDown:U,handleFocusin:z,handleClear:B,handleMouseEnter:re,handleMouseLeave:H,handleDeleteOption:W,handlePatternKeyDown:q,handlePatternInputInput:ie,handlePatternInputBlur:X,handlePatternInputFocus:oe,handleMouseEnterCounter:he,handleMouseLeaveCounter:ge,handleFocusout:ne,handleCompositionEnd:Y,handleCompositionStart:ae,onPopoverUpdateShow:_e,focus:se,focusInput:ce,blur:Z,blurInput:le,updateCounter:ue,getCounter:de,getTail:fe,renderLabel:n.renderLabel,cssVars:ye?void 0:be,themeClass:xe?.themeClass,onRender:xe?.onRender}},render(){let{status:e,multiple:t,size:n,disabled:r,filterable:i,maxTagCount:a,bordered:o,clsPrefix:s,ellipsisTagPopoverProps:c,onRender:l,renderTag:u,renderLabel:d}=this;l?.();let f=a===`responsive`,p=typeof a==`number`,m=f||p,h=C(te,null,{default:()=>C(Te,{clsPrefix:s,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var e;return(e=this.$slots).arrow?.call(e)}})}),g;if(t){let{labelField:e}=this,t=t=>C(`div`,{class:`${s}-base-selection-tag-wrapper`,key:t.value},u?u({option:t,handleClose:()=>{this.handleDeleteOption(t)}}):C(Q,{size:n,closable:!t.disabled,disabled:r,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>d?d(t,!0):$(t[e],t,!0)})),o=()=>(p?this.selectedOptions.slice(0,a):this.selectedOptions).map(t),l=i?C(`div`,{class:`${s}-base-selection-input-tag`,ref:`inputTagElRef`,key:`__input-tag__`},C(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${s}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),C(`span`,{ref:`patternInputMirrorRef`,class:`${s}-base-selection-input-tag__mirror`},this.pattern)):null,_=f?()=>C(`div`,{class:`${s}-base-selection-tag-wrapper`,ref:`counterWrapperRef`},C(Q,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r})):void 0,v;if(p){let e=this.selectedOptions.length-a;e>0&&(v=C(`div`,{class:`${s}-base-selection-tag-wrapper`,key:`__counter__`},C(Q,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${e}`})))}let y=f?i?C(Y,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:_,tail:()=>l}):C(Y,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:o,counter:_}):p&&v?o().concat(v):o(),b=m?()=>C(`div`,{class:`${s}-base-selection-popover`},f?o():this.selectedOptions.map(t)):void 0,x=m?Object.assign({show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},c):null,S=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?C(`div`,{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`},C(`div`,{class:`${s}-base-selection-placeholder__inner`},this.placeholder)):null,w=i?C(`div`,{ref:`patternInputWrapperRef`,class:`${s}-base-selection-tags`},y,f?null:l,h):C(`div`,{ref:`multipleElRef`,class:`${s}-base-selection-tags`,tabindex:r?void 0:0},y,h);g=C(N,null,m?C(me,Object.assign({},x,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>w,default:b}):w,S)}else if(i){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=!this.active&&this.selected;g=C(`div`,{ref:`patternInputWrapperRef`,class:`${s}-base-selection-label`,title:this.patternInputFocused?void 0:ze(this.label)},C(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,class:`${s}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),n?C(`div`,{class:`${s}-base-selection-label__render-label ${s}-base-selection-overlay`,key:`input`},C(`div`,{class:`${s}-base-selection-overlay__wrapper`},u?u({option:this.selectedOption,handleClose:()=>{}}):d?d(this.selectedOption,!0):$(this.label,this.selectedOption,!0))):null,t?C(`div`,{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`,key:`placeholder`},C(`div`,{class:`${s}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,h)}else g=C(`div`,{ref:`singleElRef`,class:`${s}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label===void 0?C(`div`,{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`,key:`placeholder`},C(`div`,{class:`${s}-base-selection-placeholder__inner`},this.placeholder)):C(`div`,{class:`${s}-base-selection-input`,title:ze(this.label),key:`input`},C(`div`,{class:`${s}-base-selection-input__content`},u?u({option:this.selectedOption,handleClose:()=>{}}):d?d(this.selectedOption,!0):$(this.label,this.selectedOption,!0))),h);return C(`div`,{ref:`selfRef`,class:[`${s}-base-selection`,this.rtlEnabled&&`${s}-base-selection--rtl`,this.themeClass,e&&`${s}-base-selection--${e}-status`,{[`${s}-base-selection--active`]:this.active,[`${s}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${s}-base-selection--disabled`]:this.disabled,[`${s}-base-selection--multiple`]:this.multiple,[`${s}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},g,o?C(`div`,{class:`${s}-base-selection__border`}):null,o?C(`div`,{class:`${s}-base-selection__state-border`}):null)}});function $e(e){return e.type===`group`}function et(e){return e.type===`ignored`}function tt(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function nt(e,t){return{getIsGroup:$e,getIgnored:et,getKey(t){return $e(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function rt(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if($e(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(et(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function it(e,t,n){let r=new Map;return e.forEach(e=>{$e(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var at=p(`n-checkbox-group`),ot=r({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:t}=V(e),n=P(e),{mergedSizeRef:r,mergedDisabledRef:a}=n,o=G(e.defaultValue),s=ge(I(()=>e.value),o),c=I(()=>s.value?.length||0),l=I(()=>Array.isArray(s.value)?new Set(s.value):new Set);function u(t,r){let{nTriggerFormInput:a,nTriggerFormChange:c}=n,{onChange:l,"onUpdate:value":u,onUpdateValue:d}=e;if(Array.isArray(s.value)){let e=Array.from(s.value),n=e.findIndex(e=>e===r);t?~n||(e.push(r),d&&i(d,e,{actionType:`check`,value:r}),u&&i(u,e,{actionType:`check`,value:r}),a(),c(),o.value=e,l&&i(l,e)):~n&&(e.splice(n,1),d&&i(d,e,{actionType:`uncheck`,value:r}),u&&i(u,e,{actionType:`uncheck`,value:r}),l&&i(l,e),o.value=e,a(),c())}else t?(d&&i(d,[r],{actionType:`check`,value:r}),u&&i(u,[r],{actionType:`check`,value:r}),l&&i(l,[r]),o.value=[r],a(),c()):(d&&i(d,[],{actionType:`uncheck`,value:r}),u&&i(u,[],{actionType:`uncheck`,value:r}),l&&i(l,[]),o.value=[],a(),c())}return S(at,{checkedCountRef:c,maxRef:M(e,`max`),minRef:M(e,`min`),valueSetRef:l,disabledRef:a,mergedSizeRef:r,toggleCheckbox:u}),{mergedClsPrefix:t}},render(){return C(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),st=()=>C(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},C(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),ct=()=>C(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},C(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),lt=H([d(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[A(`show-label`,`line-height: var(--n-label-line-height);`),H(`&:hover`,[d(`checkbox-box`,[k(`border`,`border: var(--n-border-checked);`)])]),H(`&:focus:not(:active)`,[d(`checkbox-box`,[k(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),A(`inside-table`,[d(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),A(`checked`,[d(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[d(`checkbox-icon`,[H(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),A(`indeterminate`,[d(`checkbox-box`,[d(`checkbox-icon`,[H(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),H(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),A(`checked, indeterminate`,[H(`&:focus:not(:active)`,[d(`checkbox-box`,[k(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),d(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[k(`border`,{border:`var(--n-border-checked)`})])]),A(`disabled`,{cursor:`not-allowed`},[A(`checked`,[d(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[k(`border`,{border:`var(--n-border-disabled-checked)`}),d(`checkbox-icon`,[H(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),d(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[k(`border`,`
 border: var(--n-border-disabled);
 `),d(`checkbox-icon`,[H(`.check-icon, .line-icon`,`
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
 `,[H(`.check-icon, .line-icon`,`
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
 `),s({left:`1px`,top:`1px`})])]),k(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[H(`&:empty`,{display:`none`})])]),F(d(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),W(d(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),ut=r({name:`Checkbox`,props:Object.assign(Object.assign({},R.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),setup(t){let n=a(at,null),r=G(null),{mergedClsPrefixRef:o,inlineThemeDisabled:s,mergedRtlRef:c,mergedComponentPropsRef:l}=V(t),u=G(t.defaultChecked),d=ge(M(t,`checked`),u),f=b(()=>{if(n){let e=n.valueSetRef.value;return e&&t.value!==void 0?e.has(t.value):!1}else return d.value===t.checkedValue}),p=P(t,{mergedSize(e){let{size:r}=t;if(r!==void 0)return r;if(n){let{value:e}=n.mergedSizeRef;if(e!==void 0)return e}if(e){let{mergedSize:t}=e;if(t!==void 0)return t.value}return l?.value?.Checkbox?.size||`medium`},mergedDisabled(e){let{disabled:r}=t;if(r!==void 0)return r;if(n){if(n.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=n;if(e!==void 0&&t.value>=e&&!f.value)return!0;let{minRef:{value:r}}=n;if(r!==void 0&&t.value<=r&&f.value)return!0}return e?e.disabled.value:!1}}),{mergedDisabledRef:m,mergedSizeRef:h}=p,g=R(`Checkbox`,`-checkbox`,lt,xe,t,o);function _(e){if(n&&t.value!==void 0)n.toggleCheckbox(!f.value,t.value);else{let{onChange:n,"onUpdate:checked":r,onUpdateChecked:a}=t,{nTriggerFormInput:o,nTriggerFormChange:s}=p,c=f.value?t.uncheckedValue:t.checkedValue;r&&i(r,c,e),a&&i(a,c,e),n&&i(n,c,e),o(),s(),u.value=c}}function y(e){m.value||_(e)}function x(e){if(!m.value)switch(e.key){case` `:case`Enter`:_(e)}}function S(e){switch(e.key){case` `:e.preventDefault()}}let C={focus:()=>{var e;(e=r.value)==null||e.focus()},blur:()=>{var e;(e=r.value)==null||e.blur()}},w=v(`Checkbox`,c,o),T=I(()=>{let{value:t}=h,{common:{cubicBezierEaseInOut:n},self:{borderRadius:r,color:i,colorChecked:a,colorDisabled:o,colorTableHeader:s,colorTableHeaderModal:c,colorTableHeaderPopover:l,checkMarkColor:u,checkMarkColorDisabled:d,border:f,borderFocus:p,borderDisabled:m,borderChecked:_,boxShadowFocus:v,textColor:y,textColorDisabled:b,checkMarkColorDisabledChecked:x,colorDisabledChecked:S,borderDisabledChecked:C,labelPadding:w,labelLineHeight:T,labelFontWeight:E,[e(`fontSize`,t)]:D,[e(`size`,t)]:O}}=g.value;return{"--n-label-line-height":T,"--n-label-font-weight":E,"--n-size":O,"--n-bezier":n,"--n-border-radius":r,"--n-border":f,"--n-border-checked":_,"--n-border-focus":p,"--n-border-disabled":m,"--n-border-disabled-checked":C,"--n-box-shadow-focus":v,"--n-color":i,"--n-color-checked":a,"--n-color-table":s,"--n-color-table-modal":c,"--n-color-table-popover":l,"--n-color-disabled":o,"--n-color-disabled-checked":S,"--n-text-color":y,"--n-text-color-disabled":b,"--n-check-mark-color":u,"--n-check-mark-color-disabled":d,"--n-check-mark-color-disabled-checked":x,"--n-font-size":D,"--n-label-padding":w}}),E=s?ee(`checkbox`,I(()=>h.value[0]),T,t):void 0;return Object.assign(p,C,{rtlEnabled:w,selfRef:r,mergedClsPrefix:o,mergedDisabled:m,renderedChecked:f,mergedTheme:g,labelId:X(),handleClick:y,handleKeyUp:x,handleKeyDown:S,cssVars:s?void 0:T,themeClass:E?.themeClass,onRender:E?.onRender})},render(){var e;let{$slots:t,renderedChecked:n,mergedDisabled:r,indeterminate:i,privateInsideTable:a,cssVars:o,labelId:s,label:c,mergedClsPrefix:l,focusable:d,handleKeyUp:f,handleKeyDown:p,handleClick:m}=this;(e=this.onRender)==null||e.call(this);let h=K(t.default,e=>c||e?C(`span`,{class:`${l}-checkbox__label`,id:s},c||e):null);return C(`div`,{ref:`selfRef`,class:[`${l}-checkbox`,this.themeClass,this.rtlEnabled&&`${l}-checkbox--rtl`,n&&`${l}-checkbox--checked`,r&&`${l}-checkbox--disabled`,i&&`${l}-checkbox--indeterminate`,a&&`${l}-checkbox--inside-table`,h&&`${l}-checkbox--show-label`],tabindex:r||!d?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:n,"aria-labelledby":s,style:o,onKeyup:f,onKeydown:p,onClick:m,onMousedown:()=>{u(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},C(`div`,{class:`${l}-checkbox-box-wrapper`},`\xA0`,C(`div`,{class:`${l}-checkbox-box`},C(g,null,{default:()=>this.indeterminate?C(`div`,{key:`indeterminate`,class:`${l}-checkbox-icon`},ct()):C(`div`,{key:`check`,class:`${l}-checkbox-icon`},st())}),C(`div`,{class:`${l}-checkbox-box__border`}))),h)}}),dt=H([d(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),d(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Ee({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),ft=r({name:`Select`,props:Object.assign(Object.assign({},R.props),{to:de.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:n,namespaceRef:r,inlineThemeDisabled:a,mergedComponentPropsRef:o}=V(e),s=R(`Select`,`-select`,dt,Ce,e,t),c=G(e.defaultValue),u=ge(M(e,`value`),c),d=G(!1),f=G(``),p=_e(e,[`items`,`options`]),m=G([]),g=G([]),_=I(()=>g.value.concat(m.value).concat(p.value)),v=I(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return tt(e,i);let a=t[r];return typeof a==`string`?tt(e,a):typeof a==`number`&&tt(e,String(a))}}),y=I(()=>{if(e.remote)return p.value;{let{value:t}=_,{value:n}=f;return!n.length||!e.filterable?t:rt(t,v.value,n,e.childrenField)}}),b=I(()=>{let{valueField:t,childrenField:n}=e,r=nt(t,n);return oe(y.value,r)}),x=I(()=>it(_.value,e.valueField,e.childrenField)),S=G(!1),C=ge(M(e,`show`),S),T=G(null),E=G(null),D=G(null),{localeRef:O}=we(`Select`),k=I(()=>e.placeholder??O.value.placeholder),A=[],j=G(new Map),N=I(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function F(t){let n=e.remote,{value:r}=j,{value:i}=x,{value:a}=N,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let te=I(()=>{if(e.multiple){let{value:e}=u;return Array.isArray(e)?F(e):[]}return null}),L=I(()=>{let{value:t}=u;return!e.multiple&&!Array.isArray(t)?t===null?null:F([t])[0]||null:null}),z=P(e,{mergedSize:t=>{let{size:n}=e;if(n)return n;let{mergedSize:r}=t||{};return r?.value?r.value:o?.value?.Select?.size||`medium`}}),{mergedSizeRef:ne,mergedDisabledRef:B,mergedStatusRef:re}=z;function H(t,n){let{onChange:r,"onUpdate:value":a,onUpdateValue:o}=e,{nTriggerFormChange:s,nTriggerFormInput:l}=z;r&&i(r,t,n),o&&i(o,t,n),a&&i(a,t,n),c.value=t,s(),l()}function U(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=z;n&&i(n,t),r()}function W(){let{onClear:t}=e;t&&i(t)}function K(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:a}=z;n&&i(n,t),a(),r&&X()}function q(t){let{onSearch:n}=e;n&&i(n,t)}function J(t){let{onScroll:n}=e;n&&i(n,t)}function ae(){var t;let{remote:n,multiple:r}=e;if(n){let{value:n}=j;if(r){let{valueField:r}=e;(t=te.value)==null||t.forEach(e=>{n.set(e[r],e)})}else{let t=L.value;t&&n.set(t[e.valueField],t)}}}function Y(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&i(n,t),r&&i(r,t),S.value=t}function X(){B.value||(Y(!0),S.value=!0,e.filterable&&Me())}function Z(){Y(!1)}function se(){f.value=``,g.value=A}let ce=G(!1);function le(){e.filterable&&(ce.value=!0)}function ue(){e.filterable&&(ce.value=!1,C.value||se())}function fe(){B.value||(C.value?e.filterable?Me():Z():X())}function pe(e){(D.value?.selfRef)?.contains(e.relatedTarget)||(d.value=!1,U(e),Z())}function me(e){K(e),d.value=!0}function he(){d.value=!0}function ve(e){T.value?.$el.contains(e.relatedTarget)||(d.value=!1,U(e),Z())}function be(){var e;(e=T.value)==null||e.focus(),Z()}function xe(e){C.value&&(T.value?.$el.contains(l(e))||Z())}function Se(t){if(!Array.isArray(t))return[];if(N.value)return Array.from(t);{let{remote:n}=e,{value:r}=x;if(n){let{value:e}=j;return t.filter(t=>r.has(t)||e.has(t))}else return t.filter(e=>r.has(e))}}function Te(e){Q(e.rawNode)}function Q(t){if(B.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=g,t=e[0]||null;if(t){let e=m.value;e.length?e.push(t):m.value=[t],g.value=A}}if(r&&j.value.set(t[a],t),e.multiple){let e=Se(u.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Ee(t[a]);~e&&(m.value.splice(e,1),i&&(f.value=``))}}else e.push(t[a]),i&&(f.value=``);H(e,F(e))}else{if(n&&!r){let e=Ee(t[a]);~e?m.value=[m.value[e]]:m.value=A}je(),Z(),H(t[a],t)}}function Ee(t){return m.value.findIndex(n=>n[e.valueField]===t)}function $(t){C.value||X();let{value:n}=t.target;f.value=n;let{tag:r,remote:i}=e;if(q(n),r&&!i){if(!n){g.value=A;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;p.value.some(e=>e[i]===r[i]||e[a]===r[a])||m.value.some(e=>e[i]===r[i]||e[a]===r[a])?g.value=A:g.value=[r]}}function De(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Z(),r&&!i&&a&&(m.value=A),W(),n?H([],[]):H(null,null)}function Oe(e){!ie(e,`action`)&&!ie(e,`empty`)&&!ie(e,`header`)&&e.preventDefault()}function ke(e){J(e)}function Ae(t){var n,r,i;if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!T.value?.isComposing){if(C.value){let t=D.value?.getPendingTmNode();t?Te(t):e.filterable||(Z(),je())}else if(X(),e.tag&&ce.value){let t=g.value[0];if(t){let n=t[e.valueField],{value:r}=u;e.multiple&&Array.isArray(r)&&r.includes(n)||Q(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;C.value&&((n=D.value)==null||n.prev());break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;C.value?(r=D.value)==null||r.next():X();break;case`Escape`:C.value&&(ye(t),Z()),(i=T.value)==null||i.focus();break}}function je(){var e;(e=T.value)==null||e.focus()}function Me(){var e;(e=T.value)==null||e.focusInput()}function Ne(){var e;C.value&&((e=E.value)==null||e.syncPosition())}ae(),w(M(e,`options`),ae);let Pe={focus:()=>{var e;(e=T.value)==null||e.focus()},focusInput:()=>{var e;(e=T.value)==null||e.focusInput()},blur:()=>{var e;(e=T.value)==null||e.blur()},blurInput:()=>{var e;(e=T.value)==null||e.blurInput()}},Fe=I(()=>{let{self:{menuBoxShadow:e}}=s.value;return{"--n-menu-box-shadow":e}}),Ie=a?ee(`select`,void 0,Fe,e):void 0;return Object.assign(Object.assign({},Pe),{mergedStatus:re,mergedClsPrefix:t,mergedBordered:n,namespace:r,treeMate:b,isMounted:h(),triggerRef:T,menuRef:D,pattern:f,uncontrolledShow:S,mergedShow:C,adjustedTo:de(e),uncontrolledValue:c,mergedValue:u,followerRef:E,localizedPlaceholder:k,selectedOption:L,selectedOptions:te,mergedSize:ne,mergedDisabled:B,focused:d,activeWithoutMenuOpen:ce,inlineThemeDisabled:a,onTriggerInputFocus:le,onTriggerInputBlur:ue,handleTriggerOrMenuResize:Ne,handleMenuFocus:he,handleMenuBlur:ve,handleMenuTabOut:be,handleTriggerClick:fe,handleToggle:Te,handleDeleteOption:Q,handlePatternInput:$,handleClear:De,handleTriggerBlur:pe,handleTriggerFocus:me,handleKeydown:Ae,handleMenuAfterLeave:se,handleMenuClickOutside:xe,handleMenuScroll:ke,handleMenuKeydown:Ae,handleMenuMousedown:Oe,mergedTheme:s,cssVars:a?void 0:Fe,themeClass:Ie?.themeClass,onRender:Ie?.onRender})},render(){return C(`div`,{class:`${this.mergedClsPrefix}-select`},C(ce,null,{default:()=>[C(pe,null,{default:()=>C(Qe,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e;return[(e=this.$slots).arrow?.call(e)]}})}),C(ue,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===de.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{default:()=>C(L,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e;return this.mergedShow||this.displayDirective===`show`?((e=this.onRender)==null||e.call(this),f(C(Xe,Object.assign({},this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,this.menuProps?.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[this.menuProps?.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var e;return[(e=this.$slots).empty?.call(e)]},header:()=>{var e;return[(e=this.$slots).header?.call(e)]},action:()=>{var e;return[(e=this.$slots).action?.call(e)]}}),this.displayDirective===`show`?[[U,this.mergedShow],[Z,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[Z,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});export{Xe as a,Le as c,nt as i,ut as n,Ge as o,ot as r,Be as s,ft as t};