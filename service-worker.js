const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/USDT-Flash/",
  "/USDT-Flash/index.html",
  "/USDT-Flash/style.css",
  "/USDT-Flash/script.js",
  "/USDT-Flash/icon-192x192.png",
  "/USDT-Flash/icon-512x512.png"
];

// Installationsphase: Cache initialisieren
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Abrufphase: Ressourcen aus dem Cache oder Netzwerk bereitstellen
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Aktualisieren des Caches, wenn eine neue Version bereitgestellt wird
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
