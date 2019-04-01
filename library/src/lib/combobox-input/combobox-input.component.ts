import { Component, HostBinding, Input } from '@angular/core';
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
    }]
})
export class ComboboxInputComponent extends SearchInputComponent {

    @HostBinding('class.fd-combobox-input')
    comboboxClass = true;

    @Input()
    newItemCallback: Function;

    newItemKeypressHandler(event) {
        if (event.code === 'Enter' && this.newItemCallback) {
            this.newItemCallback(event);
        }
    }

}
