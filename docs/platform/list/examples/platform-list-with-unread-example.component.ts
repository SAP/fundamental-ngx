import { Component } from '@angular/core';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-platform-list-with-unread-example',
    templateUrl: './platform-list-with-unread-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformListWithUnReadExampleComponent {}
