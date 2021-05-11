import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { ApprovalNode, ApprovalNodeActionsConfig, ApprovalStatus } from '@fundamental-ngx/platform';

import { ApprovalFlowExampleDataSource } from './approval-flow-example-data-source.class';

@Component({
    selector: 'fdp-approval-flow-example',
    template: `
        <fdp-approval-flow
            title='Basic Approval Flow Demo'
            [dataSource]='dataSource'
            [userDetailsTemplate]='userDetailsTemplate'
            [checkDueDate]='checkDueDate'
            [allowSendRemindersForStatuses]='sendReminderStatuses'
            [isEditAvailable]='editModeEnabled'
            (nodeClick)='nodeClick($event)'
        >
        </fdp-approval-flow>
        <ng-template #userDetailsTemplate let-data='data'>
            <h4 style='margin-bottom: 1rem;'>Contact info</h4>

            <p style='display: flex; flex-direction: column;'>
                <span>Mobile</span>
                <a href='javascript:void(0)'>{{ data?.phone }}</a>
            </p>

            <p style='display: flex; flex-direction: column;'>
                <span>Phone</span>
                <a href='javascript:void(0)'>{{ data?.phone }}</a>
            </p>

            <p style='display: flex; flex-direction: column;'>
                <span>E-mail</span>
                <a href='javascript:void(0)'>{{ data?.email }}</a>
            </p>

            <h4 style='margin-top: 1.5rem; margin-bottom: 1rem;'>Company</h4>

            <p style='display: flex; flex-direction: column;'>
                <span>Name</span>
                <a href='javascript:void(0)'>Company A{{ data?.email }}</a>
            </p>

            <p style='display: flex; flex-direction: column;'>
                <span>Address</span>
                <a href='javascript:void(0)'>481 West Street, Anytown OH, 83749, USA</a>
            </p>
        </ng-template>

        <p>
            Selected example:
            <select [(ngModel)]='selectedExample' (ngModelChange)='dataSource.selectGraph(selectedExample)'>
                <option *ngFor='let example of examples' [value]='example'>{{ example | titlecase }}</option>
            </select>
        </p>
        <p>Enable "Edit mode": <input type='checkbox' [(ngModel)]='editModeEnabled'></p>
        <p>Enable due date warnings: <input type='checkbox' [(ngModel)]='checkDueDate'></p>
        <p>Set all statuses to "Not Started": <input type='checkbox' [(ngModel)]='setNotStartedStatuses' (ngModelChange)='setNotStarted()'>
        </p>
        <p>
            Disable all node actions:
            <input type='checkbox' [(ngModel)]='nodeActionsDisabled' (ngModelChange)='toggleNodeActions($event)'>
        </p>
        <p>Disable certain node actions: </p>
        <div>
            <p>
                <input
                    id='disableAddingNodeBefore'
                    [disabled]='nodeActionsDisabled'
                    type='checkbox'
                    [(ngModel)]='nodeActionsConfig.disableAddBefore'
                    (ngModelChange)='toggleSpecificNodeAction("disableAddBefore", $event)'
                >
                <label for='disableAddingNodeBefore'>Disable adding before</label>
            </p>

            <p>
                <input
                    id='disableAddingNodeAfter'
                    [disabled]='nodeActionsDisabled'
                    type='checkbox'
                    [(ngModel)]='nodeActionsConfig.disableAddAfter'
                    (ngModelChange)='toggleSpecificNodeAction("disableAddAfter", $event)'
                >
                <label for='disableAddingNodeAfter'>Disable adding after</label>
            </p>

            <p>
                <input
                    id='disableAddingNodeParallel'
                    [disabled]='nodeActionsDisabled'
                    type='checkbox'
                    [(ngModel)]='nodeActionsConfig.disableAddParallel'
                    (ngModelChange)='toggleSpecificNodeAction("disableAddParallel", $event)'
                >
                <label for='disableAddingNodeParallel'>Disable adding parallel</label>
            </p>

            <p>
                <input
                    id='disableEditingNode'
                    [disabled]='nodeActionsDisabled'
                    type='checkbox'
                    [(ngModel)]='nodeActionsConfig.disableEdit'
                    (ngModelChange)='toggleSpecificNodeAction("disableEdit", $event)'
                >
                <label for='disableEditingNode'>Disable editing</label>
            </p>

            <p>
                <input
                    id='disableRemovingNode'
                    [disabled]='nodeActionsDisabled'
                    type='checkbox'
                    [(ngModel)]='nodeActionsConfig.disableRemove'
                    (ngModelChange)='toggleSpecificNodeAction("disableRemove", $event)'
                >
                <label for='disableRemovingNode'>Disable removing</label>
            </p>
        </div>
        <p style='display: flex;align-items: center;'>Allow sending reminders to approvers with statuses:
            <fd-multi-input
                style='margin-left: .5rem;'
                [compact]='true'
                [dropdownValues]='allStatuses'
                [(ngModel)]='sendReminderStatuses'
            ></fd-multi-input>
        </p>
    `
})
export class PlatformApprovalFlowExampleComponent implements OnDestroy {
    dataSource = new ApprovalFlowExampleDataSource('complex');
    examples = [
        'empty',
        'simple',
        'medium',
        'complex'
    ];
    selectedExample = 'complex';
    checkDueDate = false;
    setNotStartedStatuses = false;
    editModeEnabled = true;
    nodeActionsDisabled = false;
    nodeActionsConfig: ApprovalNodeActionsConfig = {
        disableAddBefore: false,
        disableAddAfter: false,
        disableAddParallel: false,
        disableEdit: false,
        disableRemove: false
    }
    allStatuses = [
        'in progress',
        'not started',
        'approved',
        'rejected'
    ];
    sendReminderStatuses: ApprovalStatus[] = [
        'in progress',
        'not started'
    ];

    private _subscriptions = new Subscription();

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    toggleNodeActions(state: boolean): void {
        this._subscriptions.add(undefined);


        this._subscriptions.add(
            this.dataSource.fetch()
                .pipe(take(1))
                .subscribe(approvalGraph => {
                    approvalGraph.nodes.forEach(node => {
                        node.disableActions = state;
                    });

                    this.dataSource.updateApprovals(approvalGraph.nodes);
                })
        );
    }

    toggleSpecificNodeAction(field: keyof ApprovalNodeActionsConfig, state: boolean): void {
        this._subscriptions.add(
            this.dataSource.fetch()
                .pipe(take(1))
                .subscribe(approvalGraph => {
                    approvalGraph.nodes.forEach(node => {
                        node.actionsConfig = {
                            ...node.actionsConfig,
                            [field]: state
                        };
                    });

                    this.dataSource.updateApprovals(approvalGraph.nodes);
                })
        );
    }

    nodeClick(node: ApprovalNode): void {
        console.log('Node click handler', node);
    }

    setNotStarted(): void {
        this.dataSource.setDefaultStatus(this.setNotStartedStatuses ? 'not started' : null);
    }
}
