import { Component } from '@angular/core';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ObjectListItemModule, PlatformListModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-platform-object-list-item-example',
    templateUrl: './platform-object-list-item-example.component.html',
    standalone: true,
    imports: [PlatformListModule, ObjectListItemModule, ObjectMarkerModule, ObjectStatusModule]
})
export class PlatformObjectListItemExampleComponent {}
