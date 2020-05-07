import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-programmatic-example',
    templateUrl: './select-programmatic-example.component.html',
    styleUrls: ['./select-programmatic-example.component.scss']
})
export class SelectProgrammaticExampleComponent {

    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    selectedValue: string = this.options[0];

    changeValue(): void {
        this.selectedValue = this.getNewValue();
    }

    getNewValue(): string {
        const newValue = this.options[Date.now() % this.options.length];
        return this.selectedValue === newValue
            ? this.getNewValue()
            : newValue;
    }
}
