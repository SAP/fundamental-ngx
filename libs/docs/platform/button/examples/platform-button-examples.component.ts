import { Component } from '@angular/core';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';

@Component({
    selector: 'fdp-button-types-example',
    templateUrl: './platform-button-types-example.component.html',
    styleUrls: ['./platform-button-examples.scss'],
    standalone: true,
    imports: [PlatformButtonModule]
})
export class PlatformButtonTypesExampleComponent {}

@Component({
    selector: 'fdp-button-icons-example',
    templateUrl: './platform-button-icons-example.component.html',
    styleUrls: ['./platform-button-examples.scss'],
    standalone: true,
    imports: [PlatformButtonModule]
})
export class PlatformButtonIconsExampleComponent {}

@Component({
    selector: 'fdp-button-truncate-example',
    templateUrl: './platform-button-truncate-example.component.html',
    styleUrls: ['./platform-button-examples.scss'],
    standalone: true,
    imports: [PlatformButtonModule]
})
export class PlatformButtonTruncateExampleComponent {}
