import { Component } from '@angular/core';
import { TIMELINE_EXAMPLE_DATA } from './timeline-basic-example/timeline-example-data';
import { TimelineAxis, TimelineSidePosition } from '@fundamental-ngx/core/timeline';

@Component({
    selector: 'fd-timeline-vertical-double-side',
    templateUrl: './timeline-template-example.component.html'
})
export class TimelineVerticalDoubleSideExampleComponent {
    data = TIMELINE_EXAMPLE_DATA;
    axis: TimelineAxis = 'vertical';
    layout: TimelineSidePosition = 'double';
}
