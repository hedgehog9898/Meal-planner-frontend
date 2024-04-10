import type { UseFetchOptions } from '#app';
import { defu } from 'defu';

export async function useIFetch<T>(
    url: string,
    options: UseFetchOptions<T> = {}
) {
    const accessTokenCookie = useCookie('accessToken');
    const config = useRuntimeConfig();

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.apiHost,
        key: url,
        headers: accessTokenCookie.value
            ? { Authorization: `Bearer ${accessTokenCookie.value}` }
            : {}
    };

    const params = defu(options, defaults);

    return useFetch(url, params);
}