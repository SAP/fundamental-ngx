import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-platform-list-with-group-header-example',
    templateUrl: './platform-list-with-group-header-example.component.html',
    imports: [PlatformListModule, StandardListItemModule, ContentDensityDirective]
})
export class PlatformListWithGroupHeaderExampleComponent {}
