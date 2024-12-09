import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { CheckboxComponent, FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-binary-checkbox',
    templateUrl: 'platform-binary-checkbox.component.html',
    imports: [
        FdpFormGroupModule,
        CheckboxComponent,
        FormsModule,
        ContentDensityDirective,
        ReactiveFormsModule,
        JsonPipe
    ]
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
    constructor(
        public red: boolean,
        public blue: boolean,
        public green?: boolean
    ) {}
}
