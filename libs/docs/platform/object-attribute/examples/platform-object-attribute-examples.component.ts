import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlatformObjectAttributeModule } from '@fundamental-ngx/platform/object-attribute';

@Component({
    selector: 'fdp-object-attribute-example',
    templateUrl: './platform-object-attribute-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PlatformObjectAttributeModule]
})
export class PlatformObjectAttributeExampleComponent {}

@Component({
    selector: 'fdp-object-attribute-truncate-example',
    templateUrl: './platform-object-attribute-truncate-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PlatformObjectAttributeModule]
})
export class PlatformObjectAttributeTruncateExampleComponent {}
