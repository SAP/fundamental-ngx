import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-localization-editor-forms-example',
    templateUrl: './localization-editor-forms-example.component.html'
})
export class LocalizationEditorFormsExampleComponent {

    customForm = new FormGroup({
        en: new FormControl(''),
        de: new FormControl(''),
        pl: new FormControl(''),
        ca: new FormControl(''),
        nl: new FormControl('')
    });

    otherLanguages: string[] = ['de', 'pl', 'ca', 'nl'];
}
