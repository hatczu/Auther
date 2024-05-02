export default defineNuxtRouteMiddleware((to, from) => {
  let isLoggedIn = false;
  if (process.client) {
    const token = localStorage.getItem('token');
    isLoggedIn = !!token;
  }

  const userPath = ["/user/home", "/user/account", "/user/settings"];

  if (to.path === '/login' && isLoggedIn) {
    return navigateTo('/user/home');
  }

  if (userPath.includes(to.path) && !isLoggedIn) {
    return navigateTo("/login");
  }
});
