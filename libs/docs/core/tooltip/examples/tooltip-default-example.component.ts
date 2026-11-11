import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { TooltipDirective } from '@fundamental-ngx/core/tooltip';

@Component({
    selector: 'fd-tooltip-default-example',
    templateUrl: './tooltip-default-example.component.html',
    styles: [
        `
            .fd-tooltip-example {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                margin-block: 1rem;
            }

            .fd-tooltip-example input {
                max-width: 15rem;
            }
        `
    ],
    imports: [ButtonComponent, AvatarComponent, IconComponent, LinkComponent, FormControlComponent, TooltipDirective]
})
export class TooltipDefaultExampleComponent {}
