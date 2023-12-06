import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[fdTimelineSecondListOutlet], [fd-timeline-second-list-outlet]',
    standalone: true
})
export class TimelineSecondListOutletDirective {
    /** Ref to ViewContainerRef instance*/
    constructor(public viewContainer: ViewContainerRef) {}
}
