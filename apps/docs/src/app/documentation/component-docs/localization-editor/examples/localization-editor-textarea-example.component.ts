import { Component } from '@angular/core';

@Component({
    selector: 'fd-localization-editor-textarea-example',
    templateUrl: './localization-editor-textarea-example.component.html'
})
export class LocalizationEditorTextareaExampleComponent {

    fields: {placeholder: string, label: string}[] = [
        {placeholder: 'DE', label: 'DE'},
        {placeholder: 'NL', label: 'NL'},
        {placeholder: 'PL', label: 'PL'},
        {placeholder: 'ER', label: 'ER'},
    ];
}
