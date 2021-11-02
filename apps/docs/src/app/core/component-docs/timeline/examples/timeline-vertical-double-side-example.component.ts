import { Component } from '@angular/core';
import { TIMELINE_EXAMPLE_DATA } from './timeline-basic-example/timeline-example-data';

@Component({
    selector: 'fd-timeline-vertical-double-side',
    templateUrl: './timeline-template-example.component.html'
})
export class TimelineVerticalDoubleSideExampleComponent {
    data = TIMELINE_EXAMPLE_DATA;

    axis = 'vertical';

    layout = 'double';
}
