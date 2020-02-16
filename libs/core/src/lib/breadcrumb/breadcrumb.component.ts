import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren, ElementRef, forwardRef,
    HostListener, Input, QueryList,
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

    /** @hidden */
    @ContentChildren(forwardRef(() => BreadcrumbItemDirective))
    breadcrumbItems: QueryList<BreadcrumbItemDirective>;

    /** @hidden */
    collapsedBreadcrumbItems: Array<BreadcrumbItemDirective> = [];

    /** @hidden */
    previousContainerWidth: number;

    /**
     * The element to act as the breadcrumb container. When provided, the breadcrumb's responsive collapsing behavior
     * performs better. When not provided, the immediate parent element's width will be used.
     */
    @Input()
    containerElement: HTMLElement;

    /**
     * TODO: investigate if this input is needed or if RTL should be inferred from browser language settings or parent dir="rtl"
     * This is used to position the popover body in RTL mode.
     * @hidden
     */
    @Input()
    rtl: boolean = false;

    /** @hidden */
    containerBoundary: number;

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        this.containerBoundary = this.elementRef.nativeElement.parentElement.getBoundingClientRect().width;
        if (this.containerElement) {
            this.containerBoundary = this.containerElement.getBoundingClientRect().width;
        }
        // if the screen is getting smaller
        if (this.containerBoundary < this.previousContainerWidth) {
            // and the breadcrumbs extend past the window
            if (this.elementRef.nativeElement.getBoundingClientRect().width > this.containerBoundary) {
                this.collapseBreadcrumbs();
            }
        } else if (this.collapsedBreadcrumbItems.length) { // if the screen is getting bigger and there are collapsed breadcrumbs
            this.expandBreadcrumbs();
        }
        this.previousContainerWidth = this.containerBoundary;
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
        while (this.elementRef.nativeElement.getBoundingClientRect().width > this.containerBoundary && i < this.breadcrumbItems.length) {
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
        while (this.elementRef.nativeElement.getBoundingClientRect().width < this.containerBoundary &&
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
            if (this.elementRef.nativeElement.getBoundingClientRect().width < this.containerBoundary) {
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

    /** @hidden */
    ngAfterContentInit(): void {
        this.previousContainerWidth = this.containerBoundary;
        this.onResize();
    }

    constructor(public elementRef: ElementRef) {}

}
