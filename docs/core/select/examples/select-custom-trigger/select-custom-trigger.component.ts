import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-select-custom-trigger',
    templateUrl: './select-custom-trigger.component.html',
    styleUrls: ['./select-custom-trigger.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectCustomTriggerComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    selectedValue: string;
}
