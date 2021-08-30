import { Directive, Input, TemplateRef, ViewChild } from '@angular/core';
import { TimelineNodeComponent } from '../components/timeline-node/timeline-node.component';

/** Context provided to the timeline node component. */
export class TimelineNodeOutletContext<T> {
  /** Data for the node. */
  $implicit: T;

  /** Index location of the node. */
  index?: number;

  /** Length of the number of total dataNodes. */
  count?: number;

  constructor(data: T) {
    this.$implicit = data;
  }
}

@Directive({
  selector: '[fdTimelineNodeDef]',
})
export class TimelineNodeDefDirective<T> {

  @Input()
  fdTimelineNodeData: T;

  @ViewChild(TimelineNodeComponent)
  timelineNode: TimelineNodeComponent;

  constructor(public template: TemplateRef<any>) {}
}
