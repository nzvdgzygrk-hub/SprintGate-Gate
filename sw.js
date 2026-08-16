self.addEventListener('install',event=>{self.skipWaiting();});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('fk-sprintgate-gate-')).map(k=>caches.delete(k)));
    await self.registration.unregister();
    const clients=await self.clients.matchAll({type:'window'});
    for(const client of clients){try{await client.navigate(client.url);}catch(e){}}
  })());
});
// Absichtlich kein fetch-Handler: lokale SprintGate-Verbindungen müssen direkt
// vom sichtbaren Safari-Dokument ausgehen und dürfen nicht über einen Service Worker laufen.
