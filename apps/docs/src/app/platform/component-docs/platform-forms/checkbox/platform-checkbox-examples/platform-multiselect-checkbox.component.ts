import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-multiselect-checkbox',
    templateUrl: 'platform-multiselect-checkbox.component.html'
})
export class PlatformCozyChekboxExampleComponent {
    field1: string[] = [];
    field2: string[] = ['checkbox2'];
    field3: string[] = [];
    field4: string[] = ['checkbox1', 'checkbox2'];

    form1 = new FormGroup({
        field1: new FormControl([]),
        field2: new FormControl(['checkbox2'])
    });

    form2 = new FormGroup({
        field1: new FormControl([])
    });

    form3 = new FormGroup({
        field1: new FormControl(['checkbox1', 'checkbox2'])
    });
}
