import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SidePanelModule } from '@fundamental-ngx/core/side-panel';

@Component({
    selector: 'fd-side-panel-single-action-example',
    templateUrl: './side-panel-single-action-example.component.html',
    styleUrls: ['./side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SidePanelModule]
})
export class SidePanelSingleActionExampleComponent {
    open = signal(false);
}
