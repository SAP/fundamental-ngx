import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ShellbarActionComponent, ShellbarActionsComponent, ShellbarComponent } from '@fundamental-ngx/core/shellbar';
import { FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
import {
    PlatformSearchFieldModule,
    SearchInput,
    SuggestionItem,
    ValueLabelItem
} from '@fundamental-ngx/platform/search-field';
import { DataProvider, ProviderParams, SearchFieldDataSource } from '@fundamental-ngx/platform/shared';
import { Observable, of } from 'rxjs';

const SOURCE_SUGGESTIONS: SuggestionItem[] = [{ value: 'Apple' }, { value: 'Banana' }];

class DeterministicSearchFieldDataProvider extends DataProvider<SuggestionItem> {
    constructor(private readonly _recordQuery: (query: string) => void) {
        super();
    }

    fetch(params: ProviderParams): Observable<SuggestionItem[]> {
        const query = params.get('keyword') ?? '';
        this._recordQuery(query);
        return of(
            SOURCE_SUGGESTIONS.filter((suggestion) => suggestion.value.toLowerCase().includes(query.toLowerCase()))
        );
    }
}

@Component({
    selector: 'e2e-shellbar-search-accessibility',
    templateUrl: './shellbar-search-accessibility.component.html',
    imports: [JsonPipe, ShellbarComponent, ShellbarActionComponent, ShellbarActionsComponent, PlatformSearchFieldModule]
})
export class ShellbarSearchAccessibilityComponent {
    readonly allowEmptySearch = signal(true);
    readonly showAdvancedFilter = signal(true);
    readonly desktopInputEvents = signal<SearchInput[]>([]);
    readonly desktopCancelEvents = signal<SearchInput[]>([]);
    readonly desktopFilterEvents = signal(0);
    readonly standaloneInputEvents = signal<SearchInput[]>([]);
    readonly suggestions: SuggestionItem[] = [{ value: 'Apple' }, { value: 'Apricot' }, { value: 'Banana' }];
    readonly sourceQueries = signal<string[]>([]);
    readonly dataSource = new SearchFieldDataSource(
        new DeterministicSearchFieldDataProvider((query) => this.sourceQueries.update((queries) => [...queries, query]))
    );
    readonly categories: ValueLabelItem[] = [
        { value: 'fruit', label: 'Fruit' },
        { value: 'vegetable', label: 'Vegetable' }
    ];
    protected readonly _language = inject(FD_LANGUAGE_SIGNAL);

    recordInput(events: ReturnType<typeof signal<SearchInput[]>>, event: SearchInput): void {
        events.update((values) => [...values, event]);
    }

    recordCancel(event: SearchInput): void {
        this.desktopCancelEvents.update((values) => [...values, event]);
    }

    incrementFilter(): void {
        this.desktopFilterEvents.update((count) => count + 1);
    }

    useFixtureAdvancedFilterLabel(): void {
        this._language.update((language) => ({
            ...language,
            platformSearchField: {
                ...language.platformSearchField,
                advancedFilterButtonTitle: 'Fixture advanced filter'
            }
        }));
    }
}
