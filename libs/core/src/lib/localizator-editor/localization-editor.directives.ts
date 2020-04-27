import { Directive, EmbeddedViewRef, HostBinding, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Directive which is used along with input elements, inside the localization editor item or main.
 *  ```html
 *  <fd-localization-editor-item>
 *      <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-localization-editor-input]'
})
export class LocalizationEditorInputDirective {
    /** @hidden */
    @HostBinding('class.fd-input-group__input')
    fdInputGroupInputClass: boolean = true;
}

/**
 * Directive which is used along with textarea elements, inside the localization editor item or main.
 *  ```html
 *  <fd-localization-editor-item>
 *      <textarea fd-localization-editor-input placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-localization-editor-textarea]'
})
export class LocalizationEditorTextareaDirective {
    /**
     * @hidden
     *  Variable is controlled by parent component and define if there should be used compact mode
     * */
    @HostBinding('class.fd-input--compact')
    public compact: boolean;

    /** @hidden */
    @HostBinding('class.fd-input-group__input')
    fdInputGroupInputClass: boolean = true;

    /**
     * @hidden
     */
    @HostBinding('class.fd-localization-editor-textarea')
    public fdLocalizationEditorTextareaClass: boolean = true;
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
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-localization-editor-label]'
})
export class LocalizationEditorLabel {}

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
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-localization-editor-element]'
})
export class LocalizationEditorElement {
    /** @hidden */
    @HostBinding('class.fd-localization-editor__language')
    fdLocalizationEditorLanguage: boolean = true;
}

/**
 * Not for external use. Portal to render the complex title template.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-localization-editor-load-label]'
})
export class LocalizationEditorLoadLabel implements OnInit {
    /** @hidden */
    @Input('fd-localization-editor-load-label')
    content: TemplateRef<any>;

    /** @hidden */
    private contentRef: EmbeddedViewRef<any>;

    /** @hidden */
    constructor(private viewRef: ViewContainerRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    }
}
