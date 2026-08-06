import { useEffect } from "react";

type NavigatorWithBadge = Navigator & {
  setAppBadge?: (contents?: number) => Promise<void>;
  clearAppBadge?: () => Promise<void>;
};

export function useAppBadge(count: number) {
  useEffect(() => {
    const badgeNavigator = navigator as NavigatorWithBadge;

    const updateBadge = async () => {
      try {
        if (count > 0) {
          await badgeNavigator.setAppBadge?.(count);
          return;
        }

        await badgeNavigator.clearAppBadge?.();
      } catch {
        // El badge es una mejora progresiva.
      }
    };

    void updateBadge();
  }, [count]);
}
