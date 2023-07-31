import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { ModuleDeprecation, ModuleDeprecations } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-deprecated-alerts',
    templateUrl: './deprecated-alerts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            fd-message-strip {
                margin-bottom: 0.5rem;
            }
        `
    ]
})
export class DeprecatedAlertsComponent {
    constructor(@Optional() @Inject(ModuleDeprecations) readonly moduleDeprecations: ModuleDeprecation[]) {}
}
