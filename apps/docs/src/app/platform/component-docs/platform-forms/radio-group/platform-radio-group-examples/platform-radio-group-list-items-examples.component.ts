import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
    selector: 'fdp-platform-radio-group-list-items-example',
    templateUrl: './platform-radio-group-list-items-example.component.html'
})
export class PlatformRadioGroupListItemsExampleComponent implements AfterViewInit {
    favoriteOption = '';
    favoriteOption2 = 'winter';
    favBrand = 'xiomi';

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

    constructor(private _cd: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    onSubmit(form: NgForm): void {
        if (this.form1.controls.radiolo1.status === 'INVALID' && form.submitted) {
            this.form1.controls.radiolo1.markAsTouched();
            this._cd.detectChanges();
        }
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
