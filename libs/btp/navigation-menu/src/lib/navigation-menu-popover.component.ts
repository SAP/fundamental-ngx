import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { NavigationMenuPopoverControlDirective } from './navigation-menu-popover-control.directive';

@Component({
    selector: 'fdb-navigation-menu-popover',
    template: `
        <fd-popover additionalBodyClass="fdb-navigation-popover-body" [noArrow]="false" [focusAutoCapture]="true">
            <fd-popover-control>
                <ng-template [ngTemplateOutlet]="_control.templateRef"></ng-template>
            </fd-popover-control>
            <fd-popover-body>
                <ng-content></ng-content>
            </fd-popover-body>
        </fd-popover>
    `,
    styleUrls: ['./navigation-menu-popover.component.scss'],
    imports: [PopoverComponent, PopoverControlComponent, PopoverBodyComponent, NgTemplateOutlet],
    encapsulation: ViewEncapsulation.None
})
export class NavigationMenuPopoverComponent {
    /** @hidden */
    @ContentChild(NavigationMenuPopoverControlDirective)
    protected _control!: NavigationMenuPopoverControlDirective;
}
