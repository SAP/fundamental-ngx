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

    collapsedBreadcrumbItems: Array<BreadcrumbItemDirective> = [];

    previousWindowInnerWidth: number;

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        // if the screen is getting smaller
        if (window.innerWidth <= this.previousWindowInnerWidth) {
            // and the breadcrumbs extend past the window
            if (this.elementRef.nativeElement.getBoundingClientRect().right >= window.innerWidth) {
                this.collapseBreadcrumbs();
            }
        } else if (this.collapsedBreadcrumbItems.length) { // if the screen is getting bigger and there are collapsed breadcrumbs
            this.expandBreadcrumbs();
        }
        this.previousWindowInnerWidth = window.innerWidth;
    }

    /**
     * @hidden
     *
     * This function moves breadcrumbs from the original QueryList of BreadCrumbItemDirectives into the array of
     * collapsedBreadcrumbItems.
     * */
    collapseBreadcrumbs(): void {
        let i = 0;
        // move the breadcrumb items into a collapsed menu one by one, until the last one is inside the window
        while (this.elementRef.nativeElement.getBoundingClientRect().right >= window.innerWidth) {
            const breadcrumbItem = this.breadcrumbItems.filter((item, index) => index === i)[0];
            if (this.collapsedBreadcrumbItems.indexOf(breadcrumbItem) === -1) {
                this.collapsedBreadcrumbItems.push(breadcrumbItem);
            }
            // hide the original breadcrumb items that have been moved in to the collapsed menu
            breadcrumbItem.elementRef.nativeElement.style.display = 'none';
            i++;
        }
    }

    /**
     * @hidden
     *
     * This function removes breadcrumb items from the collapsedBreadcrumbItems array and makes them visible again in the
     * original QueryList of BreadcrumbItemDirectives.
     * */
    expandBreadcrumbs(): void {
        let breakLoop = false;
        let i = 0;
        const originalCollapsedLength = this.collapsedBreadcrumbItems.length;
        while (this.elementRef.nativeElement.getBoundingClientRect().right < window.innerWidth &&
                !breakLoop && i < originalCollapsedLength) {
            // get the most recently collapsed breadcrumb
            const collapsedItemToPop = this.collapsedBreadcrumbItems[this.collapsedBreadcrumbItems.length - 1];
            // find the corresponding breadcrumb from the original breadcrumb item QueryList
            const breadcrumbToCheck = this.breadcrumbItems.filter((item) => item === collapsedItemToPop)[0];
            /*
              set display: 'inline-block' and visibility: 'hidden' - this way, the parent breadcrumb component's width will
              contain the width of the breadcrumb item we might pop, without actually making the item visible to the user
             */
            breadcrumbToCheck.elementRef.nativeElement.style.display = 'inline-block';
            breadcrumbToCheck.elementRef.nativeElement.style.visibility = 'hidden';
            if (this.elementRef.nativeElement.getBoundingClientRect().right < window.innerWidth) {
                /*
                  if the width of the breadcrumb component is still smaller than the window width, including the
                  breadcrumbToCheck, pop the latest collapsedBreadcrumbItem
                */
                this.collapsedBreadcrumbItems.pop();
                // make the breadcrumb we checked visible
                breadcrumbToCheck.elementRef.nativeElement.style.visibility = 'visible';
            } else {
                /*
                  if the width of the breadcrumb component is wider than the window after making the breadcrumbToCheck's
                  display: 'inline-block', then put it's display back to 'none' and don't pop the collapsedBreadcrumbItem
                 */
                breadcrumbToCheck.elementRef.nativeElement.style.display = 'none';
                breakLoop = true;
            }
            i++;
        }
    }

    ngAfterContentInit(): void {
        this.previousWindowInnerWidth = window.innerWidth;
        this.onResize();
    }

    constructor(public elementRef: ElementRef) {}

}
