import { Component } from '@angular/core';
import { InfoLabelColor } from '@fundamental-ngx/core/info-label';
import { PlatformInfoLabelModule } from '@fundamental-ngx/platform/info-label';

const infoLabelColors: InfoLabelColor[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

@Component({
    selector: 'fdp-platform-info-label-example',
    templateUrl: './platform-info-label-example.component.html',
    standalone: true,
    imports: [PlatformInfoLabelModule]
})
export class PlatformInfoLabelExampleComponent {}

@Component({
    selector: 'fdp-platform-info-label-text-example',
    templateUrl: './platform-info-label-text-example.component.html',
    standalone: true,
    imports: [PlatformInfoLabelModule]
})
export class PlatformInfoLableTextExampleComponent {
    protected readonly infoLabelColors = infoLabelColors;
}

@Component({
    selector: 'fdp-platform-info-label-text-icon-example',
    templateUrl: './platform-info-label-text-and-icon-example.component.html',
    standalone: true,
    imports: [PlatformInfoLabelModule]
})
export class PlatformInfoLableTextIconExampleComponent {
    protected readonly infoLabelColors = infoLabelColors;
}

@Component({
    selector: 'fdp-platform-info-label-numeric-icon-example',
    templateUrl: './platform-info-label-numeric-example.component.html',
    standalone: true,
    imports: [PlatformInfoLabelModule]
})
export class PlatformInfoLableNumericIconExampleComponent {}

@Component({
    selector: 'fdp-platform-info-label-aria-label-example',
    templateUrl: './platform-info-label-aria-label-example.component.html',
    styleUrls: ['platform-info-label-example.component.scss'],
    standalone: true,
    imports: [PlatformInfoLabelModule]
})
export class PlatformInfoLableAriaLabelExampleComponent {}
