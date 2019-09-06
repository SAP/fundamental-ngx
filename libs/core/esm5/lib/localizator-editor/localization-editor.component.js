/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { LocalizationEditorMainComponent } from './localization-editor-main/localization-editor-main.component';
/**
 *  The component that represents a list of fields with add-ons inside popover
 *  ```html
 * <fd-localization-editor>
 *    <fd-localization-editor-main [label]="'EN'">
 *       <input fd-localization-editor-input type="text" placeholder="EN">
 *    </fd-localization-editor-main>
 *    <fd-localization-editor-item [label]="'DE'">
 *       <input fd-localization-editor-input type="text" placeholder="DE">
 *    </fd-localization-editor-item>
 * </fd-localization-editor>
 *  ```
 */
var LocalizationEditorComponent = /** @class */ (function () {
    function LocalizationEditorComponent() {
        /**
         * @hidden
         */
        this.fdLocalizationEditorClass = true;
        /**
         * The trigger events that will open/close the popover.
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['click'];
        /**
         * Whether the popover is open. Can be used through two-way binding.
         */
        this.isOpen = false;
        /**
         * Whether the popover should close when a click is made outside its boundaries.
         */
        this.closeOnOutsideClick = true;
        /**
         * Whether the popover should close when the escape key is pressed.
         */
        this.closeOnEscapeKey = true;
        /**
         * Event emitted when the state of the isOpen property changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Whether the inputs are in compact mode.
         */
        this.compact = false;
    }
    /**
     * Toggles the popover open state.
     */
    /**
     * Toggles the popover open state.
     * @return {?}
     */
    LocalizationEditorComponent.prototype.toggle = /**
     * Toggles the popover open state.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Closes the popover.
     */
    /**
     * Closes the popover.
     * @return {?}
     */
    LocalizationEditorComponent.prototype.close = /**
     * Closes the popover.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /**
     * Opens the popover.
     */
    /**
     * Opens the popover.
     * @return {?}
     */
    LocalizationEditorComponent.prototype.open = /**
     * Opens the popover.
     * @return {?}
     */
    function () {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /**
     * @hidden
     * Event handled always, when the popup is opened or closed.
     */
    /**
     * @hidden
     * Event handled always, when the popup is opened or closed.
     * @param {?} opened
     * @return {?}
     */
    LocalizationEditorComponent.prototype.handleOpenChange = /**
     * @hidden
     * Event handled always, when the popup is opened or closed.
     * @param {?} opened
     * @return {?}
     */
    function (opened) {
        if (this.mainElement) {
            this.mainElement.expanded = opened;
        }
    };
    LocalizationEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-localization-editor',
                    template: "<fd-popover\n    [isOpen]=\"isOpen\" [fillControlMode]=\"'equal'\" (isOpenChange)=\"handleOpenChange($event)\"\n    [closeOnEscapeKey]=\"closeOnEscapeKey\" [closeOnOutsideClick]=\"closeOnOutsideClick\"\n    [disabled]=\"disabled\" [triggers]=\"triggers\" [placement]=\"placement\">\n    <fd-popover-control>\n        <ng-content select=\"fd-localization-editor-main\"></ng-content>\n    </fd-popover-control>\n    <fd-popover-body>\n        <fd-menu>\n            <ul fd-menu-list class=\"fd-localization-editor__list\">\n                <ng-content select=\"[fd-localization-editor-element]\"></ng-content>\n                <ng-content></ng-content>\n            </ul>\n        </fd-menu>\n    </fd-popover-body>\n</fd-popover>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-localization-editor-textarea{min-height:calc(var(--fd-button-line-height) + 4px)}"]
                }] }
    ];
    LocalizationEditorComponent.propDecorators = {
        fdLocalizationEditorClass: [{ type: HostBinding, args: ['class.fd-localization-editor',] }],
        mainElement: [{ type: ContentChild, args: [LocalizationEditorMainComponent,] }],
        triggers: [{ type: Input }],
        placement: [{ type: Input }],
        isOpen: [{ type: Input }],
        closeOnOutsideClick: [{ type: Input }],
        closeOnEscapeKey: [{ type: Input }],
        isOpenChange: [{ type: Output }],
        disabled: [{ type: Input }],
        compact: [{ type: Input }]
    };
    return LocalizationEditorComponent;
}());
export { LocalizationEditorComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    LocalizationEditorComponent.prototype.fdLocalizationEditorClass;
    /**
     * @hidden
     * @type {?}
     */
    LocalizationEditorComponent.prototype.mainElement;
    /**
     * The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     * @type {?}
     */
    LocalizationEditorComponent.prototype.triggers;
    /**
     * The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     * @type {?}
     */
    LocalizationEditorComponent.prototype.placement;
    /**
     * Whether the popover is open. Can be used through two-way binding.
     * @type {?}
     */
    LocalizationEditorComponent.prototype.isOpen;
    /**
     * Whether the popover should close when a click is made outside its boundaries.
     * @type {?}
     */
    LocalizationEditorComponent.prototype.closeOnOutsideClick;
    /**
     * Whether the popover should close when the escape key is pressed.
     * @type {?}
     */
    LocalizationEditorComponent.prototype.closeOnEscapeKey;
    /**
     * Event emitted when the state of the isOpen property changes.
     * @type {?}
     */
    LocalizationEditorComponent.prototype.isOpenChange;
    /**
     * Whether to disable opening.
     * @type {?}
     */
    LocalizationEditorComponent.prototype.disabled;
    /**
     * Whether the inputs are in compact mode.
     * @type {?}
     */
    LocalizationEditorComponent.prototype.compact;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemF0aW9uLWVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemF0b3ItZWRpdG9yL2xvY2FsaXphdGlvbi1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckgsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sK0RBQStELENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBZWhIO0lBQUE7Ozs7UUFVSSw4QkFBeUIsR0FBWSxJQUFJLENBQUM7Ozs7O1FBUzFDLGFBQVEsR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7O1FBUy9CLFdBQU0sR0FBWSxLQUFLLENBQUM7Ozs7UUFJeEIsd0JBQW1CLEdBQVksSUFBSSxDQUFDOzs7O1FBSXBDLHFCQUFnQixHQUFZLElBQUksQ0FBQzs7OztRQUl4QixpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDOzs7O1FBUTNFLFlBQU8sR0FBWSxLQUFLLENBQUM7SUEwQzdCLENBQUM7SUF4Q0c7O09BRUc7Ozs7O0lBQ0ksNENBQU07Ozs7SUFBYjtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0ksMkNBQUs7Ozs7SUFBWjtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSSwwQ0FBSTs7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0ksc0RBQWdCOzs7Ozs7SUFBdkIsVUFBd0IsTUFBZTtRQUNuQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQzs7Z0JBekZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxzdUJBQW1EO29CQUVuRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3hDOzs7NENBSUksV0FBVyxTQUFDLDhCQUE4Qjs4QkFJMUMsWUFBWSxTQUFDLCtCQUErQjsyQkFLNUMsS0FBSzs0QkFLTCxLQUFLO3lCQUlMLEtBQUs7c0NBSUwsS0FBSzttQ0FJTCxLQUFLOytCQUlMLE1BQU07MkJBSU4sS0FBSzswQkFJTCxLQUFLOztJQTJDVixrQ0FBQztDQUFBLEFBMUZELElBMEZDO1NBcEZZLDJCQUEyQjs7Ozs7O0lBR3BDLGdFQUMwQzs7Ozs7SUFHMUMsa0RBQzZDOzs7Ozs7SUFJN0MsK0NBQytCOzs7Ozs7SUFJL0IsZ0RBQ3FCOzs7OztJQUdyQiw2Q0FDd0I7Ozs7O0lBR3hCLDBEQUNvQzs7Ozs7SUFHcEMsdURBQ2lDOzs7OztJQUdqQyxtREFDMkU7Ozs7O0lBRzNFLCtDQUNrQjs7Ozs7SUFHbEIsOENBQ3lCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQbGFjZW1lbnQgfSBmcm9tICdwb3BwZXIuanMnO1xuaW1wb3J0IHsgTG9jYWxpemF0aW9uRWRpdG9yTWFpbkNvbXBvbmVudCB9IGZyb20gJy4vbG9jYWxpemF0aW9uLWVkaXRvci1tYWluL2xvY2FsaXphdGlvbi1lZGl0b3ItbWFpbi5jb21wb25lbnQnO1xuXG4vKipcbiAqICBUaGUgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIGxpc3Qgb2YgZmllbGRzIHdpdGggYWRkLW9ucyBpbnNpZGUgcG9wb3ZlclxuICogIGBgYGh0bWxcbiAqIDxmZC1sb2NhbGl6YXRpb24tZWRpdG9yPlxuICogICAgPGZkLWxvY2FsaXphdGlvbi1lZGl0b3ItbWFpbiBbbGFiZWxdPVwiJ0VOJ1wiPlxuICogICAgICAgPGlucHV0IGZkLWxvY2FsaXphdGlvbi1lZGl0b3ItaW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkVOXCI+XG4gKiAgICA8L2ZkLWxvY2FsaXphdGlvbi1lZGl0b3ItbWFpbj5cbiAqICAgIDxmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0gW2xhYmVsXT1cIidERSdcIj5cbiAqICAgICAgIDxpbnB1dCBmZC1sb2NhbGl6YXRpb24tZWRpdG9yLWlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJERVwiPlxuICogICAgPC9mZC1sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0+XG4gKiA8L2ZkLWxvY2FsaXphdGlvbi1lZGl0b3I+XG4gKiAgYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtbG9jYWxpemF0aW9uLWVkaXRvcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xvY2FsaXphdGlvbi1lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydsb2NhbGl6YXRpb24tZWRpdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGl6YXRpb25FZGl0b3JDb21wb25lbnQge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWxvY2FsaXphdGlvbi1lZGl0b3InKVxuICAgIGZkTG9jYWxpemF0aW9uRWRpdG9yQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAQ29udGVudENoaWxkKExvY2FsaXphdGlvbkVkaXRvck1haW5Db21wb25lbnQpXG4gICAgbWFpbkVsZW1lbnQ6IExvY2FsaXphdGlvbkVkaXRvck1haW5Db21wb25lbnQ7XG5cbiAgICAvKiogVGhlIHRyaWdnZXIgZXZlbnRzIHRoYXQgd2lsbCBvcGVuL2Nsb3NlIHRoZSBwb3BvdmVyLlxuICAgICAqICBBY2NlcHRzIGFueSBbSFRNTCBET00gRXZlbnRzXShodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2pzcmVmL2RvbV9vYmpfZXZlbnQuYXNwKS4gKi9cbiAgICBASW5wdXQoKVxuICAgIHRyaWdnZXJzOiBzdHJpbmdbXSA9IFsnY2xpY2snXTtcblxuICAgIC8qKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBwb3BvdmVyLiBJdCBjYW4gYmUgb25lIG9mOiB0b3AsIHRvcC1zdGFydCwgdG9wLWVuZCwgYm90dG9tLFxuICAgICAqICBib3R0b20tc3RhcnQsIGJvdHRvbS1lbmQsIHJpZ2h0LCByaWdodC1zdGFydCwgcmlnaHQtZW5kLCBsZWZ0LCBsZWZ0LXN0YXJ0LCBsZWZ0LWVuZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlbWVudDogUGxhY2VtZW50O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgaXMgb3Blbi4gQ2FuIGJlIHVzZWQgdGhyb3VnaCB0d28td2F5IGJpbmRpbmcuICovXG4gICAgQElucHV0KClcbiAgICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBjbG9zZSB3aGVuIGEgY2xpY2sgaXMgbWFkZSBvdXRzaWRlIGl0cyBib3VuZGFyaWVzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgY2xvc2Ugd2hlbiB0aGUgZXNjYXBlIGtleSBpcyBwcmVzc2VkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbkVzY2FwZUtleTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzdGF0ZSBvZiB0aGUgaXNPcGVuIHByb3BlcnR5IGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgaXNPcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogV2hldGhlciB0byBkaXNhYmxlIG9wZW5pbmcuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBpbnB1dHMgYXJlIGluIGNvbXBhY3QgbW9kZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbXBhY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIHBvcG92ZXIgb3BlbiBzdGF0ZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBwb3BvdmVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLmlzT3Blbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgcG9wb3Zlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLmlzT3Blbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogRXZlbnQgaGFuZGxlZCBhbHdheXMsIHdoZW4gdGhlIHBvcHVwIGlzIG9wZW5lZCBvciBjbG9zZWQuXG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZU9wZW5DaGFuZ2Uob3BlbmVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1haW5FbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1haW5FbGVtZW50LmV4cGFuZGVkID0gb3BlbmVkO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19