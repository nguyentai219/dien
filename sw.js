const CACHE_NAME = 'dien-v3';
const assets = ['./', './index.html', './manifest.json', './icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
  self.skipWaiting();
});

// Chỉ xoá cache CŨ CỦA APP NÀY (tiền tố riêng) — bộ nhớ cache dùng chung cả tên miền
// nguyentai219.github.io, xoá hết sẽ làm mất bản offline của các app khác (Mủ Cao Su, Quản Lý Heo...).
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('dien-') && k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

