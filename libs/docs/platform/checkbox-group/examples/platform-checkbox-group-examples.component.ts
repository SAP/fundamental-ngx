import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { JsonPipe } from '@angular/common';
import { CheckboxComponent, CheckboxGroupComponent, FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { SelectItem } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-platform-checkbox-group-examples',
    templateUrl: './platform-checkbox-group-example.component.html',
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, CheckboxGroupComponent, CheckboxComponent, JsonPipe]
})
export class PlatformCheckboxGroupExampleComponent {
    fruits: string[] = ['Apple', 'Banana', 'Grapes'];
    fruitsObject: { fruitsObject: [] };
    favorites = { fruitsEx: ['banana'] };
    favorites1 = { fruits1: ['Apple'] };
    languages = [
        new LanguageKnown('Java', 'java', false),
        new LanguageKnown('Javascript', 'javascript', true),
        new LanguageKnown('Python', 'python', false),
        new LanguageKnown('GoLang', 'go', true)
    ];

    validators = [Validators.requiredTrue];
    form1 = new FormGroup({
        fruitsEx: new FormControl(),
        education: new FormControl()
    });
    form2 = new FormGroup({
        fruits1: new FormControl()
    });
    form3 = new FormGroup({
        language: new FormControl()
    });

    form4 = new FormGroup({
        apple: new FormControl(false),
        banana: new FormControl(false),
        grapes: new FormControl(false)
    });
}

class LanguageKnown implements SelectItem {
    constructor(
        public label: string,
        public value: string,
        public disabled: boolean
    ) {}
}
