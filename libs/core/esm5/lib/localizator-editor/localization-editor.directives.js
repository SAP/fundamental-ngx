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
var LocalizationEditorInputDirective = /** @class */ (function () {
    function LocalizationEditorInputDirective() {
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
    return LocalizationEditorInputDirective;
}());
export { LocalizationEditorInputDirective };
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
var LocalizationEditorTextareaDirective = /** @class */ (function () {
    function LocalizationEditorTextareaDirective() {
        /**
         * @hidden
         */
        this.fdLocalizationEditorTextareaClass = true;
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
    return LocalizationEditorTextareaDirective;
}());
export { LocalizationEditorTextareaDirective };
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
var LocalizationEditorLabel = /** @class */ (function () {
    function LocalizationEditorLabel() {
    }
    LocalizationEditorLabel.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-localization-editor-label]',
                },] }
    ];
    return LocalizationEditorLabel;
}());
export { LocalizationEditorLabel };
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
var LocalizationEditorElement = /** @class */ (function () {
    function LocalizationEditorElement() {
    }
    LocalizationEditorElement.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-localization-editor-element]',
                },] }
    ];
    return LocalizationEditorElement;
}());
export { LocalizationEditorElement };
/**
 * Not for external use. Portal to render the complex title template.
 */
var LocalizationEditorLoadLabel = /** @class */ (function () {
    /** @hidden */
    function LocalizationEditorLoadLabel(viewRef) {
        this.viewRef = viewRef;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    LocalizationEditorLoadLabel.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    };
    LocalizationEditorLoadLabel.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-localization-editor-load-label]'
                },] }
    ];
    /** @nocollapse */
    LocalizationEditorLoadLabel.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    LocalizationEditorLoadLabel.propDecorators = {
        content: [{ type: Input, args: ['fd-localization-editor-load-label',] }]
    };
    return LocalizationEditorLoadLabel;
}());
export { LocalizationEditorLoadLabel };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemF0aW9uLWVkaXRvci5kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2xvY2FsaXphdG9yLWVkaXRvci9sb2NhbGl6YXRpb24tZWRpdG9yLmRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW1CLFdBQVcsRUFBRSxLQUFLLEVBQVUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7QUFVdEg7SUFBQTtJQVlBLENBQUM7O2dCQVpBLFNBQVMsU0FBQzs7b0JBRVAsUUFBUSxFQUFFLGdDQUFnQztpQkFDN0M7OzswQkFPSSxXQUFXLFNBQUMseUJBQXlCOztJQUUxQyx1Q0FBQztDQUFBLEFBWkQsSUFZQztTQVJZLGdDQUFnQzs7Ozs7Ozs7SUFNekMsbURBQ3dCOzs7Ozs7Ozs7O0FBVzVCO0lBQUE7Ozs7UUFpQlcsc0NBQWlDLEdBQVksSUFBSSxDQUFDO0lBQzdELENBQUM7O2dCQWxCQSxTQUFTLFNBQUM7O29CQUVQLFFBQVEsRUFBRSxtQ0FBbUM7aUJBQ2hEOzs7MEJBT0ksV0FBVyxTQUFDLHlCQUF5QjtvREFNckMsV0FBVyxTQUFDLHVDQUF1Qzs7SUFFeEQsMENBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWRZLG1DQUFtQzs7Ozs7Ozs7SUFNNUMsc0RBQ3dCOzs7OztJQUt4QixnRkFDeUQ7Ozs7Ozs7Ozs7Ozs7O0FBYzdEO0lBQUE7SUFJc0MsQ0FBQzs7Z0JBSnRDLFNBQVMsU0FBQzs7b0JBRVAsUUFBUSxFQUFFLGdDQUFnQztpQkFDN0M7O0lBQ3FDLDhCQUFDO0NBQUEsQUFKdkMsSUFJdUM7U0FBMUIsdUJBQXVCOzs7Ozs7Ozs7Ozs7QUFZcEM7SUFBQTtJQUl3QyxDQUFDOztnQkFKeEMsU0FBUyxTQUFDOztvQkFFUCxRQUFRLEVBQUUsa0NBQWtDO2lCQUMvQzs7SUFDdUMsZ0NBQUM7Q0FBQSxBQUp6QyxJQUl5QztTQUE1Qix5QkFBeUI7Ozs7QUFLdEM7SUFZSSxjQUFjO0lBQ2QscUNBQW9CLE9BQXlCO1FBQXpCLFlBQU8sR0FBUCxPQUFPLENBQWtCO0lBQUcsQ0FBQztJQUVqRCxjQUFjOzs7OztJQUNkLDhDQUFROzs7O0lBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7Z0JBbkJKLFNBQVMsU0FBQzs7b0JBRVAsUUFBUSxFQUFFLHFDQUFxQztpQkFDbEQ7Ozs7Z0JBM0Y2RSxnQkFBZ0I7OzswQkE4RnpGLEtBQUssU0FBQyxtQ0FBbUM7O0lBYzlDLGtDQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FoQlksMkJBQTJCOzs7Ozs7SUFFcEMsOENBQzBCOzs7Ozs7SUFHMUIsaURBQXlDOzs7OztJQUc3Qiw4Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVtYmVkZGVkVmlld1JlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHdoaWNoIGlzIHVzZWQgYWxvbmcgd2l0aCBpbnB1dCBlbGVtZW50cywgaW5zaWRlIHRoZSBsb2NhbGl6YXRpb24gZWRpdG9yIGl0ZW0gb3IgbWFpbi5cbiAqICBgYGBodG1sXG4gKiAgPGZkLWxvY2FsaXphdGlvbi1lZGl0b3ItaXRlbT5cbiAqICAgICAgPGlucHV0IGZkLWxvY2FsaXphdGlvbi1lZGl0b3ItaW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkVOXCI+XG4gKiAgPC9mZC1sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0+XG4gKiAgYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWlucHV0XSdcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxpemF0aW9uRWRpdG9ySW5wdXREaXJlY3RpdmUge1xuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqICBWYXJpYWJsZSBpcyBjb250cm9sbGVkIGJ5IHBhcmVudCBjb21wb25lbnQgYW5kIGRlZmluZSBpZiB0aGVyZSBzaG91bGQgYmUgdXNlZCBjb21wYWN0IG1vZGVcbiAgICAgKiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtaW5wdXQtLWNvbXBhY3QnKVxuICAgIHB1YmxpYyBjb21wYWN0OiBib29sZWFuO1xufVxuXG4vKipcbiAqIERpcmVjdGl2ZSB3aGljaCBpcyB1c2VkIGFsb25nIHdpdGggdGV4dGFyZWEgZWxlbWVudHMsIGluc2lkZSB0aGUgbG9jYWxpemF0aW9uIGVkaXRvciBpdGVtIG9yIG1haW4uXG4gKiAgYGBgaHRtbFxuICogIDxmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0+XG4gKiAgICAgIDx0ZXh0YXJlYSBmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWlucHV0IHBsYWNlaG9sZGVyPVwiRU5cIj5cbiAqICA8L2ZkLWxvY2FsaXphdGlvbi1lZGl0b3ItaXRlbT5cbiAqICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLWxvY2FsaXphdGlvbi1lZGl0b3ItdGV4dGFyZWFdJyxcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxpemF0aW9uRWRpdG9yVGV4dGFyZWFEaXJlY3RpdmUge1xuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqICBWYXJpYWJsZSBpcyBjb250cm9sbGVkIGJ5IHBhcmVudCBjb21wb25lbnQgYW5kIGRlZmluZSBpZiB0aGVyZSBzaG91bGQgYmUgdXNlZCBjb21wYWN0IG1vZGVcbiAgICAgKiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtaW5wdXQtLWNvbXBhY3QnKVxuICAgIHB1YmxpYyBjb21wYWN0OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtbG9jYWxpemF0aW9uLWVkaXRvci10ZXh0YXJlYScpXG4gICAgcHVibGljIGZkTG9jYWxpemF0aW9uRWRpdG9yVGV4dGFyZWFDbGFzczogYm9vbGVhbiA9IHRydWU7XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHdoaWNoIGlzIHVzZWQgdG8gYWRkIGNvbXBsZXggY29udGVudCwgd2hpY2ggd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGFkZC1vbiBzcGFjZS5cbiAqICBgYGBodG1sXG4gKiAgPGZkLWxvY2FsaXphdGlvbi1lZGl0b3ItaXRlbT5cbiAqICAgICAgPG5nLXRlbXBsYXRlIGZkLWxvY2FsaXphdGlvbi1lZGl0b3ItbGFiZWw+XG4gKiAgICAgICAgICA8ZmQtaWNvbiBbZ2x5cGhdPVwiZmllbGQuZ2x5cGhcIj48L2ZkLWljb24+XG4gKiAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgICAgIDx0ZXh0YXJlYSBmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWlucHV0IHBsYWNlaG9sZGVyPVwiRU5cIj5cbiAqICA8L2ZkLWxvY2FsaXphdGlvbi1lZGl0b3ItaXRlbT5cbiAqICBgYGBcbiAqICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtbG9jYWxpemF0aW9uLWVkaXRvci1sYWJlbF0nLFxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGl6YXRpb25FZGl0b3JMYWJlbCB7fVxuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IGlzIHVzZWQgdG8gd3JhcCB3aG9sZSBsb2NhbGl6YXRpb24gZmllbGQgaW5zaWRlIGxpIGVsZW1lbnQuXG4gKiAgYGBgaHRtbFxuICogIDxsaSBmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWVsZW1lbnQ+XG4gKiAgICAgIDxmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0+XG4gKiAgICAgICAgICA8dGV4dGFyZWEgZmQtbG9jYWxpemF0aW9uLWVkaXRvci1pbnB1dCBwbGFjZWhvbGRlcj1cIkVOXCI+XG4gKiAgICAgIDwvZmQtbG9jYWxpemF0aW9uLWVkaXRvci1pdGVtPlxuICogIDwvbGk+XG4gKiAgYGBgXG4gKiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLWxvY2FsaXphdGlvbi1lZGl0b3ItZWxlbWVudF0nLFxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGl6YXRpb25FZGl0b3JFbGVtZW50IHt9XG5cbi8qKlxuICogTm90IGZvciBleHRlcm5hbCB1c2UuIFBvcnRhbCB0byByZW5kZXIgdGhlIGNvbXBsZXggdGl0bGUgdGVtcGxhdGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWxvYWQtbGFiZWxdJ1xufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGl6YXRpb25FZGl0b3JMb2FkTGFiZWwgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQElucHV0KCdmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWxvYWQtbGFiZWwnKVxuICAgIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHByaXZhdGUgY29udGVudFJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZikge31cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmlld1JlZi5jbGVhcigpO1xuICAgICAgICB0aGlzLmNvbnRlbnRSZWYgPSB0aGlzLnZpZXdSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuY29udGVudCk7XG4gICAgfVxufVxuIl19