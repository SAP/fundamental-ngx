import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-timeline-node-body',
    templateUrl: './timeline-node-body.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'fd-timeline__post-content'
    }
})
export class TimelineNodeBodyComponent {

    /* Text content of timeline node*/
    @Input()
    content: string;

    /*
      The number of lines to be visible.
      If user doesn't provide it, all lines will be visible
    */
    @Input()
    maxLines: number;
}
