import { Component } from '@angular/core';
import { InfoLabelColorInput, InfoLabelModule } from '@fundamental-ngx/core/info-label';

const infoLabelColors: InfoLabelColorInput[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

@Component({
    selector: 'fd-info-label-default-example',
    templateUrl: './info-label-default-example.component.html',
    standalone: true,
    imports: [InfoLabelModule]
})
export class InfoLabelDefaultExampleComponent {}

@Component({
    selector: 'fd-info-label-text-example',
    templateUrl: './info-label-text-example.component.html',
    standalone: true,
    imports: [InfoLabelModule]
})
export class InfoLabelTextExampleComponent {
    infoLabelColors = infoLabelColors;
}

@Component({
    selector: 'fd-info-label-text-icon-example',
    templateUrl: './info-label-text-icon-example.component.html',
    standalone: true,
    imports: [InfoLabelModule]
})
export class InfoLabelTextIconExampleComponent {
    infoLabelColors = infoLabelColors;
}

@Component({
    selector: 'fd-info-label-numeric-icon-example',
    templateUrl: './info-label-icon-numeric-example.component.html',
    standalone: true,
    imports: [InfoLabelModule]
})
export class InfoLabelNumericIconExampleComponent {}
