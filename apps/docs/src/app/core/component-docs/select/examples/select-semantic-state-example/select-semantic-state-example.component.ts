import { Component } from '@angular/core';
import { ControlState } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-select-semantic-state-example',
    templateUrl: './select-semantic-state-example.component.html'
})
export class SelectSemanticStateExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    controlState = ControlState;
    selectedValue1: string;
    selectedValue2: string;
    selectedValue3: string;
    selectedValue4: string;
}
