var AnswerCardInstLogger;(function(){function i(n,t){const s=n.offsetHeight*n.offsetWidth;if(!s)return!1;if(n==t)return!0;var u=n.getBoundingClientRect(),f=t.getBoundingClientRect(),e=Math.max(u.left,f.left),o=Math.max(u.top,f.top),i=Math.min(u.right,f.right),r=Math.min(u.bottom,f.bottom);e=Math.max(e,0);o=Math.max(o,0);i=Math.min(i,sb_de.clientWidth);r=Math.min(r,sb_de.clientHeight);i=Math.max(e,i);r=Math.max(o,r);const h=(i-e)*(r-o);return h/s>.5}function r(){const r=t||f;if(r){const e=(u,f,e)=>{const o=["ARElementIndex",f,"ARElementOffsetTop",u.getBoundingClientRect().top-e.getBoundingClientRect().top,"ARElementOffsetLeft",u.getBoundingClientRect().left-e.getBoundingClientRect().left,"ARElementWidth",u.offsetWidth,"ARElementHeight",u.offsetHeight,"ARElementDisplayed",i(u,r),"ARElementKValue",u.dataset.k];Log.Log("Load",t?"GenSerp":"Magazine","ARElementLoad",!1,...o)},o=(t,i)=>{const r=["AnswerCardVisibleIndex",i,"AnswerCardKValue",t.dataset.k];Log.Log("Load","Magazine","AnswerCardLoad",!1,...r)},s=i=>{var r;sj_be(i,"mouseenter",()=>{r=setTimeout(()=>{Log.Log("Hover",t?"GenSerp":"Magazine","Show5sec",!1,"AppNS","SERP","K",i.dataset.k)},5e3)});sj_be(i,"mouseleave",()=>{clearTimeout(r)})};e(r,0,r);const h=Array.prototype.slice.call(_d.querySelectorAll(".gs_temp"));h.forEach((n,t)=>{e(n,t,r);const i=n,u=Array.prototype.slice.call(i.querySelectorAll(".gs_card_ans"));u.forEach((n,t)=>{e(n,t,i),s(n)})});var u=Array.prototype.slice.call(r.querySelectorAll(".b_wpt_bl"));u.forEach((n,t)=>{e(n,t,r),s(n)});u=u.filter(n=>i(n,r));u.sort((n,t)=>n.offsetTop-t.offsetTop);u.forEach((n,t)=>{o(n,t)});u=Array.prototype.slice.call(r.querySelectorAll(".cards"));u.forEach((n,t)=>{e(n,t,r),o(n,t)})}}const n="ac",u=sb_de.dir=="rtl"?"right":"left",t=_ge("b_genserp_container"),f=_ge("b_wpt_container");_w._enableAjaxTemplates?_w.sj_evt&&sj_evt.bind("wptajaxgenserp_complete",r,!0):r()})(AnswerCardInstLogger||(AnswerCardInstLogger={}))