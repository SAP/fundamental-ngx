import { Component } from '@angular/core';
import { ColorAccent } from '@fundamental-ngx/cdk/utils';
import { ObjectStatusComponent } from '@fundamental-ngx/platform/object-status';

@Component({
    selector: 'fdp-platform-object-status-example',
    templateUrl: './platform-object-status-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss'],
    imports: [ObjectStatusComponent]
})
export class PlatformObjectStatusExampleComponent {}

@Component({
    selector: 'fdp-object-status-text-example',
    templateUrl: './platform-object-status-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss'],
    imports: [ObjectStatusComponent]
})
export class PlatformObjectStatusTextExampleComponent {}

@Component({
    selector: 'fdp-object-status-numeric-icon-example',
    templateUrl: './platform-object-status-icon-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss'],
    imports: [ObjectStatusComponent]
})
export class PlatformObjectStatusTextIconExampleComponent {}

@Component({
    selector: 'fdp-object-status-inverted-example',
    templateUrl: './platform-object-status-inverted-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss'],
    imports: [ObjectStatusComponent]
})
export class PlatformObjectStatusInvertedTextExampleComponent {}

@Component({
    selector: 'fdp-object-status-inverted-generic-text-example',
    templateUrl: './platform-object-status-inverted-generic-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss'],
    imports: [ObjectStatusComponent]
})
export class PlatformObjectStatusInvertedGenericTextExampleComponent {
    items: ColorAccent[] = new Array(10).fill(null).map((_, index) => (index + 1) as ColorAccent);
}
