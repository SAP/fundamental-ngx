import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ButtonModule } from '@fundamental-ngx/core/button';

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
