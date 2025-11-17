import { Component, computed, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { ProgressIndicator } from '@fundamental-ngx/ui5-webcomponents/progress-indicator';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-basic-progress-indicator-sample',
    templateUrl: './basic-progress-indicator.html',
    standalone: true,
    imports: [ProgressIndicator, Button]
})
export class BasicProgressIndicatorExample {
    private readonly _progressValue = signal(0);

    readonly progressScenarios = signal([
        { label: 'Starting', value: 15, description: 'Initial progress' },
        { label: 'In Progress', value: 45, description: 'Work in progress' },
        { label: 'Almost Done', value: 75, description: 'Nearly complete' },
        { label: 'Complete', value: 100, description: 'Task finished' }
    ]);

    readonly currentProgress = computed(() => this._progressValue());

    setProgress(value: number): void {
        this._progressValue.set(Math.max(0, Math.min(100, value)));
    }

    increaseProgress(): void {
        const current = this._progressValue();
        this.setProgress(current + 10);
    }

    decreaseProgress(): void {
        const current = this._progressValue();
        this.setProgress(current - 10);
    }

    resetProgress(): void {
        this._progressValue.set(0);
    }
}
