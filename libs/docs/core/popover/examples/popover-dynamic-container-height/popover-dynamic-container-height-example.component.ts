import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    PopoverBodyComponent,
    PopoverComponent,
    PopoverContainerDirective,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-dynamic-container-height-example',
    templateUrl: './popover-dynamic-container-height-example.component.html',
    styles: [
        `
            .fd-docs-flex-display-helper {
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex-flow: row wrap;
                width: 100%;
            }
        `
    ],
    imports: [
        PopoverContainerDirective,
        ButtonComponent,
        PopoverComponent,
        PopoverControlComponent,
        AvatarComponent,
        PopoverBodyComponent
    ]
})
export class PopoverDynamicContainerHeightExampleComponent {
    showOverflowContainer = false;

    overflowContainerTimeout: any;

    resetOverflowContainer(): void {
        clearTimeout(this.overflowContainerTimeout);
        this.showOverflowContainer = false;
        this.overflowContainerTimeout = setTimeout(() => {
            this.showOverflowContainer = true;
        }, 2000);
    }
}
