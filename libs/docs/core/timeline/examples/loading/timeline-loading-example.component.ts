import { Component } from '@angular/core';
import { TimelineModule } from '@fundamental-ngx/core/timeline';

@Component({
    selector: 'fd-timeline-loading-example',
    templateUrl: './timeline-loading-example.component.html',
    standalone: true,
    imports: [TimelineModule]
})
export class TimelineLoadingExampleComponent {}
