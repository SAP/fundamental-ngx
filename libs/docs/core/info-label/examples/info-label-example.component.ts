import { Component } from '@angular/core';
import { InfoLabelColorInput, InfoLabelModule } from '@fundamental-ngx/core/info-label';

const infoLabelColors: InfoLabelColorInput[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

@Component({
    selector: 'fd-info-label-example',
    templateUrl: './info-label-example.component.html',
    styleUrls: ['./info-label-example.component.scss'],
    imports: [InfoLabelModule]
})
export class InfoLabelExampleComponent {
    infoLabelColors = infoLabelColors;
}
