import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { trackByFn } from '../helpers';

export type ApprovalFlowMessageType =
    | 'watchersChangeSuccess'
    | 'approverAddSuccess'
    | 'teamAddSuccess'
    | 'nodeEdit'
    | 'nodeRemove'
    | 'nodesRemove'
    | 'teamRemove'
    | 'error';

export interface ApprovalFlowMessage {
    type: ApprovalFlowMessageType;
}

/**
 * @deprecated
 * ApprovalFlowMessages component is deprecated since version 0.40.0
 */
@Component({
    selector: 'fdp-approval-flow-messages',
    templateUrl: './approval-flow-messages.component.html',
    styleUrl: './approval-flow-messages.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-messages'
    },
    imports: [MessageStripComponent, FdTranslatePipe]
})
export class ApprovalFlowMessagesComponent {
    /** Array of messages */
    @Input()
    messages: ApprovalFlowMessage[] = [];

    /** Whether undo action is available */
    @Input()
    undoLastActionAvailable = false;

    /** Event emitted when messages array change */
    @Output()
    messagesChange = new EventEmitter<ApprovalFlowMessage[]>();

    /** Event emitted when user click undo button */
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
