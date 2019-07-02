import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { LocalizationEditorInputDirective, LocalizationEditorLabel } from '../localization-editor.directives';

/**
 *  Component that represents main field with add-on and is always visible
 *  ```html
 *  <fd-localization-editor-main [label]="'EN'">
 *       <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-main>
 *  ```
 */
@Component({
    selector: 'fd-localization-editor-main',
    templateUrl: './localization-editor-main.component.html'
})
export class LocalizationEditorMainComponent implements OnInit {

    /** The text for the right add-on. */
    @Input() label: string;

    /** @hidden */
    type: string;

    /** @hidden */
    compact: boolean;

    /** @hidden */
    @ContentChild(LocalizationEditorInputDirective) input: LocalizationEditorInputDirective;

    /** @hidden */
    @ContentChild(LocalizationEditorLabel, { read: TemplateRef }) labelTemplate: TemplateRef<any>;

    /** @hidden */
    ngOnInit() {
        if (this.input) {
            this.input.compact = this.compact;
        }
    }

    /** @hidden */
    public setProperties(compact: boolean, type: string) {
        this.compact = compact;
        this.type = type;
        this.ngOnInit();
    }
}
