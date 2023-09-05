import { Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    PopoverBodyComponent,
    PopoverBodyFooterDirective,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-focus-example',
    templateUrl: './popover-focus-example.component.html',
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        ButtonModule,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        BarModule,
        AvatarModule,
        PopoverBodyFooterDirective,
        ContentDensityDirective
    ]
})
export class PopoverFocusExampleComponent {}
