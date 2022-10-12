import { Pipe, PipeTransform } from '@angular/core';
import escape from 'lodash-es/escape';

@Pipe({
    name: 'highlight'
})
export class SearchHighlightPipe implements PipeTransform {
    transform(value: string, args: string, active: boolean = true, includeSpans: boolean = false): string {
        value = escape(value);
        let result: string = value;
        if (args && value && active) {
            const testStr: string = escape(args.trim().toLowerCase());
            const startIndex = value.toLowerCase().indexOf(testStr);
            if (startIndex !== -1) {
                const matchingString = value.substr(startIndex, testStr.length);
                result = value.replace(matchingString, '<strong>' + matchingString + '</strong>');
            }
        }
        if (includeSpans) {
            result = '<span>' + result + '</span>';
        }
        return result;
    }
}
