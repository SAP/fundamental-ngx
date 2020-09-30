import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-responsive-padding-example',
    templateUrl: './platform-dynamic-page-responsive-padding-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageResponsivePaddingExampleComponent {
    onCollapseChange(event: Event): any {
        console.log('collapse changed');
    }

    surveyClicked(event: Event): any {
        event.stopPropagation();
    }
}
