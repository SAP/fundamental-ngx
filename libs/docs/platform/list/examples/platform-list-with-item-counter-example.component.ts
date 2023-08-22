import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { StandardListItemModule } from '@fundamental-ngx/platform/list';
import { PlatformListModule } from '@fundamental-ngx/platform/list';

export interface Counter {
    title: string;
    counter: string;
}

@Component({
    selector: 'fdp-platform-list-with-item-counter-example',
    templateUrl: './platform-list-with-item-counter-example.component.html',
    standalone: true,
    imports: [PlatformListModule, StandardListItemModule, ContentDensityDirective]
})
export class PlatformListWithItemCounterExampleComponent {
    items: Counter[] = [
        { title: 'Item1', counter: '2134' },
        { title: 'Item2', counter: '34562' },
        { title: 'Item3', counter: '739' }
    ];
}
