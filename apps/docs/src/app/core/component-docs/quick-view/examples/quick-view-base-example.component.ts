import { Component } from '@angular/core';
import { DATA } from '../quick-view-docs.component';

@Component({
    selector: 'fd-quick-view-base-example',
    templateUrl: './quick-view-base-example.component.html'
})
export class QuickViewBaseExampleComponent {
    data = DATA;
}
