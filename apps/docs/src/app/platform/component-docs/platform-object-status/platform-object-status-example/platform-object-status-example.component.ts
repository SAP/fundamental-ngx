import { Component } from '@angular/core';
import { IndicationColorType } from '@fundamental-ngx/platform/object-status';

@Component({
    selector: 'fdp-platform-object-status-example',
    templateUrl: './platform-object-status-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusExampleComponent {}

@Component({
    selector: 'fdp-object-status-text-example',
    templateUrl: './platform-object-status-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusTextExampleComponent {}

@Component({
    selector: 'fdp-object-status-generic-text-example',
    templateUrl: './platform-object-status-generic-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusGenericExampleComponent {
    items: IndicationColorType[] = [1, 2, 3, 4, 5, 6, 7, 8];
}

@Component({
    selector: 'fdp-object-status-numeric-icon-example',
    templateUrl: './platform-object-status-icon-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusTextIconExampleComponent {}

@Component({
    selector: 'fdp-object-status-inverted-example',
    templateUrl: './platform-object-status-inverted-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusInvertedTextExampleComponent {}

@Component({
    selector: 'fdp-object-status-inverted-generic-text-example',
    templateUrl: './platform-object-status-inverted-generic-text-example.component.html',
    styleUrls: ['./platform-object-status-example.component.scss']
})
export class PlatformObjectStatusInvertedGenericTextExampleComponent {
    items: IndicationColorType[] = [1, 2, 3, 4, 5, 6, 7, 8];
}
