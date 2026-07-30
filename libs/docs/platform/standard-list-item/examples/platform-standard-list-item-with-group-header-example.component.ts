import { Component } from '@angular/core';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-standard-list-item-with-group-header-example',
    templateUrl: './platform-standard-list-item-with-group-header-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformStandardListItemtWithGroupHeaderExampleComponent {}
