/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { MegaMenuSubitemDirective } from '../mega-menu-subitem.directive';
import { MegaMenuLinkDirective } from '../mega-menu-link/mega-menu-link.directive';
import { MenuKeyboardService } from '../../menu/menu-keyboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 *  Component represents mega menu item, which contains subitems and link.
 *  ```html
 *  <fd-mega-menu-item>
 *      <a fd-mega-menu-link>Item 0</a>
 *      <li fd-mega-menu-subitem>
 *          <a fd-mega-menu-sublink>Sub Item 1</a>
 *      </li>
 *      <li fd-mega-menu-subitem>
 *          <a fd-mega-menu-sublink>Sub Item 2</a>
 *      </li>
 *      <li fd-mega-menu-subitem>
 *          <a fd-mega-menu-sublink>Sub Item 3</a>
 *      </li>
 *  </fd-mega-menu-item>
 *  ```
 *
 */
var MegaMenuItemComponent = /** @class */ (function () {
    /** @hidden */
    function MegaMenuItemComponent(elRef, menuKeyboardService, changeDetectionRef) {
        this.elRef = elRef;
        this.menuKeyboardService = menuKeyboardService;
        this.changeDetectionRef = changeDetectionRef;
        /**
         * Event thrown, when there is some keyboard event detected on mega menu item
         */
        this.keyDown = new EventEmitter();
        /**
         * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
         */
        this.onDestroy$ = new Subject();
        /**
         * Variable that specifies if the sublist menu is opened.
         */
        this.open = false;
        /**
         * Defines what should be position for sublist
         */
        this.subListPosition = 'right';
        /**
         * Event that is thrown always, when the open variable is changed
         */
        this.openChange = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    MegaMenuItemComponent.prototype.handleKeyboardEvent = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.code) {
            case ('ArrowLeft'): {
                this.closeSubList();
                this.link.focus();
                break;
            }
            case ('ArrowRight'):
            case ('Space'):
            case ('Enter'): {
                this.openSubList();
                this.changeDetectionRef.detectChanges();
                if (this.subItems.first) {
                    this.subItems.first.focus();
                }
                event.preventDefault();
                break;
            }
            default: {
                this.keyDown.emit(event);
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    MegaMenuItemComponent.prototype.clickHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** Check if click wasn't inside the component, then close. */
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.closeSubList();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuItemComponent.prototype.onResize = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.open && this.isSubListPositionRight()) {
            this.changeDetectionRef.detectChanges();
            /** @type {?} */
            var distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;
            /**
             * When the page is resized and the menu sub list goes beyond the page,
             * the sub list should go over the parent list
             */
            while (distanceFromCorner > window.innerWidth && this.getLeftPropertyFromSubList() > 1) {
                this.subList.nativeElement.style.left = (this.getLeftPropertyFromSubList() - 1) + '%';
                this.changeDetectionRef.detectChanges();
                distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;
            }
            /**
             * When the page is resized and the menu sub list was pulled over parent list,
             * the sub list should go to right side of parent list
             */
            while (distanceFromCorner < window.innerWidth && this.getLeftPropertyFromSubList() < 100) {
                this.subList.nativeElement.style.left = (this.getLeftPropertyFromSubList() + 1) + '%';
                this.changeDetectionRef.detectChanges();
                distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuItemComponent.prototype.ngAfterContentInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.link.hasChild = this.subItems.length > 0;
        this.subItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        function (item, index) { return item.keyDown
            .pipe(takeUntil(_this.onDestroy$))
            .subscribe((/**
         * @param {?} keyboardEvent
         * @return {?}
         */
        function (keyboardEvent) { return _this.handleSubListKeyDown(keyboardEvent, index); })); }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuItemComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    };
    /**
     * Keyboard events handler from sublist, the event doesn't propagate upper, when it was ArrowDown or ArrowUp.
     * It prevents from changing focus to item on primary menu list
     */
    /**
     * Keyboard events handler from sublist, the event doesn't propagate upper, when it was ArrowDown or ArrowUp.
     * It prevents from changing focus to item on primary menu list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    MegaMenuItemComponent.prototype.handleSubListKeyDown = /**
     * Keyboard events handler from sublist, the event doesn't propagate upper, when it was ArrowDown or ArrowUp.
     * It prevents from changing focus to item on primary menu list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.subItems.toArray());
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            event.stopPropagation();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuItemComponent.prototype.click = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.link.click();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuItemComponent.prototype.focus = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.link.focus();
    };
    /** Method that informs if actual position of sublist is set to right */
    /**
     * Method that informs if actual position of sublist is set to right
     * @return {?}
     */
    MegaMenuItemComponent.prototype.isSubListPositionRight = /**
     * Method that informs if actual position of sublist is set to right
     * @return {?}
     */
    function () {
        return this.subListPosition === 'right';
    };
    /** Method that changes state of open variable */
    /**
     * Method that changes state of open variable
     * @return {?}
     */
    MegaMenuItemComponent.prototype.toggleOpen = /**
     * Method that changes state of open variable
     * @return {?}
     */
    function () {
        if (this.open) {
            this.closeSubList();
        }
        else {
            this.openSubList();
        }
    };
    /** Method that closes sublist */
    /**
     * Method that closes sublist
     * @return {?}
     */
    MegaMenuItemComponent.prototype.closeSubList = /**
     * Method that closes sublist
     * @return {?}
     */
    function () {
        this.open = false;
        this.link.isExpanded = this.isShow();
        this.openChange.emit(this.open);
    };
    /** Method that opens sublist */
    /**
     * Method that opens sublist
     * @return {?}
     */
    MegaMenuItemComponent.prototype.openSubList = /**
     * Method that opens sublist
     * @return {?}
     */
    function () {
        this.open = true;
        this.link.isExpanded = this.isShow();
        this.openChange.emit(this.open);
        this.onResize();
    };
    /** Method that gives information if the sublist should behave like it is opened. */
    /**
     * Method that gives information if the sublist should behave like it is opened.
     * @return {?}
     */
    MegaMenuItemComponent.prototype.isShow = /**
     * Method that gives information if the sublist should behave like it is opened.
     * @return {?}
     */
    function () {
        return this.open && this.subItems.length > 0;
    };
    /** Method that helps with the responsive support. Gives percentage number of left css attribute on list. */
    /**
     * Method that helps with the responsive support. Gives percentage number of left css attribute on list.
     * @private
     * @return {?}
     */
    MegaMenuItemComponent.prototype.getLeftPropertyFromSubList = /**
     * Method that helps with the responsive support. Gives percentage number of left css attribute on list.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var styles = getComputedStyle(this.subList.nativeElement);
        if (styles.left) {
            if (styles.left.includes('px')) {
                return Number(styles.left.split('px')[0]) / this.parentElement.nativeElement.offsetWidth * 100;
            }
            else if (styles.left.includes('%')) {
                return Number(styles.left.split('%')[0]);
            }
        }
        else {
            return 100;
        }
    };
    MegaMenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-mega-menu-item',
                    template: "<li class=\"fd-mega-menu__item\" (click)=\"toggleOpen()\" #parentElement>\n    <ng-content select=\"[fd-mega-menu-link]\"></ng-content>\n    <ng-content></ng-content>\n    <ul class=\"fd-mega-menu__sublist\"\n        #subList\n        [attr.aria-hidden]=\"!isShow()\"\n        [ngClass]=\"{'fd-mega-menu__sublist--left': !isSubListPositionRight()}\"\n        (click)=\"$event.stopPropagation()\">\n        <ng-content select=\"[fd-mega-menu-subitem]\"></ng-content>\n    </ul>\n</li>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-mega-menu__sublist{right:initial;left:100%;z-index:2;margin-top:4px}.fd-mega-menu__sublist--left{right:100%;left:initial}.fd-mega-menu__item{cursor:pointer}.fd-mega-menu__item .fd-mega-menu__link{position:relative}.fd-mega-menu__item .fd-mega-menu__link:focus{z-index:1}ul.fd-mega-menu__sublist{margin-left:-4px}"]
                }] }
    ];
    /** @nocollapse */
    MegaMenuItemComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: MenuKeyboardService },
        { type: ChangeDetectorRef }
    ]; };
    MegaMenuItemComponent.propDecorators = {
        subItems: [{ type: ContentChildren, args: [MegaMenuSubitemDirective,] }],
        link: [{ type: ContentChild, args: [MegaMenuLinkDirective,] }],
        subList: [{ type: ViewChild, args: ['subList',] }],
        parentElement: [{ type: ViewChild, args: ['parentElement',] }],
        keyDown: [{ type: Output }],
        open: [{ type: Input }],
        subListPosition: [{ type: Input }],
        openChange: [{ type: Output }],
        handleKeyboardEvent: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        clickHandler: [{ type: HostListener, args: ['document:click', ['$event'],] }],
        onResize: [{ type: HostListener, args: ['window:resize',] }]
    };
    return MegaMenuItemComponent;
}());
export { MegaMenuItemComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuItemComponent.prototype.subItems;
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuItemComponent.prototype.link;
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuItemComponent.prototype.subList;
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuItemComponent.prototype.parentElement;
    /**
     * Event thrown, when there is some keyboard event detected on mega menu item
     * @type {?}
     */
    MegaMenuItemComponent.prototype.keyDown;
    /**
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     * @type {?}
     * @private
     */
    MegaMenuItemComponent.prototype.onDestroy$;
    /**
     * Variable that specifies if the sublist menu is opened.
     * @type {?}
     */
    MegaMenuItemComponent.prototype.open;
    /**
     * Defines what should be position for sublist
     * @type {?}
     */
    MegaMenuItemComponent.prototype.subListPosition;
    /**
     * Event that is thrown always, when the open variable is changed
     * @type {?}
     */
    MegaMenuItemComponent.prototype.openChange;
    /**
     * @type {?}
     * @private
     */
    MegaMenuItemComponent.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    MegaMenuItemComponent.prototype.menuKeyboardService;
    /**
     * @type {?}
     * @private
     */
    MegaMenuItemComponent.prototype.changeDetectionRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21lZ2EtbWVudS9tZWdhLW1lbnUtaXRlbS9tZWdhLW1lbnUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCM0M7SUEyQ0ksY0FBYztJQUNkLCtCQUNZLEtBQWlCLEVBQ2pCLG1CQUF3QyxFQUN4QyxrQkFBcUM7UUFGckMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7Ozs7UUFyQnhDLFlBQU8sR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7Ozs7UUFHakUsZUFBVSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBSWpFLFNBQUksR0FBWSxLQUFLLENBQUM7Ozs7UUFJdEIsb0JBQWUsR0FBd0IsT0FBTyxDQUFDOzs7O1FBSXRDLGVBQVUsR0FBMEIsSUFB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Qjs7Ozs7SUFHMUIsd0NBQ2tGOzs7Ozs7SUFHbEYsMkNBQWlFOzs7OztJQUdqRSxxQ0FDc0I7Ozs7O0lBR3RCLGdEQUMrQzs7Ozs7SUFHL0MsMkNBQ3lFOzs7OztJQUlyRSxzQ0FBeUI7Ozs7O0lBQ3pCLG9EQUFnRDs7Ozs7SUFDaEQsbURBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWdhTWVudVN1Yml0ZW1EaXJlY3RpdmUgfSBmcm9tICcuLi9tZWdhLW1lbnUtc3ViaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWVnYU1lbnVMaW5rRGlyZWN0aXZlIH0gZnJvbSAnLi4vbWVnYS1tZW51LWxpbmsvbWVnYS1tZW51LWxpbmsuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lbnVLZXlib2FyZFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tZW51L21lbnUta2V5Ym9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZWZhdWx0TWVudUl0ZW0gfSBmcm9tICcuLi8uLi9tZW51L2RlZmF1bHQtbWVudS1pdGVtJztcblxuZXhwb3J0IHR5cGUgTWVudVN1Ykxpc3RQb3NpdGlvbiA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cbi8qKlxuICogIENvbXBvbmVudCByZXByZXNlbnRzIG1lZ2EgbWVudSBpdGVtLCB3aGljaCBjb250YWlucyBzdWJpdGVtcyBhbmQgbGluay5cbiAqICBgYGBodG1sXG4gKiAgPGZkLW1lZ2EtbWVudS1pdGVtPlxuICogICAgICA8YSBmZC1tZWdhLW1lbnUtbGluaz5JdGVtIDA8L2E+XG4gKiAgICAgIDxsaSBmZC1tZWdhLW1lbnUtc3ViaXRlbT5cbiAqICAgICAgICAgIDxhIGZkLW1lZ2EtbWVudS1zdWJsaW5rPlN1YiBJdGVtIDE8L2E+XG4gKiAgICAgIDwvbGk+XG4gKiAgICAgIDxsaSBmZC1tZWdhLW1lbnUtc3ViaXRlbT5cbiAqICAgICAgICAgIDxhIGZkLW1lZ2EtbWVudS1zdWJsaW5rPlN1YiBJdGVtIDI8L2E+XG4gKiAgICAgIDwvbGk+XG4gKiAgICAgIDxsaSBmZC1tZWdhLW1lbnUtc3ViaXRlbT5cbiAqICAgICAgICAgIDxhIGZkLW1lZ2EtbWVudS1zdWJsaW5rPlN1YiBJdGVtIDM8L2E+XG4gKiAgICAgIDwvbGk+XG4gKiAgPC9mZC1tZWdhLW1lbnUtaXRlbT5cbiAqICBgYGBcbiAqICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLW1lZ2EtbWVudS1pdGVtJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbWVnYS1tZW51LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21lZ2EtbWVudS1pdGVtLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNZWdhTWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIERlZmF1bHRNZW51SXRlbSB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWVnYU1lbnVTdWJpdGVtRGlyZWN0aXZlKVxuICAgIHN1Ykl0ZW1zOiBRdWVyeUxpc3Q8TWVnYU1lbnVTdWJpdGVtRGlyZWN0aXZlPjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQENvbnRlbnRDaGlsZChNZWdhTWVudUxpbmtEaXJlY3RpdmUpXG4gICAgbGluazogTWVnYU1lbnVMaW5rRGlyZWN0aXZlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkKCdzdWJMaXN0JylcbiAgICBzdWJMaXN0OiBFbGVtZW50UmVmO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkKCdwYXJlbnRFbGVtZW50JylcbiAgICBwYXJlbnRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgLyoqICBFdmVudCB0aHJvd24sIHdoZW4gdGhlcmUgaXMgc29tZSBrZXlib2FyZCBldmVudCBkZXRlY3RlZCBvbiBtZWdhIG1lbnUgaXRlbSAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGtleURvd246IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8S2V5Ym9hcmRFdmVudD4oKTtcblxuICAgIC8qKiBBbiBSeEpTIFN1YmplY3QgdGhhdCB3aWxsIGtpbGwgdGhlIGRhdGEgc3RyZWFtIHVwb24gY29tcG9uZW504oCZcyBkZXN0cnVjdGlvbiAoZm9yIHVuc3Vic2NyaWJpbmcpICAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb25EZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogVmFyaWFibGUgdGhhdCBzcGVjaWZpZXMgaWYgdGhlIHN1Ymxpc3QgbWVudSBpcyBvcGVuZWQuICovXG4gICAgQElucHV0KClcbiAgICBvcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRGVmaW5lcyB3aGF0IHNob3VsZCBiZSBwb3NpdGlvbiBmb3Igc3VibGlzdCAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3ViTGlzdFBvc2l0aW9uOiBNZW51U3ViTGlzdFBvc2l0aW9uID0gJ3JpZ2h0JztcblxuICAgIC8qKiBFdmVudCB0aGF0IGlzIHRocm93biBhbHdheXMsIHdoZW4gdGhlIG9wZW4gdmFyaWFibGUgaXMgY2hhbmdlZCAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9wZW5DaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgbWVudUtleWJvYXJkU2VydmljZTogTWVudUtleWJvYXJkU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7fVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBoYW5kbGVLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAoJ0Fycm93TGVmdCcpOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVN1Ykxpc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgKCdBcnJvd1JpZ2h0Jyk6XG4gICAgICAgICAgICBjYXNlICgnU3BhY2UnKTpcbiAgICAgICAgICAgIGNhc2UgKCdFbnRlcicpOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuU3ViTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdWJJdGVtcy5maXJzdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Ykl0ZW1zLmZpcnN0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlEb3duLmVtaXQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gICAgY2xpY2tIYW5kbGVyKGV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8qKiBDaGVjayBpZiBjbGljayB3YXNuJ3QgaW5zaWRlIHRoZSBjb21wb25lbnQsIHRoZW4gY2xvc2UuICovXG4gICAgICAgIGlmICghdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTdWJMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICAgIG9uUmVzaXplKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vcGVuICYmIHRoaXMuaXNTdWJMaXN0UG9zaXRpb25SaWdodCgpKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICBsZXQgZGlzdGFuY2VGcm9tQ29ybmVyID0gdGhpcy5zdWJMaXN0Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQ7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogV2hlbiB0aGUgcGFnZSBpcyByZXNpemVkIGFuZCB0aGUgbWVudSBzdWIgbGlzdCBnb2VzIGJleW9uZCB0aGUgcGFnZSxcbiAgICAgICAgICAgICAqIHRoZSBzdWIgbGlzdCBzaG91bGQgZ28gb3ZlciB0aGUgcGFyZW50IGxpc3RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgd2hpbGUgKGRpc3RhbmNlRnJvbUNvcm5lciA+IHdpbmRvdy5pbm5lcldpZHRoICYmIHRoaXMuZ2V0TGVmdFByb3BlcnR5RnJvbVN1Ykxpc3QoKSA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ykxpc3QubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKHRoaXMuZ2V0TGVmdFByb3BlcnR5RnJvbVN1Ykxpc3QoKSAtIDEpICsgJyUnO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZUZyb21Db3JuZXIgPSB0aGlzLnN1Ykxpc3QubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5yaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXaGVuIHRoZSBwYWdlIGlzIHJlc2l6ZWQgYW5kIHRoZSBtZW51IHN1YiBsaXN0IHdhcyBwdWxsZWQgb3ZlciBwYXJlbnQgbGlzdCxcbiAgICAgICAgICAgICAqIHRoZSBzdWIgbGlzdCBzaG91bGQgZ28gdG8gcmlnaHQgc2lkZSBvZiBwYXJlbnQgbGlzdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB3aGlsZSAoZGlzdGFuY2VGcm9tQ29ybmVyIDwgd2luZG93LmlubmVyV2lkdGggJiYgdGhpcy5nZXRMZWZ0UHJvcGVydHlGcm9tU3ViTGlzdCgpIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJMaXN0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICh0aGlzLmdldExlZnRQcm9wZXJ0eUZyb21TdWJMaXN0KCkgKyAxKSArICclJztcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2VGcm9tQ29ybmVyID0gdGhpcy5zdWJMaXN0Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rLmhhc0NoaWxkID0gdGhpcy5zdWJJdGVtcy5sZW5ndGggPiAwO1xuICAgICAgICB0aGlzLnN1Ykl0ZW1zLmZvckVhY2goKGl0ZW06IE1lZ2FNZW51U3ViaXRlbURpcmVjdGl2ZSwgaW5kZXg6IG51bWJlcikgPT4gaXRlbS5rZXlEb3duXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5vbkRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGtleWJvYXJkRXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHRoaXMuaGFuZGxlU3ViTGlzdEtleURvd24oa2V5Ym9hcmRFdmVudCwgaW5kZXgpKSlcbiAgICAgICAgO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25EZXN0cm95JC5uZXh0KCk7XG4gICAgICAgIHRoaXMub25EZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEtleWJvYXJkIGV2ZW50cyBoYW5kbGVyIGZyb20gc3VibGlzdCwgdGhlIGV2ZW50IGRvZXNuJ3QgcHJvcGFnYXRlIHVwcGVyLCB3aGVuIGl0IHdhcyBBcnJvd0Rvd24gb3IgQXJyb3dVcC5cbiAgICAgKiBJdCBwcmV2ZW50cyBmcm9tIGNoYW5naW5nIGZvY3VzIHRvIGl0ZW0gb24gcHJpbWFyeSBtZW51IGxpc3RcbiAgICAgKi9cbiAgICBoYW5kbGVTdWJMaXN0S2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm1lbnVLZXlib2FyZFNlcnZpY2Uua2V5RG93bkhhbmRsZXIoZXZlbnQsIGluZGV4LCB0aGlzLnN1Ykl0ZW1zLnRvQXJyYXkoKSk7XG4gICAgICAgIGlmIChldmVudC5jb2RlID09PSAnQXJyb3dEb3duJyB8fCBldmVudC5jb2RlID09PSAnQXJyb3dVcCcpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjbGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCB0aGF0IGluZm9ybXMgaWYgYWN0dWFsIHBvc2l0aW9uIG9mIHN1Ymxpc3QgaXMgc2V0IHRvIHJpZ2h0ICovXG4gICAgcHVibGljIGlzU3ViTGlzdFBvc2l0aW9uUmlnaHQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1Ykxpc3RQb3NpdGlvbiA9PT0gJ3JpZ2h0JztcbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIHRoYXQgY2hhbmdlcyBzdGF0ZSBvZiBvcGVuIHZhcmlhYmxlICovXG4gICAgcHVibGljIHRvZ2dsZU9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTdWJMaXN0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlblN1Ykxpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdGhhdCBjbG9zZXMgc3VibGlzdCAqL1xuICAgIHB1YmxpYyBjbG9zZVN1Ykxpc3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpbmsuaXNFeHBhbmRlZCA9IHRoaXMuaXNTaG93KCk7XG4gICAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KHRoaXMub3Blbik7XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCB0aGF0IG9wZW5zIHN1Ymxpc3QgKi9cbiAgICBwdWJsaWMgb3BlblN1Ykxpc3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMubGluay5pc0V4cGFuZGVkID0gdGhpcy5pc1Nob3coKTtcbiAgICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQodGhpcy5vcGVuKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdGhhdCBnaXZlcyBpbmZvcm1hdGlvbiBpZiB0aGUgc3VibGlzdCBzaG91bGQgYmVoYXZlIGxpa2UgaXQgaXMgb3BlbmVkLiAqL1xuICAgIHB1YmxpYyBpc1Nob3coKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW4gJiYgdGhpcy5zdWJJdGVtcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdGhhdCBoZWxwcyB3aXRoIHRoZSByZXNwb25zaXZlIHN1cHBvcnQuIEdpdmVzIHBlcmNlbnRhZ2UgbnVtYmVyIG9mIGxlZnQgY3NzIGF0dHJpYnV0ZSBvbiBsaXN0LiAqL1xuICAgIHByaXZhdGUgZ2V0TGVmdFByb3BlcnR5RnJvbVN1Ykxpc3QoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnN1Ykxpc3QubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGlmIChzdHlsZXMubGVmdCkge1xuICAgICAgICAgICAgaWYgKHN0eWxlcy5sZWZ0LmluY2x1ZGVzKCdweCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcihzdHlsZXMubGVmdC5zcGxpdCgncHgnKVswXSkgLyB0aGlzLnBhcmVudEVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAqIDEwMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGVzLmxlZnQuaW5jbHVkZXMoJyUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIoc3R5bGVzLmxlZnQuc3BsaXQoJyUnKVswXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=