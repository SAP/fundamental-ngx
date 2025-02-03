import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModuleDeprecation, ModuleDeprecations } from '@fundamental-ngx/cdk/utils';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';

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
    ],
    imports: [MessageStripComponent, LinkComponent, RouterLink]
})
export class DeprecatedAlertsComponent {
    constructor(@Optional() @Inject(ModuleDeprecations) readonly moduleDeprecations: ModuleDeprecation[]) {}
}
