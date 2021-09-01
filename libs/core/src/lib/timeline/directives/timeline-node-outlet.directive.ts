import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[fdTimelineNodeOutlet]'
})
export class TimelineNodeOutletDirective {
    /*Ref to ViewContainerRef instance*/
    constructor(
        public viewContainer: ViewContainerRef
    ) {
    }

}
