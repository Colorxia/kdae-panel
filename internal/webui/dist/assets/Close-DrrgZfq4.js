import{Cn as e,E as t,Kt as n,O as r,Xt as i,Zt as a,j as o,qt as s,rr as c,xn as l}from"./client-afectMo_.js";var u=t(`close`,()=>e(`svg`,{viewBox:`0 0 12 12`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":!0},e(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},e(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},e(`path`,{d:`M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z`}))))),d=s(`base-close`,`
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`,[i(`absolute`,`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),n(`&::before`,`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),a(`disabled`,[n(`&:hover`,`
 color: var(--n-close-icon-color-hover);
 `),n(`&:hover::before`,`
 background-color: var(--n-close-color-hover);
 `),n(`&:focus::before`,`
 background-color: var(--n-close-color-hover);
 `),n(`&:active`,`
 color: var(--n-close-icon-color-pressed);
 `),n(`&:active::before`,`
 background-color: var(--n-close-color-pressed);
 `)]),i(`disabled`,`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),i(`round`,[n(`&::before`,`
 border-radius: 50%;
 `)])]),f=l({name:`BaseClose`,props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(t){return o(`-base-close`,d,c(t,`clsPrefix`)),()=>{let{clsPrefix:n,disabled:i,absolute:a,round:o,isButtonTag:s}=t;return e(s?`button`:`div`,{type:s?`button`:void 0,tabindex:i||!t.focusable?-1:0,"aria-disabled":i,"aria-label":`close`,role:s?void 0:`button`,disabled:i,class:[`${n}-base-close`,a&&`${n}-base-close--absolute`,i&&`${n}-base-close--disabled`,o&&`${n}-base-close--round`],onMousedown:e=>{t.focusable||e.preventDefault()},onClick:t.onClick},e(r,{clsPrefix:n},{default:()=>e(u,null)}))}}});export{f as t};