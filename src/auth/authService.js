const USER_KEY = "User";
const TOKEN_KEY = "Token";

export function saveUser(user) {
  localStorage.setItem(USER_KEY, user);
}
export function saveAccessToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

export function clearAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getUser() {
  return localStorage.getItem(USER_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getValidUser() {
  const user = getUser();
  const accessToken = getAccessToken();
  if (!user) return null;
  try {
    if (accessToken && accessToken * 1000 < Date.now()) {
      clearUser();
      clearAccessToken();
      return null;
    }
    return user;
  } catch (e) {
    clearUser();
    clearAccessToken();
    return null;
  }
}

export function getTokenUser() {
  const user = getValidUser();
  if (!user) return null;
  try {
    return user;
  } catch (e) {
    clearUser();
    clearAccessToken();
    return null;
  }
}
