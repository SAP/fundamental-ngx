import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { StepInputModule } from '@fundamental-ngx/core/step-input';

@Component({
    selector: 'fd-step-input-default-example',
    template: `
        <div class="step-input-example-container" [style.justify-content]="'space-between'">
            <div class="step-input-example">
                <label fd-form-label for="default-input">Default</label>
                <fd-step-input inputId="default-input" [(value)]="value1" [min]="1" [max]="2"></fd-step-input>
                <small>Value: {{ value1 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="compat-input">Compact</label>
                <fd-step-input inputId="compat-input" [(value)]="value2" fdCompact></fd-step-input>
                <small>Value: {{ value2 }}</small>
            </div>
        </div>
        <br />
        <div class="step-input-example-container" [style.justify-content]="'space-between'">
            <div class="step-input-example">
                <label fd-form-label for="full-width-input">Full Width</label>
                <fd-step-input inputId="full-width-input" [isFullWidth]="true" [(value)]="value3"></fd-step-input>
                <small>Value: {{ value3 }}</small>
            </div>

            <div class="step-input-example">
                <label fd-form-label for="input-wheel">Disabled wheel event</label>
                <fd-step-input disableWheel inputId="input-wheel" [(value)]="value4"></fd-step-input>
                <small>Value: {{ value4 }}</small>
            </div>
        </div>
    `,
    imports: [FormLabelComponent, StepInputModule, ContentDensityDirective]
})
export class StepInputDefaultExampleComponent {
    value1: number | null = 1;
    value2: number | null = 0;
    value3: number | null = 0;
    value4: number | null = 0;
}
