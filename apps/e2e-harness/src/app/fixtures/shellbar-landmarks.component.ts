import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ShellbarActionComponent, ShellbarActionsComponent, ShellbarComponent } from '@fundamental-ngx/core/shellbar';

@Component({
    selector: 'e2e-shellbar-landmarks',
    templateUrl: './shellbar-landmarks.component.html',
    imports: [ButtonComponent, ShellbarActionComponent, ShellbarActionsComponent, ShellbarComponent]
})
export class ShellbarLandmarksComponent {
    readonly wrapper = signal(false);
}
