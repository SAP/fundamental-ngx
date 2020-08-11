import { Component } from '@angular/core';

@Component({
    selector: 'fd-select-adding-example',
    templateUrl: './select-adding-example.component.html',
    styleUrls: ['./select-adding-example.component.scss']
})
export class SelectAddingExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    selectedValue: string;

    addedOptions = 1;

    addOption(): void {
        this.options.push(`New option ${this.addedOptions++}`);
    }

    removeOption(): void {
        if (this.options.length > 1) {
            this.options.pop();
        }
    }
}
