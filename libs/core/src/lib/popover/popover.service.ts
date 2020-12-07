import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ElementRef, Injectable, Injector, TemplateRef } from '@angular/core';
import { PopoverComponent } from './popover.component';
import { Placement } from './popover-position/popover-position';
import { BasePopoverClass } from './base/base-popover.class';

@Injectable()
export class PopoverService {

    constructor(
        private _dynamicComponentService: DynamicComponentService,
        private _injector: Injector,
    ) {}

    basePopoverSettings: BasePopoverClass;
    triggerElement: ElementRef;
    containerElement: ElementRef;
    stringContent: string;
    templateContent: TemplateRef<any>;


    public setUpPopover(): void {
        this._dynamicComponentService.createDynamicComponent(
            {
                basePopoverSettings: this.basePopoverSettings,
                triggerElement: this.triggerElement,
                stringContent: this.stringContent,
                templateContent: this.templateContent
            },
            PopoverComponent,
            { container: this.containerElement.nativeElement }
        )
    }

}
