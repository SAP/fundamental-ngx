import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PlatformInfoLabelModule } from '@fundamental-ngx/platform/info-label';

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
    imports: [NgFor, PlatformInfoLabelModule]
})
export class PlatformInfoLableTextExampleComponent {}

@Component({
    selector: 'fdp-platform-info-label-text-icon-example',
    templateUrl: './platform-info-label-text-and-icon-example.component.html',
    standalone: true,
    imports: [NgFor, PlatformInfoLabelModule]
})
export class PlatformInfoLableTextIconExampleComponent {}

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
