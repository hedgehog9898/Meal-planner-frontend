import type { UseFetchOptions } from '#app';
import { defu } from 'defu';
import { $fetch, type FetchOptions } from 'ofetch';

export async function useIFetch<T>(
    url: string,
    options: FetchOptions<any> = {}
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

    return $fetch(url, params);
}