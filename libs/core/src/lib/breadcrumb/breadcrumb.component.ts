import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { RtlService } from '@fundamental-ngx/core/utils';
import { BehaviorSubject, Subscription } from 'rxjs';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { MenuComponent } from '@fundamental-ngx/core/menu';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Placement } from '@fundamental-ngx/core/shared';
import { ContentDensityService } from '@fundamental-ngx/core/utils';

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
    // eslint-disable-next-line
    selector: 'fd-breadcrumb',
    host: {
        class: 'fd-breadcrumb'
    },
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements AfterContentInit, OnInit, OnDestroy {
    /** Whenever links wrapped inside overflow should be displayed in compact mode  */
    @Input()
    compact?: boolean;

    /** @hidden */
    @ContentChildren(forwardRef(() => BreadcrumbItemDirective))
    breadcrumbItems: QueryList<BreadcrumbItemDirective>;

    /** @hidden */
    @ViewChild(MenuComponent)
    menuComponent: MenuComponent;

    /** @hidden */
    collapsedBreadcrumbItems: Array<BreadcrumbItemDirective> = [];

    /** @hidden used to compare to the current width to know whether to collapse or expand breadcrumbs */
    previousContainerWidth: number;

    /** @hidden */
    placement$ = new BehaviorSubject<Placement>('bottom-start');

    /**
     * The element to act as the breadcrumb container. When provided, the breadcrumb's responsive collapsing behavior
     * performs better. When not provided, the immediate parent element's width will be used.
     */
    @Input()
    containerElement: HTMLElement;

    /** Whether or not to append items to the overflow dropdown in reverse order. Default is true. */
    @Input()
    reverse = false;

    /** @hidden */
    containerBoundary: number;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(
        public elementRef: ElementRef,
        @Optional() private _rtlService: RtlService,
        @Optional() private _contentDensityService: ContentDensityService,
        private _cdRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this.onResize();
    }

    /** @hidden */
    ngOnInit(): void {
        if (this._rtlService) {
            this._subscriptions.add(
                this._rtlService.rtl.subscribe((value) => this.placement$.next(value ? 'bottom-end' : 'bottom-start'))
            );
        }
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this._cdRef.markForCheck();
                })
            );
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    @HostListener('window:resize', [])
    onResize(): void {
        if (!this.elementRef.nativeElement.parentElement) {
            return;
        }
        this.containerBoundary = this.elementRef.nativeElement.parentElement.getBoundingClientRect().width;
        if (this.containerElement) {
            this.containerBoundary = this.containerElement.getBoundingClientRect().width;
        }
        /*
            if this is the first load and there is no previousContainerWidth,
            or the container boundary is smaller than the previousContainerWidth
         */
        if (!this.previousContainerWidth || this.containerBoundary < this.previousContainerWidth) {
            // and the breadcrumbs extend past the window
            if (this.elementRef.nativeElement.getBoundingClientRect().width > this.containerBoundary) {
                this.collapseBreadcrumbs();
            }
        } else if (this.collapsedBreadcrumbItems.length) {
            // if the screen is getting bigger and there are collapsed breadcrumbs
            this.expandBreadcrumbs();
        }
        this.previousContainerWidth = this.containerBoundary;
        this._cdRef.detectChanges();
    }

    /** @hidden */
    keyDownHandle(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.menuComponent.toggle();
            event.preventDefault();
        }
    }

    /** @hidden */
    getContainerBoundary(): number {
        let containerBoundary = this.elementRef.nativeElement.parentElement.getBoundingClientRect().width;
        if (this.containerElement) {
            containerBoundary = this.containerElement.getBoundingClientRect().width;
        }

        return containerBoundary;
    }

    /**
     * @hidden
     *
     * This function moves breadcrumbs from the original QueryList of BreadCrumbItemDirectives into the array of
     * collapsedBreadcrumbItems.
     * */
    collapseBreadcrumbs(): void {
        let i = 0;
        const containerBoundary = this.getContainerBoundary();
        // move the breadcrumb items into a collapsed menu one by one, until the last one is inside the window
        while (
            this.elementRef.nativeElement.getBoundingClientRect().width > containerBoundary &&
            i < this.breadcrumbItems.length
        ) {
            const breadcrumbItem = this.breadcrumbItems.filter((item, index) => index === i)[0];
            if (this.collapsedBreadcrumbItems.indexOf(breadcrumbItem) === -1) {
                this.reverse
                    ? this.collapsedBreadcrumbItems.push(breadcrumbItem)
                    : this.collapsedBreadcrumbItems.unshift(breadcrumbItem);
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
        while (this.fitInBoundries() && !breakLoop && i < originalCollapsedLength) {
            // get the most recently collapsed breadcrumb
            const collapsedItemToPop = this.getCollapsedItem();
            // find the corresponding breadcrumb from the original breadcrumb item QueryList
            const breadcrumbToCheck = this.getBreadcrumbToCheck(collapsedItemToPop);
            /*
              set display: 'inline-block' and visibility: 'hidden' - this way, the parent breadcrumb component's width will
              contain the width of the breadcrumb item we might pop, without actually making the item visible to the user
             */
            this.applyStylesToBreadcrumb(breadcrumbToCheck);

            if (this.fitInBoundries()) {
                /*
                  if the width of the breadcrumb component is still smaller than the window width, including the
                  breadcrumbToCheck, pop the latest collapsedBreadcrumbItem
                */
                this.popLastElement();
                this.makeBreadcrumbVisible(breadcrumbToCheck);
            } else {
                /*
                  if the width of the breadcrumb component is wider than the window after making the breadcrumbToCheck's
                  display: 'inline-block', then put it's display back to 'none' and don't pop the collapsedBreadcrumbItem
                 */
                this.makeBreadcrumbInvisible(breadcrumbToCheck);
                breakLoop = true;
            }
            i++;
        }
    }

    private fitInBoundries(): boolean {
        return this.elementRef.nativeElement.getBoundingClientRect().width < this.getContainerBoundary();
    }

    private getCollapsedItem(): BreadcrumbItemDirective {
        return this.collapsedBreadcrumbItems[this.collapsedBreadcrumbItems.length - 1];
    }

    private getBreadcrumbToCheck(collapsedItemToPop: BreadcrumbItemDirective): BreadcrumbItemDirective {
        return this.breadcrumbItems.filter((item) => item === collapsedItemToPop)[0];
    }

    private applyStylesToBreadcrumb(breadcrumb: BreadcrumbItemDirective): void {
        breadcrumb.elementRef.nativeElement.style.display = 'inline-block';
        breadcrumb.elementRef.nativeElement.style.visibility = 'hidden';
    }

    private popLastElement(): void {
        this.collapsedBreadcrumbItems.pop();
        // make the breadcrumb we checked visible
    }

    private makeBreadcrumbVisible(breadcrumb: BreadcrumbItemDirective): void {
        breadcrumb.elementRef.nativeElement.style.visibility = 'visible';
    }

    private makeBreadcrumbInvisible(breadcrumb: BreadcrumbItemDirective): void {
        breadcrumb.elementRef.nativeElement.style.display = 'none';
    }
}
