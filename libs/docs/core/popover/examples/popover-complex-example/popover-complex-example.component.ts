import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
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
    selector: 'fd-popover-complex-example',
    templateUrl: './popover-complex-example.component.html',
    styleUrls: ['./popover-complex-example.component.scss'],
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        ButtonModule,
        PopoverBodyComponent,
        AvatarComponent,
        PopoverBodyHeaderDirective,
        BarModule,
        ContentDensityDirective,
        PopoverBodyFooterDirective
    ]
})
export class PopoverComplexExampleComponent {}
