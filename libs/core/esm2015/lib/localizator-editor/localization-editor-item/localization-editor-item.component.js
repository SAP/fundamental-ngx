/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { LocalizationEditorInputDirective, LocalizationEditorLabel, LocalizationEditorTextareaDirective } from '../localization-editor.directives';
/**
 *  Component that represents field with add-on.
 *  ```html
 *  <fd-localization-editor-item [label]="'EN'">
 *      <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
export class LocalizationEditorItemComponent {
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.refreshChildInput();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.refreshChildInput();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.textarea) {
            this.type = 'textarea';
        }
    }
    /**
     * @private
     * @return {?}
     */
    refreshChildInput() {
        if (this.input) {
            this.input.compact = this.compact;
        }
        if (this.textarea) {
            this.textarea.compact = this.compact;
        }
    }
}
LocalizationEditorItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-localization-editor-item',
                template: "<div class=\"fd-input-group fd-input-group--after\"\n     [ngClass]=\"{'fd-input-group--compact' : compact}\">\n    <ng-content select=\"[fd-localization-editor-input]\"></ng-content>\n    <ng-content select=\"[fd-localization-editor-textarea]\"></ng-content>\n    <span class=\"fd-input-group__addon fd-input-group__addon--after\"\n          [ngClass]=\"(type ? 'fd-input-group__addon--' + type : '')\">\n        <ng-container *ngIf=\"labelTemplate\">\n            <ng-container [fd-localization-editor-load-label]=\"labelTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!labelTemplate\">\n            {{label}}\n        </ng-container>\n    </span>\n</div>\n<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];
LocalizationEditorItemComponent.propDecorators = {
    label: [{ type: Input }],
    compact: [{ type: Input }],
    input: [{ type: ContentChild, args: [LocalizationEditorInputDirective,] }],
    textarea: [{ type: ContentChild, args: [LocalizationEditorTextareaDirective,] }],
    labelTemplate: [{ type: ContentChild, args: [LocalizationEditorLabel, { read: TemplateRef },] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    LocalizationEditorItemComponent.prototype.type;
    /**
     * The text for the add-on on the right side.
     * @type {?}
     */
    LocalizationEditorItemComponent.prototype.label;
    /**
     * Whether to apply compact mode to to field.
     * @type {?}
     */
    LocalizationEditorItemComponent.prototype.compact;
    /**
     * @hidden
     * @type {?}
     */
    LocalizationEditorItemComponent.prototype.input;
    /**
     * @hidden
     * @type {?}
     */
    LocalizationEditorItemComponent.prototype.textarea;
    /**
     * @hidden
     * @type {?}
     */
    LocalizationEditorItemComponent.prototype.labelTemplate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemF0aW9uLWVkaXRvci1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6YXRvci1lZGl0b3IvbG9jYWxpemF0aW9uLWVkaXRvci1pdGVtL2xvY2FsaXphdGlvbi1lZGl0b3ItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxXQUFXLEVBQ1gsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxnQ0FBZ0MsRUFDaEMsdUJBQXVCLEVBQ3ZCLG1DQUFtQyxFQUN0QyxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7QUFlM0MsTUFBTSxPQUFPLCtCQUErQjs7Ozs7SUEwQnhDLFFBQVE7UUFDSixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztTQUMxQjtJQUNMLENBQUM7Ozs7O0lBRU8saUJBQWlCO1FBQ3JCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckM7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQzs7O1lBcERKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2Qyw2dEJBQXdEO2dCQUN4RCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7O29CQU9JLEtBQUs7c0JBSUwsS0FBSztvQkFJTCxZQUFZLFNBQUMsZ0NBQWdDO3VCQUk3QyxZQUFZLFNBQUMsbUNBQW1DOzRCQUloRCxZQUFZLFNBQUMsdUJBQXVCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOzs7Ozs7O0lBbkI1RCwrQ0FBYTs7Ozs7SUFHYixnREFDYzs7Ozs7SUFHZCxrREFDaUI7Ozs7O0lBR2pCLGdEQUN3Qzs7Ozs7SUFHeEMsbURBQzhDOzs7OztJQUc5Qyx3REFDZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25Jbml0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBMb2NhbGl6YXRpb25FZGl0b3JJbnB1dERpcmVjdGl2ZSxcbiAgICBMb2NhbGl6YXRpb25FZGl0b3JMYWJlbCxcbiAgICBMb2NhbGl6YXRpb25FZGl0b3JUZXh0YXJlYURpcmVjdGl2ZVxufSBmcm9tICcuLi9sb2NhbGl6YXRpb24tZWRpdG9yLmRpcmVjdGl2ZXMnO1xuXG4vKipcbiAqICBDb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGZpZWxkIHdpdGggYWRkLW9uLlxuICogIGBgYGh0bWxcbiAqICA8ZmQtbG9jYWxpemF0aW9uLWVkaXRvci1pdGVtIFtsYWJlbF09XCInRU4nXCI+XG4gKiAgICAgIDxpbnB1dCBmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJFTlwiPlxuICogIDwvZmQtbG9jYWxpemF0aW9uLWVkaXRvci1pdGVtPlxuICogIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLWxvY2FsaXphdGlvbi1lZGl0b3ItaXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xvY2FsaXphdGlvbi1lZGl0b3ItaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGl6YXRpb25FZGl0b3JJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIHRleHQgZm9yIHRoZSBhZGQtb24gb24gdGhlIHJpZ2h0IHNpZGUuICovXG4gICAgQElucHV0KClcbiAgICBsYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFdoZXRoZXIgdG8gYXBwbHkgY29tcGFjdCBtb2RlIHRvIHRvIGZpZWxkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29tcGFjdDogYm9vbGVhbjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQENvbnRlbnRDaGlsZChMb2NhbGl6YXRpb25FZGl0b3JJbnB1dERpcmVjdGl2ZSlcbiAgICBpbnB1dDogTG9jYWxpemF0aW9uRWRpdG9ySW5wdXREaXJlY3RpdmU7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTG9jYWxpemF0aW9uRWRpdG9yVGV4dGFyZWFEaXJlY3RpdmUpXG4gICAgdGV4dGFyZWE6IExvY2FsaXphdGlvbkVkaXRvclRleHRhcmVhRGlyZWN0aXZlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAQ29udGVudENoaWxkKExvY2FsaXphdGlvbkVkaXRvckxhYmVsLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pXG4gICAgbGFiZWxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaENoaWxkSW5wdXQoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQ2hpbGRJbnB1dCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGV4dGFyZWEpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9ICd0ZXh0YXJlYSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hDaGlsZElucHV0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5jb21wYWN0ID0gdGhpcy5jb21wYWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRleHRhcmVhKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRhcmVhLmNvbXBhY3QgPSB0aGlzLmNvbXBhY3Q7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=