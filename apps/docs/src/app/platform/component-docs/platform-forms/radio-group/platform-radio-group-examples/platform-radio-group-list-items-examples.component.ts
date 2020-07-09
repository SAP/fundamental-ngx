import { Component, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-list-items-example',
    templateUrl: './platform-radio-group-list-items-example.component.html'
})
export class PlatformRadioGroupListItemsExampleComponent implements DoCheck {
    favoriteOption: string = '';
    favoriteOption2: string = 'winter';
    favBrand = 'redmi'

    form1 = new FormGroup({
        example1: new FormControl('')
    });

    form2 = new FormGroup({
        example2: new FormControl('winter')
    });

    form3 = new FormGroup({});

    form3Data = {
        radiolo3: 'spring'
    };

    form4 = new FormGroup({});
    form4Data = {
        radiolo4: 'samsung'
    };

    invoiceItems = [
        new Item('1', 'samsung', 'Samsung', 1, 12000),
        new Item('2', 'xiomi', 'Xiomi', 1, 10500),
        new Item('3', 'motorola', 'Motorola', 1, 5530)
    ];

    items = [
        {
            label: 'Winter',
            value: 'winter',
            disabled: false
        },
        {
            label: 'Spring',
            value: 'spring',
            disabled: false
        },
        {
            label: 'Summer',
            value: 'summer',
            disabled: false
        },
        {
            label: 'Autumn',
            value: 'autumn',
            disabled: false
        }
    ];

    ngDoCheck() {
        this.form1.controls.example1.setErrors({ invalid: true });
        this.form1.controls.example1.markAsTouched();
    }
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
