import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';

import {
    BaseListItem,
    ListComponent,
    SelectionChangeEvent,
    StandardListItemComponent
} from '@fundamental-ngx/platform/list';
import { ApprovalUser } from '../interfaces';
import { trackByFn } from '../helpers';

const ITEMS_RENDERED_AT_ONCE = 100;
const INTERVAL_IN_MS = 10;

/**
 * @deprecated
 * ApprovalFlowUserList component is depricated since version 0.40.0
 */
@Component({
    selector: 'fdp-approval-flow-user-list',
    templateUrl: './approval-flow-user-list.component.html',
    styleUrls: ['./approval-flow-user-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-user-list'
    }
})
export class ApprovalFlowUserListComponent implements AfterViewInit, OnChanges, OnDestroy {
    /** Approval flow users */
    @Input()
    users: ApprovalUser[] = [];

    /** Approval flow selected users */
    @Input()
    selectedUsers: ApprovalUser[] = [];

    /** Whether the list is selectable */
    @Input()
    isSelectable = true;

    /** Event emitted on user click */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onUserClick = new EventEmitter<ApprovalUser>();

    /** Event emitted on selection change */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onSelectionChange = new EventEmitter<ApprovalUser[]>();

    /** @hidden */
    @ViewChild(ListComponent)
    list: ListComponent<ApprovalUser>;

    /** @hidden */
    @ViewChildren(StandardListItemComponent)
    listItems: QueryList<StandardListItemComponent>;

    /** @hidden */
    _selectedItems: BaseListItem[] = [];

    /** @hidden */
    _idPrefix = 'approval-node-user-';

    /** @hidden */
    _trackByFn = trackByFn;

    /** @hidden */
    _displayUsers: ApprovalUser[] = [];

    /** @hidden */
    private _intervalID?: number;

    /** @hidden */
    constructor(private _cdr: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.selectedUsers.length) {
            const selectedApproversNames = this.selectedUsers.map((approver) => approver.name);

            this._selectedItems = this.listItems.filter(
                (item) => !!item.avatar?.ariaLabel && selectedApproversNames.includes(item.avatar.ariaLabel)
            );

            this._selectedItems.forEach((item) => {
                item._selected = true;
                this.list._selectItem(item);
            });

            this._cdr.detectChanges();
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.users) {
            this._collectDataProgressive();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._killInterval();
    }

    /** @hidden */
    _onSelect(event: SelectionChangeEvent): void {
        this._selectedItems = event.selectedItems;

        this.onSelectionChange.emit(this._getUsersFromSelectedItems(event.selectedItems));
    }

    /** @hidden */
    private _getUsersFromSelectedItems(items: BaseListItem[]): ApprovalUser[] {
        return items
            .map((item) => this.users.find((user) => `${this._idPrefix + user.id}` === item.itemEl.nativeElement.id))
            .filter((u): u is ApprovalUser => !!u);
    }

    /** @hidden */
    private _collectDataProgressive(): void {
        this._killInterval();
        this._displayUsers = [];

        if (!this.users?.length) {
            return;
        }

        const collectionTracker = { currentIndex: 0 };

        this._userCollectorIntervalFn(collectionTracker);
        this._intervalID = window.setInterval(
            this._userCollectorIntervalFn.bind(this),
            INTERVAL_IN_MS,
            collectionTracker
        );
    }

    /** @hidden */
    private _userCollectorIntervalFn(tracker: { currentIndex: number }): void {
        const nextIndex = tracker.currentIndex + ITEMS_RENDERED_AT_ONCE;

        const collectedUsers: ApprovalUser[] = [];

        for (let i = tracker.currentIndex; i <= nextIndex; i++) {
            if (i >= this.users.length) {
                this._killInterval();
                break;
            }

            collectedUsers.push(this.users[i]);
        }

        tracker.currentIndex += ITEMS_RENDERED_AT_ONCE;

        this._displayUsers.push(...collectedUsers);
        this._cdr.markForCheck();
    }

    /** @hidden */
    private _killInterval(): void {
        if (this._intervalID) {
            clearInterval(this._intervalID);
        }
    }
}
