import { Component } from '@angular/core';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NgIf } from '@angular/common';
import { PopoverContainerDirective } from '@fundamental-ngx/core/popover';

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
    standalone: true,
    imports: [
        PopoverContainerDirective,
        NgIf,
        ButtonModule,
        PopoverComponent,
        PopoverControlComponent,
        AvatarModule,
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
