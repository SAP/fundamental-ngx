import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BreadcrumbItemComponent } from '../breadcrumb-item.component';
import { DomPortal } from '@angular/cdk/portal';

@Component({
    selector: 'fd-breadcrumb-hidden-item',
    templateUrl: './breadcrumb-hidden-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbHiddenItemComponent implements AfterViewInit {
    @Input()
    breadcrumbItem: BreadcrumbItemComponent;

    breadcrumbItemPortal: DomPortal<Element>;
    linkContentPortal: DomPortal;

    constructor(private _cdr: ChangeDetectorRef) {}

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

    itemClicked($event: any): void {
        if (this.breadcrumbItem.needsClickProxy) {
            $event.preventDefault();
            this.breadcrumbItem.breadcrumbLink.elementRef().nativeElement.click();
        }
    }
}
