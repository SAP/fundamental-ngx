import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { SidePanelModule, SidePanelSide } from '@fundamental-ngx/core/side-panel';

@Component({
    selector: 'fd-side-panel-basic-example',
    templateUrl: './side-panel-basic-example.component.html',
    styleUrls: ['./side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SidePanelModule, RadioButtonComponent, FormsModule]
})
export class SidePanelBasicExampleComponent {
    activeItem = signal<string | null>(null);
    side = signal<SidePanelSide>('right');
}
