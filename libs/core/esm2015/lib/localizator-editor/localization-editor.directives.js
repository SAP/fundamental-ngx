/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostBinding, Input, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Directive which is used along with input elements, inside the localization editor item or main.
 *  ```html
 *  <fd-localization-editor-item>
 *      <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
export class LocalizationEditorInputDirective {
}
LocalizationEditorInputDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-localization-editor-input]'
            },] }
];
LocalizationEditorInputDirective.propDecorators = {
    compact: [{ type: HostBinding, args: ['class.fd-input--compact',] }]
};
if (false) {
    /**
     * @hidden
     *  Variable is controlled by parent component and define if there should be used compact mode
     *
     * @type {?}
     */
    LocalizationEditorInputDirective.prototype.compact;
}
/**
 * Directive which is used along with textarea elements, inside the localization editor item or main.
 *  ```html
 *  <fd-localization-editor-item>
 *      <textarea fd-localization-editor-input placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
export class LocalizationEditorTextareaDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdLocalizationEditorTextareaClass = true;
    }
}
LocalizationEditorTextareaDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-localization-editor-textarea]',
            },] }
];
LocalizationEditorTextareaDirective.propDecorators = {
    compact: [{ type: HostBinding, args: ['class.fd-input--compact',] }],
    fdLocalizationEditorTextareaClass: [{ type: HostBinding, args: ['class.fd-localization-editor-textarea',] }]
};
if (false) {
    /**
     * @hidden
     *  Variable is controlled by parent component and define if there should be used compact mode
     *
     * @type {?}
     */
    LocalizationEditorTextareaDirective.prototype.compact;
    /**
     * @hidden
     * @type {?}
     */
    LocalizationEditorTextareaDirective.prototype.fdLocalizationEditorTextareaClass;
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
 *
 */
export class LocalizationEditorLabel {
}
LocalizationEditorLabel.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-localization-editor-label]',
            },] }
];
/**
 * Directive that is used to wrap whole localization field inside li element.
 *  ```html
 *  <li fd-localization-editor-element>
 *      <fd-localization-editor-item>
 *          <textarea fd-localization-editor-input placeholder="EN">
 *      </fd-localization-editor-item>
 *  </li>
 *  ```
 *
 */
export class LocalizationEditorElement {
}
LocalizationEditorElement.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-localization-editor-element]',
            },] }
];
/**
 * Not for external use. Portal to render the complex title template.
 */
