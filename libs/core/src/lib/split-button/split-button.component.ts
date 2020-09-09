import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
import { ButtonType } from '../button/button.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuItemComponent } from '../menu/menu-item/menu-item.component';
import { Subscription } from 'rxjs';

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
export class SplitButtonComponent implements AfterContentInit, OnDestroy {

    /** Whether to apply compact mode to the button. */
    @Input()
    compact: boolean;

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input()
    glyph = 'slim-arrow-down';

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input()
    disabled: boolean;

    /** The Title for main  action button */
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
    private _menuItemSubscriptions = new Subscription();

    /** @hidden */
    constructor(private _cdRef: ChangeDetectorRef) {}

    /** @hidden Emits event when main button is clicked */
    onMainButtonClick(event: MouseEvent): void {
        this.primaryButtonClicked.emit(event);
        event.stopPropagation();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._setupMenuItemSubscriptions();

        if (!this.mainActionTitle && !this.selected) {
            this.selectMenuItem(this.menu.menuItems.first);
        } else if (this.selected) {
            this.selectMenuItem(this.selected);
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._menuItemSubscriptions.unsubscribe();
    }

    /** Function called to select a menu item for the split button */
    selectMenuItem(menuItem: MenuItemComponent): void {
        menuItem.setSelected(true);
    }

    /** @hidden */
    private _setupMenuItemSubscriptions(): void {
        this.menu.menuItems.map((menuItem: MenuItemComponent) => {
            this._menuItemSubscriptions.add(
                menuItem.onSelect.subscribe(() => {
                    this.mainActionTitle = menuItem.menuItemTitle.title;
                    this._cdRef.detectChanges();
                })
            );
        });
    }
}
