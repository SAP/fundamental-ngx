import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SidePanelModule } from '@fundamental-ngx/core/side-panel';

@Component({
    selector: 'fd-side-panel-resizable-example',
    templateUrl: './side-panel-resizable-example.component.html',
    styleUrls: ['./side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SidePanelModule, ButtonComponent]
})
export class SidePanelResizableExampleComponent {
    activeItem = signal<string | null>(null);
    open = signal(false);
}
