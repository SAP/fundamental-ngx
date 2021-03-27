import { Pipe, PipeTransform } from '@angular/core';
import { isAbsoluteUrl, resolveUrl } from './url-utils';

@Pipe({
    name: 'fdsUrlOverrider',
    pure: false
})
export class UrlOverriderPipe implements PipeTransform {
    public transform(url: string, baseUrl: string): string {
        if (typeof baseUrl !== 'string' || isAbsoluteUrl(url)) {
            return url;
        }

        return resolveUrl(baseUrl, url);
    }
}
