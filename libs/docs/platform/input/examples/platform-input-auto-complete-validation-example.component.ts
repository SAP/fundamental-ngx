import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fdp-platform-input-auto-complete-validation-example',
    templateUrl: './platform-input-auto-complete-validation-example.component.html',
    styleUrls: ['./platform-input-auto-complete-validation-example.component.scss']
})
export class PlatformInputAutoCompleteValidationExampleComponent implements OnInit {
    public inputText: string;
    public options: string[];

    /** Whether the combobox is opened. */
    public open: boolean;

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

    @ViewChild('typeahead')
    typeahead: PopoverComponent;

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
        this.open = this.options.length > 0;
        this.typeahead.refreshPosition();
    }

    onItemClick(clickedValue): void {
        this.inputText = clickedValue;
        this.options = [];
        this.open = false;
    }
}
