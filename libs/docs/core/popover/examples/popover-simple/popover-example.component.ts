import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import {
    BarComponent,
    BarElementDirective,
    BarLeftDirective,
    BarMiddleDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import {
    PopoverBodyComponent,
    PopoverBodyFooterDirective,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverConfig,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-popover-example',
    templateUrl: './popover-example.component.html',
    styleUrls: ['popover-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        FormsModule,
        PopoverComponent,
        PopoverControlComponent,
        AvatarComponent,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        BarComponent,
        ButtonBarComponent,
        BarElementDirective,
        BarLeftDirective,
        BarMiddleDirective,
        BarRightDirective,
        ButtonComponent,
        TitleComponent,
        PopoverBodyFooterDirective,
        CheckboxComponent
    ]
})
export class PopoverExampleComponent {
    isDisabled = false;

    popoverConfig: PopoverConfig = {
        placement: 'bottom',
        noArrow: false,
        focusTrapped: true
    };
}
