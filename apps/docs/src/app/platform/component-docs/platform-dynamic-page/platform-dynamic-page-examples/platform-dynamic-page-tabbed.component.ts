import { Component } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-tabbed',
    templateUrl: './platform-dynamic-page-tabbed.component.html',
    styleUrls: ['./platform-dynamic-page-tabbed.component.scss']
})
export class PlatformDynamicPageTabbedComponent {
    onCollapseChange(event: Event): any {
        console.log('collapse changed');
    }
}
