import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fd-combobox-input',
    templateUrl: './combobox-input.component.html',
    styleUrls: ['./combobox-input.component.scss']
})
export class ComboboxInputComponent {
    @Input()
    placeholder: string = '';

    @Input()
    label: string = '';

    @Input()
    compact: boolean = false;
}
