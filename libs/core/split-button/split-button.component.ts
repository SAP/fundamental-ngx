import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ButtonType } from '@fundamental-ngx/core/button';
import { MenuComponent, MenuItemComponent } from '@fundamental-ngx/core/menu';
import { Subscription, tap } from 'rxjs';
import { first } from 'rxjs/operators';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { MenuTriggerDirective } from '@fundamental-ngx/core/menu';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { MainAction } from './main-action';
import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';

export const splitButtonTextClass = 'fd-button-split__text';
const splitButtonTextClasses = [splitButtonTextClass];

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
    styleUrl: './split-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [contentDensityObserverProviders()],
    standalone: true,
    imports: [NgClass, MenuTriggerDirective, ButtonComponent, NgTemplateOutlet, FdTranslatePipe]
})
export class SplitButtonComponent implements AfterContentInit, OnChanges, OnDestroy, AfterViewInit {
    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input()
    glyph = 'slim-arrow-down';

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input()
    disabled: boolean;

    /** The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    @Input()
    fdType: ButtonType;

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
    arialLabel: string;

    /** Event sent when primary button is clicked */
    @Output()
    readonly primaryButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /** @ignore */
    @ContentChild(SplitButtonActionTitle, { read: TemplateRef })
    titleTemplate: TemplateRef<any> | null;

    /** @ignore */
    @ContentChild(MenuComponent)
    menu: MenuComponent;

    /** @ignore */
    @ViewChild('mainActionButton', { read: ElementRef })
    mainActionBtn: ElementRef;

    /** @ignore */
    @ViewChild('menuActionButton', { read: ElementRef })
    menuActionBtn: ElementRef;

    /** The Title for main action button */
    mainActionTitle: string;

    /** @ignore */
    mainButtonWidth: string;

    /** @ignore */
    get typeClass(): string {
        return this.fdType ? `fd-button-split--${this.fdType}` : '';
    }

    /** @ignore */
    private _mainActionTitle: string;

    /** @ignore */
    private _menuItemSubscriptions = new Subscription();

    /** @ignore */
    private _menuSubscription = new Subscription();

    /** @ignore */
    private _contentDensitySubscription = new Subscription();

    /** @ignore */
    private _menuActivePathSubscription = new Subscription();

    /** @ignore */
    constructor(
        private _cdRef: ChangeDetectorRef,
        private _destroyRef: DestroyRef,
        private _contentDensityObserver: ContentDensityObserver,
        private _renderer: Renderer2
    ) {}

    /** @ignore Emits event when main button is clicked */
    onMainButtonClick(event: MouseEvent): void {
        this.primaryButtonClicked.emit(event);
        if (this.selected) {
            this.selected.elementRef.nativeElement.click();
        } else if (this.mainAction && this.mainAction.callback) {
            this.mainAction.callback();
        }
        event.stopPropagation();
    }

    /** @ignore */
    ngAfterContentInit(): void {
        this.menu._menuItems.forEach((item) => {
            item.menuInteractive._fromSplitButton = true;
        });
        this._setupMenuSubscription();
        this._setupMenuItemSubscriptions();
        this._handleMainActionObject();

        if (!this.mainActionTitle && !this.titleTemplate && !this.selected) {
            this.selectMenuItem(this.menu._menuItems.first);
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

    /** @ignore */
    ngAfterViewInit(): void {
        this._contentDensityObserver.isCompact$
            .pipe(tap(this._addButtonTextClass), takeUntilDestroyed(this._destroyRef))
            .subscribe();
    }

    /** @ignore */
    ngOnChanges(changes: SimpleChanges): void {
        if ('selected' in changes) {
            this.selectMenuItem(this.selected);
        }
        if ('mainAction' in changes) {
            this._handleMainActionObject();
        }
    }

    /** @ignore */
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

    /** @ignore */
    private _getMainButtonWidth(): void {
        if (this.mainActionBtn && this.mainActionBtn.nativeElement) {
            this.mainButtonWidth = this.mainActionBtn.nativeElement.getBoundingClientRect().width + 'px';
        }
    }

    /** @ignore */
    private _setupMenuItemSubscriptions(): void {
        this.menu._menuItems.forEach((menuItem) => {
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

    /** @ignore */
    private _handleMenuItemSelection(menuItem: MenuItemComponent): void {
        if (!this.mainAction || !this.mainAction.keepMainAction) {
            this.selected = menuItem;
            this.menu._menuItems.forEach((item) => {
                item.setSelected(false, true);
            });
            menuItem.setSelected(true, true);
            this.titleTemplate = null;
            this.mainActionTitle = menuItem.menuItemTitle.title;
            this._cdRef.detectChanges();
        }
    }

    /** @ignore */
    private _setupMenuSubscription(): void {
        this._menuSubscription = this.menu._menuItems.changes.subscribe(() => {
            this._menuItemSubscriptions.unsubscribe();
            this._menuItemSubscriptions.closed = false;
            this._setupMenuItemSubscriptions();
        });
        // call markForCheck once menu open state gets changed
        this._menuSubscription.add(this.menu.isOpenChange.subscribe(() => this._cdRef.markForCheck()));
    }

    /** @ignore */
    private _handleMainActionObject(): void {
        if (this.mainAction && typeof this.mainAction.mainActionTitle === 'string') {
            this.mainActionTitle = this.mainAction.mainActionTitle;
        } else if (this.mainAction && this.mainAction.mainActionTitle instanceof TemplateRef) {
            this.titleTemplate = this.mainAction.mainActionTitle;
        }
    }

    /** @ignore */
    private _addButtonTextClass = (): void => {
        const textSpanElement = this.mainActionBtn?.nativeElement.querySelector('.fd-button__text');
        if (!textSpanElement) {
            return;
        }
        splitButtonTextClasses.forEach((_class) => this._renderer.removeClass(textSpanElement, _class));
        this._renderer.addClass(textSpanElement, splitButtonTextClass);
    };

    /** @ignore */
    private _focusTriggerElement(): void {
        this.menuActionBtn?.nativeElement.focus();
    }
}
