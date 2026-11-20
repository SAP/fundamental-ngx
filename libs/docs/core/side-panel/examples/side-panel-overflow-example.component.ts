import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { SidePanelModule } from '@fundamental-ngx/core/side-panel';

@Component({
    selector: 'fd-side-panel-overflow-example',
    templateUrl: './side-panel-overflow-example.component.html',
    styleUrl: './side-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SidePanelModule]
})
export class SidePanelOverflowExampleComponent {
    activeItem = model<string | null>(null);
}
