import { Directive, Input, TemplateRef } from '@angular/core';

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

  constructor(public template: TemplateRef<any>) {}
}
