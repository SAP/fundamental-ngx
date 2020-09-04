import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-checkbox-group-list-object',
    templateUrl: './platform-checkbox-group-list-object.component.html'
})
export class PlatformCheckboxGroupListObjectComponent {
    countryCurrency = [new Country('Australia', 'AUD'), new Country('India', 'INR'), new Country('USA', 'USD')];
    currency = ['AUD', 'USD'];

    languages = [
        new LanguageKnown('Java', 'java', false),
        new LanguageKnown('Javascript', 'javascript', true),
        new LanguageKnown('Python', 'python', false),
        new LanguageKnown('GoLang', 'go', true)
    ];

    countryVisited = [new Country('Australia', 'Australia'), new Country('India', 'India'), new Country('USA', 'USA')];
    visited = { visited: ['India', 'USA'] };

    form4 = new FormGroup({});
    form5 = new FormGroup({});
    form6 = new FormGroup({
        currencies: new FormControl(['INR'])
    });
    form7 = new FormGroup({});

    invoiceItems = [
        new Item('1', 'coffee', 'Coffee', 100, 12),
        new Item('2', 'pen', 'Pen', 200, 5),
        new Item('3', 'chair', 'Office chair', 50, 5530)
    ];

    // template driven
    languagesKnown = '';
    currencies = ['INR', 'USD'];
    itemsData = ['pen'];
}

class Country implements SelectItem {
    constructor(public label: string, public value: string) {}
}

class LanguageKnown implements SelectItem {
    constructor(public label: string, public value: string, public disabled: boolean) {}
}

class Item {
    constructor(
        public itemId: string,
        public item: string,
        public itemType: string,
        public quantity: number,
        public rate: number
    ) {}
}
