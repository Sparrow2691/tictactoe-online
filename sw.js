const cacheName = 'tic-tac-toe-v1';
const assets = [
  './index.html',
  './style.css',
  './script.js',
  './click.mp3',
  './win.mp3',
  './tie.mp3',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
