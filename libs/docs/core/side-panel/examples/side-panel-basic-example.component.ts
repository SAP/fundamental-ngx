import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { SidePanelModule, SidePanelSide } from '@fundamental-ngx/core/side-panel';

@Component({
    selector: 'fd-side-panel-basic-example',
    templateUrl: './side-panel-basic-example.component.html',
    styleUrl: './side-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SidePanelModule, RadioButtonComponent, FormsModule]
})
export class SidePanelBasicExampleComponent {
    activeItem = model<string | null>(null);
    side = signal<SidePanelSide>('right');

    set sideValue(v: SidePanelSide) {
        this.side.set(v);
    }

    get sideValue(): SidePanelSide {
        return this.side();
    }
}
