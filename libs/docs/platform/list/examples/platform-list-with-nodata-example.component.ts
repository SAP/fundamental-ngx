import { Component } from '@angular/core';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-platform-list-with-nodata-example',
    templateUrl: './platform-list-with-nodata-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformListWithNoDataExampleComponent {}
