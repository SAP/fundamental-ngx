import { OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Directive which is used along with input elements, inside the localization editor item or main.
 *  ```html
 *  <fd-localization-editor-item>
 *      <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
export declare class LocalizationEditorInputDirective {
    /**
     * @hidden
     *  Variable is controlled by parent component and define if there should be used compact mode
     * */
    compact: boolean;
}
/**
 * Directive which is used along with textarea elements, inside the localization editor item or main.
 *  ```html
 *  <fd-localization-editor-item>
 *      <textarea fd-localization-editor-input placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
export declare class LocalizationEditorTextareaDirective {
    /**
     * @hidden
     *  Variable is controlled by parent component and define if there should be used compact mode
     * */
    compact: boolean;
    /**
     * @hidden
     */
    fdLocalizationEditorTextareaClass: boolean;
}
/**
 * Directive which is used to add complex content, which will be displayed in the add-on space.
 *  ```html
 *  <fd-localization-editor-item>
 *      <ng-template fd-localization-editor-label>
 *          <fd-icon [glyph]="field.glyph"></fd-icon>
 *      </ng-template>
 *      <textarea fd-localization-editor-input placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 * */
export declare class LocalizationEditorLabel {
}
/**
 * Directive that is used to wrap whole localization field inside li element.
 *  ```html
 *  <li fd-localization-editor-element>
 *      <fd-localization-editor-item>
 *          <textarea fd-localization-editor-input placeholder="EN">
 *      </fd-localization-editor-item>
 *  </li>
 *  ```
 * */
export declare class LocalizationEditorElement {
}
/**
 * Not for external use. Portal to render the complex title template.
 */
export declare class LocalizationEditorLoadLabel implements OnInit {
    private viewRef;
    /** @hidden */
    content: TemplateRef<any>;
    /** @hidden */
    private contentRef;
    /** @hidden */
    constructor(viewRef: ViewContainerRef);
    /** @hidden */
    ngOnInit(): void;
}
