import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { ButtonType } from '@fundamental-ngx/core/button';
import { MenuComponent, MenuItemComponent } from '@fundamental-ngx/core/menu';

import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
import { MainAction } from './main-action';

export const splitButtonTextClass = 'fd-button-split__text';
export const splitButtonTextCompactClass = 'fd-button-split__text--compact';
const splitButtonTextClasses = [splitButtonTextClass, splitButtonTextCompactClass];

/**
 * Split Button component, used to enhance standard HTML button and add possibility to put some dropdown with
 * additional options.
 *
 * ```html
 * <fd-split-button>
 *   <fd-menu>
 *       <li fd-menu-item>
 *           <div fd-menu-interactive>
 *               <span fd-menu-title>Option 1</span>
 *           </div>
 *       </li>
 *       <li fd-menu-item>
 *           <div fd-menu-interactive>
 *               <span fd-menu-title>Option 2</span>
 *           </div>
 *       </li>
 *    </fd-menu>
 *</fd-split-button>
 * ```
 */
@Component({
    selector: 'fd-split-button',
    templateUrl: 'split-button.component.html',
    styleUrls: ['./split-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SplitButtonComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit, AfterViewInit {
    /** Whether to apply compact mode to the button. */
    @Input()
    compact?: boolean;

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input()
    glyph = 'slim-arrow-down';

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input()
    disabled: boolean;

    /** @deprecated The Title for main action button. This will be deprecated as an input but will remain a property on this component. */
    @Input()
    mainActionTitle: string;

    /** The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    @Input()
    fdType: ButtonType;

    /** Aria-label attribute used to describe expand button */
    @Input()
    expandButtonAriaLabel = 'More actions';

    /** Title attribute used to describe expand button */
    @Input()
    expandButtonTitle: string;

    /** Selected menu item */
    @Input()
    selected: MenuItemComponent;

    /** Whether or not the element should keep a fixed width. The width could change if the text changes length. */
    @Input()
    fixedWidth = true;

    /**
     * The object that contains the mainActionTitle, keepMainAction option and the callback function that should be
     * executed when the button is clicked.
     */
    @Input()
    mainAction: MainAction;

    /** aria-label attribute */
    @Input()
    arialLabel = 'Split button';

    /** Event sent when primary button is clicked */
    @Output()
    readonly primaryButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /** @hidden */
    @ContentChild(SplitButtonActionTitle, { read: TemplateRef })
    titleTemplate: TemplateRef<any> | null;

    /** @hidden */
    @ContentChild(MenuComponent)
    menu: MenuComponent;

    /** @hidden */
    @ViewChild('mainActionButton', { read: ElementRef })
    mainActionBtn: ElementRef;

    /** @hidden */
    @ViewChild('menuActionButton', { read: ElementRef })
    menuActionBtn: ElementRef;

    /** @hidden */
    mainButtonWidth: string;

    /** @hidden */
    get typeClass(): string {
        return this.fdType ? `fd-button-split--${this.fdType}` : '';
    }

    /** @hidden */
    private _menuItemSubscriptions = new Subscription();

    /** @hidden */
    private _menuSubscription = new Subscription();

    /** @hidden */
    private _contentDensitySubscription = new Subscription();

    /** @hidden */
    private _menuActivePathSubscription = new Subscription();

    /** @hidden */
    constructor(
        private _cdRef: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService,
        private _renderer: Renderer2
    ) {}

    /** @hidden Emits event when main button is clicked */
    onMainButtonClick(event: MouseEvent): void {
        this.primaryButtonClicked.emit(event);
        if (this.selected) {
            this.selected.elementRef.nativeElement.click();
        } else if (this.mainAction && this.mainAction.callback) {
            this.mainAction.callback();
        }
        event.stopPropagation();
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._contentDensitySubscription.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this._cdRef.markForCheck();
                })
            );
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.menu.menuItems.forEach((item) => {
            item.menuInteractive._fromSplitButton = true;
        });
        this._setupMenuSubscription();
        this._setupMenuItemSubscriptions();
        this._handleMainActionObject();

        if (!this.mainActionTitle && !this.titleTemplate && !this.selected) {
            this.selectMenuItem(this.menu.menuItems.first);
        } else if (!this.mainActionTitle && this.selected) {
            this.selectMenuItem(this.selected);
        }

        this._menuActivePathSubscription.add(
            this.menu.activePath.subscribe((items) => {
                const lastItem = items[items.length - 1];
                if (lastItem && !lastItem.submenu) {
                    this.menu.close();
                    this._focusTriggerElement();
                }
            })
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._addButtonTextClass();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('selected' in changes) {
            this.selectMenuItem(this.selected);
        }
        if ('mainAction' in changes) {
            this._handleMainActionObject();
        }
        if ('compact' in changes) {
            this._addButtonTextClass();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._menuItemSubscriptions.unsubscribe();
        this._menuSubscription.unsubscribe();
        this._contentDensitySubscription.unsubscribe();
        this._menuActivePathSubscription.unsubscribe();
    }

    /** Function called to select a menu item for the split button. */
    selectMenuItem(menuItem: MenuItemComponent): void {
        if (menuItem && (!this.mainAction || !this.mainAction.keepMainAction)) {
            menuItem.setSelected(true);
        }
    }

    /**
     * Wrapper gets focused programmatically by menu
     * when the "escape" button is pressed.
     * In this case we need to transit focus to the "more actions" button
     */
    _onGroupFocused(): void {
        this._focusTriggerElement();
    }

    /** @hidden */
    private _getMainButtonWidth(): void {
        if (this.mainActionBtn && this.mainActionBtn.nativeElement) {
            this.mainButtonWidth = this.mainActionBtn.nativeElement.getBoundingClientRect().width + 'px';
        }
    }

    /** @hidden */
    private _setupMenuItemSubscriptions(): void {
        this.menu.menuItems.forEach((menuItem) => {
            menuItem.onSelect.pipe(first()).subscribe(() => {
                if (this.fixedWidth) {
                    this._getMainButtonWidth();
                }
            });
            this._menuItemSubscriptions.add(
                menuItem.onSelect.subscribe(() => {
                    this._handleMenuItemSelection(menuItem);
                })
            );
        });
    }

    /** @hidden */
    private _handleMenuItemSelection(menuItem: MenuItemComponent): void {
        if (!this.mainAction || !this.mainAction.keepMainAction) {
            this.selected = menuItem;
            this.menu.menuItems.forEach((item) => {
                item.setSelected(false, true);
            });
            menuItem.setSelected(true, true);
            this.titleTemplate = null;
            this.mainActionTitle = menuItem.menuItemTitle.title;
            this._cdRef.detectChanges();
        }
    }

    /** @hidden */
    private _setupMenuSubscription(): void {
        this._menuSubscription = this.menu.menuItems.changes.subscribe(() => {
            this._menuItemSubscriptions.unsubscribe();
            this._menuItemSubscriptions.closed = false;
            this._setupMenuItemSubscriptions();
        });
        // call markForCheck once menu open state gets changed
        this._menuSubscription.add(this.menu.isOpenChange.subscribe(() => this._cdRef.markForCheck()));
    }

    /** @hidden */
    private _handleMainActionObject(): void {
        if (this.mainAction && typeof this.mainAction.mainActionTitle === 'string') {
            this.mainActionTitle = this.mainAction.mainActionTitle;
        } else if (this.mainAction && this.mainAction.mainActionTitle instanceof TemplateRef) {
            this.titleTemplate = this.mainAction.mainActionTitle;
        }
    }

    /** @hidden */
    private _addButtonTextClass(): void {
        const textSpanElement = this.mainActionBtn?.nativeElement.querySelector('.fd-button__text');
        if (!textSpanElement) {
            return;
        }
        splitButtonTextClasses.forEach((_class) => this._renderer.removeClass(textSpanElement, _class));
        if (this.compact) {
            this._renderer.addClass(textSpanElement, splitButtonTextCompactClass);
        } else {
            this._renderer.addClass(textSpanElement, splitButtonTextClass);
        }
    }

    /** @hidden */
    private _focusTriggerElement(): void {
        this.menuActionBtn?.nativeElement.focus();
    }
}
