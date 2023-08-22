import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormsModule } from '@angular/forms';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-segmented-button-default-example',
    templateUrl: './segmented-button-default-example.component.html',
    standalone: true,
    imports: [TextComponent, SegmentedButtonModule, FormsModule, ButtonModule]
})
export class SegmentedButtonDefaultExampleComponent {
    value = 'first';
}
