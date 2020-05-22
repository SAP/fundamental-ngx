import { FormGroup, FormControl } from '@angular/forms';
import { Component, Optional } from '@angular/core';

@Component({
    selector: 'fdp-binary-checkbox',
    templateUrl: 'platform-binary-checkbox.component.html'
})
export class PlatformCompactChekboxExampleComponent {
    customForm = new FormGroup({});
    data: DataObject = new DataObject(false, true);

    yellow: boolean = false;
    white: boolean = true;
    violet: boolean;
}

class DataObject {
    constructor(public red: boolean, public blue: boolean, @Optional() public green?: boolean) {}
}
