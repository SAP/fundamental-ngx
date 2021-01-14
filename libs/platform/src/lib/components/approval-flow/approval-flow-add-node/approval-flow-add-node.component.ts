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
import { Observable } from 'rxjs';

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
    _filteredApprovers: ApprovalUser[] = [];
    _selectedApprovers: ApprovalUser[] = [];

    /** @hidden */
    _userToShowDetails: ApprovalUser;

    /** @hidden */
    _userToShowDetailsData$: Observable<any>;

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
            .subscribe(approvers => {
                this._approvers = approvers;
                this._setFilteredApprovers(approvers);
            });
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
                    this.list._onSelectionChanged({ target: item.itemEl.nativeElement } as Event)
                });
                this._cdr.detectChanges();
            });
        }
    }

    /** @hidden */
    _confirmSelectedApprovers(): void {
        this._data.node.approvers = this._selectedApprovers;
        this._exitSelectApproversMode();
    }

    /** @hidden */
    _exitSelectApproversMode(): void {
        this._selectApproversMode = false;
        this._cdr.detectChanges();
    }

    /** @hidden */
    _seeUserDetails(user: ApprovalUser): void {
        this._userToShowDetails = user;
        this._userToShowDetailsData$ = this._data.approvalFlowDataSource.fetchUser(user.id);
        this._cdr.detectChanges();
    }

    /** @hidden */
    _exitUserDetailsMode(): void {
        this._userToShowDetails = undefined;
        this._userToShowDetailsData$ = undefined;
        this._setFilteredApprovers(this._approvers);
        this._cdr.detectChanges();
    }

    /** @hidden */
    _onSearchStringChange(searchString: string): void {
        if (!searchString) {
            this._setFilteredApprovers(this._approvers);
            return;
        }

        this._setFilteredApprovers(this._approvers.filter(
            user => user.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1
        ));
    }

    /** @hidden */
    _setFilteredApprovers(users: ApprovalUser[]): void {
        console.log('_setFilteredApprovers');
        this._filteredApprovers = [...users];
        this._cdr.detectChanges();
    }

    /** @hidden */
    _displayUserFn(item: ApprovalUser): string {
        return item.name;
    }
}
