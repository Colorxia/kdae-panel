import{A as e,Cn as t,Ct as n,Qt as r,Tn as i,Vn as a,Xt as o,c as s,dt as c,ft as l,l as u,pn as d,qt as f,xn as p}from"./client-afectMo_.js";function m(e,t){return a(e,e=>{e!==void 0&&(t.value=e)}),d(()=>e.value===void 0?t.value:e.value)}function h(e,t){return d(()=>{for(let n of t)if(e[n]!==void 0)return e[n];return e[t[t.length-1]]})}var g=/^(\d|\.)+$/,_=/(\d|\.)+/;function v(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}else if(typeof e==`string`)if(g.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}else{let r=_.exec(e);return r?e.replace(_,String((Number(r[0])+n)*t)):e}return e}function y(){let e=i(u,null);return e===null&&n(`use-message`,"No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}var b=f(`text`,`
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
 `)]),x=p({name:`Text`,props:Object.assign(Object.assign({},e.props),{code:Boolean,type:{type:String,default:`default`},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}}),setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:i}=l(t),a=e(`Typography`,`-text`,b,s,t,n),o=d(()=>{let{depth:e,type:n}=t,i=n==="default"?e===void 0?`textColor`:`textColor${e}Depth`:r(`textColor`,n),{common:{fontWeightStrong:o,fontFamilyMono:s,cubicBezierEaseInOut:c},self:{codeTextColor:l,codeBorderRadius:u,codeColor:d,codeBorder:f,[i]:p}}=a.value;return{"--n-bezier":c,"--n-text-color":p,"--n-font-weight-strong":o,"--n-font-famliy-mono":s,"--n-code-border-radius":u,"--n-code-text-color":l,"--n-code-color":d,"--n-code-border":f}}),u=i?c(`text`,d(()=>`${t.type[0]}${t.depth||``}`),o,t):void 0;return{mergedClsPrefix:n,compitableTag:h(t,[`as`,`tag`]),cssVars:i?void 0:o,themeClass:u?.themeClass,onRender:u?.onRender}},render(){var e,n;let{mergedClsPrefix:r}=this;(e=this.onRender)==null||e.call(this);let i=[`${r}-text`,this.themeClass,{[`${r}-text--code`]:this.code,[`${r}-text--delete`]:this.delete,[`${r}-text--strong`]:this.strong,[`${r}-text--italic`]:this.italic,[`${r}-text--underline`]:this.underline}],a=(n=this.$slots).default?.call(n);return this.code?t(`code`,{class:i,style:this.cssVars},this.delete?t(`del`,null,a):a):this.delete?t(`del`,{class:i,style:this.cssVars},a):t(this.compitableTag||`span`,{class:i,style:this.cssVars},a)}});export{m as a,h as i,y as n,v as r,x as t};