import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-checkbox-group-examples',
    templateUrl: './platform-checkbox-group-example.component.html'
})
export class PlatformCheckboxGroupExampleComponent {
    fruits: string[] = ['Apple', 'Banana', 'Grapes'];
    favorites = { fruitsEx: ['banana'] };
    favorites1 = { fruits1: ['Apple'] };
    languages = [
        new LanguageKnown('Java', 'java', false),
        new LanguageKnown('Javascript', 'javascript', true),
        new LanguageKnown('Python', 'python', false),
        new LanguageKnown('GoLang', 'go', true)
    ];

    validators = [Validators.requiredTrue];
    form1 = new FormGroup({});
    form2 = new FormGroup({});
    form3 = new FormGroup({});
}

class LanguageKnown implements SelectItem {
    constructor(public label: string, public value: string, public disabled: boolean) {}
}
