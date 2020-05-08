import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import { BaseComponent } from '../base';
@Component({
    selector: 'fdp-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent extends BaseComponent {
    /**
     * Actionbar title
     */

    @Input()
    title: string;

    /**
     * Actionbar description
     */
    @Input()
    description: string;


    /**
     * Compact mode
     */
    @Input()
    compact = true;

    /**
     * Show "back" button.
     */
    @Input()
    showBackButton = false;

    /**
     * "back" button label.
     */
    @Input()
    backButtonLabel = 'Go Back';

    /**
     * Emitted event when "back" button is clicked.
     */
    @Output()
    backButtonClick: EventEmitter<void> = new EventEmitter();

    constructor(_cd: ChangeDetectorRef) {
        super(_cd);
    }
}
