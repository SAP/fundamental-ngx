interface StringKey<T> {
    [key: string]: T;
}

interface SanitizeWrapper {
    iframe: HTMLIFrameElement | null;
    iframeDoc: Document | null;
}

export class HtmlSanitizer {
    tagWhitelist: StringKey<boolean> = {};
    attributeWhitelist: StringKey<string | boolean> = {};

    private _schemaWhiteList: string[] = ['http', 'https', 'ftp', 'mailto'];

    private _uriAttributes: StringKey<boolean> = {
        href: true
    };

    private _safeWrapper?: SanitizeWrapper = {
        iframe: null,
        iframeDoc: null
    };

    constructor() {
        this.extendTags();
    }

    get defTagWhitelist(): StringKey<boolean> {
        return {
            A: true,
            ABBR: true,
            BLOCKQUOTE: true,
            BR: true,
            CITE: true,
            CODE: true,
            DL: true,
            DT: true,
            DD: true,
            EM: true,
            H1: true,
            H2: true,
            H3: true,
            H4: true,
            H5: true,
            H6: true,
            P: true,
            PRE: true,
            STRONG: true,
            SPAN: true,
            U: true,
            UL: true,
            OL: true,
            LI: true
        };
    }

    get defAttributeWhitelist(): StringKey<string | boolean> {
        return {
            class: true,
            style: true,
            href: true,
            target: '_blank',
            download: true,
            hreflang: true,
            rel: true,
            type: true,
            title: true
        };
    }

    extendTags(customTags?: StringKey<boolean | string>): void {
        this.tagWhitelist = { ...this.defTagWhitelist, ...customTags, BODY: true };
    }

    extendAttrs(customAttrs?: StringKey<boolean | string>): void {
        this.attributeWhitelist = { ...this.defAttributeWhitelist, ...customAttrs };
    }

    sanitizeHtml(input: string): string {
        input = input.trim();
        if (input.length === 0) {
            return '';
        }

        this._safeWrapper = this._getSafeWrapper();
        if (!this._safeWrapper) {
            return '';
        }

        this._safeWrapper.iframeDoc.body.innerHTML = input;

        const resultElement = this._makeSanitizedCopy(this._safeWrapper.iframeDoc.body);
        this._removeSafeWrapper();

        return resultElement.innerHTML;
    }

    private _makeSanitizedCopy(node: Node): HTMLElement {
        let newNode = node;
        if (node.nodeType === Node.TEXT_NODE) {
            newNode = node.cloneNode(true) as HTMLElement;
        } else if (node.nodeType === Node.ELEMENT_NODE && this.tagWhitelist[(node as HTMLElement).tagName]) {
            newNode = this._extendLinkTarget(this._implementTag(node as HTMLElement));
        } else {
            newNode = document.createDocumentFragment();
        }

        return newNode as HTMLElement;
    }

    private _implementTag(node: HTMLElement): HTMLElement {
        const newNode = this._safeWrapper.iframeDoc.createElement(node.tagName);

        for (const key in this.attributeWhitelist) {
            if (this.attributeWhitelist[key]) {
                const allowed = this.attributeWhitelist[key];
                const origin = node.getAttribute(key);

                if (key in node || key === 'class') {
                    if (this._uriAttributes[key] && this._validateBySchema(origin)) {
                        continue;
                    }
                    switch (typeof allowed) {
                        case 'string':
                            newNode.setAttribute(key, allowed);
                            break;
                        default:
                            if (allowed && origin) {
                                newNode.setAttribute(key, origin);
                            }
                    }
                }
            }
        }

        for (const child of Array.from(node.childNodes)) {
            const subCopy = this._makeSanitizedCopy(child);
            if (subCopy) {
                newNode.appendChild(subCopy);
            }
        }

        return newNode;
    }

    private _extendLinkTarget(node: HTMLElement): HTMLElement {
        if (node.tagName === 'A') {
            if (!node.getAttribute('href') || /^#/.test(node.getAttribute('href'))) {
                node.removeAttribute('target');
            } else {
                const defTarget = this.attributeWhitelist['target'] || '_blank';
                node.setAttribute('target', defTarget.toString());
            }
        }

        return node;
    }

    private _getSafeWrapper(): SanitizeWrapper {
        const iframe = document.createElement('iframe');
        if (iframe.sandbox === undefined) {
            console.warn('Your browser does not support sandboxed iframes. Please upgrade to a modern browser.');
            return null;
        }
        iframe.setAttribute('sandbox', 'allow-same-origin');
        iframe.style.setProperty('display', 'none');
        document.body.appendChild(iframe);
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc.body === null) {
            iframeDoc.write('<body></body>');
        }

        return { iframe: iframe, iframeDoc: iframeDoc };
    }

    private _removeSafeWrapper(): void {
        if (this._safeWrapper.iframe) {
            document.body.removeChild(this._safeWrapper.iframe);
        }
    }

    private _validateBySchema(value: string): boolean {
        return !!value && value.indexOf(':') > -1 && !this._startsWithAny(value, this._schemaWhiteList);
    }

    private _startsWithAny(str: string, substrings: string[]): boolean {
        return !!str && substrings.some((value) => str.indexOf(value) === 0);
    }
}
