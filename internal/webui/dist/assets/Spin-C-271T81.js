import{$t as e,C as t,Cn as n,Jt as r,S as i,Tn as a,Wn as o,Wt as s,Zt as c,ft as l,hn as u,in as d,j as f,pt as p,qt as m,tr as h,w as g}from"./client-DVlvm8qj.js";import{i as _}from"./text-Sj-og4xd.js";import{s as v}from"./index-BvW3qXdO.js";var y=m([m(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),r(`spin-container`,`
 position: relative;
 `,[r(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[i()])]),r(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),r(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[c(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),r(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),r(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[c(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),b={small:20,medium:18,large:16},x=n({name:`Spin`,props:Object.assign(Object.assign(Object.assign({},f.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),g),slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=p(t),i=f(`Spin`,`-spin`,y,v,t,n),a=u(()=>{let{size:n}=t,{common:{cubicBezierEaseInOut:r},self:a}=i.value,{opacitySpinning:o,color:c,textColor:l}=a;return{"--n-bezier":r,"--n-opacity-spinning":o,"--n-size":typeof n==`number`?s(n):a[e(`size`,n)],"--n-color":c,"--n-text-color":l}}),c=r?l(`spin`,u(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),a,t):void 0,d=_(t,[`spinning`,`show`]),m=h(!1);return o(e=>{let n;if(d.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{m.value=!0},r),e(()=>{clearTimeout(n)});return}}m.value=d.value}),{mergedClsPrefix:n,active:m,mergedStrokeWidth:u(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return b[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:a,themeClass:c?.themeClass,onRender:c?.onRender}},render(){var e;let{$slots:n,mergedClsPrefix:r,description:i}=this,o=n.icon&&this.rotate,s=(i||n.description)&&a(`div`,{class:`${r}-spin-description`},i||n.description?.call(n)),c=n.icon?a(`div`,{class:[`${r}-spin-body`,this.themeClass]},a(`div`,{class:[`${r}-spin`,o&&`${r}-spin--rotate`],style:n.default?``:this.cssVars},n.icon()),s):a(`div`,{class:[`${r}-spin-body`,this.themeClass]},a(t,{clsPrefix:r,style:n.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${r}-spin`}),s);return(e=this.onRender)==null||e.call(this),n.default?a(`div`,{class:[`${r}-spin-container`,this.themeClass],style:this.cssVars},a(`div`,{class:[`${r}-spin-content`,this.active&&`${r}-spin-content--spinning`,this.contentClass],style:this.contentStyle},n),a(d,{name:`fade-in-transition`},{default:()=>this.active?c:null})):c}});export{x as t};