import { useSyncExternalStore } from "react";

/** Session-wide wishlist of saved property ids (a mock until persistence is
 *  wired). Kept in module state so every page shares the same list; starts
 *  empty on both server and client so SSR markup matches hydration. */
let savedIds: readonly string[] = [];
const ids = new Set<string>();
const listeners = new Set<() => void>();

const EMPTY_SNAPSHOT: readonly string[] = [];

function emitChange() {
  for (const listener of listeners) listener();
}

/** Adds or removes one property id, notifying subscribers. */
export function toggleWishlist(id: string) {
  if (ids.has(id)) ids.delete(id);
  else ids.add(id);
  savedIds = [...ids];
  emitChange();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return savedIds;
}

function getServerSnapshot() {
  return EMPTY_SNAPSHOT;
}

/** The reactive list of saved property ids. */
export function useWishlist() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
