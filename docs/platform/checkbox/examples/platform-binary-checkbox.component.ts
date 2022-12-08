import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-binary-checkbox',
    templateUrl: 'platform-binary-checkbox.component.html'
})
export class PlatformCompactChekboxExampleComponent {
    customForm = new FormGroup({
        red: new FormControl(),
        blue: new FormControl(),
        green: new FormControl()
    });
    data: DataObject = new DataObject(false, true);

    yellow = false;
    white = true;
    violet: boolean;
}

class DataObject {
    constructor(public red: boolean, public blue: boolean, public green?: boolean) {}
}
