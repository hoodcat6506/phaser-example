import './game';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('src/service_worker.js').then(() => {
    console.log('Service Worker Registered');
  }).catch((error) => {
    console.log('Service Worker Registration Failed', error);
  });
}
