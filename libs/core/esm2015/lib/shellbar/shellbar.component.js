/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
/**
 * The shellbar offers consistent, responsive navigation across all products and applications.
 * Includes support for branding, product navigation, search, notifications, and user settings.
 * Shellbar is a composite component comprised of mandatory and optional elements.
 */
export class ShellbarComponent {
}
ShellbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-shellbar',
                template: "<div class=\"fd-shellbar\">\n    <div class=\"fd-shellbar__group fd-shellbar__group--start\">\n        <ng-content select=\"fd-shellbar-logo\"></ng-content>\n        <div class=\"fd-shellbar__product\">\n            <ng-content select=\"fd-shellbar-title\"></ng-content>\n            <ng-content select=\"fd-product-menu\"></ng-content>\n        </div>\n        <ng-content select=\"fd-shellbar-subtitle\"></ng-content>\n    </div>\n    <div class=\"fd-shellbar__group fd-shellbar__group--end\">\n        <ng-content select=\"fd-shellbar-actions\"></ng-content>\n    </div>\n</div>\n"
            }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGxiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NoZWxsYmFyL3NoZWxsYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBVzFDLE1BQU0sT0FBTyxpQkFBaUI7OztZQUo3QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLG1sQkFBd0M7YUFDM0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGUgc2hlbGxiYXIgb2ZmZXJzIGNvbnNpc3RlbnQsIHJlc3BvbnNpdmUgbmF2aWdhdGlvbiBhY3Jvc3MgYWxsIHByb2R1Y3RzIGFuZCBhcHBsaWNhdGlvbnMuXG4gKiBJbmNsdWRlcyBzdXBwb3J0IGZvciBicmFuZGluZywgcHJvZHVjdCBuYXZpZ2F0aW9uLCBzZWFyY2gsIG5vdGlmaWNhdGlvbnMsIGFuZCB1c2VyIHNldHRpbmdzLlxuICogU2hlbGxiYXIgaXMgYSBjb21wb3NpdGUgY29tcG9uZW50IGNvbXByaXNlZCBvZiBtYW5kYXRvcnkgYW5kIG9wdGlvbmFsIGVsZW1lbnRzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXNoZWxsYmFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2hlbGxiYXIuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNoZWxsYmFyQ29tcG9uZW50IHtcbn1cbiJdfQ==