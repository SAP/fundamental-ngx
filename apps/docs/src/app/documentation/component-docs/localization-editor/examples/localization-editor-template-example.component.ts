import { Component } from '@angular/core';

@Component({
    selector: 'fd-localization-editor-template-example',
    templateUrl: './localization-editor-template-example.component.html'
})
export class LocalizationEditorTemplateExampleComponent {

    fields: {placeholder: string, glyph: string}[] = [
        {placeholder: 'Left', glyph: 'navigation-left-arrow'},
        {placeholder: 'Up', glyph: 'navigation-up-arrow'},
        {placeholder: 'Right', glyph: 'navigation-right-arrow'},
        {placeholder: 'Down', glyph: 'navigation-down-arrow'},
    ];
}
