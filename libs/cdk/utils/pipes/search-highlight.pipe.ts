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
        value = escape(value);
        let result: string = value;
        if (value && active && matches) {
            if (Array.isArray(matches)) {
                matches.forEach((match) => {
                    const matchingString = value.substring(match[0], match[1] + 1);
                    result = result.replace(matchingString, '<strong>' + matchingString + '</strong>');
                });
            } else if (typeof matches === 'string') {
                const testStr: string = escape(matches.trim().toLowerCase());
                const startIndex = value.toLowerCase().indexOf(testStr);
                if (startIndex !== -1) {
                    const matchingString = value.substring(startIndex, startIndex + testStr.length);
                    result = value.replace(matchingString, '<strong>' + matchingString + '</strong>');
                }
            }
        }
        if (includeSpans) {
            result = '<span>' + result + '</span>';
        }
        return result;
    }
}
