import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/platform/button';

@Component({
    selector: 'fdp-button-types-example',
    templateUrl: './platform-button-types-example.component.html',
    styleUrls: ['./platform-button-examples.scss'],
    imports: [ButtonComponent]
})
export class PlatformButtonTypesExampleComponent {}

@Component({
    selector: 'fdp-button-icons-example',
    templateUrl: './platform-button-icons-example.component.html',
    styleUrls: ['./platform-button-examples.scss'],
    imports: [ButtonComponent]
})
export class PlatformButtonIconsExampleComponent {}

@Component({
    selector: 'fdp-button-truncate-example',
    templateUrl: './platform-button-truncate-example.component.html',
    styleUrls: ['./platform-button-examples.scss'],
    imports: [ButtonComponent]
})
export class PlatformButtonTruncateExampleComponent {}
