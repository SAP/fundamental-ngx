import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-snap-scroll-example',
    templateUrl: './platform-dynamic-page-snap-scroll-example.component.html',
    styleUrls: ['./platform-dynamic-page-snap-scroll-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageSnapScrollExampleComponent {
    onCollapseChange(event: Event): any {
        console.log('collapse changed');
    }

    surveyClicked(event: Event): any {
        event.stopPropagation();
    }
}
