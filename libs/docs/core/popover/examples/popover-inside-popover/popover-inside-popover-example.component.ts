import { CdkScrollable } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-popover-inside-popover-example',
    templateUrl: './popover-inside-popover-example.component.html',
    imports: [
        ButtonComponent,
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        PopoverComponent,
        PopoverControlComponent,
        InitialFocusDirective,
        PopoverBodyComponent,
        MultiInputComponent,
        AvatarComponent,
        ComboboxModule,
        FormsModule
    ],
    standalone: true
})
export class PopoverInsidePopoverExampleComponent {
    searchTermOne = '';
    fruits = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];
}
