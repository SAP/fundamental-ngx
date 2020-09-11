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
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
import { ButtonType } from '../button/button.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuItemComponent } from '../menu/menu-item/menu-item.component';
import { Subscription } from 'rxjs';
import { MainAction } from './main-action';

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
export class SplitButtonComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {

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

    /** Whether or not the main action title should remain set as the button's action after another option is selected. */
    @Input()
    keepMainAction = false;

    /**
     * The object that contains the mainActionTitle and the callback function that should be executed when the button is clicked.
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
    mainButtonWidth: number;

    /** @hidden */
    private _menuItemSubscriptions = new Subscription();

    /** @hidden */
    private _menuSubscription = new Subscription();

    /** @hidden */
    constructor(private _cdRef: ChangeDetectorRef, private _elRef: ElementRef) {}

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

        if (!this.mainActionTitle && !this.selected) {
            this.selectMenuItem(this.menu.menuItems.first);
        } else if (!this.mainActionTitle && this.selected) {
            this.selectMenuItem(this.selected);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.fixedWidth) {
            this.mainButtonWidth = parseInt(this.mainActionBtn.nativeElement.offsetWidth, 10);
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.selected) {
            this.selectMenuItem(this.selected);
        } else if (changes && changes.mainAction) {
            this._handleMainActionObject();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._menuItemSubscriptions.unsubscribe();
        this._menuSubscription.unsubscribe();
    }

    /** Function called to select a menu item for the split button. */
    selectMenuItem(menuItem: MenuItemComponent): void {
        if (menuItem && !this.keepMainAction) {
            menuItem.setSelected(true);
        }
    }

    /** @hidden */
    private _setupMenuItemSubscriptions(): void {
        this.menu.menuItems.map((menuItem: MenuItemComponent) => {
            this._menuItemSubscriptions.add(
                menuItem.onSelect.subscribe(() => {
                    if (!this.keepMainAction) {
                        this.selected = menuItem;
                        this.mainActionTitle = menuItem.menuItemTitle.title;
                        this._cdRef.detectChanges();
                    }
                })
            );
        });
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
}
