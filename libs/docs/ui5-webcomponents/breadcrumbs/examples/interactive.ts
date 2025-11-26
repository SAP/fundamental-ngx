import { Component, signal } from '@angular/core';
import { Breadcrumbs } from '@fundamental-ngx/ui5-webcomponents/breadcrumbs';
import { BreadcrumbsItem } from '@fundamental-ngx/ui5-webcomponents/breadcrumbs-item';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-breadcrumbs-interactive-sample',
    templateUrl: './interactive.html',
    standalone: true,
    imports: [Breadcrumbs, BreadcrumbsItem]
})
export class BreadcrumbsInteractiveSample {
    clickedItem = signal<string>('');

    onItemClick(event: any): void {
        const item = event.detail.item;
        const itemText = item.textContent || '';
        this.clickedItem.set(itemText.trim());

        // Prevent default navigation for demonstration
        event.preventDefault();
        console.log('Breadcrumb item clicked:', itemText.trim());
    }
}
