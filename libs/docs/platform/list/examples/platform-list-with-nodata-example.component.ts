import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-platform-list-with-nodata-example',
    templateUrl: './platform-list-with-nodata-example.component.html',
    imports: [PlatformListModule, StandardListItemModule, ContentDensityDirective]
})
export class PlatformListWithNoDataExampleComponent {}
