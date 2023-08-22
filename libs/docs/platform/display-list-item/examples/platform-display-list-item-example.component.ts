import { Component } from '@angular/core';
import { DisplayListItemModule } from '@fundamental-ngx/platform/list';
import { PlatformListModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-display-list-item-example',
    templateUrl: './platform-display-list-item-example.component.html',
    standalone: true,
    imports: [PlatformListModule, DisplayListItemModule]
})
export class PlatformDisplayListItemExampleComponent {}
