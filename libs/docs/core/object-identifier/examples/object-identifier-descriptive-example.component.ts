import { Component } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ObjectIdentifierComponent } from '@fundamental-ngx/core/object-identifier';

@Component({
    selector: 'fd-object-identifier-descriptive-example',
    templateUrl: './object-identifier-descriptive-example.component.html',
    imports: [ObjectIdentifierComponent, LinkComponent]
})
export class ObjectIdentifierDescriptiveExampleComponent {}
