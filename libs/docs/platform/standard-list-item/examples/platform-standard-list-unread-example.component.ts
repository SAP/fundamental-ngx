import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-doc-platform-standard-list-unread-example',
    templateUrl: './platform-standard-list-unread-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PlatformListModule, StandardListItemModule]
})
export class PlatformStandardListUnreadExampleComponent {}
