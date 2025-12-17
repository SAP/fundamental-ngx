import { Component, computed, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Search } from '@fundamental-ngx/ui5-webcomponents-fiori/search';
import { SearchItem } from '@fundamental-ngx/ui5-webcomponents-fiori/search-item';
import { SearchMessageArea } from '@fundamental-ngx/ui5-webcomponents-fiori/search-message-area';
import { SearchScope } from '@fundamental-ngx/ui5-webcomponents-fiori/search-scope';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/cart.js';
import '@ui5/webcomponents-icons/dist/cursor-arrow.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/laptop.js';

interface Item {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string;
}

@Component({
    selector: 'ui5-doc-search-scopes-sample',
    templateUrl: './scopes-sample.html',
    standalone: true,
    imports: [Search, SearchItem, SearchScope, SearchMessageArea]
})
export class ScopesSample {
    searchValue = signal<string>('');
    selectedScope = signal<string>('All');

    allItems = signal<Item[]>([
        { id: '1', name: 'Laptop Pro', description: 'High-performance laptop', category: 'Products', icon: 'laptop' },
        { id: '2', name: 'John Doe', description: 'Senior Manager', category: 'Customers', icon: 'customer' },
        { id: '3', name: 'Order #12345', description: 'Pending delivery', category: 'Orders', icon: 'cart' },
        { id: '4', name: 'Smartphone X', description: 'Latest model', category: 'Products', icon: 'iphone' },
        { id: '5', name: 'Jane Smith', description: 'Product Designer', category: 'Customers', icon: 'customer' },
        { id: '6', name: 'Order #12346', description: 'Completed', category: 'Orders', icon: 'cart' },
        {
            id: '7',
            name: 'Wireless Mouse',
            description: 'Ergonomic design',
            category: 'Products',
            icon: 'cursor-arrow'
        },
        { id: '8', name: 'Bob Johnson', description: 'Developer', category: 'Customers', icon: 'customer' }
    ]);

    filteredItems = computed(() => {
        const query = this.searchValue().toLowerCase();
        const scope = this.selectedScope();

        let items = this.allItems();

        // Filter by scope
        if (scope !== 'All') {
            items = items.filter((item) => item.category === scope);
        }

        // Filter by search query
        if (query) {
            items = items.filter(
                (item) => item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
            );
        }

        return items;
    });

    onInput(event: UI5WrapperCustomEvent<Search, 'ui5Input'>): void {
        const value = event.currentTarget.value || '';
        this.searchValue.set(value);
        console.log('Input event value:', value);
    }

    onClose(event: UI5WrapperCustomEvent<Search, 'ui5Close'>): void {
        const value = event.currentTarget.value || '';
        console.log('Close event value:', value);
    }

    onScopeChange(event: UI5WrapperCustomEvent<Search, 'ui5ScopeChange'>): void {
        const scope = event.detail.scope?.text || 'All';
        this.selectedScope.set(scope);
        console.log('Scope changed to:', scope);
    }
}
