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
export class MegaMenuItemComponent {
    /**
     * @hidden
     * @param {?} elRef
     * @param {?} menuKeyboardService
     * @param {?} changeDetectionRef
     */
    constructor(elRef, menuKeyboardService, changeDetectionRef) {
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
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    handleKeyboardEvent(event) {
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
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    clickHandler(event) {
        /** Check if click wasn't inside the component, then close. */
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.closeSubList();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    onResize() {
        if (this.open && this.isSubListPositionRight()) {
            this.changeDetectionRef.detectChanges();
            /** @type {?} */
            let distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;
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
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterContentInit() {
        this.link.hasChild = this.subItems.length > 0;
        this.subItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => item.keyDown
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} keyboardEvent
         * @return {?}
         */
        (keyboardEvent) => this.handleSubListKeyDown(keyboardEvent, index)))));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
    /**
     * Keyboard events handler from sublist, the event doesn't propagate upper, when it was ArrowDown or ArrowUp.
     * It prevents from changing focus to item on primary menu list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleSubListKeyDown(event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.subItems.toArray());
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            event.stopPropagation();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    click() {
        this.link.click();
    }
    /**
     * @hidden
     * @return {?}
     */
    focus() {
        this.link.focus();
    }
    /**
     * Method that informs if actual position of sublist is set to right
     * @return {?}
     */
    isSubListPositionRight() {
        return this.subListPosition === 'right';
    }
    /**
     * Method that changes state of open variable
     * @return {?}
     */
    toggleOpen() {
        if (this.open) {
            this.closeSubList();
        }
        else {
            this.openSubList();
        }
    }
    /**
     * Method that closes sublist
     * @return {?}
     */
    closeSubList() {
        this.open = false;
        this.link.isExpanded = this.isShow();
        this.openChange.emit(this.open);
    }
    /**
     * Method that opens sublist
     * @return {?}
     */
    openSubList() {
        this.open = true;
        this.link.isExpanded = this.isShow();
        this.openChange.emit(this.open);
        this.onResize();
    }
    /**
     * Method that gives information if the sublist should behave like it is opened.
     * @return {?}
     */
    isShow() {
        return this.open && this.subItems.length > 0;
    }
    /**
     * Method that helps with the responsive support. Gives percentage number of left css attribute on list.
     * @private
     * @return {?}
     */
    getLeftPropertyFromSubList() {
        /** @type {?} */
        const styles = getComputedStyle(this.subList.nativeElement);
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
    }
}
MegaMenuItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-mega-menu-item',
                template: "<li class=\"fd-mega-menu__item\" (click)=\"toggleOpen()\" #parentElement>\n    <ng-content select=\"[fd-mega-menu-link]\"></ng-content>\n    <ng-content></ng-content>\n    <ul class=\"fd-mega-menu__sublist\"\n        #subList\n        [attr.aria-hidden]=\"!isShow()\"\n        [ngClass]=\"{'fd-mega-menu__sublist--left': !isSubListPositionRight()}\"\n        (click)=\"$event.stopPropagation()\">\n        <ng-content select=\"[fd-mega-menu-subitem]\"></ng-content>\n    </ul>\n</li>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-mega-menu__sublist{right:initial;left:100%;z-index:2;margin-top:4px}.fd-mega-menu__sublist--left{right:100%;left:initial}.fd-mega-menu__item{cursor:pointer}.fd-mega-menu__item .fd-mega-menu__link{position:relative}.fd-mega-menu__item .fd-mega-menu__link:focus{z-index:1}ul.fd-mega-menu__sublist{margin-left:-4px}"]
            }] }
];
/** @nocollapse */
MegaMenuItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: MenuKeyboardService },
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21lZ2EtbWVudS9tZWdhLW1lbnUtaXRlbS9tZWdhLW1lbnUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCM0MsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7OztJQXNDOUIsWUFDWSxLQUFpQixFQUNqQixtQkFBd0MsRUFDeEMsa0JBQXFDO1FBRnJDLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1COzs7O1FBckJ4QyxZQUFPLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDOzs7O1FBR2pFLGVBQVUsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQzs7OztRQUlqRSxTQUFJLEdBQVksS0FBSyxDQUFDOzs7O1FBSXRCLG9CQUFlLEdBQXdCLE9BQU8sQ0FBQzs7OztRQUl0QyxlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7SUFPdEUsQ0FBQzs7Ozs7O0lBSUosbUJBQW1CLENBQUMsS0FBb0I7UUFDcEMsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2xCLE1BQU07YUFDVDtZQUNELEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDZixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtvQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQy9CO2dCQUNELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTTthQUNUO1lBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7U0FDSjtJQUNMLENBQUM7Ozs7OztJQUlELFlBQVksQ0FBQyxLQUFLO1FBQ2QsOERBQThEO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7Ozs7O0lBSUQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7O2dCQUNwQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUs7WUFFakY7OztlQUdHO1lBQ0gsT0FBTyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDcEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDdEYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQzthQUNqRjtZQUVEOzs7ZUFHRztZQUNILE9BQU8sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxHQUFHLEVBQUU7Z0JBQ3RGLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ3RGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7YUFDakY7U0FDSjtJQUNMLENBQUM7Ozs7O0lBR0Qsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7Ozs7UUFBQyxDQUFDLElBQThCLEVBQUUsS0FBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTzthQUNoRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoQyxTQUFTOzs7O1FBQUMsQ0FBQyxhQUE0QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFDLEVBQUMsQ0FDakc7SUFDTCxDQUFDOzs7OztJQUdELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7Ozs7SUFNRCxvQkFBb0IsQ0FBQyxLQUFvQixFQUFFLEtBQWE7UUFDcEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMvRSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3hELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7O0lBR0QsS0FBSztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFHRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUdNLHNCQUFzQjtRQUN6QixPQUFPLElBQUksQ0FBQyxlQUFlLEtBQUssT0FBTyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBR00sVUFBVTtRQUNiLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtTQUN0QjthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQzs7Ozs7SUFHTSxZQUFZO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUdNLFdBQVc7UUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUdNLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7OztJQUdPLDBCQUEwQjs7Y0FDeEIsTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzNELElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQzthQUNsRztpQkFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQzNDO1NBQ0o7YUFBTTtZQUNILE9BQU8sR0FBRyxDQUFDO1NBQ2Q7SUFDTCxDQUFDOzs7WUFwTUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLGlmQUE4QztnQkFFOUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBekNHLFVBQVU7WUFZTCxtQkFBbUI7WUFoQnhCLGlCQUFpQjs7O3VCQWlEaEIsZUFBZSxTQUFDLHdCQUF3QjttQkFJeEMsWUFBWSxTQUFDLHFCQUFxQjtzQkFJbEMsU0FBUyxTQUFDLFNBQVM7NEJBSW5CLFNBQVMsU0FBQyxlQUFlO3NCQUl6QixNQUFNO21CQU9OLEtBQUs7OEJBSUwsS0FBSzt5QkFJTCxNQUFNO2tDQVdOLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7MkJBMEJsQyxZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7dUJBU3pDLFlBQVksU0FBQyxlQUFlOzs7Ozs7O0lBN0U3Qix5Q0FDOEM7Ozs7O0lBRzlDLHFDQUM0Qjs7Ozs7SUFHNUIsd0NBQ29COzs7OztJQUdwQiw4Q0FDMEI7Ozs7O0lBRzFCLHdDQUNrRjs7Ozs7O0lBR2xGLDJDQUFpRTs7Ozs7SUFHakUscUNBQ3NCOzs7OztJQUd0QixnREFDK0M7Ozs7O0lBRy9DLDJDQUN5RTs7Ozs7SUFJckUsc0NBQXlCOzs7OztJQUN6QixvREFBZ0Q7Ozs7O0lBQ2hELG1EQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVnYU1lbnVTdWJpdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi4vbWVnYS1tZW51LXN1Yml0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lZ2FNZW51TGlua0RpcmVjdGl2ZSB9IGZyb20gJy4uL21lZ2EtbWVudS1saW5rL21lZ2EtbWVudS1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51S2V5Ym9hcmRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWVudS9tZW51LWtleWJvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVmYXVsdE1lbnVJdGVtIH0gZnJvbSAnLi4vLi4vbWVudS9kZWZhdWx0LW1lbnUtaXRlbSc7XG5cbmV4cG9ydCB0eXBlIE1lbnVTdWJMaXN0UG9zaXRpb24gPSAnbGVmdCcgfCAncmlnaHQnO1xuXG4vKipcbiAqICBDb21wb25lbnQgcmVwcmVzZW50cyBtZWdhIG1lbnUgaXRlbSwgd2hpY2ggY29udGFpbnMgc3ViaXRlbXMgYW5kIGxpbmsuXG4gKiAgYGBgaHRtbFxuICogIDxmZC1tZWdhLW1lbnUtaXRlbT5cbiAqICAgICAgPGEgZmQtbWVnYS1tZW51LWxpbms+SXRlbSAwPC9hPlxuICogICAgICA8bGkgZmQtbWVnYS1tZW51LXN1Yml0ZW0+XG4gKiAgICAgICAgICA8YSBmZC1tZWdhLW1lbnUtc3VibGluaz5TdWIgSXRlbSAxPC9hPlxuICogICAgICA8L2xpPlxuICogICAgICA8bGkgZmQtbWVnYS1tZW51LXN1Yml0ZW0+XG4gKiAgICAgICAgICA8YSBmZC1tZWdhLW1lbnUtc3VibGluaz5TdWIgSXRlbSAyPC9hPlxuICogICAgICA8L2xpPlxuICogICAgICA8bGkgZmQtbWVnYS1tZW51LXN1Yml0ZW0+XG4gKiAgICAgICAgICA8YSBmZC1tZWdhLW1lbnUtc3VibGluaz5TdWIgSXRlbSAzPC9hPlxuICogICAgICA8L2xpPlxuICogIDwvZmQtbWVnYS1tZW51LWl0ZW0+XG4gKiAgYGBgXG4gKiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1tZWdhLW1lbnUtaXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21lZ2EtbWVudS1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9tZWdhLW1lbnUtaXRlbS5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWVnYU1lbnVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBEZWZhdWx0TWVudUl0ZW0ge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE1lZ2FNZW51U3ViaXRlbURpcmVjdGl2ZSlcbiAgICBzdWJJdGVtczogUXVlcnlMaXN0PE1lZ2FNZW51U3ViaXRlbURpcmVjdGl2ZT47XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWVnYU1lbnVMaW5rRGlyZWN0aXZlKVxuICAgIGxpbms6IE1lZ2FNZW51TGlua0RpcmVjdGl2ZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZCgnc3ViTGlzdCcpXG4gICAgc3ViTGlzdDogRWxlbWVudFJlZjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZCgncGFyZW50RWxlbWVudCcpXG4gICAgcGFyZW50RWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIC8qKiAgRXZlbnQgdGhyb3duLCB3aGVuIHRoZXJlIGlzIHNvbWUga2V5Ym9hcmQgZXZlbnQgZGV0ZWN0ZWQgb24gbWVnYSBtZW51IGl0ZW0gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBrZXlEb3duOiBFdmVudEVtaXR0ZXI8S2V5Ym9hcmRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgICAvKiogQW4gUnhKUyBTdWJqZWN0IHRoYXQgd2lsbCBraWxsIHRoZSBkYXRhIHN0cmVhbSB1cG9uIGNvbXBvbmVudOKAmXMgZGVzdHJ1Y3Rpb24gKGZvciB1bnN1YnNjcmliaW5nKSAgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IG9uRGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIFZhcmlhYmxlIHRoYXQgc3BlY2lmaWVzIGlmIHRoZSBzdWJsaXN0IG1lbnUgaXMgb3BlbmVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIERlZmluZXMgd2hhdCBzaG91bGQgYmUgcG9zaXRpb24gZm9yIHN1Ymxpc3QgKi9cbiAgICBASW5wdXQoKVxuICAgIHN1Ykxpc3RQb3NpdGlvbjogTWVudVN1Ykxpc3RQb3NpdGlvbiA9ICdyaWdodCc7XG5cbiAgICAvKiogRXZlbnQgdGhhdCBpcyB0aHJvd24gYWx3YXlzLCB3aGVuIHRoZSBvcGVuIHZhcmlhYmxlIGlzIGNoYW5nZWQgKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBvcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIG1lbnVLZXlib2FyZFNlcnZpY2U6IE1lbnVLZXlib2FyZFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge31cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgKCdBcnJvd0xlZnQnKToge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VTdWJMaXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICgnQXJyb3dSaWdodCcpOlxuICAgICAgICAgICAgY2FzZSAoJ1NwYWNlJyk6XG4gICAgICAgICAgICBjYXNlICgnRW50ZXInKToge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlblN1Ykxpc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3ViSXRlbXMuZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJJdGVtcy5maXJzdC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5RG93bi5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrSGFuZGxlcihldmVudCk6IHZvaWQge1xuICAgICAgICAvKiogQ2hlY2sgaWYgY2xpY2sgd2Fzbid0IGluc2lkZSB0aGUgY29tcG9uZW50LCB0aGVuIGNsb3NlLiAqL1xuICAgICAgICBpZiAoIXRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlU3ViTGlzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgICBvblJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3BlbiAmJiB0aGlzLmlzU3ViTGlzdFBvc2l0aW9uUmlnaHQoKSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgbGV0IGRpc3RhbmNlRnJvbUNvcm5lciA9IHRoaXMuc3ViTGlzdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFdoZW4gdGhlIHBhZ2UgaXMgcmVzaXplZCBhbmQgdGhlIG1lbnUgc3ViIGxpc3QgZ29lcyBiZXlvbmQgdGhlIHBhZ2UsXG4gICAgICAgICAgICAgKiB0aGUgc3ViIGxpc3Qgc2hvdWxkIGdvIG92ZXIgdGhlIHBhcmVudCBsaXN0XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHdoaWxlIChkaXN0YW5jZUZyb21Db3JuZXIgPiB3aW5kb3cuaW5uZXJXaWR0aCAmJiB0aGlzLmdldExlZnRQcm9wZXJ0eUZyb21TdWJMaXN0KCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJMaXN0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICh0aGlzLmdldExlZnRQcm9wZXJ0eUZyb21TdWJMaXN0KCkgLSAxKSArICclJztcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2VGcm9tQ29ybmVyID0gdGhpcy5zdWJMaXN0Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogV2hlbiB0aGUgcGFnZSBpcyByZXNpemVkIGFuZCB0aGUgbWVudSBzdWIgbGlzdCB3YXMgcHVsbGVkIG92ZXIgcGFyZW50IGxpc3QsXG4gICAgICAgICAgICAgKiB0aGUgc3ViIGxpc3Qgc2hvdWxkIGdvIHRvIHJpZ2h0IHNpZGUgb2YgcGFyZW50IGxpc3RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgd2hpbGUgKGRpc3RhbmNlRnJvbUNvcm5lciA8IHdpbmRvdy5pbm5lcldpZHRoICYmIHRoaXMuZ2V0TGVmdFByb3BlcnR5RnJvbVN1Ykxpc3QoKSA8IDEwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViTGlzdC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAodGhpcy5nZXRMZWZ0UHJvcGVydHlGcm9tU3ViTGlzdCgpICsgMSkgKyAnJSc7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlRnJvbUNvcm5lciA9IHRoaXMuc3ViTGlzdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluay5oYXNDaGlsZCA9IHRoaXMuc3ViSXRlbXMubGVuZ3RoID4gMDtcbiAgICAgICAgdGhpcy5zdWJJdGVtcy5mb3JFYWNoKChpdGVtOiBNZWdhTWVudVN1Yml0ZW1EaXJlY3RpdmUsIGluZGV4OiBudW1iZXIpID0+IGl0ZW0ua2V5RG93blxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMub25EZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChrZXlib2FyZEV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB0aGlzLmhhbmRsZVN1Ykxpc3RLZXlEb3duKGtleWJvYXJkRXZlbnQsIGluZGV4KSkpXG4gICAgICAgIDtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uRGVzdHJveSQubmV4dCgpO1xuICAgICAgICB0aGlzLm9uRGVzdHJveSQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBLZXlib2FyZCBldmVudHMgaGFuZGxlciBmcm9tIHN1Ymxpc3QsIHRoZSBldmVudCBkb2Vzbid0IHByb3BhZ2F0ZSB1cHBlciwgd2hlbiBpdCB3YXMgQXJyb3dEb3duIG9yIEFycm93VXAuXG4gICAgICogSXQgcHJldmVudHMgZnJvbSBjaGFuZ2luZyBmb2N1cyB0byBpdGVtIG9uIHByaW1hcnkgbWVudSBsaXN0XG4gICAgICovXG4gICAgaGFuZGxlU3ViTGlzdEtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZW51S2V5Ym9hcmRTZXJ2aWNlLmtleURvd25IYW5kbGVyKGV2ZW50LCBpbmRleCwgdGhpcy5zdWJJdGVtcy50b0FycmF5KCkpO1xuICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ0Fycm93RG93bicgfHwgZXZlbnQuY29kZSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY2xpY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluay5jbGljaygpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluay5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdGhhdCBpbmZvcm1zIGlmIGFjdHVhbCBwb3NpdGlvbiBvZiBzdWJsaXN0IGlzIHNldCB0byByaWdodCAqL1xuICAgIHB1YmxpYyBpc1N1Ykxpc3RQb3NpdGlvblJpZ2h0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJMaXN0UG9zaXRpb24gPT09ICdyaWdodCc7XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCB0aGF0IGNoYW5nZXMgc3RhdGUgb2Ygb3BlbiB2YXJpYWJsZSAqL1xuICAgIHB1YmxpYyB0b2dnbGVPcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlU3ViTGlzdCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5TdWJMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIHRoYXQgY2xvc2VzIHN1Ymxpc3QgKi9cbiAgICBwdWJsaWMgY2xvc2VTdWJMaXN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5saW5rLmlzRXhwYW5kZWQgPSB0aGlzLmlzU2hvdygpO1xuICAgICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdCh0aGlzLm9wZW4pO1xuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdGhhdCBvcGVucyBzdWJsaXN0ICovXG4gICAgcHVibGljIG9wZW5TdWJMaXN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmxpbmsuaXNFeHBhbmRlZCA9IHRoaXMuaXNTaG93KCk7XG4gICAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KHRoaXMub3Blbik7XG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIHRoYXQgZ2l2ZXMgaW5mb3JtYXRpb24gaWYgdGhlIHN1Ymxpc3Qgc2hvdWxkIGJlaGF2ZSBsaWtlIGl0IGlzIG9wZW5lZC4gKi9cbiAgICBwdWJsaWMgaXNTaG93KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuICYmIHRoaXMuc3ViSXRlbXMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIHRoYXQgaGVscHMgd2l0aCB0aGUgcmVzcG9uc2l2ZSBzdXBwb3J0LiBHaXZlcyBwZXJjZW50YWdlIG51bWJlciBvZiBsZWZ0IGNzcyBhdHRyaWJ1dGUgb24gbGlzdC4gKi9cbiAgICBwcml2YXRlIGdldExlZnRQcm9wZXJ0eUZyb21TdWJMaXN0KCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5zdWJMaXN0Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBpZiAoc3R5bGVzLmxlZnQpIHtcbiAgICAgICAgICAgIGlmIChzdHlsZXMubGVmdC5pbmNsdWRlcygncHgnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIoc3R5bGVzLmxlZnQuc3BsaXQoJ3B4JylbMF0pIC8gdGhpcy5wYXJlbnRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggKiAxMDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0eWxlcy5sZWZ0LmluY2x1ZGVzKCclJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHN0eWxlcy5sZWZ0LnNwbGl0KCclJylbMF0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19