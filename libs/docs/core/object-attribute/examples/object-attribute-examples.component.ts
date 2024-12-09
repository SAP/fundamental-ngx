import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ObjectAttributeComponent } from '@fundamental-ngx/core/object-attribute';

@Component({
    selector: 'fd-object-attribute-example',
    templateUrl: './object-attribute-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ObjectAttributeComponent]
})
export class ObjectAttributeExampleComponent {}

@Component({
    selector: 'fd-object-attribute-truncate-example',
    templateUrl: './object-attribute-truncate-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ObjectAttributeComponent]
})
export class ObjectAttributeTruncateExampleComponent {}
