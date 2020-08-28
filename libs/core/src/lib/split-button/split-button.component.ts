import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    ViewEncapsulation,
    AfterContentChecked,
    ChangeDetectorRef
} from '@angular/core';
import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
import { ButtonType } from '../button/button.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuItemComponent } from '../menu/menu-item/menu-item.component'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
export class SplitButtonComponent implements AfterContentChecked, OnDestroy {

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
    private _firstElement: MenuItemComponent;

    get firstElement(): MenuItemComponent {
        return this._firstElement;
    }

    set firstElement(item: MenuItemComponent) {
        this._firstElement = item;
    }

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    /** @hidden Emits event when main button is clicked */
    onMainButtonClick(event: MouseEvent): void {
        this.mainButtonClicked();
        event.stopPropagation();
    }

    ngAfterContentChecked(): void {
        this.selectedSubscribed();
        this.getFirstMenuItem();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    private mainButtonClicked(): void {
        if (this.mainActionTitle) {
            this.primaryButtonClicked.emit(event);
        } else {
            this.firstElement.menuInteractive.elementRef.nativeElement.click();
        }
    }

    /** @hidden */
    private getFirstMenuItem(): void {
        if (!this.mainActionTitle) {
            this.firstElement = this.menu.menuItems.first;
            this.mainActionTitle = this.firstElement.menuItemTitle.title;
        }
    }

    /** @hidden */
    private selectedSubscribed(): void {
        if (!this.mainActionTitle && this.menu) {
            this.menu.selected.pipe(takeUntil(this._onDestroy$)).subscribe(value => {
                this.mainActionTitle = value.menuItemTitle.title;
                this._changeDetectorRef.detectChanges();
            });
        }
    }
}
