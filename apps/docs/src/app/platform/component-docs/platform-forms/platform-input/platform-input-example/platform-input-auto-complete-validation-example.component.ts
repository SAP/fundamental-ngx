import { Component, OnInit, TemplateRef, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PopoverComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-platform-input-auto-complete-form-validation-example',
    templateUrl: './platform-input-auto-complete-validation-example.component.html',
    styleUrls: ['./platform-input-auto-complete-validation-example.component.scss']
})
export class PlatformInputAutoCompleteValidationExampleComponent implements OnInit {
    submitted = false;
    inputText: string;
    state = false;
    options: string[];

    public sportsData: string[] = [
        'American Football',
        'Badminton',
        'Basketball',
        'Cricket',
        'Football',
        'Golf',
        'Hockey',
        'Rugby',
        'Snooker',
        'Tennis'
    ];

    /** Whether the combobox is opened. */
    @Input()
    open: boolean;

    @ViewChild('typeahead')
    typeahead: PopoverComponent;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.options = [];
    }

    filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        if (filterValue.length === 0) {
            return [];
        }
        return this.sportsData.filter((item: string) => item.toLowerCase().includes(filterValue));
    }

    onSearchChange(): void {
        this.options = this.filter(this.inputText);
        if (this.options.length > 0) {
            this.typeahead.open();
        }
        this.typeahead.updatePopover();
    }

    onItemClick(clickedValue): void {
        this.inputText = clickedValue;
        this.options = [];
        this.typeahead.close();
    }
}
