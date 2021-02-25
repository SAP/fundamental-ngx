import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';

import { DialogRef, FdDate } from '@fundamental-ngx/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import {
    ApprovalDataSource,
    ApprovalNode,
    ApprovalTeam,
    ApprovalUser
} from '../public_api';
import {
    ApprovalFlowAddNodeViewService,
    VIEW_MODES
} from '../services/approval-flow-add-node-view.service';
import { displayUserFn, filterByName, trackByFn } from '../helpers';

interface AddNodeDialogRefData {
    isEdit?: boolean;
    showNodeTypeSelect?: boolean;
    node?: ApprovalNode;
    teams?: ApprovalTeam[];
    nodeTarget?: string;
    approvalFlowDataSource: ApprovalDataSource;
    userDetailsTemplate: TemplateRef<any>;
    rtl: boolean;
}

const SERIAL = 'Serial';
const PARALLEL = 'Parallel';

const SINGLE_USER = 'A user';
const ANYONE = 'Anyone on the team';
const EVERYONE = 'Everyone on the team';

@Component({
    selector: 'fdp-approval-flow-add-node',
    templateUrl: './approval-flow-add-node.component.html',
    styleUrls: ['./approval-flow-add-node.component.scss', '../styles/approval-flow-dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalFlowAddNodeComponent implements OnInit, OnDestroy {
    /** @hidden */
    _nodeType = SERIAL;

    /** @hidden */
    _nodeTypes = [PARALLEL, SERIAL];

    /** @hidden */
    _approverType = SINGLE_USER;

    /** @hidden */
    _approverTypes = [SINGLE_USER, ANYONE, EVERYONE];

    /** @hidden */
    _dueDate = FdDate.getNow();

    /** @hidden */
    _selectMode = false;

    /** @hidden */
    _approvers: ApprovalUser[] = [];

    /** @hidden */
    _filteredApprovers: ApprovalUser[] = [];

    /** @hidden */
    _filteredTeams: ApprovalTeam[] = [];

    /** @hidden */
    _selectedApprovers: ApprovalUser[] = [];

    /** @hidden */
    _selectedTeam: ApprovalTeam;

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
    _displayUserFn = displayUserFn;

    /** @hidden */
    _trackByFn = trackByFn;

    /** @hidden */
    private viewChangeSub: Subscription;

    constructor(public dialogRef: DialogRef, public viewService: ApprovalFlowAddNodeViewService, private _cdr: ChangeDetectorRef) {
    }

    /** @hidden */
    get _data(): AddNodeDialogRefData {
        return this.dialogRef.data;
    }

    /** @hidden */
    get _isSingleUserMode(): boolean {
        return this._approverType === SINGLE_USER;
    }

    /** @hidden */
    get _isMainSubmitButtonDisabled(): boolean {
        if (this._isSingleUserMode) {
            return !this._selectedApprovers.length || !this._dueDate;
        }

        return !this._selectedTeam;
    }

    /** @hidden */
    get _headerArrowGlyph(): string {
        return 'navigation-' + (this._data.rtl ? 'right' : 'left') + '-arrow';
    }

    /** @hidden */
    ngOnInit(): void {
        this._setFilteredTeams(this._data.teams || []);
        this._data.approvalFlowDataSource.fetchApprovers()
            .pipe(take(1))
            .subscribe(approvers => {
                this._approvers = approvers;
                this._setFilteredApprovers(approvers);
            });
        if (this._data.isEdit) {
            this._dueDate = FdDate.getFdDateByDate(new Date(this._data.node.dueDate));
            this._selectedApprovers = [...this._data.node.approvers];
            if (this._data.node.approvalTeamId) {
                this.viewService.selectTeam(this._data.teams.find(t => t.id === this._data.node.approvalTeamId));
                this._selectedTeam = this.viewService.team;
                this._approverType = this._data.node.isEveryoneApprovalNeeded ? EVERYONE : ANYONE;
            }
            this._cdr.detectChanges();
        }

        this.viewChangeSub = this.viewService.onViewChange.subscribe(() => {
            this._onSearchStringChange('');
            this._cdr.detectChanges();
        });

        switch (this._data.nodeTarget) {
            case 'before':
            case 'after':
                this._nodeType = SERIAL;
                break;
            case 'parallel':
                this._nodeType = PARALLEL;
                break;
        }
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
    _confirmSelectedApprovers(): void {
        this._data.node.approvers = this._selectedApprovers;
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
        this._data.node.approvalTeamId = this.viewService.team.id;
        this._data.node.isEveryoneApprovalNeeded = this._approverType === EVERYONE;
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
        this._setFilteredTeams(this._data.teams || []);
        this._selectedTeamMembers = [];
        this._cdr.detectChanges();
    }

    /** @hidden */
    _submit(): void {
        if (!this._isSingleUserMode && this._selectedTeam) {
            this._data.node.approvers = this._selectedTeam.members.map(memberId => this._approvers.find(a => a.id === memberId));
        }
        this._data.node.dueDate = this._dueDate.toDate();
        this.dialogRef.close({ node: this._data.node, nodeType: this._nodeType });
    }

    /** @hidden */
    _onSearchStringChange(searchString = ''): void {
        this._searchString = searchString;
        if (!searchString) {
            this._setFilteredApprovers(this._approvers);
            this._setFilteredTeams(this._data.teams || []);
            this._setFilteredTeamMembers(this._selectedTeamMembers);
            return;
        }

        if (this.viewService.isSelectUserMode) {
            this._setFilteredApprovers(this._approvers.filter(user => filterByName(user, searchString)));
        }

        if (this.viewService.isSelectTeamMode) {
            this._setFilteredTeams(this._data.teams.filter(team => filterByName(team, searchString)));
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
    _isDateNull(): boolean {
        return !this._dueDate;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.viewChangeSub.unsubscribe();
    }
}
