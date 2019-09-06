import { AfterContentInit, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { LocalizationEditorInputDirective, LocalizationEditorTextareaDirective } from '../localization-editor.directives';
/**
 *  Component that represents field with add-on.
 *  ```html
 *  <fd-localization-editor-item [label]="'EN'">
 *      <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
export declare class LocalizationEditorItemComponent implements OnInit, AfterContentInit, OnChanges {
    /** @hidden */
    type: string;
    /** The text for the add-on on the right side. */
    label: string;
    /** Whether to apply compact mode to to field. */
    compact: boolean;
    /** @hidden */
    input: LocalizationEditorInputDirective;
    /** @hidden */
    textarea: LocalizationEditorTextareaDirective;
    /** @hidden */
    labelTemplate: TemplateRef<any>;
    /** @hidden */
    ngOnInit(): void;
    ngOnChanges(): void;
    ngAfterContentInit(): void;
    private refreshChildInput;
}
