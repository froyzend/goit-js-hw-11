import{i,S as m}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const f="45704413-78352b289562c0261d4e7c072",d="https://pixabay.com/api/";function p(t){const o=new URLSearchParams({key:f,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${d}?${o}`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})}function g(t){t.insertAdjacentHTML("afterbegin",'<span class="loader"></span>')}function h(){const t=document.querySelector(".loader");t&&t.remove()}function y(t){return t.hits.map(({webformatURL:o,largeImageURL:s,tags:n,likes:e,views:r,comments:a,downloads:u})=>`
            <li class="gallery-item hvr-grow">
              <a class="gallery-link" href="${s}">
                <img
                  class="gallery-image"
                  src="${o}"
                  alt="${n}"
                  loading="lazy"
              /></a>
              <ul class="img-content-wrapper">
                <li class="img-content-descr">Likes<span>${e}</span></li>
                <li class="img-content-descr">Views<span>${r}</span></li>
                <li class="img-content-descr">Comments<span>${a}</span></li>
                <li class="img-content-descr">Downloads<span>${u}</span></li>
              </ul>
            </li>
      `).join("")}const L=document.querySelector(".search-form"),c=document.querySelector(".gallery");let l=null;L.addEventListener("submit",b);function b(t){t.preventDefault();const o=new FormData(t.target),{searchQuery:s}=Object.fromEntries(o.entries()),n=s.trim();if(!n){i.error({title:"Error",message:"The search query is empty.",position:"topRight"});return}c.innerHTML="",g(c),l&&l.destroy(),p(n).then(e=>{if(e.hits.length===0){i.info({position:"topRight",title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"});return}const r=y(e);c.insertAdjacentHTML("beforeend",r),l=new m(".gallery a",{captionsData:"alt",captionDelay:250})}).catch(e=>{console.error("Помилка:",e),i.error({title:"Error",message:`Error: ${e.message}`,position:"topRight"})}).finally(()=>{h()})}
//# sourceMappingURL=index.js.map
