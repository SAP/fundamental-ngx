/**
 *
 * Get 'http://localhost:4203/'  from 'http://localhost:4203/remoteEntry.js'
 */
export const getBaseUrl = (uri: string): string => {
    return new URL('/', uri).href;
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
export const isAbsoluteUrl = (uri: string): boolean => {
    // checks http(s):// only
    return /^https?:\/\//i.test(uri);
}

/**
 *
 * @param elements
 * @param fn
 */
export const walkDomTree = (elements: HTMLElement[], fn: Function) => {
    elements.forEach((element) => {
        fn.call(null, element);

        if (element.childNodes.length) {
            walkDomTree(Array.from(element.childNodes) as HTMLElement[], fn)
        }
    });
};
