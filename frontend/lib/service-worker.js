export function registerServiceWorker() {
  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    navigator.serviceWorker
      .register(`${BASENAME}/service-worker.js`)
      .then(() => {
        console.log("Service worker is registered");
      })
      .catch(err => {
        console.error(err);
      });
  }
}
