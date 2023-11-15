import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableListModule } from '@fundamental-ngx/cdk';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fd-segmented-button-toggle-example',
    templateUrl: './segmented-button-toggle-example.component.html',
    standalone: true,
    imports: [SegmentedButtonModule, FormsModule, ButtonComponent, FocusableListModule]
})
export class SegmentedButtonToggleExampleComponent {
    value: string[] = ['first'];
}
