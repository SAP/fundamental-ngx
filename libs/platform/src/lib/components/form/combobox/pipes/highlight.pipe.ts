import { Pipe, PipeTransform } from '@angular/core';
import { ComboboxConfig, MatchingStrategy } from '../combobox.config';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
    constructor(private readonly comboboxConfig: ComboboxConfig) {
    }

    transform(value: string, searchText: string, matchingStrategy: MatchingStrategy = this.comboboxConfig.matchingStrategy): string {
        if (!(value && searchText)) {
            return value;
        }

        if (matchingStrategy === MatchingStrategy.STARTS_WITH) {
            return this.searchByStrategyStartsWith(value, searchText);
        }

        if (matchingStrategy === MatchingStrategy.CONTAINS) {
            return this.searchByStrategyContains(value, searchText);
        }

        return value;
    }

    private searchByStrategyStartsWith(value: string, searchText: string): string {
        const valueLowerCase = value.toLowerCase();
        const searchTextLowerCase = searchText.toLowerCase();
        if (!valueLowerCase.startsWith(searchTextLowerCase)) {
            return value;
        }

        const startIndex = valueLowerCase.indexOf(searchTextLowerCase);
        if (startIndex !== -1) {
            const matchingString = value.substr(startIndex, searchText.length);
            return value.replace(matchingString, '<strong>' + matchingString + '</strong>');
        }
    }

    private searchByStrategyContains(value: string, searchText: string): string {
        return value.replace(new RegExp(`(${searchText})`, 'gi'), '<strong>$1</strong>');
    }
}
