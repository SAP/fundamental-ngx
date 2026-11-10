import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SidePanelModule } from '@fundamental-ngx/core/side-panel';

@Component({
    selector: 'fd-side-panel-badges-example',
    templateUrl: './side-panel-badges-example.component.html',
    styleUrls: ['./side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SidePanelModule]
})
export class SidePanelBadgesExampleComponent {
    activeItem = signal<string | null>(null);
}
