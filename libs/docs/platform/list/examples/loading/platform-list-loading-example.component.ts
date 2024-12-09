import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlatformListModule } from '@fundamental-ngx/platform/list';

@Component({
    selector: 'fdp-platform-list-loading-example',
    templateUrl: './platform-list-loading-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PlatformListModule]
})
export class PlatformListLoadingExampleComponent {}
