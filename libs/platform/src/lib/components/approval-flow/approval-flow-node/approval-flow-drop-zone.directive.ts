import { Directive, ElementRef, Input } from '@angular/core';


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fdp-approval-flow-drop-zone]',
    exportAs: 'fdp-approval-flow-drop-zone'
})
export class ApprovalFlowDropZoneDirective {
    @Input() placement: 'before'| 'after' | 'before-all' | 'after-all';

    active = false;

    constructor(private elRef: ElementRef) {}

    /** @hidden */
    _checkIfNodeDraggedInDropZone(nodeRect: DOMRect): void {
        this.active = false;
        const dropZoneRect = this.elRef.nativeElement.getBoundingClientRect();
        if (dropZoneRect.top + dropZoneRect.height > nodeRect.top
            && dropZoneRect.left + dropZoneRect.width > nodeRect.left
            && dropZoneRect.bottom - dropZoneRect.height < nodeRect.bottom
            && dropZoneRect.right - dropZoneRect.width < nodeRect.right) {
            this.active = true;
        }
    }
}
