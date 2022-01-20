import { FormGroup } from '@angular/forms';
import { Component, Optional } from '@angular/core';

@Component({
    selector: 'fdp-platform-binary-checkbox',
    templateUrl: 'platform-binary-checkbox.component.html'
})
export class PlatformCompactChekboxExampleComponent {
    customForm = new FormGroup({});
    data: DataObject = new DataObject(false, true);

    yellow = false;
    white = true;
    violet: boolean;

    public checkedChangeFunction(): void {}

    public indeterminateChangeFunction(): void {}

    public changeFunction(): void {}
}

class DataObject {
    constructor(public red: boolean, public blue: boolean, @Optional() public green?: boolean) {}
}
