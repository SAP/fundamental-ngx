import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { MegaMenuSubitemDirective } from '../mega-menu-subitem.directive';
import { MegaMenuLinkDirective } from '../mega-menu-link/mega-menu-link.directive';
import { MenuKeyboardService } from '../../menu/menu-keyboard.service';
import { DefaultMenuItem } from '../../menu/default-menu-item';
export declare type MenuSubListPosition = 'left' | 'right';
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
 * */
export declare class MegaMenuItemComponent implements AfterContentInit, OnDestroy, DefaultMenuItem {
    private elRef;
    private menuKeyboardService;
    private changeDetectionRef;
    /** @hidden */
    subItems: QueryList<MegaMenuSubitemDirective>;
    /** @hidden */
    link: MegaMenuLinkDirective;
    /** @hidden */
    subList: ElementRef;
    /** @hidden */
    parentElement: ElementRef;
    /**  Event thrown, when there is some keyboard event detected on mega menu item */
    readonly keyDown: EventEmitter<KeyboardEvent>;
    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$;
    /** Variable that specifies if the sublist menu is opened. */
    open: boolean;
    /** Defines what should be position for sublist */
    subListPosition: MenuSubListPosition;
    /** Event that is thrown always, when the open variable is changed */
    readonly openChange: EventEmitter<boolean>;
    /** @hidden */
    constructor(elRef: ElementRef, menuKeyboardService: MenuKeyboardService, changeDetectionRef: ChangeDetectorRef);
    /** @hidden */
    handleKeyboardEvent(event: KeyboardEvent): void;
    /** @hidden */
    clickHandler(event: any): void;
    /** @hidden */
    onResize(): void;
    /** @hidden */
    ngAfterContentInit(): void;
    /** @hidden */
    ngOnDestroy(): void;
    /**
     * Keyboard events handler from sublist, the event doesn't propagate upper, when it was ArrowDown or ArrowUp.
     * It prevents from changing focus to item on primary menu list
     */
    handleSubListKeyDown(event: KeyboardEvent, index: number): void;
    /** @hidden */
    click(): void;
    /** @hidden */
    focus(): void;
    /** Method that informs if actual position of sublist is set to right */
    isSubListPositionRight(): boolean;
    /** Method that changes state of open variable */
    toggleOpen(): void;
    /** Method that closes sublist */
    closeSubList(): void;
    /** Method that opens sublist */
    openSubList(): void;
    /** Method that gives information if the sublist should behave like it is opened. */
    isShow(): boolean;
    /** Method that helps with the responsive support. Gives percentage number of left css attribute on list. */
    private getLeftPropertyFromSubList;
}
