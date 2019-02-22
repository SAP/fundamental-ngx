import { Component, Input } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fd-combobox-input',
    templateUrl: './combobox-input.component.html',
    styleUrls: ['./combobox-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ComboboxInputComponent,
        multi: true
    }],
    host: {
        class: 'fd-combobox-input'
    }
})
export class ComboboxInputComponent extends SearchInputComponent {

    @Input()
    newItemCallback: Function;

    newItemKeypressHandler(event) {
        if (event.code === 'Enter' && this.newItemCallback) {
            this.newItemCallback(event);
        }
    }

}
