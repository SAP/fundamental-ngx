import { Component } from '@angular/core';

@Component({
    selector: 'fdp-select-programmatic-example',
    templateUrl: './platform-select-programmatic-example.component.html',
    styleUrls: ['./platform-select-programmatic-example.component.scss']
})
export class PlatformSelectProgrammaticExampleComponent {

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
