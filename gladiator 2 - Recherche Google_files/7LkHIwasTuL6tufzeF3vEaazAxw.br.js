var pMMUtils=pMMUtils||{},MMUtilsQueryAndUrl;(function(n){function i(n,t){return r(_w.location.search,n,t)}function r(n,t,i){var f,u,r;if(n==null||(u="[&?]"+encodeURI(t)+"=([^&$]*)",f=typeof i=="boolean"&&i?new RegExp(u,"i"):new RegExp(u),r=n.match(f),!r))return null;try{return decodeURIComponent(r[1].replace(/\+/g,"%20"))}catch(e){return r[1]}}function t(n,t,i){if(n)try{var r=new URL(n);r.search||n.charAt(n.length-1)=="?"||(n+="?")}catch(u){}return typeof i!="undefined"&&t.length>0&&(typeof i!="string"||i.length>0)&&(n=n+"&"+t+"="+i),n}function u(n){return typeof sj_cook!="undefined"?n+"&sid="+(_G.SID||sj_cook.get("_SS","SID")):n}function f(n,t,i,r,u,f,e){var a=!1,s,h,o;if(!n||n.length<1)return null;if(n.indexOf("http://")==0||n.indexOf("https://")==0||n.indexOf("/")==0){var c=n.split("?"),y=c[c.length-1],v=[],l=y.split("&");for(h=0;h<l.length;h++)(o=l[h].split("="),o.length!=2||o[0]!="w"&&o[0]!="h"&&o[0]!="r")&&(o[0]=="c"&&(o[1]=="7"||o[1]=="0")&&(a=!0),v.push(l[h]));s=[(c.length>1?c[0]+"?":"")+v.join("&")]}else s=[f,"?id=",encodeURIComponent(n),"&pid=",e];return t&&(s.push("&w=",r,"&h=",u),i&&s.push("&r=0"),a||s.push("&p=0")),s.join("")}function e(n){return n?n.replace(/<script[\s|>](.)*<\/script>/gi,"").replace(/autoplay=1/gi,"autoplay=1&wmode=opaque").replace(/<param name="movie"/gi,'<param name="wmode" value="opaque"/><param name="movie"').replace(/<embed /gi,'<embed wmode="opaque" '):""}function o(){var n=i("testhooks");return!!n}function s(){for(var n,t,u,i=[],r=0;r<arguments.length;r++)i[r]=arguments[r];for(n=i[0],t=0;t<i.length-1;t++)u=new RegExp("\\{"+t+"\\}","gm"),n&&(n=n.replace(u,i[t+1]));return n}function h(n){if(n)try{return new URL(n).hostname}catch(t){}return n}function l(n,t,r){var u,e,f,o;if(t===void 0&&(t=c),r===void 0&&(r=[]),!n)return"";for(t=t.concat(r),u=[],e=0;e<t.length;e++)f=t[e],typeof f=="string"&&f.length>0&&(o=i(f,!1),o!==null&&u.push("&".concat(f,"=").concat(o)));return n.indexOf("?")===-1&&u.length>0&&(u[0]="?"+u[0].slice(1)),n+u.join("")}function a(n,i,r,u){var f=t(n,"IG",i);return f=t(f,"IID",r),t(f,"SFX",u)}function v(n,t){var u=[],f,i,e;for(f in t){if(i=t[f],!i||i.length==0)break;e=r(n,i);u.push({paramKey:i,paramVal:e})}return u}var c=["atlahostname","cdghostname","thhostname","testhooks","adlt","akamaithumb","safesearch","perf","mockimages","mobile","anid","isuserauth","uncrunched","clientid","currentdate","iss","features","setflight","addfeaturesnoexpansion","darkschemeovr","snrtrace","setapplicationendpoint","clientip","webthemedark"];n.ej=e;n.qsv=i;n.qsvfu=r;n.aup=t;n.isTest=o;n.sf=s;n.apsid=u;n.rtiu=f;n.ghn=h;n.app=l;n.tsu=a;n.fp=v;pMMUtils.ej=n.ej;pMMUtils.qsv=n.qsv;pMMUtils.qsvfu=n.qsvfu;pMMUtils.aup=n.aup;pMMUtils.isTest=n.isTest;pMMUtils.sf=n.sf;pMMUtils.apsid=n.apsid;pMMUtils.rtiu=n.rtiu;pMMUtils.ghn=n.ghn;pMMUtils.app=n.app;pMMUtils.tsu=n.tsu;pMMUtils.fp=n.fp})(MMUtilsQueryAndUrl||(MMUtilsQueryAndUrl={}))