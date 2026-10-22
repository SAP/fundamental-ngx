import { Component, computed, signal, viewChild, viewChildren } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { SideNavigation } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation';
import { SideNavigationItem } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-item';
import { SideNavigationSearchField } from '@fundamental-ngx/ui5-webcomponents-fiori/side-navigation-search-field';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/calendar.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/inbox.js';
import '@ui5/webcomponents-icons/dist/sys-help.js';
import 'fundamental-styles/dist/margins.css';

interface NavigationItem {
    icon: string;
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
    private readonly _sideNavigation = viewChild(SideNavigation);
    private readonly _items: readonly NavigationItem[] = [
        { icon: 'home', text: 'Home' },
        { icon: 'inbox', text: 'Inbox' },
        { icon: 'calendar', text: 'Calendar' },
        { icon: 'action-settings', text: 'Settings' },
        { icon: 'sys-help', text: 'Help and Support' }
    ];

    protected onSearchInput(event: UI5WrapperCustomEvent<SideNavigationSearchField, 'ui5Input'>): void {
        this._query.set(event.currentTarget.value ?? '');
        this._sideNavigation()?.element.announceSearchMatchCount(this._visibleItems().length);
    }

    protected onSearchKeydown(event: KeyboardEvent): void {
        if (event.key === 'Tab' && !event.shiftKey && this._navigationItems()[0]) {
            event.preventDefault();
            this._navigationItems()[0].element.focus();
        }
    }

    protected toggleNavigation(): void {
        this._collapsed.update((collapsed) => !collapsed);
    }
}
