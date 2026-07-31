import { Component } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ObjectIdentifierComponent } from '@fundamental-ngx/core/object-identifier';

@Component({
    selector: 'fd-object-identifier-link-example',
    templateUrl: './object-identifier-link-example.component.html',
    imports: [ObjectIdentifierComponent, LinkComponent]
})
export class ObjectIdentifierLinkExampleComponent {}
