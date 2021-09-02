import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-timeline-node',
    templateUrl: './timeline-node.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'fd-timeline__node-wrapper'
    }
})
export class TimelineNodeComponent {

    /* Glyph of the current timeline node.*/
    @Input()
    glyph: string;

    /* Aria label value for internalization.*/
    @Input()
    ariaLabel = 'timelineitem';
}
