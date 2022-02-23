import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-initial-focus-basic-example',
    templateUrl: './initial-focus-basic-example.component.html',
    styleUrls: ['./initial-focus-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitialFocusBasicExampleComponent {
    currentExample: string;

    showExample(example: string): void {
        this.currentExample = example;
    }
}
