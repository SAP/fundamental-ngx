import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[fdTimelineNodeOutlet], [fd-timeline-node-outlet]'
})
export class TimelineNodeOutletDirective {
  /*Ref to ViewContainerRef instance*/
  constructor(
      public viewContainer: ViewContainerRef,
  ) { }

}
