self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  // Basic fetch event listener to satisfy PWA requirements
  event.respondWith(fetch(event.request).catch(() => new Response("Offline")));
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'CareLens Reminder';
  const options = {
    body: data.body || 'You have a new preventive care recommendation.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
