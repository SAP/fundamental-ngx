import { Component, computed, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base/types';
import {
    FlexibleColumnLayout,
    type FCLAccessibilityAttributes
} from '@fundamental-ngx/ui5-webcomponents-fiori/flexible-column-layout';
import { FCLLayout } from '@fundamental-ngx/ui5-webcomponents-fiori/types';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
}

interface ProductDetail {
    specifications: string[];
    description: string;
    supplier: string;
}

type FCLLayoutType = (typeof FCLLayout)[keyof typeof FCLLayout];

@Component({
    selector: 'ui5-flexible-column-layout-sample',
    standalone: true,
    imports: [FlexibleColumnLayout, Button, List, ListItemStandard, Title, Text],
    templateUrl: './flexible-column-layout-sample.html'
})
export class FlexibleColumnLayoutSample {
    // Layout state
    currentLayout = signal<FCLLayoutType>(FCLLayout.OneColumn);
    resizingDisabled = signal(false);

    // Data signals
    products = signal<Product[]>([
        { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 15 },
        { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 49, stock: 50 },
        { id: 3, name: 'Monitor 27"', category: 'Electronics', price: 399, stock: 8 },
        { id: 4, name: 'Keyboard Mechanical', category: 'Accessories', price: 129, stock: 25 }
    ]);

    selectedProduct = signal<Product | null>(null);
    selectedDetail = signal<ProductDetail | null>(null);

    // Column visibility computed signals
    startVisible = computed(() => {
        const layout = this.currentLayout();
        return !layout.includes('Hidden') && layout !== 'MidColumnFullScreen' && layout !== 'EndColumnFullScreen';
    });

    midVisible = computed(() => {
        const layout = this.currentLayout();
        return layout !== 'OneColumn' && layout !== 'EndColumnFullScreen';
    });

    endVisible = computed(() => {
        const layout = this.currentLayout();
        return layout.includes('Three') || layout === 'EndColumnFullScreen';
    });

    // Accessibility attributes
    accessibilityAttrs = computed<FCLAccessibilityAttributes>(() => ({
        startColumn: { role: 'region' as const, name: 'Product List' },
        midColumn: { role: 'region' as const, name: 'Product Details' },
        endColumn: { role: 'region' as const, name: 'Additional Information' },
        startSeparator: { role: 'none' as const, name: 'Resize start column' },
        endSeparator: { role: 'none' as const, name: 'Resize end column' }
    }));

    // Layout methods
    changeLayout(layout: FCLLayoutType): void {
        this.currentLayout.set(layout);
    }

    toggleResizing(): void {
        this.resizingDisabled.update((value) => !value);
    }

    // Product selection
    selectProduct(product: Product): void {
        this.selectedProduct.set(product);

        // Simulate loading product details
        const details: ProductDetail = {
            specifications: ['High Performance', 'Energy Efficient', 'Premium Build Quality'],
            description: `${product.name} is a top-quality product in the ${product.category} category.`,
            supplier: 'Global Tech Suppliers Inc.'
        };
        this.selectedDetail.set(details);

        // Switch to two-column layout when product is selected
        if (this.currentLayout() === FCLLayout.OneColumn) {
            this.currentLayout.set(FCLLayout.TwoColumnsMidExpanded);
        }
    }

    viewDetails(): void {
        if (this.selectedProduct()) {
            this.currentLayout.set(FCLLayout.ThreeColumnsMidExpanded);
        }
    }

    closeEndColumn(): void {
        const layout = this.currentLayout();
        if (layout.includes('Three')) {
            this.currentLayout.set(FCLLayout.TwoColumnsMidExpanded);
        }
    }

    closeMidColumn(): void {
        this.selectedProduct.set(null);
        this.selectedDetail.set(null);
        this.currentLayout.set(FCLLayout.OneColumn);
    }

    // Expose FCLLayout enum for template
    readonly FCLLayout = FCLLayout;

    // Event handlers
    onLayoutChange(event: UI5WrapperCustomEvent<FlexibleColumnLayout, 'ui5LayoutChange'>): void {
        console.log('Layout changed:', event.detail);
    }

    onLayoutConfigurationChange(
        event: UI5WrapperCustomEvent<FlexibleColumnLayout, 'ui5LayoutConfigurationChange'>
    ): void {
        console.log('Layout configuration changed:', event.detail);
    }

    // Helper methods
    formatPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    getStockStatus(stock: number): string {
        if (stock === 0) {
            return 'Out of Stock';
        }
        if (stock < 10) {
            return 'Low Stock';
        }
        return 'In Stock';
    }
}
