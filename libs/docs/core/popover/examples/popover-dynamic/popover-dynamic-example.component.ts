import { Component, signal, viewChild } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-dynamic-example',
    templateUrl: './popover-dynamic-example.component.html',
    imports: [PopoverComponent, PopoverControlComponent, ButtonComponent, PopoverBodyComponent, AvatarComponent]
})
export class PopoverDynamicExampleComponent {
    readonly popoverComponent = viewChild<PopoverComponent>('popoverComponent');

    showAvatar = signal(false);

    updatePopover(): void {
        this.showAvatar.set(true);
        this.popoverComponent()?.refreshPosition();
    }
}
