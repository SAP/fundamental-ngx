import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-segmented-button-default-example',
    templateUrl: './segmented-button-default-example.component.html',
    imports: [TextComponent, SegmentedButtonModule, FormsModule, ButtonComponent, FocusableItemDirective]
})
export class SegmentedButtonDefaultExampleComponent {
    value = 'first';
}
