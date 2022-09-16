import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fdp-platform-radio-group-list-items-example',
    templateUrl: './platform-radio-group-list-items-example.component.html'
})
export class PlatformRadioGroupListItemsExampleComponent {
    favoriteOption = '';
    favoriteOption2 = 'winter';
    favBrand = 'xiomi';

    form1 = new FormGroup({
        example1: new FormControl(''),
        radiolo1: new FormControl('')
    });

    form2 = new FormGroup({
        example2: new FormControl('winter'),
        radiolo2: new FormControl('winter')
    });

    form3 = new FormGroup({
        radiolo3: new FormControl('winter')
    });

    form3Data = {
        radiolo3: 'spring'
    };

    form4 = new FormGroup({
        radiolo4: new FormControl('winter')
    });
    form4Data = {
        radiolo4: 'samsung'
    };

    form5 = new FormGroup({
        example2: new FormControl(''),
        radiolo2: new FormControl('')
    });

    form6 = new FormGroup({
        education: new FormControl('')
    });

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

    items1 = [
        {
            label: 'Education',
            value: 'education'
        }
    ];

    items2 = [
        {
            label: 'Engineering',
            value: 'engineering'
        }
    ];

    items3 = [
        {
            label: 'Work',
            value: 'work'
        }
    ];

    constructor(private readonly _messageToastService: MessageToastService) {}

    onSubmit(form: NgForm): void {
        if (this.form1.controls.radiolo1.status === 'INVALID' && form.submitted) {
            this.form1.controls.radiolo1.markAsTouched();
        }
    }

    onReset(form: FormGroup): void {
        if (form.invalid) {
            return;
        }

        form.reset();
        const content = 'Form was successfully reset.';
        this._messageToastService.open(content, {
            duration: 5000
        });
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
