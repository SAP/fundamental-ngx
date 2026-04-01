import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    inject,
    Injector,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { TextComponent } from '@fundamental-ngx/core/text';
import { TimelinePositionControlService } from '../../services/timeline-position-control.service';

@Component({
    selector: 'fd-timeline-node-body',
    templateUrl: './timeline-node-body.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-timeline__post-content'
    },
    imports: [TextComponent]
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
    private readonly _injector = inject(Injector);

    /** @hidden */
    private readonly _timelinePositionControlService = inject(TimelinePositionControlService);

    /** @hidden */
    calculatePositions(): void {
        afterNextRender(
            () => {
                this._timelinePositionControlService.calculatePositions();
            },
            { injector: this._injector }
        );
    }
}
