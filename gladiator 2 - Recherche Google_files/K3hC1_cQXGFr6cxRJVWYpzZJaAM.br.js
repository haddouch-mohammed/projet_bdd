(function(){function e(){var t,r;n&&(n.value.length>0?(t=Lib===null||Lib===void 0?void 0:Lib.CssClass)===null||t===void 0?void 0:t.add(sj_b,i):(r=Lib===null||Lib===void 0?void 0:Lib.CssClass)===null||r===void 0?void 0:r.remove(sj_b,i))}function o(t){var e,o;n.value="";n.innerText="";u&&f&&(u.innerText="",f.classList.remove("nudgeVisible"));(e=Lib===null||Lib===void 0?void 0:Lib.CssClass)===null||e===void 0?void 0:e.remove(sj_b,i);sj_log("CI.XButton","Clicked","1");r&&((o=Lib===null||Lib===void 0?void 0:Lib.CssClass)===null||o===void 0?void 0:o.add(r,"b_focus"));n.focus();n.click();t&&(t.preventDefault(),t.stopPropagation())}var r=_ge("b_header"),n=_ge("sb_form_q"),t=_ge("sb_clt"),u=_qs(".qfc.b_searchbox .ghost"),f=_qs(".qfc.b_searchbox .nudge"),i="b_sbText";n&&t&&(sj_be(t,"click",o),sj_be(t,"keydown",function(n){var t=n.code||n.key;t==="Enter"&&o(n)}),sj_be(n,"keyup",e),e())})()