import { Directive, Input, TemplateRef } from '@angular/core';

/** Context provided to the timeline node component. */
export class TimelineNodeOutletContext<T> {
    /** Data for the node. */
    $implicit: T;

    /** Index location of the node. */
    index?: number;

    /** Length of the number of total dataNodes. */
    count?: number;

    /** @ignore */
    constructor(data: T) {
        this.$implicit = data;
    }
}

@Directive({
    selector: '[fdTimelineNodeDef], [fd-timeline-node-def]',
    standalone: true
})
export class TimelineNodeDefDirective<T> {
    /** Data passed to the template*/
    @Input()
    fdTimelineNodeData: T;

    /** @ignore */
    constructor(public template: TemplateRef<any>) {}
}
