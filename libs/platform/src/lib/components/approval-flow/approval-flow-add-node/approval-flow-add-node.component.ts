import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { FdDate } from '@fundamental-ngx/core/datetime';
import { DialogRef } from '@fundamental-ngx/core/dialog';

import { ApprovalFlowAddNodeViewService, VIEW_MODES } from '../services/approval-flow-add-node-view.service';
import { displayTeamFn, displayUserFn, filterByName, trackByFn } from '../helpers';
import { ApprovalNode } from '../interfaces/approval-node';
import { ApprovalDataSource } from '../interfaces/approval-data-source';
import { ApprovalTeam } from '../interfaces/approval-team';
import { ApprovalUser } from '../interfaces/approval-user';

export interface AddNodeDialogRefData {
    isEdit?: boolean;
    showNodeTypeSelect?: boolean;
    node?: ApprovalNode;
    nodeTarget?: ApprovalFlowNodeTarget;
    approvalFlowDataSource: ApprovalDataSource;
    userDetailsTemplate: TemplateRef<any>;
    checkDueDate?: boolean;
    rtl: boolean;
}

export interface AddNodeDialogFormData {
    node: ApprovalNode;
    nodeType: APPROVAL_FLOW_NODE_TYPES;
    toNextSerial: boolean
}

export type ApprovalFlowNodeTarget =
    'empty' |
    'before' |
    'before-all' |
    'after-all' |
    'after' |
    'parallel';

export enum APPROVAL_FLOW_NODE_TYPES {
    SERIAL = 'SERIAL',
    PARALLEL = 'PARALLEL'
}

export enum APPROVAL_FLOW_APPROVER_TYPES {
    SINGLE_USER = 'SINGLE_USER',
    ANYONE = 'ANYONE',
    EVERYONE = 'EVERYONE'
}

