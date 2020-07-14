import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SwitchChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fd-switch-forms-example',
    templateUrl: './switch-forms-example.component.html'
})
export class SwitchFormsExampleComponent {
  customForm = new FormGroup({});
  switchFormInitData: DataObject = new DataObject(false, true, false);

  onSwitchChange(value: SwitchChangeEvent): void {}
}

class DataObject {
  constructor(public switch1: boolean, public switch2: boolean, public switch3: boolean) {}
}
