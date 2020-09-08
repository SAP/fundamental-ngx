import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class SearchHighlightPipe implements PipeTransform {
    transform(value: string, args: string, active: boolean = true, includeSpans: boolean = false): string {
        let result: string = value;
        if (args && value && active) {
            const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
            if (startIndex !== -1) {
                const matchingString = value.substr(startIndex, args.length);
                result = value.replace(matchingString, '<strong>' + matchingString + '</strong>');
            }
        }
        if (includeSpans) {
            result = '<span>' + result + '</span>';
        }
        return result;
    }
}
