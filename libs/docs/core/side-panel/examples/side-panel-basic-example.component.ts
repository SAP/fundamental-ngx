import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SidePanelModule } from '@fundamental-ngx/core/side-panel';

@Component({
    selector: 'fd-side-panel-basic-example',
    templateUrl: './side-panel-basic-example.component.html',
    styleUrls: ['./side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SidePanelModule]
})
export class SidePanelBasicExampleComponent {
    activeItem = signal<string | null>(null);
}
