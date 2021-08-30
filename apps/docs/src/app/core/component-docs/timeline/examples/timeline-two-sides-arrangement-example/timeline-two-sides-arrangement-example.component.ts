import { Component } from '@angular/core';
import { TIMELINE_EXAMPLE_DATA } from '../timeline-basic-example/timeline-example-data';

@Component({
  selector: 'fd-timeline-two-sides-arrangement-example',
  templateUrl: './timeline-two-sides-arrangement-example.component.html',
  styleUrls: ['./timeline-two-sides-arrangement-example.component.scss']
})
export class TimelineTwoSidesArrangementExampleComponent {

  data = TIMELINE_EXAMPLE_DATA;

}
