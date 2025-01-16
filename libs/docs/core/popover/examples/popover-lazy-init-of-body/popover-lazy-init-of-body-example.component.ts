import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    PopoverBodyDirective,
    PopoverBodyFooterDirective,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import { PopoverLazyLoadedBodyComponent } from './popover-lazy-loaded-body.component';

@Component({
    selector: 'fd-popover-lazy-init-of-body-example',
    template: `
        <fd-popover>
            <fd-popover-control>
                <button fd-button>Open a popover</button>
            </fd-popover-control>
            <ng-template fdPopoverBody>
                <h4 fd-popover-body-header>Header</h4>
                <fd-popover-lazy-loaded-body />
                <div fd-popover-body-footer>Footer</div>
            </ng-template>
        </fd-popover>
    `,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyDirective,
        PopoverBodyHeaderDirective,
        PopoverBodyFooterDirective,
        ButtonComponent,
        PopoverLazyLoadedBodyComponent
    ]
})
export class PopoverLazyInitOfBodyExampleComponent {}
