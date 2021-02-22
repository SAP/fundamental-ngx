import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-programmatic-example',
    templateUrl: './select-programmatic-example.component.html',
    styleUrls: ['./select-programmatic-example.component.scss']
})
export class SelectProgrammaticExampleComponent {

    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedPosition = 0;

    selectedValue: string = this.options[0];
    newValue = this.options[0];

    changeValue(): void {
        this.selectedValue = this.getNewValue();
    }

    getPosition(selectedValue: string): number {
        this.options.forEach((item, index) => {
            if (selectedValue === item) {
                if (this.selectedPosition < this.options.length) {
                    this.selectedPosition = index;
                }
                return this.selectedPosition;
            }
        });
        return this.selectedPosition;
    }

    getNewValue(): string {

        this.selectedPosition = this.getPosition(this.selectedValue);

        if (this.selectedPosition < this.options.length - 1) {
            this.selectedPosition++;
        } else {
            this.selectedPosition = 0;
        }

        this.newValue = this.options[this.selectedPosition];
        return this.selectedValue === this.newValue
            ? this.getNewValue()
            : this.newValue;
    }
}
