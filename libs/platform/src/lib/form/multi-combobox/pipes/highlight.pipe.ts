import { Pipe, PipeTransform } from '@angular/core';

import { getMatchingStrategyStartsWithPerTermReqexp, MatchingStrategy } from '@fundamental-ngx/platform/shared';
import { MultiComboboxConfig } from '../multi-combobox.config';

// TODO: refactor it with ComboboxHighlightPipe from Combobox and SearchHighlightPipe (https://github.com/SAP/fundamental-ngx/issues/5333)
// - fundamental-ngx/libs/platform/src/lib/components/form/combobox/pipes/highlight.pipe.ts
// - fundamental-ngx/libs/core/src/lib/utils/pipes/search-highlight.pipe.ts

@Pipe({ name: 'highlight' })
export class MultiComboboxHighlightPipe implements PipeTransform {
    constructor(private readonly multiComboboxConfig: MultiComboboxConfig) {}

    transform(
        value: string,
        searchText: string,
        matchingStrategy: MatchingStrategy = this.multiComboboxConfig.matchingStrategy
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
