import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const QUERY_CACHE_MAX_AGE = 1000 * 60 * 60 * 24;

export const queryPersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: "taskflow.query-cache",
});
