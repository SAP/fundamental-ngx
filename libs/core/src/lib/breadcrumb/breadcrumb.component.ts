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

    previousWindowInnerWidth: number;

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        // if the screen is getting smaller
        if (window.innerWidth <= this.previousWindowInnerWidth) {
            // and the breadcrumbs extend past the window
            if (this.elementRef.nativeElement.getBoundingClientRect().right >= window.innerWidth) {
                let i = 0;
                // move the breadcrumb items into a collapsed menu one by one, until the last one is inside the window
                while (this.elementRef.nativeElement.getBoundingClientRect().right >= window.innerWidth) {
                    const breadcrumbItem = this.breadcrumbItems.filter((item, index) => index === i)[0];
                    if (this.collapsedBreadcrumbItems.indexOf(breadcrumbItem) === -1) {
                        this.collapsedBreadcrumbItems.push(breadcrumbItem);
                    }
                    // hide the breadcrumbs moved in to the collapsed menu
                    breadcrumbItem.elementRef.nativeElement.style.display = 'none';
                    i++;
                }
            }
        } else if (this.collapsedBreadcrumbItems.length) { // if the screen is getting bigger
            const collapsedItemToPop = this.collapsedBreadcrumbItems[this.collapsedBreadcrumbItems.length - 1];
            const breadcrumbOfConcern = this.breadcrumbItems.filter((item) => item === collapsedItemToPop)[0];
            breadcrumbOfConcern.elementRef.nativeElement.style.display = 'inline-block';
            breadcrumbOfConcern.elementRef.nativeElement.style.visibility = 'hidden';
            if (this.collapsedBreadcrumbItems.length) {
                if (this.elementRef.nativeElement.getBoundingClientRect().right < window.innerWidth) {
                    this.collapsedBreadcrumbItems.pop();
                    breadcrumbOfConcern.elementRef.nativeElement.style.visibility = 'visible';
                } else {
                    breadcrumbOfConcern.elementRef.nativeElement.style.display = 'none';
                }
            }
        }
        this.previousWindowInnerWidth = window.innerWidth;
    }

    ngAfterContentInit(): void {
        this.previousWindowInnerWidth = window.innerWidth;
        this.onResize();
    }

    constructor(public elementRef: ElementRef) {}

}
