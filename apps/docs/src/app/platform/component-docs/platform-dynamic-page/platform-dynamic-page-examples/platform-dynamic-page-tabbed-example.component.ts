import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-tabbed-example',
    templateUrl: './platform-dynamic-page-tabbed-example.component.html',
    styleUrls: ['./platform-dynamic-page-tabbed-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageTabbedExampleComponent {
    onCollapseChange(event: Event): any {
        console.log('collapse changed');
    }
}
