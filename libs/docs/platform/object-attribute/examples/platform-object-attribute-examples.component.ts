import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fdp-object-attribute-example',
    templateUrl: './platform-object-attribute-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformObjectAttributeExampleComponent {}

@Component({
    selector: 'fdp-object-attribute-truncate-example',
    templateUrl: './platform-object-attribute-truncate-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformObjectAttributeTruncateExampleComponent {}
