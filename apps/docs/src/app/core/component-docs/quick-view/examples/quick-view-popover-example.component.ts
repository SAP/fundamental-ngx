import { Component } from '@angular/core';
import { DATA } from '../quick-view-docs.component';

@Component({
    selector: 'fd-quick-view-popover-example',
    templateUrl: './quick-view-popover-example.component.html'
})
export class QuickViewPopoverExampleComponent {
    data = DATA;
}
