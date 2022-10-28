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
    /** @hidden */
    onViewChange = new EventEmitter();

    /** @hidden */
    private currentView?: VIEW_MODES;
    /** @hidden */
    private selectedTeam?: ApprovalTeam;

    /** @hidden */
    get isUserDetailsMode(): boolean {
        return this.currentView === VIEW_MODES.USER_DETAILS;
    }

    /** @hidden */
    get isTeamMembersMode(): boolean {
        return this.currentView === VIEW_MODES.VIEW_TEAM_MEMBERS;
    }

    /** @hidden */
    get isSelectUserMode(): boolean {
        return this.currentView === VIEW_MODES.SELECT_USER;
    }

    /** @hidden */
    get isSelectTeamMode(): boolean {
        return this.currentView === VIEW_MODES.SELECT_TEAM;
    }

    /** @hidden */
    get team(): ApprovalTeam | undefined {
        return this.selectedTeam;
    }

    /** @hidden */
    setCurrentView(view: VIEW_MODES): void {
        this.currentView = view;
        this.onViewChange.emit();
    }

    /** @hidden */
    resetView(): void {
        this.currentView = undefined;
        this.onViewChange.emit();
    }

    /** @hidden */
    selectTeam(team: ApprovalTeam): void {
        this.selectedTeam = team;
    }

    /** @hidden */
    resetTeam(): void {
        this.selectedTeam = undefined;
    }
}
