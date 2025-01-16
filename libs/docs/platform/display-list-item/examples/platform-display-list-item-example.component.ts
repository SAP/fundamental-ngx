import { Component } from '@angular/core';
import { DisplayListItemModule, PlatformListModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-display-list-item-example',
    templateUrl: './platform-display-list-item-example.component.html',
    imports: [PlatformListModule, DisplayListItemModule]
})
export class PlatformDisplayListItemExampleComponent {}
