import { Injectable } from '@angular/core';
import { isAbsoluteUrl, resolveUrl, walkDomTree } from './url-utils';

/**
 *  UrlDomOverriderService is responsible to traverse the whole component's DOM tree
 *  with prepending a base URL prefix to an every element with a relative URL source
 */
@Injectable({
    providedIn: 'root'
})
export class UrlDomOverriderService {
    /**
     * Attrs which values are urls or resource urls
     */
    public readonly sourceAttrs = [
        'href',
        'src',
        'srcset',
        'poster',
        'routerLink',
        'ng-reflect-router-link'
    ];

    /**
     * Walks through DOM elements and replaces all relative links
     */
    public override(rootElement: HTMLElement, baseUrl: string) {
        walkDomTree([rootElement], (element: HTMLElement) => {
            if (element.nodeType !== 1) {
                return;
            }

            this.sourceAttrs.forEach((attr) => {
                if (element.hasAttribute(attr)) {
                    const currentUrl = element.getAttribute(attr).trim();

                    if (attr === 'srcset') {
                        return this.overrideElementSrcsetSources(element, currentUrl, baseUrl);
                    }

                    this.overrideElementSource(element, attr, currentUrl, baseUrl);
                }
            });
        });
    }

    /**
     * Prepends a base url to an element
     */
    private overrideElementSource(element: HTMLElement, attr: string, url: string, baseUrl: string) {
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
    private overrideElementSrcsetSources(element: HTMLElement, srcset: string, baseUrl: string) {
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
}
