import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewChildren,
    QueryList,
    AfterViewInit
} from '@angular/core';
import { MenuItemDirective, MenuKeyboardService } from '@fundamental-ngx/core';
import { ActionItem } from '../action-bar.component';

const MAX_BUTTONS = 3;
@Component({
    selector: 'fdp-action-bar-actions',
    templateUrl: './action-bar-actions.component.html',
    styleUrls: ['./action-bar-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarActionsComponent implements OnInit {
    constructor(public cd: ChangeDetectorRef, public menuKeyboardService: MenuKeyboardService) {}

    buttonItems: ActionItem[] = [];
    menuItems: ActionItem[] = [];
    @ViewChildren(MenuItemDirective)
    menulist: QueryList<MenuItemDirective>;
    @Input() placement: string;

    @Input() actionItems: ActionItem[];

    @Input() displayOnlyMenu: boolean;

    orderedActionItems: ActionItem[];

    @Output() itemClick: EventEmitter<ActionItem> = new EventEmitter<ActionItem>();

    @Output() editMode: EventEmitter<boolean> = new EventEmitter();

    isEditTitle: boolean;
    isEditModeOn: boolean;

    ngOnInit() {
        this.orderActionItem();
        this.splitActionItems();
    }

    orderActionItem() {
        this.orderedActionItems = this.actionItems.sort(function(a, b) {
            return a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0;
        });
    }

    splitActionItems() {
        let j = 0;
        for (let i = 0; i < this.orderedActionItems.length; i++) {
            if (i < MAX_BUTTONS && !this.displayOnlyMenu) {
                this.buttonItems[i] = this.orderedActionItems[i];
            } else {
                this.menuItems[j++] = this.orderedActionItems[i];
            }
        }
    }

    onItemClick(item: ActionItem): void {
        this.itemClick.emit(item);
        this.cd.markForCheck();
    }
    onRenameClick() {
        this.editMode.emit(true);
        this.cd.markForCheck();
    }

    handleKeyPress(event: KeyboardEvent, index: number) {
        this.menuKeyboardService.keyDownHandler(event, index, this.menulist.toArray());
    }

    focusFirst() {
        setTimeout(() => this.menulist.first.focus(), 0);
    }
}