export class LocalizationEditorLoadLabel {
    /**
     * @hidden
     * @param {?} viewRef
     */
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    }
}
LocalizationEditorLoadLabel.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-localization-editor-load-label]'
            },] }
];
/** @nocollapse */
LocalizationEditorLoadLabel.ctorParameters = () => [
    { type: ViewContainerRef }
];
LocalizationEditorLoadLabel.propDecorators = {
    content: [{ type: Input, args: ['fd-localization-editor-load-label',] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    LocalizationEditorLoadLabel.prototype.content;
    /**
     * @hidden
     * @type {?}
     * @private
     */
    LocalizationEditorLoadLabel.prototype.contentRef;
    /**
     * @type {?}
     * @private
     */
    LocalizationEditorLoadLabel.prototype.viewRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemF0aW9uLWVkaXRvci5kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2xvY2FsaXphdG9yLWVkaXRvci9sb2NhbGl6YXRpb24tZWRpdG9yLmRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW1CLFdBQVcsRUFBRSxLQUFLLEVBQVUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7QUFjdEgsTUFBTSxPQUFPLGdDQUFnQzs7O1lBSjVDLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLGdDQUFnQzthQUM3Qzs7O3NCQU9JLFdBQVcsU0FBQyx5QkFBeUI7Ozs7Ozs7OztJQUF0QyxtREFDd0I7Ozs7Ozs7Ozs7QUFlNUIsTUFBTSxPQUFPLG1DQUFtQztJQUpoRDs7OztRQWlCVyxzQ0FBaUMsR0FBWSxJQUFJLENBQUM7SUFDN0QsQ0FBQzs7O1lBbEJBLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLG1DQUFtQzthQUNoRDs7O3NCQU9JLFdBQVcsU0FBQyx5QkFBeUI7Z0RBTXJDLFdBQVcsU0FBQyx1Q0FBdUM7Ozs7Ozs7OztJQU5wRCxzREFDd0I7Ozs7O0lBS3hCLGdGQUN5RDs7Ozs7Ozs7Ozs7Ozs7QUFrQjdELE1BQU0sT0FBTyx1QkFBdUI7OztZQUpuQyxTQUFTLFNBQUM7O2dCQUVQLFFBQVEsRUFBRSxnQ0FBZ0M7YUFDN0M7Ozs7Ozs7Ozs7Ozs7QUFpQkQsTUFBTSxPQUFPLHlCQUF5Qjs7O1lBSnJDLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLGtDQUFrQzthQUMvQzs7Ozs7QUFVRCxNQUFNLE9BQU8sMkJBQTJCOzs7OztJQVNwQyxZQUFvQixPQUF5QjtRQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtJQUFHLENBQUM7Ozs7O0lBR2pELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7O1lBbkJKLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLHFDQUFxQzthQUNsRDs7OztZQTNGNkUsZ0JBQWdCOzs7c0JBOEZ6RixLQUFLLFNBQUMsbUNBQW1DOzs7Ozs7O0lBQTFDLDhDQUMwQjs7Ozs7O0lBRzFCLGlEQUF5Qzs7Ozs7SUFHN0IsOENBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbWJlZGRlZFZpZXdSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB3aGljaCBpcyB1c2VkIGFsb25nIHdpdGggaW5wdXQgZWxlbWVudHMsIGluc2lkZSB0aGUgbG9jYWxpemF0aW9uIGVkaXRvciBpdGVtIG9yIG1haW4uXG4gKiAgYGBgaHRtbFxuICogIDxmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0+XG4gKiAgICAgIDxpbnB1dCBmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJFTlwiPlxuICogIDwvZmQtbG9jYWxpemF0aW9uLWVkaXRvci1pdGVtPlxuICogIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtbG9jYWxpemF0aW9uLWVkaXRvci1pbnB1dF0nXG59KVxuZXhwb3J0IGNsYXNzIExvY2FsaXphdGlvbkVkaXRvcklucHV0RGlyZWN0aXZlIHtcblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiAgVmFyaWFibGUgaXMgY29udHJvbGxlZCBieSBwYXJlbnQgY29tcG9uZW50IGFuZCBkZWZpbmUgaWYgdGhlcmUgc2hvdWxkIGJlIHVzZWQgY29tcGFjdCBtb2RlXG4gICAgICogKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWlucHV0LS1jb21wYWN0JylcbiAgICBwdWJsaWMgY29tcGFjdDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgd2hpY2ggaXMgdXNlZCBhbG9uZyB3aXRoIHRleHRhcmVhIGVsZW1lbnRzLCBpbnNpZGUgdGhlIGxvY2FsaXphdGlvbiBlZGl0b3IgaXRlbSBvciBtYWluLlxuICogIGBgYGh0bWxcbiAqICA8ZmQtbG9jYWxpemF0aW9uLWVkaXRvci1pdGVtPlxuICogICAgICA8dGV4dGFyZWEgZmQtbG9jYWxpemF0aW9uLWVkaXRvci1pbnB1dCBwbGFjZWhvbGRlcj1cIkVOXCI+XG4gKiAgPC9mZC1sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0+XG4gKiAgYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1sb2NhbGl6YXRpb24tZWRpdG9yLXRleHRhcmVhXScsXG59KVxuZXhwb3J0IGNsYXNzIExvY2FsaXphdGlvbkVkaXRvclRleHRhcmVhRGlyZWN0aXZlIHtcblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiAgVmFyaWFibGUgaXMgY29udHJvbGxlZCBieSBwYXJlbnQgY29tcG9uZW50IGFuZCBkZWZpbmUgaWYgdGhlcmUgc2hvdWxkIGJlIHVzZWQgY29tcGFjdCBtb2RlXG4gICAgICogKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWlucHV0LS1jb21wYWN0JylcbiAgICBwdWJsaWMgY29tcGFjdDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWxvY2FsaXphdGlvbi1lZGl0b3ItdGV4dGFyZWEnKVxuICAgIHB1YmxpYyBmZExvY2FsaXphdGlvbkVkaXRvclRleHRhcmVhQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xufVxuXG4vKipcbiAqIERpcmVjdGl2ZSB3aGljaCBpcyB1c2VkIHRvIGFkZCBjb21wbGV4IGNvbnRlbnQsIHdoaWNoIHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSBhZGQtb24gc3BhY2UuXG4gKiAgYGBgaHRtbFxuICogIDxmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0+XG4gKiAgICAgIDxuZy10ZW1wbGF0ZSBmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWxhYmVsPlxuICogICAgICAgICAgPGZkLWljb24gW2dseXBoXT1cImZpZWxkLmdseXBoXCI+PC9mZC1pY29uPlxuICogICAgICA8L25nLXRlbXBsYXRlPlxuICogICAgICA8dGV4dGFyZWEgZmQtbG9jYWxpemF0aW9uLWVkaXRvci1pbnB1dCBwbGFjZWhvbGRlcj1cIkVOXCI+XG4gKiAgPC9mZC1sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0+XG4gKiAgYGBgXG4gKiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLWxvY2FsaXphdGlvbi1lZGl0b3ItbGFiZWxdJyxcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxpemF0aW9uRWRpdG9yTGFiZWwge31cblxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCBpcyB1c2VkIHRvIHdyYXAgd2hvbGUgbG9jYWxpemF0aW9uIGZpZWxkIGluc2lkZSBsaSBlbGVtZW50LlxuICogIGBgYGh0bWxcbiAqICA8bGkgZmQtbG9jYWxpemF0aW9uLWVkaXRvci1lbGVtZW50PlxuICogICAgICA8ZmQtbG9jYWxpemF0aW9uLWVkaXRvci1pdGVtPlxuICogICAgICAgICAgPHRleHRhcmVhIGZkLWxvY2FsaXphdGlvbi1lZGl0b3ItaW5wdXQgcGxhY2Vob2xkZXI9XCJFTlwiPlxuICogICAgICA8L2ZkLWxvY2FsaXphdGlvbi1lZGl0b3ItaXRlbT5cbiAqICA8L2xpPlxuICogIGBgYFxuICogKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWVsZW1lbnRdJyxcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxpemF0aW9uRWRpdG9yRWxlbWVudCB7fVxuXG4vKipcbiAqIE5vdCBmb3IgZXh0ZXJuYWwgdXNlLiBQb3J0YWwgdG8gcmVuZGVyIHRoZSBjb21wbGV4IHRpdGxlIHRlbXBsYXRlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtbG9jYWxpemF0aW9uLWVkaXRvci1sb2FkLWxhYmVsXSdcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxpemF0aW9uRWRpdG9yTG9hZExhYmVsIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBJbnB1dCgnZmQtbG9jYWxpemF0aW9uLWVkaXRvci1sb2FkLWxhYmVsJylcbiAgICBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwcml2YXRlIGNvbnRlbnRSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYpIHt9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXdSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5jb250ZW50UmVmID0gdGhpcy52aWV3UmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmNvbnRlbnQpO1xuICAgIH1cbn1cbiJdfQ==