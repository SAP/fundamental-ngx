import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-footer',
    template: '<div style="position:relative; margin-top: 3rem"><ng-content></ng-content></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageFooterComponent {}
