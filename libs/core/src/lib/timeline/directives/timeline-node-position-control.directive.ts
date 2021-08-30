import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[fdTimelineNodePositionControl], [fd-timeline-node-position-control]'
})
export class TimelineNodePositionControlDirective {

  constructor(
      public el: ElementRef
  ) { }

}
