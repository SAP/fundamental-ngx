import { Component, DoCheck, ViewChild } from '@angular/core';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';

@Component({
    selector: 'fd-off-screen-example',
    templateUrl: './off-screen-example.component.html'
})
export class OffScreenExampleComponent implements DoCheck {
    count = 0;

    searchTerm = '';
    fruits = [
        'Apple',
        'Pineapple',
        'Banana',
        'Kiwi',
        'Strawberry',
        'Blueberry',
        'Orange',
        'Lemon',
        'Raspberry',
        'Grapefruit',
        'Apricot',
        'Avocado',
        'Cherry'
    ];

    /** @hidden */
    @ViewChild(ComboboxComponent)
    comboboxComponent: ComboboxComponent;

    ngDoCheck(): void {
        if (this.comboboxComponent?.inputTextValue) {
            this.count = this.comboboxComponent?.displayedValues.length;
        } else {
            this.count = 0;
        }
    }
}
