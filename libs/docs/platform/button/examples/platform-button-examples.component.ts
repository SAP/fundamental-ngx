import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
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
    selector: 'fdp-button-sizes-example',
    templateUrl: './platform-button-sizes-example.component.html',
    styleUrls: ['./platform-button-examples.scss'],
    standalone: true,
    imports: [PlatformButtonModule, ContentDensityDirective]
})
export class PlatformButtonSizesExampleComponent {}

@Component({
    selector: 'fdp-button-icons-example',
    templateUrl: './platform-button-icons-example.component.html',
    styleUrls: ['./platform-button-examples.scss'],
    standalone: true,
    imports: [PlatformButtonModule]
})
export class PlatformButtonIconsExampleComponent {}

@Component({
    selector: 'fdp-button-state-example',
    templateUrl: './platform-button-state-example.component.html',
    styleUrls: ['./platform-button-examples.scss'],
    standalone: true,
    imports: [PlatformButtonModule]
})
export class PlatformButtonStateExampleComponent {}
@Component({
    selector: 'fdp-button-truncate-example',
    templateUrl: './platform-button-truncate-example.component.html',
    styleUrls: ['./platform-button-examples.scss'],
    standalone: true,
    imports: [PlatformButtonModule]
})
export class PlatformButtonTruncateExampleComponent {}
