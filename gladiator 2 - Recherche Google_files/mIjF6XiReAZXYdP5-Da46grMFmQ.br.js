"use strict";var WholePageTemplateDesignSystem;(function(n){var t;(function(t){var i;(function(t){var r={get:function(t){var r,u=i(t);if(n.Common.ValidationUtils.isNullOrUndefined(u))throw new n.Common.ErrorUtils.InvalidElementError;return(r=u.getAttribute("data-for-id"))!==null&&r!==void 0?r:""},set:function(){return}};t.props={className:n.Common.PropUtils.props.className,forId:r,hidden:n.Common.PropUtils.props.hidden};var i=function(t){return n.Common.ValidationUtils.isNullOrUndefined(t)||!n.Common.ValidationUtils.isHTMLElement(t)?null:t.hasAttribute("data-wptds-pagination-strip")?t:null},u=function(t){var u=i(t),f,r;return n.Common.ValidationUtils.isNullOrUndefined(u)?null:(f=n.Components.PaginationStrip.props.forId.get(u),r=document.querySelector('[data-wptds-carousel][id="'.concat(f,'"]')),n.Common.ValidationUtils.isNullOrUndefined(r)||!n.Common.ValidationUtils.isHTMLElement(r))?null:r},f=function(t,r){var u=i(t),f;n.Common.ValidationUtils.isNullOrUndefined(u)||n.Common.ValidationUtils.isNullOrUndefined(r)||(f=r.percentScrolled<0?0:r.percentScrolled>1?1:r.percentScrolled,u.style.setProperty("--wptds-pagination-strip-thumb-percent",f.toString()))},e=function(){var t=document.querySelectorAll("[data-wptds-pagination-strip]");t.forEach(function(t){var r=i(t),e=u(t);n.Common.ValidationUtils.isNullOrUndefined(r)||n.Common.ValidationUtils.isNullOrUndefined(e)||e.addEventListener("wptdscarouselscrollevent",function(t){n.Common.ValidationUtils.isNullOrUndefined(t)||t.detail.type==="percent"&&f(r,t.detail)})})};e()})(i=t.PaginationStrip||(t.PaginationStrip={}))})(t=n.Components||(n.Components={}))})(WholePageTemplateDesignSystem||(WholePageTemplateDesignSystem={}))