import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Search } from '@fundamental-ngx/ui5-webcomponents-fiori/search';
import { SearchItem } from '@fundamental-ngx/ui5-webcomponents-fiori/search-item';

interface Product {
    id: string;
    name: string;
    description: string;
    icon: string;
}

@Component({
    selector: 'ui5-doc-search-loading-sample',
    templateUrl: './loading-sample.html',
    standalone: true,
    imports: [Search, SearchItem]
})
export class LoadingSample {
    searchValue = signal<string>('');
    isLoading = signal<boolean>(false);
    searchResults = signal<Product[]>([]);

    allProducts: Product[] = [
        { id: '1', name: 'Laptop', description: 'High-performance laptop', icon: 'laptop' },
        { id: '2', name: 'Smartphone', description: 'Latest smartphone model', icon: 'iphone' },
        { id: '3', name: 'Tablet', description: 'Portable tablet device', icon: 'responsive' },
        { id: '4', name: 'Monitor', description: '4K display monitor', icon: 'monitor-payments' },
        { id: '5', name: 'Keyboard', description: 'Mechanical keyboard', icon: 'keyboard-and-mouse' }
    ];

    onInput(event: UI5WrapperCustomEvent<Search, 'ui5Input'>): void {
        const value = event.currentTarget.value || '';
        this.searchValue.set(value);

        if (value) {
            this.performSearch(value);
        } else {
            this.searchResults.set([]);
        }
    }

    onSearch(event: UI5WrapperCustomEvent<Search, 'ui5Search'>): void {
        const value = event.currentTarget.value || '';
        if (value) {
            this.performSearch(value);
        }
    }

    private performSearch(query: string): void {
        this.isLoading.set(true);
        this.searchResults.set([]);

        // Simulate API call with timeout
        setTimeout(() => {
            const results = this.allProducts.filter(
                (p) =>
                    p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.description.toLowerCase().includes(query.toLowerCase())
            );
            this.searchResults.set(results);
            this.isLoading.set(false);
        }, 1500);
    }
}
