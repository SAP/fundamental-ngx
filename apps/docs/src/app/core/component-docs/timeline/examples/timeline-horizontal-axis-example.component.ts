import { Component } from '@angular/core';
import { TIMELINE_EXAMPLE_DATA } from './timeline-basic-example/timeline-example-data';

@Component({
    selector: 'fd-timeline-horizontal-axis',
    templateUrl: './timeline-template-example.component.html'
})
export class TimelineHorizontalAxisExampleComponent {
    data = TIMELINE_EXAMPLE_DATA;

    axis = 'horizontal';

    layout = 'top';
}
