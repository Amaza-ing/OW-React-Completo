import {
  getMessaging,
  isSupported,
  onMessage,
  onRegistered,
  register,
} from "firebase/messaging";
import type { MessagePayload } from "firebase/messaging";
import { firebaseApp } from "./firebaseApp";

async function getMessagingClient() {
  const supported = await isSupported();

  if (!supported) {
    return null;
  }

  return getMessaging(firebaseApp);
}

function getFirebaseVapidKey() {
  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

  if (typeof vapidKey !== "string" || vapidKey.trim() === "") {
    throw new Error("Falta configurar VITE_FIREBASE_VAPID_KEY.");
  }

  return vapidKey;
}

export async function registerFirebaseMessaging() {
  const messaging = await getMessagingClient();

  if (messaging === null) {
    throw new Error("Firebase Messaging no está disponible en este navegador.");
  }

  await register(messaging, {
    vapidKey: getFirebaseVapidKey(),
  });
}

export async function listenToFirebaseRegistration(
  listener: (installationId: string) => void,
) {
  const messaging = await getMessagingClient();

  if (messaging === null) {
    return null;
  }

  return onRegistered(messaging, listener);
}

export async function listenToForegroundMessages(
  listener: (payload: MessagePayload) => void,
) {
  const messaging = await getMessagingClient();

  if (messaging === null) {
    return null;
  }

  return onMessage(messaging, listener);
}
