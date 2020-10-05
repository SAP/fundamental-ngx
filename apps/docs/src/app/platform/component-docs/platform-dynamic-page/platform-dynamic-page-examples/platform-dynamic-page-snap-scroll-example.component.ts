import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DynamicPageCollapseChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-dynamic-page-snap-scroll-example',
    templateUrl: './platform-dynamic-page-snap-scroll-example.component.html',
    styleUrls: ['./platform-dynamic-page-snap-scroll-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageSnapScrollExampleComponent {
    onCollapseChange(event: DynamicPageCollapseChangeEvent): void {
        console.log('collapse changed');
    }

    surveyClicked(event: Event): void {
        event.stopPropagation();
    }
}