@Component({
    selector: 'fdp-approval-flow-add-node',
    templateUrl: './approval-flow-add-node.component.html',
    styleUrls: [ './approval-flow-add-node.component.scss', '../styles/approval-flow-dialog.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalFlowAddNodeComponent implements OnInit, OnDestroy {
    /** @hidden */
    _nodeType = APPROVAL_FLOW_NODE_TYPES.SERIAL;

    /** @hidden */
    _nodeTypes = APPROVAL_FLOW_NODE_TYPES;

    /** @hidden */
    _nodeTypesArray = Object.keys(APPROVAL_FLOW_NODE_TYPES);

    /** @hidden */
    _approverType = APPROVAL_FLOW_APPROVER_TYPES.SINGLE_USER;

    /** @hidden */
    _approverTypes = APPROVAL_FLOW_APPROVER_TYPES;

    /** @hidden */
    _approverTypesArray = Object.keys(APPROVAL_FLOW_APPROVER_TYPES);

    /** @hidden */
    _dueDate = FdDate.getNow();

    /** @hidden */
    _selectMode = false;

    /** @hidden */
    _approvers: ApprovalUser[] = [];

    /** @hidden */
    _teams: ApprovalTeam[] = [];

    /** @hidden */
    _filteredApprovers: ApprovalUser[] = [];

    /** @hidden */
    _filteredTeams: ApprovalTeam[] = [];

    /** @hidden */
    _selectedApprovers: ApprovalUser[] = [];

    /** @hidden */
    _selectedTeam: ApprovalTeam;

    /** @hidden */
    _selectedTeamArray: ApprovalTeam[] = [];

    /** @hidden */
    _selectedTeamMembers: ApprovalUser[] = [];

    /** @hidden */
    _filteredTeamMembers: ApprovalUser[] = [];

    /** @hidden */
    _userToShowDetails: ApprovalUser;

    /** @hidden */
    _userToShowDetailsData$: Observable<any>;

    /** @hidden */
    _searchString = '';

    /** @hidden */
    _checkDueDate = false;

    /** @hidden */
    _displayUserFn = displayUserFn;

    /** @hidden */
    _displayTeamFn = displayTeamFn;

    /** @hidden */
    _trackByFn = trackByFn;

    /** @hidden */
    _addToNextSerial = false;

    /** @hidden */
    private _viewChangeSub: Subscription;

    /** @hidden */
    private _dataSourceSub: Subscription;

    /** @hidden */
    constructor(
        public dialogRef: DialogRef,
        public viewService: ApprovalFlowAddNodeViewService,
        private _cdr: ChangeDetectorRef
    ) {}

    /** @hidden */
    get _data(): AddNodeDialogRefData {
        return this.dialogRef.data;
    }

    /** @hidden */
    get _isSingleUserMode(): boolean {
        return this._approverType === this._approverTypes.SINGLE_USER;
    }

    /** @hidden */
    get _isMainSubmitButtonDisabled(): boolean {
        const approvers = this._isSingleUserMode ? this._selectedApprovers : this._selectedTeamArray;

        return !approvers.length
            || (this._checkDueDate && !this._dueDate);
    }

    /** @hidden */
    get _headerArrowGlyph(): string {
        return 'navigation-' + (this._data.rtl ? 'right' : 'left') + '-arrow';
    }

    /** @hidden */
    ngOnInit(): void {
        this._dataSourceSub = forkJoin([
            this._data.approvalFlowDataSource.fetchTeams().pipe(take(1)),
            this._data.approvalFlowDataSource.fetchApprovers().pipe(take(1))
        ])
            .subscribe(([teams, approvers]) => {
                this._teams = teams;
                this._setFilteredTeams(teams || []);

                this._approvers = approvers;
                this._setFilteredApprovers(approvers || []);

                if (this._data.isEdit) {
                    this._checkDueDate = this._data.checkDueDate;

                    if (this._checkDueDate && this._data.node.dueDate) {
                        this._dueDate = FdDate.getFdDateByDate(new Date(this._data.node.dueDate));
                    }

                    this._selectedApprovers = [...this._data.node.approvers];

                    if (this._data.node.approvalTeamId) {
                        this.viewService.selectTeam(this._teams.find(t => t.id === this._data.node.approvalTeamId));

                        this._selectedTeam = this.viewService.team;
                        this._selectedTeamArray = [this.viewService.team];
                        this._approverType = this._data.node.isEveryoneApprovalNeeded
                            ? this._approverTypes.EVERYONE
                            : this._approverTypes.ANYONE;
                    }

                    this._cdr.detectChanges();
                }
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

    /** @hidden */
    ngOnDestroy(): void {
        this._viewChangeSub.unsubscribe();
        this._dataSourceSub.unsubscribe();
    }

    /** @hidden */
    _goToSelectMode(): void {
        this._selectMode = true;

        this.viewService.setCurrentView(this._isSingleUserMode ? VIEW_MODES.SELECT_USER : VIEW_MODES.SELECT_TEAM);
        this._cdr.detectChanges();
    }

    /** @hidden */
    _exitSelectMode(): void {
        if (this._selectedApprovers.length && !this._data.node.approvers.length) {
            this._selectedApprovers = [];
        }

        if (!this._data.isEdit && !this._data.node.approvalTeamId) {
            this.viewService.resetTeam();
        }

        this._selectMode = false;
        this.viewService.resetView();
        this._cdr.detectChanges();
    }

    /** @hidden */
    _setSelectedApprovers(approvers: ApprovalUser[]): void {
        this._selectedApprovers = approvers;

        this._confirmSelectedApprovers();
    }

    /** @hidden */
    _confirmSelectedApprovers(): void {
        this._data.node.approvers = this._selectedApprovers;
        this._data.node.variousTeams = this._isUsersFromVariousTeams(this._data.node.approvers);
        this._data.node.description = this._data.node.variousTeams ? '' : this._selectedApprovers[0]?.description;

        delete this._data.node.approvalTeamId;
        delete this._data.node.isEveryoneApprovalNeeded;

        this._exitSelectMode();
    }

    /** @hidden */
    _setSelectedTeam(team: ApprovalTeam): void {
        this.viewService.selectTeam(team);
    }

    /** @hidden */
    _confirmSelectedTeam(): void {
        this._selectedTeam = this.viewService.team;
        this._selectedTeamArray = [this.viewService.team];

        this._data.node.variousTeams = false;
        this._data.node.approvalTeamId = this.viewService.team.id;
        this._data.node.description = this.viewService.team.name;
        this._data.node.isEveryoneApprovalNeeded = this._approverType === APPROVAL_FLOW_APPROVER_TYPES.EVERYONE;

        this._exitSelectMode();
    }

    /** @hidden */
    _seeUserDetails(user: ApprovalUser): void {
        this.viewService.setCurrentView(VIEW_MODES.USER_DETAILS);

        this._userToShowDetails = user;
        this._userToShowDetailsData$ = this._data.approvalFlowDataSource.fetchUser(user.id);

        this._cdr.detectChanges();
    }

    /** @hidden */
    _exitUserDetailsMode(): void {
        this.viewService.setCurrentView(this.viewService.team ? VIEW_MODES.VIEW_TEAM_MEMBERS : VIEW_MODES.SELECT_USER);

        this._userToShowDetails = undefined;
        this._userToShowDetailsData$ = undefined;

        this._setFilteredApprovers(this._approvers);
        this._cdr.detectChanges();
    }

    /** @hidden */
    _viewTeamMembers(team: ApprovalTeam): void {
        this.viewService.selectTeam(team);
        this.viewService.setCurrentView(VIEW_MODES.VIEW_TEAM_MEMBERS);

        this._selectedTeamMembers = this._approvers.filter(user => team.members.includes(user.id));

        this._setFilteredTeamMembers(this._selectedTeamMembers);
        this._cdr.detectChanges();
    }

    /** @hidden */
    _exitTeamMembersMode(): void {
        this.viewService.setCurrentView(VIEW_MODES.SELECT_TEAM);
        this.viewService.resetTeam();
        this._setFilteredTeams(this._teams || []);

        this._selectedTeamMembers = [];

        this._cdr.detectChanges();
    }

    /** @hidden */
    _submit(): void {
        if (!this._isSingleUserMode && this._selectedTeam) {
            this._data.node.approvers = this._selectedTeam.members.map(memberId => this._approvers.find(a => a.id === memberId));
        }

        if (this._checkDueDate) {
            this._data.node.dueDate = this._dueDate.toDate();
        }

        this.dialogRef.close({
            node: this._data.node,
            nodeType: this._nodeType,
            toNextSerial: this._addToNextSerial
        } as AddNodeDialogFormData);
    }

    /** @hidden */
    _onSearchStringChange(searchString = ''): void {
        this._searchString = searchString;

        if (!searchString) {
            this._setFilteredApprovers(this._approvers);
            this._setFilteredTeams(this._teams || []);
            this._setFilteredTeamMembers(this._selectedTeamMembers);
            return;
        }

        if (this.viewService.isSelectUserMode) {
            this._setFilteredApprovers(this._approvers.filter(user => filterByName(user, searchString)));
        }

        if (this.viewService.isSelectTeamMode) {
            this._setFilteredTeams(this._teams.filter(team => filterByName(team, searchString)));
        }

        if (this.viewService.isTeamMembersMode) {
            this._setFilteredTeamMembers(this._selectedTeamMembers.filter(user => filterByName(user, searchString)));
        }
    }

    /** @hidden */
    _setFilteredApprovers(users: ApprovalUser[]): void {
        this._filteredApprovers = [...users];
        this._cdr.detectChanges();
    }

    /** @hidden */
    _setFilteredTeams(teams: ApprovalTeam[]): void {
        this._filteredTeams = [...teams];
        this._cdr.detectChanges();
    }

    /** @hidden */
    _setFilteredTeamMembers(users: ApprovalUser[]): void {
        this._filteredTeamMembers = [...users];
        this._cdr.detectChanges();
    }

    /** @hidden */
    private _isUsersFromVariousTeams(users: ApprovalUser[]): boolean {
        if (!this._teams?.length) {
            return false;
        }

        const teams: string[] = users.reduce((_teams, user) => {
            const userTeam = this._teams.find(team => team.members.includes(user.id));

            if (userTeam && !_teams.includes(userTeam.id)) {
                _teams.push(userTeam.id);
            }

            return _teams;
        }, [])

        return teams.length > 1;
    }
}
