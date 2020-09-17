import { Component } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-example',
    templateUrl: './platform-dynamic-page-example.component.html'
})
export class PlatformDynamicPageExampleComponent {
    onCollapseChange(event: Event): any {
        console.log('collapse changed');
    }

    surveyClicked(event: Event): any {
        event.stopPropagation();
    }
}
