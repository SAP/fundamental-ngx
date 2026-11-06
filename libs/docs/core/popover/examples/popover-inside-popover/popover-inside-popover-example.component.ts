import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-popover-inside-popover-example',
    templateUrl: './popover-inside-popover-example.component.html',
    imports: [
        TitleComponent,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        AvatarComponent,
        ComboboxModule,
        FormsModule
    ]
})
export class PopoverInsidePopoverExampleComponent {
    searchTermOne = '';
    fruits = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];
}
