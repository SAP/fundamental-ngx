import { Component } from '@angular/core';
import { ProgressIndicatorModule } from '@fundamental-ngx/core/progress-indicator';

@Component({
    selector: 'fd-progress-indicator-truncation',
    templateUrl: './progress-indicator-truncation.component.html',
    standalone: true,
    imports: [ProgressIndicatorModule]
})
export class ProgressIndicatorTruncationComponent {}
