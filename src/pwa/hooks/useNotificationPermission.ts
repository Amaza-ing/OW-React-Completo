import { useState } from "react";

export type NotificationPermissionState =
  | NotificationPermission
  | "unsupported";

function getInitialPermission(): NotificationPermissionState {
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    return "unsupported";
  }

  return Notification.permission;
}

export function useNotificationPermission() {
  const [permission, setPermission] =
    useState<NotificationPermissionState>(getInitialPermission);

  const requestPermission = async () => {
    if (permission === "unsupported") {
      return "unsupported" as const;
    }

    const nextPermission = await Notification.requestPermission();

    setPermission(nextPermission);

    return nextPermission;
  };

  return {
    permission,
    requestPermission,
  };
}
