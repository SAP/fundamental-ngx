import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DynamicPageCollapseChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-dynamic-page-example',
    templateUrl: './platform-dynamic-page-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageExampleComponent {
    onCollapseChange(event: DynamicPageCollapseChangeEvent): void {
        console.log('collapse changed');
    }

    surveyClicked(event: Event): void {
        event.stopPropagation();
    }
}
