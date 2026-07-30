import { Component } from '@angular/core';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-platform-list-example',
    templateUrl: './platform-list-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformListExampleComponent {}
