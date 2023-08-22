import { Component } from '@angular/core';
import { TIMELINE_EXAMPLE_DATA } from './timeline-basic-example/timeline-example-data';
import { TimelineAxis, TimelineSidePosition } from '@fundamental-ngx/core/timeline';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NgIf, DatePipe } from '@angular/common';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { TimelineModule } from '@fundamental-ngx/core/timeline';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';

@Component({
    selector: 'fd-timeline-horizontal-axis',
    templateUrl: './timeline-template-example.component.html',
    standalone: true,
    imports: [
        CdkScrollable,
        ScrollbarDirective,
        TimelineModule,
        AvatarModule,
        NgIf,
        ButtonModule,
        ContentDensityDirective,
        DatePipe
    ]
})
export class TimelineHorizontalAxisExampleComponent {
    data = TIMELINE_EXAMPLE_DATA;

    axis: TimelineAxis = 'horizontal';

    layout: TimelineSidePosition = 'top';
}
