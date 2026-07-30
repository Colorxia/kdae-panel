import{$t as e,Cn as t,Jt as n,Tn as r,Wt as i,dn as a,hn as o,j as s,jt as c,kn as l,pt as u,qt as d,x as f}from"./client-DVlvm8qj.js";import{n as p}from"./misc-DDs3MKLt.js";var m=!1;function h(){if(c&&window.CSS&&!m&&(m=!0,`registerProperty`in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function g(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var _={name:`Skeleton`,common:f,self:g},v=d([n(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),d(`@keyframes skeleton-loading`,`
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
 `)]),y=t({name:`Skeleton`,inheritAttrs:!1,props:Object.assign(Object.assign({},s.props),{text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}}),setup(t){h();let{mergedClsPrefixRef:n,mergedComponentPropsRef:r}=u(t),a=o(()=>t.size||r?.value?.Skeleton?.size),c=s(`Skeleton`,`-skeleton`,v,_,t,n);return{mergedClsPrefix:n,style:o(()=>{let n=c.value,{common:{cubicBezierEaseInOut:r}}=n,o=n.self,{color:s,colorEnd:l,borderRadius:u}=o,d,{circle:f,sharp:p,round:m,width:h,height:g,text:_,animated:v}=t,y=a.value;y!==void 0&&(d=o[e(`height`,y)]);let b=f?h??g??d:h,x=(f?h??g:g)??d;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:f?`50%`:m?`4096px`:p?``:u,width:typeof b==`number`?i(b):b,height:typeof x==`number`?i(x):x,animation:v?``:`none`,"--n-bezier":r,"--n-color-start":s,"--n-color-end":l}})}},render(){let{repeat:e,style:t,mergedClsPrefix:n,$attrs:i}=this,o=r(`div`,l({class:`${n}-skeleton`,style:t},i));return e>1?r(a,null,p(e,null).map(e=>[o,`
`])):o}});export{y as t};