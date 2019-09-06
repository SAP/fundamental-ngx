/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class LocalizationEditorMainComponent extends LocalizationEditorItemComponent {
}
LocalizationEditorMainComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-localization-editor-main',
                template: "<div class=\"fd-input-group fd-input-group--after\"\n     [ngClass]=\"{'fd-input-group--compact' : compact}\"\n>\n    <ng-content select=\"[fd-localization-editor-input]\"></ng-content>\n    <ng-content select=\"[fd-localization-editor-textarea]\"></ng-content>\n    <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\"\n          [ngClass]=\"(type ? 'fd-input-group__addon--' + type : '')\">\n        <button class=\"fd-button--light fd-localization-editor__button\" aria-haspopup=\"true\"\n                [attr.aria-expanded]=\"expanded\">\n            <ng-container *ngIf=\"labelTemplate\">\n                <ng-container [fd-localization-editor-load-label]=\"labelTemplate\"></ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"!labelTemplate\">\n                {{label}}\n            </ng-container>\n        </button>\n    </span>\n</div>\n<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];
if (false) {
    /**
     * @hidden
     * This variable is controlled by parent component
     *
     * @type {?}
     */
    LocalizationEditorMainComponent.prototype.expanded;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemF0aW9uLWVkaXRvci1tYWluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6YXRvci1lZGl0b3IvbG9jYWxpemF0aW9uLWVkaXRvci1tYWluL2xvY2FsaXphdGlvbi1lZGl0b3ItbWFpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7Ozs7Ozs7OztBQWVqSCxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsK0JBQStCOzs7WUFMbkYsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLDg3QkFBd0Q7Z0JBQ3hELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3hDOzs7Ozs7Ozs7SUFPRyxtREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhbGl6YXRpb25FZGl0b3JJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi4vbG9jYWxpemF0aW9uLWVkaXRvci1pdGVtL2xvY2FsaXphdGlvbi1lZGl0b3ItaXRlbS5jb21wb25lbnQnO1xuXG4vKipcbiAqICBDb21wb25lbnQgdGhhdCByZXByZXNlbnRzIHRoZSBmaWVsZCB3aGljaCBpcyBhbHdheXMgdmlzaWJsZSBhbmQgaXMgcmVuZGVyZWQgb3V0c2lkZSB0aGUgcG9wb3Zlci5cbiAqICBgYGBodG1sXG4gKiAgPGZkLWxvY2FsaXphdGlvbi1lZGl0b3ItbWFpbiBbbGFiZWxdPVwiJ0VOJ1wiPlxuICogICAgICAgPGlucHV0IGZkLWxvY2FsaXphdGlvbi1lZGl0b3ItaW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkVOXCI+XG4gKiAgPC9mZC1sb2NhbGl6YXRpb24tZWRpdG9yLW1haW4+XG4gKiAgYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtbG9jYWxpemF0aW9uLWVkaXRvci1tYWluJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbG9jYWxpemF0aW9uLWVkaXRvci1tYWluLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIExvY2FsaXphdGlvbkVkaXRvck1haW5Db21wb25lbnQgZXh0ZW5kcyBMb2NhbGl6YXRpb25FZGl0b3JJdGVtQ29tcG9uZW50IHtcblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBUaGlzIHZhcmlhYmxlIGlzIGNvbnRyb2xsZWQgYnkgcGFyZW50IGNvbXBvbmVudFxuICAgICAqICovXG4gICAgZXhwYW5kZWQ6IGJvb2xlYW47XG59XG4iXX0=