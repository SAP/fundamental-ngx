import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { FdDate } from '@fundamental-ngx/core/datetime';
import { DialogRef } from '@fundamental-ngx/core/dialog';

import { CdkScrollable } from '@angular/cdk/overlay';

import { FormsModule } from '@angular/forms';
import { Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { OptionComponent, SelectComponent } from '@fundamental-ngx/core/select';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { SearchFieldComponent } from '@fundamental-ngx/platform/search-field';
import { ApprovalFlowTeamDataSource, ApprovalFlowUserDataSource } from '@fundamental-ngx/platform/shared';
import { ApprovalFlowTeamListComponent } from '../approval-flow-team-list/approval-flow-team-list.component';
import { ApprovalFlowUserDetailsComponent } from '../approval-flow-user-details/approval-flow-user-details.component';
import { ApprovalFlowUserListComponent } from '../approval-flow-user-list/approval-flow-user-list.component';
import { displayTeamFn, displayUserFn, filterByName, trackByFn } from '../helpers';
import { ApprovalNode, ApprovalTeam, ApprovalUser } from '../interfaces';
import { ApprovalFlowAddNodeViewService, VIEW_MODES } from '../services/approval-flow-add-node-view.service';

export interface AddNodeDialogRefData {
    isEdit?: boolean;
    showNodeTypeSelect?: boolean;
    node?: ApprovalNode;
    nodeTarget?: ApprovalFlowNodeTarget;
    teamDataSource: ApprovalFlowTeamDataSource<ApprovalTeam>;
    userDataSource: ApprovalFlowUserDataSource<ApprovalUser>;
    userDetailsTemplate: TemplateRef<any>;
    checkDueDate?: boolean;
    rtl: boolean;
}

export interface AddNodeDialogFormData {
    node: ApprovalNode;
    nodeType: APPROVAL_FLOW_NODE_TYPES;
    toNextSerial: boolean;
}

export type ApprovalFlowNewNodePlacement = 'before' | 'after' | 'before-all' | 'after-all';

export type ApprovalFlowNodeTarget = ApprovalFlowNewNodePlacement | 'empty' | 'parallel';

export enum APPROVAL_FLOW_NODE_TYPES {
    SERIAL = 'SERIAL',
    PARALLEL = 'PARALLEL'
}

export enum APPROVAL_FLOW_APPROVER_TYPES {
    SINGLE_USER = 'SINGLE_USER',
    ANYONE = 'ANYONE',
    EVERYONE = 'EVERYONE'
}

/**
 * @deprecated
 * ApprovalFlowAddNode component is deprecated since version 0.40.0
 */
@Component({
    selector: 'fdp-approval-flow-add-node',
    templateUrl: './approval-flow-add-node.component.html',
    styleUrls: ['../styles/approval-flow-dialog.scss', './approval-flow-add-node.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-dialog fdp-approval-flow-add-node'
    },
    standalone: true,
    imports: [
        DialogComponent,
        ContentDensityDirective,
        DialogHeaderComponent,
        TemplateDirective,
        IconComponent,
        SearchFieldComponent,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        FormItemComponent,
        FormLabelComponent,
        SelectComponent,
        OptionComponent,
        MultiInputComponent,
        FormsModule,
        CheckboxComponent,
        DatePickerComponent,
        ApprovalFlowTeamListComponent,
        ApprovalFlowUserListComponent,
        ApprovalFlowUserDetailsComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        BusyIndicatorComponent,
        FdTranslatePipe
    ]
})
export class ApprovalFlowAddNodeComponent implements OnInit, OnDestroy {
    /** @ignore */
    _nodeType = APPROVAL_FLOW_NODE_TYPES.SERIAL;

    /** @ignore */
    _nodeTypes = APPROVAL_FLOW_NODE_TYPES;

    /** @ignore */
    _nodeTypesArray = Object.keys(APPROVAL_FLOW_NODE_TYPES);

    /** @ignore */
    _approverType = APPROVAL_FLOW_APPROVER_TYPES.SINGLE_USER;

    /** @ignore */
    _approverTypes = APPROVAL_FLOW_APPROVER_TYPES;

    /** @ignore */
    _approverTypesArray = Object.keys(APPROVAL_FLOW_APPROVER_TYPES);

    /** @ignore */
    _dueDate = FdDate.getNow();

    /** @ignore */
    _selectMode = false;

    /** @ignore */
    _approvers: ApprovalUser[] = [];

    /** @ignore */
    _teams: ApprovalTeam[] = [];

    /** @ignore */
    _selectedApprovers: ApprovalUser[] = [];

    /** @ignore */
    _selectedTeam: Nullable<ApprovalTeam>;

    /** @ignore */
    _selectedTeamArray: ApprovalTeam[] = [];

    /** @ignore */
    _selectedTeamMembers: ApprovalUser[] = [];

    /** @ignore */
    _filteredTeamMembers: ApprovalUser[] = [];

    /** @ignore */
    _userToShowDetails?: ApprovalUser;

    /** @ignore */
    _userToShowDetailsData$?: Observable<any>;

    /** @ignore */
    _checkDueDate = false;

    /** @ignore */
    _displayUserFn = displayUserFn;

    /** @ignore */
    _displayTeamFn = displayTeamFn;

    /** @ignore */
    _trackByFn = trackByFn;

    /** @ignore */
    _addToNextSerial = false;

    /** @ignore */
    private _viewChangeSub: Subscription;

    /** @ignore */
    private _dataSourceSub: Subscription;

    /** @ignore */
    constructor(
        public dialogRef: DialogRef<AddNodeDialogRefData>,
        public viewService: ApprovalFlowAddNodeViewService,
        private _cdr: ChangeDetectorRef
    ) {}

    /** @ignore */
    get _data(): AddNodeDialogRefData {
        return this.dialogRef.data;
    }

    /** @ignore */
    get _isSingleUserMode(): boolean {
        return this._approverType === this._approverTypes.SINGLE_USER;
    }

    /** @ignore */
    get _isMainSubmitButtonDisabled(): boolean {
        const approvers = this._isSingleUserMode ? this._selectedApprovers : this._selectedTeamArray;

        return !approvers.length || (this._checkDueDate && !this._dueDate);
    }

    /** @ignore */
    get _headerArrowGlyph(): string {
        return 'navigation-' + (this._data.rtl ? 'right' : 'left') + '-arrow';
    }

    /** @ignore */
    ngOnInit(): void {
        // triggering initial loading of data in data sources.
        this._data.teamDataSource.match();
        this._data.userDataSource.match();
        const teams$ = this._data.teamDataSource.open();
        const approvers$ = this._data.userDataSource.open();
        this._dataSourceSub = combineLatest([teams$, approvers$]).subscribe(([teams, approvers]) => {
            this._teams = teams;

            this._approvers = approvers;

            if (this._data.isEdit) {
                this._checkDueDate = !!this._data.checkDueDate;

                if (this._checkDueDate && this._data.node?.dueDate) {
                    this._dueDate = FdDate.getFdDateByDate(new Date(this._data.node.dueDate));
                }

                this._selectedApprovers = [...(this._data.node?.approvers ?? [])];

                const team =
                    this._data.node?.approvalTeamId &&
                    this._teams.find((t) => t.id === this._data.node?.approvalTeamId);
                if (team) {
                    this.viewService.selectTeam(team);

                    this._selectedTeam = team;
                    this._selectedTeamArray = [team];
                    this._approverType = this._data.node?.isEveryoneApprovalNeeded
                        ? this._approverTypes.EVERYONE
                        : this._approverTypes.ANYONE;
                }
            }
            this._cdr.detectChanges();
        });

        this._viewChangeSub = this.viewService.onViewChange.subscribe(() => {
            this._onSearchStringChange('');
            this._cdr.detectChanges();
        });

        switch (this._data.nodeTarget) {
            case 'empty':
            case 'before':
            case 'after':
                this._nodeType = this._nodeTypes.SERIAL;
                break;
            case 'parallel':
                this._nodeType = this._nodeTypes.PARALLEL;
                break;
        }
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._viewChangeSub.unsubscribe();
        this._dataSourceSub.unsubscribe();
        this._data.userDataSource.close();
        this._data.teamDataSource.close();
    }

    /** @ignore */
    _goToSelectMode(): void {
        this._selectMode = true;

        this.viewService.setCurrentView(this._isSingleUserMode ? VIEW_MODES.SELECT_USER : VIEW_MODES.SELECT_TEAM);
        this._cdr.detectChanges();
    }

    /** @ignore */
    _exitSelectMode(): void {
        if (this._selectedApprovers.length && !this._data.node?.approvers.length) {
            this._selectedApprovers = [];
        }

        if (!this._data.isEdit && !this._data.node?.approvalTeamId) {
            this.viewService.resetTeam();
        }

        this._selectMode = false;
        this.viewService.resetView();
        this._cdr.detectChanges();
    }

    /** @ignore */
    _setSelectedApprovers(approvers: ApprovalUser[]): void {
        this._selectedApprovers = approvers;

        this._confirmSelectedApprovers();
    }

    /** @ignore */
    _confirmSelectedApprovers(): void {
        if (!this._data.node) {
            return;
        }
        this._data.node.approvers = this._selectedApprovers;
        this._data.node.variousTeams = this._data.node.approvers.some(
            (u) => u.teamId !== this._data.node!.approvers[0].teamId
        );
        this._data.node.description = this._data.node.variousTeams ? '' : this._selectedApprovers[0]?.description;

        delete this._data.node.approvalTeamId;
        delete this._data.node.isEveryoneApprovalNeeded;

        this._exitSelectMode();
    }

    /** @ignore */
    _setSelectedTeam(team: ApprovalTeam): void {
        this.viewService.selectTeam(team);
    }

    /** @ignore */
    _confirmSelectedTeam(): void {
        if (!this.viewService.team) {
            return;
        }
        this._selectedTeam = this.viewService.team;
        this._selectedTeamArray = [this.viewService.team];

        if (this._data.node) {
            this._data.node.variousTeams = false;
            this._data.node.approvalTeamId = this.viewService.team.id;
            this._data.node.description = this.viewService.team.name;
            this._data.node.isEveryoneApprovalNeeded = this._approverType === APPROVAL_FLOW_APPROVER_TYPES.EVERYONE;
        }

        this._exitSelectMode();
    }

    /** @ignore */
    _seeUserDetails(user: ApprovalUser): void {
        this.viewService.setCurrentView(VIEW_MODES.USER_DETAILS);

        this._userToShowDetails = user;
        this._userToShowDetailsData$ = this._data.userDataSource.dataProvider.getOne(new Map([['id', user.id]]));

        this._cdr.detectChanges();
    }

    /** @ignore */
    _exitUserDetailsMode(): void {
        this.viewService.setCurrentView(this.viewService.team ? VIEW_MODES.VIEW_TEAM_MEMBERS : VIEW_MODES.SELECT_USER);

        this._userToShowDetails = undefined;
        this._userToShowDetailsData$ = undefined;

        this._cdr.detectChanges();
    }

    /** @ignore */
    _viewTeamMembers(team: ApprovalTeam): void {
        this.viewService.selectTeam(team);
        this.viewService.setCurrentView(VIEW_MODES.VIEW_TEAM_MEMBERS);

        this._selectedTeamMembers = team.members;

        this._setFilteredTeamMembers(this._selectedTeamMembers); // applying local filtering
        this._cdr.detectChanges();
    }

    /** @ignore */
    _exitTeamMembersMode(): void {
        this.viewService.setCurrentView(VIEW_MODES.SELECT_TEAM);
        this.viewService.resetTeam();

        this._selectedTeamMembers = [];

        this._cdr.detectChanges();
    }

    /** @ignore */
    _submit(): void {
        if (this._data.node && !this._isSingleUserMode && this._selectedTeam) {
            this._data.node.approvers = [...this._selectedTeam.members];
        }

        if (this._data.node && this._checkDueDate) {
            this._data.node.dueDate = this._dueDate.toDate();
        }

        this.dialogRef.close({
            node: this._data.node,
            nodeType: this._nodeType,
            toNextSerial: this._addToNextSerial
        } as AddNodeDialogFormData);
    }

    /** @ignore */
    _onSearchStringChange(searchString = ''): void {
        const params = new Map([['query', searchString]]);

        if (this.viewService.isSelectUserMode) {
            this._data.userDataSource.match(params);
        } else if (this.viewService.isSelectTeamMode) {
            this._data.teamDataSource.match(params);
        } else if (this.viewService.isTeamMembersMode) {
            this._setFilteredTeamMembers(this._selectedTeamMembers.filter((user) => filterByName(user, searchString)));
        }
    }

    /** @ignore */
    _setFilteredTeamMembers(users: ApprovalUser[]): void {
        this._filteredTeamMembers = [...users];
        this._cdr.detectChanges();
    }
}
