import { Pipe, PipeTransform } from '@angular/core';
import { escape } from '../functions/lodash-utils';

@Pipe({
    name: 'highlight',
    standalone: true
})
export class SearchHighlightPipe implements PipeTransform {
    /** Highlight search term in string. */
    transform(
        value: string,
        matches: string | Array<[number, number]>,
        active: boolean = true,
        includeSpans: boolean = false
    ): string {
        const rawValue = String(value);
        value = escape(value);
        let result: string = value;
        if (value && active && matches) {
            if (Array.isArray(matches)) {
                matches.forEach((match) => {
                    const matchingString = value.substring(match[0], match[1] + 1);
                    result = result.replace(matchingString, '<strong>' + matchingString + '</strong>');
                });
            } else if (typeof matches === 'string') {
                // Search in the original text and escape each part separately, so that the term
                // never matches inside an escaped character such as "&amp;" or "&lt;".
                const testStr: string = matches.trim().toLowerCase();
                const startIndex = rawValue.toLowerCase().indexOf(testStr);
                if (startIndex !== -1) {
                    const endIndex = startIndex + testStr.length;
                    result =
                        escape(rawValue.substring(0, startIndex)) +
                        '<strong>' +
                        escape(rawValue.substring(startIndex, endIndex)) +
                        '</strong>' +
                        escape(rawValue.substring(endIndex));
                }
            }
        }
        if (includeSpans) {
            result = '<span>' + result + '</span>';
        }
        return result;
    }
}
