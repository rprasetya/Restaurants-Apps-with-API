if(!self.define){let e,i={};const a=(a,r)=>(a=new URL(a+".js",r).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(r,d)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let s={};const c=e=>a(e,n),t={module:{uri:n},exports:s,require:c};i[n]=Promise.all(r.map((e=>t[e]||c(e)))).then((e=>(d(...e),s)))}}define(["./workbox-94c66d79"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"4a1a0bfcc3a53847a945.otf",revision:null},{url:"757b8ac8efa71be3fcd0.otf",revision:null},{url:"9048137056e4347dbbd5.otf",revision:null},{url:"91bf5c4a50c73e706c25.jpg",revision:null},{url:"9ffafeddf192e8c8a111.otf",revision:null},{url:"app.bundle.js",revision:"a929b7f8cf51e6a4bdc7f03d694952f2"},{url:"app.bundle.js.LICENSE.txt",revision:"580ff24120dc3b9ef60d2cf5a4c1e838"},{url:"app.webmanifest",revision:"d32aadc4d333a155172528603788770d"},{url:"data/DATA.json",revision:"ab0067c1caf3c486d84548b792705c5e"},{url:"detail.bundle.js",revision:"62c58580888bb05763266f76261f87a8"},{url:"detail.bundle.js.LICENSE.txt",revision:"580ff24120dc3b9ef60d2cf5a4c1e838"},{url:"detail.html",revision:"708a513de063f70bfc378577cc098d36"},{url:"fav.bundle.js",revision:"6ccd01252bde9298167fce0c6cb4d26a"},{url:"fav.bundle.js.LICENSE.txt",revision:"580ff24120dc3b9ef60d2cf5a4c1e838"},{url:"fav.html",revision:"a0ecb766ddfefc6bb54d09452c25aadc"},{url:"fonts/CircularStd-Black.otf",revision:"7f42d8488652eb250af2f484d377dbee"},{url:"fonts/CircularStd-Book.otf",revision:"6365c40aa59d462f1cc52ccce9635cb4"},{url:"fonts/CircularStd-Light.otf",revision:"0d87e6913e64a11189278400b4e0ed46"},{url:"fonts/CircularStd-Medium.otf",revision:"4fcdd97fadc3a1d9887f816f2aa67f1d"},{url:"icons/find-50.png",revision:"2a89b454ef0bea6915c21b197edd78a1"},{url:"images/heros/hero-image_1.jpg",revision:"a2f444d9e2e43a5d0373b1a0d8cb2236"},{url:"index.html",revision:"002762479d1a1aa7919444dc45218c1b"}],{}),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/list")),new e.StaleWhileRevalidate({cacheName:"list-api-response",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/detail/")),new e.StaleWhileRevalidate({cacheName:"restaurant-detail-api-response",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.match(/^https:\/\/restaurant-api\.dicoding\.dev\/images\/medium\/\d+$/)),new e.StaleWhileRevalidate({cacheName:"image-medium-api-response",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.match(/^https:\/\/restaurant-api\.dicoding\.dev\/images\/large\/\d+$/)),new e.StaleWhileRevalidate({cacheName:"large-image-api-response",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map
