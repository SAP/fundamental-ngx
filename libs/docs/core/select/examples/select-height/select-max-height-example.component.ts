import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-select-max-height-example',
    templateUrl: './select-max-height-example.component.html',
    standalone: true,
    imports: [SelectModule, NgFor]
})
export class SelectMaxHeightExampleComponent {
    selectedValue: string;

    options: string[] = [
        'Apple',
        'Apricot',
        'Avocado',
        'Banana',
        'Blueberry',
        'Bing Cherry',
        'Mango',
        'Mandarin',
        'Melon'
    ];
}
