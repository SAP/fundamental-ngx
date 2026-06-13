import { Component, signal } from '@angular/core';
import { Breadcrumbs } from '@fundamental-ngx/ui5-webcomponents/breadcrumbs';
import { BreadcrumbsItem } from '@fundamental-ngx/ui5-webcomponents/breadcrumbs-item';

@Component({
    selector: 'ui5-breadcrumbs-events-sample',
    templateUrl: './events-sample.html',
    imports: [Breadcrumbs, BreadcrumbsItem]
})
export class BreadcrumbsEventsSample {
    clickedItem = signal('');

    onItemClick(event: Event, label: string): void {
        event.preventDefault();
        this.clickedItem.set(label);
    }
}
