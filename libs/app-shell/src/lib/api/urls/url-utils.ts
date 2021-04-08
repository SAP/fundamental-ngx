/**
 *
 * Get 'http://localhost:4203/'  from 'http://localhost:4203/remoteEntry.js'
 */
export const getBaseUrl = (url: string): string => {
    return new URL('/', url).href;
}

/**
 * ./assets/* and 'http://localhost:4203/' to 'http://localhost:4203/assets/*
 */
export const resolveUrl = (baseUrl: string, url: string) => {
    return new URL(url, baseUrl).href;
}

/**
 * Simplified version
 * This could be used: https://github.com/sindresorhus/is-absolute-url
 */
export const isAbsoluteUrl = (url: string): boolean => {
    // checks http(s):// only
    return /^https?:\/\//i.test(url);
}
