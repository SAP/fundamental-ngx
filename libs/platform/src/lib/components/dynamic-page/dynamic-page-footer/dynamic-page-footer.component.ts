import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';

import { DYNAMIC_PAGE_CHILD_TOKEN } from '../constants';

@Component({
    selector: 'fdp-dynamic-page-footer',
    template: '<div style="position:relative"><ng-content></ng-content></div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DYNAMIC_PAGE_CHILD_TOKEN,
            useExisting: forwardRef(() => DynamicPageFooterComponent)
        }
    ]
})
export class DynamicPageFooterComponent {}
