// Allows IndexedDB storage to persist and not be wiped randomly at any time
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist();
}
