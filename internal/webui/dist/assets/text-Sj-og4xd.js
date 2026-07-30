import{$t as e,Cn as t,Dn as n,Jt as r,Tn as i,Un as a,Zt as o,ft as s,hn as c,j as l,l as u,pt as d,u as f,wt as p}from"./client-DVlvm8qj.js";function m(e,t){return a(e,e=>{e!==void 0&&(t.value=e)}),c(()=>e.value===void 0?t.value:e.value)}function h(e,t){return c(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var g=/^(\d|\.)+$/,_=/(\d|\.)+/;function v(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}else if(typeof e==`string`)if(g.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}else{let r=_.exec(e);return r?e.replace(_,String((Number(r[0])+n)*t)):e}return e}function y(){let e=n(f,null);return e===null&&p(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}var b=r(`text`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[o(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),o(`italic`,{fontStyle:`italic`}),o(`underline`,{textDecoration:`underline`}),o(`code`,`
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]),x=t({name:`Text`,props:Object.assign(Object.assign({},l.props),{code:Boolean,type:{type:String,default:`default`},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}}),setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=d(t),i=l(`Typography`,`-text`,b,u,t,n),a=c(()=>{let{depth:n,type:r}=t,a=r==="default"?n===void 0?`textColor`:`textColor${n}Depth`:e(`textColor`,r),{common:{fontWeightStrong:o,fontFamilyMono:s,cubicBezierEaseInOut:c},self:{codeTextColor:l,codeBorderRadius:u,codeColor:d,codeBorder:f,[a]:p}}=i.value;return{"--n-bezier":c,"--n-text-color":p,"--n-font-weight-strong":o,"--n-font-famliy-mono":s,"--n-code-border-radius":u,"--n-code-text-color":l,"--n-code-color":d,"--n-code-border":f}}),o=r?s(`text`,c(()=>`${t.type[0]}${t.depth||``}`),a,t):void 0;return{mergedClsPrefix:n,compitableTag:h(t,[`as`,`tag`]),cssVars:r?void 0:a,themeClass:o?.themeClass,onRender:o?.onRender}},render(){var e,t;let{mergedClsPrefix:n}=this;(e=this.onRender)==null||e.call(this);let r=[`${n}-text`,this.themeClass,{[`${n}-text--code`]:this.code,[`${n}-text--delete`]:this.delete,[`${n}-text--strong`]:this.strong,[`${n}-text--italic`]:this.italic,[`${n}-text--underline`]:this.underline}],a=(t=this.$slots).default?.call(t);return this.code?i(`code`,{class:r,style:this.cssVars},this.delete?i(`del`,null,a):a):this.delete?i(`del`,{class:r,style:this.cssVars},a):i(this.compitableTag||`span`,{class:r,style:this.cssVars},a)}});export{m as a,h as i,y as n,v as r,x as t};