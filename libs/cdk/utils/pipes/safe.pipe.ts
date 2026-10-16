import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'safe',
    standalone: true
})
export class SafePipe implements PipeTransform {
    /** @hidden */
    constructor(protected sanitizer: DomSanitizer) {}

    /** Sanitize HTML string. */
    public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);

            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);

            case 'script':
                return this.sanitizer.bypassSecurityTrustScript(value);

            case 'url': {
                if (!this._isSafeUrl(value)) {
                    return this.sanitizer.bypassSecurityTrustUrl('');
                }
                return this.sanitizer.bypassSecurityTrustUrl(value);
            }

            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);

            default:
                throw new Error(`Invalid safe type specified: ${type}`);
        }
    }

    /**
     * @hidden
     *
     * Browsers strip ASCII tab/newline characters from the whole URL before parsing, so a
     * value like `java\tscript:...` must not evade scheme detection. Any URL containing C0
     * control characters is rejected outright — legitimate URLs never contain them.
     */
    private _isSafeUrl(value: unknown): boolean {
        if (value == null) {
            return false;
        }
        const str = String(value).trim();
        if (str === '') {
            return true;
        }
        if (Array.from(str).some((ch) => ch.charCodeAt(0) < 32 || ch.charCodeAt(0) === 127)) {
            return false;
        }
        if (!/^[a-z][a-z0-9+.-]*:/i.test(str)) {
            return true;
        }
        return /^(https?|mailto|tel):/i.test(str);
    }
}
