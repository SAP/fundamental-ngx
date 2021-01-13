import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, QueryList,
    TemplateRef, ViewChild,
    ViewChildren
} from '@angular/core';

import { DialogRef, FdDate } from '@fundamental-ngx/core';
import { take } from 'rxjs/operators';

import { ApprovalDataSource, ApprovalNode, ApprovalUser } from '../public_api';
import { StandardListItemComponent } from '../../list/standard-list-item/standard-list-item.component';
import { ListComponent } from '@fundamental-ngx/platform';

interface AddNodeDialogRefData {
    isEdit?: boolean;
    showNodeTypeSelect?: boolean;
    node?: ApprovalNode;
    approvalFlowDataSource: ApprovalDataSource;
    userDetailsTemplate: TemplateRef<any>;
    rtl: boolean;
}

const SINGLE_USER = 'A user';
const ANYONE = 'Anyone on the team';
const EVERYONE = 'Everyone on the team';

@Component({
    selector: 'fdp-approval-flow-add-node',
    templateUrl: './approval-flow-add-node.component.html',
    styleUrls: ['./approval-flow-add-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalFlowAddNodeComponent implements OnInit {
    _nodeType = '';
    _nodeTypes = ['Parallel', 'Serial'];
    _approverType = '';
    _approverTypes = [SINGLE_USER, ANYONE, EVERYONE];
    _dueDate = FdDate.getNow();
    _selectApproversMode = false;
    _userDetailsMode = false;
    _approvers: ApprovalUser[] = [];
    _selectedItems: any[] = [];
    _selectedApprovers: ApprovalUser[] = [];

    /** @hidden */
    _listItemIdPrefix = 'approval-node-user-';

    @ViewChild(ListComponent) list: ListComponent;
    @ViewChildren(StandardListItemComponent) listItems: QueryList<StandardListItemComponent>;

    constructor(public dialogRef: DialogRef, private _cdr: ChangeDetectorRef) {
    }

    /** @hidden */
    get _data(): AddNodeDialogRefData {
        return this.dialogRef.data;
    }

    ngOnInit(): void {
        this._data.approvalFlowDataSource.fetchApprovers()
            .pipe(take(1))
            .subscribe(approvers => this._approvers = approvers);
        if (this._data.isEdit) {
            this._dueDate = FdDate.getFdDateByDate(new Date(this._data.node.dueDate));
            this._selectedApprovers = [...this._data.node.approvers];
            if (this._data.node.approvers.length === 1) {
                this._approverType = SINGLE_USER;
            }

            if (this._data.node.approvers.length > 1) {
                this._approverType = ANYONE;
            }
        }
    }

    /** @hidden */
    _goToSelectApproversMode(): void {
        this._selectApproversMode = true;
        this._cdr.detectChanges();
        if (this._data.isEdit) {
            setTimeout(() => {
                const selectedApproversNames = this._selectedApprovers.map(approver => approver.name);
                this.listItems.forEach(item => {
                    item._selected = selectedApproversNames.includes(item.avatarTitle);
                    // item.itemEl.nativeElement.click();
                    this.list._onSelectionChanged({ target: item.itemEl.nativeElement } as Event)
                });
                // this._selectedItems = this.listItems.filter(item => item._selected);
                // this.listItems.filter(item => item._selected).forEach(item => this.list.selectionModel)
                this._cdr.detectChanges();
            });
        }
    }

    /** @hidden */
    _exitSelectApproversMode(): void {
        this._selectApproversMode = false;
        this._cdr.detectChanges();
    }

    /** @hidden */
    _onSelectApprover(event: any): void {
        console.log('onSelectApprover', event);
        this._selectedItems = event.selectedItems;
        this._selectedApprovers = this._getUsersFromSelectedItems();
    }

    /** @hidden */
    _selectApprovers(): void {
        this._data.node.approvers = this._getUsersFromSelectedItems();
        this._exitSelectApproversMode();
    }

    /** @hidden */
    _getUsersFromSelectedItems(): ApprovalUser[] {
        return this._selectedItems.map(item =>
            this._approvers.find(user => `${this._listItemIdPrefix + user.id}` === item.itemEl.nativeElement.id)
        );
    }

    /** @hidden */
    _displayUserFn(item: ApprovalUser): string {
        return item.name;
    }
}
