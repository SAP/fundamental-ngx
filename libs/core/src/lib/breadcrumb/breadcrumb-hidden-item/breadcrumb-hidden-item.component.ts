import { AfterViewInit, Component, Input } from '@angular/core';
import { BreadcrumbItemDirective } from '../breadcrumb-item.directive';
import { DomPortal } from '@angular/cdk/portal';

@Component({
    selector: 'fd-breadcrumb-hidden-item',
    templateUrl: './breadcrumb-hidden-item.component.html'
})
export class BreadcrumbHiddenItemComponent implements AfterViewInit {
    @Input()
    breadcrumbItem: BreadcrumbItemDirective;

    linkContentPortal: DomPortal;

    ngAfterViewInit(): void {
        this.linkContentPortal = new DomPortal<HTMLElement>(
            this.breadcrumbItem.breadcrumbLink.contentSpan.nativeElement
        );
    }

    itemClicked($event: any): void {
        if (this.breadcrumbItem.needsClickProxy) {
            $event.preventDefault();
            this.breadcrumbItem.breadcrumbLink.elementRef().nativeElement.click();
        }
    }
}
