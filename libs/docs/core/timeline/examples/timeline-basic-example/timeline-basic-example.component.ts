import { Component } from '@angular/core';
import { TIMELINE_EXAMPLE_DATA } from './timeline-example-data';

@Component({
    selector: 'fd-timeline-basic-example',
    templateUrl: './timeline-basic-example.component.html',
    styleUrls: ['./timeline-basic-example.component.scss']
})
export class TimelineBasicExampleComponent {
    data = TIMELINE_EXAMPLE_DATA;

    trackBy(index: number, item: any): string {
        return item.title;
    }
}
