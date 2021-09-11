import { Modal, Toast } from 'antd-mobile';

const isHttps = document.location.protocol === 'https:'; // if pwa is true
const isPwa = true;

if (isPwa) {
  // Notify user if offline now
  window.addEventListener('sw.offline', () => {
    Toast.offline('当前处于离线状态');
  }); // Pop up a prompt on the page asking the user if they want to use the latest version

  window.addEventListener('sw.updated', (event: Event) => {
    const reloadSW = async () => {
      // Check if there is sw whose state is waiting in ServiceWorkerRegistration
      // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
      const e = event as CustomEvent;
      const worker = e.detail && e.detail.waiting;
      if (!worker) {
        return true;
      }

      // Send skip-waiting event to waiting SW with MessageChannel
      await new Promise((resolve, reject) => {
        const channel = new MessageChannel();

        channel.port1.onmessage = (msgEvent) => {
          if (msgEvent.data.error) {
            reject(msgEvent.data.error);
          } else {
            resolve(msgEvent.data);
          }
        };

        worker.postMessage({ type: 'skip-waiting' }, [channel.port2]);
      });

      // Refresh current page to use the updated HTML and other assets after SW has skiped waiting
      window.location.reload(true);
      return true;
    };

    Modal.alert('有新内容', '请点击“刷新”按钮或者手动刷新页面', [
      {
        text: '刷新',
        onPress: () => {
          reloadSW();
        },
      },
    ]);
  });
} else if ('serviceWorker' in navigator && isHttps) {
  // unregister service worker
  const { serviceWorker } = navigator;

  if (serviceWorker.getRegistrations) {
    serviceWorker.getRegistrations().then((sws) => {
      sws.forEach((sw) => {
        sw.unregister();
      });
    });
  }

  serviceWorker.getRegistration().then((sw) => {
    if (sw) sw.unregister();
  }); // remove all caches

  // @ts-ignore
  if (window.caches && window.caches.keys) {
    caches.keys().then((keys) => {
      keys.forEach((key) => {
        caches.delete(key);
      });
    });
  }
}
