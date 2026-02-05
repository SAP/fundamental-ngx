import { Component, computed, inject } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { Placement } from '@fundamental-ngx/core/shared';

@Component({
    selector: 'fd-inline-help-example',
    templateUrl: './inline-help-example.component.html',
    styles: [
        `
            .fd-inline-help-example > input {
                max-width: 300px;
            }

            .fd-inline-help-example {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `
    ],
    imports: [IconComponent, InlineHelpModule, FormControlComponent]
})
export class InlineHelpExampleComponent {
    protected readonly rtlDirection = computed<Placement>(() => (this._rtlService?.rtl() ? 'left' : 'right'));

    private readonly _rtlService = inject(RtlService, { optional: true });
}
