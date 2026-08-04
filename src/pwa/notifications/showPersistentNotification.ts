type PersistentNotificationOptions = {
  title: string;
  body: string;
  tag?: string;
};

export async function showPersistentNotification({
  title,
  body,
  tag = "taskflow-local-notification",
}: PersistentNotificationOptions) {
  if (!("serviceWorker" in navigator)) {
    throw new Error("El navegador no admite service workers.");
  }

  const registration = await navigator.serviceWorker.ready;

  await registration.showNotification(title, {
    body,
    icon: "/icons/taskflow-192.png",
    badge: "/icons/taskflow-192.png",
    tag,
  });
}
