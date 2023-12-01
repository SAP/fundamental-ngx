import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[fdTimelineFirstListOutlet], [fd-timeline-first-list-outlet]',
    standalone: true
})
export class TimelineFirstListOutletDirective {
    /** Ref to ViewContainerRef instance*/
    constructor(public viewContainer: ViewContainerRef) {}
}
