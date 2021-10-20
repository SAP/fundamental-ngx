import { Directive, ElementRef, Input } from '@angular/core';

import { ApprovalFlowNewNodePlacement } from '../approval-flow-add-node/approval-flow-add-node.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fdp-approval-flow-drop-zone]',
    exportAs: 'fdp-approval-flow-drop-zone'
})
export class ApprovalFlowDropZoneDirective {
    /** Approval flow new node placement */
    @Input()
    placement: ApprovalFlowNewNodePlacement;

    /** Whether drop zone is active (pointer with dragged node over the drop zone) */
    active = false;

    /** @hidden */
    constructor(private readonly elRef: ElementRef) {}

    /** @hidden */
    _checkIfNodeDraggedInDropZone(nodeRect: DOMRect): void {
        this.active = false;

        const dropZoneRect = this.elRef.nativeElement.getBoundingClientRect();

        if (
            dropZoneRect.top + dropZoneRect.height > nodeRect.top &&
            dropZoneRect.left + dropZoneRect.width > nodeRect.left &&
            dropZoneRect.bottom - dropZoneRect.height < nodeRect.bottom &&
            dropZoneRect.right - dropZoneRect.width < nodeRect.right
        ) {
            this.active = true;
        }
    }
}
