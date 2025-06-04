// Authentication Config
window.GET_USER = "/api/me";
window.LOGIN_URL = "/api/login";
window.LOGOUT_URL = "/api/logout";

window.userData = {
  is_authenticated: false
};

window.globalLock = { value: false };

window.withLock = async function(fn, lock = window.globalLock) {
  if (lock.value) return;

  lock.value = true;
  try {
    await Promise.resolve(fn());
  } finally {
    lock.value = false;
  }
};