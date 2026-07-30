import { Component } from '@angular/core';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-standard-list-item-with-inverted-secondary-type-example',
    templateUrl: './platform-standard-list-item-with-inverted-secondary-type-example.component.html',
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformStandardListItemWithInvertedSecondaryTypeExampleComponent {}
