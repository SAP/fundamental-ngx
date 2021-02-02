import { Component } from '@angular/core';

@Component({
    selector: 'fdp-select-semantic-state-example',
    templateUrl: './platform-select-semantic-state-example.component.html'
})
export class PlatformSelectSemanticStateExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue1: string;
    selectedValue2: string;
    selectedValue3: string;
    selectedValue4: string;
}
