import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PopoverBodyFooterDirective } from '@fundamental-ngx/core/popover';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { PopoverBodyHeaderDirective } from '@fundamental-ngx/core/popover';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

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
