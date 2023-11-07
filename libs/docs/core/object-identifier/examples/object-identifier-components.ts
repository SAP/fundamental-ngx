import { Component } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ObjectIdentifierComponent } from '@fundamental-ngx/core/object-identifier';

@Component({
    selector: 'fd-object-identifier-default-example',
    templateUrl: './object-identifier-default-example.component.html',
    standalone: true,
    imports: [ObjectIdentifierComponent]
})
export class ObjectIdentifierDefaultExampleComponent {}

@Component({
    selector: 'fd-object-identifier-link-example',
    templateUrl: './object-identifier-link-example.component.html',
    standalone: true,
    imports: [ObjectIdentifierComponent, LinkComponent]
})
export class ObjectIdentifierLinkExampleComponent {}

@Component({
    selector: 'fd-object-identifier-bold-example',
    templateUrl: './object-identifier-bold-example.component.html',
    standalone: true,
    imports: [ObjectIdentifierComponent]
})
export class ObjectIdentifierBoldExampleComponent {}

@Component({
    selector: 'fd-object-identifier-descriptive-example',
    templateUrl: './object-identifier-descriptive-example.component.html',
    standalone: true,
    imports: [ObjectIdentifierComponent, LinkComponent]
})
export class ObjectIdentifierDescriptiveExampleComponent {}
