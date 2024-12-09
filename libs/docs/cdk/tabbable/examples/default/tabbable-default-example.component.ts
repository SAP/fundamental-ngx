import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DisabledBehaviorDirective, TabbableElementService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdk-tabbable-default-example',
    templateUrl: './tabbable-default-example.component.html',
    imports: [ButtonComponent, DisabledBehaviorDirective]
})
export class TabbableDefaultExampleComponent {
    @ViewChild('section')
    section: ElementRef<HTMLElement>;

    tabbableElementClass: string | undefined;

    tabbableElementService = inject(TabbableElementService);

    ngAfterViewInit(): void {
        this.tabbableElementClass = this.tabbableElementService.getTabbableElement(this.section.nativeElement)
            ?.className;
    }
}
