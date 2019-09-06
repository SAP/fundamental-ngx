/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { LocalizationEditorItemComponent } from '../localization-editor-item/localization-editor-item.component';
/**
 *  Component that represents the field which is always visible and is rendered outside the popover.
 *  ```html
 *  <fd-localization-editor-main [label]="'EN'">
 *       <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-main>
 *  ```
 */
var LocalizationEditorMainComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LocalizationEditorMainComponent, _super);
    function LocalizationEditorMainComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalizationEditorMainComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-localization-editor-main',
                    template: "<div class=\"fd-input-group fd-input-group--after\"\n     [ngClass]=\"{'fd-input-group--compact' : compact}\"\n>\n    <ng-content select=\"[fd-localization-editor-input]\"></ng-content>\n    <ng-content select=\"[fd-localization-editor-textarea]\"></ng-content>\n    <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\"\n          [ngClass]=\"(type ? 'fd-input-group__addon--' + type : '')\">\n        <button class=\"fd-button--light fd-localization-editor__button\" aria-haspopup=\"true\"\n                [attr.aria-expanded]=\"expanded\">\n            <ng-container *ngIf=\"labelTemplate\">\n                <ng-container [fd-localization-editor-load-label]=\"labelTemplate\"></ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"!labelTemplate\">\n                {{label}}\n            </ng-container>\n        </button>\n    </span>\n</div>\n<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return LocalizationEditorMainComponent;
}(LocalizationEditorItemComponent));
export { LocalizationEditorMainComponent };
if (false) {
    /**
     * @hidden
     * This variable is controlled by parent component
     *
     * @type {?}
     */
    LocalizationEditorMainComponent.prototype.expanded;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemF0aW9uLWVkaXRvci1tYWluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6YXRvci1lZGl0b3IvbG9jYWxpemF0aW9uLWVkaXRvci1tYWluL2xvY2FsaXphdGlvbi1lZGl0b3ItbWFpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGdFQUFnRSxDQUFDOzs7Ozs7Ozs7QUFVakg7SUFLcUQsMkRBQStCO0lBTHBGOztJQVlBLENBQUM7O2dCQVpBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2Qyw4N0JBQXdEO29CQUN4RCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7O0lBUUQsc0NBQUM7Q0FBQSxBQVpELENBS3FELCtCQUErQixHQU9uRjtTQVBZLCtCQUErQjs7Ozs7Ozs7SUFNeEMsbURBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYWxpemF0aW9uRWRpdG9ySXRlbUNvbXBvbmVudCB9IGZyb20gJy4uL2xvY2FsaXphdGlvbi1lZGl0b3ItaXRlbS9sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0uY29tcG9uZW50JztcblxuLyoqXG4gKiAgQ29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyB0aGUgZmllbGQgd2hpY2ggaXMgYWx3YXlzIHZpc2libGUgYW5kIGlzIHJlbmRlcmVkIG91dHNpZGUgdGhlIHBvcG92ZXIuXG4gKiAgYGBgaHRtbFxuICogIDxmZC1sb2NhbGl6YXRpb24tZWRpdG9yLW1haW4gW2xhYmVsXT1cIidFTidcIj5cbiAqICAgICAgIDxpbnB1dCBmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJFTlwiPlxuICogIDwvZmQtbG9jYWxpemF0aW9uLWVkaXRvci1tYWluPlxuICogIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLWxvY2FsaXphdGlvbi1lZGl0b3ItbWFpbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xvY2FsaXphdGlvbi1lZGl0b3ItbWFpbi5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGl6YXRpb25FZGl0b3JNYWluQ29tcG9uZW50IGV4dGVuZHMgTG9jYWxpemF0aW9uRWRpdG9ySXRlbUNvbXBvbmVudCB7XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogVGhpcyB2YXJpYWJsZSBpcyBjb250cm9sbGVkIGJ5IHBhcmVudCBjb21wb25lbnRcbiAgICAgKiAqL1xuICAgIGV4cGFuZGVkOiBib29sZWFuO1xufVxuIl19