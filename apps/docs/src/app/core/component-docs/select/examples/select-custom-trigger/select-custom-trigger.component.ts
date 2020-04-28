import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-custom-trigger',
    templateUrl: './select-custom-trigger.component.html',
    styleUrls: ['./select-custom-trigger.component.scss']
})
export class SelectCustomTriggerComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    selectedValue: string;
}
