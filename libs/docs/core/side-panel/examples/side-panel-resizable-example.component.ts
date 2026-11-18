import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { SidePanelModule, SidePanelSide } from '@fundamental-ngx/core/side-panel';

@Component({
    selector: 'fd-side-panel-resizable-example',
    templateUrl: './side-panel-resizable-example.component.html',
    styleUrls: ['./side-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SidePanelModule, ButtonComponent, RadioButtonComponent, FormsModule]
})
export class SidePanelResizableExampleComponent {
    activeItem = signal<string | null>(null);
    open = signal(false);
    side = signal<SidePanelSide>('right');

    set sideValue(v: SidePanelSide) {
        this.side.set(v);
    }

    get sideValue(): SidePanelSide {
        return this.side();
    }
}
