import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { LocalizationEditorInputDirective, LocalizationEditorLabel } from '../localization-editor.directives';

/**
 *  Component that represents field with add-on. It is made to be inside popover.
 *  ```html
 *  <fd-localization-editor-item [label]="'EN'">
 *       <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
@Component({
  selector: 'fd-localization-editor-item',
  templateUrl: './localization-editor-item.component.html',
})
export class LocalizationEditorItemComponent implements OnInit {

    /** The text for the right add-on. */
    @Input() label: string;

    /** @hidden */
    type: string;

    /** @hidden */
    compact: boolean;

    /** @hidden */
    @ContentChild(LocalizationEditorInputDirective) input: LocalizationEditorInputDirective;

    /** @hidden */
    @ContentChild(LocalizationEditorLabel, {read: TemplateRef}) labelTemplate: TemplateRef<any>;

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
