import{$t as e,C as t,Jt as n,S as r,Sn as i,Un as a,Wt as o,Zt as s,er as c,ft as l,in as u,j as d,mn as f,pt as p,qt as m,w as h,wn as g}from"./client-BNTVmNnN.js";import{i as _}from"./text-Dp6d97Hj.js";import{o as v}from"./index-krGuNh2y.js";var y=m([m(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),n(`spin-container`,`
 position: relative;
 `,[n(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[r()])]),n(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),n(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[s(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),n(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),n(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[s(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),b={small:20,medium:18,large:16},x=i({name:`Spin`,props:Object.assign(Object.assign(Object.assign({},d.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),h),slots:Object,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=p(t),i=d(`Spin`,`-spin`,y,v,t,n),s=f(()=>{let{size:n}=t,{common:{cubicBezierEaseInOut:r},self:a}=i.value,{opacitySpinning:s,color:c,textColor:l}=a;return{"--n-bezier":r,"--n-opacity-spinning":s,"--n-size":typeof n==`number`?o(n):a[e(`size`,n)],"--n-color":c,"--n-text-color":l}}),u=r?l(`spin`,f(()=>{let{size:e}=t;return typeof e==`number`?String(e):e[0]}),s,t):void 0,m=_(t,[`spinning`,`show`]),h=c(!1);return a(e=>{let n;if(m.value){let{delay:r}=t;if(r){n=window.setTimeout(()=>{h.value=!0},r),e(()=>{clearTimeout(n)});return}}h.value=m.value}),{mergedClsPrefix:n,active:h,mergedStrokeWidth:f(()=>{let{strokeWidth:e}=t;if(e!==void 0)return e;let{size:n}=t;return b[typeof n==`number`?`medium`:n]}),cssVars:r?void 0:s,themeClass:u?.themeClass,onRender:u?.onRender}},render(){var e;let{$slots:n,mergedClsPrefix:r,description:i}=this,a=n.icon&&this.rotate,o=(i||n.description)&&g(`div`,{class:`${r}-spin-description`},i||n.description?.call(n)),s=n.icon?g(`div`,{class:[`${r}-spin-body`,this.themeClass]},g(`div`,{class:[`${r}-spin`,a&&`${r}-spin--rotate`],style:n.default?``:this.cssVars},n.icon()),o):g(`div`,{class:[`${r}-spin-body`,this.themeClass]},g(t,{clsPrefix:r,style:n.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${r}-spin`}),o);return(e=this.onRender)==null||e.call(this),n.default?g(`div`,{class:[`${r}-spin-container`,this.themeClass],style:this.cssVars},g(`div`,{class:[`${r}-spin-content`,this.active&&`${r}-spin-content--spinning`,this.contentClass],style:this.contentStyle},n),g(u,{name:`fade-in-transition`},{default:()=>this.active?s:null})):s}});export{x as t};