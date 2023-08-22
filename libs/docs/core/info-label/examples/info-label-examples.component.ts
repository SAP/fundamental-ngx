import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';

@Component({
    selector: 'fd-info-label-default-example',
    templateUrl: './info-label-default-example.component.html',
    standalone: true,
    imports: [InfoLabelModule]
})
export class InfoLableDefaultExampleComponent {}

@Component({
    selector: 'fd-info-label-text-example',
    templateUrl: './info-label-text-example.component.html',
    standalone: true,
    imports: [NgFor, InfoLabelModule]
})
export class InfoLableTextExampleComponent {}

@Component({
    selector: 'fd-info-label-text-icon-example',
    templateUrl: './info-label-text-icon-example.component.html',
    standalone: true,
    imports: [NgFor, InfoLabelModule]
})
export class InfoLableTextIconExampleComponent {}

@Component({
    selector: 'fd-info-label-numeric-icon-example',
    templateUrl: './info-label-icon-numeric-example.component.html',
    standalone: true,
    imports: [InfoLabelModule]
})
export class InfoLableNumericIconExampleComponent {}
