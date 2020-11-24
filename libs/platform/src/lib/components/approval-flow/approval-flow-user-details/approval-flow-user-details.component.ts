import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { Observable, of } from 'rxjs';

import { ApprovalDataSource, ApprovalNode, User } from '../public_api';
import { DataProvider, ListDataSource } from '../../../domain';

@Component({
    selector: 'fdp-approval-flow-user-details',
    templateUrl: './approval-flow-user-details.component.html',
    styleUrls: ['./approval-flow-user-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ApprovalFlowUserDetailsComponent implements OnInit {
    @Input() node: ApprovalNode;

    @Input() approvalFlowDataSource: ApprovalDataSource;

    @Output() onSendReminder = new EventEmitter<void>();

    _isMultipleMode = false;

    _dataSource: ListDataSource<User>;
    _selectedItems: any[] = [];

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
    }

    ngOnInit(): void {
        console.log('ApprovalFlowUserDetailsComponent init', this);
        this._isMultipleMode = this.dialogRef.data.node?.approvers.length > 1;
        console.log('_isMultipleMode', this._isMultipleMode);
        if (this._isMultipleMode) {
            this._dataSource = new ListDataSource<User>(new ListDataProvider(this.dialogRef.data.node?.approvers));
        }
    }

    onUserClick(): void {
        console.log('open details');
    }

}

export class ListDataProvider extends DataProvider<User> {
    data: User[];
    constructor(data: User[]) {
        super();
        this.data = data;
    }

    fetch(params: Map<string, string>): Observable<User[]> {
        return of(this.data);
    }
}
