import { isAbsoluteUrl, resolveUrl } from './url-utils';

/**
 * Attrs which values are urls or resource urls
 */
const sourceAttrs = [
    'href',
    'src',
    'srcset',
    'poster',
    'routerLink',
    'ng-reflect-router-link'
];

/**
 * Recursive DOM tree traversal function
 */
const walkDomTree = (elements: HTMLElement[], fn: Function) => {
    elements.forEach((element) => {
        fn.call(null, element);

        if (element.childNodes.length) {
            walkDomTree(Array.from(element.childNodes) as HTMLElement[], fn)
        }
    });
};

/**
 * Prepends a base url to an element attr
 */
const overrideElementSource = (element: HTMLElement, attr: string, url: string, baseUrl: string) => {
    if (!isAbsoluteUrl(url)) {
        const absoluteUrl = resolveUrl(baseUrl, url);
        element.setAttribute(attr, absoluteUrl)
    }
}

/**
 * Overrides all urls in `srcset` attr
 * From
 * <img src="avatar.jpg"
 *      srcset="avatar-320w.jpg 320w,
 *              avatar-480w.jpg 480w,
 *              avatar-800w.jpg 800w/>
 * To
 * <img src="http://localhost/avatar.jpg"
 *      srcset="http://localhost/avatar-320w.jpg 320w,
 *              http://localhost/avatar-480w.jpg 480w,
 *              http://localhost/avatar-800w.jpg 800w/>
 */
const overrideElementSrcsetSources = (element: HTMLElement, srcset: string, baseUrl: string) => {
    const overridedSrcset = [];

    for (const imgDescriptor of srcset.split(/,/)) {
        const [imgUrl, imgSize] = imgDescriptor.trim().split(/ +/g);

        if (!isAbsoluteUrl(imgUrl)) {
            const absoluteUrl = resolveUrl(baseUrl, imgUrl);
            const overridedImgDescriptor = `${absoluteUrl} ${imgSize.trim()}`;
            overridedSrcset.push(overridedImgDescriptor);
        } else {
            overridedSrcset.push(imgDescriptor);
        }
    }

    element.setAttribute('srcset', overridedSrcset.join(', '))
}

/**
 * Walks through DOM elements and replaces all relative links
 */
export const overrideElementUrls = (rootElement: HTMLElement, baseUrl: string) => {
    walkDomTree([rootElement], (element: HTMLElement) => {
        if (element.nodeType !== 1) {
            return;
        }

        sourceAttrs.forEach((attr) => {
            if (element.hasAttribute(attr)) {
                const currentUrl = element.getAttribute(attr).trim();

                if (attr === 'srcset') {
                    return overrideElementSrcsetSources(element, currentUrl, baseUrl);
                }

                overrideElementSource(element, attr, currentUrl, baseUrl);
            }
        });
    });
}

