import {
    AfterContentInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    Optional
} from '@angular/core';
import { MegaMenuSubitemDirective } from '../mega-menu-subitem.directive';
import { MegaMenuLinkDirective } from '../mega-menu-link/mega-menu-link.directive';
import { MenuKeyboardService } from '../../menu/menu-keyboard.service';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { DefaultMenuItem } from '../../menu/default-menu-item';
import { RtlService, unifyKeyboardKey } from '../../utils/public_api';

export type MenuSubListPosition = 'left' | 'right';

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
@Component({
    selector: 'fd-mega-menu-item',
    templateUrl: './mega-menu-item.component.html',
    styleUrls: ['./mega-menu-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MegaMenuItemComponent implements AfterContentInit, OnDestroy, DefaultMenuItem {

    /** @hidden */
    @ContentChildren(MegaMenuSubitemDirective)
    subItems: QueryList<MegaMenuSubitemDirective>;

    /** @hidden */
    @ContentChild(MegaMenuLinkDirective)
    link: MegaMenuLinkDirective;

    /** @hidden */
    @ViewChild('subList')
    subList: ElementRef;

    /** @hidden */
    @ViewChild('parentElement')
    parentElement: ElementRef;

    /**  Event thrown, when there is some keyboard event detected on mega menu item */
    @Output()
    readonly keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly onRefresh$: Subject<void> = new Subject<void>();


    /** Variable that specifies if the sublist menu is opened. */
    @Input()
    open: boolean = false;

    /** Defines what should be position for sublist */
    @Input()
    subListPosition: MenuSubListPosition = 'right';

    /** Event that is thrown always, when the open variable is changed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    constructor(
        private elRef: ElementRef,
        private menuKeyboardService: MenuKeyboardService,
        private changeDetectionRef: ChangeDetectorRef,
        @Optional() private rtlService: RtlService
    ) {
        this.subscribeToRtl();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        this.isSubListPositionRight() ? this._keyboardLtr(event) : this._keyboardRtl(event);
        this._keyboardDefault(event);
    }

    /** @hidden */
    @HostListener('document:click', ['$event'])
    clickHandler(event): void {
        /** Check if click wasn't inside the component, then close. */
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.closeSubList();
        }
    }

    /** @hidden */
    @HostListener('window:resize')
    onResize(): void {
        if (this.open && this.isSubListPositionRight()) {
            this.changeDetectionRef.detectChanges();
            let distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;

            /**
             * When the page is resized and the menu sub list goes beyond the page,
             * the sub list should go over the parent list
             */
            while (distanceFromCorner > window.innerWidth && this._getLeftPropertyFromSubList() > 1) {
                this.subList.nativeElement.style.left = (this._getLeftPropertyFromSubList() - 1) + '%';
                this.changeDetectionRef.detectChanges();
                distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;
            }

            /**
             * When the page is resized and the menu sub list was pulled over parent list,
             * the sub list should go to right side of parent list
             */
            while (distanceFromCorner < window.innerWidth && this._getLeftPropertyFromSubList() < 100) {
                this.subList.nativeElement.style.left = (this._getLeftPropertyFromSubList() + 1) + '%';
                this.changeDetectionRef.detectChanges();
                distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;
            }
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.link.hasChild = this.subItems.length > 0;
        this.subItems.changes
            .pipe(takeUntil(this.onDestroy$), startWith(5))
            .subscribe(() => this._refreshSubscription());
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    /**
     * Keyboard events handler from sublist, the event doesn't propagate upper, when it was ArrowDown or ArrowUp.
     * It prevents from changing focus to item on primary menu list
     */
    handleSubListKeyDown(event: KeyboardEvent, index: number): void {
        this.menuKeyboardService.keyDownHandler(event, index, this.subItems.toArray());
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.stopPropagation();
        }
    }

    /** @hidden */
    click(): void {
        this.link.click();
    }

    /** @hidden */
    focus(): void {
        this.link.focus();
    }

    /** Method that informs if actual position of sublist is set to right */
    public isSubListPositionRight(): boolean {
        return this.subListPosition === 'right';
    }

    /** Method that changes state of open variable */
    public toggleOpen(): void {
        if (this.open) {
            this.closeSubList()
        } else {
            this.openSubList();
        }
    }

    /** Method that closes sublist */
    public closeSubList(): void {
        this.open = false;
        this.link.isExpanded = this.isShow();
        this.openChange.emit(this.open);
    }

    /** Method that opens sublist */
    public openSubList(): void {
        this.open = true;
        this.link.isExpanded = this.isShow();
        this.openChange.emit(this.open);
        this.onResize();
    }

    /** Method that gives information if the sublist should behave like it is opened. */
    public isShow(): boolean {
        return this.open && this.subItems.length > 0;
    }

    /** Method that helps with the responsive support. Gives percentage number of left css attribute on list. */
    private _getLeftPropertyFromSubList(): number {
        const styles = getComputedStyle(this.subList.nativeElement);
        if (styles.left) {
            if (styles.left.includes('px')) {
                return Number(styles.left.split('px')[0]) / this.parentElement.nativeElement.offsetWidth * 100;
            } else if (styles.left.includes('%')) {
                return Number(styles.left.split('%')[0])
            }
        } else {
            return 100;
        }
    }

    /** Whether any querylist detects any changes */
    private _refreshSubscription(): void {
        /** Finish all of the streams, form before */
        this.onRefresh$.next();

        /** Merge refresh/destroy observables */
        const refreshObs = merge(this.onRefresh$, this.onDestroy$);

        this.subItems.forEach((item: MegaMenuSubitemDirective, index: number) => item.keyDown
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((keyboardEvent: KeyboardEvent) => this.handleSubListKeyDown(keyboardEvent, index)))
            ;
    }

    private _keyboardLtr(event: KeyboardEvent) {
        switch (this.getKeyCode(event)) {
            case ('ArrowLeft'): {
                this._handleCloseSubList();
                break;
            }
            case ('ArrowRight'): {
                this._handleOpenSubList(event);
                break;
            }
        }
    }

    private _keyboardRtl(event: KeyboardEvent) {
        switch (this.getKeyCode(event)) {
            case ('ArrowRight'): {
                this._handleCloseSubList();
                break;
            }
            case ('ArrowLeft'): {
                this._handleOpenSubList(event);
                break;
            }
        }
    }

    private _keyboardDefault(event: KeyboardEvent) {
        switch (this.getKeyCode(event)) {
            case (' '):
            case ('Enter'): {
                this._handleOpenSubList(event);
                break;
            }
            default: {
                event.preventDefault();
                this.keyDown.emit(event);
            }
        }
    }

    private _handleCloseSubList() {
        this.closeSubList();
        this.link.focus();
    }

    private _handleOpenSubList(event: KeyboardEvent) {
        this.openSubList();
        this.changeDetectionRef.detectChanges();
        if (this.subItems.first) {
            this.subItems.first.focus();
        }
        event.preventDefault();
    }

    private getKeyCode(event: KeyboardEvent): string {
        return unifyKeyboardKey(event);
    }

    private subscribeToRtl() {
        if (this.rtlService) {
            this.rtlService.rtl
                .pipe(
                    takeUntil(this.onDestroy$)
                )
                .subscribe(rtl => {
                    this.subListPosition = rtl ? 'left' : 'right';
                })
        }
    }
}
