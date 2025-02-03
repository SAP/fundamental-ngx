import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { LinkComponent } from '@fundamental-ngx/core/link';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        InitialFocusDirective,
        LinkComponent,
        RouterLink,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent
    ]
})
export class InitialFocusDefaultExampleComponent {
    currentExample: string;

    showExample(example: string): void {
        this.currentExample = example;
    }
}
