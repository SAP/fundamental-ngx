import { Component, computed, signal, viewChildren } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { SideNavigation } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation';
import { SideNavigationItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-item';
import { SideNavigationSearchField } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-search-field';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

interface NavigationItem {
    text: string;
}

@Component({
    selector: 'ui5-doc-side-navigation-search-filter-sample',
    templateUrl: './search-filter-sample.html',
    imports: [Button, SideNavigation, SideNavigationItem, SideNavigationSearchField]
})
export class SearchFilterSample {
    protected readonly _collapsed = signal(false);
    protected readonly _query = signal('');
    protected readonly _visibleItems = computed(() => {
        const query = this._query().trim().toLocaleLowerCase();

        return query ? this._items.filter((item) => item.text.toLocaleLowerCase().includes(query)) : this._items;
    });

    private readonly _navigationItems = viewChildren(SideNavigationItem);
    private readonly _items: readonly NavigationItem[] = [
        { text: 'Home' },
        { text: 'Inbox' },
        { text: 'Calendar' },
        { text: 'Settings' },
        { text: 'Help and Support' }
    ];

    protected onSearchInput(event: UI5WrapperCustomEvent<SideNavigationSearchField, 'ui5Input'>): void {
        this._query.set(event.currentTarget.value ?? '');
    }

    protected onSearchKeydown(event: KeyboardEvent): void {
        if (event.key === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            this._navigationItems()[0]?.element.focus();
        }
    }

    protected toggleNavigation(): void {
        this._collapsed.update((collapsed) => !collapsed);
    }
}
