import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class SearchHighlightPipe implements PipeTransform {
    transform(value: string, args: string, active: boolean = true): string {
        if (args && value && active) {
            const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
            if (startIndex !== -1) {
                const matchingString = value.substr(startIndex, args.length);
                return value.replace(matchingString, '<strong>' + matchingString + '</strong>');
            }
        }
        return value;
    }
}
