import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[fdTimelineFirstListOutlet]'
})
export class TimelineFirstListOutletDirective {
    /*Ref to ViewContainerRef instance*/
    constructor(
        public viewContainer: ViewContainerRef
    ) {
    }

}
