import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeprecatedAlertsComponent } from '../deprecated-alerts/deprecated-alerts.component';

@Component({
    selector: 'fd-doc-page',
    templateUrl: './doc-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DeprecatedAlertsComponent, RouterOutlet]
})
export class DocPageComponent {
    constructor() {}
}
