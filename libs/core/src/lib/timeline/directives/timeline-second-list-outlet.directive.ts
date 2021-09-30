import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[fdTimelineSecondListOutlet]'
})
export class TimelineSecondListOutletDirective {

    /*Ref to ViewContainerRef instance*/
    constructor(
        public viewContainer: ViewContainerRef
    ) {
    }

}
