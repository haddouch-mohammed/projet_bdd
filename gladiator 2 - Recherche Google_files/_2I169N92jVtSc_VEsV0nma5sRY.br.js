(function(){function n(){var n=_ge("id_p"),t,r,i;n&&(t="",r="",n.dataset?(t=n.dataset.src,r=n.dataset.alt):(t=n.getAttribute("data-src"),r=n.getAttribute("data-alt")),t&&t!=""&&(n.onerror=function(){n.onerror=null;n.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";n.alt=""},n.onload=function(){n.alt=r},n.src=t,i=_d.getElementById("bp_shortcut_img"),i&&(i.setAttribute("src",t),i.onerror=function(){i.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=")})))}n()})()