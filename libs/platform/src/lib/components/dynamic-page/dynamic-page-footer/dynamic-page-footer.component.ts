import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-footer',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageFooterComponent {}
