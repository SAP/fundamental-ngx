import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-standard-list-item-example',
    templateUrl: './platform-standard-list-item-example.component.html',
    imports: [PlatformListModule, StandardListItemModule, ContentDensityDirective]
})
export class PlatformStandardListItemExampleComponent {}
