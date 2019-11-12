import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Breadcrumb parent wrapper directive. Must have breadcrumb item child directives.
 *
 * ```html
 * <fd-breadcrumb>
 *     <fd-breadcrumb-item>
 *         <a fd-breadcrumb-link [routerLink]="'#'">Breadcrumb Link</a>
 *     </fd-breadcrumb-item>
 * </fd-breadcrumb>
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:directive-component
    selector: 'fd-breadcrumb',
    host: {
        class: 'fd-breadcrumb'
    },
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
}
