import { Component } from '@angular/core';

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
    `
})
export class PopoverLazyInitOfBodyExampleComponent {}
