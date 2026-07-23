import { Component, computed, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Search } from '@fundamental-ngx/ui5-webcomponents-fiori/search';
import { SearchItem } from '@fundamental-ngx/ui5-webcomponents-fiori/search-item';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/activities.js';
import '@ui5/webcomponents-icons/dist/add-document.js';
import '@ui5/webcomponents-icons/dist/calendar.js';
import '@ui5/webcomponents-icons/dist/cart.js';
import '@ui5/webcomponents-icons/dist/collaborate.js';
import '@ui5/webcomponents-icons/dist/contacts.js';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/email.js';
import '@ui5/webcomponents-icons/dist/leads.js';
import '@ui5/webcomponents-icons/dist/opportunities.js';
import '@ui5/webcomponents-icons/dist/product.js';
import '@ui5/webcomponents-icons/dist/settings.js';
import '@ui5/webcomponents-icons/dist/supplier.js';
import '@ui5/webcomponents-icons/dist/sys-help.js';
import '@ui5/webcomponents-icons/dist/task.js';

interface MenuItem {
    id: string;
    name: string;
    icon: string;
}

@Component({
    selector: 'ui5-doc-search-custom-max-height-sample',
    templateUrl: './custom-max-height-sample.html',
    imports: [Search, SearchItem]
})
export class CustomMaxHeightSample {
    searchValue = signal<string>('');

    allMenuItems = signal<MenuItem[]>([
        { id: '1', name: 'Dashboard', icon: 'activities' },
        { id: '2', name: 'Customers', icon: 'customer' },
        { id: '3', name: 'Products', icon: 'product' },
        { id: '4', name: 'Orders', icon: 'cart' },
        { id: '5', name: 'Suppliers', icon: 'supplier' },
        { id: '6', name: 'Calendar', icon: 'calendar' },
        { id: '7', name: 'Tasks', icon: 'task' },
        { id: '8', name: 'Contacts', icon: 'contacts' },
        { id: '9', name: 'Documents', icon: 'add-document' },
        { id: '10', name: 'Email', icon: 'email' },
        { id: '11', name: 'Opportunities', icon: 'opportunities' },
        { id: '12', name: 'Leads', icon: 'leads' },
        { id: '13', name: 'Collaboration', icon: 'collaborate' },
        { id: '14', name: 'Settings', icon: 'settings' },
        { id: '15', name: 'Help', icon: 'sys-help' }
    ]);

    filteredItems = computed(() => {
        const query = this.searchValue().toLowerCase();
        if (!query) {
            return this.allMenuItems();
        }
        return this.allMenuItems().filter((item) => item.name.toLowerCase().includes(query));
    });

    onInput(event: UI5WrapperCustomEvent<Search, 'ui5Input'>): void {
        const value = event.currentTarget.value || '';
        this.searchValue.set(value);
    }

    onSearch(event: UI5WrapperCustomEvent<Search, 'ui5Search'>): void {
        const value = event.currentTarget.value || '';
        this.searchValue.set(value);
        console.log('Search for:', value);
    }
}
