import { ChangeDetectionStrategy, Component, Input, NgZone, ViewEncapsulation } from '@angular/core';
import { TimelinePositionControlService } from '../../services/timeline-position-control.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'fd-timeline-node-body',
    templateUrl: './timeline-node-body.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-timeline__post-content'
    }
})
export class TimelineNodeBodyComponent {
    /** Text content of timeline node*/
    @Input()
    content: string;

    /**
     * The number of lines to be visible.
     * If user doesn't provide it, all lines will be visible
     */
    @Input()
    maxLines: number;

    /** @hidden */
    constructor(private _ngZone: NgZone, private _timelinePositionControlService: TimelinePositionControlService) {}

    /** @hidden */
    calculatePositions(): void {
        this._ngZone.onStable.pipe(first()).subscribe(() => {
            this._timelinePositionControlService.calculatePositions();
        });
    }
}
