import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { ApprovalFlowNodeTarget } from '../approval-flow-add-node/approval-flow-add-node.component';
import { ApprovalFlowGraph, ApprovalGraphMetadata } from '../approval-flow-graph';
import { ApprovalGraphNode } from '../interfaces/approval-node';
import { isNodeApproved } from '../helpers';

/**
 * @deprecated
 * ApprovalFlowToolbarActions component is depricated since version 0.40.0
 */
@Component({
    selector: 'fdp-approval-flow-toolbar-actions',
    templateUrl: './approval-flow-toolbar-actions.component.html',
    styleUrls: ['./approval-flow-toolbar-actions.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-toolbar-actions'
    }
})
export class ApprovalFlowToolbarActionsComponent {
    /** Approval flow graph */
    @Input()
    graph: ApprovalFlowGraph;

    /** Approval flow graph metadata */
    @Input()
    graphMetadata: ApprovalGraphMetadata;

    /** Array of selected approval flow graph nodes */
    @Input()
    set selectedNodes(value: ApprovalGraphNode[]) {
        this._selectedNodes = value;

        this._canRemoveSelectedNodes =
            !!this.selectedNodes.length &&
            this.selectedNodes.every((node) => !node.disableActions && !node.actionsConfig?.disableRemove);
    }
    get selectedNodes(): ApprovalGraphNode[] {
        return this._selectedNodes;
    }

    /** Whether approval flow in the edit mode */
    @Input()
    isEditMode = false;

    /** Event emitted when edit mode toggled */
    @Output()
    enterEditMode = new EventEmitter<void>();

    /** Event emitted when node added */
    @Output()
    addNode = new EventEmitter<{ node: ApprovalGraphNode; target: ApprovalFlowNodeTarget }>();

    /** Event emitted when selected node edited */
    @Output()
    editSelectedNode = new EventEmitter<ApprovalGraphNode>();

    /** Event emitted when selected nodes deleted (bulk) */
    @Output()
    deleteSelectedNodes = new EventEmitter<void>();

    /** @hidden */
    _canRemoveSelectedNodes = false;

    /** @hidden */
    private _selectedNodes: ApprovalGraphNode[] = [];

    /** @hidden */
    get _notApprovedSelectedNode(): ApprovalGraphNode | null {
        if (this.selectedNodes.length !== 1) {
            return null;
        }

        return !isNodeApproved(this.selectedNodes[0]) ? this.selectedNodes[0] : null;
    }

    /** @hidden */
    get _canAddBefore(): boolean {
        const node = this._notApprovedSelectedNode;

        return (
            !!node &&
            !node.disableActions &&
            !node.actionsConfig?.disableAddBefore &&
            !!this.graphMetadata[node.id].canAddNodeBefore
        );
    }

    /** @hidden */
    get _canAddAfter(): boolean {
        const node = this._notApprovedSelectedNode;

        return (
            !!node &&
            !node.disableActions &&
            !node.actionsConfig?.disableAddAfter &&
            !!this.graphMetadata[node.id].canAddNodeAfter
        );
    }

    /** @hidden */
    get _canAddParallel(): boolean {
        const node = this._notApprovedSelectedNode;

        return (
            !!this._notApprovedSelectedNode &&
            !node?.disableActions &&
            !node?.actionsConfig?.disableAddParallel &&
            !!this.graphMetadata[node!.id].canAddParallel
        );
    }

    /** @hidden */
    get _canEditNode(): boolean {
        const node = this._notApprovedSelectedNode;

        return !!node && !node.disableActions && !node.actionsConfig?.disableEdit;
    }

    /** @hidden */
    _addNode(target: ApprovalFlowNodeTarget): void {
        const node = this.selectedNodes[0];
        this.addNode.emit({ node, target });
    }

    /** @hidden */
    _editSelectedNode(): void {
        const node = this.selectedNodes[0];
        this.editSelectedNode.emit(node);
    }
}
