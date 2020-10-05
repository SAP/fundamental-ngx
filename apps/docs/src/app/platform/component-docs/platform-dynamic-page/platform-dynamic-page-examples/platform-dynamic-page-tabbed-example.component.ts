import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DynamicPageCollapseChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-dynamic-page-tabbed-example',
    templateUrl: './platform-dynamic-page-tabbed-example.component.html',
    styleUrls: ['./platform-dynamic-page-tabbed-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageTabbedExampleComponent {
    onCollapseChange(event: DynamicPageCollapseChangeEvent): void {
        console.log('collapse changed');
    }
}
