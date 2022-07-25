import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-progress-bar-header',
    templateUrl: './progress-bar-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarHeaderComponent {}
