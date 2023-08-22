import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { MenuModule } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-menu-scrollbar-example',
    templateUrl: './menu-scrollbar-example.component.html',
    standalone: true,
    imports: [ButtonModule, MenuModule, NgFor]
})
export class MenuScrollbarExampleComponent {
    options = [
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option',
        'Option'
    ];
}
