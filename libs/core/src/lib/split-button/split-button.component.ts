import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
import { ButtonType } from '../button/button.component';
import { MenuComponent } from '../menu/menu.component';

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
export class SplitButtonComponent {

    /** Whether to apply compact mode to the button. */
    @Input()
    compact: boolean;

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input()
    glyph: string = 'slim-arrow-down';

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
    expandButtonAriaLabel: string = 'More';

    /** Event sent when primary button is clicked */
    @Output()
    readonly primaryButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /** @hidden */
    @ContentChild(SplitButtonActionTitle, { read: TemplateRef })
    titleTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChild(MenuComponent)
    menu: MenuComponent;

    /** @hidden Emits event when main button is clicked */
    onMainButtonClick(event: MouseEvent): void {
        this.primaryButtonClicked.emit(event);
        event.stopPropagation();
    }
}