import { Component } from '@angular/core';
import { TIMELINE_EXAMPLE_DATA } from './timeline-basic-example/timeline-example-data';

@Component({
    selector: 'fd-timeline-horizontal-double-side',
    templateUrl: './timeline-template-example.component.html'
})
export class TimelineHorizontalDoubleSideExampleComponent {
    data = TIMELINE_EXAMPLE_DATA;

    axis = 'horizontal';

    layout = 'double';
}
