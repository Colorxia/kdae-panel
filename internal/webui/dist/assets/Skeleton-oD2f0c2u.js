import{A as e,At as t,Cn as n,Dn as r,Kt as i,Qt as a,Ut as o,b as s,ft as c,ln as l,pn as u,qt as d,xn as f}from"./client-afectMo_.js";import{n as p}from"./misc-DDs3MKLt.js";var m=!1;function h(){if(t&&window.CSS&&!m&&(m=!0,`registerProperty`in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function g(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var _={name:`Skeleton`,common:s,self:g},v=i([d(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),i(`@keyframes skeleton-loading`,`
 0% {
 background: var(--n-color-start);
 }
 40% {
 background: var(--n-color-end);
 }
 80% {
 background: var(--n-color-start);
 }
 100% {
 background: var(--n-color-start);
 }
 `)]),y=f({name:`Skeleton`,inheritAttrs:!1,props:Object.assign(Object.assign({},e.props),{text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}}),setup(t){h();let{mergedClsPrefixRef:n,mergedComponentPropsRef:r}=c(t),i=u(()=>t.size||r?.value?.Skeleton?.size),s=e(`Skeleton`,`-skeleton`,v,_,t,n);return{mergedClsPrefix:n,style:u(()=>{let e=s.value,{common:{cubicBezierEaseInOut:n}}=e,r=e.self,{color:c,colorEnd:l,borderRadius:u}=r,d,{circle:f,sharp:p,round:m,width:h,height:g,text:_,animated:v}=t,y=i.value;y!==void 0&&(d=r[a(`height`,y)]);let b=f?h??g??d:h,x=(f?h??g:g)??d;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:f?`50%`:m?`4096px`:p?``:u,width:typeof b==`number`?o(b):b,height:typeof x==`number`?o(x):x,animation:v?``:`none`,"--n-bezier":n,"--n-color-start":c,"--n-color-end":l}})}},render(){let{repeat:e,style:t,mergedClsPrefix:i,$attrs:a}=this,o=n(`div`,r({class:`${i}-skeleton`,style:t},a));return e>1?n(l,null,p(e,null).map(e=>[o,`
`])):o}});export{y as t};