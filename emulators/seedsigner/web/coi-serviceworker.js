/*! coi-serviceworker v0.1.7 - Guido Zuidhof, licensed under MIT */
// Enables SharedArrayBuffer on static hosting (GitHub Pages) by adding
// Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers
// via a service worker.
if(typeof window==='undefined'){
  // Service worker
  self.addEventListener("install",()=>self.skipWaiting());
  self.addEventListener("activate",(e)=>e.waitUntil(self.clients.claim()));
  self.addEventListener("fetch",(e)=>{
    if(e.request.cache==="only-if-cached"&&e.request.mode!=="same-origin")return;
    e.respondWith(fetch(e.request).then((r)=>{
      if(r.status===0)return r;
      const headers=new Headers(r.headers);
      headers.set("Cross-Origin-Embedder-Policy","credentialless");
      headers.set("Cross-Origin-Opener-Policy","same-origin");
      return new Response(r.body,{status:r.status,statusText:r.statusText,headers});
    }).catch((err)=>console.error(err)));
  });
}else{
  // Window context — register the service worker
  const reloadedByCOI=window.sessionStorage.getItem("coiReloadedByCOI");
  window.sessionStorage.removeItem("coiReloadedByCOI");
  const coiCheck=()=>{
    const coiAvailable=window.crossOriginIsolated||window.SharedArrayBuffer;
    if(coiAvailable){console.log("Cross-origin isolated.");return}
    if(reloadedByCOI){console.warn("COI service worker failed to enable cross-origin isolation.");return}
    if(!window.isSecureContext){console.warn("COI requires a secure context (HTTPS).");return}
    navigator.serviceWorker.register(window.document.currentScript.src).then(
      (reg)=>{
        console.log("COI service worker registered, reloading...");
        window.sessionStorage.setItem("coiReloadedByCOI","true");
        reg.addEventListener("updatefound",()=>{
          const w=reg.installing;
          w.addEventListener("statechange",()=>{
            if(w.state==="activated")window.location.reload();
          });
        });
      },
      (err)=>console.error("COI registration failed:",err)
    );
  };
  if(window.crossOriginIsolated!==false)coiCheck();
  else window.addEventListener("load",coiCheck);
}
