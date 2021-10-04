import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import { BaseListItem, ListComponent, SelectionChangeEvent, StandardListItemComponent } from '@fundamental-ngx/platform/list';
import { ApprovalUser } from '../interfaces';
import { trackByFn } from '../helpers';

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
export class ApprovalFlowUserListComponent implements AfterViewInit {
    @Input()
    users: ApprovalUser[] = [];

    @Input()
    selectedUsers: ApprovalUser[] = [];

    @Input()
    isSelectable = true;

    @Output()
    onUserClick = new EventEmitter<ApprovalUser>();

    @Output()
    onSelectionChange = new EventEmitter<ApprovalUser[]>();

    @ViewChild(ListComponent)
    list: ListComponent;

    @ViewChildren(StandardListItemComponent)
    listItems: QueryList<StandardListItemComponent>;

    @ViewChild('itemsContainer', { read: ViewContainerRef })
    container: ViewContainerRef;

    @ViewChild('item', { read: TemplateRef })
    template: TemplateRef<any>;

    /** @hidden */
    _selectedItems: BaseListItem[] = [];

    /** @hidden */
    _idPrefix = 'approval-node-user-';

    /** @hidden */
    _trackByFn = trackByFn;

    _displayUsers: ApprovalUser[] = [];

    /** @hidden */
    constructor(private _cdr: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.selectedUsers.length) {
            const selectedApproversNames = this.selectedUsers.map(approver => approver.name);

            this._selectedItems = this.listItems
                .filter(item => selectedApproversNames.includes(item.avatarTitle));

            this._selectedItems.forEach(item => {
                item._selected = true;
                this.list._selectItem(item);
            });

            this._cdr.detectChanges();
        }
        // console.log('AFTER VIEW INIT');
        // this._renderDataManual(50);
        // this._renderDataProgressive(1000);
        // this._collectDataProgressive(1000);
    }

    /** @hidden */
    _onSelect(event: SelectionChangeEvent): void {
        this._selectedItems = event.selectedItems;

        this.onSelectionChange.emit(this._getUsersFromSelectedItems(event.selectedItems));
    }

    /** @hidden */
    private _getUsersFromSelectedItems(items: BaseListItem[]): ApprovalUser[] {
        return items.map(item =>
            this.users.find(user => `${this._idPrefix + user.id}` === item.itemEl.nativeElement.id)
        );
    }

    // Manual Rendering
    private _renderDataManual(length: number): void {
        const start = this.users.length;
        const end = start + length;

        for (let i = start; i <= end; i++) {
            const user = this.users[i];
            console.log('USER', user);
            this.container.createEmbeddedView(
                this.template,
                { item: user }
            );
        }
    }

    private _renderDataProgressive(length: number): void {
        const ITEMS_RENDERED_AT_ONCE = 50;
        const INTERVAL_IN_MS = 10;

        let currentIndex = 0;
        console.log('RENDER DATA PROGRESSIVE');
        const interval = setInterval(() => {
            const nextIndex = currentIndex + ITEMS_RENDERED_AT_ONCE;
            console.log('INITIATE INTERVAL');
            for (let i = currentIndex; i <= nextIndex; i++) {
                if (i >= length) {
                    clearInterval(interval);
                    break;
                }

                const context = { item: this.users[i] };
                const viewRef = this.container.createEmbeddedView(this.template, context);
                console.log('View Ref', viewRef);
                console.log('Template', this.template);
                console.log('Container', this.container);
            }

            currentIndex += ITEMS_RENDERED_AT_ONCE;
        }, INTERVAL_IN_MS);
    }

    private _collectDataProgressive(length: number): void {
        const ITEMS_RENDERED_AT_ONCE = 100;
        const INTERVAL_IN_MS = 10;

        let currentIndex = 0;
        const interval = setInterval(() => {
            console.log('INTERVAL', currentIndex);
            const nextIndex = currentIndex + ITEMS_RENDERED_AT_ONCE;

            const collectedUsers = [];

            for (let i = currentIndex; i <= nextIndex; i++) {
                if (i >= length) {
                    clearInterval(interval);
                    break;
                }

                collectedUsers.push(this.users[i]);
            }

            currentIndex += ITEMS_RENDERED_AT_ONCE;

            console.log('PUSH COLLECTED USER', collectedUsers);
            this._displayUsers.push(...collectedUsers);
            this._cdr.detectChanges();
        }, INTERVAL_IN_MS);
    }
}
