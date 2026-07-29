import{$t as e,Jt as t,On as n,Sn as r,Wt as i,j as a,jt as o,mn as s,pt as c,qt as l,un as u,wn as d,x as f}from"./client-BNTVmNnN.js";import{n as p}from"./misc-DDs3MKLt.js";var m=!1;function h(){if(o&&window.CSS&&!m&&(m=!0,`registerProperty`in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:`--n-color-start`,syntax:`<color>`,inherits:!1,initialValue:`#0000`}),CSS.registerProperty({name:`--n-color-end`,syntax:`<color>`,inherits:!1,initialValue:`#0000`})}catch{}}function g(e){let{heightSmall:t,heightMedium:n,heightLarge:r,borderRadius:i}=e;return{color:`#eee`,colorEnd:`#ddd`,borderRadius:i,heightSmall:t,heightMedium:n,heightLarge:r}}var _={name:`Skeleton`,common:f,self:g},v=l([t(`skeleton`,`
 height: 1em;
 width: 100%;
 transition:
 --n-color-start .3s var(--n-bezier),
 --n-color-end .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
 background-color: var(--n-color-start);
 `),l(`@keyframes skeleton-loading`,`
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
 `)]),y=r({name:`Skeleton`,inheritAttrs:!1,props:Object.assign(Object.assign({},a.props),{text:Boolean,round:Boolean,circle:Boolean,height:[String,Number],width:[String,Number],size:String,repeat:{type:Number,default:1},animated:{type:Boolean,default:!0},sharp:{type:Boolean,default:!0}}),setup(t){h();let{mergedClsPrefixRef:n,mergedComponentPropsRef:r}=c(t),o=s(()=>t.size||r?.value?.Skeleton?.size),l=a(`Skeleton`,`-skeleton`,v,_,t,n);return{mergedClsPrefix:n,style:s(()=>{let n=l.value,{common:{cubicBezierEaseInOut:r}}=n,a=n.self,{color:s,colorEnd:c,borderRadius:u}=a,d,{circle:f,sharp:p,round:m,width:h,height:g,text:_,animated:v}=t,y=o.value;y!==void 0&&(d=a[e(`height`,y)]);let b=f?h??g??d:h,x=(f?h??g:g)??d;return{display:_?`inline-block`:``,verticalAlign:_?`-0.125em`:``,borderRadius:f?`50%`:m?`4096px`:p?``:u,width:typeof b==`number`?i(b):b,height:typeof x==`number`?i(x):x,animation:v?``:`none`,"--n-bezier":r,"--n-color-start":s,"--n-color-end":c}})}},render(){let{repeat:e,style:t,mergedClsPrefix:r,$attrs:i}=this,a=d(`div`,n({class:`${r}-skeleton`,style:t},i));return e>1?d(u,null,p(e,null).map(e=>[a,`
`])):a}});export{y as t};