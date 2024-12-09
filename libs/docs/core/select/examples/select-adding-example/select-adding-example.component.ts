import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-select-adding-example',
    templateUrl: './select-adding-example.component.html',
    styleUrls: ['./select-adding-example.component.scss'],
    imports: [ButtonComponent, SelectModule]
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
