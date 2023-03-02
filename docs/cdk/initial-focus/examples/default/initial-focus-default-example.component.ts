import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fdk-initial-focus-default-example',
    templateUrl: './initial-focus-default-example.component.html',
    styles: [
        `
            .fdk-initial-focus-control-buttons .fd-button {
                margin: 0.375rem;
            }

            .fdk-initial-focus-examples {
                margin: 0.375rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitialFocusDefaultExampleComponent {
    currentExample: string;

    showExample(example: string): void {
        this.currentExample = example;
    }
}
