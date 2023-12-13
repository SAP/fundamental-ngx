import { EventEmitter, Injectable } from '@angular/core';
import { ApprovalTeam } from '../interfaces';

export enum VIEW_MODES {
    SELECT_TEAM = 'SELECT_TEAM',
    SELECT_USER = 'SELECT_USER',
    VIEW_TEAM_MEMBERS = 'VIEW_TEAM_MEMBERS',
    USER_DETAILS = 'USER_DETAILS'
}

@Injectable()
export class ApprovalFlowAddNodeViewService {
    /** @ignore */
    onViewChange = new EventEmitter();

    /** @ignore */
    private currentView?: VIEW_MODES;
    /** @ignore */
    private selectedTeam?: ApprovalTeam;

    /** @ignore */
    get isUserDetailsMode(): boolean {
        return this.currentView === VIEW_MODES.USER_DETAILS;
    }

    /** @ignore */
    get isTeamMembersMode(): boolean {
        return this.currentView === VIEW_MODES.VIEW_TEAM_MEMBERS;
    }

    /** @ignore */
    get isSelectUserMode(): boolean {
        return this.currentView === VIEW_MODES.SELECT_USER;
    }

    /** @ignore */
    get isSelectTeamMode(): boolean {
        return this.currentView === VIEW_MODES.SELECT_TEAM;
    }

    /** @ignore */
    get team(): ApprovalTeam | undefined {
        return this.selectedTeam;
    }

    /** @ignore */
    setCurrentView(view: VIEW_MODES): void {
        this.currentView = view;
        this.onViewChange.emit();
    }

    /** @ignore */
    resetView(): void {
        this.currentView = undefined;
        this.onViewChange.emit();
    }

    /** @ignore */
    selectTeam(team: ApprovalTeam): void {
        this.selectedTeam = team;
    }

    /** @ignore */
    resetTeam(): void {
        this.selectedTeam = undefined;
    }
}
