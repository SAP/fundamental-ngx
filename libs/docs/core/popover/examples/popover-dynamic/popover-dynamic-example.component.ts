import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import {
    PopoverBodyComponent,
    PopoverComponent,
    PopoverComponent as PopoverComponent_1,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-dynamic-example',
    templateUrl: './popover-dynamic-example.component.html',
    standalone: true,
    imports: [PopoverComponent_1, PopoverControlComponent, ButtonModule, PopoverBodyComponent, NgIf, AvatarModule]
})
export class PopoverDynamicExampleComponent {
    @ViewChild('popoverComponent')
    popoverComponent: PopoverComponent;

    showAvatar = false;

    constructor(private changeDetectionRef: ChangeDetectorRef) {}

    updatePopover(): void {
        this.showAvatar = true;
        this.popoverComponent.refreshPosition();
        this.changeDetectionRef.detectChanges();
    }
}
