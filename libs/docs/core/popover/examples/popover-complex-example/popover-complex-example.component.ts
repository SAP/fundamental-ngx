import { Component } from '@angular/core';
import { PopoverBodyFooterDirective } from '@fundamental-ngx/core/popover';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { BarModule } from '@fundamental-ngx/core/bar';
import { PopoverBodyHeaderDirective } from '@fundamental-ngx/core/popover';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-complex-example',
    templateUrl: './popover-complex-example.component.html',
    styleUrls: ['./popover-complex-example.component.scss'],
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        ButtonModule,
        PopoverBodyComponent,
        AvatarModule,
        PopoverBodyHeaderDirective,
        BarModule,
        ContentDensityDirective,
        PopoverBodyFooterDirective
    ]
})
export class PopoverComplexExampleComponent {}
