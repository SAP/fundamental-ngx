import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef
} from '@angular/core';

export interface ActionItem {
    label: string;
    type: string;
    priority: number;
    editTitle: boolean;
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
    @Input() title: string;

    @Input() editMode: boolean = false;

    /**
     * Actionbar description
     */
    @Input() description: string;
    /**
     * Show "back" button.
     */
    @Input() showBackButton = false;

    @Input() displayOnlyMenu = false;

    /**
     * "back" button label.
     */
    @Input() backButtonLabel = 'Go Back';

    @Input() placement: string;

    @Input() actionItems: ActionItem[];
    /**
     * Emitted event when "back" button is clicked.
     */
    @Output() backButtonClick: EventEmitter<void> = new EventEmitter();

    /**
     * Emitted event when input textbox out of focus.
     */

    @Output() titleRenamed: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Emitted event when action button is clicked.
     */
    @Output() itemClick: EventEmitter<ActionItem> = new EventEmitter<ActionItem>();
    constructor(public cd: ChangeDetectorRef) {}

    ngOnInit() {}

    enableEditTitle(editmode: boolean) {
        this.editMode = editmode;
        this.cd.markForCheck();
    }

    actionItemClicked(item: ActionItem) {
        this.itemClick.emit(item);
        this.cd.markForCheck();
    }

    onFocusOut() {
        this.editMode = false;
        this.titleRenamed.emit(this.title);
        this.cd.markForCheck();
    }
    outSideClick = ($event: Event) => {
        if (!this.editMode) {
            this.editMode = false;
            this.cd.markForCheck();
        }
    };
}
