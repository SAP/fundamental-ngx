import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BreadcrumbItemComponent } from '../breadcrumb-item.component';
import { DomPortal } from '@angular/cdk/portal';

@Component({
    selector: 'fd-breadcrumb-hidden-item',
    templateUrl: './breadcrumb-hidden-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbHiddenItemComponent implements AfterViewInit {
    /** Breadcrumb item ref, which is hidden from user and needs to be transformed into menu item */
    @Input()
    breadcrumbItem: BreadcrumbItemComponent;

    /** In case there is no link in Item and breadcrumb item is non-interactive, we move whole item content to menu item title */
    breadcrumbItemPortal: DomPortal<Element>;

    /** When breadcrumb item has link in it, we are moving link content to menu item title */
    linkContentPortal: DomPortal;

    constructor(private _cdr: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.breadcrumbItem.breadcrumbLink) {
            this.linkContentPortal = new DomPortal<HTMLElement>(
                this.breadcrumbItem.breadcrumbLink.contentSpan.nativeElement
            );
        }
        this.breadcrumbItemPortal = new DomPortal(
            this.breadcrumbItem.elementRef.nativeElement.firstElementChild as Element
        );
        this._cdr.detectChanges();
    }

    /**
     * We catch interactions with item, Enter, Space, Mouse click and Touch click,
     * if original element had router link we are proxying click to that element
     * */
    itemClicked($event: any): void {
        if (this.breadcrumbItem.needsClickProxy) {
            $event.preventDefault();
            this.breadcrumbItem.breadcrumbLink.elementRef().nativeElement.click();
        }
    }
}
