import { Component } from '@angular/core';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

export interface Name {
    title: string;
}

@Component({
    selector: 'fdp-platform-list-with-navigation-example',
    templateUrl: './platform-list-with-navigation-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformListWithNavigationExampleComponent {
    items: Name[] = [{ title: 'Item1' }, { title: 'Item2' }, { title: 'Item3' }];
}
