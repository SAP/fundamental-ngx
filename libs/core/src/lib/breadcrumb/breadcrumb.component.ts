import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren, ElementRef, forwardRef,
    HostListener, QueryList,
    ViewEncapsulation
} from '@angular/core';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';

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
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements AfterContentInit {

    @ContentChildren(forwardRef(() => BreadcrumbItemDirective))
    breadcrumbItems: QueryList<BreadcrumbItemDirective>;

    collapsedBreadcrumbItems: Array = [];

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        let i = 0;
        while (this.elementRef.nativeElement.offsetWidth >= window.innerWidth) {
            const breadcrumbItem = this.breadcrumbItems.filter((item, index) => index === i)[0];
            this.collapsedBreadcrumbItems.push({
                text: breadcrumbItem.elementRef.nativeElement.innerText
            });
            breadcrumbItem.elementRef.nativeElement.style.display = 'none';
            i++;
        }
    }

    ngAfterContentInit(): void {
        this.onResize();
    }

    constructor(public elementRef: ElementRef) {}

}
