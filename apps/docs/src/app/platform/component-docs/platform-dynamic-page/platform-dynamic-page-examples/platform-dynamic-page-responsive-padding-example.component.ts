import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DynamicPageCollapseChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-dynamic-page-responsive-padding-example',
    templateUrl: './platform-dynamic-page-responsive-padding-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageResponsivePaddingExampleComponent {
    onCollapseChange(event: DynamicPageCollapseChangeEvent): void {
        console.log('collapse changed');
    }

    surveyClicked(event: Event): void {
        event.stopPropagation();
    }
}
