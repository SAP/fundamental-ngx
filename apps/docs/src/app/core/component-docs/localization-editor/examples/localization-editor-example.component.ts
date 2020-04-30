import { Component } from '@angular/core';

@Component({
    selector: 'fd-localization-editor-example',
    templateUrl: './localization-editor-example.component.html'
})
export class LocalizationEditorExampleComponent {
    fields: { placeholder: string; label: string }[] = [
        { placeholder: 'DE', label: 'DE' },
        { placeholder: 'NL', label: 'NL' },
        { placeholder: 'PL', label: 'PL' },
        { placeholder: 'ER', label: 'ER' }
    ];
}
