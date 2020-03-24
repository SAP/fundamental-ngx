import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    Inject,
    Optional
} from '@angular/core';
import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
import { PopoverFillMode } from '../popover/popover-directive/popover.directive';
import { ButtonType, ButtonOptions } from '../button/button.component';
import { Observable, of } from 'rxjs';
import { RtlService } from '../utils/public_api';
import { map } from 'rxjs/operators';

/**
 * Split Button component, used to enhance standard HTML button and add possibility to put some dropdown with
 * additional options.
 *
 * ```html
 *    <fd-split-button>
 *        Action Button
 *        <div fd-split-button-menu>
 *            <fd-menu>
 *                <ul fd-menu-list>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option</a>
 *                    </li>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option2</a>
 *                    </li>
 *                </ul>
 *            </fd-menu>
 *        </div>
 *    </fd-split-button>
 * ```
 */
@Component({
    selector: 'fd-split-button',
    templateUrl: 'split-button.component.html',
    styleUrls: ['./split-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitButtonComponent {
    /** @hidden */
    @ContentChild(SplitButtonActionTitle, { read: TemplateRef })
    titleTemplate: TemplateRef<any>;

    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['click'];

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick: boolean = true;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey: boolean = true;

    /** Whether the popover should be focusTrapped. */
    @Input()
    focusTrapped: boolean = false;

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

    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */

    @Input()
    options: ButtonOptions | ButtonOptions[];

    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /** @hidden */
    @Input()
    isOpen: boolean = false;

    /** Event sent when is open popover changed */
    @Output()
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event sent when primary button is clicked */
    @Output()
    readonly primaryButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    direction$: Observable<string>;

    constructor(@Optional() private rtlService: RtlService) {
        this.direction$ = rtlService ? rtlService.rtl.pipe(map(isRtl => (isRtl ? 'rtl' : 'ltr'))) : of('ltr');
    }

    /**
     *  Handles primary button click
     *  */
    public buttonClick($event) {
        this.primaryButtonClicked.emit();
        $event.stopPropagation();
    }

    /**
     * Toggles the popover open state.
     */
    public toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Closes the popover.
     */
    public close(): void {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    /**
     * Opens the popover.
     */
    public open(): void {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }
}
