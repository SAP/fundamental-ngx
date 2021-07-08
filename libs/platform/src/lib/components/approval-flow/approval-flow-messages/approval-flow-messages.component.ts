import { EventEmitter, ChangeDetectionStrategy, Component, Output, Input } from '@angular/core';
import { trackByFn } from '../helpers';

export type ApprovalFlowMessageType =
    'watchersChangeSuccess' |
    'approverAddSuccess' |
    'teamAddSuccess' |
    'nodeEdit' |
    'nodeRemove' |
    'nodesRemove' |
    'teamRemove' |
    'error';

export interface ApprovalFlowMessage {
    type: ApprovalFlowMessageType
}

@Component({
    selector: 'fdp-approval-flow-messages',
    templateUrl: './approval-flow-messages.component.html',
    styleUrls: ['./approval-flow-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-messages',
    }
})
export class ApprovalFlowMessagesComponent {
    @Input()
    messages: ApprovalFlowMessage[] = [];

    @Input()
    enableUndoAction = false;

    @Output()
    messagesChange = new EventEmitter<ApprovalFlowMessage[]>();

    @Output()
    undoLastAction = new EventEmitter<void>();

    /** @hidden */
    _trackByFn = trackByFn;

    /** @hidden */
    _dismissMessage(messageIndex: number): void {
        this.messages.splice(messageIndex, 1);
    }

    /** @hidden */
    _undoLastAction(messageIndex: number, event: Event): void {
        event.preventDefault();

        this._dismissMessage(messageIndex);
        this.undoLastAction.emit();
    }
}
