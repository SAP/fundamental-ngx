import { Component } from '@angular/core';
import { ControlState } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-select-basic-example',
    templateUrl: './select-basic-example.component.html',
    styleUrls: ['select-basic-example.component.scss']
})
export class SelectBasicExampleComponent {
    controlState = ControlState;
    selectOneValue: string;
    selectTwoValue: string;
    selectThreeValue: string;
    emptyValues: string[];
    values: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
}
