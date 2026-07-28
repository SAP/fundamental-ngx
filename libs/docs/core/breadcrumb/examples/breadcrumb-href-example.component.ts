import { Component } from '@angular/core';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { LinkComponent } from '@fundamental-ngx/core/link';

@Component({
    selector: 'fd-breadcrumb-href-example',
    templateUrl: './breadcrumb-href-example.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `
    ],
    imports: [BreadcrumbModule, LinkComponent]
})
export class BreadcrumbHrefExampleComponent {
    onClick(value: string): void {
        window.alert(value);
    }
}
