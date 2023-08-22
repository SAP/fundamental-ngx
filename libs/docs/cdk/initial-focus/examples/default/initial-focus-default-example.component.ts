import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { NgIf } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';

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
    standalone: true,
    imports: [
        ButtonModule,
        NgIf,
        InitialFocusDirective,
        LinkComponent,
        RouterLink,
        FormItemModule,
        FormLabelModule,
        FormControlModule
    ]
})
export class InitialFocusDefaultExampleComponent {
    currentExample: string;

    showExample(example: string): void {
        this.currentExample = example;
    }
}
