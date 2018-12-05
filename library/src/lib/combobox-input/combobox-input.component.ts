import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fd-combobox-input',
    templateUrl: './combobox-input.component.html',
    styleUrls: ['./combobox-input.component.scss']
})
export class ComboboxInputComponent implements OnInit {
    @Input()
    placeholder: string = '';

    @Input()
    compact: boolean = false;

    constructor() {}

    ngOnInit() {}
}
