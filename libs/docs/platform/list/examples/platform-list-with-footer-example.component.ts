import { Component } from '@angular/core';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

export interface Name {
    title: string;
}

@Component({
    selector: 'fdp-platform-list-with-footer-example',
    templateUrl: './platform-list-with-footer-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformListWithFooterExampleComponent {
    items: Name[] = [{ title: 'Item1' }, { title: 'Item2' }, { title: 'Item3' }];
}
