import { Pipe, PipeTransform } from '@angular/core';

import { getMatchingStrategyStartsWithPerTermReqexp, MatchingStrategy } from '@fundamental-ngx/platform/shared';
import { ComboboxConfig } from '../combobox.config';

@Pipe({
    name: 'highlight'
})
export class ComboboxHighlightPipe implements PipeTransform {
    constructor(private readonly comboboxConfig: ComboboxConfig) {}

    transform(
        value: string,
        searchText: string,
        matchingStrategy: MatchingStrategy = this.comboboxConfig.matchingStrategy
    ): string {
        if (!(value && searchText)) {
            return value;
        }

        if (matchingStrategy === MatchingStrategy.STARTS_WITH_PER_TERM) {
            return this._searchByStrategyStartsWithPerTerm(value, searchText);
        }

        if (matchingStrategy === MatchingStrategy.STARTS_WITH) {
            return this._searchByStrategyStartsWith(value, searchText);
        }

        if (matchingStrategy === MatchingStrategy.CONTAINS) {
            return this._searchByStrategyContains(value, searchText);
        }

        return value;
    }

    private _searchByStrategyStartsWithPerTerm(value: string, searchText: string): string {
        const reqexp = getMatchingStrategyStartsWithPerTermReqexp(searchText);

        return value.replace(reqexp, `$1<strong>$2</strong>`);
    }

    private _searchByStrategyStartsWith(value: string, searchText: string): string {
        const valueLowerCase = value.toLowerCase();
        const searchTextLowerCase = searchText.toLowerCase();
        if (!valueLowerCase.startsWith(searchTextLowerCase)) {
            return value;
        }

        const matchingString = value.substr(0, searchText.length);
        return value.replace(matchingString, '<strong>' + matchingString + '</strong>');
    }

    private _searchByStrategyContains(value: string, searchText: string): string {
        return value.replace(new RegExp(`(${searchText})`, 'gi'), '<strong>$1</strong>');
    }
}
