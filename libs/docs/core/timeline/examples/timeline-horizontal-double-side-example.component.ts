import { CdkScrollable } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TimelineAxis, TimelineModule, TimelineSidePosition } from '@fundamental-ngx/core/timeline';
import { TIMELINE_EXAMPLE_DATA } from './timeline-basic-example/timeline-example-data';

@Component({
    selector: 'fd-timeline-horizontal-double-side',
    templateUrl: './timeline-template-example.component.html',
    standalone: true,
    imports: [
        CdkScrollable,
        ScrollbarDirective,
        TimelineModule,
        AvatarComponent,
        ButtonComponent,
        ContentDensityDirective,
        DatePipe
    ]
})
export class TimelineHorizontalDoubleSideExampleComponent {
    data = TIMELINE_EXAMPLE_DATA;

    axis: TimelineAxis = 'horizontal';

    layout: TimelineSidePosition = 'double';
}
