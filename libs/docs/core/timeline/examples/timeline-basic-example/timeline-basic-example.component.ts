import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { TimelineModule } from '@fundamental-ngx/core/timeline';
import { TIMELINE_EXAMPLE_DATA } from './timeline-example-data';

@Component({
    selector: 'fd-timeline-basic-example',
    templateUrl: './timeline-basic-example.component.html',
    styleUrls: ['./timeline-basic-example.component.scss'],
    imports: [TimelineModule, AvatarComponent, ButtonComponent, ContentDensityDirective, DatePipe]
})
export class TimelineBasicExampleComponent {
    data = TIMELINE_EXAMPLE_DATA;

    trackBy(index: number, item: any): string {
        return item.title;
    }
}
