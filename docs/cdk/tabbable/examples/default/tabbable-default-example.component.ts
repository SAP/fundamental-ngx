import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { TabbableElementService } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fundamental-ngx-tabbable-default-example',
    templateUrl: './tabbable-default-example.component.html'
})
export class TabbableDefaultExampleComponent {
    @ViewChild('section')
    section: ElementRef<HTMLElement>;

    tabbableElementClass: string | undefined;

    tabbableElementService = inject(TabbableElementService);

    ngAfterViewInit(): void {
        this.tabbableElementClass = this.tabbableElementService.getTabbableElement(
            this.section.nativeElement
        )?.className;
    }
}
