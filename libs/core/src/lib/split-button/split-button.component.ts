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
    Output,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
import { ButtonType } from '../button/base-button';
import { MenuComponent } from '../menu/menu.component';
import { MenuItemComponent } from '../menu/menu-item/menu-item.component';
import { Subscription } from 'rxjs';
import { MainAction } from './main-action';
import { first } from 'rxjs/operators';

export const splitButtonTextClass = 'fd-button-split__text';
export const splitButtonTextCompactClass = 'fd-button-split__text--compact';
const splitButtonTextClasses = [
    splitButtonTextClass,
    splitButtonTextCompactClass
]

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
export class SplitButtonComponent implements AfterContentInit, OnChanges, OnDestroy, AfterViewInit {

    /** Whether to apply compact mode to the button. */
    @Input()
    compact: boolean;

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

    /** Aria-label used to describe expand button*/
    @Input()
    expandButtonAriaLabel = 'More';

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

    /** Event sent when primary button is clicked */
    @Output()
    readonly primaryButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /** @hidden */
    @ContentChild(SplitButtonActionTitle, { read: TemplateRef })
    titleTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChild(MenuComponent)
    menu: MenuComponent;

    /** @hidden */
    @ViewChild('mainActionButton', { read: ElementRef })
    mainActionBtn: ElementRef;

    /** @hidden */
    mainButtonWidth: string;

    /** @hidden */
    private _menuItemSubscriptions = new Subscription();

    /** @hidden */
    private _menuSubscription = new Subscription();

    /** @hidden */
    constructor(private _cdRef: ChangeDetectorRef, private _elRef: ElementRef, private _renderer: Renderer2) {}

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
    ngAfterContentInit(): void {
        this._setupMenuSubscription();
        this._setupMenuItemSubscriptions();
        this._handleMainActionObject();

        if (!this.mainActionTitle && !this.titleTemplate && !this.selected) {
            this.selectMenuItem(this.menu.menuItems.first);
        } else if (!this.mainActionTitle && this.selected) {
            this.selectMenuItem(this.selected);
        }
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
    }

    /** Function called to select a menu item for the split button. */
    selectMenuItem(menuItem: MenuItemComponent): void {
        if (menuItem && (!this.mainAction || !this.mainAction.keepMainAction)) {
            menuItem.setSelected(true);
        }
    }

    /** @hidden */
    private _getMainButtonWidth(): void {
        if (this.mainActionBtn && this.mainActionBtn.nativeElement) {
            this.mainButtonWidth = this.mainActionBtn.nativeElement.getBoundingClientRect().width + 'px';
        }
    }

    /** @hidden */
    private _setupMenuItemSubscriptions(): void {
        this.menu.menuItems.forEach(menuItem => {
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
        splitButtonTextClasses.forEach(_class => this._renderer.removeClass(textSpanElement, _class));
        if (this.compact) {
            this._renderer.addClass(textSpanElement, splitButtonTextCompactClass)
        } else {
            this._renderer.addClass(textSpanElement, splitButtonTextClass)
        }
    }
}
