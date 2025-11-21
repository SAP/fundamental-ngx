import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { ToggleButton } from '@fundamental-ngx/ui5-webcomponents/toggle-button';

@Component({
    selector: 'ui5-toggle-button-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [ToggleButton, Label]
})
export class ToggleButtonBasicSample {
    readonly isPressed = signal(false);

    onToggleClick(): void {
        this.isPressed.update(() => !this.isPressed());
    }
}
