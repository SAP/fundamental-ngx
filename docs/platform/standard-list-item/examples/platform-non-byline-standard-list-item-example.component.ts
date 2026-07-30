import { Component } from '@angular/core';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-non-byline-standard-list-item-example',
    templateUrl: './platform-non-byline-standard-list-item-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformNonByLineStandardListItemExampleComponent {}
