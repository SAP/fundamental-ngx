import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

export interface Name {
    title: string;
}

@Component({
    selector: 'fdp-platform-list-with-navigation-example',
    templateUrl: './platform-list-with-navigation-example.component.html',
    imports: [PlatformListModule, StandardListItemModule, ContentDensityDirective]
})
export class PlatformListWithNavigationExampleComponent {
    items: Name[] = [{ title: 'Item1' }, { title: 'Item2' }, { title: 'Item3' }];
}
