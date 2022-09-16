import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fn-progress-bar-default-example',
    templateUrl: './progress-bar-default-example.component.html',
    styles: [
        `
            .fn-progress-bar-example {
                margin: 0 2rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarDefaultExampleComponent {}
