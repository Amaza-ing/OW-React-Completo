export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.info("[TaskFlow] El navegador no admite service workers.");

    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

    console.info("[TaskFlow] Service worker registrado.", registration);

    return registration;
  } catch (error) {
    console.error(
      "[TaskFlow] No se ha podido registrar el service worker.",
      error,
    );

    return null;
  }
}
