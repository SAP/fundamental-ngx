import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LineClampDirective, LineClampTargetDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { StepInputComponent } from '@fundamental-ngx/core/step-input';

@Component({
    selector: 'fdk-line-clamp-default-example',
    templateUrl: './line-clamp-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        LineClampDirective,
        LineClampTargetDirective,
        ButtonComponent,
        FormLabelComponent,
        FormsModule,
        StepInputComponent
    ]
})
export class LineClampDefaultExampleComponent {
    lineClampEnabled = signal(true);
    lineCount = signal(3);
    actualLineCount = signal<number | null>(null);

    sampleText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    toggleClamp(): void {
        this.lineClampEnabled.update((v) => !v);
    }

    onLineCountUpdate(count: number): void {
        this.actualLineCount.set(count);
    }

    updateLineCount(value: number | null): void {
        this.lineCount.set(value ?? 0);
    }
}
