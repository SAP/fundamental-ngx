import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { TimelineModule } from '@fundamental-ngx/core/timeline';
import { TIMELINE_EXAMPLE_DATA } from './timeline-example-data';

@Component({
    selector: 'fd-timeline-basic-example',
    templateUrl: './timeline-basic-example.component.html',
    styleUrls: ['./timeline-basic-example.component.scss'],
    standalone: true,
    imports: [TimelineModule, AvatarModule, ButtonModule, ContentDensityDirective, DatePipe]
})
export class TimelineBasicExampleComponent {
    data = TIMELINE_EXAMPLE_DATA;

    trackBy(index: number, item: any): string {
        return item.title;
    }
}
