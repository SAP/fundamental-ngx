import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    Optional
} from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { FocusableOption } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import { ListNavigationItemArrowDirective } from '../directives/list-navigation-item-arrow.directive';
import { ListNavigationItemTextDirective } from '../directives/list-navigation-item-text.directive';
import { FD_LIST_COMPONENT } from '../list-component.token';
import { ListComponentInterface } from '../list-component.interface';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-list-navigation-item], [fdListNavigaitonItem]',
    templateUrl: './list-navigation-item.component.html',
    styleUrls: ['./list-navigation-item.component.scss']
})
export class ListNavigationItemComponent implements AfterContentInit, AfterViewInit, FocusableOption {
    /** Whether or not the list item is expanded. */
    @Input()
    @HostBinding('class.is-expanded')
    expanded = false;

    /** Whether or not this list item is indicated for navigation. */
    @Input()
    @HostBinding('class.fd-list__navigation-item--indicated')
    indicated = false;

    /** @hidden */
    @HostBinding('class.fd-list__navigation-item')
    _navigationItemClass = true;

    /** @hidden */
    @HostBinding('class.fd-list__navigation-item--expandable')
    _isExpandable = false;

    /** @hidden */
    @HostBinding('attr.tabindex')
    _tabIndex;

    /** @hidden */
    @HostBinding('class.fd-list__navigation-item--condensed')
    _condensed = false;

    /** @hidden */
    @ContentChild(FD_LIST_COMPONENT)
    _listComponent: ListComponentInterface;

    /** @hidden */
    @ContentChild(ListNavigationItemArrowDirective)
    _listNavigationItemArrow: ListNavigationItemArrowDirective;

    /** @hidden */
    @ContentChild(IconComponent)
    _iconComponent: IconComponent;

    /** @hidden */
    @ContentChild(ListNavigationItemTextDirective)
    _text: ListNavigationItemTextDirective;

    /** @hidden */
    _innerText: string;

    /** @hidden
     * false if list-item is within unexpanded list (not visible to user until list expanded). default is true
     */
    _isItemVisible = true;

    /** @hidden handles rtl service */
    private _dir: 'ltr' | 'rtl' | null = 'ltr';

    /** @hidden */
    readonly _focused$ = new Subject<boolean>();

    /** @hidden */
    readonly _clicked$ = new Subject<MouseEvent>();

    /** @hidden */
    constructor(private _elementRef: ElementRef, @Optional() private _rtlService: RtlService) {}

    /** @hidden */
    ngAfterContentInit(): void {
        if (this._listComponent) {
            this._isExpandable = true;
        } else {
            this._tabIndex = 0;
        }
        if (this._iconComponent) {
            this._iconComponent._navigationItemIcon = true;
        }
        this._innerText = this._text.elementRef.nativeElement.innerText;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._subscribeToRtl();
        this._setIsItemVisible(this.expanded);
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    onItemClick(event: MouseEvent): void {
        event.stopPropagation();
        this._handleExpandedChanges(!this.expanded);
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [RIGHT_ARROW])) {
            event.preventDefault();
            this._handleExpandedChanges(this._dir === 'ltr');
        }
        if (KeyUtil.isKeyCode(event, [LEFT_ARROW])) {
            event.preventDefault();
            this._handleExpandedChanges(this._dir !== 'ltr');
        }
        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            event.preventDefault();
            event.stopPropagation();
            this._handleExpandedChanges(!this.expanded);
        }
    }

    /** @hidden */
    @HostListener('focus', ['$event'])
    protected onFocus(event: FocusEvent): void {
        this._focused$.next(event.target !== this._elementRef?.nativeElement);
    }

    /** @hidden
     * set the _isItemVisible of sublist items to true if this(containing) list is expanded.
     */
    _setIsItemVisible(value: boolean): void {
        if (this._isExpandable) {
            this._listComponent?._navItems?.forEach((item) => {
                item._isItemVisible = value;
            });
        }
    }

    /** @hidden */
    _childIndicatedAndCollapsed(): boolean {
        let retVal = false;
        this._listComponent?._navItems?.forEach((navItem) => {
            if (navItem.indicated && !navItem.expanded) {
                retVal = true;
            }
        });

        return retVal;
    }

    /** support for FocusKeyManager for arrow key navigation */
    focus(): void {
        this._elementRef.nativeElement.focus();
    }

    /** support for FocusKeyManager for arrow key navigation */
    click(): void {
        this._elementRef?.nativeElement?.click();
    }

    /** @hidden */
    private _handleExpandedChanges(expanded: boolean): void {
        if (this._isExpandable) {
            if (this.expanded === expanded) {
                return;
            }

            this.expanded = expanded;
            this._setIsItemVisible(expanded);
            this._listNavigationItemArrow._setExpanded(this.expanded);

            if (expanded) {
                setTimeout(() => {
                    this._listComponent._navItems.first.focus();
                });
            } else {
                setTimeout(() => {
                    this.focus();
                });
            }
        }
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        if (!this._rtlService) {
            return;
        }

        this._rtlService.rtl.subscribe((isRtl) => {
            this._dir = isRtl ? 'rtl' : 'ltr';
        });
    }
}
