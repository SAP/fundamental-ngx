import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import { Placement } from 'popper.js';

export interface ActionItem {
    label: string;
    type: string;
    priority: number;
    editTitle: boolean;
    options: string;
    compact: boolean;
}

@Component({
    host: {
        '(document:click)': 'outSideClick($event)'
    },
    selector: 'fdp-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent implements OnInit {
    /**
     * Actionbar title
     */
    @Input()
    title: string;

    /**
     * flag to set edit mode for renaming the title
     */
    @Input()
    editing: boolean = false;

    /**
     * Actionbar description
     */
    @Input()
    description: string;

    /**
     * Show "back" button.
     */
    @Input()
    showBackButton = false;

    @Input()
    showOnlyMenu = false;

    /**
     * "back" button label.
     */
    @Input()
    backButtonLabel = 'Go Back';
    /**
     * used to specify the posistion of the menu1`
     */
    @Input()
    placement: Placement;

    @Input()
    actionItems: ActionItem[];
    /**
     * Emitted event when "back" button is clicked.
     */
    @Output()
    backButtonClick: EventEmitter<void> = new EventEmitter();

    /**
     * Emitted event when input textbox out of focus.
     */

    @Output()
    titleRenamed: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Emitted event when action button is clicked.
     */
    @Output()
    itemClick: EventEmitter<ActionItem> = new EventEmitter<ActionItem>();

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {}

    enableEditTitle(editing: boolean) {
        this.editing = editing;
        this.cd.markForCheck();
    }

    actionItemClicked(item: ActionItem) {
        this.itemClick.emit(item);
        this.cd.markForCheck();
    }

    onFocusOut() {
        this.editing = false;
        this.titleRenamed.emit(this.title);
        this.cd.markForCheck();
    }
    outSideClick = ($event: Event) => {
        if (!this.editing) {
            this.editing = false;
            this.cd.markForCheck();
        }
    };
}
