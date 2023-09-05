import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fd-segmented-button-toggle-example',
    templateUrl: './segmented-button-toggle-example.component.html',
    standalone: true,
    imports: [SegmentedButtonModule, FormsModule, ButtonModule]
})
export class SegmentedButtonToggleExampleComponent {
    value: string[] = ['first'];
}
