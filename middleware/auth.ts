export default defineNuxtRouteMiddleware((to, from) => {
    if ( from.path === 'login' ) {
        return navigateTo(to.path);
    }
    const user = useStrapiUser()
    if (!user.value) {
        useCookie('redirect', { path: '/' }).value = to.fullPath
        return navigateTo('/login')
    }
})