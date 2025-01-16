import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GenericTagComponent } from '@fundamental-ngx/core/generic-tag';

@Component({
    selector: 'fd-generic-tag-default-example',
    templateUrl: './generic-tag-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GenericTagComponent]
})
export class GenericTagDefaultExampleComponent {}
