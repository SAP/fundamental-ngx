import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-types-example',
    templateUrl: './select-types-example.component.html',
    styleUrls: ['./select-types-example.component.scss']
})
export class SelectTypesExampleComponent {

    selectValue1: string;
    selectValue2: string;
    selectValue3: string;
    selectValue4: string;


    options: string[] = [
        'Tomato',
        'Pineapple',
        'Apple'
    ];
}
