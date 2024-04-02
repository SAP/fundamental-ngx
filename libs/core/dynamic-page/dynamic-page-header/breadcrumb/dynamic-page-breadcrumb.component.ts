import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FD_DYNAMIC_PAGE_BREADCRUMB_COMPONENT } from '../../tokens';

@Component({
    selector: 'fd-dynamic-page-breadcrumb',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: FD_DYNAMIC_PAGE_BREADCRUMB_COMPONENT,
            useExisting: DynamicPageBreadcrumbComponent
        }
    ],
    standalone: true
})
export class DynamicPageBreadcrumbComponent {}
