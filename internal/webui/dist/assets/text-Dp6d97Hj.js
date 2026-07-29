import{$t as e,En as t,Hn as n,Jt as r,Sn as i,Zt as a,ft as o,j as s,l as c,mn as l,pt as u,u as d,wn as f,wt as p}from"./client-BNTVmNnN.js";function m(e,t){return n(e,e=>{e!==void 0&&(t.value=e)}),l(()=>e.value===void 0?t.value:e.value)}function h(e,t){return l(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var g=/^(\d|\.)+$/,_=/(\d|\.)+/;function v(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}else if(typeof e==`string`)if(g.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}else{let r=_.exec(e);return r?e.replace(_,String((Number(r[0])+n)*t)):e}return e}function y(){let e=t(d,null);return e===null&&p(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}var b=r(`text`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[a(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),a(`italic`,{fontStyle:`italic`}),a(`underline`,{textDecoration:`underline`}),a(`code`,`
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
 `)]),x=i({name:`Text`,props:Object.assign(Object.assign({},s.props),{code:Boolean,type:{type:String,default:`default`},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}}),setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=u(t),i=s(`Typography`,`-text`,b,c,t,n),a=l(()=>{let{depth:n,type:r}=t,a=r==="default"?n===void 0?`textColor`:`textColor${n}Depth`:e(`textColor`,r),{common:{fontWeightStrong:o,fontFamilyMono:s,cubicBezierEaseInOut:c},self:{codeTextColor:l,codeBorderRadius:u,codeColor:d,codeBorder:f,[a]:p}}=i.value;return{"--n-bezier":c,"--n-text-color":p,"--n-font-weight-strong":o,"--n-font-famliy-mono":s,"--n-code-border-radius":u,"--n-code-text-color":l,"--n-code-color":d,"--n-code-border":f}}),d=r?o(`text`,l(()=>`${t.type[0]}${t.depth||``}`),a,t):void 0;return{mergedClsPrefix:n,compitableTag:h(t,[`as`,`tag`]),cssVars:r?void 0:a,themeClass:d?.themeClass,onRender:d?.onRender}},render(){var e,t;let{mergedClsPrefix:n}=this;(e=this.onRender)==null||e.call(this);let r=[`${n}-text`,this.themeClass,{[`${n}-text--code`]:this.code,[`${n}-text--delete`]:this.delete,[`${n}-text--strong`]:this.strong,[`${n}-text--italic`]:this.italic,[`${n}-text--underline`]:this.underline}],i=(t=this.$slots).default?.call(t);return this.code?f(`code`,{class:r,style:this.cssVars},this.delete?f(`del`,null,i):i):this.delete?f(`del`,{class:r,style:this.cssVars},i):f(this.compitableTag||`span`,{class:r,style:this.cssVars},i)}});export{m as a,h as i,y as n,v as r,x as t};