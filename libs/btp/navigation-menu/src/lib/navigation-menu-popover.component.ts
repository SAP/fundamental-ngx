import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { PopoverBodyDirective, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { NavigationMenuPopoverControlDirective } from './navigation-menu-popover-control.directive';

@Component({
    selector: 'fdb-navigation-menu-popover',
    template: `
        <fd-popover additionalBodyClass="fdb-navigation-popover-body" [noArrow]="false" [focusAutoCapture]="true">
            <fd-popover-control>
                <ng-template [ngTemplateOutlet]="_control.templateRef"></ng-template>
            </fd-popover-control>
            <ng-template fdPopoverBody>
                <ng-template [ngTemplateOutlet]="_body.templateRef"></ng-template>
            </ng-template>
        </fd-popover>
    `,
    styleUrls: ['./navigation-menu-popover.component.scss'],
    imports: [PopoverComponent, PopoverControlComponent, PopoverBodyDirective, NgTemplateOutlet],
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class NavigationMenuPopoverComponent {
    /** @hidden */
    @ContentChild(NavigationMenuPopoverControlDirective)
    protected _control!: NavigationMenuPopoverControlDirective;

    /** @hidden */
    @ContentChild(PopoverBodyDirective)
    protected _body!: PopoverBodyDirective;
}
