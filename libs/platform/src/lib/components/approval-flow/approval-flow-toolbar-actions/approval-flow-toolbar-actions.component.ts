import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList } from '@angular/core';

import { ApprovalFlowGraph, ApprovalGraphMetadata } from '../approval-flow-graph';
import { ApprovalFlowNodeTarget } from '../approval-flow-add-node/approval-flow-add-node.component';
import { ApprovalFlowNodeComponent } from '../approval-flow-node/approval-flow-node.component';
import { isNodeApproved } from '../helpers';
import { ApprovalGraphNode } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-approval-flow-toolbar-actions',
    templateUrl: './approval-flow-toolbar-actions.component.html',
    styleUrls: ['./approval-flow-toolbar-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-toolbar-actions',
    }
})
export class ApprovalFlowToolbarActionsComponent {
    @Input()
    graph: ApprovalFlowGraph;

    @Input()
    graphMetadata: ApprovalGraphMetadata;

    @Input()
    nodeComponents: QueryList<ApprovalFlowNodeComponent>;

    @Input()
    isEditMode = false;

    @Output()
    enterEditMode = new EventEmitter<void>();

    @Output()
    addNode = new EventEmitter<{ node: ApprovalGraphNode, target: ApprovalFlowNodeTarget }>();

    @Output()
    editCheckedNode = new EventEmitter<ApprovalGraphNode>();

    @Output()
    deleteCheckedNodes = new EventEmitter<void>();

    get _selectedNodes(): ApprovalGraphNode[] {
        if (!this.nodeComponents) {
            return [];
        }

        return this.nodeComponents
            .filter(n => n._isSelected)
            .map(nodeComponent => nodeComponent.node);
    }

    get _notApprovedCheckedNode(): ApprovalGraphNode {
        if (this._selectedNodes.length !== 1) {
            return null;
        }

        return !isNodeApproved(this._selectedNodes[0]) ? this._selectedNodes[0] : null
    }

    get _canAddBefore(): boolean {
        const node = this._selectedNodes[0];
        return this._notApprovedCheckedNode
            && this.graphMetadata[node.id].canAddNodeBefore
            && !node.disableActions
            && !node.actionsConfig?.disableAddBefore;
    }

    get _canAddAfter(): boolean {
        const node = this._selectedNodes[0];
        return this._notApprovedCheckedNode
            && this.graphMetadata[node.id].canAddNodeAfter
            && !node.disableActions
            && !node.actionsConfig?.disableAddAfter;
    }

    get _canAddParallel(): boolean {
        const node = this._selectedNodes[0];
        return this._notApprovedCheckedNode
            && this.graphMetadata[node.id].canAddParallel
            && !node.disableActions
            && !node.actionsConfig?.disableAddParallel;
    }

    get _canEditNode(): boolean {
        const node = this._selectedNodes[0];
        return this._notApprovedCheckedNode
            && !node.disableActions
            && !node.actionsConfig?.disableEdit;
    }

    get _canRemoveSelectedNodes(): boolean {
        const selectedNodes = this._selectedNodes;

        return selectedNodes.length
            && selectedNodes.every(node => !node.disableActions && !node.actionsConfig?.disableRemove);
    }

    _addNode(target: ApprovalFlowNodeTarget): void {
        const node = this._selectedNodes[0];
        this.addNode.emit({ node: node, target: target });
    }

    _editCheckedNode(): void {
        const node = this._selectedNodes[0];
        this.editCheckedNode.emit(node);
    }
}
