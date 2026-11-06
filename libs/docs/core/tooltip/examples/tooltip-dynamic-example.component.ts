import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { TooltipDirective } from '@fundamental-ngx/core/tooltip';

@Component({
    selector: 'fd-tooltip-dynamic-example',
    templateUrl: './tooltip-dynamic-example.component.html',
    styles: [
        `
            .fd-tooltip-dynamic-example {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                gap: 1rem;
            }

            .fd-tooltip-dynamic-example input {
                max-width: 18rem;
            }
        `
    ],
    imports: [ButtonComponent, FormControlComponent, TooltipDirective]
})
export class TooltipDynamicExampleComponent {
    protected readonly text = signal('Refresh - Reloads the list');
    protected readonly disabled = signal(false);

    protected onTextInput(event: Event): void {
        this.text.set((event.target as HTMLInputElement).value);
    }
}
