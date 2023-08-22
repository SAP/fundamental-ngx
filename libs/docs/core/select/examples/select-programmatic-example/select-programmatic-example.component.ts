import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SelectModule } from '@fundamental-ngx/core/select';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-select-programmatic-example',
    templateUrl: './select-programmatic-example.component.html',
    styleUrls: ['./select-programmatic-example.component.scss'],
    standalone: true,
    imports: [ButtonModule, SelectModule, NgFor]
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
        return this.options.findIndex((item) => selectedValue === item);
    }

    getNewValue(): string {
        this.selectedPosition = this.getPosition(this.selectedValue);

        if (this.selectedPosition < this.options.length - 1) {
            this.selectedPosition++;
        } else {
            this.selectedPosition = 0;
        }

        this.newValue = this.options[this.selectedPosition];
        return this.selectedValue === this.newValue ? this.getNewValue() : this.newValue;
    }
}
