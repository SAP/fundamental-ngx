import { Component, computed, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Search } from '@fundamental-ngx/ui5-webcomponents-fiori/search';
import { SearchItem } from '@fundamental-ngx/ui5-webcomponents-fiori/search-item';
import { SearchMessageArea } from '@fundamental-ngx/ui5-webcomponents-fiori/search-message-area';

// Import the icons used in this example
import '@ui5/webcomponents-icons/dist/cursor-arrow.js';
import '@ui5/webcomponents-icons/dist/headset.js';
import '@ui5/webcomponents-icons/dist/iphone.js';
import '@ui5/webcomponents-icons/dist/keyboard-and-mouse.js';
import '@ui5/webcomponents-icons/dist/laptop.js';
import '@ui5/webcomponents-icons/dist/monitor-payments.js';
import '@ui5/webcomponents-icons/dist/responsive.js';
import '@ui5/webcomponents-icons/dist/video.js';

interface Product {
    id: string;
    name: string;
    icon: string;
}

@Component({
    selector: 'ui5-doc-search-suggestions-sample',
    templateUrl: './suggestions-sample.html',
    standalone: true,
    imports: [Search, SearchItem, SearchMessageArea]
})
export class SuggestionsSample {
    searchValue = signal<string>('');

    allProducts = signal<Product[]>([
        { id: '1', name: 'Laptop', icon: 'laptop' },
        { id: '2', name: 'Smartphone', icon: 'iphone' },
        { id: '3', name: 'Tablet', icon: 'responsive' },
        { id: '4', name: 'Monitor', icon: 'monitor-payments' },
        { id: '5', name: 'Keyboard', icon: 'keyboard-and-mouse' },
        { id: '6', name: 'Mouse', icon: 'cursor-arrow' },
        { id: '7', name: 'Headphones', icon: 'headset' },
        { id: '8', name: 'Webcam', icon: 'video' }
    ]);

    filteredProducts = computed(() => {
        const query = this.searchValue().toLowerCase();
        if (!query) {
            return this.allProducts();
        }
        return this.allProducts().filter((p) => p.name.toLowerCase().includes(query));
    });

    onInput(event: UI5WrapperCustomEvent<Search, 'ui5Input'>): void {
        const value = event.currentTarget.value || '';
        this.searchValue.set(value);
        console.log('Input event value:', value);
    }

    onSearch(event: UI5WrapperCustomEvent<Search, 'ui5Search'>): void {
        const value = event.currentTarget.value || '';
        this.searchValue.set(value);
        console.log('Search event value:', value);
    }
}
