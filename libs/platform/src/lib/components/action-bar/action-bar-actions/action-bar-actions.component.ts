import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewChildren,
    QueryList
} from '@angular/core';
import { MenuItemDirective, MenuKeyboardService } from '@fundamental-ngx/core';
import { ActionItem } from '../action-bar.component';
import { Placement } from 'popper.js';

const MAX_BUTTONS = 3;
@Component({
    selector: 'fdp-action-bar-actions',
    templateUrl: './action-bar-actions.component.html',
    styleUrls: ['./action-bar-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarActionsComponent implements OnInit {
    /**
     * Button action items of action bar actions component
     */
    buttonItems: ActionItem[] = [];

    /**
     * Menu action items of action bar action compoents
     */
    menuItems: ActionItem[] = [];

    /**
     * View children of action bar actions component
     */
    @ViewChildren(MenuItemDirective)
    menulist: QueryList<MenuItemDirective>;

    /**
     * specifies the posistion of the contextual mennu
     */
    @Input()
    placement: Placement;

    /**
     * array of action items
     */
    @Input()
    actionItems: ActionItem[];

    /**
     * If user want to show all the actions in menu, he can set this flag to true
     */
    @Input()
    showOnlyMenu: boolean;

    /**
     * sorted action items based on priority
     */
    orderedActionItems: ActionItem[];

    /**
     * Emit 'itemClick' event when user click on any action item.
     */
    @Output()
    itemClick: EventEmitter<ActionItem> = new EventEmitter<ActionItem>();

    /**
     * Emit 'editing' event when the user click on rename button
     */
    @Output()
    editing: EventEmitter<boolean> = new EventEmitter();

    isContextualMenuOpen: boolean = false;

    constructor(private cd: ChangeDetectorRef, private menuKeyboardService: MenuKeyboardService) {}

    ngOnInit() {
        this.orderActionItem();
        this.splitActionItems();
    }

    orderActionItem() {
        this.orderedActionItems = this.actionItems.sort(function (a, b) {
            return a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0;
        });
    }

    splitActionItems() {
        let j = 0;
        for (let i = 0; i < this.orderedActionItems.length; i++) {
            if (i < MAX_BUTTONS && !this.showOnlyMenu) {
                this.buttonItems[i] = this.orderedActionItems[i];
            } else {
                this.menuItems[j++] = this.orderedActionItems[i];
            }
        }
    }

    onItemClick(item: ActionItem): void {
        this.itemClick.emit(item);
        this.isContextualMenuOpen = false;
        this.cd.markForCheck();
    }
    onRenameClick() {
        this.editing.emit(true);
        this.cd.markForCheck();
    }

    handleKeyPress(event: KeyboardEvent, index: number) {
        this.menuKeyboardService.keyDownHandler(event, index, this.menulist.toArray());
    }

    focusFirst() {
        setTimeout(() => this.menulist.first.focus(), 0);
    }
}
