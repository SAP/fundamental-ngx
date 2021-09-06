import { Pipe, PipeTransform } from '@angular/core';

import { MatchingStrategy } from '@fundamental-ngx/platform/shared';
import { ComboboxConfig } from '../combobox.config';

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
            return this._searchByStrategyStartsWith(value, searchText);
        }

        if (matchingStrategy === MatchingStrategy.CONTAINS) {
            return this._searchByStrategyContains(value, searchText);
        }

        return value;
    }

    private _searchByStrategyStartsWith(value: string, searchText: string): string {
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

    private _searchByStrategyContains(value: string, searchText: string): string {
        return value.replace(new RegExp(`(${searchText})`, 'gi'), '<strong>$1</strong>');
    }
}
