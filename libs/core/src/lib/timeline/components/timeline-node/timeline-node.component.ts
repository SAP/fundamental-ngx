import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-timeline-node',
  templateUrl: './timeline-node.component.html',
  host: {
    'class': 'fd-timeline__node-wrapper'
  }
})
export class TimelineNodeComponent {

  /* Glyph of the current timeline node.*/
  @Input()
  glyph: string;

}
