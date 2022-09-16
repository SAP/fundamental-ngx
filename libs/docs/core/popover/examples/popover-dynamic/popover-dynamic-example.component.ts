import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-dynamic-example',
    templateUrl: './popover-dynamic-example.component.html'
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
